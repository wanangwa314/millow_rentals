"use client";
import { Slide } from "react-slideshow-image";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

type SliderViewPropertyProps = {
  NumberImages: number;
  ImagesLoaded: () => void;
  className?: string;
};
const properties = {
  prevArrow: (
    <button className="text-white opacity-30 ml-10 hover:opacity-75">
      <FontAwesomeIcon icon={faChevronLeft} size="3x" />
    </button>
  ),
  nextArrow: (
    <button className="text-white opacity-30 mr-10 hover:opacity-75">
      <FontAwesomeIcon icon={faChevronRight} size="3x" />
    </button>
  ),
};

export default function SliderViewProperty(props: SliderViewPropertyProps) {
  const [slideNumber, setSlideNumber] = useState<Number>(1);
  const [imagesLoaded, setImagesLoaded] = useState<number>(0);

  const images = [
    "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
    "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
  ];

  const handleOnImageLoadComplete = () => {
    setImagesLoaded(imagesLoaded + 1);
  };

  useEffect(() => {
    if (imagesLoaded == props.NumberImages) {
      props.ImagesLoaded();
    }
  }, [imagesLoaded]);

  return (
    <div className={`${props.className} relative`}>
      <Slide
        arrows={true}
        autoplay={false}
        onChange={(from: number, to: number) => setSlideNumber(to + 1)}
        {...properties}
      >
        {images.map((url: string, index: number) => (
          <div className="h-52 md:h-80 lg:h-screen relative" key={index}>
            <Image
              src={url}
              fill={true}
              alt=""
              className="object-cover"
              onLoadingComplete={handleOnImageLoadComplete}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ))}
      </Slide>
      <span className="text-xs text-center drop-shadow p-1 rounded-md bg-black text-slate-100 absolute bottom-1 right-1">
        {`${slideNumber.toString()} / ${images.length.toString()}`}
      </span>
    </div>
  );
}
