import Link from "next/link";

/** A title page, set after an old book's frontispiece. */
export default function Masthead() {
  const year = new Date().getFullYear();

  return (
    <header className="relative px-6 pb-10 pt-10">
      <div className="mx-auto flex max-w-reading justify-end">
        <Link
          href="/write"
          className="font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-ink-faint transition-colors hover:text-accent"
        >
          ✎ Write
        </Link>
      </div>

      <div className="mx-auto mt-16 max-w-reading text-center">
        <h1 className="title-display text-5xl sm:text-6xl">
          The
          <br />
          Journal
        </h1>
        <p className="title-sub mt-6 text-xl">and other reflections</p>

        <div className="mx-auto mt-10 flex max-w-[6rem] items-center justify-center">
          <span className="h-px w-full bg-paper-line" />
        </div>

        <p className="label mt-10">Kept by hand · {year}</p>
      </div>
    </header>
  );
}
