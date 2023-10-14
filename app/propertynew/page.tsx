"use client";
import ProperForm from "@/components/Property/NewProperty/Form";
import ImageInput from "@/components/Property/NewProperty/ImageInput";
import { useState } from "react";
import { DataSent } from "@/lib/types/Property";
import Navbar from "@/components/Home/Navbar";
import { useAuth } from "@/lib/AuthContext";

export default function Page() {
  const [formDataSent, setformDataSent] = useState<DataSent>();
  const { user } = useAuth();

  const handleOnFormSent = (data: DataSent) => {
    setformDataSent(data);
  };

  return (
    <div className="">
      <Navbar />
      <div className="w-1/2 mx-auto p-4">
        {formDataSent ? (
          <ImageInput className="" EntryID={formDataSent.EntryID.toString()} />
        ) : (
          <ProperForm className="" onFormDataSent={handleOnFormSent} />
        )}
      </div>
    </div>
  );
}
