/**
 * Precompute chunk embeddings for the /chat corpus.
 *
 * Run locally after editing anything in content/chat-corpus/, then commit the
 * generated lib/chat/embeddings.json. Vercel builds do NOT run this — that is
 * the point, it keeps deploys deterministic and means production never needs an
 * embedding key at build time.
 *
 *   pnpm build:embeddings
 */
import { createHash } from 'node:crypto'
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join, basename } from 'node:path'
import { pathToFileURL } from 'node:url'

import { createGateway } from '@ai-sdk/gateway'
import { embedMany } from 'ai'

const CORPUS_DIR = join(process.cwd(), 'content/chat-corpus')
const OUTPUT = join(process.cwd(), 'lib/chat/embeddings.json')
const MODEL = process.env.EMBEDDING_MODEL ?? 'google/gemini-embedding-001'

const apiKey = process.env.AI_GATEWAY_API_KEY
if (!apiKey) {
  console.error(
    'AI_GATEWAY_API_KEY is not set.\n' +
      'Create one with:\n' +
      '  vercel --scope <team> ai-gateway api-keys create --name elonzito-chat --budget 5 --refresh-period monthly\n' +
      'then put it in .env.local'
  )
  process.exit(1)
}

// The chunker is TypeScript; import it through a tiny inline transpile-free
// shim by reading the compiled logic is overkill, so we re-declare nothing —
// tsx/ts-node are not dependencies here. Instead we import the .ts via Node's
// experimental type stripping, available in Node 22.
const { chunkMarkdown } = await import(
  pathToFileURL(join(process.cwd(), 'lib/chat/chunk.ts')).href
)

const files = readdirSync(CORPUS_DIR)
  .filter((f) => f.endsWith('.md'))
  .sort()

if (files.length === 0) {
  console.error(`No markdown files found in ${CORPUS_DIR}`)
  process.exit(1)
}

const chunks = []
const parts = []

for (const file of files) {
  const text = readFileSync(join(CORPUS_DIR, file), 'utf8')
  parts.push(text)
  chunks.push(...chunkMarkdown(text, basename(file, '.md')))
}

// Hash the corpus so a stale embeddings.json is detectable. Sorting the file
// list above keeps this stable across filesystems.
const corpusHash = createHash('sha256').update(parts.join('\n')).digest('hex')

console.log(`Corpus: ${files.length} files -> ${chunks.length} chunks`)
console.log(`Embedding with ${MODEL} ...`)

const gateway = createGateway({ apiKey })

// Embed the heading alongside the body: a chunk's heading carries much of its
// topical signal ("Peak Activity", "Contact"), and the body alone can read as
// context-free prose.
const inputs = chunks.map((c) => `${c.heading}\n\n${c.text}`)

const { embeddings } = await embedMany({
  model: gateway.textEmbeddingModel(MODEL),
  values: inputs,
})

if (embeddings.length !== chunks.length) {
  console.error(
    `Embedding count ${embeddings.length} does not match chunk count ${chunks.length}`
  )
  process.exit(1)
}

/**
 * Shrink each vector before it is committed.
 *
 * gemini-embedding-001 returns 3072 dimensions, which serializes to ~3.6 MB for
 * this corpus — heavy in git and, worse, parsed on every serverless cold start.
 *
 * The model is trained with Matryoshka representation learning, so the leading
 * DIMS values are themselves a valid, lower-dimensional embedding. Truncating
 * breaks unit length though, so we re-normalize; cosine similarity assumes it.
 * Rounding then halves the JSON again at a precision far below what ranking can
 * distinguish.
 */
const DIMS = 768
const PRECISION = 6

const shrink = (vector) => {
  const head = vector.slice(0, DIMS)
  const norm = Math.hypot(...head) || 1
  return head.map((v) => Number((v / norm).toFixed(PRECISION)))
}

const vectors = embeddings.map(shrink)

writeFileSync(
  OUTPUT,
  JSON.stringify(
    {
      corpusHash,
      model: MODEL,
      dimensions: vectors[0]?.length ?? 0,
      chunks,
      vectors,
    },
    null,
    0
  ) + '\n'
)

const sizeKb = Math.round(readFileSync(OUTPUT).length / 1024)
console.log(
  `Wrote ${OUTPUT}\n  ${chunks.length} chunks, ${vectors[0]?.length ?? 0} dims ` +
    `(truncated from ${embeddings[0]?.length ?? 0}), ${sizeKb} KB`
)
