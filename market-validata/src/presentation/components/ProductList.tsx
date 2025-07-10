import React from "react";
import Product from "../../domain/entities/Product";
import ProductCard from "./ProductCard";
import "./ProductList.css";
import Markdown from "markdown-to-jsx";

interface ProductListProps {
  products: string;
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="product-list">
      {!products ? (
        <p>No products available.</p>
      ) : (
        <div className="product-grid">
          <Markdown>{products}</Markdown>
        </div>
      )}
    </div>
  );
};

export default ProductList;
