import type { Metadata } from "next";
import { siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work",
  description: "What I do, and what I'm building right now.",
};

export default function WorkPage() {
  return (
    <main className="px-6 pt-16">
      <header className="mx-auto max-w-reading text-center">
        <h1 className="title-display text-4xl sm:text-5xl">Work</h1>
        <p className="title-sub mt-5 text-lg">what I do, and what I'm building</p>
      </header>

      <div className="mx-auto mt-16 max-w-reading">
        <section className="book-prose">
          <p>
            I'm {siteName}, a startup founder. I like building small, sharp
            products and the quiet, unglamorous work that makes them feel
            inevitable in hindsight. Most of my days are spent talking to the
            people I'm building for and turning what I hear into something they
            can use.
          </p>
          <p>
            This site is where I keep the parts of that life worth writing down:
            a journal of reflections, a shelf of what I'm reading, and this short
            note on the work itself.
          </p>
        </section>

        <div className="ornament py-12" aria-hidden="true">
          ❧
        </div>

        <section>
          <h2 className="label mb-6 text-center">Currently working on</h2>
          <ul className="mx-auto max-w-md space-y-3 text-center font-serif text-lg leading-relaxed text-ink">
            <li>An early-stage company I'm not quite ready to name here.</li>
            <li>This website, as a place to think in the open.</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
