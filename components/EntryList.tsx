"use client";

import type { JournalEntry } from "@/lib/types";
import { groupEntriesByDay } from "@/lib/date";
import EntryListItem from "./EntryListItem";

type Props = {
  entries: JournalEntry[];
  activeId: string | null;
  onSelect: (id: string) => void;
  hasQuery: boolean;
};

export default function EntryList({
  entries,
  activeId,
  onSelect,
  hasQuery,
}: Props) {
  if (entries.length === 0) {
    return (
      <p className="px-3 py-6 text-center text-sm text-ink-faint">
        {hasQuery ? "No entries match your search." : "No entries yet."}
      </p>
    );
  }

  const groups = groupEntriesByDay(entries);

  return (
    <div className="space-y-4">
      {groups.map((group) => (
        <section key={group.label}>
          <h2 className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wide text-ink-faint">
            {group.label}
          </h2>
          <div className="space-y-0.5">
            {group.entries.map((entry) => (
              <EntryListItem
                key={entry.id}
                entry={entry}
                isActive={entry.id === activeId}
                onSelect={onSelect}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
