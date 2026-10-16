import type { PlainCustomer } from './customer.js';
import { Customer } from './customer.js';

export const plainMockCustomer: PlainCustomer = {
  id: 'c-1',
  name: 'Jordan Rivera',
  email: 'jordan@acme.example',
  defaultAddressId: 'a-office',
  addresses: [
    { id: 'a-home', label: 'Home', name: 'Jordan Rivera', line1: '12 Elm Street', city: 'Austin', region: 'TX', postalCode: '78701', country: 'US' },
    { id: 'a-office', label: 'Office', name: 'Jordan Rivera', line1: '500 Congress Ave', line2: 'Floor 9', city: 'Austin', region: 'TX', postalCode: '78701', country: 'US' },
  ],
};

export function mockCustomer(): Customer {
  return Customer.from(plainMockCustomer);
}
