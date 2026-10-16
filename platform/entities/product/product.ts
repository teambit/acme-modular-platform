import { Money } from '@acme-modular/platform.entities.money';
import { slugify } from '@acme-modular/platform.utils.slugify';

export type ProductCategory = 'desks' | 'chairs' | 'lighting' | 'storage' | 'electronics' | 'accessories';

export type PlainProduct = {
  id: string;
  name: string;
  description: string;
  /** unit price in minor units (cents). */
  priceCents: number;
  currency?: string;
  category: ProductCategory;
  imageUrl?: string;
  /** average rating, 0 to 5. */
  rating?: number;
  /** units available to ship today. */
  stock: number;
  tags?: string[];
};

/**
 * A catalog product. The single shape every scope agrees on: the store lists
 * it, the cart prices it, checkout and billing record it.
 */
export class Product {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly description: string,
    readonly price: Money,
    readonly category: ProductCategory,
    readonly stock: number,
    readonly imageUrl?: string,
    readonly rating?: number,
    readonly tags: string[] = []
  ) {}

  /** URL-safe identifier derived from the name. */
  get slug(): string {
    return slugify(this.name);
  }

  /** true when at least one unit can ship. */
  get inStock(): boolean {
    return this.stock > 0;
  }

  /** case-insensitive match on name, description, category and tags. */
  matches(query: string): boolean {
    const needle = query.trim().toLowerCase();
    if (!needle) return true;
    return [this.name, this.description, this.category, ...this.tags].some((field) =>
      field.toLowerCase().includes(needle)
    );
  }

  toObject(): PlainProduct {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      priceCents: this.price.amountCents,
      currency: this.price.currency,
      category: this.category,
      imageUrl: this.imageUrl,
      rating: this.rating,
      stock: this.stock,
      tags: this.tags,
    };
  }

  static from(plain: PlainProduct) {
    return new Product(
      plain.id,
      plain.name,
      plain.description,
      new Money(plain.priceCents, plain.currency ?? 'USD'),
      plain.category,
      plain.stock,
      plain.imageUrl,
      plain.rating,
      plain.tags ?? []
    );
  }
}
