import React, { Dispatch, SetStateAction, useState } from "react";
import "./ImageUpload.css";
import { UploadProductImagesUseCase } from "../../domain/usecases/UploadProductImagesUseCase";
import Product from "../../domain/entities/Product";

interface ImageUploadProps {
  setProducts: Dispatch<SetStateAction<string>>;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ setProducts }) => {
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const uploadProductImagesUseCase = new UploadProductImagesUseCase();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setImages(filesArray);
      const previewsArray = filesArray.map((file) => URL.createObjectURL(file));
      setPreviews(previewsArray);
    }
  };

  const handleUpload = async () => {
    if (images.length === 0) {
      console.error("Nenhuma imagem selecionada.");
      setProducts("Nenhuma imagem selecionada");
      return;
    }
    setLoading(true);
    setProducts("");
    uploadProductImagesUseCase
      .execute(images)
      .then((products) => {
        console.log("Produtos validados com sucesso:", products);
        setProducts(products);
      })
      .catch((error) => {
        console.error("Erro ao validar imagens:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageChange}
      />
      <div className="image-preview-grid">
        {previews.map((preview, index) => (
          <img
            key={index}
            src={preview}
            alt={`Preview ${index}`}
            className="thumb"
          />
        ))}
      </div>
      <button
        className="upload-button"
        onClick={handleUpload}
        disabled={loading}
      >
        {loading ? "Validando..." : "Validar Imagens"}
      </button>
      {loading && (
        <div className="loading-indicator">Processando imagens...</div>
      )}
    </div>
  );
};

export default ImageUpload;
