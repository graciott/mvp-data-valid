import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { firebaseConfig } from "../../shared/config/firebaseConfig";
import Product from "../../domain/entities/Product";

export interface ProductsDataSource {
  addProduct(product: Product): Promise<void>;
  getProducts(): Promise<Product[]>;
  getExpiredProducts(): Promise<Product[]>;
}

const PRODUCTS_COLLECTION = "products";

class ProductsDataSourceImpl implements ProductsDataSource {
  private app;
  private db;

  constructor() {
    this.app = initializeApp(firebaseConfig);
    this.db = getFirestore(this.app);
  }

  async addProduct(product: Product): Promise<void> {
    const productsCollection = collection(this.db, PRODUCTS_COLLECTION);
    await addDoc(productsCollection, product);
  }

  async getProducts(): Promise<Product[]> {
    const productsCollection = collection(this.db, PRODUCTS_COLLECTION);
    const productSnapshot = await getDocs(productsCollection);
    return productSnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as Product)
    );
  }

  async getExpiredProducts(): Promise<Product[]> {
    const productsCollection = collection(this.db, PRODUCTS_COLLECTION);
    const q = query(productsCollection, where("isExpired", "==", true));
    const productSnapshot = await getDocs(q);
    return productSnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as Product)
    );
  }
}

export default new ProductsDataSourceImpl();
