"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  useEntries,
  selectEntry,
  createDraft,
  saveEntry,
  publishDraft,
  removeEntry,
} from "@/lib/store";
import Editor from "./Editor";

type Patch = { title: string; content: string };

type Props = {
  /** Omitted for a brand-new entry; set when editing an existing one. */
  entryId?: string;
};

export default function EditorView({ entryId }: Props) {
  const router = useRouter();
  const entries = useEntries();
  const existing = entryId ? selectEntry(entries, entryId) : undefined;

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // The live entry id. Null for a new entry until the author writes something.
  const idRef = useRef<string | null>(entryId ?? null);

  /** Ensure a draft exists for the current edit, returning its id. */
  function ensureId(): string {
    if (idRef.current) return idRef.current;
    const created = createDraft();
    idRef.current = created.id;
    return created.id;
  }

  function handleChange(patch: Patch) {
    saveEntry(ensureId(), patch);
  }

  function handlePublish(patch: Patch) {
    const id = ensureId();
    saveEntry(id, patch);
    publishDraft(id);
    router.push(`/entry/${id}`);
  }

  function handleDelete() {
    if (idRef.current) removeEntry(idRef.current);
    router.push("/");
  }

  // Wait for the client store before mounting the editor, so an existing
  // entry's content is available for the editor's initial state.
  if (!mounted) return null;

  if (entryId && !existing) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-paper px-6 text-center">
        <h1 className="font-serif text-2xl font-semibold text-ink">
          This entry could not be found
        </h1>
        <Link href="/" className="link-accent font-serif text-lg">
          Return to the journal
        </Link>
      </main>
    );
  }

  return (
    <Editor
      key={entryId ?? "new"}
      initialTitle={existing?.title ?? ""}
      initialContent={existing?.content ?? ""}
      status={existing?.status ?? "draft"}
      lastSavedAt={existing?.updatedAt ?? null}
      onChange={handleChange}
      onPublish={handlePublish}
      onDelete={handleDelete}
    />
  );
}
