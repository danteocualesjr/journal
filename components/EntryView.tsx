"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useEntries, selectEntry } from "@/lib/store";
import { longDate } from "@/lib/date";
import { entryTitle } from "@/lib/text";

type Props = {
  entryId: string;
};

export default function EntryView({ entryId }: Props) {
  const entries = useEntries();
  const entry = selectEntry(entries, entryId);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  if (!entry) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="font-serif text-2xl font-semibold text-ink">
          This entry could not be found
        </h1>
        <Link href="/" className="link-accent font-serif text-lg italic">
          Return to the journal
        </Link>
      </main>
    );
  }

  const date = entry.publishedAt ?? entry.createdAt;
  const title = entryTitle(entry.title, longDate(date));

  return (
    <main className="min-h-screen pb-20">
      <div className="mx-auto flex max-w-reading items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-ink-faint transition-colors hover:text-accent"
        >
          ← The Journal
        </Link>
        <Link
          href={`/write/${entry.id}`}
          className="font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-ink-faint transition-colors hover:text-accent"
        >
          ✎ Edit
        </Link>
      </div>

      <article className="mx-auto max-w-reading px-6 pt-12">
        <p className="book-date mb-3 text-center text-lg">{longDate(date)}</p>
        <h1 className="book-title text-center text-3xl">{title}</h1>
        {entry.status === "draft" && (
          <p className="mt-4 text-center font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-accent">
            Draft · not yet published
          </p>
        )}
        <div className="ornament py-12" aria-hidden="true">
          ❧
        </div>
        <div
          className="book-prose"
          dangerouslySetInnerHTML={{ __html: entry.content }}
        />
      </article>

      <footer className="mx-auto mt-16 max-w-reading px-6 text-center">
        <Link
          href="/"
          className="font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-accent transition-colors hover:text-ink"
        >
          ← Back to all entries
        </Link>
      </footer>
    </main>
  );
}
