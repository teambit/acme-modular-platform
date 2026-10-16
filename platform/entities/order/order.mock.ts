import type { PlainOrder } from './order.js';
import { Order } from './order.js';

/** demo orders for the demo customer `c-1`, newest first. */
export const plainMockOrders: PlainOrder[] = [
  {
    id: 'o-1003',
    customerId: 'c-1',
    lines: [
      { productId: 'p-100', name: 'Standing Desk', unitPriceCents: 39900, quantity: 1 },
      { productId: 'p-600', name: 'Monitor Arm', unitPriceCents: 8900, quantity: 2 },
    ],
    shippingCents: 2500,
    status: 'shipped',
    createdAt: '2026-10-12T09:30:00.000Z',
  },
  {
    id: 'o-1002',
    customerId: 'c-1',
    lines: [{ productId: 'p-300', name: 'Desk Lamp', unitPriceCents: 4900, quantity: 12 }],
    shippingCents: 900,
    discountCents: 5880,
    status: 'delivered',
    createdAt: '2026-09-28T15:05:00.000Z',
  },
  {
    id: 'o-1001',
    customerId: 'c-1',
    lines: [{ productId: 'p-200', name: 'Task Chair', unitPriceCents: 24900, quantity: 1 }],
    shippingCents: 1500,
    status: 'delivered',
    createdAt: '2026-08-03T11:20:00.000Z',
  },
];

export function mockOrders(): Order[] {
  return plainMockOrders.map((plain) => Order.from(plain));
}
