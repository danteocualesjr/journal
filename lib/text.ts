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
