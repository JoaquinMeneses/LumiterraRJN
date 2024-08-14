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

    const dataGatheringShoes = await fetchData(
      `
      query MyQuery {
        erc1155Tokens(
            from: 0
            size: 50
            tokenAddress: "0xcc451977a4be9adee892f7e610fe3e3b3927b5a1"
            name: "Gathering Shoes"
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
    const dataGatheringPants = await fetchData(
      `query MyQuery {
          erc1155Tokens(
            from: 0
            size: 50
            tokenAddress: "0xcc451977a4be9adee892f7e610fe3e3b3927b5a1"
            name: "Gathering Pants"
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
    const dataGatheringGloves = await fetchData(
      `query MyQuery {
          erc1155Tokens(
            from: 0
            size: 50
            tokenAddress: "0xcc451977a4be9adee892f7e610fe3e3b3927b5a1"
            name: "Gathering Gloves"
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
    const dataGatheringHat = await fetchData(
      `
        query MyQuery {
          erc1155Tokens(
            from: 0
            size: 50
            tokenAddress: "0xcc451977a4be9adee892f7e610fe3e3b3927b5a1"
            name: "Gathering Hat"
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
    const dataGatheringJacket = await fetchData(
      `query MyQuery {
          erc1155Tokens(
            from: 0
            size: 50
            tokenAddress: "0xcc451977a4be9adee892f7e610fe3e3b3927b5a1"
            name: "Gathering Jacket"
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
    const dataGatheringAxe = await fetchData(
      `query MyQuery {
          erc1155Tokens(
            from: 0
            size: 50
            tokenAddress: "0xcc451977a4be9adee892f7e610fe3e3b3927b5a1"
            name: "Axe"
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
    const dataGatheringPickaxe = await fetchData(
      `query MyQuery {
          erc1155Tokens(
            from: 0
            size: 50
            tokenAddress: "0xcc451977a4be9adee892f7e610fe3e3b3927b5a1"
            name: "Pickaxe"
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
    const dataGatheringSickle = await fetchData(
      `query MyQuery {
          erc1155Tokens(
            from: 0
            size: 50
            tokenAddress: "0xcc451977a4be9adee892f7e610fe3e3b3927b5a1"
            name: "Sickle"
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

    const resultsdataGatheringShoes =
      dataGatheringShoes.data.erc1155Tokens.results.map((result) => ({
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
    const resultsdataGatheringPants =
      dataGatheringPants.data.erc1155Tokens.results.map((result) => ({
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
    const resultsdataGatheringGloves =
      dataGatheringGloves.data.erc1155Tokens.results.map((result) => ({
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
    const resultsdataGatheringHat =
      dataGatheringHat.data.erc1155Tokens.results.map((result) => ({
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
    const resultsdataGatheringJacket =
      dataGatheringJacket.data.erc1155Tokens.results.map((result) => ({
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
    const resultsdataGatheringAxe =
      dataGatheringAxe.data.erc1155Tokens.results.map((result) => ({
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
    const resultsdataGatheringPickaxe =
      dataGatheringPickaxe.data.erc1155Tokens.results.map((result) => ({
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
    const resultsdataGatheringSickle =
      dataGatheringSickle.data.erc1155Tokens.results.map((result) => ({
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
      ...resultsdataGatheringShoes,
      ...resultsdataGatheringPants,
      ...resultsdataGatheringGloves,
      ...resultsdataGatheringHat,
      ...resultsdataGatheringJacket,
      ...resultsdataGatheringAxe,
      ...resultsdataGatheringPickaxe,
      ...resultsdataGatheringSickle,
    ];

    return NextResponse.json(allResults);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
