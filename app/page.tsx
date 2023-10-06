import Navbar from "@/components/Home/Navbar";
import Searchbar from "@/components/Home/Searchbar";
import PropertyCard from "@/components/Home/PropertyCard";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-slate-400 w-screen h-screen pt-40 pl-40">
      <PropertyCard />
    </div>
  );
}
