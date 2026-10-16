export type FormatPriceOptions = {
  /** ISO 4217 currency code. The default is USD. */
  currency?: string;
  /** BCP 47 locale for the number format. The default is en-US. */
  locale?: string;
};

/**
 * Formats an amount of minor units (cents) as a localized price string.
 *
 * The input is minor units on purpose: prices travel as integers to avoid
 * floating-point drift, and become a display string only at the edge.
 */
export function formatPrice(cents: number, options: FormatPriceOptions = {}): string {
  if (!Number.isFinite(cents)) throw new TypeError(`formatPrice expects a finite number, got ${cents}`);
  const { currency = 'USD', locale = 'en-US' } = options;
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(cents / 100);
}
