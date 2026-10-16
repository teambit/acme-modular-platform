import { formatPrice } from './format-price.js';

it('formats cents as USD by default', () => {
  expect(formatPrice(199900)).toBe('$1,999.00');
});

it('formats in another currency and locale', () => {
  // Intl separates the amount and the sign with a non-breaking space.
  expect(formatPrice(5000, { currency: 'EUR', locale: 'de-DE' })).toBe('50,00 €');
});

it('rejects a non-finite amount', () => {
  expect(() => formatPrice(NaN)).toThrow(TypeError);
});
