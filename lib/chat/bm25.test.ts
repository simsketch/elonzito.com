import { describe, it, expect } from 'vitest'
import { bm25Scores, tokenize } from './bm25'
import type { Chunk } from './types'

const chunk = (id: string, text: string): Chunk => ({
  id,
  heading: 'H',
  text,
  source: 'demo',
})

describe('tokenize', () => {
  it('lowercases and splits on non-word characters', () => {
    expect(tokenize('Led The Team')).toEqual(['led', 'the', 'team'])
  })

  it('keeps dots, plus and hash so tech names survive', () => {
    expect(tokenize('Next.js and C# and C++')).toContain('next.js')
    expect(tokenize('Next.js and C# and C++')).toContain('c#')
    expect(tokenize('Next.js and C# and C++')).toContain('c++')
  })
})

describe('bm25Scores', () => {
  const chunks = [
    chunk('a', 'Built a search engine with Hasura and Apollo GraphQL'),
    chunk('b', 'Led a team of engineers building treasury software'),
    chunk('c', 'Designed dashboards and reporting for finance teams'),
  ]

  it('ranks the chunk containing a rare term highest', () => {
    const scores = bm25Scores('Hasura', chunks)
    expect(scores[0]).toBeGreaterThan(scores[1])
    expect(scores[0]).toBeGreaterThan(scores[2])
  })

  it('is case insensitive', () => {
    const lower = bm25Scores('hasura', chunks)
    const upper = bm25Scores('HASURA', chunks)
    expect(lower).toEqual(upper)
  })

  it('returns all zeros for an empty query', () => {
    expect(bm25Scores('', chunks)).toEqual([0, 0, 0])
  })

  it('returns all zeros when no chunk matches', () => {
    expect(bm25Scores('kubernetes', chunks)).toEqual([0, 0, 0])
  })

  it('returns one score per chunk, index aligned', () => {
    expect(bm25Scores('team', chunks)).toHaveLength(chunks.length)
  })

  it('scores a term appearing in every chunk at or near zero (no discrimination)', () => {
    const all = [chunk('a', 'alpha shared'), chunk('b', 'beta shared')]
    // IDF of a term present in every document is <= 0 under standard BM25;
    // the implementation floors it at 0 rather than letting it go negative.
    for (const s of bm25Scores('shared', all)) expect(s).toBe(0)
  })
})
