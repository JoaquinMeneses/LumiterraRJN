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
    throw new Error(`Failed to fetch data ${response.data}`);
  }
  return response.json();
};

export async function GET(request) {
  //const result ='minPrice name attributes cdnImage tokenId';

  try {
    const result = "minPrice name attributes cdnImage tokenId";
    const query = `
      query CombinedQuery {
        gatherEssenceTokens: erc1155Tokens(
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

        combatEssenceTokens: erc1155Tokens(
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

        agriculturalPlantingEssenceTokens: erc1155Tokens(
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

        agriculturalLivestockEssenceTokens: erc1155Tokens(
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
        exchangeRate {
          ron {
            usd
          }
        }
      }
      `;
    const dataEssence = await fetchData(query);
    const exchangeRate = dataEssence.data.exchangeRate.ron.usd;
    const resultsdatagatherEssence =
      dataEssence.data.gatherEssenceTokens.results.map((result) => ({
        ...result,
        minPriceRon: Number(result.minPrice / 1000000000000000000).toFixed(2),
        minPriceUsd: result.minPrice
          ? Number(
              (result.minPrice / 1000000000000000000) * exchangeRate,
            ).toFixed(2)
          : "Not sale",
        attributes: Object.keys(result.attributes).map((key) => ({
          [key]: result.attributes[key][0],
        })),
        type: result.attributes["type"] && result.attributes["type"][0],
      }));
    const resultsdatacombatEssence =
      dataEssence.data.combatEssenceTokens.results.map((result) => ({
        ...result,
        minPriceRon: Number(result.minPrice / 1000000000000000000).toFixed(2),
        minPriceUsd: result.minPrice
          ? Number(
              (result.minPrice / 1000000000000000000) * exchangeRate,
            ).toFixed(2)
          : "Not sale",
        attributes: Object.keys(result.attributes).map((key) => ({
          [key]: result.attributes[key][0],
        })),
        type: result.attributes["type"] && result.attributes["type"][0],
      }));
    const resultsdataagriculturalPlantingEssence =
      dataEssence.data.agriculturalPlantingEssenceTokens.results.map(
        (result) => ({
          ...result,
          minPriceRon: Number(result.minPrice / 1000000000000000000).toFixed(2),
          minPriceUsd: result.minPrice
            ? Number(
                (result.minPrice / 1000000000000000000) * exchangeRate,
              ).toFixed(2)
            : "Not sale",
          attributes: Object.keys(result.attributes).map((key) => ({
            [key]: result.attributes[key][0],
          })),
          type: result.attributes["type"] && result.attributes["type"][0],
        }),
      );
    const resultsdataagriculturalLivestockEssence =
      dataEssence.data.agriculturalLivestockEssenceTokens.results.map(
        (result) => ({
          ...result,
          minPriceRon: Number(result.minPrice / 1000000000000000000).toFixed(2),
          minPriceUsd: result.minPrice
            ? Number(
                (result.minPrice / 1000000000000000000) * exchangeRate,
              ).toFixed(2)
            : "Not sale",
          attributes: Object.keys(result.attributes).map((key) => ({
            [key]: result.attributes[key][0],
          })),
          type: result.attributes["type"] && result.attributes["type"][0],
        }),
      );

    const allResults = [
      ...resultsdatagatherEssence,
      ...resultsdatacombatEssence,
      ...resultsdataagriculturalPlantingEssence,
      ...resultsdataagriculturalLivestockEssence,
    ];

    return NextResponse.json(allResults);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
