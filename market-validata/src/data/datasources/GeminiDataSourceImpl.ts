import { GoogleGenAI, createUserContent } from "@google/genai";

export interface GeminiDataSource {
  extractProductDataFromImages(imageFiles: File[]): Promise<any>;
}
class GeminiDataSourceImpl implements GeminiDataSource {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({
      apiKey: "AIzaSyC3QUoTEerYLOSYc4ig3tcHsPc2C97WXTI",
    });
  }

  public async extractProductDataFromImages(
    imageFiles: File[]
  ): Promise<string> {
    // Converte cada File para base64
    const imagesParts = await Promise.all(
      imageFiles.map(async (file) => {
        const base64 = await this.fileToBase64(file);
        return {
          inlineData: {
            mimeType: file.type,
            data: base64.split(",")[1], // remove o prefixo data:image/xxx;base64,
          },
        };
      })
    );

    const prompt = "Extraia os dados dos produtos destas imagens:";

    const response = await this.ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: createUserContent([prompt, ...imagesParts]),
    });

    // Ajuste conforme a estrutura do retorno da API
    if (!response || !response.candidates || response.candidates.length === 0) {
      throw new Error("Nenhuma resposta recebida do modelo Gemini.");
    }
    const content = response.candidates[0].content;
    // Assuming content.parts is an array of objects with a 'text' property
    const productData =
      content && content.parts
        ? content.parts.map((part: any) => part.text).join("")
        : "";
    return productData;
  }

  private fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
}

export default new GeminiDataSourceImpl();
