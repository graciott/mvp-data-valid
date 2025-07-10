import { GeminiRepositoryImpl } from "../../data/repositories/GeminiRepositoryImpl";
import Product from "../entities/Product";
import { GeminiRepository } from "../repositories/GeminiRepository";

export class UploadProductImagesUseCase {
  private geminiRepository: GeminiRepository;

  constructor() {
    this.geminiRepository = new GeminiRepositoryImpl();
  }

  public async execute(images: File[]): Promise<Product[]> {
    const productData =
      await this.geminiRepository.extractProductDataFromImages(images);

    return productData;
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  private checkIfExpired(expirationDate: Date): boolean {
    return expirationDate < new Date();
  }
}
