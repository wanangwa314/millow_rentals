"use client";

import React, { useState, ChangeEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faTimes } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

type TImageInput = {
  Register: string;
};

export default function ImageInput(props: TImageInput) {
  const [images, setImages] = useState<string[]>([]);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const newImages: string[] = [...images];
    if (event.target.files) {
      for (let i = 0; i < event.target.files.length; i++) {
        const file = event.target.files[i];
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target && typeof e.target.result === "string") {
            newImages.push(e.target.result);
            setImages([...newImages]);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages: string[] = [...images];
    newImages.splice(index, 1);
    setImages([...newImages]);
  };

  return (
    <div className="flex flex-wrap">
      <label
        htmlFor="image-upload"
        className="cursor-pointer w-52 h-40 bg-slate-200 text-grey-300 border border-slate-300 rounded flex flex-col justify-center items-center m-2"
      >
        <FontAwesomeIcon icon={faImage} />
        <span className="text-blue-700 block mt-2">Browse</span>
      </label>

      {images.map((image, index) => (
        <div key={index} className="relative m-2 w-52 h-40">
          <Image
            src={image}
            alt={`Image ${index}`}
            fill
            className="object-cover rounded"
          />
          <button
            className="absolute top-1 right-1 bg-slate-400 opacity-40 hover:opacity-100 text-white px-1 rounded"
            onClick={() => handleRemoveImage(index)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      ))}

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
        id="image-upload"
        ref={props.Register} // Register the input with RHF
        name="pictures" // Set the name to match your property schema
      />
    </div>
  );
}
