import Image from "next/image";
import { useState } from "react";

export default function ImageUploader() {
  const [image, setImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className="w-full h-[250px] border border-[#E9E9E9] border-gray-300 rounded-xl flex flex-col items-center justify-center text-center p-4 cursor-pointer bg-white"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {image ? (
        <img
          src={image}
          alt="Uploaded"
          className="w-full h-full  object-contain rounded-lg"
        />
      ) : (
        <>
          <Image
            src={"/icons/plus-circle.svg"}
            alt="upload"
            width={35}
            height={35}
          />

          <p className=" text-black text-[17px] font-medium my-[24px]">
            Перетащите фото или загрузите
          </p>
          <label
            htmlFor="fileInput"
            className="mt-3 py-2 px-4 bg-gray-100 text-gray-900 rounded-lg cursor-pointer flex items-center gap-2"
          >
            <Image
              src={"/icons/upload.svg"}
              alt="upload"
              width={20}
              height={20}
            />
            <p>Загрузить</p>
          </label>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </>
      )}
    </div>
  );
}
