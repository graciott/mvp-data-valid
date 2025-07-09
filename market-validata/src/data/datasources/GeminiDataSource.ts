import axios from 'axios';

class GeminiService {
  private apiUrl: string;

  constructor() {
    this.apiUrl = 'https://api.gemini.com/v1/extract'; // URL da API do Gemini
  }

  public async extractProductData(imageFile: File): Promise<any> {
    const formData = new FormData();
    formData.append('file', imageFile);

    try {
      const response = await axios.post(this.apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return this.parseResponse(response.data);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('Erro ao extrair dados do produto: ' + error.message);
      } else {
        throw new Error('Erro ao extrair dados do produto: ' + String(error));
      }
    }
  }

  private parseResponse(data: any): any {
    return {
      name: data.name,
      type: data.type,
      brand: data.brand,
      manufacturingDate: data.manufacturingDate,
      expirationDate: data.expirationDate,
    };
  }
}

export default new GeminiService();