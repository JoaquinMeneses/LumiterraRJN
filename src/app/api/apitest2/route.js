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
    const errorText = await response.text();
    throw new Error(`Failed to fetch data: ${errorText}`);
  }
  return response.json();
};

export async function POST(request) {
  const body = await request.json();
  const { type, quality, requiresLevel } = body;

  const combatatt = 1;
  const combatdef = 1;

  const types = [
    "sword",
    "hands armor",
    "head armor",
    "feet armor",
    "legs armor",
    "chest armor",
  ];
  const qualities = ["basic", "ultimate", "enhanced", "advanced", "super"];
  const requiresLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const typeVerified = types.includes(type) ? type : "";
  const qualityVerified = qualities.includes(quality) ? quality : "";
  const requiresLevelVerified = requiresLevels.includes(requiresLevel)
    ? requiresLevel
    : "";

  const rangeCriteria = `${typeVerified} ${qualityVerified} ${requiresLevelVerified}
  `;

  try {
    const query = `
      query Farming {
        exchangeRate {
          ron {
            usd
          }
        }
        erc1155Tokens(
          from: 0
          tokenAddress: "0xcc451977a4be9adee892f7e610fe3e3b3927b5a1"
          sort: PriceAsc
          auctionType: Sale
          size: 50
          
        ) {
          results {
            name
            cdnImage
            minPrice
            tokenId
            attributes
          }
        }
      }
    `;

    const response = await fetchData(query);
    const exchangeRate = response.data.exchangeRate.ron.usd;
    const items = response.data.erc1155Tokens.results;

    return NextResponse.json(rangeCriteria);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
