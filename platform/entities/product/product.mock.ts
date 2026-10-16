import type { PlainProduct } from './product.js';
import { Product } from './product.js';

/** the ACME demo catalog, shared by every scope's previews and tests. */
export const plainMockProducts: PlainProduct[] = [
  { id: 'p-100', name: 'Standing Desk', description: 'Electric sit-stand desk, 160 x 80 cm.', priceCents: 39900, category: 'desks', stock: 14, rating: 4.7, tags: ['ergonomic', 'bestseller'] },
  { id: 'p-101', name: 'Corner Desk', description: 'L-shaped oak desk for two monitors.', priceCents: 29900, category: 'desks', stock: 3, rating: 4.4, tags: ['oak'] },
  { id: 'p-200', name: 'Task Chair', description: 'Mesh back, adjustable lumbar support.', priceCents: 24900, category: 'chairs', stock: 22, rating: 4.6, tags: ['ergonomic', 'bestseller'] },
  { id: 'p-201', name: 'Lounge Chair', description: 'Wool armchair for the reading corner.', priceCents: 54900, category: 'chairs', stock: 0, rating: 4.9, tags: ['wool'] },
  { id: 'p-300', name: 'Desk Lamp', description: 'Dimmable LED with a warm-to-cool slider.', priceCents: 4900, category: 'lighting', stock: 120, rating: 4.5, tags: ['led', 'bestseller'] },
  { id: 'p-301', name: 'Floor Lamp', description: 'Arc floor lamp with a linen shade.', priceCents: 12900, category: 'lighting', stock: 9, rating: 4.2, tags: ['linen'] },
  { id: 'p-400', name: 'Filing Cabinet', description: 'Three lockable drawers on casters.', priceCents: 18900, category: 'storage', stock: 11, rating: 4.1, tags: ['steel'] },
  { id: 'p-401', name: 'Wall Shelf', description: 'Floating walnut shelf, 90 cm.', priceCents: 6900, category: 'storage', stock: 40, rating: 4.3, tags: ['walnut'] },
  { id: 'p-500', name: 'USB-C Dock', description: 'Two 4K outputs, 100 W pass-through.', priceCents: 15900, category: 'electronics', stock: 35, rating: 4.4, tags: ['usb-c'] },
  { id: 'p-501', name: '27" Monitor', description: '4K IPS panel with a height-adjustable stand.', priceCents: 34900, category: 'electronics', stock: 18, rating: 4.6, tags: ['4k'] },
  { id: 'p-600', name: 'Monitor Arm', description: 'Gas-spring arm for one 17 to 32 inch screen.', priceCents: 8900, category: 'accessories', stock: 52, rating: 4.5, tags: ['ergonomic'] },
  { id: 'p-601', name: 'Desk Mat', description: 'Felt desk mat, 90 x 40 cm.', priceCents: 2900, category: 'accessories', stock: 200, rating: 4.0, tags: ['felt'] },
];

/** the demo catalog as `Product` instances. */
export function mockProducts(): Product[] {
  return plainMockProducts.map((plain) => Product.from(plain));
}
