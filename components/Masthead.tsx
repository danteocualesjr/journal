/** A title page, set after an old book's frontispiece. */
export default function Masthead() {
  const year = new Date().getFullYear();

  return (
    <header className="relative px-6 pb-10 pt-16">
      <div className="mx-auto max-w-reading text-center">
        <h1 className="title-display text-5xl sm:text-6xl">Journal</h1>
        <p className="title-sub mt-6 text-xl">and other reflections</p>

        <div className="mx-auto mt-10 flex max-w-[6rem] items-center justify-center">
          <span className="h-px w-full bg-paper-line" />
        </div>

        <p className="label mt-10">Kept by hand · {year}</p>
      </div>
    </header>
  );
}
