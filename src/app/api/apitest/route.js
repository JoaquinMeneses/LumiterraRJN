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
  console.log(query)
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
    const nameFarmerWeapons = await fetchDataNames()
    let ArrayFarmerWeapons = [];
    nameFarmerWeapons.data.forEach(item => {
      if (item.name){
        let obj = {name:"", requireLevel:""}
        if(item.name.toLowerCase().includes("hoe") && !item.name.toLowerCase().includes("shoe")|| item.name.toLowerCase().includes("kettle") || item.name.toLowerCase().includes("brush")
          || item.name.toLowerCase().includes("scissors")){
            obj.name = item.name
            ArrayFarmerWeapons.push(obj);
          }
      }
    });
    const graphqlQueryFarmerWeapons = generateCombinedQuery(result,ArrayFarmerWeapons);
    const dataFarmerWeapons = await fetchData(graphqlQueryFarmerWeapons);
    
    const nameFarmerArmor = await fetchDataNames()
    let ArrayFarmerArmor = [];
    let shoes = 0;
    let armor = 0;
    let gloves = 0;
    let pants = 0;
    nameFarmerArmor.data.forEach(item => {
      if (item.name) {
        let obj = {name:"", requireLevel:""}
        if (item.name.toLowerCase().includes("farming shoes") && !item.name.toLowerCase().includes("hollow") && !item.name.toLowerCase().includes("bronze")
            && !item.name.toLowerCase().includes("lava")) {
          shoes += 1;
          obj.requireLevel = shoes.toString();
          obj.name = item.name
          ArrayFarmerArmor.push(obj); // Añadimos el objeto al array
        } else if (item.name.toLowerCase().includes("farming gloves")&& !item.name.toLowerCase().includes("hollow") && !item.name.toLowerCase().includes("bronze")
          && !item.name.toLowerCase().includes("lava")) {
          gloves += 1;
          obj.requireLevel = gloves.toString();
          obj.name = item.name
          ArrayFarmerArmor.push(obj); // Añadimos el objeto al array
        } else if (item.name.toLowerCase().includes("farming pants") && !item.name.toLowerCase().includes("hollow") && !item.name.toLowerCase().includes("bronze")
          && !item.name.toLowerCase().includes("lava")) {
          pants += 1;
          obj.requireLevel = pants.toString();
          obj.name = item.name
          ArrayFarmerArmor.push(obj); // Añadimos el objeto al array
        } else if (item.name.toLowerCase().includes("farming jacket")) {
          armor += 1;
          obj.requireLevel = armor.toString();
          obj.name = item.name
          ArrayFarmerArmor.push(obj); // Añadimos el objeto al array
        } else if (item.name.toLowerCase().includes("farmer coat") || item.name.toLowerCase().includes("farmer hat") || item.name.toLowerCase().includes("farmer shoes") 
          || item.name.toLowerCase().includes("farmer glove") || item.name.toLowerCase().includes("farmer pants") || item.name.toLowerCase().includes("Lucky")
          || item.name.toLowerCase().includes("bronze farming") || item.name.toLowerCase().includes("hollow farming") || item.name.toLowerCase().includes("lava farming"))
          {
            obj.name = item.name
            ArrayFarmerArmor.push(obj); // Añadimos el objeto al array
        }
      }
    });
    const graphqlQueryFarmerArmor = generateCombinedQuery(result,ArrayFarmerArmor);
    const dataFarmerClothes = await fetchData(graphqlQueryFarmerArmor);
    const dataEssence = await fetchDataEssen()

    const Farming = 
    {
      'Iron Hoe': createWeaponData('Iron Hoe', 1, [
        createMaterial('Lv 1 Gather Essence', 2, 207),
      ], {Combatatt: "20-25", Fertilitycapacity:"8-24", Hoeingeeffect:"13-17"}),   
      'Curse Hoe': createWeaponData('Curse Hoe', 2, [
        createMaterial('Lv 1 Combat Essence', 2, 216),
        createMaterial('Lv 2 Gather Essence', 2, 208)
      ], {Combatatt: "20-25", Fertilitycapacity:"23-37", Hoeingeeffect:"18-23"}), 
      'Blessing Hoe': createWeaponData('Blessing Hoe', 3, [
        createMaterial('Lv 2 Combat Essence', 2, 217),
        createMaterial('Lv 3 Gather Essence', 2, 209)
      ], {Combatatt: "20-25", Fertilitycapacity: "36-48", Hoeingeeffect:"24-35"}),
      'Golden Hoe': createWeaponData('Golden Hoe', 4, [
        createMaterial('Lv 3 Combat Essence', 2, 218),
        createMaterial('Lv 4 Gather Essence', 2, 404)
      ], {Combatatt: "20-25", Fertilitycapacity:"48-59"}),
      'Diamond Hoe': createWeaponData('Diamond Hoe', 5, [
        createMaterial('Lv 4 Combat Essence', 2, 401),
        createMaterial('Lv 5 Gather Essence', 2, 405)
      ], {Combatatt: "20-25", Fertilitycapacity:"58-68"}),
      'Star Hoe': createWeaponData('Star Hoe', 6, [
        createMaterial('Lv 5 Combat Essence', 2, 402),
        createMaterial('Lv 6 Gather Essence', 2, 406)
      ], {Combatatt: "20-25", Fertilitycapacity:"68-77"}),
      'Lava Hoe': createWeaponData('Lava Hoe', 7, [
        createMaterial('Lv 6 Combat Essence', 2, 403),
        createMaterial('Lv 7 Gather Essence', 2, 605)
      ], {Combatatt: "20-25", Fertilitycapacity:"77-86"}),
      'Hollow Hoe': createWeaponData('Hollow Hoe', 8, [
        createMaterial('Lv 7 Combat Essence', 2, 602),
        createMaterial('Lv 8 Gather Essence', 2, 606)
      ], {Combatatt: "20-25", Fertilitycapacity:"85-94"}),
      'Bronze Hoe': createWeaponData('Bronze Hoe', 9, [
        createMaterial('Lv 8 Combat Essence', 2, 603),
        createMaterial('Lv 9 Gather Essence', 2, 607)
      ], {Combatatt: "20-25", Fertilitycapacity:"94-101"}),
      'Iron Kettle': createWeaponData('Iron Kettle', 1, [
        createMaterial('Lv 1 Gather Essence', 2, 207),
      ], {Wateringeffect: "23-37"}),   
      'Curse Kettle': createWeaponData('Curse Kettle', 2, [
        createMaterial('Lv 1 Combat Essence', 2, 216),
        createMaterial('Lv 2 Gather Essence', 2, 208)
      ], {Wateringeffect: "38-52"}), 
      'Blessing Kettle': createWeaponData('Blessing Kettle', 3, [
        createMaterial('Lv 2 Combat Essence', 2, 217),
        createMaterial('Lv 3 Gather Essence', 2, 209)
      ], {Wateringeffect: "53-67"}),
      'Golden Kettle': createWeaponData('Golden Kettle', 4, [
        createMaterial('Lv 3 Combat Essence', 2, 218),
        createMaterial('Lv 4 Gather Essence', 2, 404)
      ], {Wateringeffect: "68-72"}),
      'Diamond Kettle': createWeaponData('Diamond Kettle', 5, [
        createMaterial('Lv 4 Combat Essence', 2, 401),
        createMaterial('Lv 5 Gather Essence', 2, 405)
      ], {Wateringeffect: "83-97"}),
      'Star Kettle': createWeaponData('Star Kettle', 6, [
        createMaterial('Lv 5 Combat Essence', 2, 402),
        createMaterial('Lv 6 Gather Essence', 2, 406)
      ], {Wateringeffect: "98-112"}),
      'Lava Kettle': createWeaponData('Lava Kettle', 7, [
        createMaterial('Lv 6 Combat Essence', 2, 403),
        createMaterial('Lv 7 Gather Essence', 2, 605)
      ], {Wateringeffect: "113-127"}),
      'Hollow Kettle': createWeaponData('Hollow Kettle', 8, [
        createMaterial('Lv 7 Combat Essence', 2, 602),
        createMaterial('Lv 8 Gather Essence', 2, 606)
      ], {Wateringeffect: "128-142"}),
      'Bronze Kettle': createWeaponData('Bronze Kettle', 9, [
        createMaterial('Lv 8 Combat Essence', 2, 603),
        createMaterial('Lv 9 Gather Essence', 2, 607)
      ], {Wateringeffect: "143-157"}),
      'Copper Brush': createWeaponData('Copper Brush', 1, [
        createMaterial('Lv 1 Gather Essence', 2, 207),
      ], {Pethappinesscapacity: "8-24"}),   
      'Iron Brush': createWeaponData('Iron Brush', 2, [
        createMaterial('Lv 1 Combat Essence', 2, 216),
        createMaterial('Lv 2 Gather Essence', 2, 208)
      ], {Pethappinesscapacity: "23-37"}), 
      'Crystal Brush': createWeaponData('Crystal Brush', 3, [
        createMaterial('Lv 2 Combat Essence', 2, 217),
        createMaterial('Lv 3 Gather Essence', 2, 209)
      ], {Pethappinesscapacity: "36-48"}),
      'Golden Brush': createWeaponData('Golden Brush', 4, [
        createMaterial('Lv 3 Combat Essence', 2, 218),
        createMaterial('Lv 4 Gather Essence', 2, 404)
      ], {Pethappinesscapacity: "48-59"}),
      'Diamond Brush': createWeaponData('Diamond Brush', 5, [
        createMaterial('Lv 4 Combat Essence', 2, 401),
        createMaterial('Lv 5 Gather Essence', 2, 405)
      ], {Pethappinesscapacity: "58-68"}),
      'Starlight Brush': createWeaponData('Starlight Brush', 6, [
        createMaterial('Lv 5 Combat Essence', 2, 402),
        createMaterial('Lv 6 Gather Essence', 2, 406)
      ], {Pethappinesscapacity: "68-77"}),
      'Lava Brush': createWeaponData('Lava Brush', 7, [
        createMaterial('Lv 6 Combat Essence', 2, 403),
        createMaterial('Lv 7 Gather Essence', 2, 605)
      ], {Pethappinesscapacity: "77-86"}),
      'Hollow Brush': createWeaponData('Hollow Brush', 8, [
        createMaterial('Lv 7 Combat Essence', 2, 602),
        createMaterial('Lv 8 Gather Essence', 2, 606)
      ], {Pethappinesscapacity: "85-94"}),
      'Bronze Brush': createWeaponData('Bronze Brush', 9, [
        createMaterial('Lv 8 Combat Essence', 2, 603),
        createMaterial('Lv 9 Gather Essence', 2, 607)
      ], {Pethappinesscapacity: "94-101"}),
      'Farming Shoes': createWeaponData('Farming Shoes', 1, [
        createMaterial('Lv 1 Gather Essence', 2, 207),
      ], {Breedingproficiency: "9-27", Plantigproficiency: "9-27", Maxfertility: "184-551", Maxpethappiness: "46-138"}),   
      'Farming Shoes': createWeaponData('Farming Shoes', 2, [
        createMaterial('Lv 1 Combat Essence', 2, 216),
        createMaterial('Lv 2 Gather Essence', 2, 208)
      ], {Breedingproficiency: "27-44", Plantigproficiency: "27-44", Maxfertility: "551-918", Maxpethappiness: "138-230"}), 
      'Farming Shoes': createWeaponData('Farming Shoes', 3, [
        createMaterial('Lv 2 Combat Essence', 2, 217),
        createMaterial('Lv 3 Gather Essence', 2, 209)
      ], {Breedingproficiency: "44-62", Plantigproficiency: "44-62", Maxfertility: "918-1285", Maxpethappiness: "230-321"}),
      'Golden Farmer Shoes': createWeaponData('Golden Farmer Shoes', 4, [
        createMaterial('Lv 3 Combat Essence', 2, 218),
        createMaterial('Lv 4 Gather Essence', 2, 404)
      ], {Breedingproficiency: "62-80", Plantigproficiency: "62-80", Maxfertility: "1285-1625", Maxpethappiness: "321-413"}),
      'Diamond Farmer Shoes': createWeaponData('Diamond Farmer Shoes', 5, [
        createMaterial('Lv 4 Combat Essence', 2, 401),
        createMaterial('Lv 5 Gather Essence', 2, 405)
      ], {Breedingproficiency: "80-97", Plantigproficiency: "80-97", Maxfertility: "1625-2019", Maxpethappiness: "413-505"}),
      'Star Farmer Shoes': createWeaponData('Star Farmer Shoes', 6, [
        createMaterial('Lv 5 Combat Essence', 2, 402),
        createMaterial('Lv 6 Gather Essence', 2, 406)
      ], {Breedingproficiency: "97-115", Plantigproficiency: "97-115", Maxfertility: "2019-2386", Maxpethappiness: "505-597"}),
      'Lava Farming Shoes': createWeaponData('Lava Farming Shoes', 7, [
        createMaterial('Lv 6 Combat Essence', 2, 403),
        createMaterial('Lv 7 Gather Essence', 2, 605)
      ], {Breedingproficiency: "115-133", Plantigproficiency: "115-133", Maxfertility: "2386-2753", Maxpethappiness: "597-688"}),
      'Hollow Farming Shoes': createWeaponData('Hollow Farming Shoes', 8, [
        createMaterial('Lv 7 Combat Essence', 2, 602),
        createMaterial('Lv 8 Gather Essence', 2, 606)
      ], {Breedingproficiency: "133-150", Plantigproficiency: "133-150", Maxfertility: "2753-3120", Maxpethappiness: "688-780"}),
      'Bronze Farming Shoes': createWeaponData('Bronze Farming Shoes', 9, [
        createMaterial('Lv 8 Combat Essence', 2, 603),
        createMaterial('Lv 9 Gather Essence', 2, 607)
      ], {Breedingproficiency: "150-168", Plantigproficiency: "150-168", Maxfertility: "3120-3487", Maxpethappiness: "780-872"}),
      'Farming Pants': createWeaponData('Farming Pants', 1, [
        createMaterial('Lv 1 Gather Essence', 2, 207),
      ], {Breedingproficiency: "9-27", Plantigproficiency: "9-27", Maxfertility: "175-524", Maxpethappiness: "44-131"}),   
      'Farming Pants': createWeaponData('Farming Pants', 2, [
        createMaterial('Lv 1 Combat Essence', 2, 216),
        createMaterial('Lv 2 Gather Essence', 2, 208)
      ], {Breedingproficiency: "27-44", Plantigproficiency: "27-44", Maxfertility: "524-873", Maxpethappiness: "131-218"}), 
      'Farming Pants': createWeaponData('Farming Pants', 3, [
        createMaterial('Lv 2 Combat Essence', 2, 217),
        createMaterial('Lv 3 Gather Essence', 2, 209)
      ], {Breedingproficiency: "44-62", Plantigproficiency: "44-62", Maxfertility: "873-1222", Maxpethappiness: "218-306"}),
      'Golden Farmer Pants': createWeaponData('Golden Farmer Pants', 4, [
        createMaterial('Lv 3 Combat Essence', 2, 218),
        createMaterial('Lv 4 Gather Essence', 2, 404)
      ], {Breedingproficiency: "62-80", Plantigproficiency: "62-80", Maxfertility: "1222-1571", Maxpethappiness: "306-394"}),
      'Diamond Farmer Pants': createWeaponData('Diamond Farmer Pants', 5, [
        createMaterial('Lv 4 Combat Essence', 2, 401),
        createMaterial('Lv 5 Gather Essence', 2, 405)
      ], {Breedingproficiency: "80-97", Plantigproficiency: "80-97", Maxfertility: "1571-1920", Maxpethappiness: "394-482"}),
      'Star Farmer Pants': createWeaponData('Star Farmer Pants', 6, [
        createMaterial('Lv 5 Combat Essence', 2, 402),
        createMaterial('Lv 6 Gather Essence', 2, 406)
      ], {Breedingproficiency: "97-115", Plantigproficiency: "97-115", Maxfertility: "1920-2269", Maxpethappiness: "482-570"}),
      'Lava Farming Pants': createWeaponData('Lava Farming Pants', 7, [
        createMaterial('Lv 6 Combat Essence', 2, 403),
        createMaterial('Lv 7 Gather Essence', 2, 605)
      ], {Breedingproficiency: "115-133", Plantigproficiency: "115-133", Maxfertility: "2269-2618", Maxpethappiness: "570-658"}),
      'Hollow Farming Pants': createWeaponData('Hollow Farming Pants', 8, [
        createMaterial('Lv 7 Combat Essence', 2, 602),
        createMaterial('Lv 8 Gather Essence', 2, 606)
      ], {Breedingproficiency: "133-150", Plantigproficiency: "133-150", Maxfertility: "2618-2967", Maxpethappiness: "658-746"}),
      'Bronze Farming Pants': createWeaponData('Bronze Farming Pants', 9, [
        createMaterial('Lv 8 Combat Essence', 2, 603),
        createMaterial('Lv 9 Gather Essence', 2, 607)
      ], {Breedingproficiency: "150-168", Plantigproficiency: "150-168", Maxfertility: "2967-3316", Maxpethappiness: "746-834"}),
      'Farming Jacket': createWeaponData('Farming Jacket', 1, [
        createMaterial('Lv 1 Gather Essence', 2, 207),
      ], {Breedingproficiency: "6-19", Plantigproficiency: "6-19", Maxfertility: "220-659", Maxpethappiness: "55-165"}),   
      'Farming Jacket': createWeaponData('Farming Jacket', 2, [
        createMaterial('Lv 1 Combat Essence', 2, 216),
        createMaterial('Lv 2 Gather Essence', 2, 208)
      ], {Breedingproficiency: "19-32", Plantigproficiency: "19-32", Maxfertility: "659-1098", Maxpethappiness: "165-275"}), 
      'Farming Jacket': createWeaponData('Farming Jacket', 3, [
        createMaterial('Lv 2 Combat Essence', 2, 217),
        createMaterial('Lv 3 Gather Essence', 2, 209)
      ], {Breedingproficiency: "32-45", Plantigproficiency: "32-45", Maxfertility: "1098-1537", Maxpethappiness: "275-385"}),
      'Golden Farmer Coat': createWeaponData('Golden Farmer Coat', 4, [
        createMaterial('Lv 3 Combat Essence', 2, 218),
        createMaterial('Lv 4 Gather Essence', 2, 404)
      ], {Breedingproficiency: "45-58", Plantigproficiency: "45-58", Maxfertility: "1537-1976", Maxpethappiness: "385-495"}),
      'Diamond Farmer Coat': createWeaponData('Diamond Farmer Coat', 5, [
        createMaterial('Lv 4 Combat Essence', 2, 401),
        createMaterial('Lv 5 Gather Essence', 2, 405)
      ], {Breedingproficiency: "58-71", Plantigproficiency: "58-71", Maxfertility: "1976-2415", Maxpethappiness: "495-605"}),
      'Star Farmer Coat': createWeaponData('Star Farmer Coat', 6, [
        createMaterial('Lv 5 Combat Essence', 2, 402),
        createMaterial('Lv 6 Gather Essence', 2, 406)
      ], {Breedingproficiency: "71-84", Plantigproficiency: "71-84", Maxfertility: "2415-2854", Maxpethappiness: "605-715"}),
      'Lava Farming Coat': createWeaponData('Lava Farming Coat', 7, [
        createMaterial('Lv 6 Combat Essence', 2, 403),
        createMaterial('Lv 7 Gather Essence', 2, 605)
      ], {Breedingproficiency: "84-97", Plantigproficiency: "84-97", Maxfertility: "2854-3293", Maxpethappiness: "715-825"}),
      'Hollow Farming Coat': createWeaponData('Hollow Farming Coat', 8, [
        createMaterial('Lv 7 Combat Essence', 2, 602),
        createMaterial('Lv 8 Gather Essence', 2, 606)
      ], {Breedingproficiency: "97-110", Plantigproficiency: "97-110", Maxfertility: "3293-3732", Maxpethappiness: "825-935"}),
      'Bronze Farming Coat': createWeaponData('Bronze Farming Coat', 9, [
        createMaterial('Lv 8 Combat Essence', 2, 603),
        createMaterial('Lv 9 Gather Essence', 2, 607)
      ], {Breedingproficiency: "110-123", Plantigproficiency: "110-123", Maxfertility: "3732-4171", Maxpethappiness: "935-1045"}),
      'Lucky Clover Hat': createWeaponData('Lucky Clover Hat', 1, [
        createMaterial('Lv 1 Gather Essence', 2, 207),
      ], {Breedingproficiency: "8-25", Plantigproficiency: "8-25", Maxfertility: "184-551", Maxpethappiness: "46-138"}),   
      'Lucky Cotton Hat': createWeaponData('Lucky Cotton Hat', 2, [
        createMaterial('Lv 1 Combat Essence', 2, 216),
        createMaterial('Lv 2 Gather Essence', 2, 208)
      ], {Breedingproficiency: "25-42", Plantigproficiency: "25-42", Maxfertility: "551-918", Maxpethappiness: "138-230"}), 
      'Lucky Hard Hat': createWeaponData('Lucky Hard Hat', 3, [
        createMaterial('Lv 2 Combat Essence', 2, 217),
        createMaterial('Lv 3 Gather Essence', 2, 209)
      ], {Breedingproficiency: "42-59", Plantigproficiency: "42-59", Maxfertility: "918-1285", Maxpethappiness: "230-321"}),
      'Golden Farmer Hat': createWeaponData('Golden Farmer Hat', 4, [
        createMaterial('Lv 3 Combat Essence', 2, 218),
        createMaterial('Lv 4 Gather Essence', 2, 404)
      ], {Breedingproficiency: "59-76", Plantigproficiency: "59-76", Maxfertility: "1285-1625", Maxpethappiness: "321-413"}),
      'Diamond Farmer Hat': createWeaponData('Diamond Farmer Hat', 5, [
        createMaterial('Lv 4 Combat Essence', 2, 401),
        createMaterial('Lv 5 Gather Essence', 2, 405)
      ], {Breedingproficiency: "76-93", Plantigproficiency: "76-93", Maxfertility: "1625-2019", Maxpethappiness: "413-505"}),
      'Star Farmer Hat': createWeaponData('Star Farmer Hat', 6, [
        createMaterial('Lv 5 Combat Essence', 2, 402),
        createMaterial('Lv 6 Gather Essence', 2, 406)
      ], {Breedingproficiency: "93-110", Plantigproficiency: "93-110", Maxfertility: "2019-2386", Maxpethappiness: "505-597"}),
      'Lava Farming Hat': createWeaponData('Lava Farming Hat', 7, [
        createMaterial('Lv 6 Combat Essence', 2, 403),
        createMaterial('Lv 7 Gather Essence', 2, 605)
      ], {Breedingproficiency: "110-127", Plantigproficiency: "110-127", Maxfertility: "2386-2753", Maxpethappiness: "597-688"}),
      'Hollow Farming Hat': createWeaponData('Hollow Farming Hat', 8, [
        createMaterial('Lv 7 Combat Essence', 2, 602),
        createMaterial('Lv 8 Gather Essence', 2, 606)
      ], {Breedingproficiency: "127-144", Plantigproficiency: "127-144", Maxfertility: "2753-3120", Maxpethappiness: "688-780"}),
      'Bronze Farming Hat': createWeaponData('Bronze Farming Hat', 9, [
        createMaterial('Lv 8 Combat Essence', 2, 603),
        createMaterial('Lv 9 Gather Essence', 2, 607)
      ], {Breedingproficiency: "144-161", Plantigproficiency: "144-161", Maxfertility: "3120-3487", Maxpethappiness: "780-872"}),
      'Farming Gloves': createWeaponData('Farming Gloves', 1, [
        createMaterial('Lv 1 Gather Essence', 2, 207),
      ], {Breedingproficiency: "6-19", Plantigproficiency: "6-19", Maxfertility: "139-416", Maxpethappiness: "35-104", Fertilitycapacity: "1-3", Pethappinesscapacity: "1-3"}),   
      'Farming Gloves': createWeaponData('Farming Gloves', 2, [
        createMaterial('Lv 1 Combat Essence', 2, 216),
        createMaterial('Lv 2 Gather Essence', 2, 208)
      ], {Breedingproficiency: "19-32", Plantigproficiency: "19-32", Maxfertility: "416-693", Maxpethappiness: "104-173", Fertilitycapacity: "3-4", Pethappinesscapacity: "3-4"}), 
      'Farming Gloves': createWeaponData('Farming Gloves', 3, [
        createMaterial('Lv 2 Combat Essence', 2, 217),
        createMaterial('Lv 3 Gather Essence', 2, 209)
      ], {Breedingproficiency: "32-45", Plantigproficiency: "32-45", Maxfertility: "693-970", Maxpethappiness: "173-243", Fertilitycapacity: "4-5", Pethappinesscapacity: "4-5"}),
      'Golden Farmer Glove': createWeaponData('Golden Farmer Glove', 4, [
        createMaterial('Lv 3 Combat Essence', 2, 218),
        createMaterial('Lv 4 Gather Essence', 2, 404)
      ], {Breedingproficiency: "45-58", Plantigproficiency: "45-58", Maxfertility: "970-1248", Maxpethappiness: "243-312", Fertilitycapacity: "5-7", Pethappinesscapacity: "5-7"}),
      'Diamond Farmer Glove': createWeaponData('Diamond Farmer Glove', 5, [
        createMaterial('Lv 4 Combat Essence', 2, 401),
        createMaterial('Lv 5 Gather Essence', 2, 405)
      ], {Breedingproficiency: "58-71", Plantigproficiency: "58-71", Maxfertility: "1248-1525", Maxpethappiness: "312-381", Fertilitycapacity: "6-8", Pethappinesscapacity: "6-8"}),
      'Star Farmer Glove': createWeaponData('Star Farmer Glove', 6, [
        createMaterial('Lv 5 Combat Essence', 2, 402),
        createMaterial('Lv 6 Gather Essence', 2, 406)
      ], {Breedingproficiency: "71-84", Plantigproficiency: "71-84", Maxfertility: "1525-1802", Maxpethappiness: "381-450", Fertilitycapacity: "8-9", Pethappinesscapacity: "8-9"}),
      'Lava Farming Glove': createWeaponData('Lava Farming Glove', 7, [
        createMaterial('Lv 6 Combat Essence', 2, 403),
        createMaterial('Lv 7 Gather Essence', 2, 605)
      ], {Breedingproficiency: "84-97", Plantigproficiency: "84-97", Maxfertility: "1802-2079", Maxpethappiness: "450-520", Fertilitycapacity: "9-10", Pethappinesscapacity: "9-10"}),
      'Hollow Farming Glove': createWeaponData('Hollow Farming Glove', 8, [
        createMaterial('Lv 7 Combat Essence', 2, 602),
        createMaterial('Lv 8 Gather Essence', 2, 606)
      ], {Breedingproficiency: "97-110", Plantigproficiency: "97-110", Maxfertility: "2079-2356", Maxpethappiness: "520-589", Fertilitycapacity: "9-10", Pethappinesscapacity: "9-10"}),
      'Bronze Farming Glove': createWeaponData('Bronze Farming Glove', 9, [
        createMaterial('Lv 8 Combat Essence', 2, 603),
        createMaterial('Lv 9 Gather Essence', 2, 607)
      ], {Breedingproficiency: "110-123", Plantigproficiency: "110-123", Maxfertility: "2356-2632", Maxpethappiness: "589-658", Fertilitycapacity: "10-11", Pethappinesscapacity: "10-11"})
    };

    function getImageCode(name) {
      const nameToCode = {
        'Iron Hoe': 80,
        'Curse Hoe': 81,
        'Blessing Hoe': 82,
        'Golden Hoe': 299,
        'Diamond Hoe': 305,
        'Star Hoe': 311,
        'Lava Hoe': 544,
        'Hollow Hoe': 568,
        'Bronze Hoe': 592,
        'Iron Kettle': 84,
        'Curse Kettle': 85,
        'Blessing Kettle': 86,
        'Golden Kettle': 304,
        'Diamond Kettle': 310,
        'Star Kettle': 316,
        'Lava Kettle': 543,
        'Hollow Kettle': 567,
        'Bronze Kettle': 591,
        'Copper Brush': 453,
        'Iron Brush': 454,
        'Crystal Brush': 455,
        'Golden Brush': 456,
        'Diamond Brush': 457,
        'Starlight Brush': 458,
        'Lava Brush': 545,
        'Hollow Brush': 569,
        'Bronze Brush': 593,
        'Lucky Clover Hat': 98,
        'Lucky Cotton Hat': 99,
        'Lucky Hard Hat': 100,
        'Golden Farmer Hat': 350,
        'Diamond Farmer Hat': 355,
        'Star Farmer Hat': 360,
        'Lava Farming Hat': 546,
        'Hollow Farming Hat': 570,
        'Bronze Farming Hat': 594,
        'Farming Shoes1': 110,
        'Farming Shoes2': 111,
        'Farming Shoes3': 112,
        'Golden Farmer Shoes': 354,
        'Diamond Farmer Shoes': 359,
        'Star Farmer Shoes': 364,
        'Lava Farming Shoes': 550,
        'Hollow Farming Shoes': 574,
        'Bronze Farming Shoes': 598,
        'Farming Gloves1': 107,
        'Farming Gloves2': 108,
        'Farming Gloves3': 109,
        'Golden Farmer Glove': 352,
        'Diamond Farmer Glove': 357,
        'Star Farmer Glove': 362,
        'Lava Farming Glove': 549,
        'Hollow Farming Glove': 573,
        'Bronze Farming Glove': 597,
        'Farming Jacket1': 101,
        'Farming Jacket2': 102,
        'Farming Jacket3': 103,
        'Golden Farmer Coat': 351,
        'Diamond Farmer Coat': 356,
        'Star Farmer Coat': 361,
        'Lava Farming Coat': 547,
        'Hollow Farming Coat': 571,
        'Bronze Farming Coat': 595,
        'Farming Pants1': 104,
        'Farming Pants2': 105,
        'Farming Pants3': 106,
        'Golden Farmer Pants': 353,
        'Diamond Farmer Pants': 358,
        'Star Farmer Pants': 363,
        'Lava Farming Pants': 548,
        'Hollow Farming Pants': 572,
        'Bronze Farming Pants': 596
      };
      return nameToCode[name];
    }

    function createWeaponData(name, level, materials, attributes) {
      let alias = "";
      if(name.toLowerCase().includes("farming")){
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
      if(name.toLowerCase().includes("hoe") && !name.toLowerCase().includes("shoe") || name.toLowerCase().includes("kettle") || name.toLowerCase().includes("brush")){
        for (const weaponKey in dataFarmerWeapons.data) {
          // Verifica si el nombre de la arma coincide con alguna entrada
          if (weaponKey.toLowerCase() === normalizedWeaponName.toLowerCase()) {
            return dataFarmerWeapons.data[weaponKey];
          }
        }
      }else{
        for (const weaponKey in dataFarmerClothes.data) {
          // Verifica si el nombre de la arma coincide con alguna entrada
          if (weaponKey.toLowerCase() === normalizedWeaponName.toLowerCase()) {
            return dataFarmerClothes.data[weaponKey];
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

    return NextResponse.json(Farming);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
