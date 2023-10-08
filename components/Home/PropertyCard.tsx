import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import Slider from "../Property/Slider";
import Favourite from "../Property/Favourite";

export default function PropertyCard() {
  return (
    <div className="w-90 rounded shadow-lg bg-white relative">
      <Link href="#" className="">
        <Slider />
        <div className="ml-3 mt-3">
          <span className="text-base font-bold mb-1 block">k1500/mo</span>
          <span className="text-xs block">2 bd | 2 ba | 1,031 sqft 9827</span>
          <span className="text-xs block">
            Walnut St, # 206, Dallas, TX 75243
          </span>
        </div>
        <Favourite className="absolute top-3.5 right-3 text-white" />
      </Link>
    </div>
  );
}
