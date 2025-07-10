interface Product {
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

export default Product;