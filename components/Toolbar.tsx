"use client";

import type { Editor } from "@tiptap/react";

type Props = {
  editor: Editor | null;
};

type ToolButton = {
  label: string;
  title: string;
  isActive: () => boolean;
  run: () => void;
};

export default function Toolbar({ editor }: Props) {
  if (!editor) return null;

  const buttons: ToolButton[] = [
    {
      label: "H1",
      title: "Heading 1",
      isActive: () => editor.isActive("heading", { level: 1 }),
      run: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    },
    {
      label: "H2",
      title: "Heading 2",
      isActive: () => editor.isActive("heading", { level: 2 }),
      run: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    {
      label: "B",
      title: "Bold",
      isActive: () => editor.isActive("bold"),
      run: () => editor.chain().focus().toggleBold().run(),
    },
    {
      label: "I",
      title: "Italic",
      isActive: () => editor.isActive("italic"),
      run: () => editor.chain().focus().toggleItalic().run(),
    },
    {
      label: "•",
      title: "Bullet list",
      isActive: () => editor.isActive("bulletList"),
      run: () => editor.chain().focus().toggleBulletList().run(),
    },
    {
      label: "1.",
      title: "Numbered list",
      isActive: () => editor.isActive("orderedList"),
      run: () => editor.chain().focus().toggleOrderedList().run(),
    },
    {
      label: "❝",
      title: "Quote",
      isActive: () => editor.isActive("blockquote"),
      run: () => editor.chain().focus().toggleBlockquote().run(),
    },
    {
      label: "</>",
      title: "Code block",
      isActive: () => editor.isActive("codeBlock"),
      run: () => editor.chain().focus().toggleCodeBlock().run(),
    },
  ];

  return (
    <div className="border-t border-paper-line/70">
      <div className="mx-auto flex max-w-reading flex-wrap items-center gap-1 px-5 py-1.5">
        {buttons.map((btn) => (
          <button
            key={btn.title}
            type="button"
            title={btn.title}
            aria-pressed={btn.isActive()}
            onClick={btn.run}
            className={[
              "min-w-[2rem] rounded px-2 py-1 font-sans text-sm transition-colors",
              btn.isActive()
                ? "bg-accent-soft text-ink"
                : "text-ink-soft hover:bg-paper-panel",
            ].join(" ")}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}
