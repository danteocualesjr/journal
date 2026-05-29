# Journal

A minimal, private personal journal. Write your daily thoughts with a clean rich text editor, browse entries grouped by date, and search instantly. Everything is stored locally in your browser, so nothing leaves your machine and no account is required.

## Features

- Rich text editor (headings, bold/italic, lists, quotes, code) powered by Tiptap
- Entries grouped by day: Today, Yesterday, then dated headers, newest first
- Live search across titles and entry text
- Autosave as you write, with a last-saved indicator
- Fully local persistence via `localStorage`

## Tech stack

- [Next.js](https://nextjs.org/) (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/)
- [Tiptap](https://tiptap.dev/) rich text editor

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## How it works

- All entries are stored as a single JSON array under one `localStorage` key.
- Reads and writes go through `lib/storage.ts`. This is the only file that knows about storage, so swapping `localStorage` for a cloud backend (e.g. Supabase) later only touches that file.

## Project structure

```
app/
  layout.tsx       Root layout + global styles
  page.tsx         Main journal screen (state + wiring)
  globals.css      Tailwind + editor typography
components/
  Sidebar.tsx      New Entry button, search, grouped list
  EntryList.tsx    Date-grouped entry previews
  EntryListItem.tsx
  Editor.tsx       Tiptap editor, title, autosave, delete
  Toolbar.tsx      Formatting controls
lib/
  types.ts         JournalEntry type
  storage.ts       localStorage CRUD (the storage seam)
  date.ts          Date grouping/formatting helpers
```

## Roadmap

These are intentionally out of scope for v1 but easy to add later:

- Cloud sync / login (Supabase) via the `lib/storage.ts` seam
- Tags, mood tracking, daily prompts, calendar view, export
# journal
