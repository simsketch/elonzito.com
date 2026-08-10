import { describe, it, expect } from 'vitest'
import { chunkMarkdown } from './chunk'

describe('chunkMarkdown', () => {
  it('produces one chunk per ## heading', () => {
    const md = `## First\nAlpha body.\n\n## Second\nBeta body.\n`
    const chunks = chunkMarkdown(md, 'demo')
    expect(chunks).toHaveLength(2)
    expect(chunks[0].heading).toBe('First')
    expect(chunks[1].heading).toBe('Second')
  })

  it('captures body text without the heading line', () => {
    const chunks = chunkMarkdown(`## Role\nLed the team.\n`, 'demo')
    expect(chunks[0].text).toContain('Led the team.')
    expect(chunks[0].text).not.toContain('## Role')
  })

  it('records source and a stable id', () => {
    const chunks = chunkMarkdown(`## A\nx\n\n## B\ny\n`, 'experience')
    expect(chunks[0].source).toBe('experience')
    expect(chunks[0].id).toBe('experience#0')
    expect(chunks[1].id).toBe('experience#1')
  })

  it('ignores content before the first heading', () => {
    const chunks = chunkMarkdown(`Preamble text.\n\n## Only\nbody\n`, 'demo')
    expect(chunks).toHaveLength(1)
    expect(chunks[0].heading).toBe('Only')
  })

  it('splits a long section on paragraph boundaries, repeating the heading', () => {
    // Three paragraphs of 120 words each — well past the 250-word threshold.
    const para = (w: string) => Array.from({ length: 120 }, () => w).join(' ')
    const md = `## Long\n${para('alpha')}\n\n${para('beta')}\n\n${para('gamma')}\n`
    const chunks = chunkMarkdown(md, 'demo')

    expect(chunks.length).toBeGreaterThan(1)
    // Every slice stays attributed to the same heading and source.
    for (const c of chunks) {
      expect(c.heading).toBe('Long')
      expect(c.source).toBe('demo')
    }
    // No slice exceeds the threshold on its own.
    for (const c of chunks) {
      expect(c.text.split(/\s+/).filter(Boolean).length).toBeLessThanOrEqual(250)
    }
    // Content is preserved across the split.
    const joined = chunks.map((c) => c.text).join(' ')
    expect(joined).toContain('alpha')
    expect(joined).toContain('beta')
    expect(joined).toContain('gamma')
  })

  it('returns an empty array for empty input', () => {
    expect(chunkMarkdown('', 'demo')).toEqual([])
  })
})
