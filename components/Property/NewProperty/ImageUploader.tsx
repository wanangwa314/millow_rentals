import React, { useState } from "react";
import Image from "next/image";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function ImageUploader(props: {
    index: number;
    handleRemoveImage: (index: number) => void;
}){
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    
    file && setPreview(URL.createObjectURL(file));


    return(
        <div key={props.index} className="relative m-2 w-52 h-40">
          <Image
            src={preview}
            alt={`Image ${props.index}`}
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
    )
}