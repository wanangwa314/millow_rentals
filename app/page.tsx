import Navbar from "@/components/Home/Navbar";
import Searchbar from "@/components/Home/Searchbar";
import PropertyCard from "@/components/Home/PropertyCard";
import Image from "next/image";
import ViewProperty from "@/components/Property/ViewProperty";
import Map from "@/components/Property/Map";
import SliderViewProperty from "@/components/Property/SliderViewProperty";
export default function Home() {
  return (
    <div className="bg-white w-screen h-screen p-24">
      <ViewProperty />
    </div>
  );
}
