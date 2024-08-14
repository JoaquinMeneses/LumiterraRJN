import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const fetchData = async (url, query) => {
  const response = await fetch(url, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.apiKeySkyMavis,
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${url}`);
  }
  return response.json();
};

const formatResults = (data, exchangeRate) =>
  data.erc1155Tokens.results.map((result) => ({
    ...result,
    minPrice: result.minPrice
      ? Number((result.minPrice / 1000000000000000000) * exchangeRate).toFixed(
          2
        )
      : "Not sale",
    attributes: Object.keys(result.attributes).map((key) => ({
      [key]: result.attributes[key][0],
    })),
    type: result.attributes["type"] ? result.attributes["type"][0] : undefined,
  }));

export async function GET(request) {
  const apiUrl = "https://api-gateway.skymavis.com/graphql/mavis-marketplace";
  const queries = {
    combatShoes: `
      query {
        erc1155Tokens(
          auctionType: Sale
          from: 0
          name: "Shoes"
          rangeCriteria: {name: "combatdef", range: {from: "1", to: "1.157920892373162e+77"}}
          size: 50
          sort: PriceAsc
          tokenAddress: "0xcc451977a4be9adee892f7e610fe3e3b3927b5a1"
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
    combatPants: `
      query {
        erc1155Tokens(
          auctionType: Sale
          from: 0
          name: "Pants"
          rangeCriteria: {name: "combatdef", range: {from: "1", to: "1.157920892373162e+77"}}
          size: 50
          sort: PriceAsc
          tokenAddress: "0xcc451977a4be9adee892f7e610fe3e3b3927b5a1"
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
    combatGloves: `
      query {
        erc1155Tokens(
          auctionType: Sale
          from: 0
          name: "Gloves"
          rangeCriteria: {name: "combatdef", range: {from: "1", to: "1.157920892373162e+77"}}
          size: 50
          sort: PriceAsc
          tokenAddress: "0xcc451977a4be9adee892f7e610fe3e3b3927b5a1"
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
    combatHat: `
      query {
        erc1155Tokens(
          auctionType: Sale
          from: 0
          name: "Hat"
          rangeCriteria: {name: "combatdef", range: {from: "1", to: "1.157920892373162e+77"}}
          size: 50
          sort: PriceAsc
          tokenAddress: "0xcc451977a4be9adee892f7e610fe3e3b3927b5a1"
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
    combatJacket: `
      query {
        erc1155Tokens(
          from: 0
          size: 50
          tokenAddress: "0xcc451977a4be9adee892f7e610fe3e3b3927b5a1"
          rangeCriteria: {name: "combatdef", range: {to: "1.157920892373162e+77", from: "1"}}
          criteria: {name: "type", values: "chest armor"}
          auctionType: Sale
          sort: PriceAsc
        ) {
          results {
            minPrice
            attributes
            name
            tokenId
            cdnImage
          }
          total
        }
      }
    `,
    combatSword: `
      query {
        erc1155Tokens(
          from: 0
          size: 50
          tokenAddress: "0xcc451977a4be9adee892f7e610fe3e3b3927b5a1"
          name: "Sword"
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
    combatBow: `
      query {
        erc1155Tokens(
          from: 0
          size: 50
          tokenAddress: "0xcc451977a4be9adee892f7e610fe3e3b3927b5a1"
          name: "Bow"
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
    combatHammer: `
      query {
        erc1155Tokens(
          from: 0
          size: 50
          tokenAddress: "0xcc451977a4be9adee892f7e610fe3e3b3927b5a1"
          name: "Hammer"
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
  };

  const dataExchangeRate = await fetchData(
    apiUrl,
    `
    query {
      exchangeRate {
        ron {
          usd
        }
      }
    }
  `
  );
  const exchangeRate = dataExchangeRate.data.exchangeRate.ron.usd;

  try {
    const promises = Object.keys(queries).map(async (key) => {
      const res = await fetchData(apiUrl, queries[key]);
      return formatResults(res.data, exchangeRate);
    });

    const allResults = (await Promise.all(promises)).flat();

    return NextResponse.json(allResults);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
