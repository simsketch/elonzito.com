# Design — RAG chatbot at `/chat`

**Date:** 2026-08-10
**Status:** Approved
**Scope:** A public, retrieval-augmented chatbot at `elonzito.com/chat` that answers
questions about Elon Zito from a curated corpus, hosted on Vercel's free tier.

---

## 1. Goals and non-goals

**Goals**

- Visitors can ask natural-language questions about Elon's background and get
  grounded, cited answers.
- The retrieval pipeline is real and legible — the site belongs to an ML engineer,
  so the implementation is part of the product.
- Spend is bounded by construction. No configuration mistake can produce an
  unbounded bill.
- The corpus discloses nothing beyond what a resume states publicly.

**Non-goals**

- Conversation persistence across sessions. Chats are ephemeral.
- Authentication or user accounts.
- Multi-tenant or per-visitor customization.
- Answering questions unrelated to Elon. Out-of-scope questions are refused.

---

## 2. Key decision: why retrieval at all

The full corpus is approximately **14,400 tokens**, which fits in any current
context window several times over. Retrieval therefore adds no capability at
today's size — stuffing the whole corpus into the system prompt would produce
strictly better answers, because the model would always see everything.

Retrieval is chosen anyway, deliberately, for two reasons:

1. The site is an ML engineer's portfolio. A working hybrid retrieval pipeline is
   itself a demonstrable artifact.
2. The corpus grows. Context-stuffing has a ceiling; retrieval does not.

**This tradeoff is recorded here so it is not rediscovered later as a bug.** If
answer quality ever regresses and the corpus is still small, the correct first
diagnostic is "did retrieval drop a needed chunk", and the correct fallback is to
raise `TOP_K` toward "all chunks".

---

## 3. Corpus

### 3.1 Source of truth

Hand-authored markdown under `content/chat-corpus/`. Deliberately **not** scraped
from the React components: the JSX carries markup noise, and the sanitization
boundary must be explicit and reviewable in a diff rather than derived by a regex.

| File | Contents |
|---|---|
| `profile.md` | Identity, current role, location, contact. The always-on core. |
| `experience.md` | All 14 roles: title, company, dates, location, highlights. |
| `peak-activity.md` | NextEra work at resume level of detail. |
| `projects.md` | The startups and products listed on the site. |
| `skills.md` | Technology proficiencies, grouped by level. |

### 3.2 Disclosure boundary

The corpus contains public site content plus a **sanitized** summary of the Peak
Activity engagement. The following are excluded and must never be added:

- Jira ticket identifiers (`NEEC3-####`, `NADP-####`)
- The `ESAR R-4` audit finding by name
- Named production incidents or deal rooms (Q-139, Indigo Reef, Cedar Flats,
  Maple Creek)
- References to internal documents, runbooks, or ADRs

Permitted at resume level: outcomes, technologies, architecture patterns, and
scale figures already stated publicly on the site and resume — e.g. "RAG over M&A
deal rooms using hybrid search, source-authority re-ranking, and LLM-judge
evaluation."

**A test asserts the excluded patterns are absent from the built corpus.** This is
the enforcement mechanism; the prose above is the rationale.

---

## 4. Build pipeline

```
content/chat-corpus/*.md
        |
        v
scripts/build-embeddings.ts
   1. parse + chunk by markdown heading
   2. embed each chunk via AI Gateway
   3. write lib/chat/embeddings.json
        |
        v
  embeddings.json  (committed to git)
```

**Chunking is heading-aware, not fixed-window.** A chunk is one markdown section
plus its heading path, so every chunk is a coherent unit and carries its own
context. Sections longer than ~250 words split on paragraph boundaries with the
heading path repeated.

**`embeddings.json` is committed.** Consequences, accepted:

- Vercel builds are deterministic and need no API key.
- The file is roughly 300–600 KB (~50 chunks × 768 floats). Visible in diffs.
- Editing corpus content requires re-running the script, or retrieval silently
  serves stale vectors. A test compares a content hash of the corpus against a
  hash stored in `embeddings.json` and fails when they diverge.

---

## 5. Retrieval

### 5.1 Modules

```
lib/chat/
  chunk.ts          heading-aware chunking          (pure)
  bm25.ts           lexical scorer, no dependencies (pure)
  rrf.ts            reciprocal rank fusion          (pure)
  retrieve.ts       orchestration                   (pure; embed fn injected)
  embeddings.json   generated, committed            (data)
```

`retrieve.ts` receives the embedding function as a parameter rather than importing
it. This is the load-bearing structural choice: the entire retrieval path is
testable with a fake embedder, no API key and no network.

### 5.2 Ranking

Two rankings are produced over the same chunk set and fused:

- **Dense** — cosine similarity between the question embedding and chunk vectors.
- **Lexical** — BM25 over tokenized chunk text.

Fused by **Reciprocal Rank Fusion**: `score = Σ 1 / (k + rank)`, `RRF_K = 60`,
rank 1-indexed. The top `TOP_K` chunks are passed to the model.

`TOP_K` and `RRF_K` are exported constants in `lib/chat/retrieve.ts`, not
environment variables — they are tuning parameters whose changes should be
reviewed and eval-tested, not flipped in a dashboard. **`TOP_K = 6`.**

