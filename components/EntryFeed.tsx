"use client";

import { Fragment } from "react";
import Link from "next/link";
import type { JournalEntry } from "@/lib/types";
import { longDate } from "@/lib/date";
import { entryTitle } from "@/lib/text";

type Props = {
  entries: JournalEntry[];
};

export default function EntryFeed({ entries }: Props) {
  return (
    <div>
      {entries.map((entry, index) => {
        const date = entry.publishedAt ?? entry.createdAt;
        const title = entryTitle(entry.title, longDate(date));

        return (
          <Fragment key={entry.id}>
            {index > 0 && (
              <div className="ornament py-12" aria-hidden="true">
                ❧
              </div>
            )}

            <article className="group relative">
              <Link
                href={`/write/${entry.id}`}
                className="absolute right-0 top-1 font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-ink-faint opacity-60 transition-opacity hover:text-accent group-hover:opacity-100"
              >
                Edit
              </Link>

              <p className="book-date mb-3 text-center text-lg">
                {longDate(date)}
              </p>
              <h2 className="book-title mb-8 text-center text-2xl">
                <Link
                  href={`/entry/${entry.id}`}
                  className="transition-colors hover:text-accent"
                >
                  {title}
                </Link>
              </h2>

              <div
                className="book-prose"
                dangerouslySetInnerHTML={{ __html: entry.content }}
              />
            </article>
          </Fragment>
        );
      })}
    </div>
  );
}
