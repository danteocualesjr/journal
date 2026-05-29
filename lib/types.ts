export type EntryStatus = "draft" | "published";

export type JournalEntry = {
  /** Stable unique id (crypto.randomUUID). */
  id: string;
  /** Optional title; falls back to the entry's date when empty. */
  title: string;
  /** Rich text body as Tiptap-generated HTML. */
  content: string;
  /** Draft while being written; published once the author hits Publish. */
  status: EntryStatus;
  /** ISO timestamp the entry was created. */
  createdAt: string;
  /** ISO timestamp the entry was last modified. */
  updatedAt: string;
  /** ISO timestamp the entry was first published, or null while a draft. */
  publishedAt: string | null;
};
