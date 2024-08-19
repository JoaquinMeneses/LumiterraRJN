import { NextResponse } from "next/server";
import { properties } from "@/utils/data";

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

export async function POST(request, { params }) {
  const body = await request.json();
  const { auctionType, type, quality, requiresLevel } = body;
  const profession = params.profession;

  try {
    const typeVerified =
      type === "sword"
        ? properties[profession]["sword"]
        : properties[profession]["armor"].filter(({ name }) => name === type);

    const query = `
      query data {
        exchangeRate {
          ron {
            usd
          }
        }
        ${typeVerified
          .map(
            ({ name, stats }) => `
          ${name.split(" ")[0]}: erc1155Tokens(
            tokenAddress: "0xcc451977a4be9adee892f7e610fe3e3b3927b5a1"
            ${type == "sword" && `name:"${name}"`}
            from: 0
            size: 50
            sort: PriceAsc
            auctionType: ${auctionType}
            criteria: [
              { name: "type", values: ["${type}"] },
              { name: "quality", values: ["${quality}"] }
            ]
            rangeCriteria: [
              { name: "requires level", range: { from: ${requiresLevel}, to: ${requiresLevel} } },
              ${stats.map((stat) => `{ name: "${stat}", range: { from: "1", to: "1.157920892373162e+77" } }`).join(",\n")}
            ]
          ) {
            results {
              tokenId
              name
              cdnImage
              minPrice
              attributes
            }
          }
        `,
          )
          .join("\n")}
      }
    `;

    const response = await fetchData(query);
    const exchangeRate = response.data.exchangeRate.ron.usd;

    const combinedResults = Object.keys(response.data)
      .filter((key) => key !== "exchangeRate")
      .reduce((acc, key) => {
        return acc.concat(response.data[key].results);
      }, []);

    const finalResponse = combinedResults
      .map((result) => ({
        tokenId: result.tokenId,
        name: result.name,
        cdnImage: result.cdnImage,
        prices: {
          ron: result.minPrice
            ? (result.minPrice / 1e18).toFixed(2)
            : "Not sale",
          usd: result.minPrice
            ? ((result.minPrice / 1e18) * exchangeRate).toFixed(2)
            : "Not sale",
        },
        attributes: Object.keys(result.attributes).map((key) => ({
          [key]: result.attributes[key][0],
        })),
      }))
      .sort((a, b) => {
        return a.prices.usd - b.prices.usd;
      });

    return NextResponse.json(finalResponse);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
