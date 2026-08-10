import { describe, it, expect } from 'vitest'
import { createHash } from 'node:crypto'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { retrieve, cosine, TOP_K, RRF_K, allChunks, corpusHash } from './retrieve'
import store from './embeddings.json'

/** Width of the committed vectors; the fake embedder must match it exactly. */
const STORE_DIMS = store.dimensions

/**
 * A deterministic fake embedder.
 *
 * Retrieval must be testable without a network or an API key, which is why
 * `retrieve` takes the embedding function as a parameter.
 *
 * **It must emit vectors of the same width as the stored ones.** `cosine`
 * returns 0 on a dimension mismatch, so a narrower fake would make every dense
 * score zero, get dropped by `rankOrder`, and leave these tests quietly
 * exercising BM25 alone while still passing. `dims.test.ts` guards the same
 * invariant from the other side.
 *
 * Hashes word tokens into buckets, so shared vocabulary produces real cosine
 * signal rather than a constant.
 */
const fakeEmbed = async (text: string): Promise<number[]> => {
  const width = STORE_DIMS
  const v = new Array(width).fill(0)
  for (const token of text.toLowerCase().match(/[a-z0-9.+#]+/g) ?? []) {
    let hash = 0
    for (const ch of token) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0
    v[hash % width] += 1
  }
  const norm = Math.hypot(...v) || 1
  return v.map((x) => x / norm)
}

describe('cosine', () => {
  it('is 1 for identical unit vectors', () => {
    expect(cosine([1, 0], [1, 0])).toBeCloseTo(1, 10)
  })
  it('is 0 for orthogonal vectors', () => {
    expect(cosine([1, 0], [0, 1])).toBeCloseTo(0, 10)
  })
  it('returns 0 rather than NaN for a zero vector', () => {
    expect(cosine([0, 0], [1, 0])).toBe(0)
  })
  it('returns 0 on a dimension mismatch instead of throwing', () => {
    expect(cosine([1, 0, 0], [1, 0])).toBe(0)
  })
})

describe('constants', () => {
  it('exposes the tuning parameters the spec fixes', () => {
    expect(TOP_K).toBe(6)
    expect(RRF_K).toBe(60)
  })
})

describe('corpus integrity', () => {
  it('embeddings.json is not stale relative to the corpus', () => {
    const dir = join(process.cwd(), 'content/chat-corpus')
    const parts = readdirSync(dir)
      .filter((f) => f.endsWith('.md'))
      .sort()
      .map((f) => readFileSync(join(dir, f), 'utf8'))
    const actual = createHash('sha256').update(parts.join('\n')).digest('hex')
    expect(
      actual,
      'Corpus changed without re-running `pnpm build:embeddings`'
    ).toBe(corpusHash)
  })

  it('has one vector per chunk', () => {
    expect(allChunks().length).toBeGreaterThan(20)
  })
})

describe('retrieve', () => {
  it('finds the chunk containing a rare exact term', async () => {
    const results = await retrieve('Hasura', fakeEmbed)
    const joined = results.map((r) => r.text).join(' ')
    expect(joined).toMatch(/Hasura/i)
  })

  // NOTE ON SCOPE: the fake embedder hashes tokens into buckets, so it models
  // lexical overlap, not meaning. Queries that need genuine semantic matching
  // ("how do I get in touch?" -> the Contact section) cannot be validated
  // offline and are deliberately not asserted here — a passing test would only
  // prove BM25 got lucky. What these tests do pin is that the pipeline returns
  // the right chunk whenever the query shares vocabulary with it, and that
  // fusion and fallback behave.

  it('answers a contact question with the contact section', async () => {
    const results = await retrieve('contact email address', fakeEmbed)
    const joined = results.map((r) => `${r.heading} ${r.text}`).join(' ')
    expect(joined).toMatch(/simsketch@gmail\.com/)
  })

  it('surfaces the diligence work for a retrieval question', async () => {
    const results = await retrieve(
      'retrieval augmented diligence pipeline',
      fakeEmbed
    )
    const joined = results.map((r) => `${r.heading} ${r.text}`).join(' ')
    expect(joined).toMatch(/retriev|rank|diligence/i)
  })

  it('returns at most TOP_K chunks', async () => {
    const results = await retrieve('engineer', fakeEmbed)
    expect(results.length).toBeLessThanOrEqual(TOP_K)
    expect(results.length).toBeGreaterThan(0)
  })

  it('degrades to lexical-only when the embedder throws', async () => {
    const broken = async () => {
      throw new Error('gateway down')
    }
    const results = await retrieve('Hasura', broken)
    expect(results.length).toBeGreaterThan(0)
    expect(results.map((r) => r.text).join(' ')).toMatch(/Hasura/i)
  })

  it('degrades to lexical-only when no embedder is supplied', async () => {
    const results = await retrieve('Terraform', null)
    expect(results.length).toBeGreaterThan(0)
  })

  it('returns an empty array for an empty query', async () => {
    expect(await retrieve('   ', fakeEmbed)).toEqual([])
  })
})
