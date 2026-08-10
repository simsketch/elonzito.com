'use client'

import { useState, useRef, useEffect } from 'react'
import { useChat } from '@ai-sdk/react'
import Link from 'next/link'

const STARTERS = [
  'What did he build at NextEra?',
  'How does he approach RAG and evaluation?',
  'Is he available for work?',
]

/** Pull plain text out of a UI message's parts. */
function textOf(message: { parts?: Array<{ type: string; text?: string }> }): string {
  return (message.parts ?? [])
    .filter((p) => p.type === 'text')
    .map((p) => p.text ?? '')
    .join('')
}

export default function ChatPage() {
  const [input, setInput] = useState('')
  const endRef = useRef<HTMLDivElement>(null)

  const { messages, sendMessage, status, error } = useChat()
  const busy = status === 'submitted' || status === 'streaming'

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, status])

  const submit = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || busy) return
    sendMessage({ text: trimmed })
    setInput('')
  }

  return (
    <main className="min-h-screen grid-pattern flex flex-col">
      {/* Header */}
      <header className="border-b-2 border-ink bg-bone/95 backdrop-blur-sm">
        <div className="container-editorial flex items-center justify-between py-4">
          <Link
            href="/"
            className="font-display text-xl tracking-wider transition-colors hover:text-[var(--color-rust)]"
          >
            EZ<span className="text-[var(--color-rust)]">.</span>
          </Link>
          <Link
            href="/"
            className="link-underline font-mono text-xs uppercase tracking-widest transition-colors hover:text-[var(--color-rust)]"
          >
            ← Back to site
          </Link>
        </div>
      </header>

      <div className="container-editorial flex w-full flex-1 flex-col py-10">
        {/* Title */}
        <div className="mb-8">
          <span className="number-indicator">06</span>
          <h1 className="heading-section mt-2">Ask about Elon</h1>
          <div className="mt-4 h-1 w-12 bg-[var(--color-rust)]" />
          <p className="mt-6 max-w-2xl font-serif text-lg leading-relaxed opacity-70">
            A retrieval-augmented assistant grounded in Elon&apos;s actual
            background — it answers from a curated corpus and tells you when it
            doesn&apos;t know, rather than guessing.
          </p>
        </div>

        {/* Transcript */}
        <div className="flex-1 space-y-8">
          {messages.length === 0 && (
            <div className="border-t border-ink/10 pt-8">
              <p className="font-mono text-xs uppercase tracking-[0.3em] opacity-50">
                Try asking
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {STARTERS.map((q) => (
                  <button
                    key={q}
                    onClick={() => submit(q)}
                    className="border border-ink/30 px-4 py-3 text-left font-mono text-sm transition-colors hover:border-[var(--color-rust)] hover:text-[var(--color-rust)]"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((message) => {
            const isUser = message.role === 'user'
            return (
              <div
                key={message.id}
                className="grid gap-3 border-t border-ink/10 pt-6 lg:grid-cols-12"
              >
                <div className="lg:col-span-3">
                  <span className="font-mono text-xs uppercase tracking-[0.3em] opacity-50">
                    {isUser ? 'You' : 'Assistant'}
                  </span>
                </div>
                <div className="lg:col-span-9">
                  <p
                    className={
                      isUser
                        ? 'font-serif text-xl leading-relaxed'
                        : 'whitespace-pre-wrap font-mono text-sm leading-relaxed opacity-80'
                    }
                  >
                    {textOf(message)}
                  </p>
                </div>
              </div>
            )
          })}

          {busy && (
            <div className="grid gap-3 border-t border-ink/10 pt-6 lg:grid-cols-12">
              <div className="lg:col-span-3">
                <span className="font-mono text-xs uppercase tracking-[0.3em] opacity-50">
                  Assistant
                </span>
              </div>
              <div className="lg:col-span-9">
                <span className="inline-flex gap-1 font-mono text-sm opacity-50">
                  <span className="animate-pulse">Retrieving</span>
                  <span className="animate-pulse">…</span>
                </span>
              </div>
            </div>
          )}

          {error && (
            <div className="border-l-2 border-[var(--color-rust)] bg-[var(--color-rust)]/5 p-4">
              <p className="font-mono text-sm text-[var(--color-rust)]">
                {error.message ||
                  'Something went wrong. Try again in a moment.'}
              </p>
            </div>
          )}

          <div ref={endRef} />
        </div>

        {/* Composer */}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            submit(input)
          }}
          className="sticky bottom-0 mt-8 border-t-2 border-ink bg-bone/95 py-4 backdrop-blur-sm"
        >
          <div className="flex gap-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={500}
              placeholder="Ask about his experience, projects, or how he works…"
              aria-label="Ask a question about Elon"
              className="flex-1 border border-ink/30 bg-transparent px-4 py-3 font-mono text-sm outline-none transition-colors placeholder:opacity-40 focus:border-[var(--color-rust)]"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              className="bg-[var(--color-ink)] px-8 py-3 font-mono text-sm uppercase tracking-widest text-[var(--color-bone)] transition-colors hover:bg-[var(--color-rust)] disabled:cursor-not-allowed disabled:opacity-30"
            >
              {busy ? 'Thinking' : 'Ask'}
            </button>
          </div>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] opacity-40">
            Grounded in a curated corpus · answers may be imperfect · reach Elon
            directly at simsketch@gmail.com
          </p>
        </form>
      </div>
    </main>
  )
}
