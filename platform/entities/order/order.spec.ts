import { Order } from './order.js';
import { mockOrders, plainMockOrders } from './order.mock.js';

it('computes subtotal, total and item count', () => {
  const order = mockOrders()[0];
  expect(order.itemCount).toBe(3);
  expect(order.subtotal.amountCents).toBe(57700);
  expect(order.total.amountCents).toBe(60200);
});

it('subtracts the discount', () => {
  expect(mockOrders()[1].total.format()).toBe('$538.20');
});

it('moves to a new status without mutating', () => {
  const order = mockOrders()[0];
  expect(order.withStatus('delivered').status).toBe('delivered');
  expect(order.status).toBe('shipped');
});

it('round-trips through a plain object', () => {
  expect(Order.from(plainMockOrders[1]).toObject()).toEqual({ ...plainMockOrders[1], currency: 'USD' });
});
