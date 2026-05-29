/** Convert Tiptap HTML content into plain text for previews and search. */
export function htmlToText(html: string): string {
  if (!html) return "";
  if (typeof document !== "undefined") {
    const el = document.createElement("div");
    el.innerHTML = html;
    return (el.textContent || el.innerText || "").replace(/\s+/g, " ").trim();
  }
  // SSR / non-DOM fallback: strip tags crudely.
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Title to display for an entry, falling back to a date when untitled. */
export function entryTitle(title: string, fallback: string): string {
  const trimmed = title.trim();
  return trimmed.length > 0 ? trimmed : fallback;
}

/** A trimmed plain-text excerpt for feed previews. */
export function excerpt(html: string, maxChars = 240): string {
  const text = htmlToText(html);
  if (text.length <= maxChars) return text;
  const clipped = text.slice(0, maxChars);
  const lastSpace = clipped.lastIndexOf(" ");
  return `${clipped.slice(0, lastSpace > 0 ? lastSpace : maxChars).trimEnd()}…`;
}

/** True when an entry has a title or any body text worth keeping. */
export function hasContent(title: string, html: string): boolean {
  return title.trim().length > 0 || htmlToText(html).length > 0;
}
