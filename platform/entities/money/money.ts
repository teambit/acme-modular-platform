import { formatPrice } from '@acme-modular/platform.utils.format-price';

export type PlainMoney = {
  /** amount in minor units (cents). always an integer. */
  amountCents: number;
  /** ISO 4217 currency code. */
  currency: string;
};

/**
 * An immutable amount of money. Amounts travel as integer cents and become a
 * display string only through `format()`, so totals never drift.
 */
export class Money {
  constructor(
    /** amount in minor units (cents). */
    readonly amountCents: number,
    /** ISO 4217 currency code. */
    readonly currency: string = 'USD'
  ) {
    if (!Number.isInteger(amountCents)) throw new TypeError(`Money expects integer cents, got ${amountCents}`);
  }

  /** a zero amount in the given currency. */
  static zero(currency = 'USD') {
    return new Money(0, currency);
  }

  /** adds another amount of the same currency. */
  add(other: Money): Money {
    this.assertSameCurrency(other);
    return new Money(this.amountCents + other.amountCents, this.currency);
  }

  /** subtracts another amount of the same currency. */
  subtract(other: Money): Money {
    this.assertSameCurrency(other);
    return new Money(this.amountCents - other.amountCents, this.currency);
  }

  /** multiplies by a quantity, e.g. a unit price times the units in a cart line. */
  multiply(quantity: number): Money {
    return new Money(Math.round(this.amountCents * quantity), this.currency);
  }

  /** the given percent of this amount, rounded down to the cent in the buyer's favor. */
  percent(percent: number): Money {
    return new Money(Math.floor((this.amountCents * percent) / 100), this.currency);
  }

  /** a localized display string, e.g. `$49.00`. */
  format(locale?: string): string {
    return formatPrice(this.amountCents, { currency: this.currency, locale });
  }

  toObject(): PlainMoney {
    return { amountCents: this.amountCents, currency: this.currency };
  }

  static from(plain: PlainMoney) {
    return new Money(plain.amountCents, plain.currency);
  }

  private assertSameCurrency(other: Money) {
    if (other.currency !== this.currency) {
      throw new TypeError(`cannot combine ${this.currency} with ${other.currency}`);
    }
  }
}
