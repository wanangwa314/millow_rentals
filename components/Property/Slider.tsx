"use client";
import { Slide } from "react-slideshow-image";
import Image from "next/image";
import { useState } from "react";

export default function Slider() {
  const [slideNumber, setSlideNumber] = useState<Number>(1);
  const images = [
    "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
    "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
  ];

  return (
    <div className="relative">
      <Slide
        arrows={false}
        onChange={(from: number, to: number) => setSlideNumber(to + 1)}
      >
        {images.map((url: string, index: number) => (
          <div className="" key={index}>
            <Image
              src={url}
              width={352}
              height={165}
              alt=""
              className="flex items-center justify-center object-cover rounded-t"
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
