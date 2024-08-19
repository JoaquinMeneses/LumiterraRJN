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

 
    const Items = 
    [
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
          {'Copper Hammer': [
            {minpriceRon: dataCombatWeapons.data.CopperHammer.results.find(item => item.name === 'Copper Hammer')?.minPrice / 1000000000000000000 || "Not sale"},
            {minpriceUsd: Number((dataCombatWeapons.data.CopperHammer.results.find(item => item.name === 'Copper Hammer')?.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) || "Not sale"},
            {img: "https://icons.lumiterra.net/item-icon-441.png"},
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
          {'Iron Hammer': [
            {minpriceRon: Number(dataCombatWeapons.data.IronHammer.results.find(item => item.name === 'Iron Hammer')?.minPrice / 1000000000000000000).toFixed(2) || "Not sale"},
            {minpriceUsd: Number((dataCombatWeapons.data.IronHammer.results.find(item => item.name === 'Iron Hammer')?.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) || "Not sale"},
            {img: "https://icons.lumiterra.net/item-icon-442.png"},
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
          {'Crystal Hammer': [
            {minpriceRon: Number(dataCombatWeapons.data.CrystalHammer.results.find(item => item.name === 'Crystal Hammer')?.minPrice / 1000000000000000000).toFixed(2) || "Not sale"},
            {minpriceUsd: Number((dataCombatWeapons.data.CrystalHammer.results.find(item => item.name === 'Crystal Hammer')?.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) || "Not sale"},
            {img: "https://icons.lumiterra.net/item-icon-443.png"},
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
          {'Golden Hammer': [
            {minpriceRon: Number(dataCombatWeapons.data.GoldenHammer.results.find(item => item.name === 'Golden Hammer')?.minPrice / 1000000000000000000).toFixed(2) || "Not sale"},
            {minpriceUsd: Number((dataCombatWeapons.data.GoldenHammer.results.find(item => item.name === 'Golden Hammer')?.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) || "Not sale"},
            {img: "https://icons.lumiterra.net/item-icon-444.png"},
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
          {'Diamond Hammer': [
            {minpriceRon: Number(dataCombatWeapons.data.DiamondHammer.results.find(item => item.name === 'Diamond Hammer')?.minPrice / 1000000000000000000).toFixed(2) || "Not sale"},
            {minpriceUsd: Number((dataCombatWeapons.data.DiamondHammer.results.find(item => item.name === 'Diamond Hammer')?.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) || "Not sale"},
            {img: "https://icons.lumiterra.net/item-icon-445.png"},
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
          {'Starlight Hammer': [
            {minpriceRon: Number(dataCombatWeapons.data.StarlightHammer.results.find(item => item.name === 'Starlight Hammer')?.minPrice / 1000000000000000000).toFixed(2) || "Not sale"},
            {minpriceUsd: Number((dataCombatWeapons.data.StarlightHammer.results.find(item => item.name === 'Starlight Hammer')?.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) || "Not sale"},
            {img: "https://icons.lumiterra.net/item-icon-446.png"},
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
          {'Lava Hammer': [
            {minpriceRon: Number(dataCombatWeapons.data.LavaHammer.results.find(item => item.name === 'Lava Hammer')?.minPrice / 1000000000000000000).toFixed(2) || "Not sale"},
            {minpriceUsd: Number((dataCombatWeapons.data.LavaHammer.results.find(item => item.name === 'Lava Hammer')?.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) || "Not sale"},
            {img: "https://icons.lumiterra.net/item-icon-528.png"},
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
          {'Hollow Hammer': [
            {minpriceRon: Number(dataCombatWeapons.data.HollowHammer.results.find(item => item.name === 'Hollow Hammer')?.minPrice / 1000000000000000000).toFixed(2) || "Not sale"},
            {minpriceUsd: Number((dataCombatWeapons.data.HollowHammer.results.find(item => item.name === 'Hollow Hammer')?.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) || "Not sale"},
            {img: "https://icons.lumiterra.net/item-icon-552.png"},
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
          {'Bronze Hammer': [
            {minpriceRon: Number(dataCombatWeapons.data.BronzeHammer.results.find(item => item.name === 'Bronze Hammer')?.minPrice / 1000000000000000000).toFixed(2) || "Not sale"},
            {minpriceUsd: Number((dataCombatWeapons.data.BronzeHammer.results.find(item => item.name === 'Bronze Hammer')?.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) || "Not sale"},
            {img: "https://icons.lumiterra.net/item-icon-576.png"},
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
          {'Cracked Crystal Grass Shoes': [
            {minpriceRon: dataCombatWeapons.data.CrackedCrystalGrassShoes.results.find(item => item.name === 'Cracked Crystal Grass Shoes')?.minPrice / 1000000000000000000 || "Not sale"},
            {minpriceUsd: Number((dataCombatWeapons.data.CrackedCrystalGrassShoes.results.find(item => item.name === 'Cracked Crystal Grass Shoes')?.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) || "Not sale"},
            {img: "https://icons.lumiterra.net/item-icon-55.png"},
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
              {Combatdef: "9-27"},
              {Maxhp: "36-110"},
	            {Movespd: "5-10"}
            ]}
          ]},
          {'Crystal Skin Boots': [
            {minpriceRon: Number(dataCombatWeapons.data.CrystalSkinBoots.results.find(item => item.name === 'Crystal Skin Boots')?.minPrice / 1000000000000000000).toFixed(2) || "Not sale"},
            {minpriceUsd: Number((dataCombatWeapons.data.CrystalSkinBoots.results.find(item => item.name === 'Crystal Skin Boots')?.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) || "Not sale"},
            {img: "https://icons.lumiterra.net/item-icon-56.png"},
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
              {Combatdef: "28-46"},
              {Maxhp: "105-179"},
	            {Movespd: "15-20"}
            ]}
          ]},
          {'Crystal Stone Shoes': [
            {minpriceRon: Number(dataCombatWeapons.data.CrystalStoneShoes.results.find(item => item.name === 'Crystal Stone Shoes')?.minPrice / 1000000000000000000).toFixed(2) || "Not sale"},
            {minpriceUsd: Number((dataCombatWeapons.data.CrystalStoneShoes.results.find(item => item.name === 'Crystal Stone Shoes')?.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) || "Not sale"},
            {img: "https://icons.lumiterra.net/item-icon-57.png"},
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
              {Combatdef: "46-64"},
              {Maxhp: "175-249"},
	            {Movespd: "30-35"}
            ]}
          ]},
          {'Golden Fighter Shoes': [
            {minpriceRon: Number(dataCombatWeapons.data.GoldenFighterShoes.results.find(item => item.name === 'Golden Fighter Shoes')?.minPrice / 1000000000000000000).toFixed(2) || "Not sale"},
            {minpriceUsd: Number((dataCombatWeapons.data.GoldenFighterShoes.results.find(item => item.name === 'Golden Fighter Shoes')?.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) || "Not sale"},
            {img: "https://icons.lumiterra.net/item-icon-339.png"},
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
              {Combatdef: "64-82"},
              {Maxhp: "244-318"},
	            {Movespd: "40-64"}
            ]}
          ]},
          {'Diamond Fighter Shoes': [
            {minpriceRon: Number(dataCombatWeapons.data.DiamondFighterShoes.results.find(item => item.name === 'Diamond Fighter Shoes')?.minPrice / 1000000000000000000).toFixed(2) || "Not sale"},
            {minpriceUsd: Number((dataCombatWeapons.data.DiamondFighterShoes.results.find(item => item.name === 'Diamond Fighter Shoes')?.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) || "Not sale"},
            {img: "https://icons.lumiterra.net/item-icon-344.png"},
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
              {Combatdef: "83-97"},
              {Maxhp: "311-385"},
	            {Movespd: "45-65"}
            ]}
          ]},
          {'Star Fighter Shoes': [
            {minpriceRon: Number(dataCombatWeapons.data.StarFighterShoes.results.find(item => item.name === 'Star Fighter Shoes')?.minPrice / 1000000000000000000).toFixed(2) || "Not sale"},
            {minpriceUsd: Number((dataCombatWeapons.data.StarFighterShoes.results.find(item => item.name === 'Star Fighter Shoes')?.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) || "Not sale"},
            {img: "https://icons.lumiterra.net/item-icon-349.png"},
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
              {Combatdef: "101-119"},
              {Maxhp: "380-454"},
	            {Movespd: "50-66"}
            ]}
          ]},
          {'Lava Combat Shoes': [
            {minpriceRon: Number(dataCombatWeapons.data.LavaCombatShoes.results.find(item => item.name === 'Lava Combat Shoes')?.minPrice / 1000000000000000000).toFixed(2) || "Not sale"},
            {minpriceUsd: Number((dataCombatWeapons.data.LavaCombatShoes.results.find(item => item.name === 'Lava Combat Shoes')?.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) || "Not sale"},
            {img: "https://icons.lumiterra.net/item-icon-534.png"},
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
              {Combatdef: "120-138"},
              {Maxhp: "447-521"},
	            {Movespd: "55-67"}
            ]}
          ]},
          {'Hollow Combat Shoes': [
            {minpriceRon: Number(dataCombatWeapons.data.HollowCombatShoes.results.find(item => item.name === 'Hollow Combat Shoes')?.minPrice / 1000000000000000000).toFixed(2) || "Not sale"},
            {minpriceUsd: Number((dataCombatWeapons.data.HollowCombatShoes.results.find(item => item.name === 'Hollow Combat Shoes')?.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) || "Not sale"},
            {img: "https://icons.lumiterra.net/item-icon-558.png"},
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
              {Combatdef: "138-156"},
              {Maxhp: "514-588"},
	            {Movespd: "60-68"}
            ]}
          ]},
          {'Bronze Combat Shoes': [
            {minpriceRon: Number(dataCombatWeapons.data.BronzeCombatShoes.results.find(item => item.name === 'Bronze Combat Shoes')?.minPrice / 1000000000000000000).toFixed(2) || "Not sale"},
            {minpriceUsd: Number((dataCombatWeapons.data.BronzeCombatShoes.results.find(item => item.name === 'Bronze Combat Shoes')?.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) || "Not sale"},
            {img: "https://icons.lumiterra.net/item-icon-582.png"},
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
              {Combatdef: "156-174"},
              {Maxhp: "583-657"},
	            {Movespd: "65-69"}
            ]}
          ]},
          {'Cracked Crystal Bracelet': [
            {minpriceRon: dataCombatWeapons.data.CrackedCrystalBracelet.results.find(item => item.name === 'Cracked Crystal Bracelet')?.minPrice / 1000000000000000000 || "Not sale"},
            {minpriceUsd: Number((dataCombatWeapons.data.CrackedCrystalBracelet.results.find(item => item.name === 'Cracked Crystal Bracelet')?.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) || "Not sale"},
            {img: "https://icons.lumiterra.net/item-icon-52.png"},
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
              {Combatatt: "4-14"},
              {Combatdef: "7-21"},
	            {Maxhp: "27-81"}
            ]}
          ]},
          {'Crystal Skin Glove': [
            {minpriceRon: Number(dataCombatWeapons.data.CrystalSkinGlove.results.find(item => item.name === 'Crystal Skin Glove')?.minPrice / 1000000000000000000).toFixed(2) || "Not sale"},
            {minpriceUsd: Number((dataCombatWeapons.data.CrystalSkinGlove.results.find(item => item.name === 'Crystal Skin Glove')?.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) || "Not sale"},
            {img: "https://icons.lumiterra.net/item-icon-53.png"},
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
              {Combatatt: "13-23"},
              {Combatdef: "21-35"},
	            {Maxhp: "78-132"}
            ]}
          ]},
          {'Crystal Stone Gauntlet': [
            {minpriceRon: Number(dataCombatWeapons.data.CrystalStoneGauntlet.results.find(item => item.name === 'Crystal Stone Gauntlet')?.minPrice / 1000000000000000000).toFixed(2) || "Not sale"},
            {minpriceUsd: Number((dataCombatWeapons.data.CrystalStoneGauntlet.results.find(item => item.name === 'Crystal Stone Gauntlet')?.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) || "Not sale"},
            {img: "https://icons.lumiterra.net/item-icon-54.png"},
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
              {Combatatt: "22-32"},
              {Combatdef: "35-49"},
	            {Maxhp: "128-182"}
            ]}
          ]},
          {'Golden Fighter Glove': [
            {minpriceRon: Number(dataCombatWeapons.data.GoldenFighterGlove.results.find(item => item.name === 'Golden Fighter Glove')?.minPrice / 1000000000000000000).toFixed(2) || "Not sale"},
            {minpriceUsd: Number((dataCombatWeapons.data.GoldenFighterGlove.results.find(item => item.name === 'Golden Fighter Glove')?.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) || "Not sale"},
            {img: "https://icons.lumiterra.net/item-icon-337.png"},
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
              {Combatatt: "48-62"},
              {Combatdef: "179-233"},
	            {Maxhp: "31-41"}
            ]}
          ]},
          {'Diamond Fighter Glove': [
            {minpriceRon: Number(dataCombatWeapons.data.DiamondFighterGlove.results.find(item => item.name === 'Diamond Fighter Glove')?.minPrice / 1000000000000000000).toFixed(2) || "Not sale"},
            {minpriceUsd: Number((dataCombatWeapons.data.DiamondFighterGlove.results.find(item => item.name === 'Diamond Fighter Glove')?.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) || "Not sale"},
            {img: "https://icons.lumiterra.net/item-icon-342.png"},
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
              {Combatatt: "62-76"},
              {Combatdef: "228-282"},
	            {Maxhp: "40-50"}
            ]},
          ]},
          {'Star Fighter Glove': [
            {minpriceRon: Number(dataCombatWeapons.data.StarFighterGlove.results.find(item => item.name === 'Star Fighter Glove')?.minPrice / 1000000000000000000).toFixed(2) || "Not sale"},
            {minpriceUsd: Number((dataCombatWeapons.data.StarFighterGlove.results.find(item => item.name === 'Star Fighter Glove')?.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) || "Not sale"},
            {img: "https://icons.lumiterra.net/item-icon-347.png"},
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
              {Combatatt: "76-90"},
              {Combatdef: "279-333"},
	            {Maxhp: "49-59"}
            ]}
          ]},
          {'Lava Combat Gloves': [
            {minpriceRon: Number(dataCombatWeapons.data.LavaCombatGloves.results.find(item => item.name === 'Lava Combat Gloves')?.minPrice / 1000000000000000000).toFixed(2) || "Not sale"},
            {minpriceUsd: Number((dataCombatWeapons.data.LavaCombatGloves.results.find(item => item.name === 'Lava Combat Gloves')?.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) || "Not sale"},
            {img: "https://icons.lumiterra.net/item-icon-533.png"},
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
              {Combatatt: "90-104"},
              {Combatdef: "329-383"},
	            {Maxhp: "58-68"}
            ]}
          ]},
          {'Hollow Combat Gloves': [
            {minpriceRon: Number(dataCombatWeapons.data.HollowCombatGloves.results.find(item => item.name === 'Hollow Combat Gloves')?.minPrice / 1000000000000000000).toFixed(2) || "Not sale"},
            {minpriceUsd: Number((dataCombatWeapons.data.HollowCombatGloves.results.find(item => item.name === 'Hollow Combat Gloves')?.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) || "Not sale"},
            {img: "https://icons.lumiterra.net/item-icon-557.png"},
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
              {Combatatt: "104-118"},
              {Combatdef: "378-432"},
	            {Maxhp: "67-77"}
            ]}
          ]},
          {'Bronze Combat Gloves': [
            {minpriceRon: Number(dataCombatWeapons.data.BronzeCombatGloves.results.find(item => item.name === 'Bronze Combat Gloves')?.minPrice / 1000000000000000000).toFixed(2) || "Not sale"},
            {minpriceUsd: Number((dataCombatWeapons.data.BronzeCombatGloves.results.find(item => item.name === 'Bronze Combat Gloves')?.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) || "Not sale"},
            {img: "https://icons.lumiterra.net/item-icon-581.png"},
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
              {Combatatt: "118-132"},
              {Combatdef: "429-483"},
	            {Maxhp: "76-86"}
            ]}
          ]},
          {'Chip Head Ring': [
            {minpriceRon: dataCombatWeapons.data.ChipHeadRing.results.find(item => item.name === 'Chip Head Ring')?.minPrice / 1000000000000000000 || "Not sale"},
            {minpriceUsd: Number((dataCombatWeapons.data.ChipHeadRing.results.find(item => item.name === 'Chip Head Ring')?.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) || "Not sale"},
            {img: "https://icons.lumiterra.net/item-icon-43.png"},
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
              {Combatdef: "9-27"},
              {Maxhp: "35-105"},
            ]}
          ]},
          {'Crystal Skin Soft Hat': [
            {minpriceRon: Number(dataCombatWeapons.data.CrystalSkinSoftHat.results.find(item => item.name === 'Crystal Skin Soft Hat')?.minPrice / 1000000000000000000).toFixed(2) || "Not sale"},
            {minpriceUsd: Number((dataCombatWeapons.data.CrystalSkinSoftHat.results.find(item => item.name === 'Crystal Skin Soft Hat')?.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) || "Not sale"},
            {img: "https://icons.lumiterra.net/item-icon-44.png"},
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
              {Combatdef: "28-46"},
              {Maxhp: "101-171"},
            ]}
          ]},
          {'Crystal Stone Helmet': [
            {minpriceRon: Number(dataCombatWeapons.data.CrystalStoneHelmet.results.find(item => item.name === 'Crystal Stone Helmet')?.minPrice / 1000000000000000000).toFixed(2) || "Not sale"},
            {minpriceUsd: Number((dataCombatWeapons.data.CrystalStoneHelmet.results.find(item => item.name === 'Crystal Stone Helmet')?.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) || "Not sale"},
            {img: "https://icons.lumiterra.net/item-icon-45.png"},
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
              {Combatdef: "46-64"},
              {Maxhp: "167-237"},
            ]}
          ]},
          {'Golden Fighter Hat': [
            {minpriceRon: Number(dataCombatWeapons.data.GoldenFighterHat.results.find(item => item.name === 'Golden Fighter Hat')?.minPrice / 1000000000000000000).toFixed(2) || "Not sale"},
            {minpriceUsd: Number((dataCombatWeapons.data.GoldenFighterHat.results.find(item => item.name === 'Golden Fighter Hat')?.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) || "Not sale"},
            {img: "https://icons.lumiterra.net/item-icon-335.png"},
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
              {Combatdef: "64-82"},
              {Maxhp: "233-303"},
            ]}
          ]},
          {'Diamond Fighter Hat': [
            {minpriceRon: Number(dataCombatWeapons.data.DiamondFighterHat.results.find(item => item.name === 'Diamond Fighter Hat')?.minPrice / 1000000000000000000).toFixed(2) || "Not sale"},
            {minpriceUsd: Number((dataCombatWeapons.data.DiamondFighterHat.results.find(item => item.name === 'Diamond Fighter Hat')?.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) || "Not sale"},
            {img: "https://icons.lumiterra.net/item-icon-340.png"},
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
              {Combatdef: "83-101"},
              {Maxhp: "297-367"},
            ]},
          ]},
          {'Star Fighter Hat': [
            {minpriceRon: Number(dataCombatWeapons.data.StarFighterHat.results.find(item => item.name === 'Star Fighter Hat')?.minPrice / 1000000000000000000).toFixed(2) || "Not sale"},
            {minpriceUsd: Number((dataCombatWeapons.data.StarFighterHat.results.find(item => item.name === 'Star Fighter Hat')?.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) || "Not sale"},
            {img: "https://icons.lumiterra.net/item-icon-345.png"},
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
              {Combatdef: "101-119"},
              {Maxhp: "364-434"},
            ]}
          ]},
          {'Lava Combat Hat': [
            {minpriceRon: Number(dataCombatWeapons.data.LavaCombatHat.results.find(item => item.name === 'Lava Combat Hat')?.minPrice / 1000000000000000000).toFixed(2) || "Not sale"},
            {minpriceUsd: Number((dataCombatWeapons.data.LavaCombatHat.results.find(item => item.name === 'Lava Combat Hat')?.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) || "Not sale"},
            {img: "https://icons.lumiterra.net/item-icon-530.png"},
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
              {Combatdef: "120-138"},
              {Maxhp: "428-498"},
            ]}
          ]},
          {'Hollow Combat Hat': [
            {minpriceRon: Number(dataCombatWeapons.data.HollowCombatHat.results.find(item => item.name === 'Hollow Combat Hat')?.minPrice / 1000000000000000000).toFixed(2) || "Not sale"},
            {minpriceUsd: Number((dataCombatWeapons.data.HollowCombatHat.results.find(item => item.name === 'Hollow Combat Hat')?.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) || "Not sale"},
            {img: "https://icons.lumiterra.net/item-icon-554.png"},
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
              {Combatdef: "138-156"},
              {Maxhp: "492-562"},
            ]}
          ]},
          {'Bronze Combat Hat': [
            {minpriceRon: Number(dataCombatWeapons.data.BronzeCombatHat.results.find(item => item.name === 'Bronze Combat Hat')?.minPrice / 1000000000000000000).toFixed(2) || "Not sale"},
            {minpriceUsd: Number((dataCombatWeapons.data.BronzeCombatHat.results.find(item => item.name === 'Bronze Combat Hat')?.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) || "Not sale"},
            {img: "https://icons.lumiterra.net/item-icon-578.png"},
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
              {Combatdef: "156-174"},
              {Maxhp: "558-628"},
            ]}
          ]},
          {'Cracked Crystal Grass Skirt': [
            {minpriceRon: dataCombatWeapons.data.CrackedCrystalGrassSkirt.results.find(item => item.name === 'Cracked Crystal Grass Skirt')?.minPrice / 1000000000000000000 || "Not sale"},
            {minpriceUsd: Number((dataCombatWeapons.data.CrackedCrystalGrassSkirt.results.find(item => item.name === 'Cracked Crystal Grass Skirt')?.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) || "Not sale"},
            {img: "https://icons.lumiterra.net/item-icon-49.png"},
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
              {Combatdef: "8-26"},
              {Maxhp: "36-110"},
            ]}
          ]},
          {'Crystal Skin Pant': [
            {minpriceRon: Number(dataCombatWeapons.data.CrystalSkinPant.results.find(item => item.name === 'Crystal Skin Pant')?.minPrice / 1000000000000000000).toFixed(2) || "Not sale"},
            {minpriceUsd: Number((dataCombatWeapons.data.CrystalSkinPant.results.find(item => item.name === 'Crystal Skin Pant')?.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) || "Not sale"},
            {img: "https://icons.lumiterra.net/item-icon-50.png"},
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
              {Combatdef: "26-44"},
              {Maxhp: "105-179"},
            ]}
          ]},
          {'Crystal Leg Armor': [
            {minpriceRon: Number(dataCombatWeapons.data.CrystalLegArmor.results.find(item => item.name === 'Crystal Leg Armor')?.minPrice / 1000000000000000000).toFixed(2) || "Not sale"},
            {minpriceUsd: Number((dataCombatWeapons.data.CrystalLegArmor.results.find(item => item.name === 'Crystal Leg Armor')?.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) || "Not sale"},
            {img: "https://icons.lumiterra.net/item-icon-51.png"},
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
              {Combatdef: "43-61"},
              {Maxhp: "175-249"},
            ]}
          ]},
          {'Golden Fighter Pants': [
            {minpriceRon: Number(dataCombatWeapons.data.GoldenFighterPants.results.find(item => item.name === 'Golden Fighter Pants')?.minPrice / 1000000000000000000).toFixed(2) || "Not sale"},
            {minpriceUsd: Number((dataCombatWeapons.data.GoldenFighterPants.results.find(item => item.name === 'Golden Fighter Pants')?.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) || "Not sale"},
            {img: "https://icons.lumiterra.net/item-icon-338.png"},
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
              {Combatdef: "61-79"},
              {Maxhp: "244-318"},
            ]}
          ]},
          {'Diamond Fighter Pants': [
            {minpriceRon: Number(dataCombatWeapons.data.DiamondFighterPants.results.find(item => item.name === 'Diamond Fighter Pants')?.minPrice / 1000000000000000000).toFixed(2) || "Not sale"},
            {minpriceUsd: Number((dataCombatWeapons.data.DiamondFighterPants.results.find(item => item.name === 'Diamond Fighter Pants')?.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) || "Not sale"},
            {img: "https://icons.lumiterra.net/item-icon-343.png"},
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
              {Combatdef: "78-96"},
              {Maxhp: "311-385"},
            ]},
          ]},
          {'Star Fighter Pants': [
            {minpriceRon: Number(dataCombatWeapons.data.StarFighterPants.results.find(item => item.name === 'Star Fighter Pants')?.minPrice / 1000000000000000000).toFixed(2) || "Not sale"},
            {minpriceUsd: Number((dataCombatWeapons.data.StarFighterPants.results.find(item => item.name === 'Star Fighter Pants')?.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) || "Not sale"},
            {img: "https://icons.lumiterra.net/item-icon-348.png"},
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
              {Combatdef: "96-114"},
              {Maxhp: "380-454"},
            ]}
          ]},
          {'Lava Combat Pants': [
            {minpriceRon: Number(dataCombatWeapons.data.LavaCombatPants.results.find(item => item.name === 'Lava Combat Pants')?.minPrice / 1000000000000000000).toFixed(2) || "Not sale"},
            {minpriceUsd: Number((dataCombatWeapons.data.LavaCombatPants.results.find(item => item.name === 'Lava Combat Pants')?.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) || "Not sale"},
            {img: "https://icons.lumiterra.net/item-icon-532.png"},
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
              {Combatdef: "113-131"},
              {Maxhp: "447-521"},
            ]}
          ]},
          {'Hollow Combat Pants': [
            {minpriceRon: Number(dataCombatWeapons.data.HollowCombatPants.results.find(item => item.name === 'Hollow Combat Pants')?.minPrice / 1000000000000000000).toFixed(2) || "Not sale"},
            {minpriceUsd: Number((dataCombatWeapons.data.HollowCombatPants.results.find(item => item.name === 'Hollow Combat Pants')?.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) || "Not sale"},
            {img: "https://icons.lumiterra.net/item-icon-556.png"},
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
              {Combatdef: "131-149"},
              {Maxhp: "514-588"},
            ]}
          ]},
          {'Bronze Combat Pants': [
            {minpriceRon: Number(dataCombatWeapons.data.BronzeCombatPants.results.find(item => item.name === 'Bronze Combat Pants')?.minPrice / 1000000000000000000).toFixed(2) || "Not sale"},
            {minpriceUsd: Number((dataCombatWeapons.data.BronzeCombatPants.results.find(item => item.name === 'Bronze Combat Pants')?.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) || "Not sale"},
            {img: "https://icons.lumiterra.net/item-icon-580.png"},
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
              {Combatdef: "148-166"},
              {Maxhp: "583-657"},
            ]}
          ]},
          {'Cracked Crystal Armor': [
            {minpriceRon: dataCombatWeapons.data.CrackedCrystalArmor.results.find(item => item.name === 'Cracked Crystal Armor')?.minPrice / 1000000000000000000 || "Not sale"},
            {minpriceUsd: Number((dataCombatWeapons.data.CrackedCrystalArmor.results.find(item => item.name === 'Cracked Crystal Armor')?.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) || "Not sale"},
            {img: "https://icons.lumiterra.net/item-icon-46.png"},
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
              {Combatdef: "11-33"},
              {Maxhp: "27-81"},
            ]}
          ]},
          {'Crystal Skin Armor': [
            {minpriceRon: Number(dataCombatWeapons.data.CrystalSkinArmor.results.find(item => item.name === 'Crystal Skin Armor')?.minPrice / 1000000000000000000).toFixed(2) || "Not sale"},
            {minpriceUsd: Number((dataCombatWeapons.data.CrystalSkinArmor.results.find(item => item.name === 'Crystal Skin Armor')?.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) || "Not sale"},
            {img: "https://icons.lumiterra.net/item-icon-47.png"},
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
              {Combatdef: "33-55"},
              {Maxhp: "78-132"},
            ]}
          ]},
          {'Crystal Stone Armor': [
            {minpriceRon: Number(dataCombatWeapons.data.CrystalStoneArmor.results.find(item => item.name === 'Crystal Stone Armor')?.minPrice / 1000000000000000000).toFixed(2) || "Not sale"},
            {minpriceUsd: Number((dataCombatWeapons.data.CrystalStoneArmor.results.find(item => item.name === 'Crystal Stone Armor')?.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) || "Not sale"},
            {img: "https://icons.lumiterra.net/item-icon-48.png"},
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
              {Combatdef: "55-77"},
              {Maxhp: "128-182"},
            ]}
          ]},
          {'Golden Fighter Coat': [
            {minpriceRon: Number(dataCombatWeapons.data.GoldenFighterCoat.results.find(item => item.name === 'Golden Fighter Coat')?.minPrice / 1000000000000000000).toFixed(2) || "Not sale"},
            {minpriceUsd: Number((dataCombatWeapons.data.GoldenFighterCoat.results.find(item => item.name === 'Golden Fighter Coat')?.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) || "Not sale"},
            {img: "https://icons.lumiterra.net/item-icon-336.png"},
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
              {Combatdef: "77-99"},
              {Maxhp: "179-233"},
            ]}
          ]},
          {'Diamond Fighter Coat': [
            {minpriceRon: Number(dataCombatWeapons.data.DiamondFighterCoat.results.find(item => item.name === 'Diamond Fighter Coat')?.minPrice / 1000000000000000000).toFixed(2) || "Not sale"},
            {minpriceUsd: Number((dataCombatWeapons.data.DiamondFighterCoat.results.find(item => item.name === 'Diamond Fighter Coat')?.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) || "Not sale"},
            {img: "https://icons.lumiterra.net/item-icon-341.png"},
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
              {Combatdef: "99-121"},
              {Maxhp: "228-282"},
            ]},
          ]},
          {'Star Fighter Coat': [
            {minpriceRon: Number(dataCombatWeapons.data.StarFighterCoat.results.find(item => item.name === 'Star Fighter Coat')?.minPrice / 1000000000000000000).toFixed(2) || "Not sale"},
            {minpriceUsd: Number((dataCombatWeapons.data.StarFighterCoat.results.find(item => item.name === 'Star Fighter Coat')?.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) || "Not sale"},
            {img: "https://icons.lumiterra.net/item-icon-346.png"},
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
              {Combatdef: "121-143"},
              {Maxhp: "279-333"},
            ]}
          ]},
          {'Lava Combat Coat': [
            {minpriceRon: Number(dataCombatWeapons.data.LavaCombatCoat.results.find(item => item.name === 'Lava Combat Coat')?.minPrice / 1000000000000000000).toFixed(2) || "Not sale"},
            {minpriceUsd: Number((dataCombatWeapons.data.LavaCombatCoat.results.find(item => item.name === 'Lava Combat Coat')?.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) || "Not sale"},
            {img: "https://icons.lumiterra.net/item-icon-531.png"},
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
              {Combatdef: "143-165"},
              {Maxhp: "329-383"},
            ]}
          ]},
          {'Hollow Combat Coat': [
            {minpriceRon: Number(dataCombatWeapons.data.HollowCombatCoat.results.find(item => item.name === 'Hollow Combat Coat')?.minPrice / 1000000000000000000).toFixed(2) || "Not sale"},
            {minpriceUsd: Number((dataCombatWeapons.data.HollowCombatCoat.results.find(item => item.name === 'Hollow Combat Coat')?.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) || "Not sale"},
            {img: "https://icons.lumiterra.net/item-icon-555.png"},
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
              {Combatdef: "165-187"},
              {Maxhp: "378-432"},
            ]}
          ]},
          {'Bronze Combat Coat': [
            {minpriceRon: Number(dataCombatWeapons.data.BronzeCombatCoat.results.find(item => item.name === 'Bronze Combat Coat')?.minPrice / 1000000000000000000).toFixed(2) || "Not sale"},
            {minpriceUsd: Number((dataCombatWeapons.data.BronzeCombatCoat.results.find(item => item.name === 'Bronze Combat Coat')?.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) || "Not sale"},
            {img: "https://icons.lumiterra.net/item-icon-579.png"},
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
              {Combatdef: "187-209"},
              {Maxhp: "429-483"},
            ]}
          ]}
        ]}
      ]
    return NextResponse.json(Items);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
