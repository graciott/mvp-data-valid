import GeminiDataSourceImpl, {
  GeminiDataSource,
} from "../datasources/GeminiDataSourceImpl";
import { GeminiRepository } from "../../domain/repositories/GeminiRepository";

export class GeminiRepositoryImpl implements GeminiRepository {
  private geminiDataSource: GeminiDataSource;

  constructor() {
    this.geminiDataSource = GeminiDataSourceImpl;
  }

  /**
   * Extrai dados de produtos a partir de imagens usando o Gemini AI.
   * @param imageFiles - Array de arquivos de imagem.
   * @returns Promise que resolve com os dados extraídos dos produtos.
   */
  async extractProductDataFromImages(imageFiles: File[]): Promise<any> {
    return this.geminiDataSource.extractProductDataFromImages(imageFiles);
  }
}
