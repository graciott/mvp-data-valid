import Product from "../entities/Product";

export class CheckProductExpiry {
  private products: Product[];

  constructor(products: Product[]) {
    this.products = products;
  }

  public checkExpiry(): Product[] {
    const currentDate = new Date();
    return this.products.map((product) => ({
      ...product,
      isExpired: this.isProductExpired(product.expirationDate, currentDate),
    }));
  }

  private isProductExpired(expirationDate: Date, currentDate: Date): boolean {
    return new Date(expirationDate) < currentDate;
  }
}
