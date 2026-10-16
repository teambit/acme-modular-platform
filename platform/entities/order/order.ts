import { Money } from '@acme-modular/platform.entities.money';

export type OrderStatus = 'placed' | 'paid' | 'shipped' | 'delivered' | 'cancelled';

export type PlainOrderLine = {
  productId: string;
  name: string;
  /** unit price in minor units (cents). */
  unitPriceCents: number;
  quantity: number;
};

export type PlainOrder = {
  id: string;
  customerId: string;
  lines: PlainOrderLine[];
  /** shipping charge in cents. */
  shippingCents: number;
  /** discount taken off the subtotal, in cents. */
  discountCents?: number;
  currency?: string;
  status: OrderStatus;
  /** ISO timestamp. */
  createdAt: string;
};

/**
 * A placed order. Checkout creates it, payments mark it paid, shipping moves
 * it to shipped and delivered, billing invoices it.
 */
export class Order {
  constructor(
    readonly id: string,
    readonly customerId: string,
    readonly lines: PlainOrderLine[],
    readonly shipping: Money,
    readonly discount: Money,
    readonly status: OrderStatus,
    readonly createdAt: string
  ) {}

  get currency(): string {
    return this.shipping.currency;
  }

  /** total units across every line. */
  get itemCount(): number {
    return this.lines.reduce((sum, line) => sum + line.quantity, 0);
  }

  /** sum of unit price times quantity, before discount and shipping. */
  get subtotal(): Money {
    return this.lines.reduce(
      (sum, line) => sum.add(new Money(line.unitPriceCents, this.currency).multiply(line.quantity)),
      Money.zero(this.currency)
    );
  }

  /** what the customer pays: subtotal minus discount plus shipping. */
  get total(): Money {
    return this.subtotal.subtract(this.discount).add(this.shipping);
  }

  /** a copy of the order in a new status. */
  withStatus(status: OrderStatus): Order {
    return new Order(this.id, this.customerId, this.lines, this.shipping, this.discount, status, this.createdAt);
  }

  toObject(): PlainOrder {
    return {
      id: this.id,
      customerId: this.customerId,
      lines: this.lines,
      shippingCents: this.shipping.amountCents,
      discountCents: this.discount.amountCents,
      currency: this.currency,
      status: this.status,
      createdAt: this.createdAt,
    };
  }

  static from(plain: PlainOrder) {
    const currency = plain.currency ?? 'USD';
    return new Order(
      plain.id,
      plain.customerId,
      plain.lines,
      new Money(plain.shippingCents, currency),
      new Money(plain.discountCents ?? 0, currency),
      plain.status,
      plain.createdAt
    );
  }
}
