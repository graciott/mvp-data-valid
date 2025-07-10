import React, { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import { useProductViewModel } from "../viewmodels/useProductViewModel";

const Products: React.FC = () => {
  const { products, loading } = useProductViewModel();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Products</h1>
      <ProductList products={products} />
    </div>
  );
};

export default Products;
