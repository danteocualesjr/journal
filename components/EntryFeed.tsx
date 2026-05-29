"use client";

import Link from "next/link";
import type { JournalEntry } from "@/lib/types";
import { longDate } from "@/lib/date";
import { excerpt, entryTitle } from "@/lib/text";

type Props = {
  entries: JournalEntry[];
};

export default function EntryFeed({ entries }: Props) {
  return (
    <div className="divide-y divide-paper-line">
      {entries.map((entry) => {
        const date = entry.publishedAt ?? entry.createdAt;
        const title = entryTitle(entry.title, longDate(date));
        const preview = excerpt(entry.content);

        return (
          <article key={entry.id} className="py-10 first:pt-0">
            <p className="label mb-3">{longDate(date)}</p>
            <h2 className="font-serif text-3xl font-semibold leading-tight text-ink">
              <Link
                href={`/entry/${entry.id}`}
                className="transition-colors hover:text-accent"
              >
                {title}
              </Link>
            </h2>
            {preview && (
              <p className="mt-3 font-serif text-lg leading-relaxed text-ink-soft">
                {preview}
              </p>
            )}
            <Link
              href={`/entry/${entry.id}`}
              className="mt-4 inline-block font-sans text-xs font-medium uppercase tracking-label text-accent transition-colors hover:text-ink"
            >
              Continue reading →
            </Link>
          </article>
        );
      })}
    </div>
  );
}
