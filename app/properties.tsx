import PropertyCard from "@/components/Home/PropertyCard";
import ViewProperty from "@/components/Property/ViewProperty";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Properties() {
  const [properties, setProperties] = useState<any[]>();
  const [selectedProperty, setSelectedProperty] = useState<string>("");
  const [showViewProperty, setShowViewProperty] = useState<boolean>(false);
  const router = useRouter();
  const place = router.query.place;
  const propertyID = router.query.id; // Needed when we use link

  useEffect(() => {
    async function fetchProperties() {
      // Fetch your properties data
      try {
        const response = await fetch("/api/properties/place"); // Assuming fetchData is a function that fetches properties data
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    }

    fetchProperties(); // Call the async function
  }, []); // Empty dependency array to run this effect only once on component mount

  // Update state when propertyID changes
  useEffect(() => {
    if (propertyID) {
      setSelectedProperty(propertyID.toString());
      setShowViewProperty(true);
    }
  }, [propertyID]);

  const handleOnViewPropertyClose = () => {
    setShowViewProperty(false);
  };

  return (
    <div className="bg-white w-screen h-screen p-24">
      {properties?.map((item) => (
        <PropertyCard PropertyID={item.PropertyID} Place={item.Place} />
      ))}

      {showViewProperty && (
        <ViewProperty
          propertyID={selectedProperty}
          onClose={handleOnViewPropertyClose}
        />
      )}
    </div>
  );
}
