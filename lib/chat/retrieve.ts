import type { Chunk, EmbeddingFn } from './types'
import { bm25Scores } from './bm25'
import { rrfFuse, rankOrder } from './rrf'
import data from './embeddings.json'

/**
 * Number of chunks handed to the model.
 *
 * A tuning parameter, deliberately a constant rather than an environment
 * variable: changing it changes answer quality and should go through the
 * retrieval tests and a code review, not a dashboard toggle.
 */
export const TOP_K = 6

/** RRF damping constant. See {@link rrfFuse}. */
export const RRF_K = 60

type EmbeddingsFile = {
  corpusHash: string
  model: string
  dimensions: number
  chunks: Chunk[]
  vectors: number[][]
}

const store = data as EmbeddingsFile

export const corpusHash = store.corpusHash
export const embeddingModel = store.model

export const allChunks = (): Chunk[] => store.chunks

/**
 * Cosine similarity between two vectors.
 *
 * Returns 0 rather than NaN for a zero-magnitude vector, and 0 on a dimension
 * mismatch — a mismatch means the query was embedded by a different model than
 * the corpus, and scoring it as "no similarity" degrades to lexical ranking
 * instead of poisoning the results with garbage numbers.
 */
export function cosine(a: number[], b: number[]): number {
  if (a.length !== b.length) return 0

  let dot = 0
  let magA = 0
  let magB = 0
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i]
    magA += a[i] * a[i]
    magB += b[i] * b[i]
  }

  const denom = Math.sqrt(magA) * Math.sqrt(magB)
  return denom === 0 ? 0 : dot / denom
}

/**
 * Retrieve the most relevant chunks for a question.
 *
 * Hybrid: a dense ranking (cosine over precomputed embeddings) and a lexical
 * ranking (BM25) are produced independently and fused with Reciprocal Rank
 * Fusion. Fusing on rank rather than score sidesteps the fact that cosine and
 * BM25 live on incomparable scales.
 *
 * Why both: this corpus is dense with proper nouns. "Has he used Hasura?" is an
 * exact-token lookup that embeddings blur, while "what is his leadership style?"
 * has no literal overlap with anything in the corpus. Each ranking covers the
 * other's blind spot.
 *
 * `embed` is a parameter rather than an import so the whole path is testable
 * offline. Passing `null`, or passing a function that rejects, degrades to
 * lexical-only rather than failing the request — a slightly worse answer beats
 * an error page.
 */
export async function retrieve(
  query: string,
  embed: EmbeddingFn | null
): Promise<Chunk[]> {
  const trimmed = query.trim()
  if (!trimmed) return []

  const { chunks, vectors } = store
  const rankings: number[][] = []

  // Lexical ranking. Always available, never fails.
  rankings.push(rankOrder(bm25Scores(trimmed, chunks)))

  // Dense ranking. Best-effort: a gateway hiccup must not take the bot down.
  if (embed) {
    try {
      const queryVector = await embed(trimmed)
      const dense = vectors.map((v) => cosine(queryVector, v))
      // Cosine can be negative; rankOrder drops non-positive scores, which is
      // the desired behaviour — a negatively-similar chunk is not a match.
      rankings.push(rankOrder(dense))
    } catch (error) {
      console.error('[chat] embedding failed, falling back to lexical:', error)
    }
  }

  const fused = rrfFuse(rankings, chunks.length, RRF_K)

  return rankOrder(fused)
    .slice(0, TOP_K)
    .map((index) => chunks[index])
}
