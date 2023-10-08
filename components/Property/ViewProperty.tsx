"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Favourite from "./Favourite";
import SliderViewProperty from "./SliderViewProperty";
import { faShare, faXmark } from "@fortawesome/free-solid-svg-icons";
import Map from "./Map";
import ViewPropertyActions from "./ViewPropertyActions";
import ViewPropertyDetails from "./ViewPropertyDetails";
import { useState } from "react";

type TViewProperty = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ViewProperty(props: TViewProperty) {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const handleImagesLoaded = () => {
    setImagesLoaded(true);
  };

  return (
    <div
      className={`w-screen h-screen bg-opacity-25 bg-black fixed inset-0 ${
        props.isOpen ? "" : "hidden"
      }`}
    >
      <button className="absolute top-2 right-4" onClick={props.onClose}>
        <FontAwesomeIcon icon={faXmark} size="2x" />
      </button>
      <div className="w-full h-full overflow-y-auto lg:overflow-y-hidden lg:flex bg-white md:w-11/12 md:mx-auto">
        <SliderViewProperty
          ImagesLoaded={handleImagesLoaded}
          NumberImages={3}
          className="lg:w-7/12 h-52 md:h-80 lg:h-full"
        />
        {imagesLoaded ? (
          <div className="flex flex-col justify-start">
            <ViewPropertyActions />
            <ViewPropertyDetails />
          </div>
        ) : (
          <>Loading...</>
        )}
      </div>
    </div>
  );
}
