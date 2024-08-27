import { NextResponse } from "next/server";
import { itemsData } from "@/utils/itemsData";
import apiUrl from "@/utils/apiUrl";

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

const fetchDataEnergy = async () => {
  const response = await fetch(`${apiUrl}/api/energia`, {
    method: "GET",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch data `);
  }
  return response.json();
};

export async function POST(request, { params }) {
  const profession = params.profession;

  try {
    const dataEnergy = await fetchDataEnergy();
    const itemsVerified = profession && itemsData[profession];

    const query = `
      query data {
        exchangeRate {
          ron {
            usd
          }
        }
        ${itemsVerified
          .map(
            ({ name, requiresLevel, alias, stats }) => `
          ${alias}: erc1155Tokens(
            tokenAddress: "0xcc451977a4be9adee892f7e610fe3e3b3927b5a1"
            name:"${name}"
            from: 0
            size: 1
            sort: PriceAsc
            auctionType: Sale
            rangeCriteria: [
              { name: "requires level", range: { from: ${requiresLevel}, to: ${requiresLevel} } }]
          ) {
            results {
              tokenId
              name
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

    const finalResponse = combinedResults.map((result) => ({
      name: result.name,
      requiresLevel: result.attributes["requires level"],
      prices: {
        ron: result.minPrice ? (result.minPrice / 1e18).toFixed(2) : "Not sale",
        usd: result.minPrice
          ? ((result.minPrice / 1e18) * exchangeRate).toFixed(2)
          : "Not sale",
      },
      tokenId: result.tokenId,
    }));

    itemsVerified.forEach((item) => {
      const itemFinalResponse = finalResponse.find(
        (response) =>
          response.name === item.name &&
          Number(response.requiresLevel[0]) === item.requiresLevel,
      );
      if (itemFinalResponse) {
        item.recipe[3].materials[0].price = itemFinalResponse.prices;
        item.recipe[3].materials[0].tokenId = itemFinalResponse.tokenId;
        item.recipe[3].minPricesTotal = itemFinalResponse.prices;
        item.recipe[4].materials[0].price = itemFinalResponse.prices;
        item.recipe[4].materials[0].tokenId = itemFinalResponse.tokenId;
        item.recipe[4].minPricesTotal.ron =
          Number(item.recipe[4].minPricesTotal.ron) + 
          Number(itemFinalResponse.prices.ron)
        item.recipe[4].minPricesTotal.usd =
          Number(item.recipe[4].minPricesTotal.usd) + 
          Number(itemFinalResponse.prices.usd)
      } else {
        item.recipe[3].materials[0].price = {
          ron: "Not sale",
          usd: "Not sale",
        };
        item.recipe[4].materials[0].price = {
          ron: "Not sale",
          usd: "Not sale",
        };
      }
       item.recipe[2].materials[0].price.usd = Number(
        item.recipe[2].materials[0].quantity * dataEnergy[0].costPerEnergy
      ).toFixed(2)
      item.recipe[2].materials[0].price.ron = Number(
        item.recipe[2].materials[0].quantity *
        (dataEnergy[0].costPerEnergy / exchangeRate)
      ).toFixed(2)
      item.recipe[2].materials[0].cdnImage = dataEnergy[0].cdnImage;
      item.recipe[2].minPricesTotal.ron = Number(
        item.recipe[2].materials[0].quantity *
        (dataEnergy[0].costPerEnergy / exchangeRate)
      ).toFixed(2)
      item.recipe[2].minPricesTotal.usd = Number(
        item.recipe[2].materials[0].quantity * dataEnergy[0].costPerEnergy
      ).toFixed(2)
    });

    return NextResponse.json(itemsVerified);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
