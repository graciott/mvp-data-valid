import Product from "../../domain/entities/Product";
import { ProductRepository } from "../../domain/repositories/ProductRepository";
import ProductsDataSourceImpl, {
  ProductsDataSource,
} from "../datasources/ProductsDataSourceImpl";

export class ProductRepositoryImpl implements ProductRepository {
  private productDataSource: ProductsDataSource;

  constructor() {
    this.productDataSource = ProductsDataSourceImpl;
  }

  async addProduct(product: Product): Promise<void> {
    await this.productDataSource.addProduct(product);
  }

  async getProducts(): Promise<Product[]> {
    const productModels = await this.productDataSource.getProducts();
    return productModels;
  }

  async checkProductExpiry(productId: string): Promise<boolean> {
    //TODO: Implement the logic to check if a product is expired
    // const productModel = await this.productDataSource.getExpiredProducts();
    // if (productModel) {
    //   const currentDate = new Date();
    //   return currentDate > productModel.expirationDate;
    // }
    return false;
  }
}
