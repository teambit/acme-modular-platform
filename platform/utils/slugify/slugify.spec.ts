import { slugify } from './slugify.js';

it('lowercases and hyphenates', () => {
  expect(slugify('Standing Desk Pro')).toBe('standing-desk-pro');
});

it('strips accents and punctuation', () => {
  expect(slugify('Café Crème 2.0')).toBe('cafe-creme-2-0');
});

it('trims leading and trailing separators', () => {
  expect(slugify('  --Sale!--  ')).toBe('sale');
});
