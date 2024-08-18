import Farming from "@/app/farming/page";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const fetchDataNames = async () => {
  const response = await fetch(
    `https://thlm.bond/lumi/market_product`,
    {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch data `);
  }
  return response.json();
};

export async function GET(request) {
  try {
    const dataNames = await fetchDataNames()
    let names = [];
    dataNames.data.forEach(item => {
      if (item.name) {
        names.push(item.name);
      }
    });

    return NextResponse.json(names);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
