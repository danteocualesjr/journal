/**
 * The bookshelf is static data you edit here in code. Add or remove a book
 * by editing the `books` array below; the Bookshelf page shows them all
 * together as a wall of covers.
 *
 * Covers use the Open Library Covers API (no key required). The easiest way
 * to get one is by ISBN:
 *   https://covers.openlibrary.org/b/isbn/<ISBN>-L.jpg
 * Replace <ISBN> with the book's ISBN-13 (digits only). Or drop in any other
 * image URL. If `cover` is omitted, the book shows as a small text card.
 */

export type Book = {
  title: string;
  author: string;
  /** URL to a cover image (portrait works best). */
  cover?: string;
  /** Optional one-line note or thought about the book. */
  note?: string;
  /** Optional year read or published. */
  year?: number;
  /** Optional external link (publisher, review, store, etc.). */
  link?: string;
};

export const books: Book[] = [
  {
    title: "The Lord of the Rings",
    author: "J. R. R. Tolkien",
    cover: "https://covers.openlibrary.org/b/isbn/9780544003415-L.jpg",
    note: "Rereading the Fellowship slowly, a few chapters a night.",
  },
  {
    title: "Zero to One",
    author: "Peter Thiel",
    cover: "https://covers.openlibrary.org/b/isbn/9780804139298-L.jpg",
    note: "Notes for the company; revisiting the chapter on secrets.",
  },
  {
    title: "Meditations",
    author: "Marcus Aurelius",
    cover: "https://covers.openlibrary.org/b/isbn/9780140449334-L.jpg",
    year: 2025,
    note: "A book to keep on the desk and open at random.",
  },
  {
    title: "The Mom Test",
    author: "Rob Fitzpatrick",
    cover: "https://covers.openlibrary.org/b/isbn/9781492180746-L.jpg",
    year: 2025,
    note: "The clearest thing I've read on talking to customers.",
  },
  {
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt & David Thomas",
    cover: "https://covers.openlibrary.org/b/isbn/9780135957059-L.jpg",
    year: 2024,
  },
  {
    title: "Crime and Punishment",
    author: "Fyodor Dostoevsky",
    cover: "https://covers.openlibrary.org/b/isbn/9780140449136-L.jpg",
  },
  {
    title: "The Beginning of Infinity",
    author: "David Deutsch",
    cover: "https://covers.openlibrary.org/b/isbn/9780143121350-L.jpg",
    note: "Recommended too many times to keep ignoring.",
  },
];
