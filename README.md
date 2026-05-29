# The Journal

A minimal, private journal styled like a small literary publication. Write in a calm, distraction-free editor, hit Publish, and your entries appear in a reading feed on the main page. Everything is stored locally in your browser, so nothing leaves your machine and no account is required.

## How it flows

- **Main view** (`/`) — a literary front page: masthead, then your published entries as a reading feed, newest first. Unfinished drafts are listed quietly at the bottom.
- **Editor view** (`/write`) — a clean writing surface with a title, rich text body, and autosave. Hitting **Publish** moves the entry into the main feed.
- **Reading view** (`/entry/[id]`) — a single entry presented as an article, with an Edit link back to the editor.

## Features

- Rich text editor (headings, bold/italic, lists, quotes, code) powered by Tiptap
- Draft → Publish workflow; published entries appear in the main reading feed
- Drafts autosave as you write, with a last-saved indicator; empty drafts are discarded automatically
- Literary typography (Newsreader serif) on a warm paper palette
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
  layout.tsx          Root layout + Newsreader font
  page.tsx            Main view: masthead + published feed + drafts
  globals.css         Tailwind + literary typography
  write/page.tsx      New entry (creates a draft, hands off to /write/[id])
  write/[id]/page.tsx Edit a draft or published entry
  entry/[id]/page.tsx Read a single entry
components/
  Masthead.tsx        Journal masthead on the main page
  EntryFeed.tsx       Published entries as a reading feed
  EditorView.tsx      Loads an entry and wires persist/publish/delete
  Editor.tsx          Tiptap writing surface, autosave, Publish
  Toolbar.tsx         Formatting controls
  EntryView.tsx       Full-entry reading view
lib/
  types.ts            JournalEntry type (draft | published)
  storage.ts          localStorage CRUD + publish queries (the storage seam)
  date.ts             Date formatting helpers
  text.ts             Excerpts, plain-text, content checks
```

## Roadmap

These are intentionally out of scope but easy to add later:

- Cloud sync / login (Supabase) via the `lib/storage.ts` seam
- Tags, mood tracking, daily prompts, search, export
# journal
