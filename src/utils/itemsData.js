const fetchDataEssen = async () => {
  const response = await fetch(
    `${window.location.origin}/api/essence`,
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

const dataEssence = await fetchDataEssen();


const calculateEnergyForMaterial = (material) => {
    const baseEnergy = 15;
    let energyRequired = baseEnergy;

    for (let i = 2; i <= material; i++) {
      energyRequired = baseEnergy + 2 * energyRequired;
    }

    return energyRequired;
  };


function createMaterial(name, quantity, cdnImage, requireLevel) {
  return {
    name: name,
    quantity: quantity,
    cdnImage: `https://icons.lumiterra.net/item-icon-${cdnImage}.png`,
    minpriceRon: getMaterialPrice(name, 'Ron'),
    minpriceUsd: getMaterialPrice(name, 'Usd'),
    requireEnergy: calculateEnergyForMaterial(requireLevel) * quantity
  };
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

function calculateTotalRequireEnergy(materials) {
  return materials.reduce((total, material) => {
    return total + Number(material[`requireEnergy`]);
  }, 0).toFixed(2);
}


const itemsData = {
  combat: [
    {
      name: "Stone Sword",
      alias: "StoneSword",
      prices: { ron: null, usd: null },
      cdnImage:"https://icons.lumiterra.net/item-icon-40.png",
      requiresLevel: 1,
      stats: [
        { name: "combatatt", typeNumber: "integer", values:  {min:40, max:122 }},
        //{ name: "combatcritrate",typeNumber: "percentage",  values: {min: 0, max:0 }}, Atributo con valores ramdons
        { name: "grassatt",typeNumber: "integer",  values: {min: 20, max:25 }},
      ],
      recipe: {
          materials:[
              createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213,1),
              createMaterial('Lv 1 Agricultural Planting Essence', 1, 210,1)
          ],
          minPriceTotalRon: calculateTotalPrice([
              createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213,1),
              createMaterial('Lv 1 Agricultural Planting Essence', 1, 210,1)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
              createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213,1),
              createMaterial('Lv 1 Agricultural Planting Essence', 1, 210,1)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213,1),
            createMaterial('Lv 1 Agricultural Planting Essence', 1, 210,1)
          ])
      },
    },
    {
      name: "Iron Sword",
      alias: "IronSword",
      prices: { ron: null, usd: null },
      cdnImage:"https://icons.lumiterra.net/item-icon-41.png",
      requiresLevel: 2,
      stats: [
        { name: "combatatt", typeNumber: "integer", values:  {min:121, max:203 }},
        //{ name: "combatcritrate",typeNumber: "percentage",  values: {min: 0, max:0 }}, Atributo con valores ramdons
        { name: "grassatt",typeNumber: "integer",  values: {min: 20, max:25 }},
      ],
      recipe: {
          materials:[
            createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214,2),
            createMaterial('Lv 2 Agricultural Planting Essence', 1, 211,2),
            createMaterial('Lv 1 Gather Essence', 2, 207,1)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214,2),
            createMaterial('Lv 2 Agricultural Planting Essence', 1, 211,2),
            createMaterial('Lv 1 Gather Essence', 2, 207,1)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214,2),
            createMaterial('Lv 2 Agricultural Planting Essence', 1, 211,2),
            createMaterial('Lv 1 Gather Essence', 2, 207,1)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214,2),
            createMaterial('Lv 2 Agricultural Planting Essence', 1, 211,2),
            createMaterial('Lv 1 Gather Essence', 2, 207,1)
          ])
      },
    },
    {
      name: "Crystal Sword",
      alias: "CrystalSword",
      prices: { ron: null, usd: null },
      cdnImage:"https://icons.lumiterra.net/item-icon-42.png",
      requiresLevel: 3,
      stats: [
        { name: "combatatt", typeNumber: "integer", values:  {min:202, max:284 }},
        //{ name: "combatcritrate",typeNumber: "percentage",  values: {min: 0, max:0 }}, Atributo con valores ramdons
        { name: "grassatt",typeNumber: "integer",  values: {min: 20, max:25 }},
      ],
      recipe: {
          materials:[
            createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215,3),
            createMaterial('Lv 3 Agricultural Planting Essence', 1, 212,3),
            createMaterial('Lv 2 Gather Essence', 2, 208,2)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215,3),
            createMaterial('Lv 3 Agricultural Planting Essence', 1, 212,3),
            createMaterial('Lv 2 Gather Essence', 2, 208,2)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215,3),
            createMaterial('Lv 3 Agricultural Planting Essence', 1, 212,3),
            createMaterial('Lv 2 Gather Essence', 2, 208,2)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215,3),
            createMaterial('Lv 3 Agricultural Planting Essence', 1, 212,3),
            createMaterial('Lv 2 Gather Essence', 2, 208,2)
          ])
      },
    },
    {
      name: "Golden Sword",
      alias: "GoldenSword",
      prices: { ron: null, usd: null },
      cdnImage:"https://icons.lumiterra.net/item-icon-317.png",
      requiresLevel: 4,
      stats: [
        { name: "combatatt", typeNumber: "integer", values:  {min:283, max:365 }},
        //{ name: "combatcritrate",typeNumber: "percentage",  values: {min: 0, max:0 }}, Atributo con valores ramdons
        { name: "grassatt",typeNumber: "integer",  values: {min: 20, max:25 }},
      ],
      recipe: {
          materials:[
            createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410,4),
            createMaterial('Lv 4 Agricultural Planting Essence', 1, 407,4),
            createMaterial('Lv 3 Gather Essence', 2, 209,3)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410,4),
            createMaterial('Lv 4 Agricultural Planting Essence', 1, 407,4),
            createMaterial('Lv 3 Gather Essence', 2, 209,3)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410,4),
            createMaterial('Lv 4 Agricultural Planting Essence', 1, 407,4),
            createMaterial('Lv 3 Gather Essence', 2, 209,3)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410,4),
            createMaterial('Lv 4 Agricultural Planting Essence', 1, 407,4),
            createMaterial('Lv 3 Gather Essence', 2, 209,3)
          ])
      },
    },
    {
      name: "Diamond Sword",
      alias: "DiamondSword",
      prices: { ron: null, usd: null },
      cdnImage:"https://icons.lumiterra.net/item-icon-318.png",
      requiresLevel: 5,
      stats: [
        { name: "combatatt", typeNumber: "integer", values:  {min:364, max:446 }},
        //{ name: "combatcritrate",typeNumber: "percentage",  values: {min: 0, max:0 }}, Atributo con valores ramdons
        { name: "grassatt",typeNumber: "integer",  values: {min: 20, max:25 }},
      ],
      recipe: {
          materials:[
            createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411,5),
            createMaterial('Lv 5 Agricultural Planting Essence', 1, 408,5),
            createMaterial('Lv 4 Gather Essence', 2, 404,4)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411,5),
            createMaterial('Lv 5 Agricultural Planting Essence', 1, 408,5),
            createMaterial('Lv 4 Gather Essence', 2, 404,4)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411,5),
            createMaterial('Lv 5 Agricultural Planting Essence', 1, 408,5),
            createMaterial('Lv 4 Gather Essence', 2, 404,4)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411,5),
            createMaterial('Lv 5 Agricultural Planting Essence', 1, 408,5),
            createMaterial('Lv 4 Gather Essence', 2, 404,4)
          ])
      },
    },
    {
      name: "Star Sword",
      alias: "StarSword",
      prices: { ron: null, usd: null },
      cdnImage:"https://icons.lumiterra.net/item-icon-319.png",
      requiresLevel: 6,
      stats: [
        { name: "combatatt", typeNumber: "integer", values:  {min:445, max:527 }},
        //{ name: "combatcritrate",typeNumber: "percentage",  values: {min: 0, max:0 }}, Atributo con valores ramdons
        { name: "grassatt",typeNumber: "integer",  values: {min: 20, max:25 }},
      ],
      recipe: {
          materials:[
            createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412,6),
            createMaterial('Lv 6 Agricultural Planting Essence', 1, 409,6),
            createMaterial('Lv 5 Gather Essence', 2, 405,5)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412,6),
            createMaterial('Lv 6 Agricultural Planting Essence', 1, 409,6),
            createMaterial('Lv 5 Gather Essence', 2, 405,5)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412,6),
            createMaterial('Lv 6 Agricultural Planting Essence', 1, 409,6),
            createMaterial('Lv 5 Gather Essence', 2, 405,5)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412,6),
            createMaterial('Lv 6 Agricultural Planting Essence', 1, 409,6),
            createMaterial('Lv 5 Gather Essence', 2, 405,5)
          ])
      },
    },
    {
      name: "Lava Sword",
      alias: "LavaSword",
      prices: { ron: null, usd: null },
      cdnImage:"https://icons.lumiterra.net/item-icon-527.png",
      requiresLevel: 7,
      stats: [
        { name: "combatatt", typeNumber: "integer", values:  {min:526, max:608 }},
        //{ name: "combatcritrate",typeNumber: "percentage",  values: {min: 0, max:0 }}, Atributo con valores ramdons
        { name: "grassatt",typeNumber: "integer",  values: {min: 20, max:25 }},
      ],
      recipe: {
          materials:[
            createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611,7),
            createMaterial('Lv 7 Agricultural Planting Essence', 1, 608,7),
            createMaterial('Lv 6 Gather Essence', 2, 406,6)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611,7),
            createMaterial('Lv 7 Agricultural Planting Essence', 1, 608,7),
            createMaterial('Lv 6 Gather Essence', 2, 406,6)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611,7),
            createMaterial('Lv 7 Agricultural Planting Essence', 1, 608,7),
            createMaterial('Lv 6 Gather Essence', 2, 406,6)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611,7),
            createMaterial('Lv 7 Agricultural Planting Essence', 1, 608,7),
            createMaterial('Lv 5 Gather Essence', 2, 405,6)
          ])
      },
    },
    {
      name: "Hollow Sword",
      alias: "HollowSword",
      prices: { ron: null, usd: null },
      cdnImage:"https://icons.lumiterra.net/item-icon-551.png",
      requiresLevel: 8,
      stats: [
        { name: "combatatt", typeNumber: "integer", values:  {min:607, max:689 }},
        //{ name: "combatcritrate",typeNumber: "percentage",  values: {min: 0, max:0 }}, Atributo con valores ramdons
        { name: "grassatt",typeNumber: "integer",  values: {min: 20, max:25 }},
      ],
      recipe: {
          materials:[
            createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612,8),
            createMaterial('Lv 8 Agricultural Planting Essence', 1, 609,8),
            createMaterial('Lv 7 Gather Essence', 2, 406,7)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612,8),
            createMaterial('Lv 8 Agricultural Planting Essence', 1, 609,8),
            createMaterial('Lv 7 Gather Essence', 2, 406,7)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612,8),
            createMaterial('Lv 8 Agricultural Planting Essence', 1, 609,8),
            createMaterial('Lv 7 Gather Essence', 2, 406,7)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612,8),
            createMaterial('Lv 8 Agricultural Planting Essence', 1, 609,8),
            createMaterial('Lv 7 Gather Essence', 2, 406,7)
          ])
      },
    },
    {
      name: "Bronze Sword",
      alias: "BronzeSword",
      prices: { ron: null, usd: null },
      cdnImage:"https://icons.lumiterra.net/item-icon-575.png",
      requiresLevel: 9,
      stats: [
        { name: "combatatt", typeNumber: "integer", values:  {min:688, max:753 }},
        //{ name: "combatcritrate",typeNumber: "percentage",  values: {min: 0, max:0 }}, Atributo con valores ramdons
        { name: "grassatt",typeNumber: "integer",  values: {min: 20, max:25 }},
      ],
      recipe: {
          materials:[
            createMaterial('Lv 9 Agricultural Livestock Essence', 1, 613,9),
            createMaterial('Lv 9 Agricultural Planting Essence', 1, 610,9),
            createMaterial('Lv 8 Gather Essence', 2, 606,8)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 9 Agricultural Livestock Essence', 1, 613,9),
            createMaterial('Lv 9 Agricultural Planting Essence', 1, 610,9),
            createMaterial('Lv 8 Gather Essence', 2, 606,8)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 9 Agricultural Livestock Essence', 1, 613,9),
            createMaterial('Lv 9 Agricultural Planting Essence', 1, 610,9),
            createMaterial('Lv 8 Gather Essence', 2, 606,8)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 9 Agricultural Livestock Essence', 1, 613,9),
            createMaterial('Lv 9 Agricultural Planting Essence', 1, 610,9),
            createMaterial('Lv 8 Gather Essence', 2, 606,8)
          ])
      },
    },
    {
      name: "Stone Bow",
      alias: "StoneBow",
      prices: { ron: null, usd: null },
      cdnImage:"https://icons.lumiterra.net/item-icon-287.png",
      requiresLevel: 1,
      stats: [
        { name: "combatatt", typeNumber: "integer", values:  {min:40, max:122 }},
        //{ name: "combatcritrate",typeNumber: "percentage",  values: {min: 0, max:0 }}, Atributo con valores ramdons
        { name: "Combathit",typeNumber: "integer",  values: {min: 0, max:5 }},
      ],
      recipe: {
          materials:[
              createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213,1),
              createMaterial('Lv 1 Agricultural Planting Essence', 1, 210,1)
          ],
          minPriceTotalRon: calculateTotalPrice([
              createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213,1),
              createMaterial('Lv 1 Agricultural Planting Essence', 1, 210,1)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
              createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213,1),
              createMaterial('Lv 1 Agricultural Planting Essence', 1, 210,1)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213,1),
            createMaterial('Lv 1 Agricultural Planting Essence', 1, 210,1)
          ])
      },
    },
    {
      name: "Metal Bow",
      alias: "MetalBow",
      prices: { ron: null, usd: null },
      cdnImage:"https://icons.lumiterra.net/item-icon-288.png",
      requiresLevel: 2,
      stats: [
        { name: "combatatt", typeNumber: "integer", values:  {min:121, max:203 }},
        //{ name: "combatcritrate",typeNumber: "percentage",  values: {min: 0, max:0 }}, Atributo con valores ramdons
        { name: "Combathit",typeNumber: "integer",  values: {min: 5, max:10 }},
      ],
      recipe: {
          materials:[
            createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214,2),
            createMaterial('Lv 2 Agricultural Planting Essence', 1, 211,2),
            createMaterial('Lv 1 Gather Essence', 2, 207,1)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214,2),
            createMaterial('Lv 2 Agricultural Planting Essence', 1, 211,2),
            createMaterial('Lv 1 Gather Essence', 2, 207,1)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214,2),
            createMaterial('Lv 2 Agricultural Planting Essence', 1, 211,2),
            createMaterial('Lv 1 Gather Essence', 2, 207,1)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214,2),
            createMaterial('Lv 2 Agricultural Planting Essence', 1, 211,2),
            createMaterial('Lv 1 Gather Essence', 2, 207,1)
          ])
      },
    },
    {
      name: "Crystal Bow",
      alias: "CrystalBow",
      prices: { ron: null, usd: null },
      cdnImage:"https://icons.lumiterra.net/item-icon-289.png",
      requiresLevel: 3,
      stats: [
        { name: "combatatt", typeNumber: "integer", values:  {min:202, max:284 }},
        //{ name: "combatcritrate",typeNumber: "percentage",  values: {min: 0, max:0 }}, Atributo con valores ramdons
        { name: "Combathit",typeNumber: "integer",  values: {min: 10, max:15 }},
      ],
      recipe: {
          materials:[
            createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215,3),
            createMaterial('Lv 3 Agricultural Planting Essence', 1, 212,3),
            createMaterial('Lv 2 Gather Essence', 2, 208,2)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215,3),
            createMaterial('Lv 3 Agricultural Planting Essence', 1, 212,3),
            createMaterial('Lv 2 Gather Essence', 2, 208,2)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215,3),
            createMaterial('Lv 3 Agricultural Planting Essence', 1, 212,3),
            createMaterial('Lv 2 Gather Essence', 2, 208,2)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215,3),
            createMaterial('Lv 3 Agricultural Planting Essence', 1, 212,3),
            createMaterial('Lv 2 Gather Essence', 2, 208,2)
          ])
      },
    },
    {
      name: "Golden Bow",
      alias: "GoldenBow",
      prices: { ron: null, usd: null },
      cdnImage:"https://icons.lumiterra.net/item-icon-450.png",
      requiresLevel: 4,
      stats: [
        { name: "combatatt", typeNumber: "integer", values:  {min:283, max:365 }},
        //{ name: "combatcritrate",typeNumber: "percentage",  values: {min: 0, max:0 }}, Atributo con valores ramdons
        { name: "Combathit",typeNumber: "integer",  values: {min: 15, max:20 }},
      ],
      recipe: {
          materials:[
            createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410,4),
            createMaterial('Lv 4 Agricultural Planting Essence', 1, 407,4),
            createMaterial('Lv 3 Gather Essence', 2, 209,3)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410,4),
            createMaterial('Lv 4 Agricultural Planting Essence', 1, 407,4),
            createMaterial('Lv 3 Gather Essence', 2, 209,3)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410,4),
            createMaterial('Lv 4 Agricultural Planting Essence', 1, 407,4),
            createMaterial('Lv 3 Gather Essence', 2, 209,3)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410,4),
            createMaterial('Lv 4 Agricultural Planting Essence', 1, 407,4),
            createMaterial('Lv 3 Gather Essence', 2, 209,3)
          ])
      },
    },
    {
      name: "Diamond Bow",
      alias: "DiamondBow",
      prices: { ron: null, usd: null },
      cdnImage:"https://icons.lumiterra.net/item-icon-451.png",
      requiresLevel: 5,
      stats: [
        { name: "combatatt", typeNumber: "integer", values:  {min:364, max:446 }},
        //{ name: "combatcritrate",typeNumber: "percentage",  values: {min: 0, max:0 }}, Atributo con valores ramdons
        { name: "Combathit",typeNumber: "integer",  values: {min: 20, max:25 }},
      ],
      recipe: {
          materials:[
            createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411,5),
            createMaterial('Lv 5 Agricultural Planting Essence', 1, 408,5),
            createMaterial('Lv 4 Gather Essence', 2, 404,4)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411,5),
            createMaterial('Lv 5 Agricultural Planting Essence', 1, 408,5),
            createMaterial('Lv 4 Gather Essence', 2, 404,4)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411,5),
            createMaterial('Lv 5 Agricultural Planting Essence', 1, 408,5),
            createMaterial('Lv 4 Gather Essence', 2, 404,4)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411,5),
            createMaterial('Lv 5 Agricultural Planting Essence', 1, 408,5),
            createMaterial('Lv 4 Gather Essence', 2, 404,4)
          ])
      },
    },
    {
      name: "Starlight Bow",
      alias: "StarlightBow",
      prices: { ron: null, usd: null },
      cdnImage:"https://icons.lumiterra.net/item-icon-452.png",
      requiresLevel: 6,
      stats: [
        { name: "combatatt", typeNumber: "integer", values:  {min:445, max:527 }},
        //{ name: "combatcritrate",typeNumber: "percentage",  values: {min: 0, max:0 }}, Atributo con valores ramdons
        { name: "Combathit",typeNumber: "integer",  values: {min: 25, max:30 }},
      ],
      recipe: {
          materials:[
            createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412,6),
            createMaterial('Lv 6 Agricultural Planting Essence', 1, 409,6),
            createMaterial('Lv 5 Gather Essence', 2, 405,5)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412,6),
            createMaterial('Lv 6 Agricultural Planting Essence', 1, 409,6),
            createMaterial('Lv 5 Gather Essence', 2, 405,5)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412,6),
            createMaterial('Lv 6 Agricultural Planting Essence', 1, 409,6),
            createMaterial('Lv 5 Gather Essence', 2, 405,5)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412,6),
            createMaterial('Lv 6 Agricultural Planting Essence', 1, 409,6),
            createMaterial('Lv 5 Gather Essence', 2, 405,5)
          ])
      },
    },
    {
      name: "Lava Bow",
      alias: "LavaBow",
      prices: { ron: null, usd: null },
      cdnImage:"https://icons.lumiterra.net/item-icon-529.png",
      requiresLevel: 7,
      stats: [
        { name: "combatatt", typeNumber: "integer", values:  {min:526, max:608 }},
        //{ name: "combatcritrate",typeNumber: "percentage",  values: {min: 0, max:0 }}, Atributo con valores ramdons
        { name: "Combathit",typeNumber: "integer",  values: {min: 30, max:35 }},
      ],
      recipe: {
          materials:[
            createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611,7),
            createMaterial('Lv 7 Agricultural Planting Essence', 1, 608,7),
            createMaterial('Lv 6 Gather Essence', 2, 406,6)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611,7),
            createMaterial('Lv 7 Agricultural Planting Essence', 1, 608,7),
            createMaterial('Lv 6 Gather Essence', 2, 406,6)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611,7),
            createMaterial('Lv 7 Agricultural Planting Essence', 1, 608,7),
            createMaterial('Lv 6 Gather Essence', 2, 406,6)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611,7),
            createMaterial('Lv 7 Agricultural Planting Essence', 1, 608,7),
            createMaterial('Lv 5 Gather Essence', 2, 405,6)
          ])
      },
    },
    {
      name: "Hollow Bow",
      alias: "HollowBow",
      prices: { ron: null, usd: null },
      cdnImage:"https://icons.lumiterra.net/item-icon-553.png",
      requiresLevel: 8,
      stats: [
        { name: "combatatt", typeNumber: "integer", values:  {min:607, max:689 }},
        //{ name: "combatcritrate",typeNumber: "percentage",  values: {min: 0, max:0 }}, Atributo con valores ramdons
        { name: "Combathit",typeNumber: "integer",  values: {min: 35, max:40 }},
      ],
      recipe: {
          materials:[
            createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612,8),
            createMaterial('Lv 8 Agricultural Planting Essence', 1, 609,8),
            createMaterial('Lv 7 Gather Essence', 2, 406,7)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612,8),
            createMaterial('Lv 8 Agricultural Planting Essence', 1, 609,8),
            createMaterial('Lv 7 Gather Essence', 2, 406,7)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612,8),
            createMaterial('Lv 8 Agricultural Planting Essence', 1, 609,8),
            createMaterial('Lv 7 Gather Essence', 2, 406,7)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612,8),
            createMaterial('Lv 8 Agricultural Planting Essence', 1, 609,8),
            createMaterial('Lv 7 Gather Essence', 2, 406,7)
          ])
      },
    },
    {
      name: "Bronze Bow",
      alias: "BronzeBow",
      prices: { ron: null, usd: null },
      cdnImage:"https://icons.lumiterra.net/item-icon-577.png",
      requiresLevel: 9,
      stats: [
        { name: "combatatt", typeNumber: "integer", values:  {min:688, max:753 }},
        //{ name: "combatcritrate",typeNumber: "percentage",  values: {min: 0, max:0 }}, Atributo con valores ramdons
        { name: "Combathit",typeNumber: "integer",  values: {min: 40, max:45 }},
      ],
      recipe: {
          materials:[
            createMaterial('Lv 9 Agricultural Livestock Essence', 1, 613,9),
            createMaterial('Lv 9 Agricultural Planting Essence', 1, 610,9),
            createMaterial('Lv 8 Gather Essence', 2, 606,8)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 9 Agricultural Livestock Essence', 1, 613,9),
            createMaterial('Lv 9 Agricultural Planting Essence', 1, 610,9),
            createMaterial('Lv 8 Gather Essence', 2, 606,8)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 9 Agricultural Livestock Essence', 1, 613,9),
            createMaterial('Lv 9 Agricultural Planting Essence', 1, 610,9),
            createMaterial('Lv 8 Gather Essence', 2, 606,8)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 9 Agricultural Livestock Essence', 1, 613,9),
            createMaterial('Lv 9 Agricultural Planting Essence', 1, 610,9),
            createMaterial('Lv 8 Gather Essence', 2, 606,8)
          ])
      },
    },
    {
      name: "Copper Hammer",
      alias: "CopperHammer",
      prices: { ron: null, usd: null },
      cdnImage:"https://icons.lumiterra.net/item-icon-441.png",
      requiresLevel: 1,
      stats: [
        { name: "combatatt", typeNumber: "integer", values:  {min:40, max:122 }},
        //{ name: "combatcritrate",typeNumber: "percentage",  values: {min: 0, max:0 }}, Atributo con valores ramdons
        { name: "Combathit",typeNumber: "integer",  values: {min: 0, max:5 }},
      ],
      recipe: {
          materials:[
              createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213,1),
              createMaterial('Lv 1 Agricultural Planting Essence', 1, 210,1)
          ],
          minPriceTotalRon: calculateTotalPrice([
              createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213,1),
              createMaterial('Lv 1 Agricultural Planting Essence', 1, 210,1)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
              createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213,1),
              createMaterial('Lv 1 Agricultural Planting Essence', 1, 210,1)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213,1),
            createMaterial('Lv 1 Agricultural Planting Essence', 1, 210,1)
          ])
      },
    },
    {
      name: "Iron Hammer",
      alias: "IronHammer",
      prices: { ron: null, usd: null },
      cdnImage:"https://icons.lumiterra.net/item-icon-442.png",
      requiresLevel: 2,
      stats: [
        { name: "combatatt", typeNumber: "integer", values:  {min:121, max:203 }},
        //{ name: "combatcritrate",typeNumber: "percentage",  values: {min: 0, max:0 }}, Atributo con valores ramdons
        { name: "Combathit",typeNumber: "integer",  values: {min: 5, max:10 }},
      ],
      recipe: {
          materials:[
            createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214,2),
            createMaterial('Lv 2 Agricultural Planting Essence', 1, 211,2),
            createMaterial('Lv 1 Gather Essence', 2, 207,1)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214,2),
            createMaterial('Lv 2 Agricultural Planting Essence', 1, 211,2),
            createMaterial('Lv 1 Gather Essence', 2, 207,1)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214,2),
            createMaterial('Lv 2 Agricultural Planting Essence', 1, 211,2),
            createMaterial('Lv 1 Gather Essence', 2, 207,1)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214,2),
            createMaterial('Lv 2 Agricultural Planting Essence', 1, 211,2),
            createMaterial('Lv 1 Gather Essence', 2, 207,1)
          ])
      },
    },
    {
      name: "Crystal Hammer",
      alias: "CrystalHammer",
      prices: { ron: null, usd: null },
      cdnImage:"https://icons.lumiterra.net/item-icon-443.png",
      requiresLevel: 3,
      stats: [
        { name: "combatatt", typeNumber: "integer", values:  {min:202, max:284 }},
        //{ name: "combatcritrate",typeNumber: "percentage",  values: {min: 0, max:0 }}, Atributo con valores ramdons
        { name: "Combathit",typeNumber: "integer",  values: {min: 10, max:15 }},
      ],
      recipe: {
          materials:[
            createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215,3),
            createMaterial('Lv 3 Agricultural Planting Essence', 1, 212,3),
            createMaterial('Lv 2 Gather Essence', 2, 208,2)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215,3),
            createMaterial('Lv 3 Agricultural Planting Essence', 1, 212,3),
            createMaterial('Lv 2 Gather Essence', 2, 208,2)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215,3),
            createMaterial('Lv 3 Agricultural Planting Essence', 1, 212,3),
            createMaterial('Lv 2 Gather Essence', 2, 208,2)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215,3),
            createMaterial('Lv 3 Agricultural Planting Essence', 1, 212,3),
            createMaterial('Lv 2 Gather Essence', 2, 208,2)
          ])
      },
    },
    {
      name: "Golden Hammer",
      alias: "GoldenHammer",
      prices: { ron: null, usd: null },
      cdnImage:"https://icons.lumiterra.net/item-icon-444.png",
      requiresLevel: 4,
      stats: [
        { name: "combatatt", typeNumber: "integer", values:  {min:283, max:365 }},
        //{ name: "combatcritrate",typeNumber: "percentage",  values: {min: 0, max:0 }}, Atributo con valores ramdons
        { name: "Combathit",typeNumber: "integer",  values: {min: 15, max:20 }},
      ],
      recipe: {
          materials:[
            createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410,4),
            createMaterial('Lv 4 Agricultural Planting Essence', 1, 407,4),
            createMaterial('Lv 3 Gather Essence', 2, 209,3)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410,4),
            createMaterial('Lv 4 Agricultural Planting Essence', 1, 407,4),
            createMaterial('Lv 3 Gather Essence', 2, 209,3)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410,4),
            createMaterial('Lv 4 Agricultural Planting Essence', 1, 407,4),
            createMaterial('Lv 3 Gather Essence', 2, 209,3)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410,4),
            createMaterial('Lv 4 Agricultural Planting Essence', 1, 407,4),
            createMaterial('Lv 3 Gather Essence', 2, 209,3)
          ])
      },
    },
    {
      name: "Diamond Hammer",
      alias: "DiamondHammer",
      prices: { ron: null, usd: null },
      cdnImage:"https://icons.lumiterra.net/item-icon-445.png",
      requiresLevel: 5,
      stats: [
        { name: "combatatt", typeNumber: "integer", values:  {min:364, max:446 }},
        //{ name: "combatcritrate",typeNumber: "percentage",  values: {min: 0, max:0 }}, Atributo con valores ramdons
        { name: "Combathit",typeNumber: "integer",  values: {min: 20, max:25 }},
      ],
      recipe: {
          materials:[
            createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411,5),
            createMaterial('Lv 5 Agricultural Planting Essence', 1, 408,5),
            createMaterial('Lv 4 Gather Essence', 2, 404,4)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411,5),
            createMaterial('Lv 5 Agricultural Planting Essence', 1, 408,5),
            createMaterial('Lv 4 Gather Essence', 2, 404,4)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411,5),
            createMaterial('Lv 5 Agricultural Planting Essence', 1, 408,5),
            createMaterial('Lv 4 Gather Essence', 2, 404,4)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411,5),
            createMaterial('Lv 5 Agricultural Planting Essence', 1, 408,5),
            createMaterial('Lv 4 Gather Essence', 2, 404,4)
          ])
      },
    },
    {
      name: "Starlight Hammer",
      alias: "StarlightHammer",
      prices: { ron: null, usd: null },
      cdnImage:"https://icons.lumiterra.net/item-icon-446.png",
      requiresLevel: 6,
      stats: [
        { name: "combatatt", typeNumber: "integer", values:  {min:445, max:527 }},
        //{ name: "combatcritrate",typeNumber: "percentage",  values: {min: 0, max:0 }}, Atributo con valores ramdons
        { name: "Combathit",typeNumber: "integer",  values: {min: 25, max:30 }},
      ],
      recipe: {
          materials:[
            createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412,6),
            createMaterial('Lv 6 Agricultural Planting Essence', 1, 409,6),
            createMaterial('Lv 5 Gather Essence', 2, 405,5)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412,6),
            createMaterial('Lv 6 Agricultural Planting Essence', 1, 409,6),
            createMaterial('Lv 5 Gather Essence', 2, 405,5)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412,6),
            createMaterial('Lv 6 Agricultural Planting Essence', 1, 409,6),
            createMaterial('Lv 5 Gather Essence', 2, 405,5)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412,6),
            createMaterial('Lv 6 Agricultural Planting Essence', 1, 409,6),
            createMaterial('Lv 5 Gather Essence', 2, 405,5)
          ])
      },
    },
    {
      name: "Lava Hammer",
      alias: "LavaHammer",
      prices: { ron: null, usd: null },
      cdnImage:"https://icons.lumiterra.net/item-icon-528.png",
      requiresLevel: 7,
      stats: [
        { name: "combatatt", typeNumber: "integer", values:  {min:526, max:608 }},
        //{ name: "combatcritrate",typeNumber: "percentage",  values: {min: 0, max:0 }}, Atributo con valores ramdons
        { name: "Combathit",typeNumber: "integer",  values: {min: 30, max:35 }},
      ],
      recipe: {
          materials:[
            createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611,7),
            createMaterial('Lv 7 Agricultural Planting Essence', 1, 608,7),
            createMaterial('Lv 6 Gather Essence', 2, 406,6)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611,7),
            createMaterial('Lv 7 Agricultural Planting Essence', 1, 608,7),
            createMaterial('Lv 6 Gather Essence', 2, 406,6)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611,7),
            createMaterial('Lv 7 Agricultural Planting Essence', 1, 608,7),
            createMaterial('Lv 6 Gather Essence', 2, 406,6)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611,7),
            createMaterial('Lv 7 Agricultural Planting Essence', 1, 608,7),
            createMaterial('Lv 5 Gather Essence', 2, 405,6)
          ])
      },
    },
    {
      name: "Hollow Hammer",
      alias: "HollowHammer",
      prices: { ron: null, usd: null },
      cdnImage:"https://icons.lumiterra.net/item-icon-552.png",
      requiresLevel: 8,
      stats: [
        { name: "combatatt", typeNumber: "integer", values:  {min:607, max:689 }},
        //{ name: "combatcritrate",typeNumber: "percentage",  values: {min: 0, max:0 }}, Atributo con valores ramdons
        { name: "Combathit",typeNumber: "integer",  values: {min: 35, max:40 }},
      ],
      recipe: {
          materials:[
            createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612,8),
            createMaterial('Lv 8 Agricultural Planting Essence', 1, 609,8),
            createMaterial('Lv 7 Gather Essence', 2, 406,7)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612,8),
            createMaterial('Lv 8 Agricultural Planting Essence', 1, 609,8),
            createMaterial('Lv 7 Gather Essence', 2, 406,7)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612,8),
            createMaterial('Lv 8 Agricultural Planting Essence', 1, 609,8),
            createMaterial('Lv 7 Gather Essence', 2, 406,7)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612,8),
            createMaterial('Lv 8 Agricultural Planting Essence', 1, 609,8),
            createMaterial('Lv 7 Gather Essence', 2, 406,7)
          ])
      },
    },
    {
      name: "Bronze Hammer",
      alias: "BronzeHammer",
      prices: { ron: null, usd: null },
      cdnImage:"https://icons.lumiterra.net/item-icon-576.png",
      requiresLevel: 9,
      stats: [
        { name: "combatatt", typeNumber: "integer", values:  {min:688, max:753 }},
        //{ name: "combatcritrate",typeNumber: "percentage",  values: {min: 0, max:0 }}, Atributo con valores ramdons
        { name: "Combathit",typeNumber: "integer",  values: {min: 40, max:45 }},
      ],
      recipe: {
          materials:[
            createMaterial('Lv 9 Agricultural Livestock Essence', 1, 613,9),
            createMaterial('Lv 9 Agricultural Planting Essence', 1, 610,9),
            createMaterial('Lv 8 Gather Essence', 2, 606,8)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 9 Agricultural Livestock Essence', 1, 613,9),
            createMaterial('Lv 9 Agricultural Planting Essence', 1, 610,9),
            createMaterial('Lv 8 Gather Essence', 2, 606,8)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 9 Agricultural Livestock Essence', 1, 613,9),
            createMaterial('Lv 9 Agricultural Planting Essence', 1, 610,9),
            createMaterial('Lv 8 Gather Essence', 2, 606,8)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 9 Agricultural Livestock Essence', 1, 613,9),
            createMaterial('Lv 9 Agricultural Planting Essence', 1, 610,9),
            createMaterial('Lv 8 Gather Essence', 2, 606,8)
          ])
      },
    },
    {
      name: "Cracked Crystal Grass Shoes",
      alias: "CrackedCrystalGrassShoes",
      prices: { ron: null, usd: null },
      cdnImage:"https://icons.lumiterra.net/item-icon-55.png",
      requiresLevel: 1,
      stats: [
        { name: "Combatdef", typeNumber: "integer", values:  {min:9, max:27 }},
        { name: "Movespd",typeNumber: "integer",  values: {min: 5, max:10 }},
        { name: "Maxhp",typeNumber: "integer",  values: {min: 36, max:110 }},
      ],
      recipe: {
          materials:[
              createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213,1),
              createMaterial('Lv 1 Agricultural Planting Essence', 1, 210,1)
          ],
          minPriceTotalRon: calculateTotalPrice([
              createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213,1),
              createMaterial('Lv 1 Agricultural Planting Essence', 1, 210,1)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
              createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213,1),
              createMaterial('Lv 1 Agricultural Planting Essence', 1, 210,1)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213,1),
            createMaterial('Lv 1 Agricultural Planting Essence', 1, 210,1)
          ])
      },
    },
    {
      name: "Crystal Skin Boots",
      alias: "CrystalSkinBoots",
      prices: { ron: null, usd: null },
      cdnImage:"https://icons.lumiterra.net/item-icon-56.png",
      requiresLevel: 2,
      stats: [
        { name: "Combatdef", typeNumber: "integer", values:  {min:28, max:46 }},
        { name: "Movespd",typeNumber: "integer",  values: {min: 15, max:20 }},
        { name: "Maxhp",typeNumber: "integer",  values: {min: 105, max:179 }},
      ],
      recipe: {
          materials:[
            createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214,2),
            createMaterial('Lv 2 Agricultural Planting Essence', 1, 211,2),
            createMaterial('Lv 1 Gather Essence', 2, 207,1)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214,2),
            createMaterial('Lv 2 Agricultural Planting Essence', 1, 211,2),
            createMaterial('Lv 1 Gather Essence', 2, 207,1)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214,2),
            createMaterial('Lv 2 Agricultural Planting Essence', 1, 211,2),
            createMaterial('Lv 1 Gather Essence', 2, 207,1)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214,2),
            createMaterial('Lv 2 Agricultural Planting Essence', 1, 211,2),
            createMaterial('Lv 1 Gather Essence', 2, 207,1)
          ])
      },
    },
    {
      name: "Crystal Stone Shoes",
      alias: "CrystalStoneShoes",
      prices: { ron: null, usd: null },
      cdnImage:"https://icons.lumiterra.net/item-icon-57.png",
      requiresLevel: 3,
      stats: [
        { name: "Combatdef", typeNumber: "integer", values:  {min:46, max:64 }},
        { name: "Movespd",typeNumber: "integer",  values: {min: 30, max:35 }},
        { name: "Maxhp",typeNumber: "integer",  values: {min: 175, max:249 }},
      ],
      recipe: {
          materials:[
            createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215,3),
            createMaterial('Lv 3 Agricultural Planting Essence', 1, 212,3),
            createMaterial('Lv 2 Gather Essence', 2, 208,2)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215,3),
            createMaterial('Lv 3 Agricultural Planting Essence', 1, 212,3),
            createMaterial('Lv 2 Gather Essence', 2, 208,2)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215,3),
            createMaterial('Lv 3 Agricultural Planting Essence', 1, 212,3),
            createMaterial('Lv 2 Gather Essence', 2, 208,2)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215,3),
            createMaterial('Lv 3 Agricultural Planting Essence', 1, 212,3),
            createMaterial('Lv 2 Gather Essence', 2, 208,2)
          ])
      },
    },
    {
      name: "Golden Fighter Shoes",
      alias: "GoldenFighterShoes",
      prices: { ron: null, usd: null },
      cdnImage:"https://icons.lumiterra.net/item-icon-339.png",
      requiresLevel: 4,
      stats: [
        { name: "Combatdef", typeNumber: "integer", values:  {min:64, max:82 }},
        { name: "Movespd",typeNumber: "integer",  values: {min: 40, max:64 }},
        { name: "Maxhp",typeNumber: "integer",  values: {min: 244, max:318 }},
      ],
      recipe: {
          materials:[
            createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410,4),
            createMaterial('Lv 4 Agricultural Planting Essence', 1, 407,4),
            createMaterial('Lv 3 Gather Essence', 2, 209,3)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410,4),
            createMaterial('Lv 4 Agricultural Planting Essence', 1, 407,4),
            createMaterial('Lv 3 Gather Essence', 2, 209,3)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410,4),
            createMaterial('Lv 4 Agricultural Planting Essence', 1, 407,4),
            createMaterial('Lv 3 Gather Essence', 2, 209,3)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410,4),
            createMaterial('Lv 4 Agricultural Planting Essence', 1, 407,4),
            createMaterial('Lv 3 Gather Essence', 2, 209,3)
          ])
      },
    },
    {
      name: "Diamond Fighter Shoes",
      alias: "DiamondFighterShoes",
      prices: { ron: null, usd: null },
      cdnImage:"https://icons.lumiterra.net/item-icon-344.png",
      requiresLevel: 5,
      stats: [
        { name: "Combatdef", typeNumber: "integer", values:  {min:83, max:97 }},
        { name: "Movespd",typeNumber: "integer",  values: {min: 45, max:65 }},
        { name: "Maxhp",typeNumber: "integer",  values: {min: 311, max:385 }},
      ],
      recipe: {
          materials:[
            createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411,5),
            createMaterial('Lv 5 Agricultural Planting Essence', 1, 408,5),
            createMaterial('Lv 4 Gather Essence', 2, 404,4)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411,5),
            createMaterial('Lv 5 Agricultural Planting Essence', 1, 408,5),
            createMaterial('Lv 4 Gather Essence', 2, 404,4)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411,5),
            createMaterial('Lv 5 Agricultural Planting Essence', 1, 408,5),
            createMaterial('Lv 4 Gather Essence', 2, 404,4)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411,5),
            createMaterial('Lv 5 Agricultural Planting Essence', 1, 408,5),
            createMaterial('Lv 4 Gather Essence', 2, 404,4)
          ])
      },
    },
    {
      name: "Star Fighter Shoes",
      alias: "StarFighterShoes",
      prices: { ron: null, usd: null },
      cdnImage:"https://icons.lumiterra.net/item-icon-349.png",
      requiresLevel: 6,
      stats: [
        { name: "Combatdef", typeNumber: "integer", values:  {min:101, max:119 }},
        { name: "Movespd",typeNumber: "integer",  values: {min: 50, max:66 }},
        { name: "Maxhp",typeNumber: "integer",  values: {min: 380, max:454 }},
      ],
      recipe: {
          materials:[
            createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412,6),
            createMaterial('Lv 6 Agricultural Planting Essence', 1, 409,6),
            createMaterial('Lv 5 Gather Essence', 2, 405,5)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412,6),
            createMaterial('Lv 6 Agricultural Planting Essence', 1, 409,6),
            createMaterial('Lv 5 Gather Essence', 2, 405,5)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412,6),
            createMaterial('Lv 6 Agricultural Planting Essence', 1, 409,6),
            createMaterial('Lv 5 Gather Essence', 2, 405,5)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412,6),
            createMaterial('Lv 6 Agricultural Planting Essence', 1, 409,6),
            createMaterial('Lv 5 Gather Essence', 2, 405,5)
          ])
      },
    },
    {
      name: "Lava Combat Shoes",
      alias: "LavaCombatShoes",
      prices: { ron: null, usd: null },
      cdnImage:"https://icons.lumiterra.net/item-icon-534.png",
      requiresLevel: 7,
      stats: [
        { name: "Combatdef", typeNumber: "integer", values:  {min:120, max:138 }},
        { name: "Movespd",typeNumber: "integer",  values: {min: 55, max:67 }},
        { name: "Maxhp",typeNumber: "integer",  values: {min: 447, max:521 }},
      ],
      recipe: {
          materials:[
            createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611,7),
            createMaterial('Lv 7 Agricultural Planting Essence', 1, 608,7),
            createMaterial('Lv 6 Gather Essence', 2, 406,6)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611,7),
            createMaterial('Lv 7 Agricultural Planting Essence', 1, 608,7),
            createMaterial('Lv 6 Gather Essence', 2, 406,6)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611,7),
            createMaterial('Lv 7 Agricultural Planting Essence', 1, 608,7),
            createMaterial('Lv 6 Gather Essence', 2, 406,6)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611,7),
            createMaterial('Lv 7 Agricultural Planting Essence', 1, 608,7),
            createMaterial('Lv 5 Gather Essence', 2, 405,6)
          ])
      },
    },
    {
      name: "Hollow Combat Shoes",
      alias: "HollowCombatShoes",
      prices: { ron: null, usd: null },
      cdnImage:"https://icons.lumiterra.net/item-icon-558.png",
      requiresLevel: 8,
      stats: [
        { name: "Combatdef", typeNumber: "integer", values:  {min:138, max:156 }},
        { name: "Movespd",typeNumber: "integer",  values: {min: 60, max:68 }},
        { name: "Maxhp",typeNumber: "integer",  values: {min: 514, max:588 }},
      ],
      recipe: {
          materials:[
            createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612,8),
            createMaterial('Lv 8 Agricultural Planting Essence', 1, 609,8),
            createMaterial('Lv 7 Gather Essence', 2, 406,7)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612,8),
            createMaterial('Lv 8 Agricultural Planting Essence', 1, 609,8),
            createMaterial('Lv 7 Gather Essence', 2, 406,7)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612,8),
            createMaterial('Lv 8 Agricultural Planting Essence', 1, 609,8),
            createMaterial('Lv 7 Gather Essence', 2, 406,7)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612,8),
            createMaterial('Lv 8 Agricultural Planting Essence', 1, 609,8),
            createMaterial('Lv 7 Gather Essence', 2, 406,7)
          ])
      },
    },
    {
      name: "Bronze Combat Shoes",
      alias: "BronzeCombatShoes",
      prices: { ron: null, usd: null },
      cdnImage:"https://icons.lumiterra.net/item-icon-582.png",
      requiresLevel: 9,
      stats: [
        { name: "Combatdef", typeNumber: "integer", values:  {min:156, max:174 }},
        { name: "Movespd",typeNumber: "integer",  values: {min: 65, max:69 }},
        { name: "Maxhp",typeNumber: "integer",  values: {min: 583, max:657 }},
      ],
      recipe: {
          materials:[
            createMaterial('Lv 9 Agricultural Livestock Essence', 1, 613,9),
            createMaterial('Lv 9 Agricultural Planting Essence', 1, 610,9),
            createMaterial('Lv 8 Gather Essence', 2, 606,8)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 9 Agricultural Livestock Essence', 1, 613,9),
            createMaterial('Lv 9 Agricultural Planting Essence', 1, 610,9),
            createMaterial('Lv 8 Gather Essence', 2, 606,8)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 9 Agricultural Livestock Essence', 1, 613,9),
            createMaterial('Lv 9 Agricultural Planting Essence', 1, 610,9),
            createMaterial('Lv 8 Gather Essence', 2, 606,8)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 9 Agricultural Livestock Essence', 1, 613,9),
            createMaterial('Lv 9 Agricultural Planting Essence', 1, 610,9),
            createMaterial('Lv 8 Gather Essence', 2, 606,8)
          ])
      },
    },
    {
      name: "Cracked Crystal Bracelet",
      alias: "CrackedCrystalBracelet",
      prices: { ron: null, usd: null },
      cdnImage:"https://icons.lumiterra.net/item-icon-52.png",
      requiresLevel: 1,
      stats: [
        { name: "Combatdef", typeNumber: "integer", values:  {min:7, max:21 }},
        { name: "Combatatt",typeNumber: "integer",  values: {min: 4, max:14 }},
        { name: "Maxhp",typeNumber: "integer",  values: {min: 27, max:81 }},
      ],
      recipe: {
          materials:[
              createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213,1),
              createMaterial('Lv 1 Agricultural Planting Essence', 1, 210,1)
          ],
          minPriceTotalRon: calculateTotalPrice([
              createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213,1),
              createMaterial('Lv 1 Agricultural Planting Essence', 1, 210,1)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
              createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213,1),
              createMaterial('Lv 1 Agricultural Planting Essence', 1, 210,1)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213,1),
            createMaterial('Lv 1 Agricultural Planting Essence', 1, 210,1)
          ])
      },
    },
    {
      name: "Crystal Skin Glove",
      alias: "CrystalSkinGlove",
      prices: { ron: null, usd: null },
      cdnImage:"https://icons.lumiterra.net/item-icon-53.png",
      requiresLevel: 2,
      stats: [
        { name: "Combatdef", typeNumber: "integer", values:  {min:21, max:35 }},
        { name: "Combatatt",typeNumber: "integer",  values: {min: 13, max:23 }},
        { name: "Maxhp",typeNumber: "integer",  values: {min: 78, max:132 }},
      ],
      recipe: {
          materials:[
            createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214,2),
            createMaterial('Lv 2 Agricultural Planting Essence', 1, 211,2),
            createMaterial('Lv 1 Gather Essence', 2, 207,1)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214,2),
            createMaterial('Lv 2 Agricultural Planting Essence', 1, 211,2),
            createMaterial('Lv 1 Gather Essence', 2, 207,1)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214,2),
            createMaterial('Lv 2 Agricultural Planting Essence', 1, 211,2),
            createMaterial('Lv 1 Gather Essence', 2, 207,1)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214,2),
            createMaterial('Lv 2 Agricultural Planting Essence', 1, 211,2),
            createMaterial('Lv 1 Gather Essence', 2, 207,1)
          ])
      },
    },
    {
      name: "Crystal Stone Gauntlet",
      alias: "CrystalStoneGauntlet",
      prices: { ron: null, usd: null },
      cdnImage:"https://icons.lumiterra.net/item-icon-54.png",
      requiresLevel: 3,
      stats: [
        { name: "Combatdef", typeNumber: "integer", values:  {min:35, max:49 }},
        { name: "Combatatt",typeNumber: "integer",  values: {min: 22, max:32 }},
        { name: "Maxhp",typeNumber: "integer",  values: {min: 128, max:182 }},
      ],
      recipe: {
          materials:[
            createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215,3),
            createMaterial('Lv 3 Agricultural Planting Essence', 1, 212,3),
            createMaterial('Lv 2 Gather Essence', 2, 208,2)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215,3),
            createMaterial('Lv 3 Agricultural Planting Essence', 1, 212,3),
            createMaterial('Lv 2 Gather Essence', 2, 208,2)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215,3),
            createMaterial('Lv 3 Agricultural Planting Essence', 1, 212,3),
            createMaterial('Lv 2 Gather Essence', 2, 208,2)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215,3),
            createMaterial('Lv 3 Agricultural Planting Essence', 1, 212,3),
            createMaterial('Lv 2 Gather Essence', 2, 208,2)
          ])
      },
    },
    {
      name: "Golden Fighter Glove",
      alias: "GoldenFighterGlove",
      prices: { ron: null, usd: null },
      cdnImage:"https://icons.lumiterra.net/item-icon-337.png",
      requiresLevel: 4,
      stats: [
        { name: "Combatdef", typeNumber: "integer", values:  {min:179, max:233 }},
        { name: "Combatatt",typeNumber: "integer",  values: {min: 48, max:62 }},
        { name: "Maxhp",typeNumber: "integer",  values: {min: 31, max:41 }},
      ],
      recipe: {
          materials:[
            createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410,4),
            createMaterial('Lv 4 Agricultural Planting Essence', 1, 407,4),
            createMaterial('Lv 3 Gather Essence', 2, 209,3)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410,4),
            createMaterial('Lv 4 Agricultural Planting Essence', 1, 407,4),
            createMaterial('Lv 3 Gather Essence', 2, 209,3)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410,4),
            createMaterial('Lv 4 Agricultural Planting Essence', 1, 407,4),
            createMaterial('Lv 3 Gather Essence', 2, 209,3)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410,4),
            createMaterial('Lv 4 Agricultural Planting Essence', 1, 407,4),
            createMaterial('Lv 3 Gather Essence', 2, 209,3)
          ])
      },
    },
    {
      name: "Diamond Fighter Glove",
      alias: "DiamondFighterGlove",
      prices: { ron: null, usd: null },
      cdnImage:"https://icons.lumiterra.net/item-icon-342.png",
      requiresLevel: 5,
      stats: [
        { name: "Combatdef", typeNumber: "integer", values:  {min:228, max:282 }},
        { name: "Combatatt",typeNumber: "integer",  values: {min: 62, max:76 }},
        { name: "Maxhp",typeNumber: "integer",  values: {min: 40, max:50 }},
      ],
      recipe: {
          materials:[
            createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411,5),
            createMaterial('Lv 5 Agricultural Planting Essence', 1, 408,5),
            createMaterial('Lv 4 Gather Essence', 2, 404,4)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411,5),
            createMaterial('Lv 5 Agricultural Planting Essence', 1, 408,5),
            createMaterial('Lv 4 Gather Essence', 2, 404,4)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411,5),
            createMaterial('Lv 5 Agricultural Planting Essence', 1, 408,5),
            createMaterial('Lv 4 Gather Essence', 2, 404,4)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411,5),
            createMaterial('Lv 5 Agricultural Planting Essence', 1, 408,5),
            createMaterial('Lv 4 Gather Essence', 2, 404,4)
          ])
      },
    },
    {
      name: "Star Fighter Glove",
      alias: "StarFighterGlove",
      prices: { ron: null, usd: null },
      cdnImage:"https://icons.lumiterra.net/item-icon-347.png",
      requiresLevel: 6,
      stats: [
        { name: "Combatdef", typeNumber: "integer", values:  {min:279, max:333 }},
        { name: "Combatatt",typeNumber: "integer",  values: {min: 76, max:90 }},
        { name: "Maxhp",typeNumber: "integer",  values: {min: 49, max:59 }},
      ],
      recipe: {
          materials:[
            createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412,6),
            createMaterial('Lv 6 Agricultural Planting Essence', 1, 409,6),
            createMaterial('Lv 5 Gather Essence', 2, 405,5)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412,6),
            createMaterial('Lv 6 Agricultural Planting Essence', 1, 409,6),
            createMaterial('Lv 5 Gather Essence', 2, 405,5)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412,6),
            createMaterial('Lv 6 Agricultural Planting Essence', 1, 409,6),
            createMaterial('Lv 5 Gather Essence', 2, 405,5)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412,6),
            createMaterial('Lv 6 Agricultural Planting Essence', 1, 409,6),
            createMaterial('Lv 5 Gather Essence', 2, 405,5)
          ])
      },
    },
    {
      name: "Lava Combat Gloves",
      alias: "LavaCombatGloves",
      prices: { ron: null, usd: null },
      cdnImage:"https://icons.lumiterra.net/item-icon-533.png",
      requiresLevel: 7,
      stats: [
        { name: "Combatdef", typeNumber: "integer", values:  {min:329, max:383 }},
        { name: "Combatatt",typeNumber: "integer",  values: {min: 90, max:104 }},
        { name: "Maxhp",typeNumber: "integer",  values: {min: 58, max:58 }},
      ],
      recipe: {
          materials:[
            createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611,7),
            createMaterial('Lv 7 Agricultural Planting Essence', 1, 608,7),
            createMaterial('Lv 6 Gather Essence', 2, 406,6)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611,7),
            createMaterial('Lv 7 Agricultural Planting Essence', 1, 608,7),
            createMaterial('Lv 6 Gather Essence', 2, 406,6)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611,7),
            createMaterial('Lv 7 Agricultural Planting Essence', 1, 608,7),
            createMaterial('Lv 6 Gather Essence', 2, 406,6)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611,7),
            createMaterial('Lv 7 Agricultural Planting Essence', 1, 608,7),
            createMaterial('Lv 5 Gather Essence', 2, 405,6)
          ])
      },
    },
    {
      name: "Hollow Combat Gloves",
      alias: "HollowCombatGloves",
      prices: { ron: null, usd: null },
      cdnImage:"https://icons.lumiterra.net/item-icon-557.png",
      requiresLevel: 8,
      stats: [
        { name: "Combatdef", typeNumber: "integer", values:  {min:378, max:432 }},
        { name: "Combatatt",typeNumber: "integer",  values: {min: 104, max:118 }},
        { name: "Maxhp",typeNumber: "integer",  values: {min: 67, max:77 }},
      ],
      recipe: {
          materials:[
            createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612,8),
            createMaterial('Lv 8 Agricultural Planting Essence', 1, 609,8),
            createMaterial('Lv 7 Gather Essence', 2, 406,7)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612,8),
            createMaterial('Lv 8 Agricultural Planting Essence', 1, 609,8),
            createMaterial('Lv 7 Gather Essence', 2, 406,7)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612,8),
            createMaterial('Lv 8 Agricultural Planting Essence', 1, 609,8),
            createMaterial('Lv 7 Gather Essence', 2, 406,7)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612,8),
            createMaterial('Lv 8 Agricultural Planting Essence', 1, 609,8),
            createMaterial('Lv 7 Gather Essence', 2, 406,7)
          ])
      },
    },
    {
      name: "Bronze Combat Gloves",
      alias: "BronzeCombatGloves",
      prices: { ron: null, usd: null },
      cdnImage:"https://icons.lumiterra.net/item-icon-581.png",
      requiresLevel: 9,
      stats: [
        { name: "Combatdef", typeNumber: "integer", values:  {min:429, max:483 }},
        { name: "Combatatt",typeNumber: "integer",  values: {min: 118, max:132 }},
        { name: "Maxhp",typeNumber: "integer",  values: {min: 76, max:86 }},
      ],
      recipe: {
          materials:[
            createMaterial('Lv 9 Agricultural Livestock Essence', 1, 613,9),
            createMaterial('Lv 9 Agricultural Planting Essence', 1, 610,9),
            createMaterial('Lv 8 Gather Essence', 2, 606,8)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 9 Agricultural Livestock Essence', 1, 613,9),
            createMaterial('Lv 9 Agricultural Planting Essence', 1, 610,9),
            createMaterial('Lv 8 Gather Essence', 2, 606,8)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 9 Agricultural Livestock Essence', 1, 613,9),
            createMaterial('Lv 9 Agricultural Planting Essence', 1, 610,9),
            createMaterial('Lv 8 Gather Essence', 2, 606,8)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 9 Agricultural Livestock Essence', 1, 613,9),
            createMaterial('Lv 9 Agricultural Planting Essence', 1, 610,9),
            createMaterial('Lv 8 Gather Essence', 2, 606,8)
          ])
      },
    },
    {
      name: "Chip Head Ring",
      alias: "ChipHeadRing",
      prices: { ron: null, usd: null },
      cdnImage:"https://icons.lumiterra.net/item-icon-43.png",
      requiresLevel: 1,
      stats: [
        { name: "Combatdef", typeNumber: "integer", values:  {min:9, max:27 }},
        { name: "Maxhp",typeNumber: "integer",  values: {min: 35, max:105 }},
      ],
      recipe: {
          materials:[
              createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213,1),
              createMaterial('Lv 1 Agricultural Planting Essence', 1, 210,1)
          ],
          minPriceTotalRon: calculateTotalPrice([
              createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213,1),
              createMaterial('Lv 1 Agricultural Planting Essence', 1, 210,1)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
              createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213,1),
              createMaterial('Lv 1 Agricultural Planting Essence', 1, 210,1)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213,1),
            createMaterial('Lv 1 Agricultural Planting Essence', 1, 210,1)
          ])
      },
    },
    {
      name: "Crystal Skin Soft Hat",
      alias: "CrystalSkinSoftHat",
      prices: { ron: null, usd: null },
      cdnImage:"https://icons.lumiterra.net/item-icon-44.png",
      requiresLevel: 2,
      stats: [
        { name: "Combatdef", typeNumber: "integer", values:  {min:28, max:46 }},
        { name: "Maxhp",typeNumber: "integer",  values: {min: 101, max:171 }},
      ],
      recipe: {
          materials:[
            createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214,2),
            createMaterial('Lv 2 Agricultural Planting Essence', 1, 211,2),
            createMaterial('Lv 1 Gather Essence', 2, 207,1)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214,2),
            createMaterial('Lv 2 Agricultural Planting Essence', 1, 211,2),
            createMaterial('Lv 1 Gather Essence', 2, 207,1)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214,2),
            createMaterial('Lv 2 Agricultural Planting Essence', 1, 211,2),
            createMaterial('Lv 1 Gather Essence', 2, 207,1)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214,2),
            createMaterial('Lv 2 Agricultural Planting Essence', 1, 211,2),
            createMaterial('Lv 1 Gather Essence', 2, 207,1)
          ])
      },
    },
    {
      name: "Crystal Stone Helmet",
      alias: "CrystalStoneHelmet",
      prices: { ron: null, usd: null },
      cdnImage:"https://icons.lumiterra.net/item-icon-45.png",
      requiresLevel: 3,
      stats: [
        { name: "Combatdef", typeNumber: "integer", values:  {min:46, max:64 }},
        { name: "Maxhp",typeNumber: "integer",  values: {min: 167, max:237 }},
      ],
      recipe: {
          materials:[
            createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215,3),
            createMaterial('Lv 3 Agricultural Planting Essence', 1, 212,3),
            createMaterial('Lv 2 Gather Essence', 2, 208,2)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215,3),
            createMaterial('Lv 3 Agricultural Planting Essence', 1, 212,3),
            createMaterial('Lv 2 Gather Essence', 2, 208,2)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215,3),
            createMaterial('Lv 3 Agricultural Planting Essence', 1, 212,3),
            createMaterial('Lv 2 Gather Essence', 2, 208,2)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215,3),
            createMaterial('Lv 3 Agricultural Planting Essence', 1, 212,3),
            createMaterial('Lv 2 Gather Essence', 2, 208,2)
          ])
      },
    },
    {
      name: "Golden Fighter Hat",
      alias: "GoldenFighterHat",
      prices: { ron: null, usd: null },
      cdnImage:"https://icons.lumiterra.net/item-icon-335.png",
      requiresLevel: 4,
      stats: [
        { name: "Combatdef", typeNumber: "integer", values:  {min:64, max:82 }},
        { name: "Maxhp",typeNumber: "integer",  values: {min: 233, max:303 }},
      ],
      recipe: {
          materials:[
            createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410,4),
            createMaterial('Lv 4 Agricultural Planting Essence', 1, 407,4),
            createMaterial('Lv 3 Gather Essence', 2, 209,3)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410,4),
            createMaterial('Lv 4 Agricultural Planting Essence', 1, 407,4),
            createMaterial('Lv 3 Gather Essence', 2, 209,3)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410,4),
            createMaterial('Lv 4 Agricultural Planting Essence', 1, 407,4),
            createMaterial('Lv 3 Gather Essence', 2, 209,3)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410,4),
            createMaterial('Lv 4 Agricultural Planting Essence', 1, 407,4),
            createMaterial('Lv 3 Gather Essence', 2, 209,3)
          ])
      },
    },
    {
      name: "Diamond Fighter Hat",
      alias: "DiamondFighterHat",
      prices: { ron: null, usd: null },
      cdnImage:"https://icons.lumiterra.net/item-icon-340.png",
      requiresLevel: 5,
      stats: [
        { name: "Combatdef", typeNumber: "integer", values:  {min:83, max:97 }},
        { name: "Maxhp",typeNumber: "integer",  values: {min: 233, max:303 }},
      ],
      recipe: {
          materials:[
            createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411,5),
            createMaterial('Lv 5 Agricultural Planting Essence', 1, 408,5),
            createMaterial('Lv 4 Gather Essence', 2, 404,4)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411,5),
            createMaterial('Lv 5 Agricultural Planting Essence', 1, 408,5),
            createMaterial('Lv 4 Gather Essence', 2, 404,4)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411,5),
            createMaterial('Lv 5 Agricultural Planting Essence', 1, 408,5),
            createMaterial('Lv 4 Gather Essence', 2, 404,4)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411,5),
            createMaterial('Lv 5 Agricultural Planting Essence', 1, 408,5),
            createMaterial('Lv 4 Gather Essence', 2, 404,4)
          ])
      },
    },
    {
      name: "Star Fighter Hat",
      alias: "StarFighterHat",
      prices: { ron: null, usd: null },
      cdnImage:"https://icons.lumiterra.net/item-icon-345.png",
      requiresLevel: 6,
      stats: [
        { name: "Combatdef", typeNumber: "integer", values:  {min:101, max:119 }},
        { name: "Maxhp",typeNumber: "integer",  values: {min: 364, max:434 }},
      ],
      recipe: {
          materials:[
            createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412,6),
            createMaterial('Lv 6 Agricultural Planting Essence', 1, 409,6),
            createMaterial('Lv 5 Gather Essence', 2, 405,5)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412,6),
            createMaterial('Lv 6 Agricultural Planting Essence', 1, 409,6),
            createMaterial('Lv 5 Gather Essence', 2, 405,5)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412,6),
            createMaterial('Lv 6 Agricultural Planting Essence', 1, 409,6),
            createMaterial('Lv 5 Gather Essence', 2, 405,5)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412,6),
            createMaterial('Lv 6 Agricultural Planting Essence', 1, 409,6),
            createMaterial('Lv 5 Gather Essence', 2, 405,5)
          ])
      },
    },
    {
      name: "Lava Combat Hat",
      alias: "LavaCombatHat",
      prices: { ron: null, usd: null },
      cdnImage:"https://icons.lumiterra.net/item-icon-530.png",
      requiresLevel: 7,
      stats: [
        { name: "Combatdef", typeNumber: "integer", values:  {min:120, max:138 }},
        { name: "Maxhp",typeNumber: "integer",  values: {min: 428, max:498 }},
      ],
      recipe: {
          materials:[
            createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611,7),
            createMaterial('Lv 7 Agricultural Planting Essence', 1, 608,7),
            createMaterial('Lv 6 Gather Essence', 2, 406,6)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611,7),
            createMaterial('Lv 7 Agricultural Planting Essence', 1, 608,7),
            createMaterial('Lv 6 Gather Essence', 2, 406,6)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611,7),
            createMaterial('Lv 7 Agricultural Planting Essence', 1, 608,7),
            createMaterial('Lv 6 Gather Essence', 2, 406,6)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611,7),
            createMaterial('Lv 7 Agricultural Planting Essence', 1, 608,7),
            createMaterial('Lv 5 Gather Essence', 2, 405,6)
          ])
      },
    },
    {
      name: "Hollow Combat Hat",
      alias: "HollowCombatHat",
      prices: { ron: null, usd: null },
      cdnImage:"https://icons.lumiterra.net/item-icon-554.png",
      requiresLevel: 8,
      stats: [
        { name: "Combatdef", typeNumber: "integer", values:  {min:138, max:156 }},
        { name: "Maxhp",typeNumber: "integer",  values: {min: 492, max:562 }},
      ],
      recipe: {
          materials:[
            createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612,8),
            createMaterial('Lv 8 Agricultural Planting Essence', 1, 609,8),
            createMaterial('Lv 7 Gather Essence', 2, 406,7)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612,8),
            createMaterial('Lv 8 Agricultural Planting Essence', 1, 609,8),
            createMaterial('Lv 7 Gather Essence', 2, 406,7)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612,8),
            createMaterial('Lv 8 Agricultural Planting Essence', 1, 609,8),
            createMaterial('Lv 7 Gather Essence', 2, 406,7)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612,8),
            createMaterial('Lv 8 Agricultural Planting Essence', 1, 609,8),
            createMaterial('Lv 7 Gather Essence', 2, 406,7)
          ])
      },
    },
    {
      name: "Bronze Combat Hat",
      alias: "BronzeCombatHat",
      prices: { ron: null, usd: null },
      cdnImage:"https://icons.lumiterra.net/item-icon-578.png",
      requiresLevel: 9,
      stats: [
        { name: "Combatdef", typeNumber: "integer", values:  {min:156, max:174 }},
        { name: "Maxhp",typeNumber: "integer",  values: {min: 558, max:628 }},
      ],
      recipe: {
          materials:[
            createMaterial('Lv 9 Agricultural Livestock Essence', 1, 613,9),
            createMaterial('Lv 9 Agricultural Planting Essence', 1, 610,9),
            createMaterial('Lv 8 Gather Essence', 2, 606,8)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 9 Agricultural Livestock Essence', 1, 613,9),
            createMaterial('Lv 9 Agricultural Planting Essence', 1, 610,9),
            createMaterial('Lv 8 Gather Essence', 2, 606,8)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 9 Agricultural Livestock Essence', 1, 613,9),
            createMaterial('Lv 9 Agricultural Planting Essence', 1, 610,9),
            createMaterial('Lv 8 Gather Essence', 2, 606,8)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 9 Agricultural Livestock Essence', 1, 613,9),
            createMaterial('Lv 9 Agricultural Planting Essence', 1, 610,9),
            createMaterial('Lv 8 Gather Essence', 2, 606,8)
          ])
      },
    },
    {
      name: "Cracked Crystal Grass Skirt",
      alias: "CrackedCrystalGrassSkirt",
      prices: { ron: null, usd: null },
      cdnImage:"https://icons.lumiterra.net/item-icon-49.png",
      requiresLevel: 1,
      stats: [
        { name: "Combatdef", typeNumber: "integer", values:  {min:8, max:26 }},
        { name: "Maxhp",typeNumber: "integer",  values: {min: 36, max:110 }},
      ],
      recipe: {
          materials:[
              createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213,1),
              createMaterial('Lv 1 Agricultural Planting Essence', 1, 210,1)
          ],
          minPriceTotalRon: calculateTotalPrice([
              createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213,1),
              createMaterial('Lv 1 Agricultural Planting Essence', 1, 210,1)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
              createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213,1),
              createMaterial('Lv 1 Agricultural Planting Essence', 1, 210,1)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213,1),
            createMaterial('Lv 1 Agricultural Planting Essence', 1, 210,1)
          ])
      },
    },
    {
      name: "Crystal Skin Pants",
      alias: "CrystalSkinPants",
      prices: { ron: null, usd: null },
      cdnImage:"https://icons.lumiterra.net/item-icon-50.png",
      requiresLevel: 2,
      stats: [
        { name: "Combatdef", typeNumber: "integer", values:  {min:26, max:44 }},
        { name: "Maxhp",typeNumber: "integer",  values: {min: 105, max:179 }},
      ],
      recipe: {
          materials:[
            createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214,2),
            createMaterial('Lv 2 Agricultural Planting Essence', 1, 211,2),
            createMaterial('Lv 1 Gather Essence', 2, 207,1)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214,2),
            createMaterial('Lv 2 Agricultural Planting Essence', 1, 211,2),
            createMaterial('Lv 1 Gather Essence', 2, 207,1)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214,2),
            createMaterial('Lv 2 Agricultural Planting Essence', 1, 211,2),
            createMaterial('Lv 1 Gather Essence', 2, 207,1)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214,2),
            createMaterial('Lv 2 Agricultural Planting Essence', 1, 211,2),
            createMaterial('Lv 1 Gather Essence', 2, 207,1)
          ])
      },
    },
    {
      name: "Crystal Leg Armor",
      alias: "CrystalLegArmor",
      prices: { ron: null, usd: null },
      cdnImage:"https://icons.lumiterra.net/item-icon-51.png",
      requiresLevel: 3,
      stats: [
        { name: "Combatdef", typeNumber: "integer", values:  {min:43, max:61 }},
        { name: "Maxhp",typeNumber: "integer",  values: {min: 175, max:249 }},
      ],
      recipe: {
          materials:[
            createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215,3),
            createMaterial('Lv 3 Agricultural Planting Essence', 1, 212,3),
            createMaterial('Lv 2 Gather Essence', 2, 208,2)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215,3),
            createMaterial('Lv 3 Agricultural Planting Essence', 1, 212,3),
            createMaterial('Lv 2 Gather Essence', 2, 208,2)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215,3),
            createMaterial('Lv 3 Agricultural Planting Essence', 1, 212,3),
            createMaterial('Lv 2 Gather Essence', 2, 208,2)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215,3),
            createMaterial('Lv 3 Agricultural Planting Essence', 1, 212,3),
            createMaterial('Lv 2 Gather Essence', 2, 208,2)
          ])
      },
    },
    {
      name: "Golden Fighter Pants",
      alias: "GoldenFighterPants",
      prices: { ron: null, usd: null },
      cdnImage:"https://icons.lumiterra.net/item-icon-338.png",
      requiresLevel: 4,
      stats: [
        { name: "Combatdef", typeNumber: "integer", values:  {min:61, max:79 }},
        { name: "Maxhp",typeNumber: "integer",  values: {min: 244, max:318 }},
      ],
      recipe: {
          materials:[
            createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410,4),
            createMaterial('Lv 4 Agricultural Planting Essence', 1, 407,4),
            createMaterial('Lv 3 Gather Essence', 2, 209,3)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410,4),
            createMaterial('Lv 4 Agricultural Planting Essence', 1, 407,4),
            createMaterial('Lv 3 Gather Essence', 2, 209,3)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410,4),
            createMaterial('Lv 4 Agricultural Planting Essence', 1, 407,4),
            createMaterial('Lv 3 Gather Essence', 2, 209,3)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410,4),
            createMaterial('Lv 4 Agricultural Planting Essence', 1, 407,4),
            createMaterial('Lv 3 Gather Essence', 2, 209,3)
          ])
      },
    },
    {
      name: "Diamond Fighter Pants",
      alias: "DiamondFighterPants",
      prices: { ron: null, usd: null },
      cdnImage:"https://icons.lumiterra.net/item-icon-343.png",
      requiresLevel: 5,
      stats: [
        { name: "Combatdef", typeNumber: "integer", values:  {min:78, max:96 }},
        { name: "Maxhp",typeNumber: "integer",  values: {min: 311, max:385 }},
      ],
      recipe: {
          materials:[
            createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411,5),
            createMaterial('Lv 5 Agricultural Planting Essence', 1, 408,5),
            createMaterial('Lv 4 Gather Essence', 2, 404,4)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411,5),
            createMaterial('Lv 5 Agricultural Planting Essence', 1, 408,5),
            createMaterial('Lv 4 Gather Essence', 2, 404,4)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411,5),
            createMaterial('Lv 5 Agricultural Planting Essence', 1, 408,5),
            createMaterial('Lv 4 Gather Essence', 2, 404,4)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411,5),
            createMaterial('Lv 5 Agricultural Planting Essence', 1, 408,5),
            createMaterial('Lv 4 Gather Essence', 2, 404,4)
          ])
      },
    },
    {
      name: "Star Fighter Pants",
      alias: "StarFighterPants",
      prices: { ron: null, usd: null },
      cdnImage:"https://icons.lumiterra.net/item-icon-348.png",
      requiresLevel: 6,
      stats: [
        { name: "Combatdef", typeNumber: "integer", values:  {min:96, max:114 }},
        { name: "Maxhp",typeNumber: "integer",  values: {min: 380, max:454 }},
      ],
      recipe: {
          materials:[
            createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412,6),
            createMaterial('Lv 6 Agricultural Planting Essence', 1, 409,6),
            createMaterial('Lv 5 Gather Essence', 2, 405,5)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412,6),
            createMaterial('Lv 6 Agricultural Planting Essence', 1, 409,6),
            createMaterial('Lv 5 Gather Essence', 2, 405,5)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412,6),
            createMaterial('Lv 6 Agricultural Planting Essence', 1, 409,6),
            createMaterial('Lv 5 Gather Essence', 2, 405,5)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412,6),
            createMaterial('Lv 6 Agricultural Planting Essence', 1, 409,6),
            createMaterial('Lv 5 Gather Essence', 2, 405,5)
          ])
      },
    },
    {
      name: "Lava Combat Pants",
      alias: "LavaCombatPants",
      prices: { ron: null, usd: null },
      cdnImage:"https://icons.lumiterra.net/item-icon-532.png",
      requiresLevel: 7,
      stats: [
        { name: "Combatdef", typeNumber: "integer", values:  {min:113, max:131 }},
        { name: "Maxhp",typeNumber: "integer",  values: {min: 447, max:521 }},
      ],
      recipe: {
          materials:[
            createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611,7),
            createMaterial('Lv 7 Agricultural Planting Essence', 1, 608,7),
            createMaterial('Lv 6 Gather Essence', 2, 406,6)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611,7),
            createMaterial('Lv 7 Agricultural Planting Essence', 1, 608,7),
            createMaterial('Lv 6 Gather Essence', 2, 406,6)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611,7),
            createMaterial('Lv 7 Agricultural Planting Essence', 1, 608,7),
            createMaterial('Lv 6 Gather Essence', 2, 406,6)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611,7),
            createMaterial('Lv 7 Agricultural Planting Essence', 1, 608,7),
            createMaterial('Lv 5 Gather Essence', 2, 405,6)
          ])
      },
    },
    {
      name: "Hollow Combat Pants",
      alias: "HollowCombatPants",
      prices: { ron: null, usd: null },
      cdnImage:"https://icons.lumiterra.net/item-icon-556.png",
      requiresLevel: 8,
      stats: [
        { name: "Combatdef", typeNumber: "integer", values:  {min:131, max:149 }},
        { name: "Maxhp",typeNumber: "integer",  values: {min: 514, max:588 }},
      ],
      recipe: {
          materials:[
            createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612,8),
            createMaterial('Lv 8 Agricultural Planting Essence', 1, 609,8),
            createMaterial('Lv 7 Gather Essence', 2, 406,7)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612,8),
            createMaterial('Lv 8 Agricultural Planting Essence', 1, 609,8),
            createMaterial('Lv 7 Gather Essence', 2, 406,7)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612,8),
            createMaterial('Lv 8 Agricultural Planting Essence', 1, 609,8),
            createMaterial('Lv 7 Gather Essence', 2, 406,7)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612,8),
            createMaterial('Lv 8 Agricultural Planting Essence', 1, 609,8),
            createMaterial('Lv 7 Gather Essence', 2, 406,7)
          ])
      },
    },
    {
      name: "Bronze Combat Pants",
      alias: "BronzeCombatPants",
      prices: { ron: null, usd: null },
      cdnImage:"https://icons.lumiterra.net/item-icon-583.png",
      requiresLevel: 9,
      stats: [
        { name: "Combatdef", typeNumber: "integer", values:  {min:148, max:166 }},
        { name: "Maxhp",typeNumber: "integer",  values: {min: 583, max:657 }},
      ],
      recipe: {
          materials:[
            createMaterial('Lv 9 Agricultural Livestock Essence', 1, 613,9),
            createMaterial('Lv 9 Agricultural Planting Essence', 1, 610,9),
            createMaterial('Lv 8 Gather Essence', 2, 606,8)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 9 Agricultural Livestock Essence', 1, 613,9),
            createMaterial('Lv 9 Agricultural Planting Essence', 1, 610,9),
            createMaterial('Lv 8 Gather Essence', 2, 606,8)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 9 Agricultural Livestock Essence', 1, 613,9),
            createMaterial('Lv 9 Agricultural Planting Essence', 1, 610,9),
            createMaterial('Lv 8 Gather Essence', 2, 606,8)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 9 Agricultural Livestock Essence', 1, 613,9),
            createMaterial('Lv 9 Agricultural Planting Essence', 1, 610,9),
            createMaterial('Lv 8 Gather Essence', 2, 606,8)
          ])
      },
    },
    {
      name: "Cracked Crystal Armor",
      alias: "CrackedCrystalArmor",
      prices: { ron: null, usd: null },
      cdnImage:"https://icons.lumiterra.net/item-icon-46.png",
      requiresLevel: 1,
      stats: [
        { name: "Combatdef", typeNumber: "integer", values:  {min:11, max:33 }},
        { name: "Maxhp",typeNumber: "integer",  values: {min: 27, max:81 }},
      ],
      recipe: {
          materials:[
              createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213,1),
              createMaterial('Lv 1 Agricultural Planting Essence', 1, 210,1)
          ],
          minPriceTotalRon: calculateTotalPrice([
              createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213,1),
              createMaterial('Lv 1 Agricultural Planting Essence', 1, 210,1)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
              createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213,1),
              createMaterial('Lv 1 Agricultural Planting Essence', 1, 210,1)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213,1),
            createMaterial('Lv 1 Agricultural Planting Essence', 1, 210,1)
          ])
      },
    },
    {
      name: "Crystal Skin Armor",
      alias: "CrystalSkinArmor",
      prices: { ron: null, usd: null },
      cdnImage:"https://icons.lumiterra.net/item-icon-47.png",
      requiresLevel: 2,
      stats: [
        { name: "Combatdef", typeNumber: "integer", values:  {min:33, max:55 }},
        { name: "Maxhp",typeNumber: "integer",  values: {min: 78, max:132 }},
      ],
      recipe: {
          materials:[
            createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214,2),
            createMaterial('Lv 2 Agricultural Planting Essence', 1, 211,2),
            createMaterial('Lv 1 Gather Essence', 2, 207,1)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214,2),
            createMaterial('Lv 2 Agricultural Planting Essence', 1, 211,2),
            createMaterial('Lv 1 Gather Essence', 2, 207,1)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214,2),
            createMaterial('Lv 2 Agricultural Planting Essence', 1, 211,2),
            createMaterial('Lv 1 Gather Essence', 2, 207,1)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214,2),
            createMaterial('Lv 2 Agricultural Planting Essence', 1, 211,2),
            createMaterial('Lv 1 Gather Essence', 2, 207,1)
          ])
      },
    },
    {
      name: "Crystal Stone Armor",
      alias: "CrystalStoneArmor",
      prices: { ron: null, usd: null },
      cdnImage:"https://icons.lumiterra.net/item-icon-48.png",
      requiresLevel: 3,
      stats: [
        { name: "Combatdef", typeNumber: "integer", values:  {min:55, max:77 }},
        { name: "Maxhp",typeNumber: "integer",  values: {min: 128, max:182 }},
      ],
      recipe: {
          materials:[
            createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215,3),
            createMaterial('Lv 3 Agricultural Planting Essence', 1, 212,3),
            createMaterial('Lv 2 Gather Essence', 2, 208,2)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215,3),
            createMaterial('Lv 3 Agricultural Planting Essence', 1, 212,3),
            createMaterial('Lv 2 Gather Essence', 2, 208,2)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215,3),
            createMaterial('Lv 3 Agricultural Planting Essence', 1, 212,3),
            createMaterial('Lv 2 Gather Essence', 2, 208,2)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215,3),
            createMaterial('Lv 3 Agricultural Planting Essence', 1, 212,3),
            createMaterial('Lv 2 Gather Essence', 2, 208,2)
          ])
      },
    },
    {
      name: "Golden Fighter Coat",
      alias: "GoldenFighterCoat",
      prices: { ron: null, usd: null },
      cdnImage:"https://icons.lumiterra.net/item-icon-336.png",
      requiresLevel: 4,
      stats: [
        { name: "Combatdef", typeNumber: "integer", values:  {min:77, max:99 }},
        { name: "Maxhp",typeNumber: "integer",  values: {min: 179, max:233 }},
      ],
      recipe: {
          materials:[
            createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410,4),
            createMaterial('Lv 4 Agricultural Planting Essence', 1, 407,4),
            createMaterial('Lv 3 Gather Essence', 2, 209,3)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410,4),
            createMaterial('Lv 4 Agricultural Planting Essence', 1, 407,4),
            createMaterial('Lv 3 Gather Essence', 2, 209,3)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410,4),
            createMaterial('Lv 4 Agricultural Planting Essence', 1, 407,4),
            createMaterial('Lv 3 Gather Essence', 2, 209,3)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410,4),
            createMaterial('Lv 4 Agricultural Planting Essence', 1, 407,4),
            createMaterial('Lv 3 Gather Essence', 2, 209,3)
          ])
      },
    },
    {
      name: "Diamond Fighter Coat",
      alias: "DiamondFighterCoat",
      prices: { ron: null, usd: null },
      cdnImage:"https://icons.lumiterra.net/item-icon-341.png",
      requiresLevel: 5,
      stats: [
        { name: "Combatdef", typeNumber: "integer", values:  {min:99, max:121 }},
        { name: "Maxhp",typeNumber: "integer",  values: {min: 228, max:282 }},
      ],
      recipe: {
          materials:[
            createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411,5),
            createMaterial('Lv 5 Agricultural Planting Essence', 1, 408,5),
            createMaterial('Lv 4 Gather Essence', 2, 404,4)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411,5),
            createMaterial('Lv 5 Agricultural Planting Essence', 1, 408,5),
            createMaterial('Lv 4 Gather Essence', 2, 404,4)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411,5),
            createMaterial('Lv 5 Agricultural Planting Essence', 1, 408,5),
            createMaterial('Lv 4 Gather Essence', 2, 404,4)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411,5),
            createMaterial('Lv 5 Agricultural Planting Essence', 1, 408,5),
            createMaterial('Lv 4 Gather Essence', 2, 404,4)
          ])
      },
    },
    {
      name: "Star Fighter Coat",
      alias: "StarFighterCoat",
      prices: { ron: null, usd: null },
      cdnImage:"https://icons.lumiterra.net/item-icon-346.png",
      requiresLevel: 6,
      stats: [
        { name: "Combatdef", typeNumber: "integer", values:  {min:121, max:143 }},
        { name: "Maxhp",typeNumber: "integer",  values: {min: 279, max:333 }},
      ],
      recipe: {
          materials:[
            createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412,6),
            createMaterial('Lv 6 Agricultural Planting Essence', 1, 409,6),
            createMaterial('Lv 5 Gather Essence', 2, 405,5)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412,6),
            createMaterial('Lv 6 Agricultural Planting Essence', 1, 409,6),
            createMaterial('Lv 5 Gather Essence', 2, 405,5)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412,6),
            createMaterial('Lv 6 Agricultural Planting Essence', 1, 409,6),
            createMaterial('Lv 5 Gather Essence', 2, 405,5)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412,6),
            createMaterial('Lv 6 Agricultural Planting Essence', 1, 409,6),
            createMaterial('Lv 5 Gather Essence', 2, 405,5)
          ])
      },
    },
    {
      name: "Lava Combat Coat",
      alias: "LavaCombatCoat",
      prices: { ron: null, usd: null },
      cdnImage:"https://icons.lumiterra.net/item-icon-531.png",
      requiresLevel: 7,
      stats: [
        { name: "Combatdef", typeNumber: "integer", values:  {min:143, max:165 }},
        { name: "Maxhp",typeNumber: "integer",  values: {min: 329, max:383 }},
      ],
      recipe: {
          materials:[
            createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611,7),
            createMaterial('Lv 7 Agricultural Planting Essence', 1, 608,7),
            createMaterial('Lv 6 Gather Essence', 2, 406,6)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611,7),
            createMaterial('Lv 7 Agricultural Planting Essence', 1, 608,7),
            createMaterial('Lv 6 Gather Essence', 2, 406,6)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611,7),
            createMaterial('Lv 7 Agricultural Planting Essence', 1, 608,7),
            createMaterial('Lv 6 Gather Essence', 2, 406,6)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611,7),
            createMaterial('Lv 7 Agricultural Planting Essence', 1, 608,7),
            createMaterial('Lv 5 Gather Essence', 2, 405,6)
          ])
      },
    },
    {
      name: "Hollow Combat Coat",
      alias: "HollowCombatCoat",
      prices: { ron: null, usd: null },
      cdnImage:"https://icons.lumiterra.net/item-icon-555.png",
      requiresLevel: 8,
      stats: [
        { name: "Combatdef", typeNumber: "integer", values:  {min:165, max:187 }},
        { name: "Maxhp",typeNumber: "integer",  values: {min: 378, max:432 }},
      ],
      recipe: {
          materials:[
            createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612,8),
            createMaterial('Lv 8 Agricultural Planting Essence', 1, 609,8),
            createMaterial('Lv 7 Gather Essence', 2, 406,7)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612,8),
            createMaterial('Lv 8 Agricultural Planting Essence', 1, 609,8),
            createMaterial('Lv 7 Gather Essence', 2, 406,7)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612,8),
            createMaterial('Lv 8 Agricultural Planting Essence', 1, 609,8),
            createMaterial('Lv 7 Gather Essence', 2, 406,7)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612,8),
            createMaterial('Lv 8 Agricultural Planting Essence', 1, 609,8),
            createMaterial('Lv 7 Gather Essence', 2, 406,7)
          ])
      },
    },
    {
      name: "Bronze Combat Coat",
      alias: "BronzeCombatCoat",
      prices: { ron: null, usd: null },
      cdnImage:"https://icons.lumiterra.net/item-icon-582.png",
      requiresLevel: 9,
      stats: [
        { name: "Combatdef", typeNumber: "integer", values:  {min:187, max:209 }},
        { name: "Maxhp",typeNumber: "integer",  values: {min: 429, max:483 }},
      ],
      recipe: {
          materials:[
            createMaterial('Lv 9 Agricultural Livestock Essence', 1, 613,9),
            createMaterial('Lv 9 Agricultural Planting Essence', 1, 610,9),
            createMaterial('Lv 8 Gather Essence', 2, 606,8)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 9 Agricultural Livestock Essence', 1, 613,9),
            createMaterial('Lv 9 Agricultural Planting Essence', 1, 610,9),
            createMaterial('Lv 8 Gather Essence', 2, 606,8)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 9 Agricultural Livestock Essence', 1, 613,9),
            createMaterial('Lv 9 Agricultural Planting Essence', 1, 610,9),
            createMaterial('Lv 8 Gather Essence', 2, 606,8)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 9 Agricultural Livestock Essence', 1, 613,9),
            createMaterial('Lv 9 Agricultural Planting Essence', 1, 610,9),
            createMaterial('Lv 8 Gather Essence', 2, 606,8)
          ])
      },
    },
  ],
  farming: [
      {
        name: "Iron Hoe",
        alias: "IronHoe",
        prices: { ron: null, usd: null },
        cdnImage: "https://icons.lumiterra.net/item-icon-80.png",
        requiresLevel: 1,
        stats: [
          { name: "Combatatt", typeNumber: "integer", values: { min: 20, max: 25 } },
          { name: "Fertilitycapacity", typeNumber: "integer", values: { min: 8, max: 24 } }
        ],
        recipe: {
          materials: [
            createMaterial('Lv 1 Gather Essence', 2, 207, 1)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 1 Gather Essence', 2, 207, 1)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 1 Gather Essence', 2, 207, 1)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 1 Gather Essence', 2, 207, 1)
          ])
        },
      },
      {
        name: "Curse Hoe",
        alias: "CurseHoe",
        prices: { ron: null, usd: null },
        cdnImage: "https://icons.lumiterra.net/item-icon-81.png",
        requiresLevel: 2,
        stats: [
          { name: "Combatatt", typeNumber: "integer", values: { min: 20, max: 25 } },
          { name: "Fertilitycapacity", typeNumber: "integer", values: { min: 23, max: 37 } }
        ],
        recipe: {
          materials: [
            createMaterial('Lv 1 Combat Essence', 2, 216, 1),
            createMaterial('Lv 2 Gather Essence', 2, 208, 2)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 1 Combat Essence', 2, 216, 1),
            createMaterial('Lv 2 Gather Essence', 2, 208, 2)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 1 Combat Essence', 2, 216, 1),
            createMaterial('Lv 2 Gather Essence', 2, 208, 2)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 1 Combat Essence', 2, 216, 1),
            createMaterial('Lv 2 Gather Essence', 2, 208, 2)
          ])
        },
      },
      {
        name: "Blessing Hoe",
        alias: "BlessingHoe",
        prices: { ron: null, usd: null },
        cdnImage: "https://icons.lumiterra.net/item-icon-82.png",
        requiresLevel: 3,
        stats: [
          { name: "Combatatt", typeNumber: "integer", values: { min: 20, max: 25 } },
          { name: "Fertilitycapacity", typeNumber: "integer", values: { min: 36, max: 48 } }
        ],
        recipe: {
          materials: [
            createMaterial('Lv 2 Combat Essence', 2, 217, 2),
            createMaterial('Lv 3 Gather Essence', 2, 209, 3)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 2 Combat Essence', 2, 217, 2),
            createMaterial('Lv 3 Gather Essence', 2, 209, 3)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 2 Combat Essence', 2, 217, 2),
            createMaterial('Lv 3 Gather Essence', 2, 209, 3)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 2 Combat Essence', 2, 217, 2),
            createMaterial('Lv 3 Gather Essence', 2, 209, 3)
          ])
        },
      },
      {
        name: "Golden Hoe",
        alias: "GoldenHoe",
        prices: { ron: null, usd: null },
        cdnImage: "https://icons.lumiterra.net/item-icon-299.png",
        requiresLevel: 4,
        stats: [
          { name: "Combatatt", typeNumber: "integer", values: { min: 20, max: 25 } },
          { name: "Fertilitycapacity", typeNumber: "integer", values: { min: 48, max: 59 } }
        ],
        recipe: {
          materials: [
            createMaterial('Lv 3 Combat Essence', 2, 218, 3),
            createMaterial('Lv 4 Gather Essence', 2, 404, 4)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 3 Combat Essence', 2, 218, 3),
            createMaterial('Lv 4 Gather Essence', 2, 404, 4)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 3 Combat Essence', 2, 218, 3),
            createMaterial('Lv 4 Gather Essence', 2, 404, 4)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 3 Combat Essence', 2, 218, 3),
            createMaterial('Lv 4 Gather Essence', 2, 404, 4)
          ])
        },
      },
      {
        name: "Diamond Hoe",
        alias: "DiamondHoe",
        prices: { ron: null, usd: null },
        cdnImage: "https://icons.lumiterra.net/item-icon-305.png",
        requiresLevel: 5,
        stats: [
          { name: "Combatatt", typeNumber: "integer", values: { min: 20, max: 25 } },
          { name: "Fertilitycapacity", typeNumber: "integer", values: { min: 58, max: 68 } }
        ],
        recipe: {
          materials: [
            createMaterial('Lv 4 Combat Essence', 2, 401, 4),
            createMaterial('Lv 5 Gather Essence', 2, 405, 5)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 4 Combat Essence', 2, 401, 4),
            createMaterial('Lv 5 Gather Essence', 2, 405, 5)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 4 Combat Essence', 2, 401, 4),
            createMaterial('Lv 5 Gather Essence', 2, 405, 5)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 4 Combat Essence', 2, 401, 4),
            createMaterial('Lv 5 Gather Essence', 2, 405, 5)
          ])
        },
      },
      {
        name: "Star Hoe",
        alias: "StarHoe",
        prices: { ron: null, usd: null },
        cdnImage: "https://icons.lumiterra.net/item-icon-311.png",
        requiresLevel: 6,
        stats: [
          { name: "Combatatt", typeNumber: "integer", values: { min: 20, max: 25 } },
          { name: "Fertilitycapacity", typeNumber: "integer", values: { min: 68, max: 77 } }
        ],
        recipe: {
          materials: [
            createMaterial('Lv 5 Combat Essence', 2, 402, 5),
            createMaterial('Lv 6 Gather Essence', 2, 406, 6)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 5 Combat Essence', 2, 402, 5),
            createMaterial('Lv 6 Gather Essence', 2, 406, 6)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 5 Combat Essence', 2, 402, 5),
            createMaterial('Lv 6 Gather Essence', 2, 406, 6)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 5 Combat Essence', 2, 402, 5),
            createMaterial('Lv 6 Gather Essence', 2, 406, 6)
          ])
        },
      },
      {
        name: "Lava Hoe",
        alias: "LavaHoe",
        prices: { ron: null, usd: null },
        cdnImage: "https://icons.lumiterra.net/item-icon-544.png",
        requiresLevel: 7,
        stats: [
          { name: "Combatatt", typeNumber: "integer", values: { min: 20, max: 25 } },
          { name: "Fertilitycapacity", typeNumber: "integer", values: { min: 77, max: 86 } }
        ],
        recipe: {
          materials: [
            createMaterial('Lv 6 Combat Essence', 2, 403, 6),
            createMaterial('Lv 7 Gather Essence', 2, 605, 7)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 6 Combat Essence', 2, 403, 6),
            createMaterial('Lv 7 Gather Essence', 2, 605, 7)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 6 Combat Essence', 2, 403, 6),
            createMaterial('Lv 7 Gather Essence', 2, 605, 7)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 6 Combat Essence', 2, 403, 6),
            createMaterial('Lv 7 Gather Essence', 2, 605, 7)
          ])
        },
      },
      {
        name: "Hollow Hoe",
        alias: "HollowHoe",
        prices: { ron: null, usd: null },
        cdnImage: "https://icons.lumiterra.net/item-icon-568.png",
        requiresLevel: 8,
        stats: [
          { name: "Combatatt", typeNumber: "integer", values: { min: 20, max: 25 } },
          { name: "Fertilitycapacity", typeNumber: "integer", values: { min: 85, max: 94 } }
        ],
        recipe: {
          materials: [
            createMaterial('Lv 7 Combat Essence', 2, 602, 7),
            createMaterial('Lv 8 Gather Essence', 2, 606, 8)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 7 Combat Essence', 2, 602, 7),
            createMaterial('Lv 8 Gather Essence', 2, 606, 8)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 7 Combat Essence', 2, 602, 7),
            createMaterial('Lv 8 Gather Essence', 2, 606, 8)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 7 Combat Essence', 2, 602, 7),
            createMaterial('Lv 8 Gather Essence', 2, 606, 8)
          ])
        },
      },
      {
        name: "Bronze Hoe",
        alias: "BronzeHoe",
        prices: { ron: null, usd: null },
        cdnImage: "https://icons.lumiterra.net/item-icon-592.png",
        requiresLevel: 9,
        stats: [
          { name: "Combatatt", typeNumber: "integer", values: { min: 20, max: 25 } },
          { name: "Fertilitycapacity", typeNumber: "integer", values: { min: 94, max: 101 } }
        ],
        recipe: {
          materials: [
            createMaterial('Lv 8 Combat Essence', 2, 603, 8),
            createMaterial('Lv 9 Gather Essence', 2, 607, 9)
          ],
          minPriceTotalRon: calculateTotalPrice([
            createMaterial('Lv 8 Combat Essence', 2, 603, 8),
            createMaterial('Lv 9 Gather Essence', 2, 607, 9)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
            createMaterial('Lv 8 Combat Essence', 2, 603, 8),
            createMaterial('Lv 9 Gather Essence', 2, 607, 9)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
            createMaterial('Lv 8 Combat Essence', 2, 603, 8),
            createMaterial('Lv 9 Gather Essence', 2, 607, 9)
          ])
        },
      },
      {
        name: "Iron Kettle",
        alias: "IronKettle",
        prices: { ron: null, usd: null },
        cdnImage: "https://icons.lumiterra.net/item-icon-84.png",  // Reemplazar con la URL de la imagen correspondiente
        requiresLevel: 1,
        stats: [
            { name: "Wateringeffect", typeNumber: "integer", values: { min: 23, max: 37 }},
        ],
        recipe: {
            materials: [
                createMaterial('Lv 1 Gather Essence', 2, 207, 1),
            ],
            minPriceTotalRon: calculateTotalPrice([
                createMaterial('Lv 1 Gather Essence', 2, 207, 1),
            ], 'Ron'),
            minPriceTotalUsd: calculateTotalPrice([
                createMaterial('Lv 1 Gather Essence', 2, 207, 1),
            ], 'Usd'),
            totalRequireEnergy: calculateTotalRequireEnergy([
                createMaterial('Lv 1 Gather Essence', 2, 207, 1),
            ])
        },
    },
    {
        name: "Curse Kettle",
        alias: "CurseKettle",
        prices: { ron: null, usd: null },
        cdnImage: "https://icons.lumiterra.net/item-icon-85.png",  // Reemplazar con la URL de la imagen correspondiente
        requiresLevel: 2,
        stats: [
            { name: "Wateringeffect", typeNumber: "integer", values: { min: 38, max: 52 }},
        ],
        recipe: {
            materials: [
                createMaterial('Lv 1 Combat Essence', 2, 216, 1),
                createMaterial('Lv 2 Gather Essence', 2, 208, 2)
            ],
            minPriceTotalRon: calculateTotalPrice([
                createMaterial('Lv 1 Combat Essence', 2, 216, 1),
                createMaterial('Lv 2 Gather Essence', 2, 208, 2)
            ], 'Ron'),
            minPriceTotalUsd: calculateTotalPrice([
                createMaterial('Lv 1 Combat Essence', 2, 216, 1),
                createMaterial('Lv 2 Gather Essence', 2, 208, 2)
            ], 'Usd'),
            totalRequireEnergy: calculateTotalRequireEnergy([
                createMaterial('Lv 1 Combat Essence', 2, 216, 1),
                createMaterial('Lv 2 Gather Essence', 2, 208, 2)
            ])
        },
    },
    {
        name: "Blessing Kettle",
        alias: "BlessingKettle",
        prices: { ron: null, usd: null },
        cdnImage: "https://icons.lumiterra.net/item-icon-86.png",  // Reemplazar con la URL de la imagen correspondiente
        requiresLevel: 3,
        stats: [
            { name: "Wateringeffect", typeNumber: "integer", values: { min: 53, max: 67 }},
        ],
        recipe: {
            materials: [
                createMaterial('Lv 2 Combat Essence', 2, 217, 2),
                createMaterial('Lv 3 Gather Essence', 2, 209, 3)
            ],
            minPriceTotalRon: calculateTotalPrice([
                createMaterial('Lv 2 Combat Essence', 2, 217, 2),
                createMaterial('Lv 3 Gather Essence', 2, 209, 3)
            ], 'Ron'),
            minPriceTotalUsd: calculateTotalPrice([
                createMaterial('Lv 2 Combat Essence', 2, 217, 2),
                createMaterial('Lv 3 Gather Essence', 2, 209, 3)
            ], 'Usd'),
            totalRequireEnergy: calculateTotalRequireEnergy([
                createMaterial('Lv 2 Combat Essence', 2, 217, 2),
                createMaterial('Lv 3 Gather Essence', 2, 209, 3)
            ])
        },
    },
    {
        name: "Golden Kettle",
        alias: "GoldenKettle",
        prices: { ron: null, usd: null },
        cdnImage: "https://icons.lumiterra.net/item-icon-304.png",  // Reemplazar con la URL de la imagen correspondiente
        requiresLevel: 4,
        stats: [
            { name: "Wateringeffect", typeNumber: "integer", values: { min: 68, max: 72 }},
        ],
        recipe: {
            materials: [
                createMaterial('Lv 3 Combat Essence', 2, 218, 3),
                createMaterial('Lv 4 Gather Essence', 2, 404, 4)
            ],
            minPriceTotalRon: calculateTotalPrice([
                createMaterial('Lv 3 Combat Essence', 2, 218, 3),
                createMaterial('Lv 4 Gather Essence', 2, 404, 4)
            ], 'Ron'),
            minPriceTotalUsd: calculateTotalPrice([
                createMaterial('Lv 3 Combat Essence', 2, 218, 3),
                createMaterial('Lv 4 Gather Essence', 2, 404, 4)
            ], 'Usd'),
            totalRequireEnergy: calculateTotalRequireEnergy([
                createMaterial('Lv 3 Combat Essence', 2, 218, 3),
                createMaterial('Lv 4 Gather Essence', 2, 404, 4)
            ])
        },
    },
    {
        name: "Diamond Kettle",
        alias: "DiamondKettle",
        prices: { ron: null, usd: null },
        cdnImage: "https://icons.lumiterra.net/item-icon-310.png",  // Reemplazar con la URL de la imagen correspondiente
        requiresLevel: 5,
        stats: [
            { name: "Wateringeffect", typeNumber: "integer", values: { min: 83, max: 97 }},
        ],
        recipe: {
            materials: [
                createMaterial('Lv 4 Combat Essence', 2, 401, 4),
                createMaterial('Lv 5 Gather Essence', 2, 405, 5)
            ],
            minPriceTotalRon: calculateTotalPrice([
                createMaterial('Lv 4 Combat Essence', 2, 401, 4),
                createMaterial('Lv 5 Gather Essence', 2, 405, 5)
            ], 'Ron'),
            minPriceTotalUsd: calculateTotalPrice([
                createMaterial('Lv 4 Combat Essence', 2, 401, 4),
                createMaterial('Lv 5 Gather Essence', 2, 405, 5)
            ], 'Usd'),
            totalRequireEnergy: calculateTotalRequireEnergy([
                createMaterial('Lv 4 Combat Essence', 2, 401, 4),
                createMaterial('Lv 5 Gather Essence', 2, 405, 5)
            ])
        },
    },
    {
        name: "Star Kettle",
        alias: "StarKettle",
        prices: { ron: null, usd: null },
        cdnImage: "https://icons.lumiterra.net/item-icon-316.png",  // Reemplazar con la URL de la imagen correspondiente
        requiresLevel: 6,
        stats: [
            { name: "Wateringeffect", typeNumber: "integer", values: { min: 98, max: 112 }},
        ],
        recipe: {
            materials: [
                createMaterial('Lv 5 Combat Essence', 2, 402, 5),
                createMaterial('Lv 6 Gather Essence', 2, 406, 6)
            ],
            minPriceTotalRon: calculateTotalPrice([
                createMaterial('Lv 5 Combat Essence', 2, 402, 5),
                createMaterial('Lv 6 Gather Essence', 2, 406, 6)
            ], 'Ron'),
            minPriceTotalUsd: calculateTotalPrice([
                createMaterial('Lv 5 Combat Essence', 2, 402, 5),
                createMaterial('Lv 6 Gather Essence', 2, 406, 6)
            ], 'Usd'),
            totalRequireEnergy: calculateTotalRequireEnergy([
                createMaterial('Lv 5 Combat Essence', 2, 402, 5),
                createMaterial('Lv 6 Gather Essence', 2, 406, 6)
            ])
        },
    },
    {
        name: "Lava Kettle",
        alias: "LavaKettle",
        prices: { ron: null, usd: null },
        cdnImage: "https://icons.lumiterra.net/item-icon-543.png",  // Reemplazar con la URL de la imagen correspondiente
        requiresLevel: 7,
        stats: [
            { name: "Wateringeffect", typeNumber: "integer", values: { min: 113, max: 127 }},
        ],
        recipe: {
            materials: [
                createMaterial('Lv 6 Combat Essence', 2, 403, 6),
                createMaterial('Lv 7 Gather Essence', 2, 605, 7)
            ],
            minPriceTotalRon: calculateTotalPrice([
                createMaterial('Lv 6 Combat Essence', 2, 403, 6),
                createMaterial('Lv 7 Gather Essence', 2, 605, 7)
            ], 'Ron'),
            minPriceTotalUsd: calculateTotalPrice([
                createMaterial('Lv 6 Combat Essence', 2, 403, 6),
                createMaterial('Lv 7 Gather Essence', 2, 605, 7)
            ], 'Usd'),
            totalRequireEnergy: calculateTotalRequireEnergy([
                createMaterial('Lv 6 Combat Essence', 2, 403, 6),
                createMaterial('Lv 7 Gather Essence', 2, 605, 7)
            ])
        },
    },
    {
        name: "Hollow Kettle",
        alias: "HollowKettle",
        prices: { ron: null, usd: null },
        cdnImage: "https://icons.lumiterra.net/item-icon-567.png",  // Reemplazar con la URL de la imagen correspondiente
        requiresLevel: 8,
        stats: [
            { name: "Wateringeffect", typeNumber: "integer", values: { min: 128, max: 142 }},
        ],
        recipe: {
            materials: [
                createMaterial('Lv 7 Combat Essence', 2, 602, 7),
                createMaterial('Lv 8 Gather Essence', 2, 606, 8)
            ],
            minPriceTotalRon: calculateTotalPrice([
                createMaterial('Lv 7 Combat Essence', 2, 602, 7),
                createMaterial('Lv 8 Gather Essence', 2, 606, 8)
            ], 'Ron'),
            minPriceTotalUsd: calculateTotalPrice([
                createMaterial('Lv 7 Combat Essence', 2, 602, 7),
                createMaterial('Lv 8 Gather Essence', 2, 606, 8)
            ], 'Usd'),
            totalRequireEnergy: calculateTotalRequireEnergy([
                createMaterial('Lv 7 Combat Essence', 2, 602, 7),
                createMaterial('Lv 8 Gather Essence', 2, 606, 8)
            ])
        },
    },
    {
        name: "Bronze Kettle",
        alias: "BronzeKettle",
        prices: { ron: null, usd: null },
        cdnImage: "https://icons.lumiterra.net/item-icon-591.png",  // Reemplazar con la URL de la imagen correspondiente
        requiresLevel: 9,
        stats: [
            { name: "Wateringeffect", typeNumber: "integer", values: { min: 143, max: 157 }},
        ],
        recipe: {
            materials: [
                createMaterial('Lv 8 Combat Essence', 2, 603, 8),
                createMaterial('Lv 9 Gather Essence', 2, 607, 9)
            ],
            minPriceTotalRon: calculateTotalPrice([
                createMaterial('Lv 8 Combat Essence', 2, 603, 8),
                createMaterial('Lv 9 Gather Essence', 2, 607, 9)
            ], 'Ron'),
            minPriceTotalUsd: calculateTotalPrice([
                createMaterial('Lv 8 Combat Essence', 2, 603, 8),
                createMaterial('Lv 9 Gather Essence', 2, 607, 9)
            ], 'Usd'),
            totalRequireEnergy: calculateTotalRequireEnergy([
                createMaterial('Lv 8 Combat Essence', 2, 603, 8),
                createMaterial('Lv 9 Gather Essence', 2, 607, 9)
            ])
        },
    },
    {
      name: "Copper Brush",
      alias: "CopperBrush",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-453.png",  // Reemplazar con la URL de la imagen correspondiente
      requiresLevel: 1,
      stats: [
          { name: "Pethappinesscapacity", typeNumber: "integer", values: { min: 8, max: 24 }},
      ],
      recipe: {
          materials: [
              createMaterial('Lv 1 Gather Essence', 2, 207, 1),
          ],
          minPriceTotalRon: calculateTotalPrice([
              createMaterial('Lv 1 Gather Essence', 2, 207, 1),
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
              createMaterial('Lv 1 Gather Essence', 2, 207, 1),
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
              createMaterial('Lv 1 Gather Essence', 2, 207, 1),
          ])
      },
  },
  {
      name: "Iron Brush",
      alias: "IronBrush",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-454.png",  // Reemplazar con la URL de la imagen correspondiente
      requiresLevel: 2,
      stats: [
          { name: "Pethappinesscapacity", typeNumber: "integer", values: { min: 23, max: 37 }},
      ],
      recipe: {
          materials: [
              createMaterial('Lv 1 Combat Essence', 2, 216, 1),
              createMaterial('Lv 2 Gather Essence', 2, 208, 2)
          ],
          minPriceTotalRon: calculateTotalPrice([
              createMaterial('Lv 1 Combat Essence', 2, 216, 1),
              createMaterial('Lv 2 Gather Essence', 2, 208, 2)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
              createMaterial('Lv 1 Combat Essence', 2, 216, 1),
              createMaterial('Lv 2 Gather Essence', 2, 208, 2)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
              createMaterial('Lv 1 Combat Essence', 2, 216, 1),
              createMaterial('Lv 2 Gather Essence', 2, 208, 2)
          ])
      },
  },
  {
      name: "Crystal Brush",
      alias: "CrystalBrush",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-455.png",  // Reemplazar con la URL de la imagen correspondiente
      requiresLevel: 3,
      stats: [
          { name: "Pethappinesscapacity", typeNumber: "integer", values: { min: 36, max: 48 }},
      ],
      recipe: {
          materials: [
              createMaterial('Lv 2 Combat Essence', 2, 217, 2),
              createMaterial('Lv 3 Gather Essence', 2, 209, 3)
          ],
          minPriceTotalRon: calculateTotalPrice([
              createMaterial('Lv 2 Combat Essence', 2, 217, 2),
              createMaterial('Lv 3 Gather Essence', 2, 209, 3)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
              createMaterial('Lv 2 Combat Essence', 2, 217, 2),
              createMaterial('Lv 3 Gather Essence', 2, 209, 3)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
              createMaterial('Lv 2 Combat Essence', 2, 217, 2),
              createMaterial('Lv 3 Gather Essence', 2, 209, 3)
          ])
      },
  },
  {
      name: "Golden Brush",
      alias: "GoldenBrush",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-456.png",  // Reemplazar con la URL de la imagen correspondiente
      requiresLevel: 4,
      stats: [
          { name: "Pethappinesscapacity", typeNumber: "integer", values: { min: 48, max: 59 }},
      ],
      recipe: {
          materials: [
              createMaterial('Lv 3 Combat Essence', 2, 218, 3),
              createMaterial('Lv 4 Gather Essence', 2, 404, 4)
          ],
          minPriceTotalRon: calculateTotalPrice([
              createMaterial('Lv 3 Combat Essence', 2, 218, 3),
              createMaterial('Lv 4 Gather Essence', 2, 404, 4)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
              createMaterial('Lv 3 Combat Essence', 2, 218, 3),
              createMaterial('Lv 4 Gather Essence', 2, 404, 4)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
              createMaterial('Lv 3 Combat Essence', 2, 218, 3),
              createMaterial('Lv 4 Gather Essence', 2, 404, 4)
          ])
      },
  },
  {
      name: "Diamond Brush",
      alias: "DiamondBrush",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-457.png",  // Reemplazar con la URL de la imagen correspondiente
      requiresLevel: 5,
      stats: [
          { name: "Pethappinesscapacity", typeNumber: "integer", values: { min: 58, max: 68 }},
      ],
      recipe: {
          materials: [
              createMaterial('Lv 4 Combat Essence', 2, 401, 4),
              createMaterial('Lv 5 Gather Essence', 2, 405, 5)
          ],
          minPriceTotalRon: calculateTotalPrice([
              createMaterial('Lv 4 Combat Essence', 2, 401, 4),
              createMaterial('Lv 5 Gather Essence', 2, 405, 5)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
              createMaterial('Lv 4 Combat Essence', 2, 401, 4),
              createMaterial('Lv 5 Gather Essence', 2, 405, 5)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
              createMaterial('Lv 4 Combat Essence', 2, 401, 4),
              createMaterial('Lv 5 Gather Essence', 2, 405, 5)
          ])
      },
  },
  {
      name: "Starlight Brush",
      alias: "StarlightBrush",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-458.png",  // Reemplazar con la URL de la imagen correspondiente
      requiresLevel: 6,
      stats: [
          { name: "Pethappinesscapacity", typeNumber: "integer", values: { min: 68, max: 77 }},
      ],
      recipe: {
          materials: [
              createMaterial('Lv 5 Combat Essence', 2, 402, 5),
              createMaterial('Lv 6 Gather Essence', 2, 406, 6)
          ],
          minPriceTotalRon: calculateTotalPrice([
              createMaterial('Lv 5 Combat Essence', 2, 402, 5),
              createMaterial('Lv 6 Gather Essence', 2, 406, 6)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
              createMaterial('Lv 5 Combat Essence', 2, 402, 5),
              createMaterial('Lv 6 Gather Essence', 2, 406, 6)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
              createMaterial('Lv 5 Combat Essence', 2, 402, 5),
              createMaterial('Lv 6 Gather Essence', 2, 406, 6)
          ])
      },
  },
  {
      name: "Lava Brush",
      alias: "LavaBrush",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-545.png",  // Reemplazar con la URL de la imagen correspondiente
      requiresLevel: 7,
      stats: [
          { name: "Pethappinesscapacity", typeNumber: "integer", values: { min: 77, max: 86 }},
      ],
      recipe: {
          materials: [
              createMaterial('Lv 6 Combat Essence', 2, 403, 6),
              createMaterial('Lv 7 Gather Essence', 2, 605, 7)
          ],
          minPriceTotalRon: calculateTotalPrice([
              createMaterial('Lv 6 Combat Essence', 2, 403, 6),
              createMaterial('Lv 7 Gather Essence', 2, 605, 7)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
              createMaterial('Lv 6 Combat Essence', 2, 403, 6),
              createMaterial('Lv 7 Gather Essence', 2, 605, 7)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
              createMaterial('Lv 6 Combat Essence', 2, 403, 6),
              createMaterial('Lv 7 Gather Essence', 2, 605, 7)
          ])
      },
  },
  {
      name: "Hollow Brush",
      alias: "HollowBrush",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-569.png",  // Reemplazar con la URL de la imagen correspondiente
      requiresLevel: 8,
      stats: [
          { name: "Pethappinesscapacity", typeNumber: "integer", values: { min: 85, max: 94 }},
      ],
      recipe: {
          materials: [
              createMaterial('Lv 7 Combat Essence', 2, 602, 9),
              createMaterial('Lv 8 Gather Essence', 2, 606, 8)
          ],
          minPriceTotalRon: calculateTotalPrice([
              createMaterial('Lv 7 Combat Essence', 2, 602, 9),
              createMaterial('Lv 8 Gather Essence', 2, 606, 8)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
              createMaterial('Lv 7 Combat Essence', 2, 602, 9),
              createMaterial('Lv 8 Gather Essence', 2, 606, 8)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
              createMaterial('Lv 7 Combat Essence', 2, 602, 9),
              createMaterial('Lv 8 Gather Essence', 2, 606, 8)
          ])
      },
  },
  {
      name: "Bronze Brush",
      alias: "BronzeBrush",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-593.png",  // Reemplazar con la URL de la imagen correspondiente
      requiresLevel: 9,
      stats: [
          { name: "Pethappinesscapacity", typeNumber: "integer", values: { min: 94, max: 101 }},
      ],
      recipe: {
          materials: [
              createMaterial('Lv 8 Combat Essence', 2, 603, 8),
              createMaterial('Lv 9 Gather Essence', 2, 607, 9)
          ],
          minPriceTotalRon: calculateTotalPrice([
              createMaterial('Lv 8 Combat Essence', 2, 603, 8),
              createMaterial('Lv 9 Gather Essence', 2, 607, 9)
          ], 'Ron'),
          minPriceTotalUsd: calculateTotalPrice([
              createMaterial('Lv 8 Combat Essence', 2, 603, 8),
              createMaterial('Lv 9 Gather Essence', 2, 607, 9)
          ], 'Usd'),
          totalRequireEnergy: calculateTotalRequireEnergy([
              createMaterial('Lv 8 Combat Essence', 2, 603, 8),
              createMaterial('Lv 9 Gather Essence', 2, 607, 9)
          ])
      },
    },
    {
      name: "Farming Shoes",
      alias: "FarmingShoesLv1",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-110.png",
      requiresLevel: 1,
      stats: [
        { name: "Breedingproficiency", typeNumber: "integer", values: { min: 9, max: 27 }},
        { name: "Plantigproficiency", typeNumber: "integer", values: { min: 9, max: 27 }},
        { name: "Maxfertility", typeNumber: "integer", values: { min: 184, max: 551 }},
        { name: "Maxpethappiness", typeNumber: "integer", values: { min: 46, max: 138 }},
      ],
      recipe: {
        materials: [
          createMaterial('Lv 1 Gather Essence', 2, 207, 1),
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 1 Gather Essence', 2, 207, 1)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 1 Gather Essence', 2, 207, 1)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 1 Gather Essence', 2, 207, 1)
        ])
      },
    },
    {
      name: "Farming Shoes",
      alias: "FarmingShoesLv2",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-111.png",
      requiresLevel: 2,
      stats: [
        { name: "Breedingproficiency", typeNumber: "integer", values: { min: 27, max: 44 }},
        { name: "Plantigproficiency", typeNumber: "integer", values: { min: 27, max: 44 }},
        { name: "Maxfertility", typeNumber: "integer", values: { min: 551, max: 918 }},
        { name: "Maxpethappiness", typeNumber: "integer", values: { min: 138, max: 230 }},
      ],
      recipe: {
        materials: [
          createMaterial('Lv 1 Combat Essence', 2, 216, 1),
          createMaterial('Lv 2 Gather Essence', 2, 208, 2)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 1 Combat Essence', 2, 216, 1),
          createMaterial('Lv 2 Gather Essence', 2, 208, 2)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 1 Combat Essence', 2, 216, 1),
          createMaterial('Lv 2 Gather Essence', 2, 208, 2)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 1 Combat Essence', 2, 216, 1),
          createMaterial('Lv 2 Gather Essence', 2, 208, 2)
        ])
      },
    },
    {
      name: "Farming Shoes",
      alias: "FarmingShoesLv3",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-112.png",
      requiresLevel: 3,
      stats: [
        { name: "Breedingproficiency", typeNumber: "integer", values: { min: 44, max: 62 }},
        { name: "Plantigproficiency", typeNumber: "integer", values: { min: 44, max: 62 }},
        { name: "Maxfertility", typeNumber: "integer", values: { min: 918, max: 1285 }},
        { name: "Maxpethappiness", typeNumber: "integer", values: { min: 230, max: 321 }},
      ],
      recipe: {
        materials: [
          createMaterial('Lv 2 Combat Essence', 2, 217, 2),
          createMaterial('Lv 3 Gather Essence', 2, 209, 3)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 2 Combat Essence', 2, 217, 2),
          createMaterial('Lv 3 Gather Essence', 2, 209, 3)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 2 Combat Essence', 2, 217, 2),
          createMaterial('Lv 3 Gather Essence', 2, 209, 3)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 2 Combat Essence', 2, 217, 2),
          createMaterial('Lv 3 Gather Essence', 2, 209, 3)
        ])
      },
    },
    {
      name: "Golden Farmer Shoes",
      alias: "GoldenFarmerShoes",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-354.png",
      requiresLevel: 4,
      stats: [
        { name: "Breedingproficiency", typeNumber: "integer", values: { min: 62, max: 80 }},
        { name: "Plantigproficiency", typeNumber: "integer", values: { min: 62, max: 80 }},
        { name: "Maxfertility", typeNumber: "integer", values: { min: 1285, max: 1625 }},
        { name: "Maxpethappiness", typeNumber: "integer", values: { min: 321, max: 413 }},
      ],
      recipe: {
        materials: [
          createMaterial('Lv 3 Combat Essence', 2, 218, 3),
          createMaterial('Lv 4 Gather Essence', 2, 404, 4)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 3 Combat Essence', 2, 218, 3),
          createMaterial('Lv 4 Gather Essence', 2, 404, 4)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 3 Combat Essence', 2, 218, 3),
          createMaterial('Lv 4 Gather Essence', 2, 404, 4)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 3 Combat Essence', 2, 218, 3),
          createMaterial('Lv 4 Gather Essence', 2, 404, 4)
        ])
      },
    },
    {
      name: "Diamond Farmer Shoes",
      alias: "DiamondFarmerShoes",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-359.png",
      requiresLevel: 5,
      stats: [
        { name: "Breedingproficiency", typeNumber: "integer", values: { min: 80, max: 97 }},
        { name: "Plantigproficiency", typeNumber: "integer", values: { min: 80, max: 97 }},
        { name: "Maxfertility", typeNumber: "integer", values: { min: 1625, max: 2019 }},
        { name: "Maxpethappiness", typeNumber: "integer", values: { min: 413, max: 505 }},
      ],
      recipe: {
        materials: [
          createMaterial('Lv 4 Combat Essence', 2, 401, 4),
          createMaterial('Lv 5 Gather Essence', 2, 405, 5)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 4 Combat Essence', 2, 401, 4),
          createMaterial('Lv 5 Gather Essence', 2, 405, 5)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 4 Combat Essence', 2, 401, 4),
          createMaterial('Lv 5 Gather Essence', 2, 405, 5)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 4 Combat Essence', 2, 401, 4),
          createMaterial('Lv 5 Gather Essence', 2, 405, 5)
        ])
      },
    },
    {
      name: "Star Farmer Shoes",
      alias: "StarFarmerShoes",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-364.png",
      requiresLevel: 6,
      stats: [
        { name: "Breedingproficiency", typeNumber: "integer", values: { min: 97, max: 115 }},
        { name: "Plantigproficiency", typeNumber: "integer", values: { min: 97, max: 115 }},
        { name: "Maxfertility", typeNumber: "integer", values: { min: 2019, max: 2386 }},
        { name: "Maxpethappiness", typeNumber: "integer", values: { min: 505, max: 597 }},
      ],
      recipe: {
        materials: [
          createMaterial('Lv 5 Combat Essence', 2, 402, 5),
          createMaterial('Lv 6 Gather Essence', 2, 406, 6)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 5 Combat Essence', 2, 402, 5),
          createMaterial('Lv 6 Gather Essence', 2, 406, 6)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 5 Combat Essence', 2, 402, 5),
          createMaterial('Lv 6 Gather Essence', 2, 406, 6)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 5 Combat Essence', 2, 402, 5),
          createMaterial('Lv 6 Gather Essence', 2, 406, 6)
        ])
      },
    },
    {
      name: "Lava Farming Shoes",
      alias: "LavaFarmingShoes",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-550.png",
      requiresLevel: 7,
      stats: [
        { name: "Breedingproficiency", typeNumber: "integer", values: { min: 115, max: 133 }},
        { name: "Plantigproficiency", typeNumber: "integer", values: { min: 115, max: 133 }},
        { name: "Maxfertility", typeNumber: "integer", values: { min: 2386, max: 2753 }},
        { name: "Maxpethappiness", typeNumber: "integer", values: { min: 597, max: 688 }},
      ],
      recipe: {
        materials: [
          createMaterial('Lv 6 Combat Essence', 2, 403, 6),
          createMaterial('Lv 7 Gather Essence', 2, 605, 7)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 6 Combat Essence', 2, 403, 6),
          createMaterial('Lv 7 Gather Essence', 2, 605, 7)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 6 Combat Essence', 2, 403, 6),
          createMaterial('Lv 7 Gather Essence', 2, 605, 7)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 6 Combat Essence', 2, 403, 6),
          createMaterial('Lv 7 Gather Essence', 2, 605, 7)
        ])
      },
    },
    {
      name: "Hollow Farming Shoes",
      alias: "HollowFarmingShoes",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-574.png",
      requiresLevel: 8,
      stats: [
        { name: "Breedingproficiency", typeNumber: "integer", values: { min: 133, max: 150 }},
        { name: "Plantigproficiency", typeNumber: "integer", values: { min: 133, max: 150 }},
        { name: "Maxfertility", typeNumber: "integer", values: { min: 2753, max: 3120 }},
        { name: "Maxpethappiness", typeNumber: "integer", values: { min: 688, max: 780 }},
      ],
      recipe: {
        materials: [
          createMaterial('Lv 7 Combat Essence', 2, 602, 7),
          createMaterial('Lv 8 Gather Essence', 2, 606, 8)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 7 Combat Essence', 2, 602, 7),
          createMaterial('Lv 8 Gather Essence', 2, 606, 8)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 7 Combat Essence', 2, 602, 7),
          createMaterial('Lv 8 Gather Essence', 2, 606, 8)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 7 Combat Essence', 2, 602, 7),
          createMaterial('Lv 8 Gather Essence', 2, 606, 8)
        ])
      },
    },
    {
      name: "Bronze Farming Shoes",
      alias: "BronzeFarmingShoes",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-598.png",
      requiresLevel: 9,
      stats: [
        { name: "Breedingproficiency", typeNumber: "integer", values: { min: 150, max: 168 }},
        { name: "Plantigproficiency", typeNumber: "integer", values: { min: 150, max: 168 }},
        { name: "Maxfertility", typeNumber: "integer", values: { min: 3120, max: 3487 }},
        { name: "Maxpethappiness", typeNumber: "integer", values: { min: 780, max: 872 }},
      ],
      recipe: {
        materials: [
          createMaterial('Lv 8 Combat Essence', 2, 603, 8),
          createMaterial('Lv 9 Gather Essence', 2, 607, 9)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 8 Combat Essence', 2, 603, 8),
          createMaterial('Lv 9 Gather Essence', 2, 607, 9)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 8 Combat Essence', 2, 603, 8),
          createMaterial('Lv 9 Gather Essence', 2, 607, 9)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 8 Combat Essence', 2, 603, 8),
          createMaterial('Lv 9 Gather Essence', 2, 607, 9)
        ])
      },
    },
    {
      name: "Farming Pants",
      alias: "FarmingPantsLv1",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-104.png",
      requiresLevel: 1,
      stats: [
        { name: "Breedingproficiency", typeNumber: "integer", values: { min: 9, max: 27 }},
        { name: "Plantigproficiency", typeNumber: "integer", values: { min: 9, max: 27 }},
        { name: "Maxfertility", typeNumber: "integer", values: { min: 175, max: 524 }},
        { name: "Maxpethappiness", typeNumber: "integer", values: { min: 44, max: 131 }},
      ],
      recipe: {
        materials: [
          createMaterial('Lv 1 Gather Essence', 2, 207, 1),
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 1 Gather Essence', 2, 207, 1)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 1 Gather Essence', 2, 207, 1)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 1 Gather Essence', 2, 207, 1)
        ])
      },
    },
    {
      name: "Farming Pants",
      alias: "FarmingPantsLv2",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-105.png",
      requiresLevel: 2,
      stats: [
        { name: "Breedingproficiency", typeNumber: "integer", values: { min: 27, max: 44 }},
        { name: "Plantigproficiency", typeNumber: "integer", values: { min: 27, max: 44 }},
        { name: "Maxfertility", typeNumber: "integer", values: { min: 524, max: 873 }},
        { name: "Maxpethappiness", typeNumber: "integer", values: { min: 131, max: 218 }},
      ],
      recipe: {
        materials: [
          createMaterial('Lv 1 Combat Essence', 2, 216, 1),
          createMaterial('Lv 2 Gather Essence', 2, 208, 2)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 1 Combat Essence', 2, 216, 1),
          createMaterial('Lv 2 Gather Essence', 2, 208, 2)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 1 Combat Essence', 2, 216, 1),
          createMaterial('Lv 2 Gather Essence', 2, 208, 2)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 1 Combat Essence', 2, 216, 1),
          createMaterial('Lv 2 Gather Essence', 2, 208, 2)
        ])
      },
    },
    {
      name: "Farming Pants",
      alias: "FarmingPantsLv3",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-106.png",
      requiresLevel: 3,
      stats: [
        { name: "Breedingproficiency", typeNumber: "integer", values: { min: 44, max: 62 }},
        { name: "Plantigproficiency", typeNumber: "integer", values: { min: 44, max: 62 }},
        { name: "Maxfertility", typeNumber: "integer", values: { min: 873, max: 1222 }},
        { name: "Maxpethappiness", typeNumber: "integer", values: { min: 218, max: 306 }},
      ],
      recipe: {
        materials: [
          createMaterial('Lv 2 Combat Essence', 2, 217, 2),
          createMaterial('Lv 3 Gather Essence', 2, 209, 3)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 2 Combat Essence', 2, 217, 2),
          createMaterial('Lv 3 Gather Essence', 2, 209, 3)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 2 Combat Essence', 2, 217, 2),
          createMaterial('Lv 3 Gather Essence', 2, 209, 3)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 2 Combat Essence', 2, 217, 2),
          createMaterial('Lv 3 Gather Essence', 2, 209, 3)
        ])
      },
    },
    {
      name: "Golden Farmer Pants",
      alias: "GoldenFarmerPants",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-353.png",
      requiresLevel: 4,
      stats: [
        { name: "Breedingproficiency", typeNumber: "integer", values: { min: 62, max: 80 }},
        { name: "Plantigproficiency", typeNumber: "integer", values: { min: 62, max: 80 }},
        { name: "Maxfertility", typeNumber: "integer", values: { min: 1222, max: 1571 }},
        { name: "Maxpethappiness", typeNumber: "integer", values: { min: 306, max: 394 }},
      ],
      recipe: {
        materials: [
          createMaterial('Lv 3 Combat Essence', 2, 218, 3),
          createMaterial('Lv 4 Gather Essence', 2, 404, 4)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 3 Combat Essence', 2, 218, 3),
          createMaterial('Lv 4 Gather Essence', 2, 404, 4)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 3 Combat Essence', 2, 218, 3),
          createMaterial('Lv 4 Gather Essence', 2, 404, 4)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 3 Combat Essence', 2, 218, 3),
          createMaterial('Lv 4 Gather Essence', 2, 404, 4)
        ])
      },
    },
    {
      name: "Diamond Farmer Pants",
      alias: "DiamondFarmerPants",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-358.png",
      requiresLevel: 5,
      stats: [
        { name: "Breedingproficiency", typeNumber: "integer", values: { min: 80, max: 97 }},
        { name: "Plantigproficiency", typeNumber: "integer", values: { min: 80, max: 97 }},
        { name: "Maxfertility", typeNumber: "integer", values: { min: 1571, max: 1920 }},
        { name: "Maxpethappiness", typeNumber: "integer", values: { min: 394, max: 482 }},
      ],
      recipe: {
        materials: [
          createMaterial('Lv 4 Combat Essence', 2, 401, 4),
          createMaterial('Lv 5 Gather Essence', 2, 405, 5)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 4 Combat Essence', 2, 401, 4),
          createMaterial('Lv 5 Gather Essence', 2, 405, 5)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 4 Combat Essence', 2, 401, 4),
          createMaterial('Lv 5 Gather Essence', 2, 405, 5)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 4 Combat Essence', 2, 401, 4),
          createMaterial('Lv 5 Gather Essence', 2, 405, 5)
        ])
      },
    },
    {
      name: "Star Farmer Pants",
      alias: "StarFarmerPants",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-363.png",
      requiresLevel: 6,
      stats: [
        { name: "Breedingproficiency", typeNumber: "integer", values: { min: 97, max: 115 }},
        { name: "Plantigproficiency", typeNumber: "integer", values: { min: 97, max: 115 }},
        { name: "Maxfertility", typeNumber: "integer", values: { min: 1920, max: 2269 }},
        { name: "Maxpethappiness", typeNumber: "integer", values: { min: 482, max: 570 }},
      ],
      recipe: {
        materials: [
          createMaterial('Lv 5 Combat Essence', 2, 402, 5),
          createMaterial('Lv 6 Gather Essence', 2, 406, 6)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 5 Combat Essence', 2, 402, 5),
          createMaterial('Lv 6 Gather Essence', 2, 406, 6)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 5 Combat Essence', 2, 402, 5),
          createMaterial('Lv 6 Gather Essence', 2, 406, 6)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 5 Combat Essence', 2, 402, 5),
          createMaterial('Lv 6 Gather Essence', 2, 406, 6)
        ])
      },
    },
    {
      name: "Lava Farming Pants",
      alias: "LavaFarmingPants",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-548.png",
      requiresLevel: 7,
      stats: [
        { name: "Breedingproficiency", typeNumber: "integer", values: { min: 115, max: 133 }},
        { name: "Plantigproficiency", typeNumber: "integer", values: { min: 115, max: 133 }},
        { name: "Maxfertility", typeNumber: "integer", values: { min: 2269, max: 2618 }},
        { name: "Maxpethappiness", typeNumber: "integer", values: { min: 570, max: 658 }},
      ],
      recipe: {
        materials: [
          createMaterial('Lv 6 Combat Essence', 2, 403, 6),
          createMaterial('Lv 7 Gather Essence', 2, 605, 7)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 6 Combat Essence', 2, 403, 6),
          createMaterial('Lv 7 Gather Essence', 2, 605, 7)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 6 Combat Essence', 2, 403, 6),
          createMaterial('Lv 7 Gather Essence', 2, 605, 7)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 6 Combat Essence', 2, 403, 6),
          createMaterial('Lv 7 Gather Essence', 2, 605, 7)
        ])
      },
    },
    {
      name: "Hollow Farming Pants",
      alias: "HollowFarmingPants",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-572.png",
      requiresLevel: 8,
      stats: [
        { name: "Breedingproficiency", typeNumber: "integer", values: { min: 133, max: 150 }},
        { name: "Plantigproficiency", typeNumber: "integer", values: { min: 133, max: 150 }},
        { name: "Maxfertility", typeNumber: "integer", values: { min: 2618, max: 2967 }},
        { name: "Maxpethappiness", typeNumber: "integer", values: { min: 658, max: 746 }},
      ],
      recipe: {
        materials: [
          createMaterial('Lv 7 Combat Essence', 2, 602, 7),
          createMaterial('Lv 8 Gather Essence', 2, 606, 8)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 7 Combat Essence', 2, 602, 7),
          createMaterial('Lv 8 Gather Essence', 2, 606, 8)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 7 Combat Essence', 2, 602, 7),
          createMaterial('Lv 8 Gather Essence', 2, 606, 8)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 7 Combat Essence', 2, 602, 7),
          createMaterial('Lv 8 Gather Essence', 2, 606, 8)
        ])
      },
    },
    {
      name: "Bronze Farming Pants",
      alias: "BronzeFarmingPants",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-596.png",
      requiresLevel: 9,
      stats: [
        { name: "Breedingproficiency", typeNumber: "integer", values: { min: 150, max: 168 }},
        { name: "Plantigproficiency", typeNumber: "integer", values: { min: 150, max: 168 }},
        { name: "Maxfertility", typeNumber: "integer", values: { min: 2967, max: 3316 }},
        { name: "Maxpethappiness", typeNumber: "integer", values: { min: 746, max: 834 }},
      ],
      recipe: {
        materials: [
          createMaterial('Lv 8 Combat Essence', 2, 603, 8),
          createMaterial('Lv 9 Gather Essence', 2, 607, 9)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 8 Combat Essence', 2, 603, 8),
          createMaterial('Lv 9 Gather Essence', 2, 607, 9)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 8 Combat Essence', 2, 603, 8),
          createMaterial('Lv 9 Gather Essence', 2, 607, 9)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 8 Combat Essence', 2, 603, 8),
          createMaterial('Lv 9 Gather Essence', 2, 607, 9)
        ])
      },
    },
    {
      name: "Farming Jacket",
      alias: "FarmingJacketLv1",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-101.png",
      requiresLevel: 1,
      stats: [
        { name: "Breedingproficiency", typeNumber: "integer", values: { min: 6, max: 19 }},
        { name: "Plantigproficiency", typeNumber: "integer", values: { min: 6, max: 19 }},
        { name: "Maxfertility", typeNumber: "integer", values: { min: 220, max: 659 }},
        { name: "Maxpethappiness", typeNumber: "integer", values: { min: 55, max: 165 }},
      ],
      recipe: {
        materials: [
          createMaterial('Lv 1 Gather Essence', 2, 207, 1),
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 1 Gather Essence', 2, 207, 1)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 1 Gather Essence', 2, 207, 1)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 1 Gather Essence', 2, 207, 1)
        ])
      },
    },
    {
      name: "Farming Jacket",
      alias: "FarmingJacketLv2",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-102.png",
      requiresLevel: 2,
      stats: [
        { name: "Breedingproficiency", typeNumber: "integer", values: { min: 19, max: 32 }},
        { name: "Plantigproficiency", typeNumber: "integer", values: { min: 19, max: 32 }},
        { name: "Maxfertility", typeNumber: "integer", values: { min: 659, max: 1098 }},
        { name: "Maxpethappiness", typeNumber: "integer", values: { min: 165, max: 275 }},
      ],
      recipe: {
        materials: [
          createMaterial('Lv 1 Combat Essence', 2, 216, 1),
          createMaterial('Lv 2 Gather Essence', 2, 208, 2)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 1 Combat Essence', 2, 216, 1),
          createMaterial('Lv 2 Gather Essence', 2, 208, 2)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 1 Combat Essence', 2, 216, 1),
          createMaterial('Lv 2 Gather Essence', 2, 208, 2)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 1 Combat Essence', 2, 216, 1),
          createMaterial('Lv 2 Gather Essence', 2, 208, 2)
        ])
      },
    },
    {
      name: "Farming Jacket",
      alias: "FarmingJacketLv3",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-103.png",
      requiresLevel: 3,
      stats: [
        { name: "Breedingproficiency", typeNumber: "integer", values: { min: 32, max: 45 }},
        { name: "Plantigproficiency", typeNumber: "integer", values: { min: 32, max: 45 }},
        { name: "Maxfertility", typeNumber: "integer", values: { min: 1098, max: 1537 }},
        { name: "Maxpethappiness", typeNumber: "integer", values: { min: 275, max: 385 }},
      ],
      recipe: {
        materials: [
          createMaterial('Lv 2 Combat Essence', 2, 217, 2),
          createMaterial('Lv 3 Gather Essence', 2, 209, 3)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 2 Combat Essence', 2, 217, 2),
          createMaterial('Lv 3 Gather Essence', 2, 209, 3)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 2 Combat Essence', 2, 217, 2),
          createMaterial('Lv 3 Gather Essence', 2, 209, 3)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 2 Combat Essence', 2, 217, 2),
          createMaterial('Lv 3 Gather Essence', 2, 209, 3)
        ])
      },
    },
    {
      name: "Golden Farmer Coat",
      alias: "GoldenFarmerCoat",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-351.png",
      requiresLevel: 4,
      stats: [
        { name: "Breedingproficiency", typeNumber: "integer", values: { min: 45, max: 58 }},
        { name: "Plantigproficiency", typeNumber: "integer", values: { min: 45, max: 58 }},
        { name: "Maxfertility", typeNumber: "integer", values: { min: 1537, max: 1976 }},
        { name: "Maxpethappiness", typeNumber: "integer", values: { min: 385, max: 495 }},
      ],
      recipe: {
        materials: [
          createMaterial('Lv 3 Combat Essence', 2, 218, 3),
          createMaterial('Lv 4 Gather Essence', 2, 404, 4)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 3 Combat Essence', 2, 218, 3),
          createMaterial('Lv 4 Gather Essence', 2, 404, 4)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 3 Combat Essence', 2, 218, 3),
          createMaterial('Lv 4 Gather Essence', 2, 404, 4)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 3 Combat Essence', 2, 218, 3),
          createMaterial('Lv 4 Gather Essence', 2, 404, 4)
        ])
      },
    },
    {
      name: "Diamond Farmer Coat",
      alias: "DiamondFarmerCoat",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-356.png",
      requiresLevel: 5,
      stats: [
        { name: "Breedingproficiency", typeNumber: "integer", values: { min: 58, max: 71 }},
        { name: "Plantigproficiency", typeNumber: "integer", values: { min: 58, max: 71 }},
        { name: "Maxfertility", typeNumber: "integer", values: { min: 1976, max: 2415 }},
        { name: "Maxpethappiness", typeNumber: "integer", values: { min: 495, max: 605 }},
      ],
      recipe: {
        materials: [
          createMaterial('Lv 4 Combat Essence', 2, 401, 4),
          createMaterial('Lv 5 Gather Essence', 2, 405, 5)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 4 Combat Essence', 2, 401, 4),
          createMaterial('Lv 5 Gather Essence', 2, 405, 5)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 4 Combat Essence', 2, 401, 4),
          createMaterial('Lv 5 Gather Essence', 2, 405, 5)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 4 Combat Essence', 2, 401, 4),
          createMaterial('Lv 5 Gather Essence', 2, 405, 5)
        ])
      },
    },
    {
      name: "Star Farmer Coat",
      alias: "StarFarmerCoat",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-361.png",
      requiresLevel: 6,
      stats: [
        { name: "Breedingproficiency", typeNumber: "integer", values: { min: 71, max: 84 }},
        { name: "Plantigproficiency", typeNumber: "integer", values: { min: 71, max: 84 }},
        { name: "Maxfertility", typeNumber: "integer", values: { min: 2415, max: 2854 }},
        { name: "Maxpethappiness", typeNumber: "integer", values: { min: 605, max: 715 }},
      ],
      recipe: {
        materials: [
          createMaterial('Lv 5 Combat Essence', 2, 402, 5),
          createMaterial('Lv 6 Gather Essence', 2, 406, 6)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 5 Combat Essence', 2, 402, 5),
          createMaterial('Lv 6 Gather Essence', 2, 406, 6)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 5 Combat Essence', 2, 402, 5),
          createMaterial('Lv 6 Gather Essence', 2, 406, 6)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 5 Combat Essence', 2, 402, 5),
          createMaterial('Lv 6 Gather Essence', 2, 406, 6)
        ])
      },
    },
    {
      name: "Lava Farming Coat",
      alias: "LavaFarmingCoat",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-547.png",
      requiresLevel: 7,
      stats: [
        { name: "Breedingproficiency", typeNumber: "integer", values: { min: 84, max: 97 }},
        { name: "Plantigproficiency", typeNumber: "integer", values: { min: 84, max: 97 }},
        { name: "Maxfertility", typeNumber: "integer", values: { min: 2854, max: 3293 }},
        { name: "Maxpethappiness", typeNumber: "integer", values: { min: 715, max: 825 }},
      ],
      recipe: {
        materials: [
          createMaterial('Lv 6 Combat Essence', 2, 403, 6),
          createMaterial('Lv 7 Gather Essence', 2, 605, 7)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 6 Combat Essence', 2, 403, 6),
          createMaterial('Lv 7 Gather Essence', 2, 605, 7)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 6 Combat Essence', 2, 403, 6),
          createMaterial('Lv 7 Gather Essence', 2, 605, 7)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 6 Combat Essence', 2, 403, 6),
          createMaterial('Lv 7 Gather Essence', 2, 605, 7)
        ])
      },
    },
    {
      name: "Hollow Farming Coat",
      alias: "HollowFarmingCoat",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-571.png",
      requiresLevel: 8,
      stats: [
        { name: "Breedingproficiency", typeNumber: "integer", values: { min: 97, max: 110 }},
        { name: "Plantigproficiency", typeNumber: "integer", values: { min: 97, max: 110 }},
        { name: "Maxfertility", typeNumber: "integer", values: { min: 3293, max: 3732 }},
        { name: "Maxpethappiness", typeNumber: "integer", values: { min: 825, max: 935 }},
      ],
      recipe: {
        materials: [
          createMaterial('Lv 7 Combat Essence', 2, 602, 7),
          createMaterial('Lv 8 Gather Essence', 2, 606, 8)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 7 Combat Essence', 2, 602, 7),
          createMaterial('Lv 8 Gather Essence', 2, 606, 8)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 7 Combat Essence', 2, 602, 7),
          createMaterial('Lv 8 Gather Essence', 2, 606, 8)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 7 Combat Essence', 2, 602, 7),
          createMaterial('Lv 8 Gather Essence', 2, 606, 8)
        ])
      },
    },
    {
      name: "Bronze Farming Coat",
      alias: "BronzeFarmingCoat",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-595.png",
      requiresLevel: 9,
      stats: [
        { name: "Breedingproficiency", typeNumber: "integer", values: { min: 110, max: 123 }},
        { name: "Plantigproficiency", typeNumber: "integer", values: { min: 110, max: 123 }},
        { name: "Maxfertility", typeNumber: "integer", values: { min: 3732, max: 4171 }},
        { name: "Maxpethappiness", typeNumber: "integer", values: { min: 935, max: 1045 }},
      ],
      recipe: {
        materials: [
          createMaterial('Lv 8 Combat Essence', 2, 603, 8),
          createMaterial('Lv 9 Gather Essence', 2, 607, 9)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 8 Combat Essence', 2, 603, 8),
          createMaterial('Lv 9 Gather Essence', 2, 607, 9)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 8 Combat Essence', 2, 603, 8),
          createMaterial('Lv 9 Gather Essence', 2, 607, 9)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 8 Combat Essence', 2, 603, 8),
          createMaterial('Lv 9 Gather Essence', 2, 607, 9)
        ])
      },
    },
    {
      name: "Lucky Clover Hat",
      alias: "LuckyCloverHatLv1",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-98.png",
      requiresLevel: 1,
      stats: [
        { name: "Breedingproficiency", typeNumber: "integer", values: { min: 8, max: 25 }},
        { name: "Plantigproficiency", typeNumber: "integer", values: { min: 8, max: 25 }},
        { name: "Maxfertility", typeNumber: "integer", values: { min: 184, max: 551 }},
        { name: "Maxpethappiness", typeNumber: "integer", values: { min: 46, max: 138 }},
      ],
      recipe: {
        materials: [
          createMaterial('Lv 1 Gather Essence', 2, 207, 1)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 1 Gather Essence', 2, 207, 1)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 1 Gather Essence', 2, 207, 1)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 1 Gather Essence', 2, 207, 1)
        ])
      },
    },
    {
      name: "Lucky Cotton Hat",
      alias: "LuckyCottonHatLv2",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-99.png",
      requiresLevel: 2,
      stats: [
        { name: "Breedingproficiency", typeNumber: "integer", values: { min: 25, max: 42 }},
        { name: "Plantigproficiency", typeNumber: "integer", values: { min: 25, max: 42 }},
        { name: "Maxfertility", typeNumber: "integer", values: { min: 551, max: 918 }},
        { name: "Maxpethappiness", typeNumber: "integer", values: { min: 138, max: 230 }},
      ],
      recipe: {
        materials: [
          createMaterial('Lv 1 Combat Essence', 2, 216, 1),
          createMaterial('Lv 2 Gather Essence', 2, 208, 2)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 1 Combat Essence', 2, 216, 1),
          createMaterial('Lv 2 Gather Essence', 2, 208, 2)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 1 Combat Essence', 2, 216, 1),
          createMaterial('Lv 2 Gather Essence', 2, 208, 2)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 1 Combat Essence', 2, 216, 1),
          createMaterial('Lv 2 Gather Essence', 2, 208, 2)
        ])
      },
    },
    {
      name: "Lucky Hard Hat",
      alias: "LuckyHardHatLv3",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-100.png",
      requiresLevel: 3,
      stats: [
        { name: "Breedingproficiency", typeNumber: "integer", values: { min: 42, max: 59 }},
        { name: "Plantigproficiency", typeNumber: "integer", values: { min: 42, max: 59 }},
        { name: "Maxfertility", typeNumber: "integer", values: { min: 918, max: 1285 }},
        { name: "Maxpethappiness", typeNumber: "integer", values: { min: 230, max: 321 }},
      ],
      recipe: {
        materials: [
          createMaterial('Lv 2 Combat Essence', 2, 217, 2),
          createMaterial('Lv 3 Gather Essence', 2, 209, 3)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 2 Combat Essence', 2, 217, 2),
          createMaterial('Lv 3 Gather Essence', 2, 209, 3)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 2 Combat Essence', 2, 217, 2),
          createMaterial('Lv 3 Gather Essence', 2, 209, 3)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 2 Combat Essence', 2, 217, 2),
          createMaterial('Lv 3 Gather Essence', 2, 209, 3)
        ])
      },
    },
    {
      name: "Golden Farmer Hat",
      alias: "GoldenFarmerHat",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-350.png",
      requiresLevel: 4,
      stats: [
        { name: "Breedingproficiency", typeNumber: "integer", values: { min: 59, max: 76 }},
        { name: "Plantigproficiency", typeNumber: "integer", values: { min: 59, max: 76 }},
        { name: "Maxfertility", typeNumber: "integer", values: { min: 1285, max: 1625 }},
        { name: "Maxpethappiness", typeNumber: "integer", values: { min: 321, max: 413 }},
      ],
      recipe: {
        materials: [
          createMaterial('Lv 3 Combat Essence', 2, 218, 3),
          createMaterial('Lv 4 Gather Essence', 2, 404, 4)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 3 Combat Essence', 2, 218, 3),
          createMaterial('Lv 4 Gather Essence', 2, 404, 4)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 3 Combat Essence', 2, 218, 3),
          createMaterial('Lv 4 Gather Essence', 2, 404, 4)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 3 Combat Essence', 2, 218, 3),
          createMaterial('Lv 4 Gather Essence', 2, 404, 4)
        ])
      },
    },
    {
      name: "Diamond Farmer Hat",
      alias: "DiamondFarmerHat",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-355.png",
      requiresLevel: 5,
      stats: [
        { name: "Breedingproficiency", typeNumber: "integer", values: { min: 76, max: 93 }},
        { name: "Plantigproficiency", typeNumber: "integer", values: { min: 76, max: 93 }},
        { name: "Maxfertility", typeNumber: "integer", values: { min: 1625, max: 2019 }},
        { name: "Maxpethappiness", typeNumber: "integer", values: { min: 413, max: 505 }},
      ],
      recipe: {
        materials: [
          createMaterial('Lv 4 Combat Essence', 2, 401, 4),
          createMaterial('Lv 5 Gather Essence', 2, 405, 5)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 4 Combat Essence', 2, 401, 4),
          createMaterial('Lv 5 Gather Essence', 2, 405, 5)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 4 Combat Essence', 2, 401, 4),
          createMaterial('Lv 5 Gather Essence', 2, 405, 5)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 4 Combat Essence', 2, 401, 4),
          createMaterial('Lv 5 Gather Essence', 2, 405, 5)
        ])
      },
    },
    {
      name: "Star Farmer Hat",
      alias: "StarFarmerHat",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-360.png",
      requiresLevel: 6,
      stats: [
        { name: "Breedingproficiency", typeNumber: "integer", values: { min: 93, max: 110 }},
        { name: "Plantigproficiency", typeNumber: "integer", values: { min: 93, max: 110 }},
        { name: "Maxfertility", typeNumber: "integer", values: { min: 2019, max: 2386 }},
        { name: "Maxpethappiness", typeNumber: "integer", values: { min: 505, max: 597 }},
      ],
      recipe: {
        materials: [
          createMaterial('Lv 5 Combat Essence', 2, 402, 5),
          createMaterial('Lv 6 Gather Essence', 2, 406, 6)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 5 Combat Essence', 2, 402, 5),
          createMaterial('Lv 6 Gather Essence', 2, 406, 6)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 5 Combat Essence', 2, 402, 5),
          createMaterial('Lv 6 Gather Essence', 2, 406, 6)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 5 Combat Essence', 2, 402, 5),
          createMaterial('Lv 6 Gather Essence', 2, 406, 6)
        ])
      },
    },
    {
      name: "Lava Farming Hat",
      alias: "LavaFarmingHat",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-546.png",
      requiresLevel: 7,
      stats: [
        { name: "Breedingproficiency", typeNumber: "integer", values: { min: 110, max: 127 }},
        { name: "Plantigproficiency", typeNumber: "integer", values: { min: 110, max: 127 }},
        { name: "Maxfertility", typeNumber: "integer", values: { min: 2386, max: 2753 }},
        { name: "Maxpethappiness", typeNumber: "integer", values: { min: 597, max: 688 }},
      ],
      recipe: {
        materials: [
          createMaterial('Lv 6 Combat Essence', 2, 403, 6),
          createMaterial('Lv 7 Gather Essence', 2, 605, 7)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 6 Combat Essence', 2, 403, 6),
          createMaterial('Lv 7 Gather Essence', 2, 605, 7)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 6 Combat Essence', 2, 403, 6),
          createMaterial('Lv 7 Gather Essence', 2, 605, 7)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 6 Combat Essence', 2, 403, 6),
          createMaterial('Lv 7 Gather Essence', 2, 605, 7)
        ])
      },
    },
    {
      name: "Hollow Farming Hat",
      alias: "HollowFarmingHat",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-574.png",
      requiresLevel: 8,
      stats: [
        { name: "Breedingproficiency", typeNumber: "integer", values: { min: 127, max: 144 }},
        { name: "Plantigproficiency", typeNumber: "integer", values: { min: 127, max: 144 }},
        { name: "Maxfertility", typeNumber: "integer", values: { min: 2753, max: 3120 }},
        { name: "Maxpethappiness", typeNumber: "integer", values: { min: 688, max: 780 }},
      ],
      recipe: {
        materials: [
          createMaterial('Lv 7 Combat Essence', 2, 602, 7),
          createMaterial('Lv 8 Gather Essence', 2, 606, 8)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 7 Combat Essence', 2, 602, 7),
          createMaterial('Lv 8 Gather Essence', 2, 606, 8)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 7 Combat Essence', 2, 602, 7),
          createMaterial('Lv 8 Gather Essence', 2, 606, 8)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 7 Combat Essence', 2, 602, 7),
          createMaterial('Lv 8 Gather Essence', 2, 606, 8)
        ])
      },
    },
    {
      name: "Bronze Farming Hat",
      alias: "BronzeFarmingHat",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-598.png",
      requiresLevel: 9,
      stats: [
        { name: "Breedingproficiency", typeNumber: "integer", values: { min: 144, max: 161 }},
        { name: "Plantigproficiency", typeNumber: "integer", values: { min: 144, max: 161 }},
        { name: "Maxfertility", typeNumber: "integer", values: { min: 3120, max: 3487 }},
        { name: "Maxpethappiness", typeNumber: "integer", values: { min: 780, max: 872 }},
      ],
      recipe: {
        materials: [
          createMaterial('Lv 8 Combat Essence', 2, 603, 8),
          createMaterial('Lv 9 Gather Essence', 2, 607, 9)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 8 Combat Essence', 2, 603, 8),
          createMaterial('Lv 9 Gather Essence', 2, 607, 9)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 8 Combat Essence', 2, 603, 8),
          createMaterial('Lv 9 Gather Essence', 2, 607, 9)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 8 Combat Essence', 2, 603, 8),
          createMaterial('Lv 9 Gather Essence', 2, 607, 9)
        ])
      },
    },
    {
      name: "Farming Gloves",
      alias: "FarmingGlovesLv1",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-107.png",
      requiresLevel: 1,
      stats: [
        { name: "Breedingproficiency", typeNumber: "integer", values: { min: 6, max: 19 }},
        { name: "Plantigproficiency", typeNumber: "integer", values: { min: 6, max: 19 }},
        { name: "Maxfertility", typeNumber: "integer", values: { min: 139, max: 416 }},
        { name: "Maxpethappiness", typeNumber: "integer", values: { min: 35, max: 104 }},
        { name: "Fertilitycapacity", typeNumber: "integer", values: { min: 1, max: 3 }},
        { name: "Pethappinesscapacity", typeNumber: "integer", values: { min: 1, max: 3 }},
      ],
      recipe: {
        materials: [
          createMaterial('Lv 1 Gather Essence', 2, 207, 1)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 1 Gather Essence', 2, 207, 1)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 1 Gather Essence', 2, 207, 1)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 1 Gather Essence', 2, 207, 1)
        ])
      },
    },
    {
      name: "Farming Gloves",
      alias: "FarmingGlovesLv2",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-108.png",
      requiresLevel: 2,
      stats: [
        { name: "Breedingproficiency", typeNumber: "integer", values: { min: 19, max: 32 }},
        { name: "Plantigproficiency", typeNumber: "integer", values: { min: 19, max: 32 }},
        { name: "Maxfertility", typeNumber: "integer", values: { min: 416, max: 693 }},
        { name: "Maxpethappiness", typeNumber: "integer", values: { min: 104, max: 173 }},
        { name: "Fertilitycapacity", typeNumber: "integer", values: { min: 3, max: 4 }},
        { name: "Pethappinesscapacity", typeNumber: "integer", values: { min: 3, max: 4 }},
      ],
      recipe: {
        materials: [
          createMaterial('Lv 1 Combat Essence', 2, 216, 1),
          createMaterial('Lv 2 Gather Essence', 2, 208, 2)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 1 Combat Essence', 2, 216, 1),
          createMaterial('Lv 2 Gather Essence', 2, 208, 2)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 1 Combat Essence', 2, 216, 1),
          createMaterial('Lv 2 Gather Essence', 2, 208, 2)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 1 Combat Essence', 2, 216, 1),
          createMaterial('Lv 2 Gather Essence', 2, 208, 2)
        ])
      },
    },
    {
      name: "Farming Gloves",
      alias: "FarmingGlovesLv3",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-109.png",
      requiresLevel: 3,
      stats: [
        { name: "Breedingproficiency", typeNumber: "integer", values: { min: 32, max: 45 }},
        { name: "Plantigproficiency", typeNumber: "integer", values: { min: 32, max: 45 }},
        { name: "Maxfertility", typeNumber: "integer", values: { min: 693, max: 970 }},
        { name: "Maxpethappiness", typeNumber: "integer", values: { min: 173, max: 243 }},
        { name: "Fertilitycapacity", typeNumber: "integer", values: { min: 4, max: 5 }},
        { name: "Pethappinesscapacity", typeNumber: "integer", values: { min: 4, max: 5 }},
      ],
      recipe: {
        materials: [
          createMaterial('Lv 2 Combat Essence', 2, 217, 2),
          createMaterial('Lv 3 Gather Essence', 2, 209, 3)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 2 Combat Essence', 2, 217, 2),
          createMaterial('Lv 3 Gather Essence', 2, 209, 3)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 2 Combat Essence', 2, 217, 2),
          createMaterial('Lv 3 Gather Essence', 2, 209, 3)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 2 Combat Essence', 2, 217, 2),
          createMaterial('Lv 3 Gather Essence', 2, 209, 3)
        ])
      },
    },
    {
      name: "Golden Farmer Glove",
      alias: "GoldenFarmerGlove",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-352.png",
      requiresLevel: 4,
      stats: [
        { name: "Breedingproficiency", typeNumber: "integer", values: { min: 45, max: 58 }},
        { name: "Plantigproficiency", typeNumber: "integer", values: { min: 45, max: 58 }},
        { name: "Maxfertility", typeNumber: "integer", values: { min: 970, max: 1248 }},
        { name: "Maxpethappiness", typeNumber: "integer", values: { min: 243, max: 312 }},
        { name: "Fertilitycapacity", typeNumber: "integer", values: { min: 5, max: 7 }},
        { name: "Pethappinesscapacity", typeNumber: "integer", values: { min: 5, max: 7 }},
      ],
      recipe: {
        materials: [
          createMaterial('Lv 3 Combat Essence', 2, 218, 3),
          createMaterial('Lv 4 Gather Essence', 2, 404, 4)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 3 Combat Essence', 2, 218, 3),
          createMaterial('Lv 4 Gather Essence', 2, 404, 4)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 3 Combat Essence', 2, 218, 3),
          createMaterial('Lv 4 Gather Essence', 2, 404, 4)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 3 Combat Essence', 2, 218, 3),
          createMaterial('Lv 4 Gather Essence', 2, 404, 4)
        ])
      },
    },
    {
      name: "Diamond Farmer Glove",
      alias: "DiamondFarmerGlove",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-357.png",
      requiresLevel: 5,
      stats: [
        { name: "Breedingproficiency", typeNumber: "integer", values: { min: 58, max: 71 }},
        { name: "Plantigproficiency", typeNumber: "integer", values: { min: 58, max: 71 }},
        { name: "Maxfertility", typeNumber: "integer", values: { min: 1248, max: 1525 }},
        { name: "Maxpethappiness", typeNumber: "integer", values: { min: 312, max: 381 }},
        { name: "Fertilitycapacity", typeNumber: "integer", values: { min: 6, max: 8 }},
        { name: "Pethappinesscapacity", typeNumber: "integer", values: { min: 6, max: 8 }},
      ],
      recipe: {
        materials: [
          createMaterial('Lv 4 Combat Essence', 2, 401, 4),
          createMaterial('Lv 5 Gather Essence', 2, 405, 5)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 4 Combat Essence', 2, 401, 4),
          createMaterial('Lv 5 Gather Essence', 2, 405, 5)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 4 Combat Essence', 2, 401, 4),
          createMaterial('Lv 5 Gather Essence', 2, 405, 5)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 4 Combat Essence', 2, 401, 4),
          createMaterial('Lv 5 Gather Essence', 2, 405, 5)
        ])
      },
    },
    {
      name: "Star Farmer Glove",
      alias: "StarFarmerGlove",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-362.png",
      requiresLevel: 6,
      stats: [
        { name: "Breedingproficiency", typeNumber: "integer", values: { min: 71, max: 84 }},
        { name: "Plantigproficiency", typeNumber: "integer", values: { min: 71, max: 84 }},
        { name: "Maxfertility", typeNumber: "integer", values: { min: 1525, max: 1802 }},
        { name: "Maxpethappiness", typeNumber: "integer", values: { min: 381, max: 450 }},
        { name: "Fertilitycapacity", typeNumber: "integer", values: { min: 8, max: 9 }},
        { name: "Pethappinesscapacity", typeNumber: "integer", values: { min: 8, max: 9 }},
      ],
      recipe: {
        materials: [
          createMaterial('Lv 5 Combat Essence', 2, 402, 5),
          createMaterial('Lv 6 Gather Essence', 2, 406, 6)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 5 Combat Essence', 2, 402, 5),
          createMaterial('Lv 6 Gather Essence', 2, 406, 6)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 5 Combat Essence', 2, 402, 5),
          createMaterial('Lv 6 Gather Essence', 2, 406, 6)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 5 Combat Essence', 2, 402, 5),
          createMaterial('Lv 6 Gather Essence', 2, 406, 6)
        ])
      },
    },
    {
      name: "Lava Farming Glove",
      alias: "LavaFarmingGlove",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-549.png",
      requiresLevel: 7,
      stats: [
        { name: "Breedingproficiency", typeNumber: "integer", values: { min: 84, max: 97 }},
        { name: "Plantigproficiency", typeNumber: "integer", values: { min: 84, max: 97 }},
        { name: "Maxfertility", typeNumber: "integer", values: { min: 1802, max: 2079 }},
        { name: "Maxpethappiness", typeNumber: "integer", values: { min: 450, max: 520 }},
        { name: "Fertilitycapacity", typeNumber: "integer", values: { min: 9, max: 10 }},
        { name: "Pethappinesscapacity", typeNumber: "integer", values: { min: 9, max: 10 }},
      ],
      recipe: {
        materials: [
          createMaterial('Lv 6 Combat Essence', 2, 403, 6),
          createMaterial('Lv 7 Gather Essence', 2, 605, 7)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 6 Combat Essence', 2, 403, 6),
          createMaterial('Lv 7 Gather Essence', 2, 605, 7)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 6 Combat Essence', 2, 403, 6),
          createMaterial('Lv 7 Gather Essence', 2, 605, 7)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 6 Combat Essence', 2, 403, 6),
          createMaterial('Lv 7 Gather Essence', 2, 605, 7)
        ])
      },
    },
    {
      name: "Hollow Farming Glove",
      alias: "HollowFarmingGlove",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-573.png",
      requiresLevel: 8,
      stats: [
        { name: "Breedingproficiency", typeNumber: "integer", values: { min: 97, max: 110 }},
        { name: "Plantigproficiency", typeNumber: "integer", values: { min: 97, max: 110 }},
        { name: "Maxfertility", typeNumber: "integer", values: { min: 2079, max: 2356 }},
        { name: "Maxpethappiness", typeNumber: "integer", values: { min: 520, max: 589 }},
        { name: "Fertilitycapacity", typeNumber: "integer", values: { min: 9, max: 10 }},
        { name: "Pethappinesscapacity", typeNumber: "integer", values: { min: 9, max: 10 }},
      ],
      recipe: {
        materials: [
          createMaterial('Lv 7 Combat Essence', 2, 602, 7),
          createMaterial('Lv 8 Gather Essence', 2, 606, 8)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 7 Combat Essence', 2, 602, 7),
          createMaterial('Lv 8 Gather Essence', 2, 606, 8)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 7 Combat Essence', 2, 602, 7),
          createMaterial('Lv 8 Gather Essence', 2, 606, 8)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 7 Combat Essence', 2, 602, 7),
          createMaterial('Lv 8 Gather Essence', 2, 606, 8)
        ])
      },
    },
    {
      name: "Bronze Farming Glove",
      alias: "BronzeFarmingGlove",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-597.png",
      requiresLevel: 9,
      stats: [
        { name: "Breedingproficiency", typeNumber: "integer", values: { min: 110, max: 123 }},
        { name: "Plantigproficiency", typeNumber: "integer", values: { min: 110, max: 123 }},
        { name: "Maxfertility", typeNumber: "integer", values: { min: 2356, max: 2632 }},
        { name: "Maxpethappiness", typeNumber: "integer", values: { min: 589, max: 658 }},
        { name: "Fertilitycapacity", typeNumber: "integer", values: { min: 10, max: 11 }},
        { name: "Pethappinesscapacity", typeNumber: "integer", values: { min: 10, max: 11 }},
      ],
      recipe: {
        materials: [
          createMaterial('Lv 8 Combat Essence', 2, 603, 8),
          createMaterial('Lv 9 Gather Essence', 2, 607, 9)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 8 Combat Essence', 2, 603, 8),
          createMaterial('Lv 9 Gather Essence', 2, 607, 9)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 8 Combat Essence', 2, 603, 8),
          createMaterial('Lv 9 Gather Essence', 2, 607, 9)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 8 Combat Essence', 2, 603, 8),
          createMaterial('Lv 9 Gather Essence', 2, 607, 9)
        ])
      },
    }
  ],
  gathering: [
    {
      name: "Iron Pickaxe",
      alias: "IronPickaxe",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-88.png",
      requiresLevel: 1,
      stats: [
        { name: "Combatatt", typeNumber: "integer", values: { "min": 20, "max": 25 }},
        { name: "Oreatt", typeNumber: "integer", values: { "min": 41, "max": 122 }}
      ],
      recipe: {
        materials: [
          createMaterial('Lv 1 Combat Essence', 2, 216, 1)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 1 Combat Essence', 2, 216, 1)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 1 Combat Essence', 2, 216, 1)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 1 Combat Essence', 2, 216, 1)
        ])
      }
    },
    {
      name: "Cursed Pickaxe",
      alias: "CursedPickaxe",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-89.png",
      requiresLevel: 2,
      stats: [
        { name: "Combatatt", typeNumber: "integer", values: { "min": 20, "max": 25 }},
        { name: "Oreatt", typeNumber: "integer", values: { "min": 122, "max": 203 }}
      ],
      recipe: {
        materials: [
          createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213, 1),
          createMaterial('Lv 1 Agricultural Planting Essence', 1, 210, 1),
          createMaterial('Lv 2 Combat Essence', 2, 217, 2)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213, 1),
          createMaterial('Lv 1 Agricultural Planting Essence', 1, 210, 1),
          createMaterial('Lv 2 Combat Essence', 2, 217, 2)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213, 1),
          createMaterial('Lv 1 Agricultural Planting Essence', 1, 210, 1),
          createMaterial('Lv 2 Combat Essence', 2, 217, 2)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213, 1),
          createMaterial('Lv 1 Agricultural Planting Essence', 1, 210, 1),
          createMaterial('Lv 2 Combat Essence', 2, 217, 2)
        ])
      }
    },
    {
      name: "Blessing Pickaxe",
      alias: "BlessingPickaxe",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-90.png",
      requiresLevel: 3,
      stats: [
        { name: "Combatatt", typeNumber: "integer", values: { "min": 20, "max": 25 }},
        { name: "Oreatt", typeNumber: "integer", values: { "min": 203, "max": 284 }}
      ],
      recipe: {
        materials: [
          createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214, 2),
          createMaterial('Lv 2 Agricultural Planting Essence', 1, 211, 2),
          createMaterial('Lv 3 Combat Essence', 2, 218, 1)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214, 2),
          createMaterial('Lv 2 Agricultural Planting Essence', 1, 211, 2),
          createMaterial('Lv 3 Combat Essence', 2, 218, 1)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214, 2),
          createMaterial('Lv 2 Agricultural Planting Essence', 1, 211, 2),
          createMaterial('Lv 3 Combat Essence', 2, 218, 1)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214, 2),
          createMaterial('Lv 2 Agricultural Planting Essence', 1, 211, 2),
          createMaterial('Lv 3 Combat Essence', 2, 218, 1)
        ])
      }
    },
    {
      name: "Golden Pickaxe",
      alias: "GoldenPickaxe",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-301.png",
      requiresLevel: 4,
      stats: [
        { name: "Combatatt", typeNumber: "integer", values: { "min": 20, "max": 25 }},
        { name: "Oreatt", typeNumber: "integer", values: { "min": 284, "max": 365 }}
      ],
      recipe: {
        materials: [
          createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215, 3),
          createMaterial('Lv 3 Agricultural Planting Essence', 1, 212, 3),
          createMaterial('Lv 4 Combat Essence', 2, 401, 4)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215, 3),
          createMaterial('Lv 3 Agricultural Planting Essence', 1, 212, 3),
          createMaterial('Lv 4 Combat Essence', 2, 401, 4)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215, 3),
          createMaterial('Lv 3 Agricultural Planting Essence', 1, 212, 3),
          createMaterial('Lv 4 Combat Essence', 2, 401, 4)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215, 3),
          createMaterial('Lv 3 Agricultural Planting Essence', 1, 212, 3),
          createMaterial('Lv 4 Combat Essence', 2, 401, 4)
        ])
      }
    },
    {
      name: "Diamond Pickaxe",
      alias: "DiamondPickaxe",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-307.png",
      requiresLevel: 5,
      stats: [
        { name: "Combatatt", typeNumber: "integer", values: { "min": 20, "max": 25 }},
        { name: "Oreatt", typeNumber: "integer", values: { "min": 365, "max": 446 }}
      ],
      recipe: {
        materials: [
          createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410, 4),
          createMaterial('Lv 4 Agricultural Planting Essence', 1, 407, 4),
          createMaterial('Lv 5 Combat Essence', 2, 402, 5)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410, 4),
          createMaterial('Lv 4 Agricultural Planting Essence', 1, 407, 4),
          createMaterial('Lv 5 Combat Essence', 2, 402, 5)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410, 4),
          createMaterial('Lv 4 Agricultural Planting Essence', 1, 407, 4),
          createMaterial('Lv 5 Combat Essence', 2, 402, 5)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410, 4),
          createMaterial('Lv 4 Agricultural Planting Essence', 1, 407, 4),
          createMaterial('Lv 5 Combat Essence', 2, 402, 5)
        ])
      }
    },
    {
      name: "Star Pickaxe",
      alias: "StarPickaxe",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-313.png",
      requiresLevel: 6,
      stats: [
        { name: "Combatatt", typeNumber: "integer", values: { "min": 20, "max": 25 }},
        { name: "Oreatt", typeNumber: "integer", values: { "min": 446, "max": 527 }}
      ],
      recipe: {
        materials: [
          createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411, 5),
          createMaterial('Lv 5 Agricultural Planting Essence', 1, 408, 5),
          createMaterial('Lv 6 Combat Essence', 2, 403, 6)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411, 5),
          createMaterial('Lv 5 Agricultural Planting Essence', 1, 408, 5),
          createMaterial('Lv 6 Combat Essence', 2, 403, 6)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411, 5),
          createMaterial('Lv 5 Agricultural Planting Essence', 1, 408, 5),
          createMaterial('Lv 6 Combat Essence', 2, 403, 6)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411, 5),
          createMaterial('Lv 5 Agricultural Planting Essence', 1, 408, 5),
          createMaterial('Lv 6 Combat Essence', 2, 403, 6)
        ])
      }
    },
    {
      name: "Lava Pickaxe",
      alias: "LavaPickaxe",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-537.png",
      requiresLevel: 7,
      stats: [
        { name: "Combatatt", typeNumber: "integer", values: { "min": 20, "max": 25 }},
        { name: "Oreatt", typeNumber: "integer", values: { "min": 527, "max": 608 }}
      ],
      recipe: {
        materials: [
          createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412, 6),
          createMaterial('Lv 6 Agricultural Planting Essence', 1, 409, 6),
          createMaterial('Lv 7 Combat Essence', 2, 602, 7)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412, 6),
          createMaterial('Lv 6 Agricultural Planting Essence', 1, 409, 6),
          createMaterial('Lv 7 Combat Essence', 2, 602, 7)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412, 6),
          createMaterial('Lv 6 Agricultural Planting Essence', 1, 409, 6),
          createMaterial('Lv 7 Combat Essence', 2, 602, 7)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412, 6),
          createMaterial('Lv 6 Agricultural Planting Essence', 1, 409, 6),
          createMaterial('Lv 7 Combat Essence', 2, 602, 7)
        ])
      }
    },
    {
      name: "Hollow Pickaxe",
      alias: "HollowPickaxe",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-561.png",
      requiresLevel: 8,
      stats: [
        { name: "Combatatt", typeNumber: "integer", values: { "min": 20, "max": 25 }},
        { name: "Oreatt", typeNumber: "integer", values: { "min": 608, "max": 689 }}
      ],
      recipe: {
        materials: [
          createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611, 7),
          createMaterial('Lv 7 Agricultural Planting Essence', 1, 608, 7),
          createMaterial('Lv 8 Combat Essence', 2, 603, 8)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611, 7),
          createMaterial('Lv 7 Agricultural Planting Essence', 1, 608, 7),
          createMaterial('Lv 8 Combat Essence', 2, 603, 8)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611, 7),
          createMaterial('Lv 7 Agricultural Planting Essence', 1, 608, 7),
          createMaterial('Lv 8 Combat Essence', 2, 603, 8)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611, 7),
          createMaterial('Lv 7 Agricultural Planting Essence', 1, 608, 7),
          createMaterial('Lv 8 Combat Essence', 2, 603, 8)
        ])
      }
    },
    {
      name: "Bronze Pickaxe",
      alias: "BronzePickaxe",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-585.png",
      requiresLevel: 9,
      stats: [
        { name: "Combatatt", typeNumber: "integer", values: { "min": 20, "max": 25 }},
        { name: "Oreatt", typeNumber: "integer", values: { "min": 689, "max": 770 }}
      ],
      recipe: {
        materials: [
          createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612, 8),
          createMaterial('Lv 8 Agricultural Planting Essence', 1, 609, 8),
          createMaterial('Lv 9 Combat Essence', 2, 604, 9)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612, 8),
          createMaterial('Lv 8 Agricultural Planting Essence', 1, 609, 8),
          createMaterial('Lv 9 Combat Essence', 2, 604, 9)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612, 8),
          createMaterial('Lv 8 Agricultural Planting Essence', 1, 609, 8),
          createMaterial('Lv 9 Combat Essence', 2, 604, 9)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612, 8),
          createMaterial('Lv 8 Agricultural Planting Essence', 1, 609, 8),
          createMaterial('Lv 9 Combat Essence', 2, 604, 9)
        ])
      }
    },
    {
      name: "Iron Axe",
      alias: "IronAxe",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-92.png",
      requiresLevel: 1,
      stats: [
        { name: "Combatatt", typeNumber: "integer", values: { "min": 20, "max": 25 }},
        { name: "Treeatt", typeNumber: "integer", values: { "min": 41, "max": 122 }}
      ],
      recipe: {
        materials: [
          createMaterial('Lv 1 Combat Essence', 2, 216, 1)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 1 Combat Essence', 2, 216, 1)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 1 Combat Essence', 2, 216, 1)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 1 Combat Essence', 2, 216, 1)
        ])
      }
    },
    {
      name: "Curse Axe",
      alias: "CurseAxe",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-93.png",
      requiresLevel: 2,
      stats: [
        { name: "Combatatt", typeNumber: "integer", values: { "min": 20, "max": 25 }},
        { name: "Treeatt", typeNumber: "integer", values: { "min": 122, "max": 203 }}
      ],
      recipe: {
        materials: [
          createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213, 1),
          createMaterial('Lv 1 Agricultural Planting Essence', 1, 210, 1),
          createMaterial('Lv 2 Combat Essence', 2, 217, 2)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213, 1),
          createMaterial('Lv 1 Agricultural Planting Essence', 1, 210, 1),
          createMaterial('Lv 2 Combat Essence', 2, 217, 2)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213, 1),
          createMaterial('Lv 1 Agricultural Planting Essence', 1, 210, 1),
          createMaterial('Lv 2 Combat Essence', 2, 217, 2)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213, 1),
          createMaterial('Lv 1 Agricultural Planting Essence', 1, 210, 1),
          createMaterial('Lv 2 Combat Essence', 2, 217, 2)
        ])
      }
    },
    {
      name: "Blessed Axe",
      alias: "BlessedAxe",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-94.png",
      requiresLevel: 3,
      stats: [
        { name: "Combatatt", typeNumber: "integer", values: { "min": 20, "max": 25 }},
        { name: "Treeatt", typeNumber: "integer", values: { "min": 203, "max": 284 }}
      ],
      recipe: {
        materials: [
          createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214, 2),
          createMaterial('Lv 2 Agricultural Planting Essence', 1, 211, 2),
          createMaterial('Lv 3 Combat Essence', 2, 218, 3)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214, 2),
          createMaterial('Lv 2 Agricultural Planting Essence', 1, 211, 2),
          createMaterial('Lv 3 Combat Essence', 2, 218, 3)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214, 2),
          createMaterial('Lv 2 Agricultural Planting Essence', 1, 211, 2),
          createMaterial('Lv 3 Combat Essence', 2, 218, 3)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214, 2),
          createMaterial('Lv 2 Agricultural Planting Essence', 1, 211, 2),
          createMaterial('Lv 3 Combat Essence', 2, 218, 3)
        ])
      }
    },
    {
      name: "Golden Axe",
      alias: "GoldenAxe",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-300.png",
      requiresLevel: 4,
      stats: [
        { name: "Combatatt", typeNumber: "integer", values: { "min": 20, "max": 25 }},
        { name: "Treeatt", typeNumber: "integer", values: { "min": 284, "max": 365 }}
      ],
      recipe: {
        materials: [
          createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215, 3),
          createMaterial('Lv 3 Agricultural Planting Essence', 1, 212, 3),
          createMaterial('Lv 4 Combat Essence', 2, 401, 4)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215, 3),
          createMaterial('Lv 3 Agricultural Planting Essence', 1, 212, 3),
          createMaterial('Lv 4 Combat Essence', 2, 401, 4)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215, 3),
          createMaterial('Lv 3 Agricultural Planting Essence', 1, 212, 3),
          createMaterial('Lv 4 Combat Essence', 2, 401, 4)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215, 3),
          createMaterial('Lv 3 Agricultural Planting Essence', 1, 212, 3),
          createMaterial('Lv 4 Combat Essence', 2, 401, 4)
        ])
      }
    },
    {
      name: "Diamond Axe",
      alias: "DiamondAxe",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-306.png",
      requiresLevel: 5,
      stats: [
        { name: "Combatatt", typeNumber: "integer", values: { "min": 20, "max": 25 }},
        { name: "Treeatt", typeNumber: "integer", values: { "min": 365, "max": 446 }}
      ],
      recipe: {
        materials: [
          createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410, 4),
          createMaterial('Lv 4 Agricultural Planting Essence', 1, 407, 4),
          createMaterial('Lv 5 Combat Essence', 2, 402, 5)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410, 4),
          createMaterial('Lv 4 Agricultural Planting Essence', 1, 407, 4),
          createMaterial('Lv 5 Combat Essence', 2, 402, 5)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410, 4),
          createMaterial('Lv 4 Agricultural Planting Essence', 1, 407, 4),
          createMaterial('Lv 5 Combat Essence', 2, 402, 5)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410, 4),
          createMaterial('Lv 4 Agricultural Planting Essence', 1, 407, 4),
          createMaterial('Lv 5 Combat Essence', 2, 402, 5)
        ])
      }
    },
    {
      name: "Star Axe",
      alias: "StarAxe",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-312.png",
      requiresLevel: 6,
      stats: [
        { name: "Combatatt", typeNumber: "integer", values: { "min": 20, "max": 25 }},
        { name: "Treeatt", typeNumber: "integer", values: { "min": 446, "max": 527 }}
      ],
      recipe: {
        materials: [
          createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411, 5),
          createMaterial('Lv 5 Agricultural Planting Essence', 1, 408, 5),
          createMaterial('Lv 6 Combat Essence', 2, 403, 6)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411, 5),
          createMaterial('Lv 5 Agricultural Planting Essence', 1, 408, 5),
          createMaterial('Lv 6 Combat Essence', 2, 403, 6)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411, 5),
          createMaterial('Lv 5 Agricultural Planting Essence', 1, 408, 5),
          createMaterial('Lv 6 Combat Essence', 2, 403, 6)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411, 5),
          createMaterial('Lv 5 Agricultural Planting Essence', 1, 408, 5),
          createMaterial('Lv 6 Combat Essence', 2, 403, 6)
        ])
      }
    },
    {
      name: "Lava Axe",
      alias: "LavaAxe",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-536.png",
      requiresLevel: 7,
      stats: [
        { name: "Combatatt", typeNumber: "integer", values: { "min": 20, "max": 25 }},
        { name: "Treeatt", typeNumber: "integer", values: { "min": 527, "max": 608 }}
      ],
      recipe: {
        materials: [
          createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412, 6),
          createMaterial('Lv 6 Agricultural Planting Essence', 1, 409, 6),
          createMaterial('Lv 7 Combat Essence', 2, 602, 7)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412, 6),
          createMaterial('Lv 6 Agricultural Planting Essence', 1, 409, 6),
          createMaterial('Lv 7 Combat Essence', 2, 602, 7)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412, 6),
          createMaterial('Lv 6 Agricultural Planting Essence', 1, 409, 6),
          createMaterial('Lv 7 Combat Essence', 2, 602, 7)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412, 6),
          createMaterial('Lv 6 Agricultural Planting Essence', 1, 409, 6),
          createMaterial('Lv 7 Combat Essence', 2, 602, 7)
        ])
      }
    },
    {
      name: "Hollow Axe",
      alias: "HollowAxe",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-560.png",
      requiresLevel: 8,
      stats: [
        { name: "Combatatt", typeNumber: "integer", values: { "min": 20, "max": 25 }},
        { name: "Treeatt", typeNumber: "integer", values: { "min": 608, "max": 689 }}
      ],
      recipe: {
        materials: [
          createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611, 7),
          createMaterial('Lv 7 Agricultural Planting Essence', 1, 608, 7),
          createMaterial('Lv 8 Combat Essence', 2, 603, 8)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611, 7),
          createMaterial('Lv 7 Agricultural Planting Essence', 1, 608, 7),
          createMaterial('Lv 8 Combat Essence', 2, 603, 8)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611, 7),
          createMaterial('Lv 7 Agricultural Planting Essence', 1, 608, 7),
          createMaterial('Lv 8 Combat Essence', 2, 603, 8)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611, 7),
          createMaterial('Lv 7 Agricultural Planting Essence', 1, 608, 7),
          createMaterial('Lv 8 Combat Essence', 2, 603, 8)
        ])
      }
    },
    {
      name: "Bronze Axe",
      alias: "BronzeAxe",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-584.png",
      requiresLevel: 9,
      stats: [
        { name: "Combatatt", typeNumber: "integer", values: { "min": 20, "max": 25 }},
        { name: "Treeatt", typeNumber: "integer", values: { "min": 689, "max": 770 }}
      ],
      recipe: {
        materials: [
          createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612, 8),
          createMaterial('Lv 8 Agricultural Planting Essence', 1, 609, 8),
          createMaterial('Lv 9 Combat Essence', 2, 604, 9)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612, 8),
          createMaterial('Lv 8 Agricultural Planting Essence', 1, 609, 8),
          createMaterial('Lv 9 Combat Essence', 2, 604, 9)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612, 8),
          createMaterial('Lv 8 Agricultural Planting Essence', 1, 609, 8),
          createMaterial('Lv 9 Combat Essence', 2, 604, 9)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612, 8),
          createMaterial('Lv 8 Agricultural Planting Essence', 1, 609, 8),
          createMaterial('Lv 9 Combat Essence', 2, 604, 9)
        ])
      }
    },
    {
      name: "Copper Sickle",
      alias: "CopperSickle",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-226.png",
      requiresLevel: 1,
      stats: [
        { name: "Combatatt", typeNumber: "integer", values: { "min": 20, "max": 25 }},
        { name: "Grassatt", typeNumber: "integer", values: { "min": 41, "max": 122 }}
      ],
      recipe: {
        materials: [
          createMaterial('Lv 1 Combat Essence', 2, 216, 1)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 1 Combat Essence', 2, 216, 1)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 1 Combat Essence', 2, 216, 1)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 1 Combat Essence', 2, 216, 1)
        ])
      }
    },
    {
      name: "Iron Sickle",
      alias: "IronSickle",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-227.png",
      requiresLevel: 2,
      stats: [
        { name: "Combatatt", typeNumber: "integer", values: { "min": 20, "max": 25 }},
        { name: "Grassatt", typeNumber: "integer", values: { "min": 122, "max": 203 }}
      ],
      recipe: {
        materials: [
          createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213, 1),
          createMaterial('Lv 1 Agricultural Planting Essence', 1, 210, 1),
          createMaterial('Lv 2 Combat Essence', 2, 217, 2)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213, 1),
          createMaterial('Lv 1 Agricultural Planting Essence', 1, 210, 1),
          createMaterial('Lv 2 Combat Essence', 2, 217, 2)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213, 1),
          createMaterial('Lv 1 Agricultural Planting Essence', 1, 210, 1),
          createMaterial('Lv 2 Combat Essence', 2, 217, 2)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213, 1),
          createMaterial('Lv 1 Agricultural Planting Essence', 1, 210, 1),
          createMaterial('Lv 2 Combat Essence', 2, 217, 2)
        ])
      }
    },
    {
      name: "Crystal Sickle",
      alias: "CrystalSickle",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-228.png",
      requiresLevel: 3,
      stats: [
        { name: "Combatatt", typeNumber: "integer", values: { "min": 20, "max": 25 }},
        { name: "Grassatt", typeNumber: "integer", values: { "min": 203, "max": 284 }}
      ],
      recipe: {
        materials: [
          createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214, 2),
          createMaterial('Lv 2 Agricultural Planting Essence', 1, 211, 2),
          createMaterial('Lv 3 Combat Essence', 2, 218, 3)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214, 2),
          createMaterial('Lv 2 Agricultural Planting Essence', 1, 211, 2),
          createMaterial('Lv 3 Combat Essence', 2, 218, 3)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214, 2),
          createMaterial('Lv 2 Agricultural Planting Essence', 1, 211, 2),
          createMaterial('Lv 3 Combat Essence', 2, 218, 3)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214, 2),
          createMaterial('Lv 2 Agricultural Planting Essence', 1, 211, 2),
          createMaterial('Lv 3 Combat Essence', 2, 218, 3)
        ])
      }
    },
    {
      name: "Golden Sickle",
      alias: "GoldenSickle",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-303.png",
      requiresLevel: 4,
      stats: [
        { name: "Combatatt", typeNumber: "integer", values: { "min": 20, "max": 25 }},
        { name: "Grassatt", typeNumber: "integer", values: { "min": 284, "max": 365 }}
      ],
      recipe: {
        materials: [
          createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215, 3),
          createMaterial('Lv 3 Agricultural Planting Essence', 1, 212, 3),
          createMaterial('Lv 4 Combat Essence', 2, 401, 4)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215, 3),
          createMaterial('Lv 3 Agricultural Planting Essence', 1, 212, 3),
          createMaterial('Lv 4 Combat Essence', 2, 401, 4)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215, 3),
          createMaterial('Lv 3 Agricultural Planting Essence', 1, 212, 3),
          createMaterial('Lv 4 Combat Essence', 2, 401, 4)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215, 3),
          createMaterial('Lv 3 Agricultural Planting Essence', 1, 212, 3),
          createMaterial('Lv 4 Combat Essence', 2, 401, 4)
        ])
      }
    },
    {
      name: "Diamond Sickle",
      alias: "DiamondSickle",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-309.png",
      requiresLevel: 5,
      stats: [
        { name: "Combatatt", typeNumber: "integer", values: { "min": 20, "max": 25 }},
        { name: "Grassatt", typeNumber: "integer", values: { "min": 365, "max": 446 }}
      ],
      recipe: {
        materials: [
          createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410, 4),
          createMaterial('Lv 4 Agricultural Planting Essence', 1, 407, 4),
          createMaterial('Lv 5 Combat Essence', 2, 402, 5)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410, 4),
          createMaterial('Lv 4 Agricultural Planting Essence', 1, 407, 4),
          createMaterial('Lv 5 Combat Essence', 2, 402, 5)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410, 4),
          createMaterial('Lv 4 Agricultural Planting Essence', 1, 407, 4),
          createMaterial('Lv 5 Combat Essence', 2, 402, 5)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410, 4),
          createMaterial('Lv 4 Agricultural Planting Essence', 1, 407, 4),
          createMaterial('Lv 5 Combat Essence', 2, 402, 5)
        ])
      }
    },
    {
      name: "Star Sickle",
      alias: "StarSickle",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-315.png",
      requiresLevel: 6,
      stats: [
        { name: "Combatatt", typeNumber: "integer", values: { "min": 20, "max": 25 }},
        { name: "Grassatt", typeNumber: "integer", values: { "min": 446, "max": 527 }}
      ],
      recipe: {
        materials: [
          createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411, 5),
          createMaterial('Lv 5 Agricultural Planting Essence', 1, 408, 5),
          createMaterial('Lv 6 Combat Essence', 2, 403, 6)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411, 5),
          createMaterial('Lv 5 Agricultural Planting Essence', 1, 408, 5),
          createMaterial('Lv 6 Combat Essence', 2, 403, 6)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411, 5),
          createMaterial('Lv 5 Agricultural Planting Essence', 1, 408, 5),
          createMaterial('Lv 6 Combat Essence', 2, 403, 6)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411, 5),
          createMaterial('Lv 5 Agricultural Planting Essence', 1, 408, 5),
          createMaterial('Lv 6 Combat Essence', 2, 403, 6)
        ])
      }
    },
    {
      name: "Lava Sickle",
      alias: "LavaSickle",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-535.png",
      requiresLevel: 7,
      stats: [
        { name: "Combatatt", typeNumber: "integer", values: { "min": 20, "max": 25 }},
        { name: "Grassatt", typeNumber: "integer", values: { "min": 527, "max": 608 }}
      ],
      recipe: {
        materials: [
          createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412, 6),
          createMaterial('Lv 6 Agricultural Planting Essence', 1, 409, 6),
          createMaterial('Lv 7 Combat Essence', 2, 602, 7)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412, 6),
          createMaterial('Lv 6 Agricultural Planting Essence', 1, 409, 6),
          createMaterial('Lv 7 Combat Essence', 2, 602, 7)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412, 6),
          createMaterial('Lv 6 Agricultural Planting Essence', 1, 409, 6),
          createMaterial('Lv 7 Combat Essence', 2, 602, 7)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412, 6),
          createMaterial('Lv 6 Agricultural Planting Essence', 1, 409, 6),
          createMaterial('Lv 7 Combat Essence', 2, 602, 7)
        ])
      }
    },
    {
      name: "Hollow Sickle",
      alias: "HollowSickle",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-559.png",
      requiresLevel: 8,
      stats: [
        { name: "Combatatt", typeNumber: "integer", values: { "min": 20, "max": 25 }},
        { name: "Grassatt", typeNumber: "integer", values: { "min": 608, "max": 689 }}
      ],
      recipe: {
        materials: [
          createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611, 7),
          createMaterial('Lv 7 Agricultural Planting Essence', 1, 608, 7),
          createMaterial('Lv 8 Combat Essence', 2, 603, 8)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611, 7),
          createMaterial('Lv 7 Agricultural Planting Essence', 1, 608, 7),
          createMaterial('Lv 8 Combat Essence', 2, 603, 8)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611, 7),
          createMaterial('Lv 7 Agricultural Planting Essence', 1, 608, 7),
          createMaterial('Lv 8 Combat Essence', 2, 603, 8)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611, 7),
          createMaterial('Lv 7 Agricultural Planting Essence', 1, 608, 7),
          createMaterial('Lv 8 Combat Essence', 2, 603, 8)
        ])
      }
    },
    {
      name: "Bronze Sickle",
      alias: "BronzeSickle",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-583.png",
      requiresLevel: 9,
      stats: [
        { name: "Combatatt", typeNumber: "integer", values: { "min": 20, "max": 25 }},
        { name: "Grassatt", typeNumber: "integer", values: { "min": 689, "max": 770 }}
      ],
      recipe: {
        materials: [
          createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612, 8),
          createMaterial('Lv 8 Agricultural Planting Essence', 1, 609, 8),
          createMaterial('Lv 9 Combat Essence', 2, 604, 9)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612, 8),
          createMaterial('Lv 8 Agricultural Planting Essence', 1, 609, 8),
          createMaterial('Lv 9 Combat Essence', 2, 604, 9)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612, 8),
          createMaterial('Lv 8 Agricultural Planting Essence', 1, 609, 8),
          createMaterial('Lv 9 Combat Essence', 2, 604, 9)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612, 8),
          createMaterial('Lv 8 Agricultural Planting Essence', 1, 609, 8),
          createMaterial('Lv 9 Combat Essence', 2, 604, 9)
        ])
      }
    },
    {
      name: "Gathering Hat",
      alias: "GatheringHatLv1",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-116.png",
      requiresLevel: 1,
      stats: [
        { name: "Grassproficiency", typeNumber: "integer", values: { "min": 8, "max": 25 }},
        { name: "Oreproficiency", typeNumber: "integer", values: { "min": 8, "max": 25 }},
        { name: "Treeproficiency", typeNumber: "integer", values: { "min": 8, "max": 25 }}
      ],
      recipe: {
        materials: [
          createMaterial('Lv 1 Combat Essence', 2, 216, 1)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 1 Combat Essence', 2, 216, 1)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 1 Combat Essence', 2, 216, 1)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 1 Combat Essence', 2, 216, 1)
        ])
      }
    },
    {
      name: "Gathering Hat",
      alias: "GatheringHatLv2",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-117.png",
      requiresLevel: 2,
      stats: [
        { name: "Grassproficiency", typeNumber: "integer", values: { "min": 25, "max": 41 }},
        { name: "Oreproficiency", typeNumber: "integer", values: { "min": 25, "max": 41 }},
        { name: "Treeproficiency", typeNumber: "integer", values: { "min": 25, "max": 41 }}
      ],
      recipe: {
        materials: [
          createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213, 1),
          createMaterial('Lv 1 Agricultural Planting Essence', 1, 210, 1),
          createMaterial('Lv 2 Combat Essence', 2, 217, 2)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213, 1),
          createMaterial('Lv 1 Agricultural Planting Essence', 1, 210, 1),
          createMaterial('Lv 2 Combat Essence', 2, 217, 2)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213, 1),
          createMaterial('Lv 1 Agricultural Planting Essence', 1, 210, 1),
          createMaterial('Lv 2 Combat Essence', 2, 217, 2)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213, 1),
          createMaterial('Lv 1 Agricultural Planting Essence', 1, 210, 1),
          createMaterial('Lv 2 Combat Essence', 2, 217, 2)
        ])
      }
    },
    {
      name: "Gathering Hat",
      alias: "GatheringHatLv3",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-118.png",
      requiresLevel: 3,
      stats: [
        { name: "Grassproficiency", typeNumber: "integer", values: { "min": 41, "max": 58 }},
        { name: "Oreproficiency", typeNumber: "integer", values: { "min": 41, "max": 58 }},
        { name: "Treeproficiency", typeNumber: "integer", values: { "min": 41, "max": 58 }}
      ],
      recipe: {
        materials: [
          createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214, 2),
          createMaterial('Lv 2 Agricultural Planting Essence', 1, 211, 2),
          createMaterial('Lv 3 Combat Essence', 2, 218, 3)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214, 2),
          createMaterial('Lv 2 Agricultural Planting Essence', 1, 211, 2),
          createMaterial('Lv 3 Combat Essence', 2, 218, 3)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214, 2),
          createMaterial('Lv 2 Agricultural Planting Essence', 1, 211, 2),
          createMaterial('Lv 3 Combat Essence', 2, 218, 3)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214, 2),
          createMaterial('Lv 2 Agricultural Planting Essence', 1, 211, 2),
          createMaterial('Lv 3 Combat Essence', 2, 218, 3)
        ])
      }
    },
    {
      name: "Golden Gather Hat",
      alias: "GoldenGatherHat",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-320.png",
      requiresLevel: 4,
      stats: [
        { name: "Grassproficiency", typeNumber: "integer", values: { "min": 58, "max": 74 }},
        { name: "Oreproficiency", typeNumber: "integer", values: { "min": 58, "max": 74 }},
        { name: "Treeproficiency", typeNumber: "integer", values: { "min": 58, "max": 74 }}
      ],
      recipe: {
        materials: [
          createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215, 3),
          createMaterial('Lv 3 Agricultural Planting Essence', 1, 212, 3),
          createMaterial('Lv 4 Combat Essence', 2, 401, 4)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215, 3),
          createMaterial('Lv 3 Agricultural Planting Essence', 1, 212, 3),
          createMaterial('Lv 4 Combat Essence', 2, 401, 4)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215, 3),
          createMaterial('Lv 3 Agricultural Planting Essence', 1, 212, 3),
          createMaterial('Lv 4 Combat Essence', 2, 401, 4)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215, 3),
          createMaterial('Lv 3 Agricultural Planting Essence', 1, 212, 3),
          createMaterial('Lv 4 Combat Essence', 2, 401, 4)
        ])
      }
    },
    {
      name: "Diamond Gather Hat",
      alias: "DiamondGatherHat",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-325.png",
      requiresLevel: 5,
      stats: [
        { name: "Grassproficiency", typeNumber: "integer", values: { "min": 74, "max": 91 }},
        { name: "Oreproficiency", typeNumber: "integer", values: { "min": 74, "max": 91 }},
        { name: "Treeproficiency", typeNumber: "integer", values: { "min": 74, "max": 91 }}
      ],
      recipe: {
        materials: [
          createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410, 4),
          createMaterial('Lv 4 Agricultural Planting Essence', 1, 407, 4),
          createMaterial('Lv 5 Combat Essence', 2, 402, 5)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410, 4),
          createMaterial('Lv 4 Agricultural Planting Essence', 1, 407, 4),
          createMaterial('Lv 5 Combat Essence', 2, 402, 5)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410, 4),
          createMaterial('Lv 4 Agricultural Planting Essence', 1, 407, 4),
          createMaterial('Lv 5 Combat Essence', 2, 402, 5)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410, 4),
          createMaterial('Lv 4 Agricultural Planting Essence', 1, 407, 4),
          createMaterial('Lv 5 Combat Essence', 2, 402, 5)
        ])
      }
    },
    {
      name: "Star Gather Hat",
      alias: "StarGatherHat",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-330.png",
      requiresLevel: 6,
      stats: [
        { name: "Grassproficiency", typeNumber: "integer", values: { "min": 91, "max": 107 }},
        { name: "Oreproficiency", typeNumber: "integer", values: { "min": 91, "max": 107 }},
        { name: "Treeproficiency", typeNumber: "integer", values: { "min": 91, "max": 107 }}
      ],
      recipe: {
        materials: [
          createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411, 5),
          createMaterial('Lv 5 Agricultural Planting Essence', 1, 408, 5),
          createMaterial('Lv 6 Combat Essence', 2, 403, 6)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411, 5),
          createMaterial('Lv 5 Agricultural Planting Essence', 1, 408, 5),
          createMaterial('Lv 6 Combat Essence', 2, 403, 6)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411, 5),
          createMaterial('Lv 5 Agricultural Planting Essence', 1, 408, 5),
          createMaterial('Lv 6 Combat Essence', 2, 403, 6)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411, 5),
          createMaterial('Lv 5 Agricultural Planting Essence', 1, 408, 5),
          createMaterial('Lv 6 Combat Essence', 2, 403, 6)
        ])
      }
    },
    {
      name: "Lava Gather Hat",
      alias: "LavaGatherHat",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-538.png",
      requiresLevel: 7,
      stats: [
        { name: "Grassproficiency", typeNumber: "integer", values: { "min": 107, "max": 124 }},
        { name: "Oreproficiency", typeNumber: "integer", values: { "min": 107, "max": 124 }},
        { name: "Treeproficiency", typeNumber: "integer", values: { "min": 107, "max": 124 }}
      ],
      recipe: {
        materials: [
          createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412, 6),
          createMaterial('Lv 6 Agricultural Planting Essence', 1, 409, 6),
          createMaterial('Lv 7 Combat Essence', 2, 602, 7)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412, 6),
          createMaterial('Lv 6 Agricultural Planting Essence', 1, 409, 6),
          createMaterial('Lv 7 Combat Essence', 2, 602, 7)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412, 6),
          createMaterial('Lv 6 Agricultural Planting Essence', 1, 409, 6),
          createMaterial('Lv 7 Combat Essence', 2, 602, 7)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412, 6),
          createMaterial('Lv 6 Agricultural Planting Essence', 1, 409, 6),
          createMaterial('Lv 7 Combat Essence', 2, 602, 7)
        ])
      }
    },
    {
      name: "Hollow Gather Hat",
      alias: "HollowGatherHat",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-562.png",
      requiresLevel: 8,
      stats: [
        { name: "Grassproficiency", typeNumber: "integer", values: { "min": 124, "max": 142 }},
        { name: "Oreproficiency", typeNumber: "integer", values: { "min": 124, "max": 142 }},
        { name: "Treeproficiency", typeNumber: "integer", values: { "min": 124, "max": 142 }}
      ],
      recipe: {
        materials: [
          createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611, 7),
          createMaterial('Lv 7 Agricultural Planting Essence', 1, 608, 7),
          createMaterial('Lv 8 Combat Essence', 2, 603, 8)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611, 7),
          createMaterial('Lv 7 Agricultural Planting Essence', 1, 608, 7),
          createMaterial('Lv 8 Combat Essence', 2, 603, 8)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611, 7),
          createMaterial('Lv 7 Agricultural Planting Essence', 1, 608, 7),
          createMaterial('Lv 8 Combat Essence', 2, 603, 8)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611, 7),
          createMaterial('Lv 7 Agricultural Planting Essence', 1, 608, 7),
          createMaterial('Lv 8 Combat Essence', 2, 603, 8)
        ])
      }
    },
    {
      name: "Bronze Gather Hat",
      alias: "BronzeGatherHat",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-586.png",
      requiresLevel: 9,
      stats: [
        { name: "Grassproficiency", typeNumber: "integer", values: { "min": 142, "max": 160 }},
        { name: "Oreproficiency", typeNumber: "integer", values: { "min": 142, "max": 160 }},
        { name: "Treeproficiency", typeNumber: "integer", values: { "min": 142, "max": 160 }}
      ],
      recipe: {
        materials: [
          createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612, 8),
          createMaterial('Lv 8 Agricultural Planting Essence', 1, 609, 8),
          createMaterial('Lv 9 Combat Essence', 2, 604, 9)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612, 8),
          createMaterial('Lv 8 Agricultural Planting Essence', 1, 609, 8),
          createMaterial('Lv 9 Combat Essence', 2, 604, 9)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612, 8),
          createMaterial('Lv 8 Agricultural Planting Essence', 1, 609, 8),
          createMaterial('Lv 9 Combat Essence', 2, 604, 9)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612, 8),
          createMaterial('Lv 8 Agricultural Planting Essence', 1, 609, 8),
          createMaterial('Lv 9 Combat Essence', 2, 604, 9)
        ])
      }
    },
    {
      name: "Gathering Jacket",
      alias: "GatheringJacketLv1",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-119.png",
      requiresLevel: 1,
      stats: [
        { name: "Grassproficiency", typeNumber: "integer", values: { min: 10, max: 30 } },
        { name: "Oreproficiency", typeNumber: "integer", values: { min: 10, max: 30 } },
        { name: "Treeproficiency", typeNumber: "integer", values: { min: 10, max: 30 } },
      ],
      recipe: {
        materials: [
          createMaterial('Lv 1 Combat Essence', 2, 216, 1)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 1 Combat Essence', 2, 216, 1)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 1 Combat Essence', 2, 216, 1)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 1 Combat Essence', 2, 216, 1)
        ])
      }
    },
    {
      name: "Gathering Jacket",
      alias: "GatheringJacketLv2",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-120.png",
      requiresLevel: 2,
      stats: [
        { name: "Grassproficiency", typeNumber: "integer", values: { min: 30, max: 49 } },
        { name: "Oreproficiency", typeNumber: "integer", values: { min: 30, max: 49 } },
        { name: "Treeproficiency", typeNumber: "integer", values: { min: 30, max: 49 } },
      ],
      recipe: {
        materials: [
          createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213, 1),
          createMaterial('Lv 1 Agricultural Planting Essence', 1, 210, 1),
          createMaterial('Lv 2 Combat Essence', 2, 217, 2)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213, 1),
          createMaterial('Lv 1 Agricultural Planting Essence', 1, 210, 1),
          createMaterial('Lv 2 Combat Essence', 2, 217, 2)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213, 1),
          createMaterial('Lv 1 Agricultural Planting Essence', 1, 210, 1),
          createMaterial('Lv 2 Combat Essence', 2, 217, 2)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213, 1),
          createMaterial('Lv 1 Agricultural Planting Essence', 1, 210, 1),
          createMaterial('Lv 2 Combat Essence', 2, 217, 2)
        ])
      }
    },
    {
      name: "Gathering Jacket",
      alias: "GatheringJacketLv3",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-121.png",
      requiresLevel: 3,
      stats: [
        { name: "Grassproficiency", typeNumber: "integer", values: { min: 49, max: 69 } },
        { name: "Oreproficiency", typeNumber: "integer", values: { min: 49, max: 69 } },
        { name: "Treeproficiency", typeNumber: "integer", values: { min: 49, max: 69 } },
      ],
      recipe: {
        materials: [
          createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214, 2),
          createMaterial('Lv 2 Agricultural Planting Essence', 1, 211, 2),
          createMaterial('Lv 3 Combat Essence', 2, 218, 3)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214, 2),
          createMaterial('Lv 2 Agricultural Planting Essence', 1, 211, 2),
          createMaterial('Lv 3 Combat Essence', 2, 218, 3)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214, 2),
          createMaterial('Lv 2 Agricultural Planting Essence', 1, 211, 2),
          createMaterial('Lv 3 Combat Essence', 2, 218, 3)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214, 2),
          createMaterial('Lv 2 Agricultural Planting Essence', 1, 211, 2),
          createMaterial('Lv 3 Combat Essence', 2, 218, 3)
        ])
      }
    },
    {
      name: "Golden Gather Coat",
      alias: "GoldenGatherCoat",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-321.png",
      requiresLevel: 4,
      stats: [
        { name: "Grassproficiency", typeNumber: "integer", values: { min: 69, max: 89 } },
        { name: "Oreproficiency", typeNumber: "integer", values: { min: 69, max: 89 } },
        { name: "Treeproficiency", typeNumber: "integer", values: { min: 69, max: 89 } },
      ],
      recipe: {
        materials: [
          createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215, 3),
          createMaterial('Lv 3 Agricultural Planting Essence', 1, 212, 3),
          createMaterial('Lv 4 Combat Essence', 2, 401, 4)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215, 3),
          createMaterial('Lv 3 Agricultural Planting Essence', 1, 212, 3),
          createMaterial('Lv 4 Combat Essence', 2, 401, 4)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215, 3),
          createMaterial('Lv 3 Agricultural Planting Essence', 1, 212, 3),
          createMaterial('Lv 4 Combat Essence', 2, 401, 4)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215, 3),
          createMaterial('Lv 3 Agricultural Planting Essence', 1, 212, 3),
          createMaterial('Lv 4 Combat Essence', 2, 401, 4)
        ])
      }
    },
    {
      name: "Diamond Gather Coat",
      alias: "DiamondGatherCoat",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-326.png",
      requiresLevel: 5,
      stats: [
        { name: "Grassproficiency", typeNumber: "integer", values: { min: 89, max: 109 } },
        { name: "Oreproficiency", typeNumber: "integer", values: { min: 89, max: 109 } },
        { name: "Treeproficiency", typeNumber: "integer", values: { min: 89, max: 109 } },
      ],
      recipe: {
        materials: [
          createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410, 4),
          createMaterial('Lv 4 Agricultural Planting Essence', 1, 407, 4),
          createMaterial('Lv 5 Combat Essence', 2, 402, 5)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410, 4),
          createMaterial('Lv 4 Agricultural Planting Essence', 1, 407, 4),
          createMaterial('Lv 5 Combat Essence', 2, 402, 5)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410, 4),
          createMaterial('Lv 4 Agricultural Planting Essence', 1, 407, 4),
          createMaterial('Lv 5 Combat Essence', 2, 402, 5)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410, 4),
          createMaterial('Lv 4 Agricultural Planting Essence', 1, 407, 4),
          createMaterial('Lv 5 Combat Essence', 2, 402, 5)
        ])
      }
    },
    {
      name: "Star Gather Coat",
      alias: "StarGatherCoat",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-331.png",
      requiresLevel: 6,
      stats: [
        { name: "Grassproficiency", typeNumber: "integer", values: { min: 109, max: 128 } },
        { name: "Oreproficiency", typeNumber: "integer", values: { min: 109, max: 128 } },
        { name: "Treeproficiency", typeNumber: "integer", values: { min: 109, max: 128 } },
      ],
      recipe: {
        materials: [
          createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411, 5),
          createMaterial('Lv 5 Agricultural Planting Essence', 1, 408, 5),
          createMaterial('Lv 6 Combat Essence', 2, 403, 6)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411, 5),
          createMaterial('Lv 5 Agricultural Planting Essence', 1, 408, 5),
          createMaterial('Lv 6 Combat Essence', 2, 403, 6)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411, 5),
          createMaterial('Lv 5 Agricultural Planting Essence', 1, 408, 5),
          createMaterial('Lv 6 Combat Essence', 2, 403, 6)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411, 5),
          createMaterial('Lv 5 Agricultural Planting Essence', 1, 408, 5),
          createMaterial('Lv 6 Combat Essence', 2, 403, 6)
        ])
      }
    },
    {
      name: "Lava Gather Coat",
      alias: "LavaGatherCoat",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-539.png",
      requiresLevel: 7,
      stats: [
        { name: "Grassproficiency", typeNumber: "integer", values: { min: 128, max: 148 } },
        { name: "Oreproficiency", typeNumber: "integer", values: { min: 128, max: 148 } },
        { name: "Treeproficiency", typeNumber: "integer", values: { min: 128, max: 148 } },
      ],
      recipe: {
        materials: [
          createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412, 6),
          createMaterial('Lv 6 Agricultural Planting Essence', 1, 409, 6),
          createMaterial('Lv 7 Combat Essence', 2, 602, 7)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412, 6),
          createMaterial('Lv 6 Agricultural Planting Essence', 1, 409, 6),
          createMaterial('Lv 7 Combat Essence', 2, 602, 7)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412, 6),
          createMaterial('Lv 6 Agricultural Planting Essence', 1, 409, 6),
          createMaterial('Lv 7 Combat Essence', 2, 602, 7)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412, 6),
          createMaterial('Lv 6 Agricultural Planting Essence', 1, 409, 6),
          createMaterial('Lv 7 Combat Essence', 2, 602, 7)
        ])
      }
    },
    {
      name: "Hollow Gather Coat",
      alias: "HollowGatherCoat",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-563.png",
      requiresLevel: 8,
      stats: [
        { name: "Grassproficiency", typeNumber: "integer", values: { min: 148, max: 168 } },
        { name: "Oreproficiency", typeNumber: "integer", values: { min: 148, max: 168 } },
        { name: "Treeproficiency", typeNumber: "integer", values: { min: 148, max: 168 } },
      ],
      recipe: {
        materials: [
          createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611, 7),
          createMaterial('Lv 7 Agricultural Planting Essence', 1, 608, 7),
          createMaterial('Lv 8 Combat Essence', 2, 603, 8)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611, 7),
          createMaterial('Lv 7 Agricultural Planting Essence', 1, 608, 7),
          createMaterial('Lv 8 Combat Essence', 2, 603, 8)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611, 7),
          createMaterial('Lv 7 Agricultural Planting Essence', 1, 608, 7),
          createMaterial('Lv 8 Combat Essence', 2, 603, 8)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611, 7),
          createMaterial('Lv 7 Agricultural Planting Essence', 1, 608, 7),
          createMaterial('Lv 8 Combat Essence', 2, 603, 8)
        ])
      }
    },
    {
      name: "Bronze Gather Coat",
      alias: "BronzeGatherCoat",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-587.png",
      requiresLevel: 9,
      stats: [
        { name: "Grassproficiency", typeNumber: "integer", values: { min: 168, max: 188 } },
        { name: "Oreproficiency", typeNumber: "integer", values: { min: 168, max: 188 } },
        { name: "Treeproficiency", typeNumber: "integer", values: { min: 168, max: 188 } },
      ],
      recipe: {
        materials: [
          createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612, 8),
          createMaterial('Lv 8 Agricultural Planting Essence', 1, 609, 8),
          createMaterial('Lv 9 Combat Essence', 2, 604, 9)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612, 8),
          createMaterial('Lv 8 Agricultural Planting Essence', 1, 609, 8),
          createMaterial('Lv 9 Combat Essence', 2, 604, 9)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612, 8),
          createMaterial('Lv 8 Agricultural Planting Essence', 1, 609, 8),
          createMaterial('Lv 9 Combat Essence', 2, 604, 9)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612, 8),
          createMaterial('Lv 8 Agricultural Planting Essence', 1, 609, 8),
          createMaterial('Lv 9 Combat Essence', 2, 604, 9)
        ])
      }
    },
    {
      name: "Gathering Pants",
      alias: "GatheringPantsLv1",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-122.png",
      requiresLevel: 1,
      stats: [
        { name: "Grassproficiency", typeNumber: "integer", values: { min: 8, max: 24 } },
        { name: "Oreproficiency", typeNumber: "integer", values: { min: 8, max: 24 } },
        { name: "Treeproficiency", typeNumber: "integer", values: { min: 8, max: 24 } },
      ],
      recipe: {
        materials: [
          createMaterial('Lv 1 Combat Essence', 2, 216, 1)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 1 Combat Essence', 2, 216, 1)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 1 Combat Essence', 2, 216, 1)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 1 Combat Essence', 2, 216, 1)
        ])
      }
    },
    {
      name: "Gathering Pants",
      alias: "GatheringPantsLv2",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-123.png",
      requiresLevel: 2,
      stats: [
        { name: "Grassproficiency", typeNumber: "integer", values: { min: 24, max: 39 } },
        { name: "Oreproficiency", typeNumber: "integer", values: { min: 24, max: 39 } },
        { name: "Treeproficiency", typeNumber: "integer", values: { min: 24, max: 39 } },
      ],
      recipe: {
        materials: [
          createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213, 1),
          createMaterial('Lv 1 Agricultural Planting Essence', 1, 210, 1),
          createMaterial('Lv 2 Combat Essence', 2, 217, 2)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213, 1),
          createMaterial('Lv 1 Agricultural Planting Essence', 1, 210, 1),
          createMaterial('Lv 2 Combat Essence', 2, 217, 2)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213, 1),
          createMaterial('Lv 1 Agricultural Planting Essence', 1, 210, 1),
          createMaterial('Lv 2 Combat Essence', 2, 217, 2)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213, 1),
          createMaterial('Lv 1 Agricultural Planting Essence', 1, 210, 1),
          createMaterial('Lv 2 Combat Essence', 2, 217, 2)
        ])
      }
    },
    {
      name: "Gathering Pants",
      alias: "GatheringPantsLv3",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-124.png",
      requiresLevel: 3,
      stats: [
        { name: "Grassproficiency", typeNumber: "integer", values: { min: 39, max: 55 } },
        { name: "Oreproficiency", typeNumber: "integer", values: { min: 39, max: 55 } },
        { name: "Treeproficiency", typeNumber: "integer", values: { min: 39, max: 55 } },
      ],
      recipe: {
        materials: [
          createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214, 2),
          createMaterial('Lv 2 Agricultural Planting Essence', 1, 211, 2),
          createMaterial('Lv 3 Combat Essence', 2, 218, 3)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214, 2),
          createMaterial('Lv 2 Agricultural Planting Essence', 1, 211, 2),
          createMaterial('Lv 3 Combat Essence', 2, 218, 3)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214, 2),
          createMaterial('Lv 2 Agricultural Planting Essence', 1, 211, 2),
          createMaterial('Lv 3 Combat Essence', 2, 218, 3)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214, 2),
          createMaterial('Lv 2 Agricultural Planting Essence', 1, 211, 2),
          createMaterial('Lv 3 Combat Essence', 2, 218, 3)
        ])
      }
    },
    {
      name: "Golden Gather Pants",
      alias: "GoldenGatherPants",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-323.png",
      requiresLevel: 4,
      stats: [
        { name: "Grassproficiency", typeNumber: "integer", values: { min: 55, max: 71 } },
        { name: "Oreproficiency", typeNumber: "integer", values: { min: 55, max: 71 } },
        { name: "Treeproficiency", typeNumber: "integer", values: { min: 55, max: 71 } },
      ],
      recipe: {
        materials: [
          createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215, 3),
          createMaterial('Lv 3 Agricultural Planting Essence', 1, 212, 3),
          createMaterial('Lv 4 Combat Essence', 2, 401, 4)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215, 3),
          createMaterial('Lv 3 Agricultural Planting Essence', 1, 212, 3),
          createMaterial('Lv 4 Combat Essence', 2, 401, 4)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215, 3),
          createMaterial('Lv 3 Agricultural Planting Essence', 1, 212, 3),
          createMaterial('Lv 4 Combat Essence', 2, 401, 4)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215, 3),
          createMaterial('Lv 3 Agricultural Planting Essence', 1, 212, 3),
          createMaterial('Lv 4 Combat Essence', 2, 401, 4)
        ])
      }
    },
    {
      name: "Diamond Gather Pants",
      alias: "DiamondGatherPants",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-328.png",
      requiresLevel: 5,
      stats: [
        { name: "Grassproficiency", typeNumber: "integer", values: { min: 71, max: 86 } },
        { name: "Oreproficiency", typeNumber: "integer", values: { min: 71, max: 86 } },
        { name: "Treeproficiency", typeNumber: "integer", values: { min: 71, max: 86 } },
      ],
      recipe: {
        materials: [
          createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410, 4),
          createMaterial('Lv 4 Agricultural Planting Essence', 1, 407, 4),
          createMaterial('Lv 5 Combat Essence', 2, 402, 5)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410, 4),
          createMaterial('Lv 4 Agricultural Planting Essence', 1, 407, 4),
          createMaterial('Lv 5 Combat Essence', 2, 402, 5)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410, 4),
          createMaterial('Lv 4 Agricultural Planting Essence', 1, 407, 4),
          createMaterial('Lv 5 Combat Essence', 2, 402, 5)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410, 4),
          createMaterial('Lv 4 Agricultural Planting Essence', 1, 407, 4),
          createMaterial('Lv 5 Combat Essence', 2, 402, 5)
        ])
      }
    },
    {
      name: "Star Gather Pants",
      alias: "StarGatherPants",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-333.png",
      requiresLevel: 6,
      stats: [
        { name: "Grassproficiency", typeNumber: "integer", values: { min: 86, max: 102 } },
        { name: "Oreproficiency", typeNumber: "integer", values: { min: 86, max: 102 } },
        { name: "Treeproficiency", typeNumber: "integer", values: { min: 86, max: 102 } },
      ],
      recipe: {
        materials: [
          createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411, 5),
          createMaterial('Lv 5 Agricultural Planting Essence', 1, 408, 5),
          createMaterial('Lv 6 Combat Essence', 2, 403, 6)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411, 5),
          createMaterial('Lv 5 Agricultural Planting Essence', 1, 408, 5),
          createMaterial('Lv 6 Combat Essence', 2, 403, 6)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411, 5),
          createMaterial('Lv 5 Agricultural Planting Essence', 1, 408, 5),
          createMaterial('Lv 6 Combat Essence', 2, 403, 6)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411, 5),
          createMaterial('Lv 5 Agricultural Planting Essence', 1, 408, 5),
          createMaterial('Lv 6 Combat Essence', 2, 403, 6)
        ])
      }
    },
    {
      name: "Lava Gather Pants",
      alias: "LavaGatherPants",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-540.png",
      requiresLevel: 7,
      stats: [
        { name: "Grassproficiency", typeNumber: "integer", values: { min: 102, max: 118 } },
        { name: "Oreproficiency", typeNumber: "integer", values: { min: 102, max: 118 } },
        { name: "Treeproficiency", typeNumber: "integer", values: { min: 102, max: 118 } },
      ],
      recipe: {
        materials: [
          createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412, 6),
          createMaterial('Lv 6 Agricultural Planting Essence', 1, 409, 6),
          createMaterial('Lv 7 Combat Essence', 2, 602, 7)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412, 6),
          createMaterial('Lv 6 Agricultural Planting Essence', 1, 409, 6),
          createMaterial('Lv 7 Combat Essence', 2, 602, 7)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412, 6),
          createMaterial('Lv 6 Agricultural Planting Essence', 1, 409, 6),
          createMaterial('Lv 7 Combat Essence', 2, 602, 7)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412, 6),
          createMaterial('Lv 6 Agricultural Planting Essence', 1, 409, 6),
          createMaterial('Lv 7 Combat Essence', 2, 602, 7)
        ])
      }
    },
    {
      name: "Hollow Gather Pants",
      alias: "HollowGatherPants",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-564.png",
      requiresLevel: 8,
      stats: [
        { name: "Grassproficiency", typeNumber: "integer", values: { min: 118, max: 136 } },
        { name: "Oreproficiency", typeNumber: "integer", values: { min: 118, max: 136 } },
        { name: "Treeproficiency", typeNumber: "integer", values: { min: 118, max: 136 } },
      ],
      recipe: {
        materials: [
          createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611, 7),
          createMaterial('Lv 7 Agricultural Planting Essence', 1, 608, 7),
          createMaterial('Lv 8 Combat Essence', 2, 603, 8)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611, 7),
          createMaterial('Lv 7 Agricultural Planting Essence', 1, 608, 7),
          createMaterial('Lv 8 Combat Essence', 2, 603, 8)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611, 7),
          createMaterial('Lv 7 Agricultural Planting Essence', 1, 608, 7),
          createMaterial('Lv 8 Combat Essence', 2, 603, 8)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611, 7),
          createMaterial('Lv 7 Agricultural Planting Essence', 1, 608, 7),
          createMaterial('Lv 8 Combat Essence', 2, 603, 8)
        ])
      }
    },
    {
      name: "Bronze Gather Pants",
      alias: "BronzeGatherPants",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-588.png",
      requiresLevel: 9,
      stats: [
        { name: "Grassproficiency", typeNumber: "integer", values: { min: 136, max: 156 } },
        { name: "Oreproficiency", typeNumber: "integer", values: { min: 136, max: 156 } },
        { name: "Treeproficiency", typeNumber: "integer", values: { min: 136, max: 156 } },
      ],
      recipe: {
        materials: [
          createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612, 8),
          createMaterial('Lv 8 Agricultural Planting Essence', 1, 609, 8),
          createMaterial('Lv 9 Combat Essence', 2, 604, 9)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612, 8),
          createMaterial('Lv 8 Agricultural Planting Essence', 1, 609, 8),
          createMaterial('Lv 9 Combat Essence', 2, 604, 9)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612, 8),
          createMaterial('Lv 8 Agricultural Planting Essence', 1, 609, 8),
          createMaterial('Lv 9 Combat Essence', 2, 604, 9)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612, 8),
          createMaterial('Lv 8 Agricultural Planting Essence', 1, 609, 8),
          createMaterial('Lv 9 Combat Essence', 2, 604, 9)
        ])
      }
    },
    {
      name: "Gathering Shoes",
      alias: "GatheringShoesLv1",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-113.png",
      requiresLevel: 1,
      stats: [
        { name: "Grassproficiency", typeNumber: "integer", values: { "min": 8, "max": 25 } },
        { name: "Oreproficiency", typeNumber: "integer", values: { "min": 8, "max": 25 } },
        { name: "Treeproficiency", typeNumber: "integer", values: { "min": 8, "max": 25 } }
      ],
      recipe: {
        materials: [
          createMaterial('Lv 1 Combat Essence', 2, 216, 1)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 1 Combat Essence', 2, 216, 1)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 1 Combat Essence', 2, 216, 1)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 1 Combat Essence', 2, 216, 1)
        ])
      }
    },
    {
      name: "Gathering Shoes",
      alias: "GatheringShoesLv2",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-114.png",
      requiresLevel: 2,
      stats: [
        { name: "Grassproficiency", typeNumber: "integer", values: { "min": 25, "max": 41 } },
        { name: "Oreproficiency", typeNumber: "integer", values: { "min": 25, "max": 41 } },
        { name: "Treeproficiency", typeNumber: "integer", values: { "min": 25, "max": 41 } }
      ],
      recipe: {
        materials: [
          createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213, 1),
          createMaterial('Lv 1 Agricultural Planting Essence', 1, 210, 1),
          createMaterial('Lv 2 Combat Essence', 2, 217, 2)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213, 1),
          createMaterial('Lv 1 Agricultural Planting Essence', 1, 210, 1),
          createMaterial('Lv 2 Combat Essence', 2, 217, 2)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213, 1),
          createMaterial('Lv 1 Agricultural Planting Essence', 1, 210, 1),
          createMaterial('Lv 2 Combat Essence', 2, 217, 2)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213, 1),
          createMaterial('Lv 1 Agricultural Planting Essence', 1, 210, 1),
          createMaterial('Lv 2 Combat Essence', 2, 217, 2)
        ])
      }
    },
    {
      name: "Gathering Shoes",
      alias: "GatheringShoesLv3",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-115.png",
      requiresLevel: 3,
      stats: [
        { name: "Grassproficiency", typeNumber: "integer", values: { "min": 41, "max": 58 } },
        { name: "Oreproficiency", typeNumber: "integer", values: { "min": 41, "max": 58 } },
        { name: "Treeproficiency", typeNumber: "integer", values: { "min": 41, "max": 58 } }
      ],
      recipe: {
        materials: [
          createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214, 2),
          createMaterial('Lv 2 Agricultural Planting Essence', 1, 211, 2),
          createMaterial('Lv 3 Combat Essence', 2, 218, 3)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214, 2),
          createMaterial('Lv 2 Agricultural Planting Essence', 1, 211, 2),
          createMaterial('Lv 3 Combat Essence', 2, 218, 3)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214, 2),
          createMaterial('Lv 2 Agricultural Planting Essence', 1, 211, 2),
          createMaterial('Lv 3 Combat Essence', 2, 218, 3)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214, 2),
          createMaterial('Lv 2 Agricultural Planting Essence', 1, 211, 2),
          createMaterial('Lv 3 Combat Essence', 2, 218, 3)
        ])
      }
    },
    {
      name: "Golden Gather Shoes",
      alias: "GoldenGatherShoes",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-324.png",
      requiresLevel: 4,
      stats: [
        { name: "Grassproficiency", typeNumber: "integer", values: { "min": 58, "max": 74 } },
        { name: "Oreproficiency", typeNumber: "integer", values: { "min": 58, "max": 74 } },
        { name: "Treeproficiency", typeNumber: "integer", values: { "min": 58, "max": 74 } }
      ],
      recipe: {
        materials: [
          createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215, 3),
          createMaterial('Lv 3 Agricultural Planting Essence', 1, 212, 3),
          createMaterial('Lv 4 Combat Essence', 2, 401, 4)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215, 3),
          createMaterial('Lv 3 Agricultural Planting Essence', 1, 212, 3),
          createMaterial('Lv 4 Combat Essence', 2, 401, 4)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215, 3),
          createMaterial('Lv 3 Agricultural Planting Essence', 1, 212, 3),
          createMaterial('Lv 4 Combat Essence', 2, 401, 4)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215, 3),
          createMaterial('Lv 3 Agricultural Planting Essence', 1, 212, 3),
          createMaterial('Lv 4 Combat Essence', 2, 401, 4)
        ])
      }
    },
    {
      name: "Diamond Gather Shoes",
      alias: "DiamondGatherShoes",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-329.png",
      requiresLevel: 5,
      stats: [
        { name: "Grassproficiency", typeNumber: "integer", values: { "min": 74, "max": 91 } },
        { name: "Oreproficiency", typeNumber: "integer", values: { "min": 74, "max": 91 } },
        { name: "Treeproficiency", typeNumber: "integer", values: { "min": 74, "max": 91 } }
      ],
      recipe: {
        materials: [
          createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410, 4),
          createMaterial('Lv 4 Agricultural Planting Essence', 1, 407, 4),
          createMaterial('Lv 5 Combat Essence', 2, 402, 5)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410, 4),
          createMaterial('Lv 4 Agricultural Planting Essence', 1, 407, 4),
          createMaterial('Lv 5 Combat Essence', 2, 402, 5)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410, 4),
          createMaterial('Lv 4 Agricultural Planting Essence', 1, 407, 4),
          createMaterial('Lv 5 Combat Essence', 2, 402, 5)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410, 4),
          createMaterial('Lv 4 Agricultural Planting Essence', 1, 407, 4),
          createMaterial('Lv 5 Combat Essence', 2, 402, 5)
        ])
      }
    },
    {
      name: "Star Gather Shoes",
      alias: "StarGatherShoes",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-334.png",
      requiresLevel: 6,
      stats: [
        { name: "Grassproficiency", typeNumber: "integer", values: { "min": 91, "max": 107 } },
        { name: "Oreproficiency", typeNumber: "integer", values: { "min": 91, "max": 107 } },
        { name: "Treeproficiency", typeNumber: "integer", values: { "min": 91, "max": 107 } }
      ],
      recipe: {
        materials: [
          createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411, 5),
          createMaterial('Lv 5 Agricultural Planting Essence', 1, 408, 5),
          createMaterial('Lv 6 Combat Essence', 2, 403, 6)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411, 5),
          createMaterial('Lv 5 Agricultural Planting Essence', 1, 408, 5),
          createMaterial('Lv 6 Combat Essence', 2, 403, 6)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411, 5),
          createMaterial('Lv 5 Agricultural Planting Essence', 1, 408, 5),
          createMaterial('Lv 6 Combat Essence', 2, 403, 6)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411, 5),
          createMaterial('Lv 5 Agricultural Planting Essence', 1, 408, 5),
          createMaterial('Lv 6 Combat Essence', 2, 403, 6)
        ])
      }
    },
    {
      name: "Lava Gather Shoes",
      alias: "LavaGatherShoes",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-542.png",
      requiresLevel: 7,
      stats: [
        { name: "Grassproficiency", typeNumber: "integer", values: { "min": 107, "max": 124 } },
        { name: "Oreproficiency", typeNumber: "integer", values: { "min": 107, "max": 124 } },
        { name: "Treeproficiency", typeNumber: "integer", values: { "min": 107, "max": 124 } }
      ],
      recipe: {
        materials: [
          createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412, 6),
          createMaterial('Lv 6 Agricultural Planting Essence', 1, 409, 6),
          createMaterial('Lv 7 Combat Essence', 2, 602, 7)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412, 6),
          createMaterial('Lv 6 Agricultural Planting Essence', 1, 409, 6),
          createMaterial('Lv 7 Combat Essence', 2, 602, 7)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412, 6),
          createMaterial('Lv 6 Agricultural Planting Essence', 1, 409, 6),
          createMaterial('Lv 7 Combat Essence', 2, 602, 7)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412, 6),
          createMaterial('Lv 6 Agricultural Planting Essence', 1, 409, 6),
          createMaterial('Lv 7 Combat Essence', 2, 602, 7)
        ])
      }
    },
    {
      name: "Hollow Gather Shoes",
      alias: "HollowGatherShoes",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-566.png",
      requiresLevel: 8,
      stats: [
        { name: "Grassproficiency", typeNumber: "integer", values: { "min": 124, "max": 140 } },
        { name: "Oreproficiency", typeNumber: "integer", values: { "min": 124, "max": 140 } },
        { name: "Treeproficiency", typeNumber: "integer", values: { "min": 124, "max": 140 } }
      ],
      recipe: {
        materials: [
          createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611, 7),
          createMaterial('Lv 7 Agricultural Planting Essence', 1, 608, 7),
          createMaterial('Lv 8 Combat Essence', 2, 603, 8)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611, 7),
          createMaterial('Lv 7 Agricultural Planting Essence', 1, 608, 7),
          createMaterial('Lv 8 Combat Essence', 2, 603, 8)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611, 7),
          createMaterial('Lv 7 Agricultural Planting Essence', 1, 608, 7),
          createMaterial('Lv 8 Combat Essence', 2, 603, 8)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611, 7),
          createMaterial('Lv 7 Agricultural Planting Essence', 1, 608, 7),
          createMaterial('Lv 8 Combat Essence', 2, 603, 8)
        ])
      }
    },
    {
      name: "Bronze Gather Shoes",
      alias: "BronzeGatherShoes",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-590.png",
      requiresLevel: 9,
      stats: [
        { name: "Grassproficiency", typeNumber: "integer", values: { "min": 140, "max": 157 } },
        { name: "Oreproficiency", typeNumber: "integer", values: { "min": 140, "max": 157 } },
        { name: "Treeproficiency", typeNumber: "integer", values: { "min": 140, "max": 157 } }
      ],
      recipe: {
        materials: [
          createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612, 8),
          createMaterial('Lv 8 Agricultural Planting Essence', 1, 609, 8),
          createMaterial('Lv 9 Combat Essence', 2, 604, 9)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612, 8),
          createMaterial('Lv 8 Agricultural Planting Essence', 1, 609, 8),
          createMaterial('Lv 9 Combat Essence', 2, 604, 9)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612, 8),
          createMaterial('Lv 8 Agricultural Planting Essence', 1, 609, 8),
          createMaterial('Lv 9 Combat Essence', 2, 604, 9)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612, 8),
          createMaterial('Lv 8 Agricultural Planting Essence', 1, 609, 8),
          createMaterial('Lv 9 Combat Essence', 2, 604, 9)
        ])
      }
    },
    {
      name: "Gathering Gloves",
      alias: "GatheringGlovesLv1",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-125.png",
      requiresLevel: 1,
      stats: [
        { name: "Grassproficiency", typeNumber: "integer", values: { "min": 6, "max": 19 } },
        { name: "Oreproficiency", typeNumber: "integer", values: { "min": 6, "max": 19 } },
        { name: "Treeproficiency", typeNumber: "integer", values: { "min": 6, "max": 19 } },
        { name: "Grassatt", typeNumber: "integer", values: { "min": 5, "max": 14 } },
        { name: "Oreatt", typeNumber: "integer", values: { "min": 5, "max": 14 } },
        { name: "Treeatt", typeNumber: "integer", values: { "min": 5, "max": 14 } }
      ],
      recipe: {
        materials: [
          createMaterial('Lv 1 Combat Essence', 2, 216, 1)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 1 Combat Essence', 2, 216, 1)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 1 Combat Essence', 2, 216, 1)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 1 Combat Essence', 2, 216, 1)
        ])
      }
    },
    {
      name: "Gathering Gloves",
      alias: "GatheringGlovesLv2",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-126.png",
      requiresLevel: 2,
      stats: [
        { name: "Grassproficiency", typeNumber: "integer", values: { "min": 19, "max": 31 } },
        { name: "Oreproficiency", typeNumber: "integer", values: { "min": 19, "max": 31 } },
        { name: "Treeproficiency", typeNumber: "integer", values: { "min": 19, "max": 31 } },
        { name: "Grassatt", typeNumber: "integer", values: { "min": 14, "max": 23 } },
        { name: "Oreatt", typeNumber: "integer", values: { "min": 14, "max": 23 } },
        { name: "Treeatt", typeNumber: "integer", values: { "min": 14, "max": 23 } }
      ],
      recipe: {
        materials: [
          createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213, 1),
          createMaterial('Lv 1 Agricultural Planting Essence', 1, 210, 1),
          createMaterial('Lv 2 Combat Essence', 2, 217, 2)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213, 1),
          createMaterial('Lv 1 Agricultural Planting Essence', 1, 210, 1),
          createMaterial('Lv 2 Combat Essence', 2, 217, 2)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213, 1),
          createMaterial('Lv 1 Agricultural Planting Essence', 1, 210, 1),
          createMaterial('Lv 2 Combat Essence', 2, 217, 2)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 1 Agricultural Livestock Essence', 1, 213, 1),
          createMaterial('Lv 1 Agricultural Planting Essence', 1, 210, 1),
          createMaterial('Lv 2 Combat Essence', 2, 217, 2)
        ])
      }
    },
    {
      name: "Gathering Gloves",
      alias: "GatheringGlovesLv3",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-127.png",
      requiresLevel: 3,
      stats: [
        { name: "Grassproficiency", typeNumber: "integer", values: { "min": 31, "max": 44 } },
        { name: "Oreproficiency", typeNumber: "integer", values: { "min": 31, "max": 44 } },
        { name: "Treeproficiency", typeNumber: "integer", values: { "min": 31, "max": 44 } },
        { name: "Grassatt", typeNumber: "integer", values: { "min": 23, "max": 32 } },
        { name: "Oreatt", typeNumber: "integer", values: { "min": 23, "max": 32 } },
        { name: "Treeatt", typeNumber: "integer", values: { "min": 23, "max": 32 } }
      ],
      recipe: {
        materials: [
          createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214, 2),
          createMaterial('Lv 2 Agricultural Planting Essence', 1, 211, 2),
          createMaterial('Lv 3 Combat Essence', 2, 218, 3)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214, 2),
          createMaterial('Lv 2 Agricultural Planting Essence', 1, 211, 2),
          createMaterial('Lv 3 Combat Essence', 2, 218, 3)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214, 2),
          createMaterial('Lv 2 Agricultural Planting Essence', 1, 211, 2),
          createMaterial('Lv 3 Combat Essence', 2, 218, 3)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 2 Agricultural Livestock Essence', 1, 214, 2),
          createMaterial('Lv 2 Agricultural Planting Essence', 1, 211, 2),
          createMaterial('Lv 3 Combat Essence', 2, 218, 3)
        ])
      }
    },
    {
      name: "Golden Gather Glove",
      alias: "GoldenGatherGlove",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-322.png",
      requiresLevel: 4,
      stats: [
        { name: "Grassproficiency", typeNumber: "integer", values: { "min": 44, "max": 56 } },
        { name: "Oreproficiency", typeNumber: "integer", values: { "min": 44, "max": 56 } },
        { name: "Treeproficiency", typeNumber: "integer", values: { "min": 44, "max": 56 } },
        { name: "Grassatt", typeNumber: "integer", values: { "min": 32, "max": 41 } },
        { name: "Oreatt", typeNumber: "integer", values: { "min": 32, "max": 41 } },
        { name: "Treeatt", typeNumber: "integer", values: { "min": 32, "max": 41 } }
      ],
      recipe: {
        materials: [
          createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215, 3),
          createMaterial('Lv 3 Agricultural Planting Essence', 1, 212, 3),
          createMaterial('Lv 4 Combat Essence', 2, 401, 4)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215, 3),
          createMaterial('Lv 3 Agricultural Planting Essence', 1, 212, 3),
          createMaterial('Lv 4 Combat Essence', 2, 401, 4)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215, 3),
          createMaterial('Lv 3 Agricultural Planting Essence', 1, 212, 3),
          createMaterial('Lv 4 Combat Essence', 2, 401, 4)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 3 Agricultural Livestock Essence', 1, 215, 3),
          createMaterial('Lv 3 Agricultural Planting Essence', 1, 212, 3),
          createMaterial('Lv 4 Combat Essence', 2, 401, 4)
        ])
      }
    },
    {
      name: "Diamond Gather Glove",
      alias: "DiamondGatherGlove",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-327.png",
      requiresLevel: 5,
      stats: [
        { name: "Grassproficiency", typeNumber: "integer", values: { "min": 56, "max": 69 } },
        { name: "Oreproficiency", typeNumber: "integer", values: { "min": 56, "max": 69 } },
        { name: "Treeproficiency", typeNumber: "integer", values: { "min": 56, "max": 69 } },
        { name: "Grassatt", typeNumber: "integer", values: { "min": 41, "max": 50 } },
        { name: "Oreatt", typeNumber: "integer", values: { "min": 41, "max": 50 } },
        { name: "Treeatt", typeNumber: "integer", values: { "min": 41, "max": 50 } }
      ],
      recipe: {
        materials: [
          createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410, 4),
          createMaterial('Lv 4 Agricultural Planting Essence', 1, 407, 4),
          createMaterial('Lv 5 Combat Essence', 2, 402, 5)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410, 4),
          createMaterial('Lv 4 Agricultural Planting Essence', 1, 407, 4),
          createMaterial('Lv 5 Combat Essence', 2, 402, 5)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410, 4),
          createMaterial('Lv 4 Agricultural Planting Essence', 1, 407, 4),
          createMaterial('Lv 5 Combat Essence', 2, 402, 5)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 4 Agricultural Livestock Essence', 1, 410, 4),
          createMaterial('Lv 4 Agricultural Planting Essence', 1, 407, 4),
          createMaterial('Lv 5 Combat Essence', 2, 402, 5)
        ])
      }
    },
    {
      name: "Star Gather Glove",
      alias: "StarGatherGlove",
      prices: { "ron": null, "usd": null },
      cdnImage: "https://icons.lumiterra.net/item-icon-327.png",
      requiresLevel: 6,
      stats: [
        { name: "Grassproficiency", typeNumber: "integer", values: { "min": 69, "max": 81 } },
        { name: "Oreproficiency", typeNumber: "integer", values: { "min": 69, "max": 81 } },
        { name: "Treeproficiency", typeNumber: "integer", values: { "min": 69, "max": 81 } },
        { name: "Grassatt", typeNumber: "integer", values: { "min": 50, "max": 59 } },
        { name: "Oreatt", typeNumber: "integer", values: { "min": 50, "max": 59 } },
        { name: "Treeatt", typeNumber: "integer", values: { "min": 50, "max": 59 } }
      ],
      recipe: {
        materials: [
          createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411, 5),
          createMaterial('Lv 5 Agricultural Planting Essence', 1, 408, 5),
          createMaterial('Lv 6 Combat Essence', 2, 403, 6)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411, 5),
          createMaterial('Lv 5 Agricultural Planting Essence', 1, 408, 5),
          createMaterial('Lv 6 Combat Essence', 2, 403, 6)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411, 5),
          createMaterial('Lv 5 Agricultural Planting Essence', 1, 408, 5),
          createMaterial('Lv 6 Combat Essence', 2, 403, 6)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 5 Agricultural Livestock Essence', 1, 411, 5),
          createMaterial('Lv 5 Agricultural Planting Essence', 1, 408, 5),
          createMaterial('Lv 6 Combat Essence', 2, 403, 6)
        ])
      }
    },
    {
      name: "Lava Gather Glove",
      alias: "LavaGatherGlove",
      prices: { "ron": null, "usd": null },
      cdnImage: "https://icons.lumiterra.net/item-icon-541.png",
      requiresLevel: 7,
      stats: [
        { name: "Grassproficiency", typeNumber: "integer", values: { "min": 81, "max": 94 } },
        { name: "Oreproficiency", typeNumber: "integer", values: { "min": 81, "max": 94 } },
        { name: "Treeproficiency", typeNumber: "integer", values: { "min": 81, "max": 94 } },
        { name: "Grassatt", typeNumber: "integer", values: { "min": 59, "max": 68 } },
        { name: "Oreatt", typeNumber: "integer", values: { "min": 59, "max": 68 } },
        { name: "Treeatt", typeNumber: "integer", values: { "min": 59, "max": 68 } }
      ],
      recipe: {
        materials: [
          createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412, 6),
          createMaterial('Lv 6 Agricultural Planting Essence', 1, 409, 6),
          createMaterial('Lv 7 Combat Essence', 2, 602, 7)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412, 6),
          createMaterial('Lv 6 Agricultural Planting Essence', 1, 409, 6),
          createMaterial('Lv 7 Combat Essence', 2, 602, 7)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412, 6),
          createMaterial('Lv 6 Agricultural Planting Essence', 1, 409, 6),
          createMaterial('Lv 7 Combat Essence', 2, 602, 7)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 6 Agricultural Livestock Essence', 1, 412, 6),
          createMaterial('Lv 6 Agricultural Planting Essence', 1, 409, 6),
          createMaterial('Lv 7 Combat Essence', 2, 602, 7)
        ])
      }
    },
    {
      name: "Hollow Gather Glove",
      alias: "HollowGatherGlove",
      prices: { "ron": null, "usd": null },
      cdnImage: "https://icons.lumiterra.net/item-icon-565.png",
      requiresLevel: 8,
      stats: [
        { name: "Grassproficiency", typeNumber: "integer", values: { "min": 94, "max": 106 } },
        { name: "Oreproficiency", typeNumber: "integer", values: { "min": 94, "max": 106 } },
        { name: "Treeproficiency", typeNumber: "integer", values: { "min": 94, "max": 106 } },
        { name: "Grassatt", typeNumber: "integer", values: { "min": 68, "max": 77 } },
        { name: "Oreatt", typeNumber: "integer", values: { "min": 68, "max": 77 } },
        { name: "Treeatt", typeNumber: "integer", values: { "min": 68, "max": 77 } }
      ],
      recipe: {
        materials: [
          createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611, 7),
          createMaterial('Lv 7 Agricultural Planting Essence', 1, 608, 7),
          createMaterial('Lv 8 Combat Essence', 2, 603, 8)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611, 7),
          createMaterial('Lv 7 Agricultural Planting Essence', 1, 608, 7),
          createMaterial('Lv 8 Combat Essence', 2, 603, 8)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611, 7),
          createMaterial('Lv 7 Agricultural Planting Essence', 1, 608, 7),
          createMaterial('Lv 8 Combat Essence', 2, 603, 8)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 7 Agricultural Livestock Essence', 1, 611, 7),
          createMaterial('Lv 7 Agricultural Planting Essence', 1, 608, 7),
          createMaterial('Lv 8 Combat Essence', 2, 603, 8)
        ])
      }
    },
    {
      name: "Bronze Gather Glove",
      alias: "BronzeGatherGlove",
      prices: { "ron": null, "usd": null },
      cdnImage: "https://icons.lumiterra.net/item-icon-589.png",
      requiresLevel: 9,
      stats: [
        { name: "Grassproficiency", typeNumber: "integer", values: { "min": 106, "max": 119 } },
        { name: "Oreproficiency", typeNumber: "integer", values: { "min": 106, "max": 119 } },
        { name: "Treeproficiency", typeNumber: "integer", values: { "min": 106, "max": 119 } },
        { name: "Grassatt", typeNumber: "integer", values: { "min": 77, "max": 86 } },
        { name: "Oreatt", typeNumber: "integer", values: { "min": 77, "max": 86 } },
        { name: "Treeatt", typeNumber: "integer", values: { "min": 77, "max": 86 } }
      ],
      recipe: {
        materials: [
          createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612, 8),
          createMaterial('Lv 8 Agricultural Planting Essence', 1, 609, 8),
          createMaterial('Lv 9 Combat Essence', 2, 604, 9)
        ],
        minPriceTotalRon: calculateTotalPrice([
          createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612, 8),
          createMaterial('Lv 8 Agricultural Planting Essence', 1, 609, 8),
          createMaterial('Lv 9 Combat Essence', 2, 604, 9)
        ], 'Ron'),
        minPriceTotalUsd: calculateTotalPrice([
          createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612, 8),
          createMaterial('Lv 8 Agricultural Planting Essence', 1, 609, 8),
          createMaterial('Lv 9 Combat Essence', 2, 604, 9)
        ], 'Usd'),
        totalRequireEnergy: calculateTotalRequireEnergy([
          createMaterial('Lv 8 Agricultural Livestock Essence', 1, 612, 8),
          createMaterial('Lv 8 Agricultural Planting Essence', 1, 609, 8),
          createMaterial('Lv 9 Combat Essence', 2, 604, 9)
        ])
      }
    }
  ]
};

export { itemsData };