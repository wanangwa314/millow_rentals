"use client";

import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

export default function Map() {
  const centre = useMemo(() => ({ lat: 44, lng: -88 }), []);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS || "",
  });
  if (!isLoaded) {
    return <h1>Loading...</h1>;
  }
  return (
    <GoogleMap
      zoom={10}
      center={{ lat: 44, lng: -88 }}
      mapContainerClassName="h-72 w-full"
    >
      <Marker position={centre} />
    </GoogleMap>
  );
}
