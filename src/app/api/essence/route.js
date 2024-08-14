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

export async function GET(request) {
  const result ='minPrice name attributes cdnImage tokenId';
  const apiUrl = "https://api-gateway.skymavis.com/graphql/mavis-marketplace";

  try {
    const dataGatherEssence = await fetchData(
      apiUrl,
      `
      query MyQuery {
        erc1155Tokens(
          from: 0
          size: 50
          tokenAddress: "0xcc451977a4be9adee892f7e610fe3e3b3927b5a1"
          auctionType: Sale
          name: "Gather Essence"
          sort: PriceAsc
        ) {
          results {
            ${result}
          }
          total
        }
      }
    `
    );
    const dataCombatEssence = await fetchData(
      apiUrl,
      `      query MyQuery {
        erc1155Tokens(
          from: 0
          size: 50
          tokenAddress: "0xcc451977a4be9adee892f7e610fe3e3b3927b5a1"
          auctionType: Sale
          name: "Combat Essence"
          sort: PriceAsc
        ) {
          results {
            ${result}
          }
          total
        }
      }
    `
    );
    const dataAgriculturalPlantingEssence = await fetchData(
      apiUrl,
      `      
      query MyQuery {
        erc1155Tokens(
          from: 0
          size: 50
          tokenAddress: "0xcc451977a4be9adee892f7e610fe3e3b3927b5a1"
          auctionType: Sale
          name: "Agricultural Planting Essence"
          sort: PriceAsc
        ) {
          results {
            ${result}
          }
          total
        }
      }
    `
    );
    const dataAgriculturalLivestockEssence = await fetchData(
      apiUrl,
      `      
      query MyQuery {
        erc1155Tokens(
          from: 0
          size: 50
          tokenAddress: "0xcc451977a4be9adee892f7e610fe3e3b3927b5a1"
          auctionType: Sale
          name: "Agricultural Livestock Essence"
          sort: PriceAsc
        ) {
          results {
            ${result}
          }
          total
        }
      }
    `
    );

    const dataExchangeRate = await fetchData(
      apiUrl,
      `
      query MyQuery {
        exchangeRate {
          ron {
            usd
            }
        }
      }
    `
    );
    const exchangeRate = dataExchangeRate.data.exchangeRate.ron.usd;
    const resultsdataGatherEssence = dataGatherEssence.data.erc1155Tokens.results.map(
      (result) => ({
        ...result,
        minPrice: result.minPrice
          ? Number(
              (result.minPrice / 1000000000000000000) * exchangeRate,
            ).toFixed(2)
          : "Not sale",
        attributes: Object.keys(result.attributes).map((key) => ({
          [key]: result.attributes[key][0],
        })),
        type: result.attributes["type"] && result.attributes["type"][0],
      }));
      const resultsdataCombatEssence = dataCombatEssence.data.erc1155Tokens.results.map(
        (result) => ({
          ...result,
          minPrice: result.minPrice
            ? Number(
                (result.minPrice / 1000000000000000000) * exchangeRate,
              ).toFixed(2)
            : "Not sale",
          attributes: Object.keys(result.attributes).map((key) => ({
            [key]: result.attributes[key][0],
          })),
          type: result.attributes["type"] && result.attributes["type"][0],
        }));
        const resultsdataAgriculturalPlantingEssence = dataAgriculturalPlantingEssence.data.erc1155Tokens.results.map(
          (result) => ({
            ...result,
            minPrice: result.minPrice
              ? Number(
                  (result.minPrice / 1000000000000000000) * exchangeRate,
                ).toFixed(2)
              : "Not sale",
            attributes: Object.keys(result.attributes).map((key) => ({
              [key]: result.attributes[key][0],
            })),
            type: result.attributes["type"] && result.attributes["type"][0],
          }));
          const resultsdataAgriculturalLivestockEssence = dataAgriculturalLivestockEssence.data.erc1155Tokens.results.map(
            (result) => ({
              ...result,
              minPrice: result.minPrice
                ? Number(
                    (result.minPrice / 1000000000000000000) * exchangeRate,
                  ).toFixed(2)
                : "Not sale",
              attributes: Object.keys(result.attributes).map((key) => ({
                [key]: result.attributes[key][0],
              })),
              type: result.attributes["type"] && result.attributes["type"][0],
            }));
            const allResults = [
              ...resultsdataGatherEssence,
              ...resultsdataCombatEssence,
              ...resultsdataAgriculturalPlantingEssence,
              ...resultsdataAgriculturalLivestockEssence
            ];  

    return NextResponse.json(allResults);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
