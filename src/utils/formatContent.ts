/**
 * Prepares blog HTML-ish content for React Native Text:
 * replaces <br> variants with newlines, strips other tags, normalizes blank lines.
 */
export function formatContentForText(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<[^>]+>/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
