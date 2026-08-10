import type { Chunk } from './types'

const K1 = 1.5
const B = 0.75

/**
 * Split text into scoring tokens.
 *
 * `.`, `+` and `#` are kept inside tokens so `next.js`, `c++` and `c#` survive
 * as single terms — this corpus is dense with tech names, and splitting them
 * would make the most distinctive query terms unmatchable.
 */
export function tokenize(text: string): string[] {
  return text.toLowerCase().match(/[a-z0-9.+#]+/g) ?? []
}

/**
 * Score every chunk against the query with BM25.
 *
 * Returns an array index-aligned to `chunks`. Complements dense retrieval: a
 * rare exact term (a company name, a library) is exactly what embeddings blur
 * and what this catches.
 *
 * IDF is floored at 0, so a term appearing in every chunk contributes nothing
 * rather than pushing scores negative — with a corpus this small, common words
 * would otherwise invert the ranking.
 */
export function bm25Scores(query: string, chunks: Chunk[]): number[] {
  const queryTerms = tokenize(query)
  if (queryTerms.length === 0 || chunks.length === 0) {
    return new Array(chunks.length).fill(0)
  }

  const docs = chunks.map((c) => tokenize(`${c.heading} ${c.text}`))
  const lengths = docs.map((d) => d.length)
  const avgLength = lengths.reduce((a, b) => a + b, 0) / (docs.length || 1)

  const termFreqs = docs.map((doc) => {
    const counts = new Map<string, number>()
    for (const t of doc) counts.set(t, (counts.get(t) ?? 0) + 1)
    return counts
  })

  const scores = new Array(chunks.length).fill(0)

  for (const term of new Set(queryTerms)) {
    const docsWithTerm = termFreqs.filter((tf) => tf.has(term)).length
    if (docsWithTerm === 0) continue

    // Classic Robertson IDF, deliberately not the smoothed `log(1 + …)`
    // variant: this form goes negative once a term appears in more than half
    // the chunks, which lets the floor below discard it. With ~50 chunks about
    // one person, words like "engineer" and "built" are near-ubiquitous and
    // would otherwise add noise to every ranking.
    const idf = Math.log(
      (docs.length - docsWithTerm + 0.5) / (docsWithTerm + 0.5)
    )
    if (idf <= 0) continue

    for (let i = 0; i < chunks.length; i++) {
      const freq = termFreqs[i].get(term)
      if (!freq) continue
      const norm = 1 - B + (B * lengths[i]) / (avgLength || 1)
      scores[i] += idf * ((freq * (K1 + 1)) / (freq + K1 * norm))
    }
  }

  return scores
}
