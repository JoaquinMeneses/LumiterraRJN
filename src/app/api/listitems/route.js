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
                  {quantity: 1},
                  {img: "https://icons.lumiterra.net/item-icon-213.png"},
                  {minpriceRon: dataEssence.find(item => item.name === 'Lv 1 Agricultural Livestock Essence')?.minPriceRon || "Not sale"},
                  {minpriceUsd: Number(dataEssence.find(item => item.name === 'Lv 1 Agricultural Livestock Essence')?.minPriceUsd) || "Not sale"},
                ]},
                {'Lv 1 Agricultural Planting Essence':[
                  {quantity: 1},
                  {img: "https://icons.lumiterra.net/item-icon-210.png"},
                  {minpriceRon: dataEssence.find(item => item.name === 'Lv 1 Agricultural Planting Essence')?.minPriceRon || "Not sale"},
                  {minpriceUsd: Number(dataEssence.find(item => item.name === 'Lv 1 Agricultural Planting Essence')?.minPriceUsd) || "Not sale"},
                ]},
              ]},
              {minPrinceTotalRecipeRon: Number((dataEssence.find(item => item.name === 'Lv 1 Agricultural Livestock Essence')?.minPriceRon) + (dataEssence.find(item => item.name === 'Lv 1 Agricultural Planting Essence')?.minPriceRon)).toFixed(2) || "Not sale"},
              {minPrinceTotalRecipeUsd: Number(((dataEssence.find(item => item.name === 'Lv 1 Agricultural Livestock Essence')?.minPriceRon) + (dataEssence.find(item => item.name === 'Lv 1 Agricultural Planting Essence')?.minPriceRon))* exchangeRate).toFixed(2) || "Not sale"}
            ]},
            {attributes:[
              {Combatatt: "40-122"},
              {Combatcritrate: "0.00%-0.00%"},
              {Grassatt: "20-25"}
            ]}
          ]},
          {'Iron Sword': [
            {minpriceRon: Number(dataCombatWeapons.data.IronSword.results.find(item => item.name === 'Iron Sword')?.minPrice / 1000000000000000000).toFixed(2) || "Not sale"},
            {minpriceUsd: Number((dataCombatWeapons.data.IronSword.results.find(item => item.name === 'Iron Sword')?.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) || "Not sale"},
            {img: "https://icons.lumiterra.net/item-icon-41.png"},
            {'require level': 2},
            {recipe:[
              {materials:[
                {'Lv 2 Agricultural Livestock Essence':[
                  {quantity: 1},
                  {img: "https://icons.lumiterra.net/item-icon-214.png"},
                  {minpriceRon: Number(dataEssence.find(item => item.name === 'Lv 2 Agricultural Livestock Essence')?.minPriceRon).toFixed(2) || "Not sale"},
                  {minpriceUsd: Number(dataEssence.find(item => item.name === 'Lv 2 Agricultural Livestock Essence')?.minPriceUsd).toFixed(2) || "Not sale"},
                ]},
                {'Lv 2 Agricultural Planting Essence':[
                  {quantity: 1},
                  {img: "https://icons.lumiterra.net/item-icon-211.png"},
                  {minpriceRon: Number(dataEssence.find(item => item.name === 'Lv 2 Agricultural Planting Essence')?.minPriceRon).toFixed(2) || "Not sale"},
                  {minpriceUsd: Number(dataEssence.find(item => item.name === 'Lv 2 Agricultural Planting Essence')?.minPriceUsd).toFixed(2) || "Not sale"},
                ]},
                {'Lv 1 Gather Essence':[
                  {quantity: 2},
                  {img: "https://icons.lumiterra.net/item-icon-207.png"},
                  {minpriceRon: Number(dataEssence.find(item => item.name === 'Lv 1 Gather Essence')?.minPriceRon).toFixed(2) * 2 || "Not sale"},
                  {minpriceUsd: Number(dataEssence.find(item => item.name === 'Lv 1 Gather Essence')?.minPriceUsd).toFixed(2) * 2 || "Not sale"},
                ]},
              ]},
              {minPrinceTotalRecipeRon: Number((dataEssence.find(item => item.name === 'Lv 2 Agricultural Livestock Essence')?.minPriceRon) + (dataEssence.find(item => item.name === 'Lv 2 Agricultural Planting Essence')?.minPriceRon) + (dataEssence.find(item => item.name === 'Lv 1 Gather Essence')?.minPriceRon)*2).toFixed(2)|| "Not sale"},
              {minPrinceTotalRecipeUsd: Number(((dataEssence.find(item => item.name === 'Lv 2 Agricultural Livestock Essence')?.minPriceRon) + (dataEssence.find(item => item.name === 'Lv 2 Agricultural Planting Essence')?.minPriceRon) + (dataEssence.find(item => item.name === 'Lv 1 Gather Essence')?.minPriceRon)*2) * exchangeRate).toFixed(2)|| "Not sale"}
            ]},
            {attributes:[
              {Combatatt: "121-203"},
              {Combatcritrate: "0.00%-0.00%"},
              {Grassatt: "20-25"}
            ]}
          ]},
          {'Crystal Sword': [
            {minpriceRon: Number(dataCombatWeapons.data.CrystalSword.results.find(item => item.name === 'Crystal Sword')?.minPrice / 1000000000000000000).toFixed(2) || "Not sale"},
            {minpriceUsd: Number((dataCombatWeapons.data.CrystalSword.results.find(item => item.name === 'Crystal Sword')?.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) || "Not sale"},
            {img: "https://icons.lumiterra.net/item-icon-42.png"},
            {'require level': 3},
            {recipe:[
              {materials:[
                {'Lv 3 Agricultural Livestock Essence':[
                  {quantity: 1},
                  {img: "https://icons.lumiterra.net/item-icon-215.png"},
                  {minpriceRon: Number(dataEssence.find(item => item.name === 'Lv 3 Agricultural Livestock Essence')?.minPriceRon).toFixed(2) || "Not sale"},
                  {minpriceUsd: Number(dataEssence.find(item => item.name === 'Lv 3 Agricultural Livestock Essence')?.minPriceUsd).toFixed(2) || "Not sale"},
                ]},
                {'Lv 3 Agricultural Planting Essence':[
                  {quantity: 1},
                  {img: "https://icons.lumiterra.net/item-icon-212.png"},
                  {minpriceRon: Number(dataEssence.find(item => item.name === 'Lv 3 Agricultural Planting Essence')?.minPriceRon).toFixed(2) || "Not sale"},
                  {minpriceUsd: Number(dataEssence.find(item => item.name === 'Lv 3 Agricultural Planting Essence')?.minPriceUsd).toFixed(2) || "Not sale"},
                ]},
                {'Lv 2 Gather Essence':[
                  {quantity: 2},
                  {img: "https://icons.lumiterra.net/item-icon-208.png"},
                  {minpriceRon: Number(dataEssence.find(item => item.name === 'Lv 2 Gather Essence')?.minPriceRon).toFixed(2) * 2 || "Not sale"},
                  {minpriceUsd: Number(dataEssence.find(item => item.name === 'Lv 2 Gather Essence')?.minPriceUsd).toFixed(2) * 2 || "Not sale"},
                ]},
              ]},
              {minPrinceTotalRecipeRon: Number((dataEssence.find(item => item.name === 'Lv 3 Agricultural Livestock Essence')?.minPriceRon) + (dataEssence.find(item => item.name === 'Lv 3 Agricultural Planting Essence')?.minPriceRon) + (dataEssence.find(item => item.name === 'Lv 2 Gather Essence')?.minPriceRon)*2).toFixed(2)|| "Not sale"},
              {minPrinceTotalRecipeUsd: Number(((dataEssence.find(item => item.name === 'Lv 3 Agricultural Livestock Essence')?.minPriceRon) + (dataEssence.find(item => item.name === 'Lv 3 Agricultural Planting Essence')?.minPriceRon) + (dataEssence.find(item => item.name === 'Lv 2 Gather Essence')?.minPriceRon)*2) * exchangeRate).toFixed(2)|| "Not sale"}
            ]},
            {attributes:[
              {Combatatt: "202-284"},
              {Combatcritrate: "0.00%-0.00%"},
              {Grassatt: "20-25"}
            ]}
          ]},
          {'Golden Sword': [
            {minpriceRon: Number(dataCombatWeapons.data.GoldenSword.results.find(item => item.name === 'Golden Sword')?.minPrice / 1000000000000000000).toFixed(2) || "Not sale"},
            {minpriceUsd: Number((dataCombatWeapons.data.GoldenSword.results.find(item => item.name === 'Golden Sword')?.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) || "Not sale"},
            {img: "https://icons.lumiterra.net/item-icon-317.png"},
            {'require level': 4},
            {recipe:[
              {materials:[
                {'Lv 4 Agricultural Livestock Essence':[
                  {quantity: 1},
                  {img: "https://icons.lumiterra.net/item-icon-410.png"},
                  {minpriceRon: Number(dataEssence.find(item => item.name === 'Lv 4 Agricultural Livestock Essence')?.minPriceRon).toFixed(2) || "Not sale"},
                  {minpriceUsd: Number(dataEssence.find(item => item.name === 'Lv 4 Agricultural Livestock Essence')?.minPriceUsd).toFixed(2) || "Not sale"},
                ]},
                {'Lv 4 Agricultural Planting Essence':[
                  {quantity: 1},
                  {img: "https://icons.lumiterra.net/item-icon-407.png"},
                  {minpriceRon: Number(dataEssence.find(item => item.name === 'Lv 4 Agricultural Planting Essence')?.minPriceRon).toFixed(2) || "Not sale"},
                  {minpriceUsd: Number(dataEssence.find(item => item.name === 'Lv 4 Agricultural Planting Essence')?.minPriceUsd).toFixed(2) || "Not sale"},
                ]},
                {'Lv 3 Gather Essence':[
                  {quantity: 2},
                  {img: "https://icons.lumiterra.net/item-icon-209.png"},
                  {minpriceRon: Number(dataEssence.find(item => item.name === 'Lv 3 Gather Essence')?.minPriceRon).toFixed(2) * 2 || "Not sale"},
                  {minpriceUsd: Number(dataEssence.find(item => item.name === 'Lv 3 Gather Essence')?.minPriceUsd).toFixed(2) * 2 || "Not sale"},
                ]},
              ]},
              {minPrinceTotalRecipeRon: Number((dataEssence.find(item => item.name === 'Lv 4 Agricultural Livestock Essence')?.minPriceRon) + (dataEssence.find(item => item.name === 'Lv 4 Agricultural Planting Essence')?.minPriceRon) + (dataEssence.find(item => item.name === 'Lv 3 Gather Essence')?.minPriceRon)*2).toFixed(2)|| "Not sale"},
              {minPrinceTotalRecipeUsd: Number(((dataEssence.find(item => item.name === 'Lv 4 Agricultural Livestock Essence')?.minPriceRon) + (dataEssence.find(item => item.name === 'Lv 4 Agricultural Planting Essence')?.minPriceRon) + (dataEssence.find(item => item.name === 'Lv 3 Gather Essence')?.minPriceRon)*2) * exchangeRate).toFixed(2)|| "Not sale"}
            ]},
            {attributes:[
              {Combatatt: "283-365"},
              {Combatcritrate: "0.00%-0.00%"},
              {Grassatt: "20-25"}
            ]}
          ]},
          {'Diamond Sword': [
            {minpriceRon: Number(dataCombatWeapons.data.DiamondSword.results.find(item => item.name === 'Diamond Sword')?.minPrice / 1000000000000000000).toFixed(2) || "Not sale"},
            {minpriceUsd: Number((dataCombatWeapons.data.DiamondSword.results.find(item => item.name === 'Diamond Sword')?.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) || "Not sale"},
            {img: "https://icons.lumiterra.net/item-icon-318.png"},
            {'require level': 5},
            {recipe:[
              {materials:[
                {'Lv 5 Agricultural Livestock Essence':[
                  {quantity: 1},
                  {img: "https://icons.lumiterra.net/item-icon-411.png"},
                  {minpriceRon: Number(dataEssence.find(item => item.name === 'Lv 5 Agricultural Livestock Essence')?.minPriceRon).toFixed(2) || "Not sale"},
                  {minpriceUsd: Number(dataEssence.find(item => item.name === 'Lv 5 Agricultural Livestock Essence')?.minPriceUsd).toFixed(2) || "Not sale"},
                ]},
                {'Lv 5 Agricultural Planting Essence':[
                  {quantity: 1},
                  {img: "https://icons.lumiterra.net/item-icon-408.png"},
                  {minpriceRon: Number(dataEssence.find(item => item.name === 'Lv 5 Agricultural Planting Essence')?.minPriceRon).toFixed(2) || "Not sale"},
                  {minpriceUsd: Number(dataEssence.find(item => item.name === 'Lv 5 Agricultural Planting Essence')?.minPriceUsd).toFixed(2) || "Not sale"},
                ]},
                {'Lv 4 Gather Essence':[
                  {quantity: 2},
                  {img: "https://icons.lumiterra.net/item-icon-404.png"},
                  {minpriceRon: Number(dataEssence.find(item => item.name === 'Lv 4 Gather Essence')?.minPriceRon).toFixed(2) * 2 || "Not sale"},
                  {minpriceUsd: Number(dataEssence.find(item => item.name === 'Lv 4 Gather Essence')?.minPriceUsd).toFixed(2) * 2 || "Not sale"},
                ]},
              ]},
              {minPrinceTotalRecipeRon: Number((dataEssence.find(item => item.name === 'Lv 5 Agricultural Livestock Essence')?.minPriceRon) + (dataEssence.find(item => item.name === 'Lv 5 Agricultural Planting Essence')?.minPriceRon) + (dataEssence.find(item => item.name === 'Lv 4 Gather Essence')?.minPriceRon)*2).toFixed(2)|| "Not sale"},
              {minPrinceTotalRecipeUsd: Number(((dataEssence.find(item => item.name === 'Lv 5 Agricultural Livestock Essence')?.minPriceRon) + (dataEssence.find(item => item.name === 'Lv 5 Agricultural Planting Essence')?.minPriceRon) + (dataEssence.find(item => item.name === 'Lv 4 Gather Essence')?.minPriceRon)*2) * exchangeRate).toFixed(2)|| "Not sale"}
            ]},
            {attributes:[
              {Combatatt: "364-446"},
              {Combatcritrate: "0.00%-0.00%"},
              {Grassatt: "20-25"}
            ]}
          ]},
          {'Star Sword': [
            {minpriceRon: Number(dataCombatWeapons.data.StarSword.results.find(item => item.name === 'Star Sword')?.minPrice / 1000000000000000000).toFixed(2) || "Not sale"},
            {minpriceUsd: Number((dataCombatWeapons.data.StarSword.results.find(item => item.name === 'Star Sword')?.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) || "Not sale"},
            {img: "https://icons.lumiterra.net/item-icon-319.png"},
            {'require level': 6},
            {recipe:[
              {materials:[
                {'Lv 6 Agricultural Livestock Essence':[
                  {quantity: 1},
                  {img: "https://icons.lumiterra.net/item-icon-412.png"},
                  {minpriceRon: Number(dataEssence.find(item => item.name === 'Lv 6 Agricultural Livestock Essence')?.minPriceRon).toFixed(2) || "Not sale"},
                  {minpriceUsd: Number(dataEssence.find(item => item.name === 'Lv 6 Agricultural Livestock Essence')?.minPriceUsd).toFixed(2) || "Not sale"},
                ]},
                {'Lv 6 Agricultural Planting Essence':[
                  {quantity: 1},
                  {img: "https://icons.lumiterra.net/item-icon-409.png"},
                  {minpriceRon: Number(dataEssence.find(item => item.name === 'Lv 6 Agricultural Planting Essence')?.minPriceRon).toFixed(2) || "Not sale"},
                  {minpriceUsd: Number(dataEssence.find(item => item.name === 'Lv 6 Agricultural Planting Essence')?.minPriceUsd).toFixed(2) || "Not sale"},
                ]},
                {'Lv 5 Gather Essence':[
                  {quantity: 2},
                  {img: "https://icons.lumiterra.net/item-icon-405.png"},
                  {minpriceRon: Number(dataEssence.find(item => item.name === 'Lv 5 Gather Essence')?.minPriceRon).toFixed(2) * 2 || "Not sale"},
                  {minpriceUsd: Number(dataEssence.find(item => item.name === 'Lv 5 Gather Essence')?.minPriceUsd).toFixed(2) * 2 || "Not sale"},
                ]},
              ]},
              {minPrinceTotalRecipeRon: Number((dataEssence.find(item => item.name === 'Lv 6 Agricultural Livestock Essence')?.minPriceRon) + (dataEssence.find(item => item.name === 'Lv 6 Agricultural Planting Essence')?.minPriceRon) + (dataEssence.find(item => item.name === 'Lv 5 Gather Essence')?.minPriceRon)*2).toFixed(2)|| "Not sale"},
              {minPrinceTotalRecipeUsd: Number(((dataEssence.find(item => item.name === 'Lv 6 Agricultural Livestock Essence')?.minPriceRon) + (dataEssence.find(item => item.name === 'Lv 6 Agricultural Planting Essence')?.minPriceRon) + (dataEssence.find(item => item.name === 'Lv 5 Gather Essence')?.minPriceRon)*2) * exchangeRate).toFixed(2)|| "Not sale"}
            ]},
            {attributes:[
              {Combatatt: "445-527"},
              {Combatcritrate: "0.00%-0.00%"},
              {Grassatt: "20-25"}
            ]}
          ]},
          {'Lava Sword': [
            {minpriceRon: Number(dataCombatWeapons.data.LavaSword.results.find(item => item.name === 'Lava Sword')?.minPrice / 1000000000000000000).toFixed(2) || "Not sale"},
            {minpriceUsd: Number((dataCombatWeapons.data.LavaSword.results.find(item => item.name === 'Lava Sword')?.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) || "Not sale"},
            {img: "https://icons.lumiterra.net/item-icon-527.png"},
            {'require level': 7},
            {recipe:[
              {materials:[
                {'Lv 7 Agricultural Livestock Essence':[
                  {quantity: 1},
                  {img: "https://icons.lumiterra.net/item-icon-611.png"},
                  {minpriceRon: Number(dataEssence.find(item => item.name === 'Lv 7 Agricultural Livestock Essence')?.minPriceRon).toFixed(2) || "Not sale"},
                  {minpriceUsd: Number(dataEssence.find(item => item.name === 'Lv 7 Agricultural Livestock Essence')?.minPriceUsd).toFixed(2) || "Not sale"},
                ]},
                {'Lv 7 Agricultural Planting Essence':[
                  {quantity: 1},
                  {img: "https://icons.lumiterra.net/item-icon-608.png"},
                  {minpriceRon: Number(dataEssence.find(item => item.name === 'Lv 7 Agricultural Planting Essence')?.minPriceRon).toFixed(2) || "Not sale"},
                  {minpriceUsd: Number(dataEssence.find(item => item.name === 'Lv 7 Agricultural Planting Essence')?.minPriceUsd).toFixed(2) || "Not sale"},
                ]},
                {'Lv 6 Gather Essence':[
                  {quantity: 2},
                  {img: "https://icons.lumiterra.net/item-icon-406.png"},
                  {minpriceRon: Number(dataEssence.find(item => item.name === 'Lv 6 Gather Essence')?.minPriceRon).toFixed(2) * 2 || "Not sale"},
                  {minpriceUsd: Number(dataEssence.find(item => item.name === 'Lv 6 Gather Essence')?.minPriceUsd).toFixed(2) * 2 || "Not sale"},
                ]},
              ]},
              {minPrinceTotalRecipeRon: Number((dataEssence.find(item => item.name === 'Lv 7 Agricultural Livestock Essence')?.minPriceRon) + (dataEssence.find(item => item.name === 'Lv 7 Agricultural Planting Essence')?.minPriceRon) + (dataEssence.find(item => item.name === 'Lv 6 Gather Essence')?.minPriceRon)*2).toFixed(2)|| "Not sale"},
              {minPrinceTotalRecipeUsd: Number(((dataEssence.find(item => item.name === 'Lv 7 Agricultural Livestock Essence')?.minPriceRon) + (dataEssence.find(item => item.name === 'Lv 7 Agricultural Planting Essence')?.minPriceRon) + (dataEssence.find(item => item.name === 'Lv 6 Gather Essence')?.minPriceRon)*2) * exchangeRate).toFixed(2)|| "Not sale"}
            ]},
            {attributes:[
              {Combatatt: "526-608"},
              {Combatcritrate: "0.00%-0.00%"},
              {Grassatt: "20-25"}
            ]}
          ]},
          {'Hollow Sword': [
            {minpriceRon: Number(dataCombatWeapons.data.HollowSword.results.find(item => item.name === 'Hollow Sword')?.minPrice / 1000000000000000000).toFixed(2) || "Not sale"},
            {minpriceUsd: Number((dataCombatWeapons.data.HollowSword.results.find(item => item.name === 'Hollow Sword')?.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) || "Not sale"},
            {img: "https://icons.lumiterra.net/item-icon-551.png"},
            {'require level': 8},
            {recipe:[
              {materials:[
                {'Lv 8 Agricultural Livestock Essence':[
                  {quantity: 1},
                  {img: "https://icons.lumiterra.net/item-icon-612.png"},
                  {minpriceRon: Number(dataEssence.find(item => item.name === 'Lv 8 Agricultural Livestock Essence')?.minPriceRon).toFixed(2) || "Not sale"},
                  {minpriceUsd: Number(dataEssence.find(item => item.name === 'Lv 8 Agricultural Livestock Essence')?.minPriceUsd).toFixed(2) || "Not sale"},
                ]},
                {'Lv 8 Agricultural Planting Essence':[
                  {quantity: 1},
                  {img: "https://icons.lumiterra.net/item-icon-609.png"},
                  {minpriceRon: Number(dataEssence.find(item => item.name === 'Lv 8 Agricultural Planting Essence')?.minPriceRon).toFixed(2) || "Not sale"},
                  {minpriceUsd: Number(dataEssence.find(item => item.name === 'Lv 8 Agricultural Planting Essence')?.minPriceUsd).toFixed(2) || "Not sale"},
                ]},
                {'Lv 7 Gather Essence':[
                  {quantity: 2},
                  {img: "https://icons.lumiterra.net/item-icon-605.png"},
                  {minpriceRon: Number(dataEssence.find(item => item.name === 'Lv 7 Gather Essence')?.minPriceRon).toFixed(2) * 2 || "Not sale"},
                  {minpriceUsd: Number(dataEssence.find(item => item.name === 'Lv 7 Gather Essence')?.minPriceUsd).toFixed(2) * 2 || "Not sale"},
                ]},
              ]},
              {minPrinceTotalRecipeRon: Number((dataEssence.find(item => item.name === 'Lv 8 Agricultural Livestock Essence')?.minPriceRon) + (dataEssence.find(item => item.name === 'Lv 8 Agricultural Planting Essence')?.minPriceRon) + (dataEssence.find(item => item.name === 'Lv 7 Gather Essence')?.minPriceRon)*2).toFixed(2)|| "Not sale"},
              {minPrinceTotalRecipeUsd: Number(((dataEssence.find(item => item.name === 'Lv 8 Agricultural Livestock Essence')?.minPriceRon) + (dataEssence.find(item => item.name === 'Lv 8 Agricultural Planting Essence')?.minPriceRon) + (dataEssence.find(item => item.name === 'Lv 7 Gather Essence')?.minPriceRon)*2) * exchangeRate).toFixed(2)|| "Not sale"}
            ]},
            {attributes:[
              {Combatatt: "607-689"},
              {Combatcritrate: "0.00%-0.00%"},
              {Grassatt: "20-25"}
            ]}
          ]},
          {'Bronze Sword': [
            {minpriceRon: Number(dataCombatWeapons.data.BronzeSword.results.find(item => item.name === 'Bronze Sword')?.minPrice / 1000000000000000000).toFixed(2) || "Not sale"},
            {minpriceUsd: Number((dataCombatWeapons.data.BronzeSword.results.find(item => item.name === 'Bronze Sword')?.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) || "Not sale"},
            {img: "https://icons.lumiterra.net/item-icon-575.png"},
            {'require level': 9},
            {recipe:[
              {materials:[
                {'Lv 9 Agricultural Livestock Essence':[
                  {quantity: 1},
                  {img: "https://icons.lumiterra.net/item-icon-613.png"},
                  {minpriceRon: Number(dataEssence.find(item => item.name === 'Lv 9 Agricultural Livestock Essence')?.minPriceRon).toFixed(2) || "Not sale"},
                  {minpriceUsd: Number(dataEssence.find(item => item.name === 'Lv 9 Agricultural Livestock Essence')?.minPriceUsd).toFixed(2) || "Not sale"},
                ]},
                {'Lv 8 Agricultural Planting Essence':[
                  {quantity: 1},
                  {img: "https://icons.lumiterra.net/item-icon-610.png"},
                  {minpriceRon: Number(dataEssence.find(item => item.name === 'Lv 9 Agricultural Planting Essence')?.minPriceRon).toFixed(2) || "Not sale"},
                  {minpriceUsd: Number(dataEssence.find(item => item.name === 'Lv 9 Agricultural Planting Essence')?.minPriceUsd).toFixed(2) || "Not sale"},
                ]},
                {'Lv 8 Gather Essence':[
                  {quantity: 2},
                  {img: "https://icons.lumiterra.net/item-icon-606.png"},
                  {minpriceRon: Number(dataEssence.find(item => item.name === 'Lv 8 Gather Essence')?.minPriceRon).toFixed(2) * 2 || "Not sale"},
                  {minpriceUsd: Number(dataEssence.find(item => item.name === 'Lv 8 Gather Essence')?.minPriceUsd).toFixed(2) * 2 || "Not sale"},
                ]},
              ]},
              {minPrinceTotalRecipeRon: Number((dataEssence.find(item => item.name === 'Lv 9 Agricultural Livestock Essence')?.minPriceRon) + (dataEssence.find(item => item.name === 'Lv 9 Agricultural Planting Essence')?.minPriceRon) + (dataEssence.find(item => item.name === 'Lv 8 Gather Essence')?.minPriceRon)*2).toFixed(2)|| "Not sale"},
              {minPrinceTotalRecipeUsd: Number(((dataEssence.find(item => item.name === 'Lv 9 Agricultural Livestock Essence')?.minPriceRon) + (dataEssence.find(item => item.name === 'Lv 9 Agricultural Planting Essence')?.minPriceRon) + (dataEssence.find(item => item.name === 'Lv 8 Gather Essence')?.minPriceRon)*2) * exchangeRate).toFixed(2)|| "Not sale"}
            ]},
            {attributes:[
              {Combatatt: "688-753"},
              {Combatcritrate: "0.00%-0.00%"},
              {Grassatt: "20-25"}
            ]}
          ]},
          {'Stone Bow': [
            {minpriceRon: dataCombatWeapons.data.StoneBow.results.find(item => item.name === 'Stone Bow')?.minPrice / 1000000000000000000 || "Not sale"},
            {minpriceUsd: Number((dataCombatWeapons.data.StoneBow.results.find(item => item.name === 'Stone Bow')?.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) || "Not sale"},
            {img: "https://icons.lumiterra.net/item-icon-287.png"},
            {'require level': 1},
            {recipe:[
              {materials:[
                {'Lv 1 Agricultural Livestock Essence':[
                  {quantity: 1},
                  {img: "https://icons.lumiterra.net/item-icon-213.png"},
                  {minpriceRon: dataEssence.find(item => item.name === 'Lv 1 Agricultural Livestock Essence')?.minPriceRon || "Not sale"},
                  {minpriceUsd: Number(dataEssence.find(item => item.name === 'Lv 1 Agricultural Livestock Essence')?.minPriceUsd) || "Not sale"},
                ]},
                {'Lv 1 Agricultural Planting Essence':[
                  {quantity: 1},
                  {img: "https://icons.lumiterra.net/item-icon-210.png"},
                  {minpriceRon: dataEssence.find(item => item.name === 'Lv 1 Agricultural Planting Essence')?.minPriceRon || "Not sale"},
                  {minpriceUsd: Number(dataEssence.find(item => item.name === 'Lv 1 Agricultural Planting Essence')?.minPriceUsd) || "Not sale"},
                ]},
              ]},
              {minPrinceTotalRecipeRon: Number((dataEssence.find(item => item.name === 'Lv 1 Agricultural Livestock Essence')?.minPriceRon) + (dataEssence.find(item => item.name === 'Lv 1 Agricultural Planting Essence')?.minPriceRon)).toFixed(2) || "Not sale"},
              {minPrinceTotalRecipeUsd: Number(((dataEssence.find(item => item.name === 'Lv 1 Agricultural Livestock Essence')?.minPriceRon) + (dataEssence.find(item => item.name === 'Lv 1 Agricultural Planting Essence')?.minPriceRon))* exchangeRate).toFixed(2) || "Not sale"}
            ]},
            {attributes:[
              {Combatatt: "40-122"},
              {Combathit: "0-0"}
            ]}
          ]},
          {'Metal Bow': [
            {minpriceRon: Number(dataCombatWeapons.data.MetalBow.results.find(item => item.name === 'Metal Bow')?.minPrice / 1000000000000000000).toFixed(2) || "Not sale"},
            {minpriceUsd: Number((dataCombatWeapons.data.MetalBow.results.find(item => item.name === 'Metal Bow')?.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) || "Not sale"},
            {img: "https://icons.lumiterra.net/item-icon-288.png"},
            {'require level': 2},
            {recipe:[
              {materials:[
                {'Lv 2 Agricultural Livestock Essence':[
                  {quantity: 1},
                  {img: "https://icons.lumiterra.net/item-icon-214.png"},
                  {minpriceRon: Number(dataEssence.find(item => item.name === 'Lv 2 Agricultural Livestock Essence')?.minPriceRon).toFixed(2) || "Not sale"},
                  {minpriceUsd: Number(dataEssence.find(item => item.name === 'Lv 2 Agricultural Livestock Essence')?.minPriceUsd).toFixed(2) || "Not sale"},
                ]},
                {'Lv 2 Agricultural Planting Essence':[
                  {quantity: 1},
                  {img: "https://icons.lumiterra.net/item-icon-211.png"},
                  {minpriceRon: Number(dataEssence.find(item => item.name === 'Lv 2 Agricultural Planting Essence')?.minPriceRon).toFixed(2) || "Not sale"},
                  {minpriceUsd: Number(dataEssence.find(item => item.name === 'Lv 2 Agricultural Planting Essence')?.minPriceUsd).toFixed(2) || "Not sale"},
                ]},
                {'Lv 1 Gather Essence':[
                  {quantity: 2},
                  {img: "https://icons.lumiterra.net/item-icon-207.png"},
                  {minpriceRon: Number(dataEssence.find(item => item.name === 'Lv 1 Gather Essence')?.minPriceRon).toFixed(2) * 2 || "Not sale"},
                  {minpriceUsd: Number(dataEssence.find(item => item.name === 'Lv 1 Gather Essence')?.minPriceUsd).toFixed(2) * 2 || "Not sale"},
                ]},
              ]},
              {minPrinceTotalRecipeRon: Number((dataEssence.find(item => item.name === 'Lv 2 Agricultural Livestock Essence')?.minPriceRon) + (dataEssence.find(item => item.name === 'Lv 2 Agricultural Planting Essence')?.minPriceRon) + (dataEssence.find(item => item.name === 'Lv 1 Gather Essence')?.minPriceRon)*2).toFixed(2)|| "Not sale"},
              {minPrinceTotalRecipeUsd: Number(((dataEssence.find(item => item.name === 'Lv 2 Agricultural Livestock Essence')?.minPriceRon) + (dataEssence.find(item => item.name === 'Lv 2 Agricultural Planting Essence')?.minPriceRon) + (dataEssence.find(item => item.name === 'Lv 1 Gather Essence')?.minPriceRon)*2) * exchangeRate).toFixed(2)|| "Not sale"}
            ]},
            {attributes:[
              {Combatatt: "121-203"},
              {Combathit: "0-5"}
            ]}
          ]},
          {'Crystal Bow': [
            {minpriceRon: Number(dataCombatWeapons.data.CrystalBow.results.find(item => item.name === 'Crystal Bow')?.minPrice / 1000000000000000000).toFixed(2) || "Not sale"},
            {minpriceUsd: Number((dataCombatWeapons.data.CrystalBow.results.find(item => item.name === 'Crystal Bow')?.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) || "Not sale"},
            {img: "https://icons.lumiterra.net/item-icon-289.png"},
            {'require level': 3},
            {recipe:[
              {materials:[
                {'Lv 3 Agricultural Livestock Essence':[
                  {quantity: 1},
                  {img: "https://icons.lumiterra.net/item-icon-215.png"},
                  {minpriceRon: Number(dataEssence.find(item => item.name === 'Lv 3 Agricultural Livestock Essence')?.minPriceRon).toFixed(2) || "Not sale"},
                  {minpriceUsd: Number(dataEssence.find(item => item.name === 'Lv 3 Agricultural Livestock Essence')?.minPriceUsd).toFixed(2) || "Not sale"},
                ]},
                {'Lv 3 Agricultural Planting Essence':[
                  {quantity: 1},
                  {img: "https://icons.lumiterra.net/item-icon-212.png"},
                  {minpriceRon: Number(dataEssence.find(item => item.name === 'Lv 3 Agricultural Planting Essence')?.minPriceRon).toFixed(2) || "Not sale"},
                  {minpriceUsd: Number(dataEssence.find(item => item.name === 'Lv 3 Agricultural Planting Essence')?.minPriceUsd).toFixed(2) || "Not sale"},
                ]},
                {'Lv 2 Gather Essence':[
                  {quantity: 2},
                  {img: "https://icons.lumiterra.net/item-icon-208.png"},
                  {minpriceRon: Number(dataEssence.find(item => item.name === 'Lv 2 Gather Essence')?.minPriceRon).toFixed(2) * 2 || "Not sale"},
                  {minpriceUsd: Number(dataEssence.find(item => item.name === 'Lv 2 Gather Essence')?.minPriceUsd).toFixed(2) * 2 || "Not sale"},
                ]},
              ]},
              {minPrinceTotalRecipeRon: Number((dataEssence.find(item => item.name === 'Lv 3 Agricultural Livestock Essence')?.minPriceRon) + (dataEssence.find(item => item.name === 'Lv 3 Agricultural Planting Essence')?.minPriceRon) + (dataEssence.find(item => item.name === 'Lv 2 Gather Essence')?.minPriceRon)*2).toFixed(2)|| "Not sale"},
              {minPrinceTotalRecipeUsd: Number(((dataEssence.find(item => item.name === 'Lv 3 Agricultural Livestock Essence')?.minPriceRon) + (dataEssence.find(item => item.name === 'Lv 3 Agricultural Planting Essence')?.minPriceRon) + (dataEssence.find(item => item.name === 'Lv 2 Gather Essence')?.minPriceRon)*2) * exchangeRate).toFixed(2)|| "Not sale"}
            ]},
            {attributes:[
              {Combatatt: "202-284"},
              {Combathit: "5-10"}
            ]}
          ]},
          {'Golden Bow': [
            {minpriceRon: Number(dataCombatWeapons.data.GoldenBow.results.find(item => item.name === 'Golden Bow')?.minPrice / 1000000000000000000).toFixed(2) || "Not sale"},
            {minpriceUsd: Number((dataCombatWeapons.data.GoldenBow.results.find(item => item.name === 'Golden Bow')?.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) || "Not sale"},
            {img: "https://icons.lumiterra.net/item-icon-450.png"},
            {'require level': 4},
            {recipe:[
              {materials:[
                {'Lv 4 Agricultural Livestock Essence':[
                  {quantity: 1},
                  {img: "https://icons.lumiterra.net/item-icon-410.png"},
                  {minpriceRon: Number(dataEssence.find(item => item.name === 'Lv 4 Agricultural Livestock Essence')?.minPriceRon).toFixed(2) || "Not sale"},
                  {minpriceUsd: Number(dataEssence.find(item => item.name === 'Lv 4 Agricultural Livestock Essence')?.minPriceUsd).toFixed(2) || "Not sale"},
                ]},
                {'Lv 4 Agricultural Planting Essence':[
                  {quantity: 1},
                  {img: "https://icons.lumiterra.net/item-icon-407.png"},
                  {minpriceRon: Number(dataEssence.find(item => item.name === 'Lv 4 Agricultural Planting Essence')?.minPriceRon).toFixed(2) || "Not sale"},
                  {minpriceUsd: Number(dataEssence.find(item => item.name === 'Lv 4 Agricultural Planting Essence')?.minPriceUsd).toFixed(2) || "Not sale"},
                ]},
                {'Lv 3 Gather Essence':[
                  {quantity: 2},
                  {img: "https://icons.lumiterra.net/item-icon-209.png"},
                  {minpriceRon: Number(dataEssence.find(item => item.name === 'Lv 3 Gather Essence')?.minPriceRon).toFixed(2) * 2 || "Not sale"},
                  {minpriceUsd: Number(dataEssence.find(item => item.name === 'Lv 3 Gather Essence')?.minPriceUsd).toFixed(2) * 2 || "Not sale"},
                ]},
              ]},
              {minPrinceTotalRecipeRon: Number((dataEssence.find(item => item.name === 'Lv 4 Agricultural Livestock Essence')?.minPriceRon) + (dataEssence.find(item => item.name === 'Lv 4 Agricultural Planting Essence')?.minPriceRon) + (dataEssence.find(item => item.name === 'Lv 3 Gather Essence')?.minPriceRon)*2).toFixed(2)|| "Not sale"},
              {minPrinceTotalRecipeUsd: Number(((dataEssence.find(item => item.name === 'Lv 4 Agricultural Livestock Essence')?.minPriceRon) + (dataEssence.find(item => item.name === 'Lv 4 Agricultural Planting Essence')?.minPriceRon) + (dataEssence.find(item => item.name === 'Lv 3 Gather Essence')?.minPriceRon)*2) * exchangeRate).toFixed(2)|| "Not sale"}
            ]},
            {attributes:[
              {Combatatt: "283-365"},
              {Combathit: "10-15"}
            ]}
          ]},
          {'Diamond Bow': [
            {minpriceRon: Number(dataCombatWeapons.data.DiamondBow.results.find(item => item.name === 'Diamond Bow')?.minPrice / 1000000000000000000).toFixed(2) || "Not sale"},
            {minpriceUsd: Number((dataCombatWeapons.data.DiamondBow.results.find(item => item.name === 'Diamond Bow')?.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) || "Not sale"},
            {img: "https://icons.lumiterra.net/item-icon-451.png"},
            {'require level': 5},
            {recipe:[
              {materials:[
                {'Lv 5 Agricultural Livestock Essence':[
                  {quantity: 1},
                  {img: "https://icons.lumiterra.net/item-icon-411.png"},
                  {minpriceRon: Number(dataEssence.find(item => item.name === 'Lv 5 Agricultural Livestock Essence')?.minPriceRon).toFixed(2) || "Not sale"},
                  {minpriceUsd: Number(dataEssence.find(item => item.name === 'Lv 5 Agricultural Livestock Essence')?.minPriceUsd).toFixed(2) || "Not sale"},
                ]},
                {'Lv 5 Agricultural Planting Essence':[
                  {quantity: 1},
                  {img: "https://icons.lumiterra.net/item-icon-408.png"},
                  {minpriceRon: Number(dataEssence.find(item => item.name === 'Lv 5 Agricultural Planting Essence')?.minPriceRon).toFixed(2) || "Not sale"},
                  {minpriceUsd: Number(dataEssence.find(item => item.name === 'Lv 5 Agricultural Planting Essence')?.minPriceUsd).toFixed(2) || "Not sale"},
                ]},
                {'Lv 4 Gather Essence':[
                  {quantity: 2},
                  {img: "https://icons.lumiterra.net/item-icon-404.png"},
                  {minpriceRon: Number(dataEssence.find(item => item.name === 'Lv 4 Gather Essence')?.minPriceRon).toFixed(2) * 2 || "Not sale"},
                  {minpriceUsd: Number(dataEssence.find(item => item.name === 'Lv 4 Gather Essence')?.minPriceUsd).toFixed(2) * 2 || "Not sale"},
                ]},
              ]},
              {minPrinceTotalRecipeRon: Number((dataEssence.find(item => item.name === 'Lv 5 Agricultural Livestock Essence')?.minPriceRon) + (dataEssence.find(item => item.name === 'Lv 5 Agricultural Planting Essence')?.minPriceRon) + (dataEssence.find(item => item.name === 'Lv 4 Gather Essence')?.minPriceRon)*2).toFixed(2)|| "Not sale"},
              {minPrinceTotalRecipeUsd: Number(((dataEssence.find(item => item.name === 'Lv 5 Agricultural Livestock Essence')?.minPriceRon) + (dataEssence.find(item => item.name === 'Lv 5 Agricultural Planting Essence')?.minPriceRon) + (dataEssence.find(item => item.name === 'Lv 4 Gather Essence')?.minPriceRon)*2) * exchangeRate).toFixed(2)|| "Not sale"}
            ]},
            {attributes:[
              {Combatatt: "364-446"},
              {Combathit: "15-20"}
            ]}
          ]},
          {'Starlight Bow': [
            {minpriceRon: Number(dataCombatWeapons.data.StarlightBow.results.find(item => item.name === 'Starlight Bow')?.minPrice / 1000000000000000000).toFixed(2) || "Not sale"},
            {minpriceUsd: Number((dataCombatWeapons.data.StarlightBow.results.find(item => item.name === 'Starlight Bow')?.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) || "Not sale"},
            {img: "https://icons.lumiterra.net/item-icon-452.png"},
            {'require level': 6},
            {recipe:[
              {materials:[
                {'Lv 6 Agricultural Livestock Essence':[
                  {quantity: 1},
                  {img: "https://icons.lumiterra.net/item-icon-412.png"},
                  {minpriceRon: Number(dataEssence.find(item => item.name === 'Lv 6 Agricultural Livestock Essence')?.minPriceRon).toFixed(2) || "Not sale"},
                  {minpriceUsd: Number(dataEssence.find(item => item.name === 'Lv 6 Agricultural Livestock Essence')?.minPriceUsd).toFixed(2) || "Not sale"},
                ]},
                {'Lv 6 Agricultural Planting Essence':[
                  {quantity: 1},
                  {img: "https://icons.lumiterra.net/item-icon-409.png"},
                  {minpriceRon: Number(dataEssence.find(item => item.name === 'Lv 6 Agricultural Planting Essence')?.minPriceRon).toFixed(2) || "Not sale"},
                  {minpriceUsd: Number(dataEssence.find(item => item.name === 'Lv 6 Agricultural Planting Essence')?.minPriceUsd).toFixed(2) || "Not sale"},
                ]},
                {'Lv 5 Gather Essence':[
                  {quantity: 2},
                  {img: "https://icons.lumiterra.net/item-icon-405.png"},
                  {minpriceRon: Number(dataEssence.find(item => item.name === 'Lv 5 Gather Essence')?.minPriceRon).toFixed(2) * 2 || "Not sale"},
                  {minpriceUsd: Number(dataEssence.find(item => item.name === 'Lv 5 Gather Essence')?.minPriceUsd).toFixed(2) * 2 || "Not sale"},
                ]},
              ]},
              {minPrinceTotalRecipeRon: Number((dataEssence.find(item => item.name === 'Lv 6 Agricultural Livestock Essence')?.minPriceRon) + (dataEssence.find(item => item.name === 'Lv 6 Agricultural Planting Essence')?.minPriceRon) + (dataEssence.find(item => item.name === 'Lv 5 Gather Essence')?.minPriceRon)*2).toFixed(2)|| "Not sale"},
              {minPrinceTotalRecipeUsd: Number(((dataEssence.find(item => item.name === 'Lv 6 Agricultural Livestock Essence')?.minPriceRon) + (dataEssence.find(item => item.name === 'Lv 6 Agricultural Planting Essence')?.minPriceRon) + (dataEssence.find(item => item.name === 'Lv 5 Gather Essence')?.minPriceRon)*2) * exchangeRate).toFixed(2)|| "Not sale"}
            ]},
            {attributes:[
              {Combatatt: "445-527"},
              {Combathit: "20-25"}
            ]}
          ]},
          {'Lava Bow': [
            {minpriceRon: Number(dataCombatWeapons.data.LavaBow.results.find(item => item.name === 'Lava Bow')?.minPrice / 1000000000000000000).toFixed(2) || "Not sale"},
            {minpriceUsd: Number((dataCombatWeapons.data.LavaBow.results.find(item => item.name === 'Lava Bow')?.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) || "Not sale"},
            {img: "https://icons.lumiterra.net/item-icon-529.png"},
            {'require level': 7},
            {recipe:[
              {materials:[
                {'Lv 7 Agricultural Livestock Essence':[
                  {quantity: 1},
                  {img: "https://icons.lumiterra.net/item-icon-611.png"},
                  {minpriceRon: Number(dataEssence.find(item => item.name === 'Lv 7 Agricultural Livestock Essence')?.minPriceRon).toFixed(2) || "Not sale"},
                  {minpriceUsd: Number(dataEssence.find(item => item.name === 'Lv 7 Agricultural Livestock Essence')?.minPriceUsd).toFixed(2) || "Not sale"},
                ]},
                {'Lv 7 Agricultural Planting Essence':[
                  {quantity: 1},
                  {img: "https://icons.lumiterra.net/item-icon-608.png"},
                  {minpriceRon: Number(dataEssence.find(item => item.name === 'Lv 7 Agricultural Planting Essence')?.minPriceRon).toFixed(2) || "Not sale"},
                  {minpriceUsd: Number(dataEssence.find(item => item.name === 'Lv 7 Agricultural Planting Essence')?.minPriceUsd).toFixed(2) || "Not sale"},
                ]},
                {'Lv 6 Gather Essence':[
                  {quantity: 2},
                  {img: "https://icons.lumiterra.net/item-icon-406.png"},
                  {minpriceRon: Number(dataEssence.find(item => item.name === 'Lv 6 Gather Essence')?.minPriceRon).toFixed(2) * 2 || "Not sale"},
                  {minpriceUsd: Number(dataEssence.find(item => item.name === 'Lv 6 Gather Essence')?.minPriceUsd).toFixed(2) * 2 || "Not sale"},
                ]},
              ]},
              {minPrinceTotalRecipeRon: Number((dataEssence.find(item => item.name === 'Lv 7 Agricultural Livestock Essence')?.minPriceRon) + (dataEssence.find(item => item.name === 'Lv 7 Agricultural Planting Essence')?.minPriceRon) + (dataEssence.find(item => item.name === 'Lv 6 Gather Essence')?.minPriceRon)*2).toFixed(2)|| "Not sale"},
              {minPrinceTotalRecipeUsd: Number(((dataEssence.find(item => item.name === 'Lv 7 Agricultural Livestock Essence')?.minPriceRon) + (dataEssence.find(item => item.name === 'Lv 7 Agricultural Planting Essence')?.minPriceRon) + (dataEssence.find(item => item.name === 'Lv 6 Gather Essence')?.minPriceRon)*2) * exchangeRate).toFixed(2)|| "Not sale"}
            ]},
            {attributes:[
              {Combatatt: "526-608"},
              {Combathit: "25-30"}
            ]}
          ]},
          {'Hollow Bow': [
            {minpriceRon: Number(dataCombatWeapons.data.HollowBow.results.find(item => item.name === 'Hollow Bow')?.minPrice / 1000000000000000000).toFixed(2) || "Not sale"},
            {minpriceUsd: Number((dataCombatWeapons.data.HollowBow.results.find(item => item.name === 'Hollow Bow')?.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) || "Not sale"},
            {img: "https://icons.lumiterra.net/item-icon-553.png"},
            {'require level': 8},
            {recipe:[
              {materials:[
                {'Lv 8 Agricultural Livestock Essence':[
                  {quantity: 1},
                  {img: "https://icons.lumiterra.net/item-icon-612.png"},
                  {minpriceRon: Number(dataEssence.find(item => item.name === 'Lv 8 Agricultural Livestock Essence')?.minPriceRon).toFixed(2) || "Not sale"},
                  {minpriceUsd: Number(dataEssence.find(item => item.name === 'Lv 8 Agricultural Livestock Essence')?.minPriceUsd).toFixed(2) || "Not sale"},
                ]},
                {'Lv 8 Agricultural Planting Essence':[
                  {quantity: 1},
                  {img: "https://icons.lumiterra.net/item-icon-609.png"},
                  {minpriceRon: Number(dataEssence.find(item => item.name === 'Lv 8 Agricultural Planting Essence')?.minPriceRon).toFixed(2) || "Not sale"},
                  {minpriceUsd: Number(dataEssence.find(item => item.name === 'Lv 8 Agricultural Planting Essence')?.minPriceUsd).toFixed(2) || "Not sale"},
                ]},
                {'Lv 7 Gather Essence':[
                  {quantity: 2},
                  {img: "https://icons.lumiterra.net/item-icon-605.png"},
                  {minpriceRon: Number(dataEssence.find(item => item.name === 'Lv 7 Gather Essence')?.minPriceRon).toFixed(2) * 2 || "Not sale"},
                  {minpriceUsd: Number(dataEssence.find(item => item.name === 'Lv 7 Gather Essence')?.minPriceUsd).toFixed(2) * 2 || "Not sale"},
                ]},
              ]},
              {minPrinceTotalRecipeRon: Number((dataEssence.find(item => item.name === 'Lv 8 Agricultural Livestock Essence')?.minPriceRon) + (dataEssence.find(item => item.name === 'Lv 8 Agricultural Planting Essence')?.minPriceRon) + (dataEssence.find(item => item.name === 'Lv 7 Gather Essence')?.minPriceRon)*2).toFixed(2)|| "Not sale"},
              {minPrinceTotalRecipeUsd: Number(((dataEssence.find(item => item.name === 'Lv 8 Agricultural Livestock Essence')?.minPriceRon) + (dataEssence.find(item => item.name === 'Lv 8 Agricultural Planting Essence')?.minPriceRon) + (dataEssence.find(item => item.name === 'Lv 7 Gather Essence')?.minPriceRon)*2) * exchangeRate).toFixed(2)|| "Not sale"}
            ]},
            {attributes:[
              {Combatatt: "607-689"},
              {Combathit: "30-35"}
            ]}
          ]},
          {'Bronze Bow': [
            {minpriceRon: Number(dataCombatWeapons.data.BronzeBow.results.find(item => item.name === 'Bronze Bow')?.minPrice / 1000000000000000000).toFixed(2) || "Not sale"},
            {minpriceUsd: Number((dataCombatWeapons.data.BronzeBow.results.find(item => item.name === 'Bronze Bow')?.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) || "Not sale"},
            {img: "https://icons.lumiterra.net/item-icon-577.png"},
            {'require level': 9},
            {recipe:[
              {materials:[
                {'Lv 9 Agricultural Livestock Essence':[
                  {quantity: 1},
                  {img: "https://icons.lumiterra.net/item-icon-613.png"},
                  {minpriceRon: Number(dataEssence.find(item => item.name === 'Lv 9 Agricultural Livestock Essence')?.minPriceRon).toFixed(2) || "Not sale"},
                  {minpriceUsd: Number(dataEssence.find(item => item.name === 'Lv 9 Agricultural Livestock Essence')?.minPriceUsd).toFixed(2) || "Not sale"},
                ]},
                {'Lv 8 Agricultural Planting Essence':[
                  {quantity: 1},
                  {img: "https://icons.lumiterra.net/item-icon-610.png"},
                  {minpriceRon: Number(dataEssence.find(item => item.name === 'Lv 9 Agricultural Planting Essence')?.minPriceRon).toFixed(2) || "Not sale"},
                  {minpriceUsd: Number(dataEssence.find(item => item.name === 'Lv 9 Agricultural Planting Essence')?.minPriceUsd).toFixed(2) || "Not sale"},
                ]},
                {'Lv 8 Gather Essence':[
                  {quantity: 2},
                  {img: "https://icons.lumiterra.net/item-icon-606.png"},
                  {minpriceRon: Number(dataEssence.find(item => item.name === 'Lv 8 Gather Essence')?.minPriceRon).toFixed(2) * 2 || "Not sale"},
                  {minpriceUsd: Number(dataEssence.find(item => item.name === 'Lv 8 Gather Essence')?.minPriceUsd).toFixed(2) * 2 || "Not sale"},
                ]},
              ]},
              {minPrinceTotalRecipeRon: Number((dataEssence.find(item => item.name === 'Lv 9 Agricultural Livestock Essence')?.minPriceRon) + (dataEssence.find(item => item.name === 'Lv 9 Agricultural Planting Essence')?.minPriceRon) + (dataEssence.find(item => item.name === 'Lv 8 Gather Essence')?.minPriceRon)*2).toFixed(2)|| "Not sale"},
              {minPrinceTotalRecipeUsd: Number(((dataEssence.find(item => item.name === 'Lv 9 Agricultural Livestock Essence')?.minPriceRon) + (dataEssence.find(item => item.name === 'Lv 9 Agricultural Planting Essence')?.minPriceRon) + (dataEssence.find(item => item.name === 'Lv 8 Gather Essence')?.minPriceRon)*2) * exchangeRate).toFixed(2)|| "Not sale"}
            ]},
            {attributes:[
              {Combatatt: "688-770"},
              {Combathit: "35-40"}
            ]}
          ]},
        ]
      },
    ]
    return NextResponse.json(Items);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
