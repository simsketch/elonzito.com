import { createGateway } from '@ai-sdk/gateway'
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { embed, type LanguageModel } from 'ai'

import { embeddingModel } from './retrieve'
import type { EmbeddingFn } from './types'

/**
 * Where chat and embedding calls are routed.
 *
 * Vercel's AI Gateway free tier is a hard request throttle, not a spending
 * allowance — measured at roughly one request per several minutes, and it
 * applies across every provider, so changing model alone does not help. When a
 * direct Google AI Studio key is present we bypass the Gateway entirely; its
 * free tier is ~15 req/min, which a portfolio site will not exhaust.
 *
 * The Gateway remains the fallback so removing the key reverts cleanly.
 */
export type Provider = 'google-direct' | 'gateway'

const GOOGLE_KEY = () => process.env.GOOGLE_GENERATIVE_AI_API_KEY
const GATEWAY_KEY = () => process.env.AI_GATEWAY_API_KEY

/** Model id as each provider names it. The Gateway prefixes with the vendor. */
const CHAT_MODEL_GOOGLE = process.env.CHAT_MODEL_GOOGLE ?? 'gemini-2.5-flash-lite'
const CHAT_MODEL_GATEWAY =
  process.env.CHAT_MODEL ?? 'google/gemini-2.5-flash-lite'

export function activeProvider(): Provider | null {
  if (GOOGLE_KEY()) return 'google-direct'
  if (GATEWAY_KEY()) return 'gateway'
  return null
}

/** The language model to stream from. */
export function chatModel(): LanguageModel {
  if (GOOGLE_KEY()) {
    const google = createGoogleGenerativeAI({ apiKey: GOOGLE_KEY() })
    return google(CHAT_MODEL_GOOGLE)
  }
  const gateway = createGateway({ apiKey: GATEWAY_KEY() })
  return gateway(CHAT_MODEL_GATEWAY)
}

/**
 * Embed a query so it is comparable to the committed corpus vectors.
 *
 * **The model must match the one that built `embeddings.json`.** The stored
 * vectors are `gemini-embedding-001` output truncated to the leading 768 dims
 * and re-normalised; a query embedded by any other model occupies a different
 * space, and cosine over it is noise rather than similarity. `scripts/
 * verify-embedding-parity.mjs` checks this empirically against a stored chunk.
 *
 * Returns null when no provider is configured, which `retrieve` treats as
 * "lexical only" rather than an error.
 */
export function embeddingFn(): EmbeddingFn | null {
  const provider = activeProvider()
  if (!provider) return null

  // Gateway ids are `vendor/model`; the direct SDK wants the bare name.
  const bareModel = embeddingModel.replace(/^google\//, '')

  const model =
    provider === 'google-direct'
      ? createGoogleGenerativeAI({ apiKey: GOOGLE_KEY() }).textEmbeddingModel(
          bareModel
        )
      : createGateway({ apiKey: GATEWAY_KEY() }).textEmbeddingModel(
          embeddingModel
        )

  return async (text: string) => {
    const { embedding } = await embed({ model, value: text })
    return project(embedding)
  }
}

/**
 * Project a raw embedding into the stored representation: leading 768
 * dimensions, re-normalised to unit length. Mirrors `scripts/build-embeddings.mjs`
 * exactly — if the two ever diverge, retrieval silently degrades.
 */
export function project(embedding: number[]): number[] {
  const head = embedding.slice(0, 768)
  const norm = Math.hypot(...head) || 1
  return head.map((v) => v / norm)
}
