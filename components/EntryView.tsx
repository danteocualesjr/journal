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

  const date = entry.publishedAt ?? entry.createdAt;
  const title = entryTitle(entry.title, longDate(date));

  return (
    <main className="min-h-screen bg-paper">
      <div className="border-b border-paper-line">
        <div className="mx-auto flex max-w-reading items-center justify-between px-6 py-3">
          <Link
            href="/"
            className="font-sans text-xs font-medium uppercase tracking-label text-ink-faint transition-colors hover:text-ink"
          >
            ← The Journal
          </Link>
          <Link
            href={`/write/${entry.id}`}
            className="font-sans text-xs font-medium uppercase tracking-label text-ink-faint transition-colors hover:text-ink"
          >
            Edit
          </Link>
        </div>
      </div>

      <article className="mx-auto max-w-reading px-6 py-16">
        <p className="label mb-4 text-center">{longDate(date)}</p>
        <h1 className="text-center font-serif text-4xl font-semibold leading-tight text-ink">
          {title}
        </h1>
        {entry.status === "draft" && (
          <p className="mt-3 text-center font-sans text-xs font-medium uppercase tracking-label text-accent">
            Draft · not yet published
          </p>
        )}
        <div className="mx-auto mt-10 flex max-w-[3rem] justify-center">
          <span className="select-none text-ink-faint">❧</span>
        </div>
        <div
          className="prose-journal mt-10"
          dangerouslySetInnerHTML={{ __html: entry.content }}
        />
      </article>

      <footer className="mx-auto max-w-reading px-6 pb-16 text-center">
        <Link
          href="/"
          className="font-sans text-xs font-medium uppercase tracking-label text-accent transition-colors hover:text-ink"
        >
          ← Back to all entries
        </Link>
      </footer>
    </main>
  );
}
