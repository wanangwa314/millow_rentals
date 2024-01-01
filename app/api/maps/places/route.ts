import { NextResponse } from "next/server";
import { IPrediction } from "@/lib/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const input = searchParams.get("input");
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyCe2S3tUK3skTSXozBunWvHAK3sVXso_gI&input=${input}`
  );
  const resJson = await res.json();
  const descriptions = resJson.predictions.map(
    // (prediction: IPrediction) => prediction.description
    (prediction: IPrediction) => {
      return filterByCountry("Zambia", prediction)
    }
  )
  .filter((description: string) => description !== null)


  return NextResponse.json({ descriptions });
}

const filterByCountry = (country: string, prediction: IPrediction) => {
  if (prediction.terms.some(term => term.value.includes(country))){
    return {
      "place_id": prediction.place_id,
      "description": prediction.description
    }
  }
  return null;
}
