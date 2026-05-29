import Link from "next/link";

/** Grand, centered journal masthead used on the main reading page. */
export default function Masthead() {
  return (
    <header className="border-b border-paper-line">
      <div className="mx-auto flex max-w-feed flex-col items-center px-6 pb-8 pt-14 text-center">
        <p className="label mb-3">A Journal of Thoughts</p>
        <Link
          href="/"
          className="font-serif text-5xl font-semibold tracking-tight text-ink"
        >
          The Journal
        </Link>
        <p className="mt-3 font-serif text-lg italic text-ink-soft">
          Notes, reflections, and whatever is on the mind.
        </p>
        <Link
          href="/write"
          className="mt-7 rounded-full border border-ink/15 bg-paper px-5 py-2 font-sans text-xs font-medium uppercase tracking-label text-ink transition-colors hover:border-ink/40"
        >
          Write an entry
        </Link>
      </div>
    </header>
  );
}
