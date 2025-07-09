import React, { useState } from "react";
import "./ImageUpload.css";

const ImageUpload: React.FC = () => {
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setImages(filesArray);
      const previewsArray = filesArray.map((file) => URL.createObjectURL(file));
      setPreviews(previewsArray);
    }
  };

  const handleUpload = async () => {
    // Implement the upload logic here
    // This will involve sending images to the Gemini API and then to Firebase
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
