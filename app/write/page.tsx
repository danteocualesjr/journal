"use client";

import EditorView from "@/components/EditorView";

/**
 * Starting a new entry. No draft is created until the author actually
 * writes something, so abandoning a blank page leaves nothing behind.
 */
export default function NewEntryPage() {
  return <EditorView />;
}
