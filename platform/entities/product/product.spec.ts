import { Product } from './product.js';
import { mockProducts, plainMockProducts } from './product.mock.js';

it('round-trips through a plain object', () => {
  const plain = plainMockProducts[0];
  expect(Product.from(plain).toObject()).toEqual({ ...plain, currency: 'USD', imageUrl: undefined });
});

it('derives a slug and stock state', () => {
  const lamp = mockProducts().find((product) => product.id === 'p-300')!;
  expect(lamp.slug).toBe('desk-lamp');
  expect(lamp.inStock).toBe(true);
  expect(mockProducts().find((product) => product.id === 'p-201')!.inStock).toBe(false);
});

it('matches a query on name, category and tags', () => {
  const ergonomic = mockProducts().filter((product) => product.matches('ergonomic'));
  expect(ergonomic.map((product) => product.id)).toEqual(['p-100', 'p-200', 'p-600']);
  expect(mockProducts().filter((product) => product.matches('LIGHTING'))).toHaveLength(2);
});
