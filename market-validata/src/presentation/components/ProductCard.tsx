import React from 'react';
import { Product } from '../../domain/entities/Product';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { name, type, brand, manufacturingDate, expirationDate, imageUrl, isExpired } = product;

  return (
    <div className={`product-card ${isExpired ? 'expired' : ''}`}>
      <img src={imageUrl} alt={name} className="product-image" />
      <div className="product-details">
        <h3 className="product-name">{name}</h3>
        <p className="product-type">Type: {type}</p>
        <p className="product-brand">Brand: {brand}</p>
        <p className="product-manufacturing-date">Manufacturing Date: {new Date(manufacturingDate).toLocaleDateString()}</p>
        <p className="product-expiration-date">Expiration Date: {new Date(expirationDate).toLocaleDateString()}</p>
        {isExpired && <span className="expiry-warning">This product is expired!</span>}
      </div>
    </div>
  );
};

export default ProductCard;