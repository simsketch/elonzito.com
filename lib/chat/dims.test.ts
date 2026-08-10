import { describe, it, expect } from 'vitest'
import { cosine, allChunks } from './retrieve'
import store from './embeddings.json'

/**
 * Guards against a test that passes while asserting nothing.
 *
 * `retrieve` fuses a lexical and a dense ranking. If a fake embedder in a test
 * returns vectors of the wrong width, `cosine` correctly returns 0, every dense
 * score is dropped, and the "hybrid" tests silently exercise BM25 alone — they
 * still pass, and the dense path is never checked. These assertions make that
 * failure mode loud.
 */
describe('embedding dimensions', () => {
  it('every stored vector has the declared width', () => {
    expect(store.dimensions).toBeGreaterThan(0)
    for (const v of store.vectors) expect(v.length).toBe(store.dimensions)
  })

  it('has exactly one vector per chunk', () => {
    expect(store.vectors.length).toBe(store.chunks.length)
    expect(store.vectors.length).toBe(allChunks().length)
  })

  it('stored vectors are unit length, as cosine assumes', () => {
    for (const v of store.vectors) {
      expect(Math.hypot(...v)).toBeCloseTo(1, 4)
    }
  })

  it('cosine over stored vectors produces real, varied similarity', () => {
    // Self-similarity is 1; two different chunks are not identical. If this
    // ever collapses to all-zero or all-one, dense retrieval is inert.
    expect(cosine(store.vectors[0], store.vectors[0])).toBeCloseTo(1, 6)
    const cross = cosine(store.vectors[0], store.vectors[1])
    expect(cross).toBeLessThan(0.999)
    expect(cross).toBeGreaterThan(-1)
  })
})
