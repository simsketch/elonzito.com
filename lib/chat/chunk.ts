import type { Chunk } from './types'

/**
 * Maximum words in a chunk before it is split.
 *
 * Chunks are semantic units (one `##` section), not fixed windows, so this is a
 * ceiling rather than a target — most sections come in well under it and are
 * emitted whole.
 */
const MAX_WORDS = 250

const countWords = (s: string): number => s.split(/\s+/).filter(Boolean).length

/**
 * Split markdown into retrievable chunks, one per `##` section.
 *
 * Heading-aware rather than fixed-window: every chunk is a coherent unit and
 * carries its heading, so a retrieved chunk is self-describing when it lands in
 * the prompt. Sections longer than {@link MAX_WORDS} split on paragraph
 * boundaries, with each slice keeping the same heading.
 *
 * Content before the first `##` is ignored — corpus files open with a `#` title
 * that is not itself retrievable content.
 */
export function chunkMarkdown(markdown: string, source: string): Chunk[] {
  const sections = markdown.split(/^## /m).slice(1)
  const chunks: Chunk[] = []

  for (const section of sections) {
    const newline = section.indexOf('\n')
    const heading = (newline === -1 ? section : section.slice(0, newline)).trim()
    const body = (newline === -1 ? '' : section.slice(newline + 1)).trim()
    if (!body) continue

    for (const text of splitToLimit(body)) {
      chunks.push({ id: `${source}#${chunks.length}`, heading, text, source })
    }
  }

  return chunks
}

/**
 * Break a body into pieces of at most MAX_WORDS, preferring paragraph breaks.
 *
 * A paragraph that is itself over the limit is hard-split on word count — rare
 * in practice, but it keeps the guarantee unconditional so callers never have to
 * handle an oversized chunk.
 */
function splitToLimit(body: string): string[] {
  if (countWords(body) <= MAX_WORDS) return [body]

  const out: string[] = []
  let current: string[] = []
  let currentWords = 0

  const flush = () => {
    if (current.length) out.push(current.join('\n\n'))
    current = []
    currentWords = 0
  }

  for (const para of body.split(/\n{2,}/)) {
    const words = countWords(para)

    if (words > MAX_WORDS) {
      flush()
      const tokens = para.split(/\s+/).filter(Boolean)
      for (let i = 0; i < tokens.length; i += MAX_WORDS) {
        out.push(tokens.slice(i, i + MAX_WORDS).join(' '))
      }
      continue
    }

    if (currentWords + words > MAX_WORDS) flush()
    current.push(para)
    currentWords += words
  }

  flush()
  return out
}
