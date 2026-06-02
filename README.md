# Personal Website

A small personal website set like the pages of an old book. The **journal** is the default home page; a **bookshelf** and a short **work** page round out the site, with a site-wide nav and a footer that doubles as a "Connect" section. Journal entries are written in a calm, distraction-free editor and stored locally in your browser, so nothing leaves your machine and no account is required.

## Sections

- **Journal** (`/`) — the default home: a literary front page with a masthead, then your published entries as a reading feed, newest first. Unfinished drafts are listed quietly at the bottom.
- **Bookshelf** (`/bookshelf`) — all my books shown together as a wall of covers. Edit the list (and cover image URLs) in `lib/books.ts`.
- **Work** (`/work`) — a short note on what you do and what you're building now.
- **Connect** — the site-wide footer, with email/social links from `lib/site.ts`.

## Editing the site

- **Your name, tagline, nav, and links** live in `lib/site.ts`.
- **Books** live in `lib/books.ts` — add or remove a book (with a cover image URL) by editing the `books` array.
- **Journal entries** are written in the app at `/write` and stored in `localStorage`.

## Journal flow

- **Editor view** (`/write`) — a clean writing surface with a title, rich text body, and autosave. Hitting **Publish** moves the entry into the main feed.
- **Reading view** (`/entry/[id]`) — a single entry presented as an article, with an Edit link back to the editor.

## Features

- Rich text editor (headings, bold/italic, lists, quotes, code) powered by Tiptap
- Draft → Publish workflow; published entries appear in the main reading feed
- Drafts autosave as you write, with a last-saved indicator; empty drafts are discarded automatically
- Literary typography (EB Garamond serif) on a warm paper palette
- Fully local persistence for the journal via `localStorage`

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

## How journal storage works

- All entries are stored as a single JSON array under one `localStorage` key.
- Reads and writes go through `lib/storage.ts`. This is the only file that knows about storage, so swapping `localStorage` for a cloud backend (e.g. Supabase) later only touches that file.

## Project structure

```
app/
  layout.tsx           Root layout: fonts, site nav + footer, metadata
  page.tsx             Journal home: masthead + published feed + drafts
  globals.css          Tailwind + literary typography
  write/page.tsx       New entry (creates a draft, hands off to /write/[id])
  write/[id]/page.tsx  Edit a draft or published entry
  entry/[id]/page.tsx  Read a single entry
  bookshelf/page.tsx   Bookshelf, grouped by shelf (static data)
  work/page.tsx        Short work / about page
components/
  SiteNav.tsx          Site-wide top nav (wordmark, links, Write)
  SiteFooter.tsx       Site-wide footer = Connect section
  Masthead.tsx         Journal title page on the home view
  EntryFeed.tsx        Published entries as a reading feed
  EditorView.tsx       Loads an entry and wires persist/publish/delete
  Editor.tsx           Tiptap writing surface, autosave, Publish
  Toolbar.tsx          Formatting controls
  EntryView.tsx        Full-entry reading view
lib/
  site.ts              Site identity: name, tagline, nav, connect links
  books.ts             Book type + the bookshelf data
  types.ts             JournalEntry type (draft | published)
  storage.ts           localStorage CRUD + publish queries (the storage seam)
  store.ts             Reactive layer over storage (useEntries + selectors)
  date.ts              Date formatting helpers
  text.ts              Excerpts, plain-text, content checks
```

## Roadmap

Intentionally out of scope but easy to add later:

- Cloud sync / login (Supabase) via the `lib/storage.ts` seam
- A Now page, Projects, or About/Colophon section
- Per-book notes/reviews, tags, search, export
