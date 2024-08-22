import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function generateCombinedQuery(resultField, items) {   
  let query = `query CombinedQuery {\n`;
  items.forEach(item => {
    if (item.name) { // Verifica si name no está vacío y requireLevel está definido
      let alias = item.name.replace(/\s+/g, '')
      if(item.requireLevel != ""){
        alias = alias + item.requireLevel.toString()
      };
      query += `  ${alias}: erc1155Tokens(\n`;
      query += `    from: 0\n`;
      query += `    size: 1\n`;
      query += `    tokenAddress: "0xcc451977a4be9adee892f7e610fe3e3b3927b5a1"\n`;
      query += `    auctionType: Sale\n`;
      query += `    name: "${item.name}"\n`;
      query += `    sort: PriceAsc\n`;
      if(item.requireLevel != ""){
        query += `    criteria: {name: "requires level", values: "${item.requireLevel.toString()}"}\n`;
      }
      query += `  ) {\n`;
      query += `    results {\n`;
      query += `      ${resultField}\n`;
      query += `    }\n`;
      query += `    total\n`;
      query += `  }\n`;
    } 
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
    throw new Error(`Failed to fetch Names `);
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
    throw new Error(`Failed to fetch Essen `);
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
    throw new Error(`Failed to fetch market `);
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
    const nameGatherWeapons = await fetchDataNames()
    let ArrayGatherWeapons = [];
    nameGatherWeapons.data.forEach(item => {
      if (item.name){
        let obj = {name:"", requireLevel:""}
        if(item.name.toLowerCase().includes("axe") || item.name.toLowerCase().includes("pickaxe") || item.name.toLowerCase().includes("sickle")){
          obj.name = item.name
          ArrayGatherWeapons.push(obj);
          }
      }
    });
    const graphqlQueryGatherWeapons = generateCombinedQuery(result,ArrayGatherWeapons);
    const dataGatherWeapons = await fetchData(graphqlQueryGatherWeapons);
    
    const nameGatherArmor = await fetchDataNames()
    let ArrayGatherArmor = [];
    let hat = 0;
    let shoes = 0;
    let armor = 0;
    let gloves = 0;
    let pants = 0;
    nameGatherArmor.data.forEach(item => {
      if (item.name) {
        let obj = {name:"", requireLevel:""}
        if (item.name.toLowerCase().includes("gathering hat")) {
          hat += 1;
          obj.requireLevel = hat.toString();
          obj.name = item.name
          ArrayGatherArmor.push(obj); // Añadimos el objeto al array
        } else if (item.name.toLowerCase().includes("gathering shoes")) {
          shoes += 1;
          obj.requireLevel = shoes.toString();
          obj.name = item.name
          ArrayGatherArmor.push(obj); // Añadimos el objeto al array
        } else if (item.name.toLowerCase().includes("gathering gloves")) {
          gloves += 1;
          obj.requireLevel = gloves.toString();
          obj.name = item.name
          ArrayGatherArmor.push(obj); // Añadimos el objeto al array
        } else if (item.name.toLowerCase().includes("gathering pants")) {
          pants += 1;
          obj.requireLevel = pants.toString();
          obj.name = item.name
          ArrayGatherArmor.push(obj); // Añadimos el objeto al array
        } else if (item.name.toLowerCase().includes("gathering jacket")) {
          armor += 1;
          obj.requireLevel = armor.toString();
          obj.name = item.name
          ArrayGatherArmor.push(obj); // Añadimos el objeto al array
        } else if (item.name.toLowerCase().includes("gather coat") || item.name.toLowerCase().includes("gather hat") || item.name.toLowerCase().includes("gather shoes") || item.name.toLowerCase().includes("gather glove") || item.name.toLowerCase().includes("gather pants")) {
          obj.name = item.name
          ArrayGatherArmor.push(obj); // Añadimos el objeto al array
        }
      }
    });
    const graphqlQueryGatherArmor = generateCombinedQuery(result,ArrayGatherArmor);
    const dataGatherClothes = await fetchData(graphqlQueryGatherArmor);
    const dataEssence = await fetchDataEssen()

    const Gathering = 
    {
        'Iron Pickaxe': createWeaponData('Iron Pickaxe', 1, [
          createMaterial('Lv 1 Combat Essence', 2, 216),
        ], {Combatatt: "20-25", Oreatt:"41-122"}),   
        'Cursed Pickaxe': createWeaponData('Cursed Pickaxe', 2, [
          createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213),
          createMaterial('Lv 1 Agricultural Planting Essence', 1, 210),
          createMaterial('Lv 2 Combat Essence', 2, 217)
        ], {Combatatt: "20-25", Oreatt:"122-203"}), 
        'Blessing Pickaxe': createWeaponData('Blessing Pickaxe', 3, [
          createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214),
          createMaterial('Lv 2 Agricultural Planting Essence', 1, 211),
          createMaterial('Lv 3 Combat Essence', 2, 218)
        ], {Combatatt: "20-25", Oreatt: "203-284"}),
        'Golden Pickaxe': createWeaponData('Golden Pickaxe', 4, [
          createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215),
          createMaterial('Lv 3 Agricultural Planting Essence', 1, 212),
          createMaterial('Lv 4 Combat Essence', 2, 401)
        ], {Combatatt: "20-25", Oreatt:"284-365"}),
        'Diamond Pickaxe': createWeaponData('Diamond Pickaxe', 5, [
          createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410),
          createMaterial('Lv 4 Agricultural Planting Essence', 1, 407),
          createMaterial('Lv 5 Combat Essence', 2, 402)
        ], {Combatatt: "20-25", Oreatt:"365-446"}),
        'Star Pickaxe': createWeaponData('Star Pickaxe', 6, [
          createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411),
          createMaterial('Lv 5 Agricultural Planting Essence', 1, 408),
          createMaterial('Lv 6 Combat Essence', 2, 403)
        ], {Combatatt: "20-25", Oreatt:"446-527"}),
        'Lava Pickaxe': createWeaponData('Lava Pickaxe', 7, [
          createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412),
          createMaterial('Lv 6 Agricultural Planting Essence', 1, 409),
          createMaterial('Lv 7 Combat Essence', 2, 602)
        ], {Combatatt: "20-25", Oreatt:"527-608"}),
        'Hollow Pickaxe': createWeaponData('Hollow Pickaxe', 8, [
          createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611),
          createMaterial('Lv 7 Agricultural Planting Essence', 1, 608),
          createMaterial('Lv 8 Combat Essence', 2, 603)
        ], {Combatatt: "20-25", Oreatt:"608-689"}),
        'Bronze Pickaxe': createWeaponData('Bronze Pickaxe', 9, [
          createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612),
          createMaterial('Lv 8 Agricultural Planting Essence', 1, 609),
          createMaterial('Lv 9 Combat Essence', 2, 604)
        ], {Combatatt: "20-25", Oreatt:"689-770"}),
        'Iron Axe': createWeaponData('Iron Axe', 1, [
          createMaterial('Lv 1 Combat Essence', 2, 216),
        ], {Combatatt: "20-25", Treeatt:"41-122"}),   
        'Curse Axe': createWeaponData('Curse Axe', 2, [
          createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213),
          createMaterial('Lv 1 Agricultural Planting Essence', 1, 210),
          createMaterial('Lv 2 Combat Essence', 2, 217)
        ], {Combatatt: "20-25", Treeatt:"122-203"}), 
        'Blessed Axe': createWeaponData('Blessed Axe', 3, [
          createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214),
          createMaterial('Lv 2 Agricultural Planting Essence', 1, 211),
          createMaterial('Lv 3 Combat Essence', 2, 218)
        ], {Combatatt: "20-25", Treeatt: "203-284"}),
        'Golden Axe': createWeaponData('Golden Axe', 4, [
          createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215),
          createMaterial('Lv 3 Agricultural Planting Essence', 1, 212),
          createMaterial('Lv 4 Combat Essence', 2, 401)
        ], {Combatatt: "20-25", Treeatt:"284-365"}),
        'Diamond Axe': createWeaponData('Diamond Axe', 5, [
          createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410),
          createMaterial('Lv 4 Agricultural Planting Essence', 1, 407),
          createMaterial('Lv 5 Combat Essence', 2, 402)
        ], {Combatatt: "20-25", Treeatt:"365-446"}),
        'Star Axe': createWeaponData('Star Axe', 6, [
          createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411),
          createMaterial('Lv 5 Agricultural Planting Essence', 1, 408),
          createMaterial('Lv 6 Combat Essence', 2, 403)
        ], {Combatatt: "20-25", Treeatt:"446-527"}),
        'Lava Axe': createWeaponData('Lava Axe', 7, [
          createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412),
          createMaterial('Lv 6 Agricultural Planting Essence', 1, 409),
          createMaterial('Lv 7 Combat Essence', 2, 602)
        ], {Combatatt: "20-25", Treeatt:"527-608"}),
        'Hollow Axe': createWeaponData('Hollow Axe', 8, [
          createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611),
          createMaterial('Lv 7 Agricultural Planting Essence', 1, 608),
          createMaterial('Lv 8 Combat Essence', 2, 603)
        ], {Combatatt: "20-25", Treeatt:"608-689"}),
        'Bronze Axe': createWeaponData('Bronze Axe', 9, [
          createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612),
          createMaterial('Lv 8 Agricultural Planting Essence', 1, 609),
          createMaterial('Lv 9 Combat Essence', 2, 604)
        ], {Combatatt: "20-25", Treeatt:"689-770"}),
        'Copper Sickle': createWeaponData('Copper Sickle', 1, [
          createMaterial('Lv 1 Combat Essence', 2, 216),
        ], {Combatatt: "20-25", Grassatt:"41-122"}),   
        'Iron Sickle': createWeaponData('Iron Sickle', 2, [
          createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213),
          createMaterial('Lv 1 Agricultural Planting Essence', 1, 210),
          createMaterial('Lv 2 Combat Essence', 2, 217)
        ], {Combatatt: "20-25", Grassatt:"122-203"}), 
        'Crystal Sickle': createWeaponData('Crystal Sickle', 3, [
          createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214),
          createMaterial('Lv 2 Agricultural Planting Essence', 1, 211),
          createMaterial('Lv 3 Combat Essence', 2, 218)
        ], {Combatatt: "20-25", Grassatt: "203-284"}),
        'Golden Sickle': createWeaponData('Golden Sickle', 4, [
          createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215),
          createMaterial('Lv 3 Agricultural Planting Essence', 1, 212),
          createMaterial('Lv 4 Combat Essence', 2, 401)
        ], {Combatatt: "20-25", Grassatt:"284-365"}),
        'Diamond Sickle': createWeaponData('Diamond Sickle', 5, [
          createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410),
          createMaterial('Lv 4 Agricultural Planting Essence', 1, 407),
          createMaterial('Lv 5 Combat Essence', 2, 402)
        ], {Combatatt: "20-25", Grassatt:"365-446"}),
        'Star Sickle': createWeaponData('Star Sickle', 6, [
          createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411),
          createMaterial('Lv 5 Agricultural Planting Essence', 1, 408),
          createMaterial('Lv 6 Combat Essence', 2, 403)
        ], {Combatatt: "20-25", Grassatt:"446-527"}),
        'Lava Sickle': createWeaponData('Lava Sickle', 7, [
          createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412),
          createMaterial('Lv 6 Agricultural Planting Essence', 1, 409),
          createMaterial('Lv 7 Combat Essence', 2, 602)
        ], {Combatatt: "20-25", Grassatt:"527-608"}),
        'Hollow Sickle': createWeaponData('Hollow Sickle', 8, [
          createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611),
          createMaterial('Lv 7 Agricultural Planting Essence', 1, 608),
          createMaterial('Lv 8 Combat Essence', 2, 603)
        ], {Combatatt: "20-25", Grassatt:"608-689"}),
        'Bronze Sickle': createWeaponData('Bronze Sickle', 9, [
          createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612),
          createMaterial('Lv 8 Agricultural Planting Essence', 1, 609),
          createMaterial('Lv 9 Combat Essence', 2, 604)
        ], {Combatatt: "20-25", Grassatt:"689-770"}),
        'Gathering Hat': createWeaponData('Gathering Hat', 1, [
          createMaterial('Lv 1 Combat Essence', 2, 216),
        ], {Grassproficiency:"8-25", Oreproficiency:"8-25", Treeproficiency:"8-25"}),   
        'Gathering Hat': createWeaponData('Gathering Hat', 2, [
          createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213),
          createMaterial('Lv 1 Agricultural Planting Essence', 1, 210),
          createMaterial('Lv 2 Combat Essence', 2, 217)
        ], {Grassproficiency:"25-41", Oreproficiency:"25-41", Treeproficiency:"25-41"}), 
        'Gathering Hat': createWeaponData('Gathering Hat', 3, [
          createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214),
          createMaterial('Lv 2 Agricultural Planting Essence', 1, 211),
          createMaterial('Lv 3 Combat Essence', 2, 218)
        ], {Grassproficiency: "41-58", Oreproficiency:"41-58", Treeproficiency:"41-58"}),
        'Golden Gather Hat': createWeaponData('Golden Gather Hat', 4, [
          createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215),
          createMaterial('Lv 3 Agricultural Planting Essence', 1, 212),
          createMaterial('Lv 4 Combat Essence', 2, 401)
        ], {Grassproficiency:"58-74", Oreproficiency:"58-74", Treeproficiency:"58-74"}),
        'Diamond Gather Hat': createWeaponData('Diamond Gather Hat', 5, [
          createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410),
          createMaterial('Lv 4 Agricultural Planting Essence', 1, 407),
          createMaterial('Lv 5 Combat Essence', 2, 402)
        ], {Grassproficiency:"74-91", Oreproficiency:"74-91", Treeproficiency:"74-91"}),
        'Star Gather Hat': createWeaponData('Star Gather Hat', 6, [
          createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411),
          createMaterial('Lv 5 Agricultural Planting Essence', 1, 408),
          createMaterial('Lv 6 Combat Essence', 2, 403)
        ], {Grassproficiency:"91-107", Oreproficiency:"91-107", Treeproficiency:"91-107"}),
        'Lava Gather Hat': createWeaponData('Lava Gather Hat', 7, [
          createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412),
          createMaterial('Lv 6 Agricultural Planting Essence', 1, 409),
          createMaterial('Lv 7 Combat Essence', 2, 602)
        ], {Grassproficiency:"107-124", Oreproficiency:"107-124", Treeproficiency:"107-124"}),
        'Hollow Gather Hat': createWeaponData('Hollow Gather Hat', 8, [
          createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611),
          createMaterial('Lv 7 Agricultural Planting Essence', 1, 608),
          createMaterial('Lv 8 Combat Essence', 2, 603)
        ], {Grassproficiency:"124-140", Oreproficiency:"124-140", Treeproficiency:"124-140"}),
        'Bronze Gather Hat': createWeaponData('Bronze Gather Hat', 9, [
          createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612),
          createMaterial('Lv 8 Agricultural Planting Essence', 1, 609),
          createMaterial('Lv 9 Combat Essence', 2, 604)
        ], {Grassproficiency:"140-157", Oreproficiency:"140-157", Treeproficiency:"140-157"}),
        'Gathering Jacket': createWeaponData('Gathering Jacket', 1, [
          createMaterial('Lv 1 Combat Essence', 2, 216),
        ], {Grassproficiency:"10-30", Oreproficiency:"10-30", Treeproficiency:"10-30"}),   
        'Gathering Jacket': createWeaponData('Gathering Jacket', 2, [
          createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213),
          createMaterial('Lv 1 Agricultural Planting Essence', 1, 210),
          createMaterial('Lv 2 Combat Essence', 2, 217)
        ], {Grassproficiency:"30-49", Oreproficiency:"30-49", Treeproficiency:"30-49"}), 
        'Gathering Jacket': createWeaponData('Gathering Jacket', 3, [
          createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214),
          createMaterial('Lv 2 Agricultural Planting Essence', 1, 211),
          createMaterial('Lv 3 Combat Essence', 2, 218)
        ], {Grassproficiency: "49-69", Oreproficiency:"49-69", Treeproficiency:"49-69"}),
        'Golden Gather Coat': createWeaponData('Golden Gather Coat', 4, [
          createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215),
          createMaterial('Lv 3 Agricultural Planting Essence', 1, 212),
          createMaterial('Lv 4 Combat Essence', 2, 401)
        ], {Grassproficiency:"69-89", Oreproficiency:"69-89", Treeproficiency:"69-89"}),
        'Diamond Gather Coat': createWeaponData('Diamond Gather Coat', 5, [
          createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410),
          createMaterial('Lv 4 Agricultural Planting Essence', 1, 407),
          createMaterial('Lv 5 Combat Essence', 2, 402)
        ], {Grassproficiency:"89-109", Oreproficiency:"89-109", Treeproficiency:"89-109"}),
        'Star Gather Coat': createWeaponData('Star Gather Coat', 6, [
          createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411),
          createMaterial('Lv 5 Agricultural Planting Essence', 1, 408),
          createMaterial('Lv 6 Combat Essence', 2, 403)
        ], {Grassproficiency:"109-128", Oreproficiency:"109-128", Treeproficiency:"109-128"}),
        'Lava Gather Coat': createWeaponData('Lava Gather Coat', 7, [
          createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412),
          createMaterial('Lv 6 Agricultural Planting Essence', 1, 409),
          createMaterial('Lv 7 Combat Essence', 2, 602)
        ], {Grassproficiency:"128-148", Oreproficiency:"128-148", Treeproficiency:"128-148"}),
        'Hollow Gather Coat': createWeaponData('Hollow Gather Coat', 8, [
          createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611),
          createMaterial('Lv 7 Agricultural Planting Essence', 1, 608),
          createMaterial('Lv 8 Combat Essence', 2, 603)
        ], {Grassproficiency:"148-168", Oreproficiency:"148-168", Treeproficiency:"148-168"}),
        'Bronze Gather Coat': createWeaponData('Bronze Gather Coat', 9, [
          createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612),
          createMaterial('Lv 8 Agricultural Planting Essence', 1, 609),
          createMaterial('Lv 9 Combat Essence', 2, 604)
        ], {Grassproficiency:"168-188", Oreproficiency:"168-188", Treeproficiency:"168-188"}),
        'Gathering Pants': createWeaponData('Gathering Pants', 1, [
          createMaterial('Lv 1 Combat Essence', 2, 216),
        ], {Grassproficiency:"8-24", Oreproficiency:"8-24", Treeproficiency:"8-24"}),   
        'Gathering Pants': createWeaponData('Gathering Pants', 2, [
          createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213),
          createMaterial('Lv 1 Agricultural Planting Essence', 1, 210),
          createMaterial('Lv 2 Combat Essence', 2, 217)
        ], {Grassproficiency:"24-39", Oreproficiency:"24-39", Treeproficiency:"24-39"}), 
        'Gathering Pants': createWeaponData('Gathering Pants', 3, [
          createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214),
          createMaterial('Lv 2 Agricultural Planting Essence', 1, 211),
          createMaterial('Lv 3 Combat Essence', 2, 218)
        ], {Grassproficiency: "39-55", Oreproficiency:"39-55", Treeproficiency:"39-55"}),
        'Golden Gather Pants': createWeaponData('Golden Gather Pants', 4, [
          createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215),
          createMaterial('Lv 3 Agricultural Planting Essence', 1, 212),
          createMaterial('Lv 4 Combat Essence', 2, 401)
        ], {Grassproficiency:"55-71", Oreproficiency:"55-71", Treeproficiency:"55-71"}),
        'Diamond Gather Pants': createWeaponData('Diamond Gather Pants', 5, [
          createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410),
          createMaterial('Lv 4 Agricultural Planting Essence', 1, 407),
          createMaterial('Lv 5 Combat Essence', 2, 402)
        ], {Grassproficiency:"71-86", Oreproficiency:"71-86", Treeproficiency:"71-86"}),
        'Star Gather Pants': createWeaponData('Star Gather Pants', 6, [
          createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411),
          createMaterial('Lv 5 Agricultural Planting Essence', 1, 408),
          createMaterial('Lv 6 Combat Essence', 2, 403)
        ], {Grassproficiency:"86-102", Oreproficiency:"86-102", Treeproficiency:"86-102"}),
        'Lava Gather Pants': createWeaponData('Lava Gather Pants', 7, [
          createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412),
          createMaterial('Lv 6 Agricultural Planting Essence', 1, 409),
          createMaterial('Lv 7 Combat Essence', 2, 602)
        ], {Grassproficiency:"102-118", Oreproficiency:"102-118", Treeproficiency:"102-118"}),
        'Hollow Gather Pants': createWeaponData('Hollow Gather Pants', 8, [
          createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611),
          createMaterial('Lv 7 Agricultural Planting Essence', 1, 608),
          createMaterial('Lv 8 Combat Essence', 2, 603)
        ], {Grassproficiency:"118-134", Oreproficiency:"118-134", Treeproficiency:"118-134"}),
        'Bronze Gather Pants': createWeaponData('Bronze Gather Pants', 9, [
          createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612),
          createMaterial('Lv 8 Agricultural Planting Essence', 1, 609),
          createMaterial('Lv 9 Combat Essence', 2, 604)
        ], {Grassproficiency:"134-149", Oreproficiency:"134-149", Treeproficiency:"134-149"}),
        'Gathering Shoes': createWeaponData('Gathering Shoes', 1, [
          createMaterial('Lv 1 Combat Essence', 2, 216),
        ], {Grassproficiency:"8-25", Oreproficiency:"8-25", Treeproficiency:"8-25"}),   
        'Gathering Shoes': createWeaponData('Gathering Shoes', 2, [
          createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213),
          createMaterial('Lv 1 Agricultural Planting Essence', 1, 210),
          createMaterial('Lv 2 Combat Essence', 2, 217)
        ], {Grassproficiency:"25-41", Oreproficiency:"25-41", Treeproficiency:"25-41"}), 
        'Gathering Shoes': createWeaponData('Gathering Shoes', 3, [
          createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214),
          createMaterial('Lv 2 Agricultural Planting Essence', 1, 211),
          createMaterial('Lv 3 Combat Essence', 2, 218)
        ], {Grassproficiency: "41-58", Oreproficiency:"41-58", Treeproficiency:"41-58"}),
        'Golden Gather Shoes': createWeaponData('Golden Gather Shoes', 4, [
          createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215),
          createMaterial('Lv 3 Agricultural Planting Essence', 1, 212),
          createMaterial('Lv 4 Combat Essence', 2, 401)
        ], {Grassproficiency:"58-74", Oreproficiency:"58-74", Treeproficiency:"58-74"}),
        'Diamond Gather Shoes': createWeaponData('Diamond Gather Shoes', 5, [
          createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410),
          createMaterial('Lv 4 Agricultural Planting Essence', 1, 407),
          createMaterial('Lv 5 Combat Essence', 2, 402)
        ], {Grassproficiency:"74-91", Oreproficiency:"74-91", Treeproficiency:"74-91"}),
        'Star Gather Shoes': createWeaponData('Star Gather Shoes', 6, [
          createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411),
          createMaterial('Lv 5 Agricultural Planting Essence', 1, 408),
          createMaterial('Lv 6 Combat Essence', 2, 403)
        ], {Grassproficiency:"91-107", Oreproficiency:"91-107", Treeproficiency:"91-107"}),
        'Lava Gather Shoes': createWeaponData('Lava Gather Shoes', 7, [
          createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412),
          createMaterial('Lv 6 Agricultural Planting Essence', 1, 409),
          createMaterial('Lv 7 Combat Essence', 2, 602)
        ], {Grassproficiency:"107-124", Oreproficiency:"107-124", Treeproficiency:"107-124"}),
        'Hollow Gather Shoes': createWeaponData('Hollow Gather Shoes', 8, [
          createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611),
          createMaterial('Lv 7 Agricultural Planting Essence', 1, 608),
          createMaterial('Lv 8 Combat Essence', 2, 603)
        ], {Grassproficiency:"124-140", Oreproficiency:"124-140", Treeproficiency:"124-140"}),
        'Bronze Gather Shoes': createWeaponData('Bronze Gather Shoes', 9, [
          createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612),
          createMaterial('Lv 8 Agricultural Planting Essence', 1, 609),
          createMaterial('Lv 9 Combat Essence', 2, 604)
        ], {Grassproficiency:"140-157", Oreproficiency:"140-157", Treeproficiency:"140-157"}),
        'Gathering Gloves': createWeaponData('Gathering Gloves', 1, [
          createMaterial('Lv 1 Combat Essence', 2, 216),
        ], {Grassproficiency:"6-19", Oreproficiency:"6-19", Treeproficiency:"6-19", Grassatt:"5-14", Oreatt:"5-14", Treeatt:"5-14"}),   
        'Gathering Gloves': createWeaponData('Gathering Gloves', 2, [
          createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213),
          createMaterial('Lv 1 Agricultural Planting Essence', 1, 210),
          createMaterial('Lv 2 Combat Essence', 2, 217)
        ], {Grassproficiency:"19-31", Oreproficiency:"19-31", Treeproficiency:"19-31", Grassatt:"14-23", Oreatt:"14-23", Treeatt:"14-23"}), 
        'Gathering Gloves': createWeaponData('Gathering Gloves', 3, [
          createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214),
          createMaterial('Lv 2 Agricultural Planting Essence', 1, 211),
          createMaterial('Lv 3 Combat Essence', 2, 218)
        ], {Grassproficiency: "31-44", Oreproficiency:"31-44", Treeproficiency:"31-44", Grassatt:"23-32", Oreatt:"23-32", Treeatt:"23-32"}),
        'Golden Gather Glove': createWeaponData('Golden Gather Glove', 4, [
          createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215),
          createMaterial('Lv 3 Agricultural Planting Essence', 1, 212),
          createMaterial('Lv 4 Combat Essence', 2, 401)
        ], {Grassproficiency:"44-56", Oreproficiency:"44-56", Treeproficiency:"44-56", Grassatt:"32-41", Oreatt:"32-41", Treeatt:"32-41"}),
        'Diamond Gather Glove': createWeaponData('Diamond Gather Glove', 5, [
          createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410),
          createMaterial('Lv 4 Agricultural Planting Essence', 1, 407),
          createMaterial('Lv 5 Combat Essence', 2, 402)
        ], {Grassproficiency:"56-69", Oreproficiency:"56-69", Treeproficiency:"56-69", Grassatt:"41-50", Oreatt:"41-50", Treeatt:"41-50"}),
        'Star Gather Glove': createWeaponData('Star Gather Glove', 6, [
          createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411),
          createMaterial('Lv 5 Agricultural Planting Essence', 1, 408),
          createMaterial('Lv 6 Combat Essence', 2, 403)
        ], {Grassproficiency:"69-81", Oreproficiency:"69-81", Treeproficiency:"69-81", Grassatt:"50-59", Oreatt:"50-59", Treeatt:"50-59"}),
        'Lava Gather Glove': createWeaponData('Lava Gather Glove', 7, [
          createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412),
          createMaterial('Lv 6 Agricultural Planting Essence', 1, 409),
          createMaterial('Lv 7 Combat Essence', 2, 602)
        ], {Grassproficiency:"81-94", Oreproficiency:"81-94", Treeproficiency:"81-94", Grassatt:"59-68", Oreatt:"59-68", Treeatt:"59-68"}),
        'Hollow Gather Glove': createWeaponData('Hollow Gather Glove', 8, [
          createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611),
          createMaterial('Lv 7 Agricultural Planting Essence', 1, 608),
          createMaterial('Lv 8 Combat Essence', 2, 603)
        ], {Grassproficiency:"94-106", Oreproficiency:"94-106", Treeproficiency:"94-106", Grassatt:"68-77", Oreatt:"68-77", Treeatt:"68-77"}),
        'Bronze Gather Glove': createWeaponData('Bronze Gather Glove', 9, [
          createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612),
          createMaterial('Lv 8 Agricultural Planting Essence', 1, 609),
          createMaterial('Lv 9 Combat Essence', 2, 604)
        ], {Grassproficiency:"106-119", Oreproficiency:"106-119", Treeproficiency:"106-119", Grassatt:"77-86", Oreatt:"77-86", Treeatt:"77-86"})
      };

    function getImageCode(name) {
      const nameToCode = {
        'Iron Pickaxe': 88,
        'Cursed Pickaxe': 89,
        'Blessing Pickaxe': 90,
        'Golden Pickaxe': 301,
        'Diamond Pickaxe': 307,
        'Star Pickaxe': 313,
        'Lava Pickaxe': 537,
        'Hollow Pickaxe': 561,
        'Bronze Pickaxe': 585,
        'Iron Axe': 92,
        'Curse Axe': 93,
        'Blessed Axe': 94,
        'Golden Axe': 300,
        'Diamond Axe': 306,
        'Star Axe': 312,
        'Lava Axe': 536,
        'Hollow Axe': 560,
        'Bronze Axe': 584,
        'Copper Sickle': 226,
        'Iron Sickle': 227,
        'Crystal Sickle': 228,
        'Golden Sickle': 303,
        'Diamond Sickle': 309,
        'Star Sickle': 315,
        'Lava Sickle': 535,
        'Hollow Sickle': 559,
        'Bronze Sickle': 583,
        'Gathering Hat1': 116,
        'Gathering Hat2': 117,
        'Gathering Hat3': 118,
        'Golden Gather Hat': 320,
        'Diamond Gather Hat': 325,
        'Star Gather Hat': 330,
        'Lava Gather Hat': 538,
        'Hollow Gather Hat': 562,
        'Bronze Gather Hat': 586,
        'Gathering Shoes1': 113,
        'Gathering Shoes2': 114,
        'Gathering Shoes3': 115,
        'Golden Gather Shoes': 324,
        'Diamond Gather Shoes': 329,
        'Star Gather Shoes': 334,
        'Lava Gather Shoes': 542,
        'Hollow Gather Shoes': 566,
        'Bronze Gather Shoes': 590,
        'Gathering Gloves1': 125,
        'Gathering Gloves2': 126,
        'Gathering Gloves3': 127,
        'Golden Gather Glove': 322,
        'Diamond Gather Glove': 327,
        'Star Gather Glove': 332,
        'Lava Gather Glove': 541,
        'Hollow Gather Glove': 565,
        'Bronze Gather Glove': 589,
        'Gathering Jacket1': 119,
        'Gathering Jacket2': 120,
        'Gathering Jacket3': 121,
        'Golden Gather Coat': 321,
        'Diamond Gather Coat': 326,
        'Star Gather Coat': 331,
        'Lava Gather Coat': 539,
        'Hollow Gather Coat': 563,
        'Bronze Gather Coat': 587,
        'Gathering Pants1': 122,
        'Gathering Pants2': 123,
        'Gathering Pants3': 124,
        'Golden Gather Pants': 323,
        'Diamond Gather Pants': 328,
        'Star Gather Pants': 333,
        'Lava Gather Pants': 540,
        'Hollow Gather Pants': 564,
        'Bronze Gather Pants': 588
      };
      return nameToCode[name];
    }

    function createWeaponData(name, level, materials, attributes) {
      let alias = "";
      if(name.toLowerCase().includes("gathering")){
        alias = name + level.toString()
      }else{
        alias = name
      }
      return {
        minpriceRon: getMinPriceRon(alias),
        minpriceUsd: getMinPriceUsd(alias),
        img: `https://icons.lumiterra.net/item-icon-${getImageCode(alias)}.png`,
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
      if(name.toLowerCase().includes("axe") || name.toLowerCase().includes("sickle") || name.toLowerCase().includes("pickaxe")){
        for (const weaponKey in dataGatherWeapons.data) {
          // Verifica si el nombre de la arma coincide con alguna entrada
          if (weaponKey.toLowerCase() === normalizedWeaponName.toLowerCase()) {
            return dataGatherWeapons.data[weaponKey];
          }
        }
      }else{
        for (const weaponKey in dataGatherClothes.data) {
          // Verifica si el nombre de la arma coincide con alguna entrada
          if (weaponKey.toLowerCase() === normalizedWeaponName.toLowerCase()) {
            return dataGatherClothes.data[weaponKey];
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

export { Gathering };
