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
    (prediction: IPrediction) => prediction.description
  );

  return NextResponse.json({ descriptions });
}
