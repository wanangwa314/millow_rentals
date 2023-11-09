"use client";
import { Slide } from "react-slideshow-image";
import Image from "next/image";
import { useState } from "react";

export default function Slider() {
  const [slideNumber, setSlideNumber] = useState<Number>(1);
  const images = [
    "https://photos.zillowstatic.com/fp/00724957d5120240d1e33a4cf81aaf2a-cc_ft_1536.webp",
    "https://photos.zillowstatic.com/fp/00724957d5120240d1e33a4cf81aaf2a-cc_ft_1536.webp",
    "https://photos.zillowstatic.com/fp/00724957d5120240d1e33a4cf81aaf2a-cc_ft_1536.webp",
  ];

  return (
    <div className="relative">
      <Slide
        arrows={false}
        onChange={(from: number, to: number) => setSlideNumber(to + 1)}
      >
        {images.map((url: string, index: number) => (
          <div className="w-80 h-40 relative aspect-video" key={index}>
            <Image
              src={url}
              fill
              sizes="(max-width: 640px) 75vw, 25vw"
              alt=""
              className="object-cover rounded-t"
              priority={true}
            />
          </div>
        ))}
      </Slide>
      <span className="text-xs text-center drop-shadow p-1 rounded-md bg-black text-slate-100 absolute bottom-3 right-3">
        {slideNumber.toString()}
      </span>
    </div>
  );
}
