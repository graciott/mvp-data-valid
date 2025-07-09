import { useEffect, useState } from "react";
import Product from "../../domain/entities/Product";
import { GetProducts } from "../../domain/usecases/GetProducts";
import { ProductRepositoryImpl } from "../../data/repositories/ProductRepositoryImpl";

export function useProductViewModel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      //TODO: pesquisar sobre criar várias instancias de repositórios
      const getProducts = new GetProducts(new ProductRepositoryImpl());
      const productList = await getProducts.execute();
      setProducts(productList);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  return { products, loading };
}
