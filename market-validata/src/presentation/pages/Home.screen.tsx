import { useState } from "react";
import ImageUpload from "../components/ImageUpload";
import ProductList from "../components/ProductList";
import Product from "../../domain/entities/Product";

const Home = () => {
  const [products, setProducts] = useState('');

  return (
    <div className="home-container">
      <h1>Market Expiry Checker</h1>
      <ImageUpload setProducts={setProducts} />
      <ProductList products={products} />
    </div>
  );
};

export default Home;
