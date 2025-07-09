import { Product } from '../entities/Product';
import { GeminiDataSource } from '../../data/datasources/GeminiDataSource';
import { FirebaseDataSource } from '../../data/datasources/FirebaseDataSource';

export class UploadProductImages {
  private geminiDataSource: GeminiDataSource;
  private firebaseDataSource: FirebaseDataSource;

  constructor() {
    this.geminiDataSource = new GeminiDataSource();
    this.firebaseDataSource = new FirebaseDataSource();
  }

  public async uploadImages(images: File[]): Promise<Product[]> {
    const products: Product[] = [];

    for (const image of images) {
      const productData = await this.geminiDataSource.extractProductData(image);
      const product: Product = {
        id: this.generateId(),
        name: productData.name,
        type: productData.type,
        brand: productData.brand,
        manufacturingDate: new Date(productData.manufacturingDate),
        expirationDate: new Date(productData.expirationDate),
        imageUrl: await this.firebaseDataSource.uploadImage(image),
        createdAt: new Date(),
        isExpired: this.checkIfExpired(new Date(productData.expirationDate)),
      };

      await this.firebaseDataSource.saveProduct(product);
      products.push(product);
    }

    return products;
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  private checkIfExpired(expirationDate: Date): boolean {
    return expirationDate < new Date();
  }
}