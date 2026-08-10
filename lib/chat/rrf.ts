/**
 * Turn a score array into a ranked list of indices, best first.
 *
 * Non-positive scores are dropped rather than ranked last: a chunk BM25 scored
 * at 0 matched nothing, and giving it a rank would let it accrue RRF weight
 * purely for existing.
 */
export function rankOrder(scores: number[]): number[] {
  return scores
    .map((score, index) => ({ score, index }))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .map((s) => s.index)
}

/**
 * Reciprocal Rank Fusion: `score = Σ 1 / (k + rank)`, rank 1-indexed.
 *
 * Combines rankings whose scores are not comparable — cosine similarity and
 * BM25 live on entirely different scales, so fusing on rank rather than score
 * avoids inventing a normalization or a weighting to tune.
 *
 * `k` damps the influence of top positions; the conventional 60 means the gap
 * between rank 1 and rank 2 is small enough that agreement across both
 * rankings outweighs a single list's confidence.
 *
 * @param rankings arrays of chunk indices, each ordered best-first
 * @param size     total chunk count, so the result is index-aligned to the corpus
 */
export function rrfFuse(rankings: number[][], size: number, k: number): number[] {
  const fused = new Array(size).fill(0)

  for (const ranking of rankings) {
    ranking.forEach((chunkIndex, position) => {
      if (chunkIndex >= 0 && chunkIndex < size) {
        fused[chunkIndex] += 1 / (k + position + 1)
      }
    })
  }

  return fused
}
