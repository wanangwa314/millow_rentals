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
    "https://photos.zillowstatic.com/fp/df7032caa9ec4c5347c2d294f5808406-cc_ft_768.webp",
    "https://photos.zillowstatic.com/fp/00724957d5120240d1e33a4cf81aaf2a-cc_ft_1536.webp",
    "https://photos.zillowstatic.com/fp/f3448199104685c19d407e697db64b4d-cc_ft_768.webp",
  ];

  const handleOnImageLoadComplete = () => {
    setImagesLoaded((prev) => prev + 1);
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
              priority={true}
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
