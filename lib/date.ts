import type { JournalEntry } from "./types";

function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

/** Human label for a day relative to today (Today / Yesterday / full date). */
export function dayLabel(iso: string): string {
  const date = startOfDay(new Date(iso));
  const today = startOfDay(new Date());
  const diffDays = Math.round(
    (today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";

  return date.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year:
      date.getFullYear() === today.getFullYear() ? undefined : "numeric",
  });
}

/** Short time label, e.g. "1:24 PM". */
export function timeLabel(iso: string): string {
  return new Date(iso).toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
}

/** "just now" / "2 min ago" / time, for the last-saved indicator. */
export function savedLabel(iso: string): string {
  const then = new Date(iso).getTime();
  const seconds = Math.round((Date.now() - then) / 1000);

  if (seconds < 5) return "just now";
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  return `at ${timeLabel(iso)}`;
}

export type EntryGroup = {
  /** Day label used as the section header. */
  label: string;
  entries: JournalEntry[];
};

/**
 * Group entries (assumed newest-first) into ordered day buckets.
 */
export function groupEntriesByDay(entries: JournalEntry[]): EntryGroup[] {
  const groups: EntryGroup[] = [];
  let current: EntryGroup | null = null;

  for (const entry of entries) {
    const label = dayLabel(entry.createdAt);
    if (!current || current.label !== label) {
      current = { label, entries: [] };
      groups.push(current);
    }
    current.entries.push(entry);
  }

  return groups;
}
