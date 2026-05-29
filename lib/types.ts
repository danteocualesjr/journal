export type JournalEntry = {
  /** Stable unique id (crypto.randomUUID). */
  id: string;
  /** Optional title; falls back to the entry's date when empty. */
  title: string;
  /** Rich text body as Tiptap-generated HTML. */
  content: string;
  /** ISO timestamp the entry was created. */
  createdAt: string;
  /** ISO timestamp the entry was last modified. */
  updatedAt: string;
};
