import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import Slider from "./Slider";
import Favourite from "./Favourite";
import { supabase } from "@/lib/supabase";

type TPropertyCard = {
  PropertyID: string;
  Place: string;
};

export default function PropertyCard(props: TPropertyCard) {
  async function getData() {
    const res = await fetch("https://api.example.com/...");

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  }

  return (
    <div className="w-80 rounded shadow-lg bg-white relative">
      <Link href={`/view/${props.Place}/${props.PropertyID}`}>
        <Slider />
        <div className="ml-3 mt-3">
          <span className="text-base font-bold mb-1 block">k1500/mo</span>
          <span className="text-xs block">2 bd | 2 ba | 100 sqm</span>
          <span className="text-xs block">Lusaka, Kabwata, Plot 3457</span>
        </div>
      </Link>
      <Favourite className="absolute top-3.5 right-3 text-white w-5" />
    </div>
  );
}
