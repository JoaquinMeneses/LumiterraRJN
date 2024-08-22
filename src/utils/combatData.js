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

const Combat = 
        {
        'Stone Sword': createWeaponData('Stone Sword', 1, [
          createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213),
          createMaterial('Lv 1 Agricultural Planting Essence', 1, 210)
        ], {Combatatt: "40-122", Combatcritrate: "0.00%-0.00%", Grassatt: "20-25"}),   
        'Iron Sword': createWeaponData('Iron Sword', 2, [
          createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214),
          createMaterial('Lv 2 Agricultural Planting Essence', 1, 211),
          createMaterial('Lv 1 Gather Essence', 2, 207)
        ], {Combatatt: "121-203", Combatcritrate: "0.00%-0.00%", Grassatt: "20-25"}), 
        'Crystal Sword': createWeaponData('Crystal Sword', 3, [
          createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215),
          createMaterial('Lv 3 Agricultural Planting Essence', 1, 212),
          createMaterial('Lv 2 Gather Essence', 2, 208)
        ], {Combatatt: "202-284", Combatcritrate: "0.00%-0.00%", Grassatt: "20-25"}),
        'Golden Sword': createWeaponData('Golden Sword', 4, [
          createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410),
          createMaterial('Lv 4 Agricultural Planting Essence', 1, 407),
          createMaterial('Lv 3 Gather Essence', 2, 209)
        ], {Combatatt: "283-365", Combatcritrate: "0.00%-0.00%", Grassatt: "20-25"}),
        'Diamond Sword': createWeaponData('Diamond Sword', 5, [
          createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411),
          createMaterial('Lv 5 Agricultural Planting Essence', 1, 408),
          createMaterial('Lv 4 Gather Essence', 2, 404)
        ], {Combatatt: "364-446", Combatcritrate: "0.00%-0.00%", Grassatt: "20-25"}),
        'Star Sword': createWeaponData('Star Sword', 6, [
          createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412),
          createMaterial('Lv 6 Agricultural Planting Essence', 1, 409),
          createMaterial('Lv 5 Gather Essence', 2, 405)
        ], {Combatatt: "445-527", Combatcritrate: "0.00%-0.00%", Grassatt: "20-25"}),
        'Lava Sword': createWeaponData('Lava Sword', 7, [
          createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611),
          createMaterial('Lv 7 Agricultural Planting Essence', 1, 608),
          createMaterial('Lv 6 Gather Essence', 2, 406)
        ], {Combatatt: "526-608", Combatcritrate: "0.00%-0.00%", Grassatt: "20-25"}),
        'Hollow Sword': createWeaponData('Hollow Sword', 8, [
          createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612),
          createMaterial('Lv 8 Agricultural Planting Essence', 1, 609),
          createMaterial('Lv 7 Gather Essence', 2, 406)
        ], {Combatatt: "607-689", Combatcritrate: "0.00%-0.00%", Grassatt: "20-25"}),
        'Bronze Sword': createWeaponData('Bronze Sword', 9, [
          createMaterial('Lv 9 Agricultural Livestock Essence', 1, 613),
          createMaterial('Lv 9 Agricultural Planting Essence', 1, 610),
          createMaterial('Lv 8 Gather Essence', 2, 606)
        ], {Combatatt: "688-753", Combatcritrate: "0.00%-0.00%", Grassatt: "20-25"}),
        'Stone Bow': createWeaponData('Stone Bow', 1, [
          createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213),
          createMaterial('Lv 1 Agricultural Planting Essence', 1, 210)
        ], {Combatatt: "40-122", Combathit: "0-0"}),   
        'Metal Bow': createWeaponData('Metal Bow', 2, [
          createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214),
          createMaterial('Lv 2 Agricultural Planting Essence', 1, 211),
          createMaterial('Lv 1 Gather Essence', 2, 207)
        ], {Combatatt: "121-203", Combathit: "0-5"}), 
        'Crystal Bow': createWeaponData('Crystal Bow', 3, [
          createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215),
          createMaterial('Lv 3 Agricultural Planting Essence', 1, 212),
          createMaterial('Lv 2 Gather Essence', 2, 208)
        ], {Combatatt: "202-284", Combathit: "5-10"}),
        'Golden Bow': createWeaponData('Golden Bow', 4, [
          createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410),
          createMaterial('Lv 4 Agricultural Planting Essence', 1, 407),
          createMaterial('Lv 3 Gather Essence', 2, 209)
        ], {Combatatt: "283-365", Combathit: "10-15"}),
        'Diamond Bow': createWeaponData('Diamond Bow', 5, [
          createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411),
          createMaterial('Lv 5 Agricultural Planting Essence', 1, 408),
          createMaterial('Lv 4 Gather Essence', 2, 404)
        ], {Combatatt: "364-446", Combathit: "15-20"}),
        'Starlight Bow': createWeaponData('Starlight Bow', 6, [
          createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412),
          createMaterial('Lv 6 Agricultural Planting Essence', 1, 409),
          createMaterial('Lv 5 Gather Essence', 2, 405)
        ], {Combatatt: "445-527", Combathit: "20-25"}),
        'Lava Bow': createWeaponData('Lava Bow', 7, [
          createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611),
          createMaterial('Lv 7 Agricultural Planting Essence', 1, 608),
          createMaterial('Lv 6 Gather Essence', 2, 406)
        ], {Combatatt: "526-608", Combathit: "25-30"}),
        'Hollow Bow': createWeaponData('Hollow Bow', 8, [
          createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612),
          createMaterial('Lv 8 Agricultural Planting Essence', 1, 609),
          createMaterial('Lv 7 Gather Essence', 2, 406)
        ], {Combatatt: "607-689", Combathit: "30-35"}),
        'Bronze Bow': createWeaponData('Bronze Bow', 9, [
          createMaterial('Lv 9 Agricultural Livestock Essence', 1, 613),
          createMaterial('Lv 9 Agricultural Planting Essence', 1, 610),
          createMaterial('Lv 8 Gather Essence', 2, 606)
        ], {Combatatt: "688-770", Combathit: "35-40"}),
        'Copper Hammer': createWeaponData('Copper Hammer', 1, [
          createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213),
          createMaterial('Lv 1 Agricultural Planting Essence', 1, 210)
        ], {Combatatt: "40-122", Combathit: "0-0"}),   
        'Iron Hammer': createWeaponData('Iron Hammer', 2, [
          createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214),
          createMaterial('Lv 2 Agricultural Planting Essence', 1, 211),
          createMaterial('Lv 1 Gather Essence', 2, 207)
        ], {Combatatt: "121-203", Combathit: "0-5"}), 
        'Crystal Hammer': createWeaponData('Crystal Hammer', 3, [
          createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215),
          createMaterial('Lv 3 Agricultural Planting Essence', 1, 212),
          createMaterial('Lv 2 Gather Essence', 2, 208)
        ], {Combatatt: "202-284", Combathit: "5-10"}),
        'Golden Hammer': createWeaponData('Golden Hammer', 4, [
          createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410),
          createMaterial('Lv 4 Agricultural Planting Essence', 1, 407),
          createMaterial('Lv 3 Gather Essence', 2, 209)
        ], {Combatatt: "283-365", Combathit: "10-15"}),
        'Diamond Hammer': createWeaponData('Diamond Hammer', 5, [
          createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411),
          createMaterial('Lv 5 Agricultural Planting Essence', 1, 408),
          createMaterial('Lv 4 Gather Essence', 2, 404)
        ], {Combatatt: "364-446", Combathit: "15-20"}),
        'Starlight Hammer': createWeaponData('Starlight Hammer', 6, [
          createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412),
          createMaterial('Lv 6 Agricultural Planting Essence', 1, 409),
          createMaterial('Lv 5 Gather Essence', 2, 405)
        ], {Combatatt: "445-527", Combathit: "20-25"}),
        'Lava Hammer': createWeaponData('Lava Hammer', 7, [
          createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611),
          createMaterial('Lv 7 Agricultural Planting Essence', 1, 608),
          createMaterial('Lv 6 Gather Essence', 2, 406)
        ], {Combatatt: "526-608", Combathit: "25-30"}),
        'Hollow Hammer': createWeaponData('Hollow Hammer', 8, [
          createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612),
          createMaterial('Lv 8 Agricultural Planting Essence', 1, 609),
          createMaterial('Lv 7 Gather Essence', 2, 406)
        ], {Combatatt: "607-689", Combathit: "30-35"}),
        'Bronze Hammer': createWeaponData('Bronze Hammer', 9, [
          createMaterial('Lv 9 Agricultural Livestock Essence', 1, 613),
          createMaterial('Lv 9 Agricultural Planting Essence', 1, 610),
          createMaterial('Lv 8 Gather Essence', 2, 606)
        ], {Combatatt: "688-770", Combathit: "35-40"}),
        'Cracked Crystal Grass Shoes': createWeaponData('Cracked Crystal Grass Shoes', 1, [
          createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213),
          createMaterial('Lv 1 Agricultural Planting Essence', 1, 210)
        ], {Combatdef: "9-27", Maxhp: "36-110", Movespd: "5-10"}),   
        'Crystal Skin Boots': createWeaponData('Crystal Skin Boots', 2, [
          createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214),
          createMaterial('Lv 2 Agricultural Planting Essence', 1, 211),
          createMaterial('Lv 1 Gather Essence', 2, 207)
        ], {Combatdef: "28-46", Maxhp: "105-179", Movespd: "15-20"}), 
        'Crystal Stone Shoes': createWeaponData('Crystal Stone Shoes', 3, [
          createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215),
          createMaterial('Lv 3 Agricultural Planting Essence', 1, 212),
          createMaterial('Lv 2 Gather Essence', 2, 208)
        ], {Combatdef: "46-64", Maxhp: "175-249", Movespd: "30-35"}),
        'Golden Fighter Shoes': createWeaponData('Golden Fighter Shoes', 4, [
          createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410),
          createMaterial('Lv 4 Agricultural Planting Essence', 1, 407),
          createMaterial('Lv 3 Gather Essence', 2, 209)
        ], {Combatdef: "64-82", Maxhp: "244-318", Movespd: "40-64"}),
        'Diamond Fighter Shoes': createWeaponData('Diamond Fighter Shoes', 5, [
          createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411),
          createMaterial('Lv 5 Agricultural Planting Essence', 1, 408),
          createMaterial('Lv 4 Gather Essence', 2, 404)
        ], {Combatdef: "83-97", Maxhp: "311-385", Movespd: "45-65"}),
        'Starlight Fighter Shoes': createWeaponData('Starlight Fighter Shoes', 6, [
          createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412),
          createMaterial('Lv 6 Agricultural Planting Essence', 1, 409),
          createMaterial('Lv 5 Gather Essence', 2, 405)
        ], {Combatdef: "101-119", Maxhp: "380-454", Movespd: "50-66"}),
        'Lava Combat Shoes': createWeaponData('Lava Combat Shoes', 7, [
          createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611),
          createMaterial('Lv 7 Agricultural Planting Essence', 1, 608),
          createMaterial('Lv 6 Gather Essence', 2, 406)
        ], {Combatdef: "120-138", Maxhp: "447-521", Movespd: "55-67"}),
        'Hollow Combat Shoes': createWeaponData('Hollow Combat Shoes', 8, [
          createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612),
          createMaterial('Lv 8 Agricultural Planting Essence', 1, 609),
          createMaterial('Lv 7 Gather Essence', 2, 406)
        ], {Combatdef: "138-156", Maxhp: "514-588", Movespd: "60-68"}),
        'Bronze Combat Shoes': createWeaponData('Bronze Combat Shoes', 9, [
          createMaterial('Lv 9 Agricultural Livestock Essence', 1, 613),
          createMaterial('Lv 9 Agricultural Planting Essence', 1, 610),
          createMaterial('Lv 8 Gather Essence', 2, 606)
        ], {Combatdef: "156-174", Maxhp: "583-657", Movespd: "65-69"}),
        'Cracked Crystal Bracelet': createWeaponData('Cracked Crystal Bracelet', 1, [
          createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213),
          createMaterial('Lv 1 Agricultural Planting Essence', 1, 210)
        ], {Combatatt: "4-14", Combatdef: "7-21", Maxhp: "27-81"}),   
        'Crystal Skin Glove': createWeaponData('Crystal Skin Glove', 2, [
          createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214),
          createMaterial('Lv 2 Agricultural Planting Essence', 1, 211),
          createMaterial('Lv 1 Gather Essence', 2, 207)
        ], {Combatatt: "13-23", Combatdef: "21-35", Maxhp: "78-132"}), 
        'Crystal Stone Gauntlet': createWeaponData('Crystal Stone Gauntlet', 3, [
          createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215),
          createMaterial('Lv 3 Agricultural Planting Essence', 1, 212),
          createMaterial('Lv 2 Gather Essence', 2, 208)
        ], {Combatatt: "22-32", Combatdef: "35-49", Maxhp: "128-182"}),
        'Golden Fighter Glove': createWeaponData('Golden Fighter Glove', 4, [
          createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410),
          createMaterial('Lv 4 Agricultural Planting Essence', 1, 407),
          createMaterial('Lv 3 Gather Essence', 2, 209)
        ], {Combatatt: "48-62", Combatdef: "179-233", Maxhp: "31-41"}),
        'Diamond Fighter Glove': createWeaponData('Diamond Fighter Glove', 5, [
          createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411),
          createMaterial('Lv 5 Agricultural Planting Essence', 1, 408),
          createMaterial('Lv 4 Gather Essence', 2, 404)
        ], {Combatatt: "62-76", Combatdef: "228-282", Maxhp: "40-50"}),
        'Star Fighter Glove': createWeaponData('Starlight Fighter Glove', 6, [
          createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412),
          createMaterial('Lv 6 Agricultural Planting Essence', 1, 409),
          createMaterial('Lv 5 Gather Essence', 2, 405)
        ], {Combatatt: "76-90", Combatdef: "279-333", Maxhp: "49-59"}),
        'Lava Combat Gloves': createWeaponData('Lava Combat Gloves', 7, [
          createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611),
          createMaterial('Lv 7 Agricultural Planting Essence', 1, 608),
          createMaterial('Lv 6 Gather Essence', 2, 406)
        ], {Combatatt: "90-104", Combatdef: "329-383", Maxhp: "58-68"}),
        'Hollow Combat Gloves': createWeaponData('Hollow Combat Gloves', 8, [
          createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612),
          createMaterial('Lv 8 Agricultural Planting Essence', 1, 609),
          createMaterial('Lv 7 Gather Essence', 2, 406)
        ], {Combatatt: "104-118", Combatdef: "378-432", Maxhp: "67-77"}),
        'Bronze Combat Gloves': createWeaponData('Bronze Combat Gloves', 9, [
          createMaterial('Lv 9 Agricultural Livestock Essence', 1, 613),
          createMaterial('Lv 9 Agricultural Planting Essence', 1, 610),
          createMaterial('Lv 8 Gather Essence', 2, 606)
        ], {Combatatt: "118-132", Combatdef: "429-483", Maxhp: "76-86"}),
        'Chip Head Ring': createWeaponData('Chip Head Ring', 1, [
          createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213),
          createMaterial('Lv 1 Agricultural Planting Essence', 1, 210)
        ], {Combatdef: "9-27", Maxhp: "35-105"}),   
        'Crystal Skin Soft Hat': createWeaponData('Crystal Skin Soft Hat', 2, [
          createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214),
          createMaterial('Lv 2 Agricultural Planting Essence', 1, 211),
          createMaterial('Lv 1 Gather Essence', 2, 207)
        ], {Combatdef: "28-46", Maxhp: "101-171"}), 
        'Crystal Stone Helmet': createWeaponData('Crystal Stone Helmet', 3, [
          createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215),
          createMaterial('Lv 3 Agricultural Planting Essence', 1, 212),
          createMaterial('Lv 2 Gather Essence', 2, 208)
        ], {Combatdef: "46-64", Maxhp: "167-237"}),
        'Golden Fighter Hat': createWeaponData('Golden Fighter Hat', 4, [
          createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410),
          createMaterial('Lv 4 Agricultural Planting Essence', 1, 407),
          createMaterial('Lv 3 Gather Essence', 2, 209)
        ], {Combatdef: "64-82", Maxhp: "233-303"}),
        'Diamond Fighter Hat': createWeaponData('Diamond Fighter Hat', 5, [
          createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411),
          createMaterial('Lv 5 Agricultural Planting Essence', 1, 408),
          createMaterial('Lv 4 Gather Essence', 2, 404)
        ], {Combatdef: "83-101", Maxhp: "297-367"}),
        'Star Fighter Hat': createWeaponData('Starlight Fighter Hat', 6, [
          createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412),
          createMaterial('Lv 6 Agricultural Planting Essence', 1, 409),
          createMaterial('Lv 5 Gather Essence', 2, 405)
        ], {Combatdef: "101-119", Maxhp: "364-434"}),
        'Lava Combat Hat': createWeaponData('Lava Combat Hat', 7, [
          createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611),
          createMaterial('Lv 7 Agricultural Planting Essence', 1, 608),
          createMaterial('Lv 6 Gather Essence', 2, 406)
        ], {Combatdef: "120-138", Maxhp: "428-498"}),
        'Hollow Combat Hat': createWeaponData('Hollow Combat Hat', 8, [
          createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612),
          createMaterial('Lv 8 Agricultural Planting Essence', 1, 609),
          createMaterial('Lv 7 Gather Essence', 2, 406)
        ], {Combatdef: "138-156", Maxhp: "492-562"}),
        'Bronze Combat Hat': createWeaponData('Bronze Combat Hat', 9, [
          createMaterial('Lv 9 Agricultural Livestock Essence', 1, 613),
          createMaterial('Lv 9 Agricultural Planting Essence', 1, 610),
          createMaterial('Lv 8 Gather Essence', 2, 606)
        ], {Combatdef: "156-174", Maxhp: "558-628"}),
        'Cracked Crystal Grass Skirt': createWeaponData('Cracked Crystal Grass Skirt', 1, [
          createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213),
          createMaterial('Lv 1 Agricultural Planting Essence', 1, 210)
        ], {Combatdef: "8-26", Maxhp: "36-110"}),   
        'Crystal Skin Pant': createWeaponData('Crystal Skin Pant', 2, [
          createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214),
          createMaterial('Lv 2 Agricultural Planting Essence', 1, 211),
          createMaterial('Lv 1 Gather Essence', 2, 207)
        ], {Combatdef: "26-44", Maxhp: "105-179"}), 
        'Crystal Leg Armor': createWeaponData('Crystal Leg Armor', 3, [
          createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215),
          createMaterial('Lv 3 Agricultural Planting Essence', 1, 212),
          createMaterial('Lv 2 Gather Essence', 2, 208)
        ], {Combatdef: "43-61", Maxhp: "175-249"}),
        'Golden Fighter Pants': createWeaponData('Golden Fighter Pants', 4, [
          createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410),
          createMaterial('Lv 4 Agricultural Planting Essence', 1, 407),
          createMaterial('Lv 3 Gather Essence', 2, 209)
        ], {Combatdef: "61-79", Maxhp: "244-318"}),
        'Diamond Fighter Pants': createWeaponData('Diamond Fighter Pants', 5, [
          createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411),
          createMaterial('Lv 5 Agricultural Planting Essence', 1, 408),
          createMaterial('Lv 4 Gather Essence', 2, 404)
        ], {Combatdef: "78-96", Maxhp: "311-385"}),
        'Star Fighter Pants': createWeaponData('Starlight Fighter Pants', 6, [
          createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412),
          createMaterial('Lv 6 Agricultural Planting Essence', 1, 409),
          createMaterial('Lv 5 Gather Essence', 2, 405)
        ], {Combatdef: "96-114", Maxhp: "380-454"}),
        'Lava Combat Pants': createWeaponData('Lava Combat Pants', 7, [
          createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611),
          createMaterial('Lv 7 Agricultural Planting Essence', 1, 608),
          createMaterial('Lv 6 Gather Essence', 2, 406)
        ], {Combatdef: "113-131", Maxhp: "447-521"}),
        'Hollow Combat Pants': createWeaponData('Hollow Combat Pants', 8, [
          createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612),
          createMaterial('Lv 8 Agricultural Planting Essence', 1, 609),
          createMaterial('Lv 7 Gather Essence', 2, 406)
        ], {Combatdef: "131-149", Maxhp: "514-588"}),
        'Bronze Combat Pants': createWeaponData('Bronze Combat Pants', 9, [
          createMaterial('Lv 9 Agricultural Livestock Essence', 1, 613),
          createMaterial('Lv 9 Agricultural Planting Essence', 1, 610),
          createMaterial('Lv 8 Gather Essence', 2, 606)
        ], {Combatdef: "148-166", Maxhp: "583-657"}),
        'Cracked Crystal Grass Skirt': createWeaponData('Cracked Crystal Grass Skirt', 1, [
          createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213),
          createMaterial('Lv 1 Agricultural Planting Essence', 1, 210)
        ], {Combatdef: "11-33", Maxhp: "27-81"}),   
        'Crystal Skin Armor': createWeaponData('Crystal Skin Armor', 2, [
          createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214),
          createMaterial('Lv 2 Agricultural Planting Essence', 1, 211),
          createMaterial('Lv 1 Gather Essence', 2, 207)
        ], {Combatdef: "33-55", Maxhp: "78-132"}), 
        'Crystal Stone Armor': createWeaponData('Crystal Stone Armor', 3, [
          createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215),
          createMaterial('Lv 3 Agricultural Planting Essence', 1, 212),
          createMaterial('Lv 2 Gather Essence', 2, 208)
        ], {Combatdef: "55-77", Maxhp: "128-182"}),
        'Golden Fighter Coat': createWeaponData('Golden Fighter Coat', 4, [
          createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410),
          createMaterial('Lv 4 Agricultural Planting Essence', 1, 407),
          createMaterial('Lv 3 Gather Essence', 2, 209)
        ], {Combatdef: "77-99", Maxhp: "179-233"}),
        'Diamond Fighter Coat': createWeaponData('Diamond Fighter Coat', 5, [
          createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411),
          createMaterial('Lv 5 Agricultural Planting Essence', 1, 408),
          createMaterial('Lv 4 Gather Essence', 2, 404)
        ], {Combatdef: "99-121", Maxhp: "228-282"}),
        'Star Fighter Coat': createWeaponData('Starlight Fighter Coat', 6, [
          createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412),
          createMaterial('Lv 6 Agricultural Planting Essence', 1, 409),
          createMaterial('Lv 5 Gather Essence', 2, 405)
        ], {Combatdef: "121-143", Maxhp: "279-333"}),
        'Lava Combat Coat': createWeaponData('Lava Combat Coat', 7, [
          createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611),
          createMaterial('Lv 7 Agricultural Planting Essence', 1, 608),
          createMaterial('Lv 6 Gather Essence', 2, 406)
        ], {Combatdef: "143-165", Maxhp: "329-383"}),
        'Hollow Combat Coat': createWeaponData('Hollow Combat Coat', 8, [
          createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612),
          createMaterial('Lv 8 Agricultural Planting Essence', 1, 609),
          createMaterial('Lv 7 Gather Essence', 2, 406)
        ], {Combatdef: "165-187", Maxhp: "378-432"}),
        'Bronze Combat Coat': createWeaponData('Bronze Combat Coat', 9, [
          createMaterial('Lv 9 Agricultural Livestock Essence', 1, 613),
          createMaterial('Lv 9 Agricultural Planting Essence', 1, 610),
          createMaterial('Lv 8 Gather Essence', 2, 606)
        ], {Combatdef: "187-209", Maxhp: "429-483"})
      };

    function getImageCode(name) {
      const nameToCode = {
        'Stone Sword': 40,
        'Iron Sword': 41,
        'Crystal Sword': 42,
        'Golden Sword': 317,
        'Diamond Sword': 318,
        'Star Sword': 319,
        'Lava Sword': 527,
        'Hollow Sword': 551,
        'Bronze Sword': 575,
        'Stone Bow': 287,
        'Metal Bow': 288,
        'Crystal Bow': 289,
        'Golden Bow': 450,
        'Diamond Bow': 451,
        'Starlight Bow': 452,
        'Lava Bow': 529,
        'Hollow Bow': 553,
        'Bronze Bow': 577,
        'Copper Hammer': 441,
        'Iron Hammer': 442,
        'Crystal Hammer': 443,
        'Golden Hammer': 444,
        'Diamond Hammer': 445,
        'Starlight Hammer': 446,
        'Lava Hammer': 528,
        'Hollow Hammer': 552,
        'Bronze Hammer': 576,
        'Cracked Crystal Grass Shoes': 55,
        'Crystal Skin Boots': 56,
        'Crystal Stone Shoes': 57,
        'Golden Fighter Shoes': 339,
        'Diamond Fighter Shoes': 344,
        'Starlight Fighter Shoes': 349,
        'Lava Combat Shoes': 534,
        'Hollow Combat Shoes': 558,
        'Bronze Combat Shoes': 582,
        'Cracked Crystal Bracelet': 52,
        'Crystal Skin Glove': 53,
        'Crystal Stone Gauntlet': 54,
        'Golden Fighter Glove': 337,
        'Diamond Fighter Glove': 342,
        'Star Fighter Glove': 349,
        'Lava Combat Gloves': 533,
        'Hollow Combat Gloves': 557,
        'Bronze Combat Gloves': 581,
        'Chip Head Ring': 43,
        'Crystal Skin Soft Hat': 44,
        'Crystal Stone Helmet': 45,
        'Golden Fighter Hat': 335,
        'Diamond Fighter Hat': 340,
        'Star Fighter Hat': 345,
        'Lava Combat Hat': 530,
        'Hollow Combat Hat': 554,
        'Bronze Combat Hat': 581,
        'Cracked Crystal Grass Skirt': 49,
        'Crystal Skin Pant': 50,
        'Crystal Leg Armor': 51,
        'Golden Fighter Pants': 338,
        'Diamond Fighter Pants': 343,
        'Star Fighter Pants': 348,
        'Lava Combat Pants': 532,
        'Hollow Combat Pants': 556,
        'Bronze Combat Pants': 583,
        'Cracked Crystal Armor': 46,
        'Crystal Skin Armor': 47,
        'Crystal Stone Armor': 48,
        'Golden Fighter Coat': 336,
        'Diamond Fighter Coat': 341,
        'Star Fighter Coat': 346,
        'Lava Combat Coat': 531,
        'Hollow Combat Coat': 555,
        'Bronze Combat Coat': 582
      };
      return nameToCode[name];
    }
    
    function createWeaponData(name, level, materials, attributes) {
      return {
        minpriceRon: getMinPriceRon(name),
        minpriceUsd: getMinPriceUsd(name),
        img: `https://icons.lumiterra.net/item-icon-${getImageCode(name)}.png`,
        requireLevel: level,
        recipe: {
          materials: materials,
          minPriceTotalRon: calculateTotalPrice(materials, 'Ron'),
          minPriceTotalUsd: calculateTotalPrice(materials, 'Usd')
        },
        attributes: attributes
      };
    }
    
    function createMaterial(name, quantity, imgCode) {
      return {
        name: name,
        quantity: quantity,
        img: `https://icons.lumiterra.net/item-icon-${imgCode}.png`,
        minpriceRon: getMaterialPrice(name, 'Ron'),
        minpriceUsd: getMaterialPrice(name, 'Usd')
      };
    }
    
    function getMinPriceRon(name) {
      const data = getDataByName(name);
      if (data && data.results && data.results.length > 0) {
        const item = data.results.find(item => item.name === name);
        return item ? (item.minPrice / 1000000000000000000).toFixed(2) : "Not sale";
      } else {
        return "Not sale";
      }
    }
    
    function getMinPriceUsd(name) {
      const data = getDataByName(name);
      if (data && data.results && data.results.length > 0) {
        const item = data.results.find(item => item.name === name);
        return item ? ((item.minPrice / 1000000000000000000) * exchangeRate).toFixed(2) : "Not sale";
      } else {
        return "Not sale";
      }
    }

    function getDataByName(name) {
      const normalizedWeaponName = name.replace(/\s+/g, '');
      if(name.toLowerCase().includes("sword") || name.toLowerCase().includes("bow") || name.toLowerCase().includes("hammer")){
        for (const weaponKey in dataCombatWeapons.data) {
          // Verifica si el nombre de la arma coincide con alguna entrada
          if (weaponKey.toLowerCase() === normalizedWeaponName.toLowerCase()) {
            return dataCombatWeapons.data[weaponKey];
          }
        }
      }else{
        for (const weaponKey in dataCombatClothes.data) {
          // Verifica si el nombre de la arma coincide con alguna entrada
          if (weaponKey.toLowerCase() === normalizedWeaponName.toLowerCase()) {
            return dataCombatClothes.data[weaponKey];
          }
        }
      }
    }
    
    function getMaterialPrice(name, currency) {
      const item = dataEssence.find(item => item.name === name);
      return item ? item[`minPrice${currency}`] : "Not sale";
    }
    
    function calculateTotalPrice(materials, currency) {
      return materials.reduce((total, material) => {
        return total + Number(material[`minprice${currency}`]) * material.quantity;
      }, 0).toFixed(2);
    }

export { Combat };