Rationale: a resume corpus is proper-noun dense. "Has he used Hasura?" is an exact
token lookup that dense retrieval can miss when the term appears in one chunk;
"what is his leadership style?" is the inverse. Fusion covers both without tuning
a weighted blend.

### 5.3 Degradation

If the embedding call fails or times out, retrieval **falls back to lexical-only**
and the request proceeds. A degraded answer beats an error page. The fallback is
logged.

---

## 6. API route — `app/api/chat/route.ts`

Runtime: Node.js (the in-memory limiter relies on instance reuse).

Guards execute in order, cheapest first. Any failure short-circuits.

| # | Guard | Rule | Failure |
|---|---|---|---|
| 1 | Method | POST only | 405 |
| 2 | Body shape | `{ messages: [...] }` | 400 |
| 3 | Question length | ≤ 500 characters | 400 |
| 4 | Rate limit | 10 messages / 10 min / IP | 429 |
| 5 | History clamp | last 6 turns retained | — |
| 6 | Retrieve | top-6 chunks | falls back to lexical |
| 7 | Stream | `maxOutputTokens: 500` | 503 |

### 6.1 Models

Both configurable by environment variable; the values below are defaults.

| Purpose | Model | Price |
|---|---|---|
| Embeddings | `google/gemini-embedding-001` | $0.15 / M input |
| Chat | `google/gemini-2.5-flash-lite` | $0.10 / M in, $0.40 / M out |

**Estimated cost per turn:** ~1.9k input (system + 6 chunks + clamped history) and
~300 output ≈ **$0.0003**. A $5/month cap is roughly 16,000 messages.

### 6.2 Spend control

Three layers, in order of reliability:

1. **AI Gateway API key budget** — `limitAmount: 5`, `refreshPeriod: monthly`.
   A hard ceiling enforced by Vercel. This is the layer that protects the card;
   the others only reduce how fast the ceiling is reached.
2. **Per-IP in-memory limiter** — a `Map` in module scope, 10 messages per 10
   minutes, entries evicted on read. **Per serverless instance, not global.**
   Stops casual abuse; a distributed attacker can bypass it.
3. **Input caps** — question length, history depth, and `maxOutputTokens`.

**Known and accepted:** a determined distributed attacker can exhaust the monthly
budget and take the bot offline until it refreshes. Spend never exceeds the cap.
Upgrading layer 2 to durable Redis is the documented remedy if this occurs.

---

## 7. Grounding and refusal

The system prompt constrains the model to answer **only** from retrieved context.
When the answer is not present it must say so plainly and point to
`simsketch@gmail.com` rather than infer.

This matters more than in a typical assistant: the bot speaks about a real person,
so a confident fabrication about employment history is the worst available failure.
Retrieved chunks are surfaced as sources in the UI so a visitor can check what an
answer drew from.

Out-of-scope questions (general knowledge, coding help, anything not about Elon)
are refused with a short redirect to what the bot does cover.

---

## 8. UI — `app/chat/page.tsx`

Follows the existing editorial system: `bone` / `ink` / `rust`, `font-display` for
headings, `font-mono` for body, matching the rest of the site. Uses the registered
Tailwind color utilities (`bg-bone/95`), never `[var(--color-*)]/N`, per the
opacity-modifier constraint documented in `tailwind.config.ts`.

- Streaming responses via the AI SDK.
- Three suggested starter questions to seed the first interaction.
- Sources listed beneath each answer.
- Empty, loading, error, and rate-limited states all designed.
- `CHAT` added to the header nav.

---

## 9. Error handling

| Condition | Behavior |
|---|---|
| Embedding failure | Fall back to lexical retrieval; log; answer normally |
| Budget exhausted | Friendly "chat is taking a break" message |
| Rate limited | 429 with human-readable copy and retry timing |
| Stream interrupted | Partial response retained on screen |
| Malformed request | 400, no model call |

No path renders a stack trace to the visitor.

---

## 10. Testing

All tests are offline. No test performs a network call.

**Unit** — `chunk.ts` (heading paths, split boundaries), `bm25.ts` (scoring,
tokenization), `rrf.ts` (fusion math against hand-computed values),
`retrieve.ts` (via a fake embedder).

**Retrieval eval set** — approximately 10 `question → expected-chunk` pairs
asserted in CI. This is the gate that catches a corpus edit silently degrading
retrieval. Includes at least one exact-term query and one conceptual query, the
two cases hybrid ranking exists to serve.

**Corpus guard** — asserts none of the excluded patterns in §3.2 appear in the
built corpus.

**Staleness guard** — asserts the corpus content hash matches the hash recorded in
`embeddings.json`.

---

## 11. Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `AI_GATEWAY_API_KEY` | yes | Gateway auth; carries the budget cap |
| `CHAT_MODEL` | no | Defaults to `google/gemini-2.5-flash-lite` |
| `EMBEDDING_MODEL` | no | Defaults to `google/gemini-embedding-001` |

The build script needs `AI_GATEWAY_API_KEY` locally. The Vercel build does not,
because `embeddings.json` is committed.

---

## 12. Open items

None blocking. Deferred by choice:

- Durable rate limiting (Upstash) — add only if abuse is observed.
- Conversation persistence — out of scope.
- Streaming source highlights as they are retrieved — cosmetic.
