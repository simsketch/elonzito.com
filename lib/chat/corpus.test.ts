import { describe, it, expect } from 'vitest'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { chunkMarkdown } from './chunk'

const CORPUS_DIR = join(process.cwd(), 'content/chat-corpus')

const EXPECTED_FILES = [
  'profile.md',
  'experience.md',
  'peak-activity.md',
  'projects.md',
  'skills.md',
]

/**
 * Terms that must never reach a public corpus. These are client internals from
 * the Peak Activity / NextEra engagement — see §3.2 of the design spec. This
 * test is the enforcement mechanism; the spec prose is only the rationale.
 */
const FORBIDDEN =
  /NEEC3-|NADP-|ESAR|Indigo Reef|Cedar Flats|Maple Creek|Q-139|Intralinks/i

const readCorpus = () =>
  readdirSync(CORPUS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => ({ file: f, text: readFileSync(join(CORPUS_DIR, f), 'utf8') }))

describe('corpus', () => {
  it('contains exactly the expected files', () => {
    const files = readCorpus().map((c) => c.file).sort()
    expect(files).toEqual([...EXPECTED_FILES].sort())
  })

  it('discloses no client internals', () => {
    for (const { file, text } of readCorpus()) {
      const match = text.match(FORBIDDEN)
      expect(match ? `${file}: ${match[0]}` : null).toBeNull()
    }
  })

  it('gives every file at least one ## section', () => {
    for (const { file, text } of readCorpus()) {
      expect(chunkMarkdown(text, file).length, `${file} has no sections`).toBeGreaterThan(0)
    }
  })

  it('produces a corpus small enough to retrieve over cheaply', () => {
    const all = readCorpus().flatMap((c) => chunkMarkdown(c.text, c.file))
    expect(all.length).toBeGreaterThan(20)
    expect(all.length).toBeLessThan(400)
  })

  it('mentions the contact email so the model can refer people on', () => {
    const joined = readCorpus().map((c) => c.text).join('\n')
    expect(joined).toContain('simsketch@gmail.com')
  })
})
