import Product from "../entities/Product";

export interface ProductRepository {
  addProduct(product: Product): Promise<void>;
  getProducts(): Promise<Product[]>;
  checkProductExpiry(productId: string): Promise<boolean>;
}