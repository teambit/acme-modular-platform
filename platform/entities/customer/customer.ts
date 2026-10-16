export type Address = {
  id: string;
  /** e.g. "Home" or "Office". */
  label: string;
  name: string;
  line1: string;
  line2?: string;
  city: string;
  region: string;
  postalCode: string;
  /** ISO 3166-1 alpha-2 country code. */
  country: string;
};

export type PlainCustomer = {
  id: string;
  name: string;
  email: string;
  addresses: Address[];
  defaultAddressId?: string;
};

/** An ACME customer and their saved shipping addresses. */
export class Customer {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly email: string,
    readonly addresses: Address[] = [],
    readonly defaultAddressId?: string
  ) {}

  /** the default address, or the first saved one. */
  get defaultAddress(): Address | undefined {
    return this.addresses.find((address) => address.id === this.defaultAddressId) ?? this.addresses[0];
  }

  /** first name, for greetings. */
  get firstName(): string {
    return this.name.split(' ')[0];
  }

  /** a copy with the address added, or replaced when the id exists. */
  withAddress(address: Address): Customer {
    const others = this.addresses.filter((existing) => existing.id !== address.id);
    return new Customer(this.id, this.name, this.email, [...others, address], this.defaultAddressId ?? address.id);
  }

  toObject(): PlainCustomer {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      addresses: this.addresses,
      defaultAddressId: this.defaultAddressId,
    };
  }

  static from(plain: PlainCustomer) {
    return new Customer(plain.id, plain.name, plain.email, plain.addresses, plain.defaultAddressId);
  }
}
