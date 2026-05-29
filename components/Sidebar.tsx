"use client";

import type { JournalEntry } from "@/lib/types";
import EntryList from "./EntryList";

type Props = {
  entries: JournalEntry[];
  activeId: string | null;
  query: string;
  onQueryChange: (value: string) => void;
  onSelect: (id: string) => void;
  onNew: () => void;
};

export default function Sidebar({
  entries,
  activeId,
  query,
  onQueryChange,
  onSelect,
  onNew,
}: Props) {
  return (
    <aside className="flex h-full w-full flex-col border-r border-paper-line bg-paper-panel">
      <div className="space-y-3 p-3">
        <div className="flex items-center justify-between px-1">
          <h1 className="font-serif text-lg font-semibold text-ink">Journal</h1>
          <button
            type="button"
            onClick={onNew}
            className="rounded-md bg-accent px-2.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-accent/90"
          >
            New Entry
          </button>
        </div>

        <div className="relative">
          <SearchIcon className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
          <input
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search entries"
            className="w-full rounded-md border border-paper-line bg-white py-1.5 pl-8 pr-3 text-sm text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
      </div>

      <div className="scrollbar-thin flex-1 overflow-y-auto px-1 pb-4">
        <EntryList
          entries={entries}
          activeId={activeId}
          onSelect={onSelect}
          hasQuery={query.trim().length > 0}
        />
      </div>
    </aside>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
