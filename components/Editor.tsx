"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import type { EntryStatus } from "@/lib/types";
import { savedLabel } from "@/lib/date";
import { hasContent } from "@/lib/text";
import Toolbar from "./Toolbar";

type Patch = { title: string; content: string };

type Props = {
  initialTitle: string;
  initialContent: string;
  status: EntryStatus;
  /** Last save time for the indicator, or null for an unsaved new entry. */
  lastSavedAt: string | null;
  /** Debounced autosave of the latest title + body. */
  onChange: (patch: Patch) => void;
  /** Persist the latest content and publish. */
  onPublish: (patch: Patch) => void;
  onDelete: () => void;
};

const AUTOSAVE_MS = 600;

export default function Editor({
  initialTitle,
  initialContent,
  status,
  lastSavedAt,
  onChange,
  onPublish,
  onDelete,
}: Props) {
  const [title, setTitle] = useState(initialTitle);
  const [savedAt, setSavedAt] = useState<string | null>(lastSavedAt);
  const [isSaving, setIsSaving] = useState(false);
  const [canPublish, setCanPublish] = useState(
    hasContent(initialTitle, initialContent)
  );

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const latest = useRef<Patch>({ title: initialTitle, content: initialContent });

  const flush = useCallback(() => {
    onChange({ ...latest.current });
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
    setSavedAt(new Date().toISOString());
    setIsSaving(false);
  }, [onChange]);

  const scheduleSave = useCallback(() => {
    setIsSaving(true);
    setCanPublish(hasContent(latest.current.title, latest.current.content));
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(flush, AUTOSAVE_MS);
  }, [flush]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: "Start writing…" }),
    ],
    content: initialContent || "",
    editorProps: {
      attributes: { class: "prose-journal min-h-[50vh] focus:outline-none" },
    },
    onUpdate: ({ editor }) => {
      latest.current.content = editor.getHTML();
      scheduleSave();
    },
  });

  // Flush only genuinely-pending edits on unmount. When there is no active
  // timer (e.g. nothing typed yet, or already saved) this does nothing, which
  // keeps it safe under React Strict Mode's mount/unmount/mount cycle.
  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
        onChange({ ...latest.current });
      }
    };
  }, [onChange]);

  // Refresh the "saved … ago" label periodically.
  const [, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 15000);
    return () => clearInterval(id);
  }, []);

  function handleTitleChange(value: string) {
    setTitle(value);
    latest.current.title = value;
    scheduleSave();
  }

  function handlePublish() {
    if (!canPublish) return;
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
    onPublish({ ...latest.current });
  }

  function handleDelete() {
    const confirmed = window.confirm(
      "Delete this entry? This cannot be undone."
    );
    if (!confirmed) return;
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
    onDelete();
  }

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <div className="sticky top-0 z-10 border-b border-paper-line bg-paper/90 backdrop-blur">
        <div className="mx-auto flex max-w-reading items-center justify-between px-6 py-3">
          <Link
            href="/"
            className="font-sans text-xs font-medium uppercase tracking-label text-ink-faint transition-colors hover:text-ink"
          >
            ← The Journal
          </Link>
          <div className="flex items-center gap-4">
            <span className="font-sans text-xs text-ink-faint">
              {isSaving
                ? "Saving…"
                : savedAt
                  ? `Saved ${savedLabel(savedAt)}`
                  : "Unsaved"}
            </span>
            <button
              type="button"
              onClick={handleDelete}
              className="font-sans text-xs font-medium uppercase tracking-label text-ink-faint transition-colors hover:text-accent"
            >
              Delete
            </button>
            <button
              type="button"
              onClick={handlePublish}
              disabled={!canPublish}
              className="rounded-full bg-accent px-4 py-1.5 font-sans text-xs font-medium uppercase tracking-label text-paper transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {status === "published" ? "Update" : "Publish"}
            </button>
          </div>
        </div>
        <Toolbar editor={editor} />
      </div>

      <div className="scrollbar-thin flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-reading px-6 py-12">
          <input
            type="text"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Title"
            className="mb-6 w-full bg-transparent font-serif text-4xl font-semibold leading-tight text-ink placeholder:text-ink-faint focus:outline-none"
          />
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
}
