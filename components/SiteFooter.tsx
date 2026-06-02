import { connectLinks, siteName } from "@/lib/site";

/**
 * The site-wide footer, which doubles as the "Connect" section:
 * a row of links to reach me, plus a quiet colophon line.
 */
export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 px-6 pb-16">
      <div className="mx-auto max-w-feed border-t border-paper-line pt-8 text-center">
        <h2 className="label mb-5">Connect</h2>

        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {connectLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-ink-soft transition-colors hover:text-accent"
                {...(link.href.startsWith("http")
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-8 font-serif text-sm italic text-ink-faint">
          {siteName} · {year} · Set like the pages of an old book.
        </p>
      </div>
    </footer>
  );
}
