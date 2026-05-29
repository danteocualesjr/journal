"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import type { JournalEntry } from "@/lib/types";
import { dayLabel, timeLabel, savedLabel } from "@/lib/date";
import Toolbar from "./Toolbar";

type Props = {
  entry: JournalEntry;
  onPersist: (
    id: string,
    patch: Partial<Pick<JournalEntry, "title" | "content">>
  ) => void;
  onDelete: (id: string) => void;
};

const AUTOSAVE_MS = 600;

export default function Editor({ entry, onPersist, onDelete }: Props) {
  const [title, setTitle] = useState(entry.title);
  const [savedAt, setSavedAt] = useState<string>(entry.updatedAt);
  const [isSaving, setIsSaving] = useState(false);

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Always persist the latest values when the debounce fires.
  const latest = useRef({ title: entry.title, content: entry.content });

  const flush = useCallback(() => {
    onPersist(entry.id, {
      title: latest.current.title,
      content: latest.current.content,
    });
    setSavedAt(new Date().toISOString());
    setIsSaving(false);
  }, [entry.id, onPersist]);

  const scheduleSave = useCallback(() => {
    setIsSaving(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(flush, AUTOSAVE_MS);
  }, [flush]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: "Write your thoughts…" }),
    ],
    content: entry.content || "",
    editorProps: {
      attributes: {
        class: "min-h-[60vh] max-w-none focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      latest.current.content = editor.getHTML();
      scheduleSave();
    },
  });

  // Flush any pending save when unmounting (e.g. switching entries).
  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
        flush();
      }
    };
  }, [flush]);

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

  function handleDelete() {
    const confirmed = window.confirm("Delete this entry? This cannot be undone.");
    if (confirmed) onDelete(entry.id);
  }

  return (
    <div className="flex h-full flex-col bg-paper">
      <Toolbar editor={editor} />

      <div className="flex items-center justify-between border-b border-paper-line px-6 py-2 text-xs text-ink-faint">
        <span>
          {dayLabel(entry.createdAt)} · {timeLabel(entry.createdAt)}
        </span>
        <div className="flex items-center gap-3">
          <span>{isSaving ? "Saving…" : `Saved ${savedLabel(savedAt)}`}</span>
          <button
            type="button"
            onClick={handleDelete}
            className="rounded px-2 py-1 font-medium text-ink-soft transition-colors hover:bg-paper-panel hover:text-accent"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="scrollbar-thin flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-2xl px-6 py-8">
          <input
            type="text"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Title"
            className="mb-4 w-full bg-transparent font-serif text-3xl font-semibold text-ink placeholder:text-ink-faint focus:outline-none"
          />
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
}
