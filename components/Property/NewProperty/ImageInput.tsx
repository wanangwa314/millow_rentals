"use client";

import React, { useState, ChangeEvent, MouseEvent, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faTimes } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { useAmp } from "next/amp";
import { useAuth } from "@/lib/AuthContext";

type TImageInput = {
  className?: string;
  EntryID: string;
};

enum UploadStatus {
  NOT_STARTED = "NOT_STARTED",
  UPLOADING = "UPLOADING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

export default function ImageInput(props: TImageInput) {
  const [imageFilesURLs, setimageFilesURLs] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>(
    UploadStatus.NOT_STARTED
  );
  const { user } = useAuth();
  const handleImageSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;

    if (selectedFiles) {
      const fileArray = Array.from(selectedFiles);
      setImageFiles((prevFiles) => [...prevFiles, ...fileArray]);
    }
  };

  useEffect(() => {
    const newImages = imageFiles.map((file) => URL.createObjectURL(file));
    setimageFilesURLs(newImages);
    return () => {
      newImages.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imageFiles]);

  const handleImageUpload = (event: MouseEvent<HTMLButtonElement>) => {
    if (imageFiles) {
      setUploadStatus(UploadStatus.UPLOADING);
      imageFiles.map(async (image) => {
        if (image) {
          await uploadToSupabase(image, props.EntryID, user);
          await updateDB(props.EntryID, image.name);
        } else {
          console.error("File is null or undefined.");
        }
      });
      setUploadStatus(UploadStatus.COMPLETED);
    } else {
      console.error("imageFiles is null or undefined.");
    }
  };

  const uploadToSupabase = async (
    image: File,
    EntryID: string,
    user: User | undefined
  ) => {
    try {
      const { data, error } = await supabase.storage
        .from("property_assets")
        .upload(`${user?.id}/${EntryID}/${image.name}`, image, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        throw error;
      }

      console.log("Images successfully added!!!");
    } catch (error) {
      if (error instanceof Error) {
        console.error("An error occurred:", error.message);
      } else {
        console.error("An unknown error occurred:", error);
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImageFiles = [...imageFiles];
    const newImageURLs: string[] = [...imageFilesURLs];
    newImageURLs.splice(index, 1);
    newImageFiles.splice(index, 1);
    setimageFilesURLs([...newImageURLs]);
    setImageFiles([...newImageFiles]);
  };

  const updateDB = async (ID: string, name: string) => {
    try {
      const { error } = await supabase
        .from("property_images")
        .insert({ property_id: parseInt(ID), image_name: name });

      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("An error occurred:", error.message);
      } else {
        console.error("An unknown error occurred:", error);
      }
    }
  };

  return (
    <div className={`flex flex-wrap ${props.className}`}>
      {uploadStatus === UploadStatus.UPLOADING && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 text-white text-center text-xl h-screen w-screen">
          Uploading images, please wait...
        </div>
      )}

      <label
        htmlFor="image-upload"
        className="cursor-pointer w-52 h-40 bg-slate-200 text-grey-300 border border-slate-300 rounded flex flex-col justify-center items-center m-2"
      >
        <FontAwesomeIcon icon={faImage} />
        <span className="text-blue-700 block mt-2">Browse</span>
      </label>

      {imageFilesURLs.map((image, index) => (
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
        onChange={handleImageSelect}
        className="hidden"
        id="image-upload"
      />

      <Button
        onClick={async (e) => {
          handleImageUpload(e);
        }}
      >
        Save
      </Button>
    </div>
  );
}
