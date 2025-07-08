import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAKKBLUK98diYIjn1fGoWSL2BiewwQEsbE",
  authDomain: "validata-app.firebaseapp.com",
  projectId: "validata-app",
  storageBucket: "validata-app.firebasestorage.app",
  messagingSenderId: "542963941263",
  appId: "1:542963941263:web:e1361306e6cbdbd72855fa",
  measurementId: "G-TFCMNLP2D3",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export class ProductRepository {
  constructor(db) {
    this.db = db;
  }

  async getAllProducts() {
    const produtosRef = collection(this.db, "produtos");
    const snapshot = await getDocs(produtosRef);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  async getProdutosPrompt() {
    const produtos = await this.getAllProducts();
    const nomes = produtos.map((p) => p.nome).join("\n");
    return `
Você receberá uma imagem contendo diversos produtos físicos, como alimentos, bebidas, produtos de limpeza, etc.

Abaixo está uma lista com os nomes dos produtos disponíveis no meu estoque. Sua tarefa é:

Identificar quais produtos da lista estão presentes na imagem.

Para cada produto identificado, tente extrair as seguintes informações visíveis na imagem:

Nome do produto

Tipo (ex: bebida, alimento, limpeza, etc.)

Marca

Data de validade

Se alguma dessas informações não estiver legível ou disponível na imagem, deixe o campo em branco.
Lista de produtos no estoque:
${nomes}

Formato da resposta:
Nome:

Tipo:

Marca:

Data de validade:

Faça isso para cada produto identificado. Ignore produtos que não estejam na lista acima. Baseie-se na aparência visual, logotipos, textos visíveis nos rótulos e outros elementos reconhecíveis.
`;
  }

  /**
   * Salva uma lista de produtos no Firestore.
   * @param {Array<Object>} produtos - Lista de produtos a serem salvos.
   * @returns {Promise<void>}
   */
  async salvarLista(produtos) {
    const promises = produtos.map((produto) => this.salvarProduto(produto));
    await Promise.all(promises);
    console.log("Lista de produtos salva no Firestore.");
  }

  /**
   * Salva um produto no Firestore.
   * @param {Object} produto - O produto a ser salvo.
   * @returns {Promise<void>}
   */
  async salvarProduto(produto) {
    try {
      await addDoc(collection(this.db, "produtos"), produto);
      console.log("Produto salvo no Firestore:", produto);
    } catch (e) {
      console.error("Erro ao salvar produto no Firestore:", e);
      throw e;
    }
  }
}
