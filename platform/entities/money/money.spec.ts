import { Money } from './money.js';

it('adds and multiplies in integer cents', () => {
  const lamp = new Money(4900);
  expect(lamp.multiply(2).add(new Money(39900)).amountCents).toBe(49700);
});

it('takes a percent rounded down in the buyer favor', () => {
  expect(new Money(999).percent(10).amountCents).toBe(99);
});

it('formats for display', () => {
  expect(new Money(49700).format()).toBe('$497.00');
});

it('refuses to mix currencies', () => {
  expect(() => new Money(100, 'USD').add(new Money(100, 'EUR'))).toThrow(TypeError);
});

it('round-trips through a plain object', () => {
  expect(Money.from(new Money(1250, 'EUR').toObject())).toEqual(new Money(1250, 'EUR'));
});
