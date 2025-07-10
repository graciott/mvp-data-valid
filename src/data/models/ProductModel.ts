export interface ProductModel {
  id: string;
  name: string;
  type: string;
  brand: string;
  manufacturingDate: Date;
  expirationDate: Date;
  imageUrl: string;
  createdAt: Date;
  isExpired: boolean;
}