import Navbar from "@/components/Home/Navbar";
import Searchbar from "@/components/Home/Searchbar";
import PropertyCard from "@/components/Property/PropertyCard";
import Image from "next/image";
import ViewProperty from "@/components/Property/ViewProperty";
import Map from "@/components/Property/Map";
import SliderViewProperty from "@/components/Property/SliderViewProperty";
import ImageInput from "@/components/Property/NewProperty/ImageInput";
export default function Home() {
  return (
    <div className="bg-white">
      <Navbar />
      <div className="p-24">
        <ImageInput EntryID="" />
      </div>
    </div>
  );
}
