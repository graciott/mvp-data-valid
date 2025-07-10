export interface GeminiRepository {
  extractProductDataFromImages(imageFiles: File[]): Promise<any>;
}
