"use client";
import ViewProperty from "@/components/Property/ViewProperty";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PropertyCard from "@/components/Property/PropertyCard";
import Navbar from "@/components/Home/Navbar";

export default function Page({ params }: { params: { slug: string[] } }) {
  const [showViewProperty, setShowViewProperty] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (params.slug[1]) {
      setShowViewProperty(true);
    }
  }, []);

  const handleCloseVP = () => {
    router.push(`/view/${params.slug[0]}`);
  };

  return (
    <div>
      <Navbar />
      Place: {params.slug[0]} Property: {params.slug[1]}
      {showViewProperty && (
        <ViewProperty propertyID={params.slug[0]} onClose={handleCloseVP} />
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
        <PropertyCard PropertyID="uxii" Place="kabwata" />
        <PropertyCard PropertyID="uxii" Place="kabwata" />
        <PropertyCard PropertyID="uxii" Place="kabwata" />
        <PropertyCard PropertyID="uxii" Place="kabwata" />
      </div>
    </div>
  );
}
