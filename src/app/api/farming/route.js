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
    const dataExchangeRate = await fetchData(
      `
      query MyQuery {
        exchangeRate {
          ron {
            usd
            }
        }
      }
    `,
    );
    const exchangeRate = dataExchangeRate.data.exchangeRate.ron.usd;

    const dataFarmingShoes = await fetchData(
      `
      query MyQuery {
        erc1155Tokens(
            from: 0
            size: 50
            tokenAddress: "0xcc451977a4be9adee892f7e610fe3e3b3927b5a1"
            name: "Farming Shoes"
            sort: PriceAsc
            auctionType: Sale
        ) 
        {
          results {
            minPrice
            name
            tokenId
            attributes
            image
            cdnImage
          }
          total
        }
      }
      `,
    );
    const dataFarmingPants = await fetchData(
      `query MyQuery {
          erc1155Tokens(
            from: 0
            size: 50
            tokenAddress: "0xcc451977a4be9adee892f7e610fe3e3b3927b5a1"
            name: "Farming Pants"
            sort: PriceAsc
            auctionType: Sale
          ) 
          {
            results {
              minPrice
              name
              tokenId
              attributes
              cdnImage
            }
            total
          }
        }
      `,
    );
    const dataFarmingGloves = await fetchData(
      `query MyQuery {
          erc1155Tokens(
            from: 0
            size: 50
            tokenAddress: "0xcc451977a4be9adee892f7e610fe3e3b3927b5a1"
            name: "Farming Gloves"
            sort: PriceAsc
            auctionType: Sale
          ) 
          {
            results {
              minPrice
              name
              tokenId
              attributes
              cdnImage
            }
            total
          }
        }
      `,
    );
    const dataFarmingLuckyHat = await fetchData(
      `
        query MyQuery {
          erc1155Tokens(
            from: 0
            size: 50
            tokenAddress: "0xcc451977a4be9adee892f7e610fe3e3b3927b5a1"
            name: "Lucky"
            sort: PriceAsc
            auctionType: Sale
          ) {
            results {
              minPrice
              name
              tokenId
              attributes
              cdnImage
            }
            total
          }
        }
      `,
    );
    const dataFarmingJacket = await fetchData(
      `query MyQuery {
          erc1155Tokens(
            from: 0
            size: 50
            tokenAddress: "0xcc451977a4be9adee892f7e610fe3e3b3927b5a1"
            name: "Farming Jacket"
            sort: PriceAsc
            auctionType: Sale
          ) {
            results {
              minPrice
              name
              tokenId
              attributes
              cdnImage
            }
            total
          }
        }
      `,
    );
    const dataFarmingHoe = await fetchData(
      `query MyQuery {
          erc1155Tokens(
            from: 0
            size: 50
            tokenAddress: "0xcc451977a4be9adee892f7e610fe3e3b3927b5a1"
            name: "Hoe"
            sort: PriceAsc
            auctionType: Sale
            criteria: {name: "type", values: "sword"}
          ) {
            results {
              minPrice
              name
              tokenId
              attributes
              cdnImage
            }
            total
          }
        }
      `,
    );
    const dataFarmingKettle = await fetchData(
      `query MyQuery {
          erc1155Tokens(
            from: 0
            size: 50
            tokenAddress: "0xcc451977a4be9adee892f7e610fe3e3b3927b5a1"
            name: "Kettle"
            sort: PriceAsc
            auctionType: Sale
            criteria: {name: "type", values: "sword"}
          ) {
            results {
              minPrice
              name
              tokenId
              attributes
              cdnImage
            }
            total
          }
        }
      `,
    );

    const resultsdataFarmingShoes =
      dataFarmingShoes.data.erc1155Tokens.results.map((result) => ({
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
    const resultsdataFarmingPants =
      dataFarmingPants.data.erc1155Tokens.results.map((result) => ({
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
    const resultsdataFarmingGloves =
      dataFarmingGloves.data.erc1155Tokens.results.map((result) => ({
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
    const resultsdataFarmingLuckyHat =
      dataFarmingLuckyHat.data.erc1155Tokens.results.map((result) => ({
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
    const resultsdataFarmingJacket =
      dataFarmingJacket.data.erc1155Tokens.results.map((result) => ({
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
    const resultsdataFarmingHoe = dataFarmingHoe.data.erc1155Tokens.results.map(
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
      }),
    );
    const resultsdataFarmingKettle =
      dataFarmingKettle.data.erc1155Tokens.results.map((result) => ({
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
      ...resultsdataFarmingShoes,
      ...resultsdataFarmingPants,
      ...resultsdataFarmingGloves,
      ...resultsdataFarmingLuckyHat,
      ...resultsdataFarmingJacket,
      ...resultsdataFarmingHoe,
      ...resultsdataFarmingKettle,
    ];

    return NextResponse.json(allResults);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
