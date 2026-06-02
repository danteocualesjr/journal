import type { Metadata } from "next";
import { books, type Book } from "@/lib/books";

export const metadata: Metadata = {
  title: "Bookshelf",
  description: "A wall of the books I'm reading and have read.",
};

export default function BookshelfPage() {
  return (
    <main className="px-6 pt-16">
      <header className="mx-auto max-w-reading text-center">
        <h1 className="title-display text-4xl sm:text-5xl">Bookshelf</h1>
        <p className="title-sub mt-5 text-lg">a reading life, in covers</p>
      </header>

      <div className="mx-auto mt-16 max-w-feed">
        {books.length === 0 ? (
          <p className="book-date text-center text-lg">
            The shelves are empty for now.
          </p>
        ) : (
          <ul className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3">
            {books.map((book) => (
              <li key={`${book.title}-${book.author}`}>
                <BookCover book={book} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

function BookCover({ book }: { book: Book }) {
  const label = `${book.title} by ${book.author}`;

  const inner = book.cover ? (
    // Plain <img> (not next/image) keeps external cover hosts config-free.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={book.cover}
      alt={label}
      title={label}
      loading="lazy"
      className="aspect-[2/3] w-full rounded-sm object-cover shadow-[0_4px_16px_rgba(33,28,20,0.28)] ring-1 ring-ink/10 transition-transform duration-200 group-hover:-translate-y-1"
    />
  ) : (
    // Fallback when no cover image is set: a small text spine.
    <div
      title={label}
      className="flex aspect-[2/3] w-full flex-col items-center justify-center rounded-sm bg-paper-panel p-4 text-center shadow-[0_4px_16px_rgba(33,28,20,0.18)] ring-1 ring-ink/10 transition-transform duration-200 group-hover:-translate-y-1"
    >
      <span className="book-title text-base leading-snug">{book.title}</span>
      <span className="book-date mt-2 text-sm">{book.author}</span>
    </div>
  );

  return book.link ? (
    <a
      href={book.link}
      target="_blank"
      rel="noreferrer"
      className="group block"
      aria-label={label}
    >
      {inner}
    </a>
  ) : (
    <div className="group">{inner}</div>
  );
}
