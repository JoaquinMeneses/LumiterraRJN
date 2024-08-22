import { NextResponse } from "next/server";
import { data } from "@/utils/farmingData";

export const dynamic = "force-dynamic";

const fetchData = async (query) => {
  const response = await fetch(
    "https://api-gateway.skymavis.com/graphql/mavis-marketplace",
    {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.API_KEY_SKY_MAVIS,
      },
      body: JSON.stringify({ query }),
    },
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch data: ${errorText}`);
  }
  return response.json();
};

export async function GET({ params }) {

  try{
    const profession = params;
    let finalResponse
    if(profession == "farming"){
      finalResponse = data("farming")
    } /* else if(profession == "gathering"){
      finalResponse = gathering
    } else if(profession == "combat"){
      finalResponse = combat
    }  */


    return NextResponse.json(finalResponse);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
