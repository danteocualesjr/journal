import type { JournalEntry } from "./types";
import { hasContent } from "./text";

/**
 * The single seam between the app and where entries live.
 * Today this is localStorage; swapping in a cloud backend (e.g. Supabase)
 * later means changing only this file.
 */

const STORAGE_KEY = "journal.entries.v1";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

/**
 * Bring an entry up to the current shape. Entries written by earlier
 * versions had no status/publishedAt; treat those as already published
 * so nothing the author wrote disappears.
 */
function normalize(raw: Partial<JournalEntry> & { id: string }): JournalEntry {
  const createdAt = raw.createdAt ?? new Date().toISOString();
  const status = raw.status ?? "published";
  return {
    id: raw.id,
    title: raw.title ?? "",
    content: raw.content ?? "",
    status,
    createdAt,
    updatedAt: raw.updatedAt ?? createdAt,
    publishedAt:
      raw.publishedAt ?? (status === "published" ? createdAt : null),
  };
}

function readAllRaw(): JournalEntry[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((e) => e && typeof e.id === "string")
      .map(normalize);
  } catch {
    return [];
  }
}

function writeAll(entries: JournalEntry[]): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch {
    // Storage may be full or unavailable; fail quietly so writing never throws.
  }
}

function newId(): string {
  if (isBrowser() && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function byDateDesc(key: keyof Pick<JournalEntry, "createdAt" | "publishedAt" | "updatedAt">) {
  return (a: JournalEntry, b: JournalEntry) => {
    const at = new Date(a[key] ?? a.createdAt).getTime();
    const bt = new Date(b[key] ?? b.createdAt).getTime();
    return bt - at;
  };
}

/** Every entry, newest-created first. */
export function getEntries(): JournalEntry[] {
  return readAllRaw().sort(byDateDesc("createdAt"));
}

/** Published entries only, most recently published first. */
export function getPublishedEntries(): JournalEntry[] {
  return readAllRaw()
    .filter((e) => e.status === "published")
    .sort(byDateDesc("publishedAt"));
}

/** Draft entries with some content, most recently edited first. */
export function getDrafts(): JournalEntry[] {
  return readAllRaw()
    .filter((e) => e.status === "draft" && hasContent(e.title, e.content))
    .sort(byDateDesc("updatedAt"));
}

export function getEntry(id: string): JournalEntry | undefined {
  return readAllRaw().find((entry) => entry.id === id);
}

/** Create a blank draft, persist it, and return it. */
export function createEntry(): JournalEntry {
  const now = new Date().toISOString();
  const entry: JournalEntry = {
    id: newId(),
    title: "",
    content: "",
    status: "draft",
    createdAt: now,
    updatedAt: now,
    publishedAt: null,
  };
  const entries = readAllRaw();
  entries.push(entry);
  writeAll(entries);
  return entry;
}

/** Patch an existing entry's editable fields and bump updatedAt. */
export function updateEntry(
  id: string,
  patch: Partial<Pick<JournalEntry, "title" | "content">>
): JournalEntry | undefined {
  const entries = readAllRaw();
  const index = entries.findIndex((entry) => entry.id === id);
  if (index === -1) return undefined;

  const updated: JournalEntry = {
    ...entries[index],
    ...patch,
    updatedAt: new Date().toISOString(),
  };
  entries[index] = updated;
  writeAll(entries);
  return updated;
}

/** Mark an entry published (setting publishedAt the first time). */
export function publishEntry(id: string): JournalEntry | undefined {
  const entries = readAllRaw();
  const index = entries.findIndex((entry) => entry.id === id);
  if (index === -1) return undefined;

  const now = new Date().toISOString();
  const updated: JournalEntry = {
    ...entries[index],
    status: "published",
    publishedAt: entries[index].publishedAt ?? now,
    updatedAt: now,
  };
  entries[index] = updated;
  writeAll(entries);
  return updated;
}

/** Return a published entry to draft state for further editing. */
export function unpublishEntry(id: string): JournalEntry | undefined {
  const entries = readAllRaw();
  const index = entries.findIndex((entry) => entry.id === id);
  if (index === -1) return undefined;

  const updated: JournalEntry = {
    ...entries[index],
    status: "draft",
    updatedAt: new Date().toISOString(),
  };
  entries[index] = updated;
  writeAll(entries);
  return updated;
}

export function deleteEntry(id: string): void {
  const entries = readAllRaw().filter((entry) => entry.id !== id);
  writeAll(entries);
}
