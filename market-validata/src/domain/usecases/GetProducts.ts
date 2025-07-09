import Product from "../entities/Product";
import { ProductRepository } from "../repositories/ProductRepository";

export class GetProducts {
  private productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(): Promise<Product[]> {
    return await this.productRepository.getProducts();
  }
}
