"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { JournalEntry } from "@/lib/types";
import { useEntries, selectPublished, selectDrafts } from "@/lib/store";
import { entryTitle } from "@/lib/text";
import { savedLabel } from "@/lib/date";
import Masthead from "@/components/Masthead";
import EntryFeed from "@/components/EntryFeed";

export default function HomePage() {
  const entries = useEntries();
  const published = useMemo(() => selectPublished(entries), [entries]);
  const drafts = useMemo(() => selectDrafts(entries), [entries]);

  // Avoid flashing the empty state before the store hydrates on the client.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <main className="min-h-screen">
      <Masthead />

      <div className="mx-auto max-w-feed px-6 py-12">
        {!mounted ? null : published.length === 0 ? (
          <EmptyState />
        ) : (
          <EntryFeed entries={published} />
        )}

        {mounted && drafts.length > 0 && <Drafts drafts={drafts} />}
      </div>

      <footer className="mx-auto max-w-feed px-6 pb-12 pt-4 text-center">
        <p className="label">Written by hand · stored on this device</p>
      </footer>
    </main>
  );
}

function EmptyState() {
  return (
    <div className="py-16 text-center">
      <h2 className="font-serif text-2xl font-semibold text-ink">
        The first page is blank
      </h2>
      <p className="mx-auto mt-3 max-w-sm font-serif text-lg italic text-ink-soft">
        Every journal starts empty. Write something down and publish it to see
        it appear here.
      </p>
      <Link
        href="/write"
        className="mt-7 inline-block rounded-full bg-accent px-6 py-2.5 font-sans text-xs font-medium uppercase tracking-label text-paper transition-colors hover:bg-accent/90"
      >
        Begin writing
      </Link>
    </div>
  );
}

function Drafts({ drafts }: { drafts: JournalEntry[] }) {
  return (
    <section className="mt-14 border-t border-paper-line pt-8">
      <h3 className="label mb-4">Drafts · {drafts.length}</h3>
      <ul className="space-y-2">
        {drafts.map((draft) => (
          <li key={draft.id}>
            <Link
              href={`/write/${draft.id}`}
              className="group flex items-baseline justify-between gap-3 rounded-md px-2 py-1.5 transition-colors hover:bg-paper-panel"
            >
              <span className="truncate font-serif text-lg text-ink-soft group-hover:text-ink">
                {entryTitle(draft.title, "Untitled draft")}
              </span>
              <span className="label shrink-0 normal-case tracking-normal">
                edited {savedLabel(draft.updatedAt)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
