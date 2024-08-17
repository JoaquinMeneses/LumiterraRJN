import Farming from "@/app/farming/page";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function generateCombinedQuery(resultField,names) {   
  let query = `query CombinedQuery {\n`;

  names.forEach(name => {
    const alias = name.replace(/\s+/g, ''); // Remueve los espacios para crear el alias
    query += `  ${alias}: erc1155Tokens(\n`;
    query += `    from: 0\n`;
    query += `    size: 1\n`;
    query += `    tokenAddress: "0xcc451977a4be9adee892f7e610fe3e3b3927b5a1"\n`;
    query += `    auctionType: Sale\n`;
    query += `    name: "${name}"\n`;
    query += `    sort: PriceAsc\n`;
    query += `  ) {\n`;
    query += `    results {\n`;
    query += `      ${resultField}\n`;
    query += `    }\n`;
    query += `    total\n`;
    query += `  }\n`;
  });

  query += `}`;

  return query;
}

const fetchDataNames = async () => {
  const response = await fetch(
    `https://thlm.bond/lumi/market_product`,
    {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch data `);
  }
  return response.json();
};

const fetchDataEssen = async () => {
  const response = await fetch(
    `http://localhost:3000/api/essence`,
    {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch data `);
  }
  return response.json();
};

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

    const result = 'minPrice name attributes cdnImage tokenId'
    const nameSwordBowHammer = await fetchDataNames()
    let ArrayCombatWeapons = [];
    nameSwordBowHammer.data.forEach(item => {
      if (item.name){
        if(item.name.toLowerCase().includes("sword") || item.name.toLowerCase().includes("bow") || item.name.toLowerCase().includes("hammer")){
          ArrayCombatWeapons.push(item.name);
          }
      }
    });
    const graphqlQueryCombatWeapons = generateCombinedQuery(result,ArrayCombatWeapons);
    const dataCombatWeapons = await fetchData(graphqlQueryCombatWeapons);

    const nameCombatArmor = await fetchDataNames()
    let ArrayCombatArmor = [];
    nameCombatArmor.data.forEach(item => {
      if (item.name){
        if(item.name.toLowerCase().includes("cracked crystal") || item.name.toLowerCase().includes("chip head") || item.name.toLowerCase().includes("crystal skin")
          || item.name.toLowerCase().includes("crystal stone") || item.name.toLowerCase().includes("crystal leg") || item.name.toLowerCase().includes("golden fighter")
        || item.name.toLowerCase().includes("diamond fighter") || item.name.toLowerCase().includes("star fighter") || item.name.toLowerCase().includes("lava combat")
        || item.name.toLowerCase().includes("hollow combat") || item.name.toLowerCase().includes("bronze combat")){
          if(!item.name.toLowerCase().includes("blue")){
            ArrayCombatArmor.push(item.name);
          }}
      }
    });
    const graphqlQueryCombatArmor = generateCombinedQuery(result,ArrayCombatArmor);
    const dataCombatClothes = await fetchData(graphqlQueryCombatArmor);
    const dataEssence = await fetchDataEssen()

 
    const Items = [
      {
        Combat:[
          {'Stone Sword': [
            {minpriceRon: dataCombatWeapons.data.StoneSword.results.find(item => item.name === 'Stone Sword')?.minPrice / 1000000000000000000 || "Not sale"},
            {minpriceUsd: Number((dataCombatWeapons.data.StoneSword.results.find(item => item.name === 'Stone Sword')?.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) || "Not sale"},
            {img: "https://icons.lumiterra.net/item-icon-40.png"},
            {'require level': 1},
            {recipe:[
              {materials:[
                {'Lv 1 Agricultural Livestock Essence':[
                  {quantity: 2},
                  {img: "https://icons.lumiterra.net/item-icon-213.png"},
                  {minpriceRon: dataEssence.find(item => item.name === 'Lv 1 Agricultural Livestock Essence')?.minPriceRon * 2 || "Not sale"},
                  {minpriceUsd: dataEssence.find(item => item.name === 'Lv 1 Agricultural Livestock Essence')?.minPriceUsd * 2 || "Not sale"},
                ]},
                {'Lv 1 Agricultural Planting Essence':[
                  {quantity: 2},
                  {img: "https://icons.lumiterra.net/item-icon-210.png"},
                  {minpriceRon: dataEssence.find(item => item.name === 'Lv 1 Agricultural Planting Essence')?.minPriceRon * 2 || "Not sale"},
                  {minpriceUsd: dataEssence.find(item => item.name === 'Lv 1 Agricultural Planting Essence')?.minPriceUsd * 2 || "Not sale"},
                ]},
              ]}
            ]},
            {attributes:[
              {Combatatt: "40-122"},
              {Combatcritrate: "0.00%-0.00%"},
              {Grassatt: "20-25"}
            ]}
          ]}
        ]
      },
    ]
    return NextResponse.json(Items);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
