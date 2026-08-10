/** A retrievable unit of the corpus: one markdown section, or a slice of one. */
export type Chunk = {
  /** Stable identifier, `<source>#<index>`. */
  id: string
  /** The `##` heading this chunk sits under. */
  heading: string
  /** The chunk's prose, heading excluded. */
  text: string
  /** Corpus filename without extension, e.g. `experience`. */
  source: string
}

/** Embeds a single string. Injected so retrieval is testable without network. */
export type EmbeddingFn = (text: string) => Promise<number[]>
