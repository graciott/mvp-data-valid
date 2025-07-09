import ImageUpload from "../components/ImageUpload";
import ProductList from "../components/ProductList";
import { useProductViewModel } from "../viewmodels/useProductViewModel";

const Home = () => {
  const { products } = useProductViewModel();

  return (
    <div className="home-container">
      <h1>Market Expiry Checker</h1>
      <ImageUpload />
      <ProductList products={products} />
    </div>
  );
};

export default Home;
