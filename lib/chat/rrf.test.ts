import { describe, it, expect } from 'vitest'
import { rrfFuse, rankOrder } from './rrf'

describe('rankOrder', () => {
  it('returns indices sorted by score descending', () => {
    expect(rankOrder([0.1, 0.9, 0.5])).toEqual([1, 2, 0])
  })

  it('omits zero and negative scores', () => {
    expect(rankOrder([0, 0.5, -1])).toEqual([1])
  })

  it('returns an empty list when nothing scores', () => {
    expect(rankOrder([0, 0, 0])).toEqual([])
  })
})

describe('rrfFuse', () => {
  it('sums 1/(k + rank) across rankings, rank 1-indexed', () => {
    // index 0: 1st in A (rank 1), 2nd in B (rank 2)
    const fused = rrfFuse([[0, 1], [1, 0]], 2, 60)
    expect(fused[0]).toBeCloseTo(1 / 61 + 1 / 62, 10)
  })

  it('contributes nothing for a ranking that omits an index', () => {
    // index 1 appears only in the first ranking, at rank 2.
    const fused = rrfFuse([[0, 1], [0]], 2, 60)
    expect(fused[1]).toBeCloseTo(1 / 62, 10)
  })

  it('ranks an item present in both lists above one present in a single list', () => {
    // index 0 is 2nd in both; index 1 is 1st in one list only.
    const fused = rrfFuse([[1, 0], [2, 0]], 3, 60)
    expect(fused[0]).toBeGreaterThan(fused[1])
  })

  it('returns a zero-filled array sized to the corpus when given no rankings', () => {
    expect(rrfFuse([], 3, 60)).toEqual([0, 0, 0])
  })
})
