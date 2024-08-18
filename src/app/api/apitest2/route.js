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
  const { auctionType, type, quality, requiresLevel } = body;

  const auctionsTypes = ["All", "Sale", "NotForSale"];
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

  const auctionTypeVerified = auctionsTypes.includes(auctionType)
    ? auctionType
    : "";
  const typeVerified = types.includes(type) ? type : "";
  const qualityVerified = qualities.includes(quality) ? quality : "";
  const requiresLevelsVerified = requiresLevels.includes(requiresLevel)
    ? requiresLevel
    : "";
  const statVerified = types.includes(type)
    ? type === "sword"
      ? "combatatt"
      : "combatdef"
    : "";

  const auctionsTypeField = auctionTypeVerified
    ? `auctionType: ${auctionTypeVerified}`
    : ``;

  const criteriaField = [];
  if (typeVerified)
    criteriaField.push(`{name: "type", values: ["${typeVerified}"]}`);
  if (qualityVerified)
    criteriaField.push(`{name: "quality", values: ["${qualityVerified}"]}`);

  const rangeCriteriaField = [];
  if (requiresLevelsVerified)
    rangeCriteriaField.push(
      `{name: "requires level", range: {from: ${requiresLevelsVerified}, to: "${requiresLevelsVerified}"}}`,
    );
  if (statVerified)
    rangeCriteriaField.push(
      `{name: "${statVerified}", range: {from: "1", to: "1.157920892373162e+77"}}`,
    );

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
        size: 50
        ${auctionsTypeField}
        ${criteriaField.length ? `criteria: [${criteriaField.join(", ")}]` : ""}
        ${rangeCriteriaField.length ? `rangeCriteria: [${rangeCriteriaField.join(", ")}]` : ""}
      ) {
        results {
          name
          cdnImage
          minPrice
          tokenId
          attributes
        }
        total
      }
    }
  `;

  try {
    const response = await fetchData(query);
    const exchangeRate = response.data.exchangeRate.ron.usd;
    const total = response.data.erc1155Tokens.total;
    const items = response.data.erc1155Tokens.results;

    return NextResponse.json({ exchangeRate, total, items });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
