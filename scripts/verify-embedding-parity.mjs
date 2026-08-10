/**
 * Verify a query embedder produces vectors comparable to the committed corpus.
 *
 * The stored vectors were built through the AI Gateway. If queries are embedded
 * by a different provider — or a differently-named model — the two occupy
 * different spaces and cosine similarity returns noise that *looks* like a
 * score. Nothing crashes; retrieval just quietly gets worse. This script makes
 * that failure detectable.
 *
 * Method: re-embed the exact text of a stored chunk through the configured
 * provider and compare against that chunk's stored vector. Same model on the
 * same text should return ~1.0.
 *
 *   node --experimental-strip-types scripts/verify-embedding-parity.mjs
 */
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { createGateway } from '@ai-sdk/gateway'
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { embed } from 'ai'

const store = JSON.parse(
  readFileSync(join(process.cwd(), 'lib/chat/embeddings.json'), 'utf8')
)

// Deliberately self-contained rather than importing lib/chat/providers.ts:
// Node's type stripping cannot resolve that module's extensionless imports,
// and this check is about whether two *models* agree, not about exercising the
// app's import graph. Keep the projection below in sync with `project()` there.
const googleKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY
const gatewayKey = process.env.AI_GATEWAY_API_KEY
const provider = googleKey ? 'google-direct' : gatewayKey ? 'gateway' : null

if (!provider) {
  console.error('No provider configured. Set GOOGLE_GENERATIVE_AI_API_KEY or AI_GATEWAY_API_KEY.')
  process.exit(1)
}

const model =
  provider === 'google-direct'
    ? createGoogleGenerativeAI({ apiKey: googleKey }).textEmbeddingModel(
        store.model.replace(/^google\//, '')
      )
    : createGateway({ apiKey: gatewayKey }).textEmbeddingModel(store.model)

const embeddingFn = () => async (text) => {
  const { embedding } = await embed({ model, value: text })
  const head = embedding.slice(0, store.dimensions)
  const norm = Math.hypot(...head) || 1
  return head.map((v) => v / norm)
}

const cosine = (a, b) => {
  if (a.length !== b.length) return 0
  let dot = 0, ma = 0, mb = 0
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i]; ma += a[i] * a[i]; mb += b[i] * b[i]
  }
  const d = Math.sqrt(ma) * Math.sqrt(mb)
  return d === 0 ? 0 : dot / d
}

const embedQuery = embeddingFn()
const SAMPLES = [0, Math.floor(store.chunks.length / 2), store.chunks.length - 1]

console.log(`Provider: ${provider}`)
console.log(`Corpus model: ${store.model}, ${store.dimensions} dims\n`)

let worst = 1
for (const i of SAMPLES) {
  const chunk = store.chunks[i]
  // Must match how build-embeddings.mjs composed its input exactly.
  const text = `${chunk.heading}\n\n${chunk.text}`
  const fresh = await embedQuery(text)
  const sim = cosine(fresh, store.vectors[i])
  worst = Math.min(worst, sim)
  const mark = sim > 0.99 ? 'OK  ' : sim > 0.9 ? 'WARN' : 'FAIL'
  console.log(`  [${mark}] chunk ${i} "${chunk.heading.slice(0, 40)}" -> cosine ${sim.toFixed(6)}`)
}

console.log()
if (worst > 0.99) {
  console.log('PASS — query embeddings are comparable to the stored corpus.')
  process.exit(0)
}
if (worst > 0.9) {
  console.log('WARNING — close but not identical. Same family, possibly a different revision.')
  process.exit(0)
}
console.error(
  'FAIL — the query embedder does not match the corpus.\n' +
    'Dense retrieval would be noise. Either point the provider at ' +
    `"${store.model}", or re-run \`pnpm build:embeddings\` through the new provider.`
)
process.exit(1)
