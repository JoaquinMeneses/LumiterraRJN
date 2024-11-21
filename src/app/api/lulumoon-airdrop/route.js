import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const fetchData = async (url, query) => {
  const response = await fetch(url, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.API_KEY_SKY_MAVIS,
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${url}`);
  }
  return response.json();
};

const fetchDataContrat = async (url) => {
  try {
    const response = await fetch(url, { method: "GET" });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
};

export async function POST(request) {
  const apiUrl = "https://api-gateway.skymavis.com/graphql/mavis-marketplace";
  const url = "https://lulumoon.gg/api/token0/tokenCard/small?size=2000&page=1";

  try {
    // Fetch supply total data
    const supplyTotal = await fetchData(
      apiUrl,
      `
        query MyQuery {
          erc1155Token(
            tokenAddress: "0xcc451977a4be9adee892f7e610fe3e3b3927b5a1"
            tokenId: "268692752"
          ) {
            totalItems
            totalItemsListing
            name
            cdnImage
            orders(showInvalid: true, from: 1, size: 1) {
              currentPrice
            }
          }
        }
      `,
    );

    // Fetch contract data
    const dataContracts = await fetchDataContrat(url);

    let TotalBurn = 0;
    // Map contract addresses
    const AddressContratcLulumoon = await Promise.all(
      dataContracts.items.map(async (result) => {
        const supplyData = await fetchDataContrat(
          "https://lulumoon.gg/api/token0/airdrop/" + result.token.address,
        );
        TotalBurn += Number(supplyData.airdropSent.badgeSupply);
        return {
          OwnerAddress: result.token.address,
          image: result.image,
          name: result.token.symbol.replace(/\s+/g, ""),
          supply: supplyData, // Guardamos los datos de la respuesta
        };
      }),
    );

    const FinalResponse = {
      image: supplyTotal.data.erc1155Token.cdnImage,
      total: {
        value: Number(supplyTotal.data.erc1155Token.totalItems),
        percentage: 100,
      },
      circulation: {
        value:
          Number(supplyTotal.data.erc1155Token.totalItems) - Number(TotalBurn),
        percentage: (
          ((Number(supplyTotal.data.erc1155Token.totalItems) -
            Number(TotalBurn)) /
            Number(supplyTotal.data.erc1155Token.totalItems)) *
          100
        ).toFixed(2),
      },
      sale: {
        value: Number(supplyTotal.data.erc1155Token.totalItemsListing),
        percentage: (
          (Number(supplyTotal.data.erc1155Token.totalItemsListing) /
            (Number(supplyTotal.data.erc1155Token.totalItems) -
              Number(TotalBurn))) *
          100
        ).toFixed(2),
      },
      burned: {
        value: Number(TotalBurn),
        percentage: (
          (Number(TotalBurn) /
            Number(supplyTotal.data.erc1155Token.totalItems)) *
          100
        ).toFixed(2),
      },
      list: AddressContratcLulumoon,
    };

    return NextResponse.json(FinalResponse);
  } catch (error) {
    console.error("Error:", error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
