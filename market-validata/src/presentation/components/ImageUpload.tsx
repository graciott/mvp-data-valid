import React, { useState } from "react";
import "./ImageUpload.css";
import { UploadProductImagesUseCase } from "../../domain/usecases/UploadProductImagesUseCase";

const ImageUpload: React.FC = () => {
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

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
    uploadProductImagesUseCase.execute(images)
      .then((products) => {
        console.log("Produtos validados com sucesso:", products);
        // Aqui você pode adicionar lógica para exibir os produtos validados ou fazer outra ação
      })
      .catch((error) => {
        console.error("Erro ao validar imagens:", error);
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
      <button className="upload-button" onClick={handleUpload}>
        Validar Imagens
      </button>
    </div>
  );
};

export default ImageUpload;
