import type { JournalEntry } from "./types";

/**
 * The single seam between the app and where entries live.
 * Today this is localStorage; swapping in a cloud backend (e.g. Supabase)
 * later means changing only this file.
 */

const STORAGE_KEY = "journal.entries.v1";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function readAllRaw(): JournalEntry[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as JournalEntry[];
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

/** All entries, sorted newest-first by creation time. */
export function getEntries(): JournalEntry[] {
  return readAllRaw().sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getEntry(id: string): JournalEntry | undefined {
  return readAllRaw().find((entry) => entry.id === id);
}

/** Create a blank entry, persist it, and return it. */
export function createEntry(): JournalEntry {
  const now = new Date().toISOString();
  const entry: JournalEntry = {
    id: newId(),
    title: "",
    content: "",
    createdAt: now,
    updatedAt: now,
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

export function deleteEntry(id: string): void {
  const entries = readAllRaw().filter((entry) => entry.id !== id);
  writeAll(entries);
}
