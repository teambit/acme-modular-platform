/**
 * Turns a product name into a URL-safe slug: lowercase, ascii,
 * hyphen-separated. "Café Crème 2.0" becomes "cafe-creme-2-0".
 */
export function slugify(input: string): string {
  return input
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
