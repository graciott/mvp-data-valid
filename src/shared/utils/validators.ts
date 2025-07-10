import { Product } from '../../domain/entities/Product';

export const validateProductData = (product: Product): boolean => {
  if (!product.name || !product.type || !product.brand) {
    return false;
  }

  if (!(product.manufacturingDate instanceof Date) || !(product.expirationDate instanceof Date)) {
    return false;
  }

  if (product.expirationDate <= product.manufacturingDate) {
    return false;
  }

  return true;
};

export const isExpired = (expirationDate: Date): boolean => {
  const today = new Date();
  return expirationDate < today;
};