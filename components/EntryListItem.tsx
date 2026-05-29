"use client";

import type { JournalEntry } from "@/lib/types";
import { timeLabel } from "@/lib/date";
import { htmlToText, entryTitle } from "@/lib/text";

type Props = {
  entry: JournalEntry;
  isActive: boolean;
  onSelect: (id: string) => void;
};

export default function EntryListItem({ entry, isActive, onSelect }: Props) {
  const preview = htmlToText(entry.content);
  const title = entryTitle(entry.title, "Untitled");

  return (
    <button
      type="button"
      onClick={() => onSelect(entry.id)}
      className={[
        "w-full rounded-lg px-3 py-2.5 text-left transition-colors",
        isActive
          ? "bg-white shadow-sm ring-1 ring-paper-line"
          : "hover:bg-white/60",
      ].join(" ")}
    >
      <div className="flex items-baseline justify-between gap-2">
        <span className="truncate text-sm font-medium text-ink">{title}</span>
        <span className="shrink-0 text-[11px] text-ink-faint">
          {timeLabel(entry.createdAt)}
        </span>
      </div>
      <p className="mt-0.5 line-clamp-2 text-xs text-ink-soft">
        {preview || "No additional text"}
      </p>
    </button>
  );
}
