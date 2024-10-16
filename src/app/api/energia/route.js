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
  const apiUrl = "https://api-gateway.skymavis.com/graphql/mavis-marketplace";

  try {
    const response = await fetchData(
      apiUrl,
      `
      query {
        dataExchangeRate: exchangeRate {
          ron {
            usd
          }
        }
        dataEnergyBuy: erc1155Tokens(
          from: 0
          size: 50
          tokenAddress: "0xcc451977a4be9adee892f7e610fe3e3b3927b5a1"
          rangeCriteria: { name: "restore energy", range: { to: "1.157920892373162e+77", from: "1" } }
          auctionType: All
          sort: PriceAsc
        ) {
          results {
            name
            minPrice
            cdnImage
            attributes
            tokenId
          }
          total
        }
        dataSlimes: erc1155Tokens(
          from: 0
          size: 50
          tokenAddress: "0xcc451977a4be9adee892f7e610fe3e3b3927b5a1"
          name: "Energy Slime"
          auctionType: All
          sort: PriceAsc
        ) {
          results {
            name
            minPrice
            cdnImage
            tokenId
          }
        }
        dataBottle: erc1155Token(
          tokenAddress: "0xcc451977a4be9adee892f7e610fe3e3b3927b5a1"
          tokenId: "268558096"
        ) {
          name
          minPrice
          cdnImage
          tokenId
        }
      }
      `,
    );

    const resultsDataEnergyBuy = response.data.dataEnergyBuy.results.map(
      (result) => ({
        ...result,
        minPrice: Number(
          (result.minPrice / 1000000000000000000) *
            response.data.dataExchangeRate.ron.usd,
        ).toFixed(2),
        restoreEnergy: Number(result.attributes["restore energy"][0]),
        costPerEnergy: (
          Number(
            (result.minPrice / 1000000000000000000) *
              response.data.dataExchangeRate.ron.usd,
          ) / result.attributes["restore energy"][0]
        ).toFixed(2),
      }),
    );

    const resultsDataEnergyCraft = response.data.dataSlimes.results.map(
      (result) => {
        const minPriceTotal = (
          (result.minPrice / 1000000000000000000 +
            response.data.dataBottle.minPrice / 1000000000000000000) *
          response.data.dataExchangeRate.ron.usd
        ).toFixed(2);

        const matchingItem = resultsDataEnergyBuy.find(
          (item) => item.name.substring(0, 5) === result.name.substring(0, 5),
        );
        return {
          ...result,
          name: `${result.name} + Bottle`,
          minPrice: minPriceTotal,
          restoreEnergy: matchingItem.restoreEnergy * 3,
          costPerEnergy: (
            minPriceTotal /
            (matchingItem.restoreEnergy * 3)
          ).toFixed(2),
        };
      },
    );

    const allResults = [
      ...resultsDataEnergyBuy,
      ...resultsDataEnergyCraft,
    ].sort((a, b) => {
      if (a.minPrice === "0.00" && b.minPrice !== "0.00") return 1;
      if (a.minPrice !== "0.00" && b.minPrice === "0.00") return -1;
      return a.costPerEnergy - b.costPerEnergy;
    });

    return NextResponse.json(allResults);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
