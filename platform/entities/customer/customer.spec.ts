import { Customer } from './customer.js';
import { mockCustomer, plainMockCustomer } from './customer.mock.js';

it('resolves the default address', () => {
  expect(mockCustomer().defaultAddress?.label).toBe('Office');
});

it('adds an address without mutating', () => {
  const customer = mockCustomer();
  const updated = customer.withAddress({ id: 'a-cabin', label: 'Cabin', name: 'Jordan Rivera', line1: '1 Lake Rd', city: 'Marble Falls', region: 'TX', postalCode: '78654', country: 'US' });
  expect(updated.addresses).toHaveLength(3);
  expect(customer.addresses).toHaveLength(2);
});

it('round-trips through a plain object', () => {
  expect(Customer.from(plainMockCustomer).toObject()).toEqual(plainMockCustomer);
  expect(mockCustomer().firstName).toBe('Jordan');
});
