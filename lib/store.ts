"use client";

import { useSyncExternalStore } from "react";
import type { JournalEntry } from "./types";
import {
  getEntries as readEntries,
  createEntry as persistCreate,
  updateEntry as persistUpdate,
  publishEntry as persistPublish,
  deleteEntry as persistDelete,
} from "./storage";
import { hasContent } from "./text";

/**
 * A small reactive layer over the localStorage-backed `storage` module.
 *
 * Every view subscribes to the same snapshot, so a change made in the editor
 * is reflected immediately in the feed and reading views — even when Next.js
 * restores a page from its client-side Router Cache without remounting it.
 */

const EMPTY: JournalEntry[] = [];

let cache: JournalEntry[] | null = null;
const listeners = new Set<() => void>();
let storageBound = false;

function refresh(): void {
  cache = readEntries();
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);

  // Keep multiple tabs in sync without polling.
  if (!storageBound && typeof window !== "undefined") {
    storageBound = true;
    window.addEventListener("storage", refresh);
  }

  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): JournalEntry[] {
  if (cache === null) cache = readEntries();
  return cache;
}

function getServerSnapshot(): JournalEntry[] {
  return EMPTY;
}

/** Live list of every entry (newest-created first). */
export function useEntries(): JournalEntry[] {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

// ---- Pure selectors over a snapshot ----

export function selectPublished(entries: JournalEntry[]): JournalEntry[] {
  return entries
    .filter((e) => e.status === "published")
    .sort((a, b) => time(b.publishedAt ?? b.createdAt) - time(a.publishedAt ?? a.createdAt));
}

export function selectDrafts(entries: JournalEntry[]): JournalEntry[] {
  return entries
    .filter((e) => e.status === "draft" && hasContent(e.title, e.content))
    .sort((a, b) => time(b.updatedAt) - time(a.updatedAt));
}

export function selectEntry(
  entries: JournalEntry[],
  id: string
): JournalEntry | undefined {
  return entries.find((e) => e.id === id);
}

function time(iso: string): number {
  return new Date(iso).getTime();
}

// ---- Mutations (write through, then notify) ----

export function createDraft(): JournalEntry {
  const entry = persistCreate();
  refresh();
  return entry;
}

export function saveEntry(
  id: string,
  patch: Partial<Pick<JournalEntry, "title" | "content">>
): void {
  persistUpdate(id, patch);
  refresh();
}

export function publishDraft(id: string): void {
  persistPublish(id);
  refresh();
}

export function removeEntry(id: string): void {
  persistDelete(id);
  refresh();
}
