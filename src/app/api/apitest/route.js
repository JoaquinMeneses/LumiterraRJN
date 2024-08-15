import { NextResponse } from "next/server";

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
    throw new Error(`Failed to fetch data `);
  }
  return response.json();
};

export async function GET(request) {
  try {
    const result ='minPrice name attributes cdnImage tokenId';
    const fetchAllDataGatheringPickaxe = async () => {
      let allData = [];
      let from = 0;
      const size = 50;
      let hasMoreData = true;
    
      while (hasMoreData) {
        const response = await fetchData(
          `
          query MyQuery {
            erc1155Tokens(
              from: ${from}
              size: ${size}
              tokenAddress: "0xcc451977a4be9adee892f7e610fe3e3b3927b5a1"
              name: "Pickaxe"
              sort: PriceAsc
              auctionType: Sale
              criteria: {name: "type", values: "sword"}
            ) {
              results {
                ${result}
              }
              total
            }
          }
          `
        );
    
        const data = response.data.erc1155Tokens.results;
    
        if (data && data.length > 0) {
          allData = [...allData, ...data];
          from += size; // Incrementar el valor de `from` para la siguiente iteración
        } else {
          hasMoreData = false; // Salir del loop si no hay más datos
        }
      }
    
      return allData;
    };
    
    // Uso del método para obtener todos los datos
    const dataGatheringPickaxe = await fetchAllDataGatheringPickaxe();

    return NextResponse.json(dataGatheringPickaxe);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
