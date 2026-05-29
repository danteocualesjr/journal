"use client";

import { useEffect, useMemo, useState } from "react";
import type { JournalEntry } from "@/lib/types";
import {
  getEntries,
  createEntry,
  updateEntry,
  deleteEntry,
} from "@/lib/storage";
import { htmlToText } from "@/lib/text";
import Sidebar from "@/components/Sidebar";
import Editor from "@/components/Editor";

export default function HomePage() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [ready, setReady] = useState(false);

  // Load persisted entries once on mount (client-only).
  useEffect(() => {
    const loaded = getEntries();
    setEntries(loaded);
    setActiveId(loaded[0]?.id ?? null);
    setReady(true);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return entries;
    return entries.filter((entry) => {
      const haystack = `${entry.title} ${htmlToText(entry.content)}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [entries, query]);

  const activeEntry = useMemo(
    () => entries.find((entry) => entry.id === activeId) ?? null,
    [entries, activeId]
  );

  function handleNew() {
    const entry = createEntry();
    setEntries((prev) => [entry, ...prev]);
    setActiveId(entry.id);
    setQuery("");
  }

  function handleSelect(id: string) {
    setActiveId(id);
  }

  function handlePersist(
    id: string,
    patch: Partial<Pick<JournalEntry, "title" | "content">>
  ) {
    const updated = updateEntry(id, patch);
    if (!updated) return;
    setEntries((prev) =>
      prev.map((entry) => (entry.id === id ? updated : entry))
    );
  }

  function handleDelete(id: string) {
    deleteEntry(id);
    setEntries((prev) => {
      const next = prev.filter((entry) => entry.id !== id);
      if (activeId === id) setActiveId(next[0]?.id ?? null);
      return next;
    });
  }

  return (
    <main className="grid h-screen grid-cols-[300px_1fr] overflow-hidden">
      <Sidebar
        entries={filtered}
        activeId={activeId}
        query={query}
        onQueryChange={setQuery}
        onSelect={handleSelect}
        onNew={handleNew}
      />

      <section className="h-full overflow-hidden">
        {!ready ? null : activeEntry ? (
          <Editor
            key={activeEntry.id}
            entry={activeEntry}
            onPersist={handlePersist}
            onDelete={handleDelete}
          />
        ) : (
          <EmptyState onNew={handleNew} hasEntries={entries.length > 0} />
        )}
      </section>
    </main>
  );
}

function EmptyState({
  onNew,
  hasEntries,
}: {
  onNew: () => void;
  hasEntries: boolean;
}) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 bg-paper px-6 text-center">
      <h2 className="font-serif text-2xl font-semibold text-ink">
        {hasEntries ? "Select an entry" : "Your journal is empty"}
      </h2>
      <p className="max-w-sm text-sm text-ink-soft">
        {hasEntries
          ? "Pick an entry from the left, or start a new one."
          : "A quiet place for your thoughts. Start with whatever is on your mind today."}
      </p>
      <button
        type="button"
        onClick={onNew}
        className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent/90"
      >
        New Entry
      </button>
    </div>
  );
}
