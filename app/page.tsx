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
    <main className="min-h-screen pb-24">
      <Masthead />

      <div className="mx-auto max-w-reading px-6">
        {!mounted ? null : published.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className="ornament pb-14" aria-hidden="true">
              ❧
            </div>
            <EntryFeed entries={published} />
          </>
        )}

        {mounted && drafts.length > 0 && <Drafts drafts={drafts} />}
      </div>

      {mounted && published.length > 0 && (
        <div className="mx-auto mt-16 max-w-reading px-6 text-center">
          <Link
            href="/write"
            className="font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-ink-faint transition-colors hover:text-accent"
          >
            ✎ Write a new entry
          </Link>
        </div>
      )}
    </main>
  );
}

function EmptyState() {
  return (
    <div className="py-16 text-center">
      <p className="book-date mb-3 text-lg">The first leaf is blank</p>
      <p className="mx-auto mt-3 max-w-sm font-serif text-xl italic leading-relaxed text-ink-soft">
        Every book begins on an empty page. Write something and publish it to
        see it set here in print.
      </p>
      <Link
        href="/write"
        className="mt-9 inline-block border border-ink/25 px-6 py-2.5 font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-ink transition-colors hover:border-ink/60"
      >
        Begin writing
      </Link>
    </div>
  );
}

function Drafts({ drafts }: { drafts: JournalEntry[] }) {
  return (
    <section className="mx-auto mt-20 max-w-reading border-t border-paper-line pt-8">
      <h3 className="label mb-4 text-center">Unfinished · {drafts.length}</h3>
      <ul className="space-y-2">
        {drafts.map((draft) => (
          <li key={draft.id}>
            <Link
              href={`/write/${draft.id}`}
              className="group flex items-baseline justify-between gap-3 px-2 py-1.5 transition-colors hover:bg-paper-panel/60"
            >
              <span className="truncate font-serif text-lg italic text-ink-soft group-hover:text-ink">
                {entryTitle(draft.title, "Untitled draft")}
              </span>
              <span className="font-sans text-[11px] uppercase tracking-[0.12em] text-ink-faint">
                edited {savedLabel(draft.updatedAt)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
