import apiUrl from "./apiUrl";

const fetchDataEssen = async () => {
  const response = await fetch(`${apiUrl}/api/essence`, {
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
    minpriceRon: getMaterialPrice(name, "Ron"),
    minpriceUsd: getMaterialPrice(name, "Usd"),
    requireEnergy: calculateEnergyForMaterial(requireLevel) * quantity,
  };
}

function getMaterialPrice(name, currency) {
  const item = dataEssence.find((item) => item.name === name);
  return item ? item[`minPrice${currency}`] : "Not sale";
}

function calculateTotalPrice(materials, currency) {
  return materials
    .reduce((total, material) => {
      return (
        total + Number(material[`minprice${currency}`]) * material.quantity
      );
    }, 0)
    .toFixed(2);
}

function calculateTotalRequireEnergy(materials) {
  return materials
    .reduce((total, material) => {
      return total + Number(material[`requireEnergy`]);
    }, 0)
    .toFixed(2);
}

const itemsData = {
  combat: [
    {
      name: "Stone Sword",
      alias: "StoneSword",
      cdnImage: "https://icons.lumiterra.net/item-icon-40.png",
      requiresLevel: 1,
      stats: [
        {
          name: "combatatt",
          typeNumber: "integer",
          values: { min: 40, max: 122 },
        },
        //{ name: "combatcritrate",typeNumber: "percentage",  values: {min: 0, max:0 }}, Atributo con valores ramdons
        {
          name: "grassatt",
          typeNumber: "integer",
          values: { min: 20, max: 25 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 1 Agricultural Livestock Essence", 1, 213, 1),
            createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 1 Combat Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-738.png",
              quantity: 100,
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Stone Sword",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-40.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Stone Sword",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-40.png",
              price: { ron: null, usd: null },
            },
            createMaterial("Lv 1 Agricultural Livestock Essence", 1, 213, 1),
            createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial("Lv 1 Agricultural Livestock Essence", 1, 213, 1),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial("Lv 1 Agricultural Livestock Essence", 1, 213, 1),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
              ],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Iron Sword",
      alias: "IronSword",
      cdnImage: "https://icons.lumiterra.net/item-icon-41.png",
      requiresLevel: 2,
      stats: [
        {
          name: "combatatt",
          typeNumber: "integer",
          values: { min: 121, max: 203 },
        },
        //{ name: "combatcritrate",typeNumber: "percentage",  values: {min: 0, max:0 }}, Atributo con valores ramdons
        {
          name: "grassatt",
          typeNumber: "integer",
          values: { min: 20, max: 25 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 2 Agricultural Livestock Essence", 1, 214, 2),
            createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
            createMaterial("Lv 1 Gather Essence", 2, 207, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 2 Agricultural Livestock Essence",
                  1,
                  214,
                  2,
                ),
                createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
                createMaterial("Lv 1 Gather Essence", 2, 207, 1),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 2 Agricultural Livestock Essence",
                  1,
                  214,
                  2,
                ),
                createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
                createMaterial("Lv 1 Gather Essence", 2, 207, 1),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 2 Combat Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-739.png",
              quantity: 100,
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 2 Agricultural Livestock Essence",
                  1,
                  214,
                  2,
                ),
                createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
                createMaterial("Lv 1 Gather Essence", 2, 207, 1),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Iron Sword",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-41.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Iron Sword",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-41.png",
              price: { ron: null, usd: null },
            },
            createMaterial("Lv 1 Agricultural Livestock Essence", 1, 214, 2),
            createMaterial("Lv 1 Agricultural Planting Essence", 1, 211, 2),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial("Lv 1 Agricultural Livestock Essence", 1, 213, 1),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial("Lv 1 Agricultural Livestock Essence", 1, 213, 1),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
              ],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Crystal Sword",
      alias: "CrystalSword",
      cdnImage: "https://icons.lumiterra.net/item-icon-42.png",
      requiresLevel: 3,
      stats: [
        {
          name: "combatatt",
          typeNumber: "integer",
          values: { min: 202, max: 284 },
        },
        //{ name: "combatcritrate",typeNumber: "percentage",  values: {min: 0, max:0 }}, Atributo con valores ramdons
        {
          name: "grassatt",
          typeNumber: "integer",
          values: { min: 20, max: 25 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 3 Agricultural Livestock Essence", 1, 215, 3),
            createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
            createMaterial("Lv 2 Gather Essence", 2, 208, 2),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 3 Agricultural Livestock Essence",
                  1,
                  215,
                  3,
                ),
                createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
                createMaterial("Lv 2 Gather Essence", 2, 208, 2),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 3 Agricultural Livestock Essence",
                  1,
                  215,
                  3,
                ),
                createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
                createMaterial("Lv 2 Gather Essence", 2, 208, 2),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 3 Combat Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-740.png",
              quantity: 100,
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 3 Agricultural Livestock Essence",
                  1,
                  215,
                  3,
                ),
                createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
                createMaterial("Lv 2 Gather Essence", 2, 208, 2),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Crystal Sword",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-42.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Crystal Sword",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-42.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 2 Agricultural Livestock Essence", 1, 215, 3),
            createMaterial("Lv 2 Agricultural Planting Essence", 1, 212, 3),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 2 Agricultural Livestock Essence",
                  1,
                  215,
                  3,
                ),
                createMaterial("Lv 2 Agricultural Planting Essence", 1, 212, 3),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 2 Agricultural Livestock Essence",
                  1,
                  215,
                  3,
                ),
                createMaterial("Lv 2 Agricultural Planting Essence", 1, 212, 3),
              ],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Golden Sword",
      alias: "GoldenSword",
      cdnImage: "https://icons.lumiterra.net/item-icon-317.png",
      requiresLevel: 4,
      stats: [
        {
          name: "combatatt",
          typeNumber: "integer",
          values: { min: 283, max: 365 },
        },
        //{ name: "combatcritrate", typeNumber: "percentage", values: { min: 0, max: 0 }}, Atributo con valores aleatorios
        {
          name: "grassatt",
          typeNumber: "integer",
          values: { min: 20, max: 25 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 4 Agricultural Livestock Essence", 1, 410, 4),
            createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
            createMaterial("Lv 3 Gather Essence", 2, 209, 3),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 4 Agricultural Livestock Essence",
                  1,
                  410,
                  4,
                ),
                createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
                createMaterial("Lv 3 Gather Essence", 2, 209, 3),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 4 Agricultural Livestock Essence",
                  1,
                  410,
                  4,
                ),
                createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
                createMaterial("Lv 3 Gather Essence", 2, 209, 3),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 4 Combat Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-741.png",
              quantity: 100,
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 4 Agricultural Livestock Essence",
                  1,
                  410,
                  4,
                ),
                createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
                createMaterial("Lv 3 Gather Essence", 2, 209, 3),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Golden Sword",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-317.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Golden Sword",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-317.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 3 Agricultural Livestock Essence", 1, 410, 4),
            createMaterial("Lv 3 Agricultural Planting Essence", 1, 407, 4),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 3 Agricultural Livestock Essence",
                  1,
                  410,
                  4,
                ),
                createMaterial("Lv 3 Agricultural Planting Essence", 1, 407, 4),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 3 Agricultural Livestock Essence",
                  1,
                  410,
                  4,
                ),
                createMaterial("Lv 3 Agricultural Planting Essence", 1, 407, 4),
              ],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Diamond Sword",
      alias: "DiamondSword",
      cdnImage: "https://icons.lumiterra.net/item-icon-318.png",
      requiresLevel: 5,
      stats: [
        {
          name: "combatatt",
          typeNumber: "integer",
          values: { min: 364, max: 446 },
        },
        {
          name: "grassatt",
          typeNumber: "integer",
          values: { min: 20, max: 25 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 5 Agricultural Livestock Essence", 1, 411, 5),
            createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
            createMaterial("Lv 4 Gather Essence", 2, 404, 4),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 5 Agricultural Livestock Essence",
                  1,
                  411,
                  5,
                ),
                createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
                createMaterial("Lv 4 Gather Essence", 2, 404, 4),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 5 Agricultural Livestock Essence",
                  1,
                  411,
                  5,
                ),
                createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
                createMaterial("Lv 4 Gather Essence", 2, 404, 4),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 5 Combat Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-742.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 5 Agricultural Livestock Essence",
                  1,
                  411,
                  5,
                ),
                createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
                createMaterial("Lv 4 Gather Essence", 2, 404, 4),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Diamond Sword",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-318.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Diamond Sword",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-318.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 4 Agricultural Livestock Essence", 1, 411, 5),
            createMaterial("Lv 4 Agricultural Planting Essence", 1, 408, 5),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 4 Agricultural Livestock Essence",
                  1,
                  411,
                  5,
                ),
                createMaterial("Lv 4 Agricultural Planting Essence", 1, 408, 5),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 4 Agricultural Livestock Essence",
                  1,
                  411,
                  5,
                ),
                createMaterial("Lv 4 Agricultural Planting Essence", 1, 408, 5),
              ],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Star Sword",
      alias: "StarSword",
      cdnImage: "https://icons.lumiterra.net/item-icon-319.png",
      requiresLevel: 6,
      stats: [
        {
          name: "combatatt",
          typeNumber: "integer",
          values: { min: 445, max: 527 },
        },
        {
          name: "grassatt",
          typeNumber: "integer",
          values: { min: 20, max: 25 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 6 Agricultural Livestock Essence", 1, 412, 6),
            createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
            createMaterial("Lv 5 Gather Essence", 2, 405, 5),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 6 Agricultural Livestock Essence",
                  1,
                  412,
                  6,
                ),
                createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
                createMaterial("Lv 5 Gather Essence", 2, 405, 5),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 6 Agricultural Livestock Essence",
                  1,
                  412,
                  6,
                ),
                createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
                createMaterial("Lv 5 Gather Essence", 2, 405, 5),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 6 Combat Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-743.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 6 Agricultural Livestock Essence",
                  1,
                  412,
                  6,
                ),
                createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
                createMaterial("Lv 5 Gather Essence", 2, 405, 5),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Star Sword",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-319.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Star Sword",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-319.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 5 Agricultural Livestock Essence", 1, 412, 6),
            createMaterial("Lv 5 Agricultural Planting Essence", 1, 409, 6),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 5 Agricultural Livestock Essence",
                  1,
                  412,
                  6,
                ),
                createMaterial("Lv 5 Agricultural Planting Essence", 1, 409, 6),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 5 Agricultural Livestock Essence",
                  1,
                  412,
                  6,
                ),
                createMaterial("Lv 5 Agricultural Planting Essence", 1, 409, 6),
              ],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Lava Sword",
      alias: "LavaSword",
      cdnImage: "https://icons.lumiterra.net/item-icon-320.png",
      requiresLevel: 7,
      stats: [
        {
          name: "combatatt",
          typeNumber: "integer",
          values: { min: 526, max: 608 },
        },
        {
          name: "grassatt",
          typeNumber: "integer",
          values: { min: 20, max: 25 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 7 Agricultural Livestock Essence", 1, 413, 7),
            createMaterial("Lv 7 Agricultural Planting Essence", 1, 410, 7),
            createMaterial("Lv 6 Gather Essence", 2, 406, 6),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 7 Agricultural Livestock Essence",
                  1,
                  413,
                  7,
                ),
                createMaterial("Lv 7 Agricultural Planting Essence", 1, 410, 7),
                createMaterial("Lv 6 Gather Essence", 2, 406, 6),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 7 Agricultural Livestock Essence",
                  1,
                  413,
                  7,
                ),
                createMaterial("Lv 7 Agricultural Planting Essence", 1, 410, 7),
                createMaterial("Lv 6 Gather Essence", 2, 406, 6),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 7 Combat Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-744.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 7 Agricultural Livestock Essence",
                  1,
                  413,
                  7,
                ),
                createMaterial("Lv 7 Agricultural Planting Essence", 1, 410, 7),
                createMaterial("Lv 6 Gather Essence", 2, 406, 6),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Lava Sword",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-320.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Lava Sword",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-320.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 6 Agricultural Livestock Essence", 1, 413, 7),
            createMaterial("Lv 6 Agricultural Planting Essence", 1, 410, 7),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 6 Agricultural Livestock Essence",
                  1,
                  413,
                  7,
                ),
                createMaterial("Lv 6 Agricultural Planting Essence", 1, 410, 7),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 6 Agricultural Livestock Essence",
                  1,
                  413,
                  7,
                ),
                createMaterial("Lv 6 Agricultural Planting Essence", 1, 410, 7),
              ],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Hollow Sword",
      alias: "HollowSword",
      cdnImage: "https://icons.lumiterra.net/item-icon-551.png",
      requiresLevel: 8,
      stats: [
        {
          name: "combatatt",
          typeNumber: "integer",
          values: { min: 607, max: 689 },
        },
        {
          name: "grassatt",
          typeNumber: "integer",
          values: { min: 20, max: 25 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 8 Agricultural Livestock Essence", 1, 612, 8),
            createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
            createMaterial("Lv 7 Gather Essence", 2, 406, 7),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 8 Agricultural Livestock Essence",
                  1,
                  612,
                  8,
                ),
                createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
                createMaterial("Lv 7 Gather Essence", 2, 406, 7),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 8 Agricultural Livestock Essence",
                  1,
                  612,
                  8,
                ),
                createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
                createMaterial("Lv 7 Gather Essence", 2, 406, 7),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 8 Combat Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-745.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 8 Agricultural Livestock Essence",
                  1,
                  612,
                  8,
                ),
                createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
                createMaterial("Lv 7 Gather Essence", 2, 406, 7),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Hollow Sword",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-551.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Hollow Sword",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-551.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 7 Agricultural Livestock Essence", 1, 406, 7),
            createMaterial("Lv 7 Agricultural Planting Essence", 1, 409, 7),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 7 Agricultural Livestock Essence",
                  1,
                  406,
                  7,
                ),
                createMaterial("Lv 7 Agricultural Planting Essence", 1, 409, 7),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 7 Agricultural Livestock Essence",
                  1,
                  406,
                  7,
                ),
                createMaterial("Lv 7 Agricultural Planting Essence", 1, 409, 7),
              ],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Bronze Sword",
      alias: "BronzeSword",
      cdnImage: "https://icons.lumiterra.net/item-icon-575.png",
      requiresLevel: 9,
      stats: [
        {
          name: "combatatt",
          typeNumber: "integer",
          values: { min: 688, max: 753 },
        },
        {
          name: "grassatt",
          typeNumber: "integer",
          values: { min: 20, max: 25 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 9 Agricultural Livestock Essence", 1, 613, 9),
            createMaterial("Lv 9 Agricultural Planting Essence", 1, 610, 9),
            createMaterial("Lv 8 Gather Essence", 2, 606, 8),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 9 Agricultural Livestock Essence",
                  1,
                  613,
                  9,
                ),
                createMaterial("Lv 9 Agricultural Planting Essence", 1, 610, 9),
                createMaterial("Lv 8 Gather Essence", 2, 606, 8),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 9 Agricultural Livestock Essence",
                  1,
                  613,
                  9,
                ),
                createMaterial("Lv 9 Agricultural Planting Essence", 1, 610, 9),
                createMaterial("Lv 8 Gather Essence", 2, 606, 8),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 9 Combat Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-746.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 9 Agricultural Livestock Essence",
                  1,
                  613,
                  9,
                ),
                createMaterial("Lv 9 Agricultural Planting Essence", 1, 610, 9),
                createMaterial("Lv 8 Gather Essence", 2, 606, 8),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Bronze Sword",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-575.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Bronze Sword",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-575.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 8 Agricultural Livestock Essence", 1, 406, 8),
            createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 8 Agricultural Livestock Essence",
                  1,
                  406,
                  8,
                ),
                createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 8 Agricultural Livestock Essence",
                  1,
                  406,
                  8,
                ),
                createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
              ],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Stone Bow",
      alias: "StoneBow",
      cdnImage: "https://icons.lumiterra.net/item-icon-287.png",
      requiresLevel: 1,
      stats: [
        {
          name: "combatatt",
          typeNumber: "integer",
          values: { min: 40, max: 122 },
        },
        {
          name: "Combathit",
          typeNumber: "integer",
          values: { min: 0, max: 5 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 1 Agricultural Livestock Essence", 1, 213, 1),
            createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 1 Combat Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-738.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Stone Bow",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-287.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Stone Bow",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-287.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 1 Agricultural Livestock Essence", 1, 213, 1),
            createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
              ],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Metal Bow",
      alias: "MetalBow",
      cdnImage: "https://icons.lumiterra.net/item-icon-288.png",
      requiresLevel: 2,
      stats: [
        {
          name: "combatatt",
          typeNumber: "integer",
          values: { min: 121, max: 203 },
        },
        {
          name: "Combathit",
          typeNumber: "integer",
          values: { min: 5, max: 10 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 2 Agricultural Livestock Essence", 1, 214, 2),
            createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
            createMaterial("Lv 1 Gather Essence", 2, 207, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 2 Agricultural Livestock Essence",
                  1,
                  214,
                  2,
                ),
                createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
                createMaterial("Lv 1 Gather Essence", 2, 207, 1),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 2 Agricultural Livestock Essence",
                  1,
                  214,
                  2,
                ),
                createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
                createMaterial("Lv 1 Gather Essence", 2, 207, 1),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 2 Combat Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-739.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 2 Agricultural Livestock Essence",
                  1,
                  214,
                  2,
                ),
                createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
                createMaterial("Lv 1 Gather Essence", 2, 207, 1),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Metal Bow",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-288.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Metal Bow",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-288.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 1 Agricultural Livestock Essence", 1, 213, 1),
            createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
              ],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Crystal Bow",
      alias: "CrystalBow",
      cdnImage: "https://icons.lumiterra.net/item-icon-289.png",
      requiresLevel: 3,
      stats: [
        {
          name: "combatatt",
          typeNumber: "integer",
          values: { min: 202, max: 284 },
        },
        {
          name: "Combathit",
          typeNumber: "integer",
          values: { min: 10, max: 15 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 3 Agricultural Livestock Essence", 1, 215, 3),
            createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
            createMaterial("Lv 2 Gather Essence", 2, 208, 2),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 3 Agricultural Livestock Essence",
                  1,
                  215,
                  3,
                ),
                createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
                createMaterial("Lv 2 Gather Essence", 2, 208, 2),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 3 Agricultural Livestock Essence",
                  1,
                  215,
                  3,
                ),
                createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
                createMaterial("Lv 2 Gather Essence", 2, 208, 2),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 3 Combat Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-740.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 3 Agricultural Livestock Essence",
                  1,
                  215,
                  3,
                ),
                createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
                createMaterial("Lv 2 Gather Essence", 2, 208, 2),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Crystal Bow",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-289.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Crystal Bow",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-289.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 2 Agricultural Livestock Essence", 1, 214, 2),
            createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 2 Agricultural Livestock Essence",
                  1,
                  214,
                  2,
                ),
                createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 2 Agricultural Livestock Essence",
                  1,
                  214,
                  2,
                ),
                createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
              ],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Golden Bow",
      alias: "GoldenBow",
      cdnImage: "https://icons.lumiterra.net/item-icon-450.png",
      requiresLevel: 4,
      stats: [
        {
          name: "combatatt",
          typeNumber: "integer",
          values: { min: 283, max: 365 },
        },
        {
          name: "Combathit",
          typeNumber: "integer",
          values: { min: 15, max: 20 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 4 Agricultural Livestock Essence", 1, 410, 4),
            createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
            createMaterial("Lv 3 Gather Essence", 2, 209, 3),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 4 Agricultural Livestock Essence",
                  1,
                  410,
                  4,
                ),
                createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
                createMaterial("Lv 3 Gather Essence", 2, 209, 3),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 4 Agricultural Livestock Essence",
                  1,
                  410,
                  4,
                ),
                createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
                createMaterial("Lv 3 Gather Essence", 2, 209, 3),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 4 Combat Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-741.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 4 Agricultural Livestock Essence",
                  1,
                  410,
                  4,
                ),
                createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
                createMaterial("Lv 3 Gather Essence", 2, 209, 3),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Golden Bow",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-450.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Golden Bow",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-450.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 3 Agricultural Livestock Essence", 1, 215, 3),
            createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 3 Agricultural Livestock Essence",
                  1,
                  215,
                  3,
                ),
                createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 3 Agricultural Livestock Essence",
                  1,
                  215,
                  3,
                ),
                createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
              ],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Diamond Bow",
      alias: "DiamondBow",
      cdnImage: "https://icons.lumiterra.net/item-icon-451.png",
      requiresLevel: 5,
      stats: [
        {
          name: "combatatt",
          typeNumber: "integer",
          values: { min: 364, max: 446 },
        },
        {
          name: "Combathit",
          typeNumber: "integer",
          values: { min: 20, max: 25 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 5 Agricultural Livestock Essence", 1, 411, 5),
            createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
            createMaterial("Lv 4 Gather Essence", 2, 404, 4),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 5 Agricultural Livestock Essence",
                  1,
                  411,
                  5,
                ),
                createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
                createMaterial("Lv 4 Gather Essence", 2, 404, 4),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 5 Agricultural Livestock Essence",
                  1,
                  411,
                  5,
                ),
                createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
                createMaterial("Lv 4 Gather Essence", 2, 404, 4),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 5 Combat Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-742.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 5 Agricultural Livestock Essence",
                  1,
                  411,
                  5,
                ),
                createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
                createMaterial("Lv 4 Gather Essence", 2, 404, 4),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Diamond Bow",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-451.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Diamond Bow",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-451.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 4 Agricultural Livestock Essence", 1, 410, 4),
            createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 4 Agricultural Livestock Essence",
                  1,
                  410,
                  4,
                ),
                createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 4 Agricultural Livestock Essence",
                  1,
                  410,
                  4,
                ),
                createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
              ],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Starlight Bow",
      alias: "StarlightBow",
      cdnImage: "https://icons.lumiterra.net/item-icon-452.png",
      requiresLevel: 6,
      stats: [
        {
          name: "combatatt",
          typeNumber: "integer",
          values: { min: 445, max: 527 },
        },
        //{ name: "combatcritrate",typeNumber: "percentage",  values: {min: 0, max:0 }}, Atributo con valores ramdons
        {
          name: "Combathit",
          typeNumber: "integer",
          values: { min: 25, max: 30 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 6 Agricultural Livestock Essence", 1, 412, 6),
            createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
            createMaterial("Lv 5 Gather Essence", 2, 405, 5),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 6 Agricultural Livestock Essence",
                  1,
                  412,
                  6,
                ),
                createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
                createMaterial("Lv 5 Gather Essence", 2, 405, 5),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 6 Agricultural Livestock Essence",
                  1,
                  412,
                  6,
                ),
                createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
                createMaterial("Lv 5 Gather Essence", 2, 405, 5),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 6 Combat Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-743.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 6 Agricultural Livestock Essence",
                  1,
                  412,
                  6,
                ),
                createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
                createMaterial("Lv 5 Gather Essence", 2, 405, 5),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Diamond Bow",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-451.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Diamond Bow",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-451.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 5 Agricultural Livestock Essence", 1, 411, 5),
            createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 5 Agricultural Livestock Essence",
                  1,
                  411,
                  5,
                ),
                createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 5 Agricultural Livestock Essence",
                  1,
                  411,
                  5,
                ),
                createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
              ],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Lava Bow",
      alias: "LavaBow",
      cdnImage: "https://icons.lumiterra.net/item-icon-529.png",
      requiresLevel: 7,
      stats: [
        {
          name: "combatatt",
          typeNumber: "integer",
          values: { min: 526, max: 608 },
        },
        //{ name: "combatcritrate",typeNumber: "percentage",  values: {min: 0, max:0 }}, Atributo con valores ramdons
        {
          name: "Combathit",
          typeNumber: "integer",
          values: { min: 30, max: 35 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 7 Agricultural Livestock Essence", 1, 611, 7),
            createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
            createMaterial("Lv 6 Gather Essence", 2, 406, 6),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 7 Agricultural Livestock Essence",
                  1,
                  611,
                  7,
                ),
                createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
                createMaterial("Lv 6 Gather Essence", 2, 406, 6),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 7 Agricultural Livestock Essence",
                  1,
                  611,
                  7,
                ),
                createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
                createMaterial("Lv 6 Gather Essence", 2, 406, 6),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 7 Combat Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-744.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 7 Agricultural Livestock Essence",
                  1,
                  611,
                  7,
                ),
                createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
                createMaterial("Lv 6 Gather Essence", 2, 406, 6),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Lava Bow",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-529.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Lava Bow",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-529.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 6 Agricultural Livestock Essence", 1, 412, 6),
            createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 6 Agricultural Livestock Essence",
                  1,
                  412,
                  6,
                ),
                createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 6 Agricultural Livestock Essence",
                  1,
                  412,
                  6,
                ),
                createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
              ],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Hollow Bow",
      alias: "HollowBow",
      cdnImage: "https://icons.lumiterra.net/item-icon-553.png",
      requiresLevel: 8,
      stats: [
        {
          name: "combatatt",
          typeNumber: "integer",
          values: { min: 607, max: 689 },
        },
        //{ name: "combatcritrate",typeNumber: "percentage",  values: {min: 0, max:0 }}, Atributo con valores ramdons
        {
          name: "Combathit",
          typeNumber: "integer",
          values: { min: 35, max: 40 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 8 Agricultural Livestock Essence", 1, 612, 8),
            createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
            createMaterial("Lv 7 Gather Essence", 2, 406, 7),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 8 Agricultural Livestock Essence",
                  1,
                  612,
                  8,
                ),
                createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
                createMaterial("Lv 7 Gather Essence", 2, 406, 7),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 8 Agricultural Livestock Essence",
                  1,
                  612,
                  8,
                ),
                createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
                createMaterial("Lv 7 Gather Essence", 2, 406, 7),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 8 Combat Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-745.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 8 Agricultural Livestock Essence",
                  1,
                  612,
                  8,
                ),
                createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
                createMaterial("Lv 7 Gather Essence", 2, 406, 7),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Hollow Bow",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-553.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Hollow Bow",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-553.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 7 Agricultural Livestock Essence", 1, 611, 7),
            createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 7 Agricultural Livestock Essence",
                  1,
                  611,
                  7,
                ),
                createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 7 Agricultural Livestock Essence",
                  1,
                  611,
                  7,
                ),
                createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
              ],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Copper Hammer",
      alias: "CopperHammer",
      cdnImage: "https://icons.lumiterra.net/item-icon-441.png",
      requiresLevel: 1,
      stats: [
        {
          name: "combatatt",
          typeNumber: "integer",
          values: { min: 40, max: 122 },
        },
        //{ name: "combatcritrate",typeNumber: "percentage",  values: {min: 0, max:0 }}, Atributo con valores ramdons
        {
          name: "Combathit",
          typeNumber: "integer",
          values: { min: 0, max: 5 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 1 Agricultural Livestock Essence", 1, 213, 1),
            createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 1 Combat Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-738.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Copper Hammer",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-441.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Copper Hammer",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-441.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 1 Agricultural Livestock Essence", 1, 213, 1),
            createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
              ],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Iron Hammer",
      alias: "IronHammer",
      cdnImage: "https://icons.lumiterra.net/item-icon-442.png",
      requiresLevel: 2,
      stats: [
        {
          name: "combatatt",
          typeNumber: "integer",
          values: { min: 121, max: 203 },
        },
        //{ name: "combatcritrate",typeNumber: "percentage",  values: {min: 0, max:0 }}, Atributo con valores ramdons
        {
          name: "Combathit",
          typeNumber: "integer",
          values: { min: 5, max: 10 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 2 Agricultural Livestock Essence", 1, 214, 2),
            createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
            createMaterial("Lv 1 Gather Essence", 2, 207, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 2 Agricultural Livestock Essence",
                  1,
                  214,
                  2,
                ),
                createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
                createMaterial("Lv 1 Gather Essence", 2, 207, 1),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 2 Agricultural Livestock Essence",
                  1,
                  214,
                  2,
                ),
                createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
                createMaterial("Lv 1 Gather Essence", 2, 207, 1),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 2 Combat Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-739.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 2 Agricultural Livestock Essence",
                  1,
                  214,
                  2,
                ),
                createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
                createMaterial("Lv 1 Gather Essence", 2, 207, 1),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Iron Hammer",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-442.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Iron Hammer",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-442.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 1 Agricultural Livestock Essence", 1, 213, 1),
            createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
              ],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Crystal Hammer",
      alias: "CrystalHammer",
      cdnImage: "https://icons.lumiterra.net/item-icon-443.png",
      requiresLevel: 3,
      stats: [
        {
          name: "combatatt",
          typeNumber: "integer",
          values: { min: 202, max: 284 },
        },
        //{ name: "combatcritrate",typeNumber: "percentage",  values: {min: 0, max:0 }}, Atributo con valores ramdons
        {
          name: "Combathit",
          typeNumber: "integer",
          values: { min: 10, max: 15 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 3 Agricultural Livestock Essence", 1, 215, 3),
            createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
            createMaterial("Lv 2 Gather Essence", 2, 208, 2),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 3 Agricultural Livestock Essence",
                  1,
                  215,
                  3,
                ),
                createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
                createMaterial("Lv 2 Gather Essence", 2, 208, 2),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 3 Agricultural Livestock Essence",
                  1,
                  215,
                  3,
                ),
                createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
                createMaterial("Lv 2 Gather Essence", 2, 208, 2),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 3 Combat Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-740.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 3 Agricultural Livestock Essence",
                  1,
                  215,
                  3,
                ),
                createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
                createMaterial("Lv 2 Gather Essence", 2, 208, 2),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Crystal Hammer",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-443.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Crystal Hammer",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-443.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 2 Agricultural Livestock Essence", 1, 214, 2),
            createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 2 Agricultural Livestock Essence",
                  1,
                  214,
                  2,
                ),
                createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 2 Agricultural Livestock Essence",
                  1,
                  214,
                  2,
                ),
                createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
              ],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Golden Hammer",
      alias: "GoldenHammer",
      cdnImage: "https://icons.lumiterra.net/item-icon-444.png",
      requiresLevel: 4,
      stats: [
        {
          name: "combatatt",
          typeNumber: "integer",
          values: { min: 283, max: 365 },
        },
        //{ name: "combatcritrate",typeNumber: "percentage",  values: {min: 0, max:0 }}, Atributo con valores ramdons
        {
          name: "Combathit",
          typeNumber: "integer",
          values: { min: 15, max: 20 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 4 Agricultural Livestock Essence", 1, 410, 4),
            createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
            createMaterial("Lv 3 Gather Essence", 2, 209, 3),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 4 Agricultural Livestock Essence",
                  1,
                  410,
                  4,
                ),
                createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
                createMaterial("Lv 3 Gather Essence", 2, 209, 3),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 4 Agricultural Livestock Essence",
                  1,
                  410,
                  4,
                ),
                createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
                createMaterial("Lv 3 Gather Essence", 2, 209, 3),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 4 Combat Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-741.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 4 Agricultural Livestock Essence",
                  1,
                  410,
                  4,
                ),
                createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
                createMaterial("Lv 3 Gather Essence", 2, 209, 3),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Golden Hammer",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-444.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Golden Hammer",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-444.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 3 Agricultural Livestock Essence", 1, 215, 3),
            createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 3 Agricultural Livestock Essence",
                  1,
                  215,
                  3,
                ),
                createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 3 Agricultural Livestock Essence",
                  1,
                  215,
                  3,
                ),
                createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
              ],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Diamond Hammer",
      alias: "DiamondHammer",
      cdnImage: "https://icons.lumiterra.net/item-icon-445.png",
      requiresLevel: 5,
      stats: [
        {
          name: "combatatt",
          typeNumber: "integer",
          values: { min: 364, max: 446 },
        },
        {
          name: "Combathit",
          typeNumber: "integer",
          values: { min: 20, max: 25 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 5 Agricultural Livestock Essence", 1, 411, 5),
            createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
            createMaterial("Lv 4 Gather Essence", 2, 404, 4),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 5 Agricultural Livestock Essence",
                  1,
                  411,
                  5,
                ),
                createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
                createMaterial("Lv 4 Gather Essence", 2, 404, 4),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 5 Agricultural Livestock Essence",
                  1,
                  411,
                  5,
                ),
                createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
                createMaterial("Lv 4 Gather Essence", 2, 404, 4),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 5 Combat Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-742.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 5 Agricultural Livestock Essence",
                  1,
                  411,
                  5,
                ),
                createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
                createMaterial("Lv 4 Gather Essence", 2, 404, 4),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Diamond Hammer",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-445.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Diamond Hammer",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-445.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 4 Agricultural Livestock Essence", 1, 410, 4),
            createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 4 Agricultural Livestock Essence",
                  1,
                  410,
                  4,
                ),
                createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 4 Agricultural Livestock Essence",
                  1,
                  410,
                  4,
                ),
                createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
              ],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Starlight Hammer",
      alias: "StarlightHammer",
      cdnImage: "https://icons.lumiterra.net/item-icon-446.png",
      requiresLevel: 6,
      stats: [
        {
          name: "combatatt",
          typeNumber: "integer",
          values: { min: 445, max: 527 },
        },
        //{ name: "combatcritrate",typeNumber: "percentage",  values: {min: 0, max:0 }}, Atributo con valores ramdons
        {
          name: "Combathit",
          typeNumber: "integer",
          values: { min: 25, max: 30 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 6 Agricultural Livestock Essence", 1, 412, 6),
            createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
            createMaterial("Lv 5 Gather Essence", 2, 405, 5),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 6 Agricultural Livestock Essence",
                  1,
                  412,
                  6,
                ),
                createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
                createMaterial("Lv 5 Gather Essence", 2, 405, 5),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 6 Agricultural Livestock Essence",
                  1,
                  412,
                  6,
                ),
                createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
                createMaterial("Lv 5 Gather Essence", 2, 405, 5),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 6 Combat Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-743.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 6 Agricultural Livestock Essence",
                  1,
                  412,
                  6,
                ),
                createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
                createMaterial("Lv 5 Gather Essence", 2, 405, 5),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Diamond Hammer",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-446.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Diamond Hammer",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-446.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 5 Agricultural Livestock Essence", 1, 411, 5),
            createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 5 Agricultural Livestock Essence",
                  1,
                  411,
                  5,
                ),
                createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 5 Agricultural Livestock Essence",
                  1,
                  411,
                  5,
                ),
                createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
              ],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Lava Hammer",
      alias: "LavaHammer",
      cdnImage: "https://icons.lumiterra.net/item-icon-528.png",
      requiresLevel: 7,
      stats: [
        {
          name: "combatatt",
          typeNumber: "integer",
          values: { min: 526, max: 608 },
        },
        //{ name: "combatcritrate",typeNumber: "percentage",  values: {min: 0, max:0 }}, Atributo con valores ramdons
        {
          name: "Combathit",
          typeNumber: "integer",
          values: { min: 30, max: 35 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 7 Agricultural Livestock Essence", 1, 611, 7),
            createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
            createMaterial("Lv 6 Gather Essence", 2, 406, 6),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 7 Agricultural Livestock Essence",
                  1,
                  611,
                  7,
                ),
                createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
                createMaterial("Lv 6 Gather Essence", 2, 406, 6),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 7 Agricultural Livestock Essence",
                  1,
                  611,
                  7,
                ),
                createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
                createMaterial("Lv 6 Gather Essence", 2, 406, 6),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 7 Combat Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-744.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 7 Agricultural Livestock Essence",
                  1,
                  611,
                  7,
                ),
                createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
                createMaterial("Lv 6 Gather Essence", 2, 406, 6),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Lava Hammer",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-528.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Lava Hammer",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-528.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 6 Agricultural Livestock Essence", 1, 412, 6),
            createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 6 Agricultural Livestock Essence",
                  1,
                  412,
                  6,
                ),
                createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 6 Agricultural Livestock Essence",
                  1,
                  412,
                  6,
                ),
                createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
              ],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Hollow Hammer",
      alias: "HollowHammer",
      cdnImage: "https://icons.lumiterra.net/item-icon-552.png",
      requiresLevel: 8,
      stats: [
        {
          name: "combatatt",
          typeNumber: "integer",
          values: { min: 607, max: 689 },
        },
        //{ name: "combatcritrate",typeNumber: "percentage",  values: {min: 0, max:0 }}, Atributo con valores ramdons
        {
          name: "Combathit",
          typeNumber: "integer",
          values: { min: 35, max: 40 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 8 Agricultural Livestock Essence", 1, 612, 8),
            createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
            createMaterial("Lv 7 Gather Essence", 2, 406, 7),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 8 Agricultural Livestock Essence",
                  1,
                  612,
                  8,
                ),
                createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
                createMaterial("Lv 7 Gather Essence", 2, 406, 7),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 8 Agricultural Livestock Essence",
                  1,
                  612,
                  8,
                ),
                createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
                createMaterial("Lv 7 Gather Essence", 2, 406, 7),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 8 Combat Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-745.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 8 Agricultural Livestock Essence",
                  1,
                  612,
                  8,
                ),
                createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
                createMaterial("Lv 7 Gather Essence", 2, 406, 7),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Hollow Hammer",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-552.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Hollow Hammer",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-552.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 7 Agricultural Livestock Essence", 1, 611, 7),
            createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 7 Agricultural Livestock Essence",
                  1,
                  611,
                  7,
                ),
                createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 7 Agricultural Livestock Essence",
                  1,
                  611,
                  7,
                ),
                createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
              ],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Bronze Hammer",
      alias: "BronzeHammer",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-576.png",
      requiresLevel: 9,
      stats: [
        {
          name: "combatatt",
          typeNumber: "integer",
          values: { min: 688, max: 753 },
        },
        //{ name: "combatcritrate",typeNumber: "percentage",  values: {min: 0, max:0 }}, Atributo con valores ramdons
        {
          name: "Combathit",
          typeNumber: "integer",
          values: { min: 40, max: 45 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 9 Agricultural Livestock Essence", 1, 613, 9),
            createMaterial("Lv 9 Agricultural Planting Essence", 1, 610, 9),
            createMaterial("Lv 8 Gather Essence", 2, 606, 8),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 9 Agricultural Livestock Essence",
                  1,
                  613,
                  9,
                ),
                createMaterial("Lv 9 Agricultural Planting Essence", 1, 610, 9),
                createMaterial("Lv 8 Gather Essence", 2, 606, 8),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 9 Agricultural Livestock Essence",
                  1,
                  613,
                  9,
                ),
                createMaterial("Lv 9 Agricultural Planting Essence", 1, 610, 9),
                createMaterial("Lv 8 Gather Essence", 2, 606, 8),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 9 Combat Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-746.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 9 Agricultural Livestock Essence",
                  1,
                  613,
                  9,
                ),
                createMaterial("Lv 9 Agricultural Planting Essence", 1, 610, 9),
                createMaterial("Lv 8 Gather Essence", 2, 606, 8),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Bronze Hammer",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-576.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Bronze Hammer",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-576.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 8 Agricultural Livestock Essence", 1, 612, 8),
            createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 8 Agricultural Livestock Essence",
                  1,
                  612,
                  8,
                ),
                createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 8 Agricultural Livestock Essence",
                  1,
                  612,
                  8,
                ),
                createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
              ],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Cracked Crystal Grass Shoes",
      alias: "CrackedCrystalGrassShoes",
      cdnImage: "https://icons.lumiterra.net/item-icon-55.png",
      requiresLevel: 1,
      stats: [
        {
          name: "Combatdef",
          typeNumber: "integer",
          values: { min: 9, max: 27 },
        },
        { name: "Movespd", typeNumber: "integer", values: { min: 5, max: 10 } },
        { name: "Maxhp", typeNumber: "integer", values: { min: 36, max: 110 } },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 1 Agricultural Livestock Essence", 1, 213, 1),
            createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 1 Combat Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-738.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Cracked Crystal Grass Shoes",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-55.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Cracked Crystal Grass Shoes",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-55.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 1 Agricultural Livestock Essence", 1, 213, 1),
            createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
              ],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Crystal Skin Boots",
      alias: "CrystalSkinBoots",
      cdnImage: "https://icons.lumiterra.net/item-icon-56.png",
      requiresLevel: 2,
      stats: [
        {
          name: "Combatdef",
          typeNumber: "integer",
          values: { min: 28, max: 46 },
        },
        {
          name: "Movespd",
          typeNumber: "integer",
          values: { min: 15, max: 20 },
        },
        {
          name: "Maxhp",
          typeNumber: "integer",
          values: { min: 105, max: 179 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 2 Agricultural Livestock Essence", 1, 214, 2),
            createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
            createMaterial("Lv 1 Gather Essence", 2, 207, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 2 Agricultural Livestock Essence",
                  1,
                  214,
                  2,
                ),
                createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
                createMaterial("Lv 1 Gather Essence", 2, 207, 1),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 2 Agricultural Livestock Essence",
                  1,
                  214,
                  2,
                ),
                createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
                createMaterial("Lv 1 Gather Essence", 2, 207, 1),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 2 Combat Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-739.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 2 Agricultural Livestock Essence",
                  1,
                  214,
                  2,
                ),
                createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
                createMaterial("Lv 1 Gather Essence", 2, 207, 1),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Crystal Skin Boots",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-56.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Crystal Skin Boots",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-56.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 1 Agricultural Livestock Essence", 1, 213, 1),
            createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
              ],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Crystal Stone Shoes",
      alias: "CrystalStoneShoes",
      cdnImage: "https://icons.lumiterra.net/item-icon-57.png",
      requiresLevel: 3,
      stats: [
        {
          name: "Combatdef",
          typeNumber: "integer",
          values: { min: 46, max: 64 },
        },
        {
          name: "Movespd",
          typeNumber: "integer",
          values: { min: 30, max: 35 },
        },
        {
          name: "Maxhp",
          typeNumber: "integer",
          values: { min: 175, max: 249 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 3 Agricultural Livestock Essence", 1, 215, 3),
            createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
            createMaterial("Lv 2 Gather Essence", 2, 208, 2),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 3 Agricultural Livestock Essence",
                  1,
                  215,
                  3,
                ),
                createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
                createMaterial("Lv 2 Gather Essence", 2, 208, 2),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 3 Agricultural Livestock Essence",
                  1,
                  215,
                  3,
                ),
                createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
                createMaterial("Lv 2 Gather Essence", 2, 208, 2),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 3 Combat Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-740.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 3 Agricultural Livestock Essence",
                  1,
                  215,
                  3,
                ),
                createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
                createMaterial("Lv 2 Gather Essence", 2, 208, 2),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Crystal Stone Shoes",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-57.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Crystal Stone Shoes",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-57.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 2 Agricultural Livestock Essence", 1, 214, 2),
            createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 2 Agricultural Livestock Essence",
                  1,
                  214,
                  2,
                ),
                createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 2 Agricultural Livestock Essence",
                  1,
                  214,
                  2,
                ),
                createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
              ],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Golden Fighter Shoes",
      alias: "GoldenFighterShoes",
      cdnImage: "https://icons.lumiterra.net/item-icon-339.png",
      requiresLevel: 4,
      stats: [
        {
          name: "Combatdef",
          typeNumber: "integer",
          values: { min: 64, max: 82 },
        },
        {
          name: "Movespd",
          typeNumber: "integer",
          values: { min: 40, max: 64 },
        },
        {
          name: "Maxhp",
          typeNumber: "integer",
          values: { min: 244, max: 318 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 4 Agricultural Livestock Essence", 1, 410, 4),
            createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
            createMaterial("Lv 3 Gather Essence", 2, 209, 3),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 4 Agricultural Livestock Essence",
                  1,
                  410,
                  4,
                ),
                createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
                createMaterial("Lv 3 Gather Essence", 2, 209, 3),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 4 Agricultural Livestock Essence",
                  1,
                  410,
                  4,
                ),
                createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
                createMaterial("Lv 3 Gather Essence", 2, 209, 3),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 4 Combat Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-741.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 4 Agricultural Livestock Essence",
                  1,
                  410,
                  4,
                ),
                createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
                createMaterial("Lv 3 Gather Essence", 2, 209, 3),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Golden Fighter Shoes",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-339.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Golden Fighter Shoes",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-339.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 3 Agricultural Livestock Essence", 1, 215, 3),
            createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 3 Agricultural Livestock Essence",
                  1,
                  215,
                  3,
                ),
                createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 3 Agricultural Livestock Essence",
                  1,
                  215,
                  3,
                ),
                createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
              ],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Diamond Fighter Shoes",
      alias: "DiamondFighterShoes",
      cdnImage: "https://icons.lumiterra.net/item-icon-344.png",
      requiresLevel: 5,
      stats: [
        {
          name: "Combatdef",
          typeNumber: "integer",
          values: { min: 83, max: 97 },
        },
        {
          name: "Movespd",
          typeNumber: "integer",
          values: { min: 45, max: 65 },
        },
        {
          name: "Maxhp",
          typeNumber: "integer",
          values: { min: 311, max: 385 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 5 Agricultural Livestock Essence", 1, 411, 5),
            createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
            createMaterial("Lv 4 Gather Essence", 2, 404, 4),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 5 Agricultural Livestock Essence",
                  1,
                  411,
                  5,
                ),
                createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
                createMaterial("Lv 4 Gather Essence", 2, 404, 4),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 5 Agricultural Livestock Essence",
                  1,
                  411,
                  5,
                ),
                createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
                createMaterial("Lv 4 Gather Essence", 2, 404, 4),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 5 Combat Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-742.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 5 Agricultural Livestock Essence",
                  1,
                  411,
                  5,
                ),
                createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
                createMaterial("Lv 4 Gather Essence", 2, 404, 4),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Diamond Fighter Shoes",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-344.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Diamond Fighter Shoes",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-344.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 4 Agricultural Livestock Essence", 1, 410, 4),
            createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 4 Agricultural Livestock Essence",
                  1,
                  410,
                  4,
                ),
                createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 4 Agricultural Livestock Essence",
                  1,
                  410,
                  4,
                ),
                createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
              ],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Star Fighter Shoes",
      alias: "StarFighterShoes",
      cdnImage: "https://icons.lumiterra.net/item-icon-349.png",
      requiresLevel: 6,
      stats: [
        {
          name: "Combatdef",
          typeNumber: "integer",
          values: { min: 101, max: 119 },
        },
        {
          name: "Movespd",
          typeNumber: "integer",
          values: { min: 50, max: 66 },
        },
        {
          name: "Maxhp",
          typeNumber: "integer",
          values: { min: 380, max: 454 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 6 Agricultural Livestock Essence", 1, 412, 6),
            createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
            createMaterial("Lv 5 Gather Essence", 2, 405, 5),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 6 Agricultural Livestock Essence",
                  1,
                  412,
                  6,
                ),
                createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
                createMaterial("Lv 5 Gather Essence", 2, 405, 5),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 6 Agricultural Livestock Essence",
                  1,
                  412,
                  6,
                ),
                createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
                createMaterial("Lv 5 Gather Essence", 2, 405, 5),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 6 Combat Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-743.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 6 Agricultural Livestock Essence",
                  1,
                  412,
                  6,
                ),
                createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
                createMaterial("Lv 5 Gather Essence", 2, 405, 5),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Star Fighter Shoes",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-349.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Star Fighter Shoes",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-349.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 5 Agricultural Livestock Essence", 1, 411, 5),
            createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 5 Agricultural Livestock Essence",
                  1,
                  411,
                  5,
                ),
                createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 5 Agricultural Livestock Essence",
                  1,
                  411,
                  5,
                ),
                createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
              ],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Lava Combat Shoes",
      alias: "LavaCombatShoes",
      cdnImage: "https://icons.lumiterra.net/item-icon-534.png",
      requiresLevel: 7,
      stats: [
        {
          name: "Combatdef",
          typeNumber: "integer",
          values: { min: 120, max: 138 },
        },
        {
          name: "Movespd",
          typeNumber: "integer",
          values: { min: 55, max: 67 },
        },
        {
          name: "Maxhp",
          typeNumber: "integer",
          values: { min: 447, max: 521 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 7 Agricultural Livestock Essence", 1, 611, 7),
            createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
            createMaterial("Lv 6 Gather Essence", 2, 406, 6),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 7 Agricultural Livestock Essence",
                  1,
                  611,
                  7,
                ),
                createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
                createMaterial("Lv 6 Gather Essence", 2, 406, 6),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 7 Agricultural Livestock Essence",
                  1,
                  611,
                  7,
                ),
                createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
                createMaterial("Lv 6 Gather Essence", 2, 406, 6),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 7 Combat Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-744.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 7 Agricultural Livestock Essence",
                  1,
                  611,
                  7,
                ),
                createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
                createMaterial("Lv 6 Gather Essence", 2, 406, 6),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Lava Combat Shoes",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-534.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Lava Combat Shoes",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-534.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 6 Agricultural Livestock Essence", 1, 412, 6),
            createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 6 Agricultural Livestock Essence",
                  1,
                  412,
                  6,
                ),
                createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 6 Agricultural Livestock Essence",
                  1,
                  412,
                  6,
                ),
                createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
              ],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Hollow Combat Shoes",
      alias: "HollowCombatShoes",
      cdnImage: "https://icons.lumiterra.net/item-icon-558.png",
      requiresLevel: 8,
      stats: [
        {
          name: "Combatdef",
          typeNumber: "integer",
          values: { min: 138, max: 156 },
        },
        {
          name: "Movespd",
          typeNumber: "integer",
          values: { min: 60, max: 68 },
        },
        {
          name: "Maxhp",
          typeNumber: "integer",
          values: { min: 514, max: 588 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 8 Agricultural Livestock Essence", 1, 612, 8),
            createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
            createMaterial("Lv 7 Gather Essence", 2, 406, 7),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 8 Agricultural Livestock Essence",
                  1,
                  612,
                  8,
                ),
                createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
                createMaterial("Lv 7 Gather Essence", 2, 406, 7),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 8 Agricultural Livestock Essence",
                  1,
                  612,
                  8,
                ),
                createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
                createMaterial("Lv 7 Gather Essence", 2, 406, 7),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 8 Combat Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-745.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 8 Agricultural Livestock Essence",
                  1,
                  612,
                  8,
                ),
                createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
                createMaterial("Lv 7 Gather Essence", 2, 406, 7),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Hollow Combat Shoes",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-558.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Hollow Combat Shoes",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-558.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 7 Agricultural Livestock Essence", 1, 611, 7),
            createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 7 Agricultural Livestock Essence",
                  1,
                  611,
                  7,
                ),
                createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 7 Agricultural Livestock Essence",
                  1,
                  611,
                  7,
                ),
                createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
              ],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Bronze Combat Shoes",
      alias: "BronzeCombatShoes",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-582.png",
      requiresLevel: 9,
      stats: [
        {
          name: "Combatdef",
          typeNumber: "integer",
          values: { min: 156, max: 174 },
        },
        {
          name: "Movespd",
          typeNumber: "integer",
          values: { min: 65, max: 69 },
        },
        {
          name: "Maxhp",
          typeNumber: "integer",
          values: { min: 583, max: 657 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 9 Agricultural Livestock Essence", 1, 613, 9),
            createMaterial("Lv 9 Agricultural Planting Essence", 1, 610, 9),
            createMaterial("Lv 8 Gather Essence", 2, 606, 8),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 9 Agricultural Livestock Essence",
                  1,
                  613,
                  9,
                ),
                createMaterial("Lv 9 Agricultural Planting Essence", 1, 610, 9),
                createMaterial("Lv 8 Gather Essence", 2, 606, 8),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 9 Agricultural Livestock Essence",
                  1,
                  613,
                  9,
                ),
                createMaterial("Lv 9 Agricultural Planting Essence", 1, 610, 9),
                createMaterial("Lv 8 Gather Essence", 2, 606, 8),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 9 Combat Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-746.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 9 Agricultural Livestock Essence",
                  1,
                  613,
                  9,
                ),
                createMaterial("Lv 9 Agricultural Planting Essence", 1, 610, 9),
                createMaterial("Lv 8 Gather Essence", 2, 606, 8),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Bronze Combat Shoes",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-582.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Bronze Combat Shoes",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-582.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 8 Agricultural Livestock Essence", 1, 612, 8),
            createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 8 Agricultural Livestock Essence",
                  1,
                  612,
                  8,
                ),
                createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 8 Agricultural Livestock Essence",
                  1,
                  612,
                  8,
                ),
                createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
              ],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Cracked Crystal Bracelet",
      alias: "CrackedCrystalBracelet",
      cdnImage: "https://icons.lumiterra.net/item-icon-52.png",
      requiresLevel: 1,
      stats: [
        {
          name: "Combatdef",
          typeNumber: "integer",
          values: { min: 7, max: 21 },
        },
        {
          name: "Combatatt",
          typeNumber: "integer",
          values: { min: 4, max: 14 },
        },
        { name: "Maxhp", typeNumber: "integer", values: { min: 27, max: 81 } },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 1 Agricultural Livestock Essence", 1, 213, 1),
            createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 1 Combat Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-738.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Cracked Crystal Bracelet",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-52.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Cracked Crystal Bracelet",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-52.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 1 Agricultural Livestock Essence", 1, 213, 1),
            createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
              ],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Crystal Skin Glove",
      alias: "CrystalSkinGlove",
      cdnImage: "https://icons.lumiterra.net/item-icon-53.png",
      requiresLevel: 2,
      stats: [
        {
          name: "Combatdef",
          typeNumber: "integer",
          values: { min: 21, max: 35 },
        },
        {
          name: "Combatatt",
          typeNumber: "integer",
          values: { min: 13, max: 23 },
        },
        { name: "Maxhp", typeNumber: "integer", values: { min: 78, max: 132 } },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 2 Agricultural Livestock Essence", 1, 214, 2),
            createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
            createMaterial("Lv 1 Gather Essence", 2, 207, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 2 Agricultural Livestock Essence",
                  1,
                  214,
                  2,
                ),
                createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
                createMaterial("Lv 1 Gather Essence", 2, 207, 1),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 2 Agricultural Livestock Essence",
                  1,
                  214,
                  2,
                ),
                createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
                createMaterial("Lv 1 Gather Essence", 2, 207, 1),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 2 Combat Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-739.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 2 Agricultural Livestock Essence",
                  1,
                  214,
                  2,
                ),
                createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
                createMaterial("Lv 1 Gather Essence", 2, 207, 1),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Crystal Skin Glove",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-53.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Crystal Skin Glove",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-53.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 1 Agricultural Livestock Essence", 1, 213, 1),
            createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
              ],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Crystal Stone Gauntlet",
      alias: "CrystalStoneGauntlet",
      cdnImage: "https://icons.lumiterra.net/item-icon-54.png",
      requiresLevel: 3,
      stats: [
        {
          name: "Combatdef",
          typeNumber: "integer",
          values: { min: 35, max: 49 },
        },
        {
          name: "Combatatt",
          typeNumber: "integer",
          values: { min: 22, max: 32 },
        },
        {
          name: "Maxhp",
          typeNumber: "integer",
          values: { min: 128, max: 182 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 3 Agricultural Livestock Essence", 1, 215, 3),
            createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
            createMaterial("Lv 2 Gather Essence", 2, 208, 2),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 3 Agricultural Livestock Essence",
                  1,
                  215,
                  3,
                ),
                createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
                createMaterial("Lv 2 Gather Essence", 2, 208, 2),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 3 Agricultural Livestock Essence",
                  1,
                  215,
                  3,
                ),
                createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
                createMaterial("Lv 2 Gather Essence", 2, 208, 2),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 3 Combat Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-740.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 3 Agricultural Livestock Essence",
                  1,
                  215,
                  3,
                ),
                createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
                createMaterial("Lv 2 Gather Essence", 2, 208, 2),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Crystal Stone Gauntlet",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-54.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Crystal Stone Gauntlet",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-54.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 2 Agricultural Livestock Essence", 1, 214, 2),
            createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 2 Agricultural Livestock Essence",
                  1,
                  214,
                  2,
                ),
                createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 2 Agricultural Livestock Essence",
                  1,
                  214,
                  2,
                ),
                createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
              ],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Golden Fighter Glove",
      alias: "GoldenFighterGlove",
      cdnImage: "https://icons.lumiterra.net/item-icon-337.png",
      requiresLevel: 4,
      stats: [
        {
          name: "Combatdef",
          typeNumber: "integer",
          values: { min: 179, max: 233 },
        },
        {
          name: "Combatatt",
          typeNumber: "integer",
          values: { min: 48, max: 62 },
        },
        { name: "Maxhp", typeNumber: "integer", values: { min: 31, max: 41 } },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 4 Agricultural Livestock Essence", 1, 410, 4),
            createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
            createMaterial("Lv 3 Gather Essence", 2, 209, 3),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 4 Agricultural Livestock Essence",
                  1,
                  410,
                  4,
                ),
                createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
                createMaterial("Lv 3 Gather Essence", 2, 209, 3),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 4 Agricultural Livestock Essence",
                  1,
                  410,
                  4,
                ),
                createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
                createMaterial("Lv 3 Gather Essence", 2, 209, 3),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 4 Combat Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-741.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 4 Agricultural Livestock Essence",
                  1,
                  410,
                  4,
                ),
                createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
                createMaterial("Lv 3 Gather Essence", 2, 209, 3),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Golden Fighter Glove",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-337.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Golden Fighter Glove",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-337.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 3 Agricultural Livestock Essence", 1, 215, 3),
            createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 3 Agricultural Livestock Essence",
                  1,
                  215,
                  3,
                ),
                createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 3 Agricultural Livestock Essence",
                  1,
                  215,
                  3,
                ),
                createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
              ],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Diamond Fighter Glove",
      alias: "DiamondFighterGlove",
      cdnImage: "https://icons.lumiterra.net/item-icon-342.png",
      requiresLevel: 5,
      stats: [
        {
          name: "Combatdef",
          typeNumber: "integer",
          values: { min: 228, max: 282 },
        },
        {
          name: "Combatatt",
          typeNumber: "integer",
          values: { min: 62, max: 76 },
        },
        { name: "Maxhp", typeNumber: "integer", values: { min: 40, max: 50 } },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 5 Agricultural Livestock Essence", 1, 411, 5),
            createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
            createMaterial("Lv 4 Gather Essence", 2, 404, 4),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 5 Agricultural Livestock Essence",
                  1,
                  411,
                  5,
                ),
                createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
                createMaterial("Lv 4 Gather Essence", 2, 404, 4),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 5 Agricultural Livestock Essence",
                  1,
                  411,
                  5,
                ),
                createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
                createMaterial("Lv 4 Gather Essence", 2, 404, 4),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 5 Combat Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-742.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 5 Agricultural Livestock Essence",
                  1,
                  411,
                  5,
                ),
                createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
                createMaterial("Lv 4 Gather Essence", 2, 404, 4),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Diamond Fighter Glove",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-342.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Diamond Fighter Glove",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-342.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 4 Agricultural Livestock Essence", 1, 410, 4),
            createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 4 Agricultural Livestock Essence",
                  1,
                  410,
                  4,
                ),
                createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 4 Agricultural Livestock Essence",
                  1,
                  410,
                  4,
                ),
                createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
              ],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Star Fighter Glove",
      alias: "StarFighterGlove",
      cdnImage: "https://icons.lumiterra.net/item-icon-347.png",
      requiresLevel: 6,
      stats: [
        {
          name: "Combatdef",
          typeNumber: "integer",
          values: { min: 279, max: 333 },
        },
        {
          name: "Combatatt",
          typeNumber: "integer",
          values: { min: 76, max: 90 },
        },
        { name: "Maxhp", typeNumber: "integer", values: { min: 49, max: 59 } },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 6 Agricultural Livestock Essence", 1, 412, 6),
            createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
            createMaterial("Lv 5 Gather Essence", 2, 405, 5),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 6 Agricultural Livestock Essence",
                  1,
                  412,
                  6,
                ),
                createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
                createMaterial("Lv 5 Gather Essence", 2, 405, 5),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 6 Agricultural Livestock Essence",
                  1,
                  412,
                  6,
                ),
                createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
                createMaterial("Lv 5 Gather Essence", 2, 405, 5),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 6 Combat Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-743.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 6 Agricultural Livestock Essence",
                  1,
                  412,
                  6,
                ),
                createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
                createMaterial("Lv 5 Gather Essence", 2, 405, 5),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Star Fighter Glove",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-347.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Star Fighter Glove",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-347.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 5 Agricultural Livestock Essence", 1, 411, 5),
            createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 5 Agricultural Livestock Essence",
                  1,
                  411,
                  5,
                ),
                createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 5 Agricultural Livestock Essence",
                  1,
                  411,
                  5,
                ),
                createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
              ],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Lava Combat Gloves",
      alias: "LavaCombatGloves",
      cdnImage: "https://icons.lumiterra.net/item-icon-533.png",
      requiresLevel: 7,
      stats: [
        {
          name: "Combatdef",
          typeNumber: "integer",
          values: { min: 329, max: 383 },
        },
        {
          name: "Combatatt",
          typeNumber: "integer",
          values: { min: 90, max: 104 },
        },
        { name: "Maxhp", typeNumber: "integer", values: { min: 58, max: 58 } },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 7 Agricultural Livestock Essence", 1, 611, 7),
            createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
            createMaterial("Lv 6 Gather Essence", 2, 406, 6),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 7 Agricultural Livestock Essence",
                  1,
                  611,
                  7,
                ),
                createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
                createMaterial("Lv 6 Gather Essence", 2, 406, 6),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 7 Agricultural Livestock Essence",
                  1,
                  611,
                  7,
                ),
                createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
                createMaterial("Lv 6 Gather Essence", 2, 406, 6),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 7 Combat Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-744.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 7 Agricultural Livestock Essence",
                  1,
                  611,
                  7,
                ),
                createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
                createMaterial("Lv 6 Gather Essence", 2, 406, 6),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Lava Combat Gloves",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-533.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Lava Combat Gloves",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-533.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 6 Agricultural Livestock Essence", 1, 412, 6),
            createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 6 Agricultural Livestock Essence",
                  1,
                  412,
                  6,
                ),
                createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 6 Agricultural Livestock Essence",
                  1,
                  412,
                  6,
                ),
                createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
              ],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Hollow Combat Gloves",
      alias: "HollowCombatGloves",
      cdnImage: "https://icons.lumiterra.net/item-icon-557.png",
      requiresLevel: 8,
      stats: [
        {
          name: "Combatdef",
          typeNumber: "integer",
          values: { min: 378, max: 432 },
        },
        {
          name: "Combatatt",
          typeNumber: "integer",
          values: { min: 104, max: 118 },
        },
        { name: "Maxhp", typeNumber: "integer", values: { min: 67, max: 77 } },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 8 Agricultural Livestock Essence", 1, 612, 8),
            createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
            createMaterial("Lv 7 Gather Essence", 2, 406, 7),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 8 Agricultural Livestock Essence",
                  1,
                  612,
                  8,
                ),
                createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
                createMaterial("Lv 7 Gather Essence", 2, 406, 7),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 8 Agricultural Livestock Essence",
                  1,
                  612,
                  8,
                ),
                createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
                createMaterial("Lv 7 Gather Essence", 2, 406, 7),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 8 Combat Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-745.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 8 Agricultural Livestock Essence",
                  1,
                  612,
                  8,
                ),
                createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
                createMaterial("Lv 7 Gather Essence", 2, 406, 7),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Hollow Combat Gloves",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-557.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Hollow Combat Gloves",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-557.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 7 Agricultural Livestock Essence", 1, 611, 7),
            createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 7 Agricultural Livestock Essence",
                  1,
                  611,
                  7,
                ),
                createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 7 Agricultural Livestock Essence",
                  1,
                  611,
                  7,
                ),
                createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
              ],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Bronze Combat Gloves",
      alias: "BronzeCombatGloves",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-581.png",
      requiresLevel: 9,
      stats: [
        {
          name: "Combatdef",
          typeNumber: "integer",
          values: { min: 429, max: 483 },
        },
        {
          name: "Combatatt",
          typeNumber: "integer",
          values: { min: 118, max: 132 },
        },
        { name: "Maxhp", typeNumber: "integer", values: { min: 76, max: 86 } },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 9 Agricultural Livestock Essence", 1, 613, 9),
            createMaterial("Lv 9 Agricultural Planting Essence", 1, 610, 9),
            createMaterial("Lv 8 Gather Essence", 2, 606, 8),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 9 Agricultural Livestock Essence",
                  1,
                  613,
                  9,
                ),
                createMaterial("Lv 9 Agricultural Planting Essence", 1, 610, 9),
                createMaterial("Lv 8 Gather Essence", 2, 606, 8),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 9 Agricultural Livestock Essence",
                  1,
                  613,
                  9,
                ),
                createMaterial("Lv 9 Agricultural Planting Essence", 1, 610, 9),
                createMaterial("Lv 8 Gather Essence", 2, 606, 8),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 9 Combat Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-746.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 9 Agricultural Livestock Essence",
                  1,
                  613,
                  9,
                ),
                createMaterial("Lv 9 Agricultural Planting Essence", 1, 610, 9),
                createMaterial("Lv 8 Gather Essence", 2, 606, 8),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Bronze Combat Gloves",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-581.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Bronze Combat Gloves",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-581.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 8 Agricultural Livestock Essence", 1, 612, 8),
            createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 8 Agricultural Livestock Essence",
                  1,
                  612,
                  8,
                ),
                createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 8 Agricultural Livestock Essence",
                  1,
                  612,
                  8,
                ),
                createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
              ],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Chip Head Ring",
      alias: "ChipHeadRing",
      cdnImage: "https://icons.lumiterra.net/item-icon-43.png",
      requiresLevel: 1,
      stats: [
        {
          name: "Combatdef",
          typeNumber: "integer",
          values: { min: 9, max: 27 },
        },
        { name: "Maxhp", typeNumber: "integer", values: { min: 35, max: 105 } },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 1 Agricultural Livestock Essence", 1, 213, 1),
            createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 1 Combat Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-738.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Chip Head Ring",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-43.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Chip Head Ring",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-43.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 1 Agricultural Livestock Essence", 1, 213, 1),
            createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
              ],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Crystal Skin Soft Hat",
      alias: "CrystalSkinSoftHat",
      cdnImage: "https://icons.lumiterra.net/item-icon-44.png",
      requiresLevel: 2,
      stats: [
        {
          name: "Combatdef",
          typeNumber: "integer",
          values: { min: 28, max: 46 },
        },
        {
          name: "Maxhp",
          typeNumber: "integer",
          values: { min: 101, max: 171 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 2 Agricultural Livestock Essence", 1, 214, 2),
            createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
            createMaterial("Lv 1 Gather Essence", 2, 207, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 2 Agricultural Livestock Essence",
                  1,
                  214,
                  2,
                ),
                createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
                createMaterial("Lv 1 Gather Essence", 2, 207, 1),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 2 Agricultural Livestock Essence",
                  1,
                  214,
                  2,
                ),
                createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
                createMaterial("Lv 1 Gather Essence", 2, 207, 1),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 2 Combat Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-739.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 2 Agricultural Livestock Essence",
                  1,
                  214,
                  2,
                ),
                createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
                createMaterial("Lv 1 Gather Essence", 2, 207, 1),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Crystal Skin Soft Hat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-44.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Crystal Skin Soft Hat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-44.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 1 Agricultural Livestock Essence", 1, 213, 1),
            createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
              ],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Crystal Stone Helmet",
      alias: "CrystalStoneHelmet",
      cdnImage: "https://icons.lumiterra.net/item-icon-45.png",
      requiresLevel: 3,
      stats: [
        {
          name: "Combatdef",
          typeNumber: "integer",
          values: { min: 46, max: 64 },
        },
        {
          name: "Maxhp",
          typeNumber: "integer",
          values: { min: 167, max: 237 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 3 Agricultural Livestock Essence", 1, 215, 3),
            createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
            createMaterial("Lv 2 Gather Essence", 2, 208, 2),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 3 Agricultural Livestock Essence",
                  1,
                  215,
                  3,
                ),
                createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
                createMaterial("Lv 2 Gather Essence", 2, 208, 2),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 3 Agricultural Livestock Essence",
                  1,
                  215,
                  3,
                ),
                createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
                createMaterial("Lv 2 Gather Essence", 2, 208, 2),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 3 Combat Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-740.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 3 Agricultural Livestock Essence",
                  1,
                  215,
                  3,
                ),
                createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
                createMaterial("Lv 2 Gather Essence", 2, 208, 2),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Crystal Stone Helmet",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-45.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Crystal Stone Helmet",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-45.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 2 Agricultural Livestock Essence", 1, 214, 2),
            createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 2 Agricultural Livestock Essence",
                  1,
                  214,
                  2,
                ),
                createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 2 Agricultural Livestock Essence",
                  1,
                  214,
                  2,
                ),
                createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
              ],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Golden Fighter Hat",
      alias: "GoldenFighterHat",
      cdnImage: "https://icons.lumiterra.net/item-icon-335.png",
      requiresLevel: 4,
      stats: [
        {
          name: "Combatdef",
          typeNumber: "integer",
          values: { min: 64, max: 82 },
        },
        {
          name: "Maxhp",
          typeNumber: "integer",
          values: { min: 233, max: 303 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 4 Agricultural Livestock Essence", 1, 410, 4),
            createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
            createMaterial("Lv 3 Gather Essence", 2, 209, 3),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 4 Agricultural Livestock Essence",
                  1,
                  410,
                  4,
                ),
                createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
                createMaterial("Lv 3 Gather Essence", 2, 209, 3),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 4 Agricultural Livestock Essence",
                  1,
                  410,
                  4,
                ),
                createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
                createMaterial("Lv 3 Gather Essence", 2, 209, 3),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 4 Combat Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-741.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 4 Agricultural Livestock Essence",
                  1,
                  410,
                  4,
                ),
                createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
                createMaterial("Lv 3 Gather Essence", 2, 209, 3),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Golden Fighter Hat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-335.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Golden Fighter Hat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-335.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 3 Agricultural Livestock Essence", 1, 215, 3),
            createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 3 Agricultural Livestock Essence",
                  1,
                  215,
                  3,
                ),
                createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 3 Agricultural Livestock Essence",
                  1,
                  215,
                  3,
                ),
                createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
              ],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Diamond Fighter Hat",
      alias: "DiamondFighterHat",
      cdnImage: "https://icons.lumiterra.net/item-icon-340.png",
      requiresLevel: 5,
      stats: [
        {
          name: "Combatdef",
          typeNumber: "integer",
          values: { min: 83, max: 97 },
        },
        {
          name: "Maxhp",
          typeNumber: "integer",
          values: { min: 233, max: 303 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 5 Agricultural Livestock Essence", 1, 411, 5),
            createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
            createMaterial("Lv 4 Gather Essence", 2, 404, 4),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 5 Agricultural Livestock Essence",
                  1,
                  411,
                  5,
                ),
                createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
                createMaterial("Lv 4 Gather Essence", 2, 404, 4),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 5 Agricultural Livestock Essence",
                  1,
                  411,
                  5,
                ),
                createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
                createMaterial("Lv 4 Gather Essence", 2, 404, 4),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 5 Combat Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-742.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 5 Agricultural Livestock Essence",
                  1,
                  411,
                  5,
                ),
                createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
                createMaterial("Lv 4 Gather Essence", 2, 404, 4),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Diamond Fighter Hat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-340.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Diamond Fighter Hat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-340.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 4 Agricultural Livestock Essence", 1, 410, 4),
            createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 4 Agricultural Livestock Essence",
                  1,
                  410,
                  4,
                ),
                createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 4 Agricultural Livestock Essence",
                  1,
                  410,
                  4,
                ),
                createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
              ],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Star Fighter Hat",
      alias: "StarFighterHat",
      cdnImage: "https://icons.lumiterra.net/item-icon-345.png",
      requiresLevel: 6,
      stats: [
        {
          name: "Combatdef",
          typeNumber: "integer",
          values: { min: 101, max: 119 },
        },
        {
          name: "Maxhp",
          typeNumber: "integer",
          values: { min: 364, max: 434 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 6 Agricultural Livestock Essence", 1, 412, 6),
            createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
            createMaterial("Lv 5 Gather Essence", 2, 405, 5),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 6 Agricultural Livestock Essence",
                  1,
                  412,
                  6,
                ),
                createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
                createMaterial("Lv 5 Gather Essence", 2, 405, 5),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 6 Agricultural Livestock Essence",
                  1,
                  412,
                  6,
                ),
                createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
                createMaterial("Lv 5 Gather Essence", 2, 405, 5),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 6 Combat Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-743.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 6 Agricultural Livestock Essence",
                  1,
                  412,
                  6,
                ),
                createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
                createMaterial("Lv 5 Gather Essence", 2, 405, 5),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Star Fighter Hat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-345.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Star Fighter Hat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-345.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 5 Agricultural Livestock Essence", 1, 411, 5),
            createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 5 Agricultural Livestock Essence",
                  1,
                  411,
                  5,
                ),
                createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 5 Agricultural Livestock Essence",
                  1,
                  411,
                  5,
                ),
                createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
              ],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Lava Combat Hat",
      alias: "LavaCombatHat",
      cdnImage: "https://icons.lumiterra.net/item-icon-530.png",
      requiresLevel: 7,
      stats: [
        {
          name: "Combatdef",
          typeNumber: "integer",
          values: { min: 120, max: 138 },
        },
        {
          name: "Maxhp",
          typeNumber: "integer",
          values: { min: 428, max: 498 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 7 Agricultural Livestock Essence", 1, 611, 7),
            createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
            createMaterial("Lv 6 Gather Essence", 2, 406, 6),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 7 Agricultural Livestock Essence",
                  1,
                  611,
                  7,
                ),
                createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
                createMaterial("Lv 6 Gather Essence", 2, 406, 6),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 7 Agricultural Livestock Essence",
                  1,
                  611,
                  7,
                ),
                createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
                createMaterial("Lv 6 Gather Essence", 2, 406, 6),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 7 Combat Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-744.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 7 Agricultural Livestock Essence",
                  1,
                  611,
                  7,
                ),
                createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
                createMaterial("Lv 6 Gather Essence", 2, 406, 6),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Lava Combat Hat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-530.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Lava Combat Hat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-530.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 6 Agricultural Livestock Essence", 1, 412, 6),
            createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 6 Agricultural Livestock Essence",
                  1,
                  412,
                  6,
                ),
                createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 6 Agricultural Livestock Essence",
                  1,
                  412,
                  6,
                ),
                createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
              ],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Hollow Combat Hat",
      alias: "HollowCombatHat",
      cdnImage: "https://icons.lumiterra.net/item-icon-554.png",
      requiresLevel: 8,
      stats: [
        {
          name: "Combatdef",
          typeNumber: "integer",
          values: { min: 138, max: 156 },
        },
        {
          name: "Maxhp",
          typeNumber: "integer",
          values: { min: 492, max: 562 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 8 Agricultural Livestock Essence", 1, 612, 8),
            createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
            createMaterial("Lv 7 Gather Essence", 2, 406, 7),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 8 Agricultural Livestock Essence",
                  1,
                  612,
                  8,
                ),
                createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
                createMaterial("Lv 7 Gather Essence", 2, 406, 7),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 8 Agricultural Livestock Essence",
                  1,
                  612,
                  8,
                ),
                createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
                createMaterial("Lv 7 Gather Essence", 2, 406, 7),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 8 Combat Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-745.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 8 Agricultural Livestock Essence",
                  1,
                  612,
                  8,
                ),
                createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
                createMaterial("Lv 7 Gather Essence", 2, 406, 7),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Hollow Combat Hat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-554.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Hollow Combat Hat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-554.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 7 Agricultural Livestock Essence", 1, 611, 7),
            createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 7 Agricultural Livestock Essence",
                  1,
                  611,
                  7,
                ),
                createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 7 Agricultural Livestock Essence",
                  1,
                  611,
                  7,
                ),
                createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
              ],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Bronze Combat Hat",
      alias: "BronzeCombatHat",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-578.png",
      requiresLevel: 9,
      stats: [
        {
          name: "Combatdef",
          typeNumber: "integer",
          values: { min: 156, max: 174 },
        },
        {
          name: "Maxhp",
          typeNumber: "integer",
          values: { min: 558, max: 628 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 9 Agricultural Livestock Essence", 1, 613, 9),
            createMaterial("Lv 9 Agricultural Planting Essence", 1, 610, 9),
            createMaterial("Lv 8 Gather Essence", 2, 606, 8),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 9 Agricultural Livestock Essence",
                  1,
                  613,
                  9,
                ),
                createMaterial("Lv 9 Agricultural Planting Essence", 1, 610, 9),
                createMaterial("Lv 8 Gather Essence", 2, 606, 8),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 9 Agricultural Livestock Essence",
                  1,
                  613,
                  9,
                ),
                createMaterial("Lv 9 Agricultural Planting Essence", 1, 610, 9),
                createMaterial("Lv 8 Gather Essence", 2, 606, 8),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 9 Combat Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-746.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 9 Agricultural Livestock Essence",
                  1,
                  613,
                  9,
                ),
                createMaterial("Lv 9 Agricultural Planting Essence", 1, 610, 9),
                createMaterial("Lv 8 Gather Essence", 2, 606, 8),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Bronze Combat Hat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-578.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Bronze Combat Hat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-578.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 8 Agricultural Livestock Essence", 1, 612, 8),
            createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 8 Agricultural Livestock Essence",
                  1,
                  612,
                  8,
                ),
                createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 8 Agricultural Livestock Essence",
                  1,
                  612,
                  8,
                ),
                createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
              ],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Cracked Crystal Grass Skirt",
      alias: "CrackedCrystalGrassSkirt",
      cdnImage: "https://icons.lumiterra.net/item-icon-49.png",
      requiresLevel: 1,
      stats: [
        {
          name: "Combatdef",
          typeNumber: "integer",
          values: { min: 8, max: 26 },
        },
        { name: "Maxhp", typeNumber: "integer", values: { min: 36, max: 110 } },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 1 Agricultural Livestock Essence", 1, 213, 1),
            createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 1 Combat Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-738.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Cracked Crystal Grass Skirt",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-49.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Cracked Crystal Grass Skirt",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-49.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 1 Agricultural Livestock Essence", 1, 213, 1),
            createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
              ],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Crystal Skin Pants",
      alias: "CrystalSkinPants",
      cdnImage: "https://icons.lumiterra.net/item-icon-50.png",
      requiresLevel: 2,
      stats: [
        {
          name: "Combatdef",
          typeNumber: "integer",
          values: { min: 26, max: 44 },
        },
        {
          name: "Maxhp",
          typeNumber: "integer",
          values: { min: 105, max: 179 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 2 Agricultural Livestock Essence", 1, 214, 2),
            createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
            createMaterial("Lv 1 Gather Essence", 2, 207, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 2 Agricultural Livestock Essence",
                  1,
                  214,
                  2,
                ),
                createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
                createMaterial("Lv 1 Gather Essence", 2, 207, 1),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 2 Agricultural Livestock Essence",
                  1,
                  214,
                  2,
                ),
                createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
                createMaterial("Lv 1 Gather Essence", 2, 207, 1),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 2 Combat Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-739.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 2 Agricultural Livestock Essence",
                  1,
                  214,
                  2,
                ),
                createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
                createMaterial("Lv 1 Gather Essence", 2, 207, 1),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Crystal Skin Pants",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-50.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Crystal Skin Pants",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-50.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 1 Agricultural Livestock Essence", 1, 213, 1),
            createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
              ],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Crystal Leg Armor",
      alias: "CrystalLegArmor",
      cdnImage: "https://icons.lumiterra.net/item-icon-51.png",
      requiresLevel: 3,
      stats: [
        {
          name: "Combatdef",
          typeNumber: "integer",
          values: { min: 43, max: 61 },
        },
        {
          name: "Maxhp",
          typeNumber: "integer",
          values: { min: 175, max: 249 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 3 Agricultural Livestock Essence", 1, 215, 3),
            createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
            createMaterial("Lv 2 Gather Essence", 2, 208, 2),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 3 Agricultural Livestock Essence",
                  1,
                  215,
                  3,
                ),
                createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
                createMaterial("Lv 2 Gather Essence", 2, 208, 2),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 3 Agricultural Livestock Essence",
                  1,
                  215,
                  3,
                ),
                createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
                createMaterial("Lv 2 Gather Essence", 2, 208, 2),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 3 Combat Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-740.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 3 Agricultural Livestock Essence",
                  1,
                  215,
                  3,
                ),
                createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
                createMaterial("Lv 2 Gather Essence", 2, 208, 2),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Crystal Leg Armor",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-51.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Crystal Leg Armor",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-51.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 2 Agricultural Livestock Essence", 1, 214, 2),
            createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 2 Agricultural Livestock Essence",
                  1,
                  214,
                  2,
                ),
                createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 2 Agricultural Livestock Essence",
                  1,
                  214,
                  2,
                ),
                createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
              ],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Golden Fighter Pants",
      alias: "GoldenFighterPants",
      cdnImage: "https://icons.lumiterra.net/item-icon-358.png",
      requiresLevel: 4,
      stats: [
        {
          name: "Combatdef",
          typeNumber: "integer",
          values: { min: 61, max: 79 },
        },
        {
          name: "Maxhp",
          typeNumber: "integer",
          values: { min: 244, max: 318 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 4 Agricultural Livestock Essence", 1, 410, 4),
            createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
            createMaterial("Lv 3 Gather Essence", 2, 209, 3),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 4 Agricultural Livestock Essence",
                  1,
                  410,
                  4,
                ),
                createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
                createMaterial("Lv 3 Gather Essence", 2, 209, 3),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 4 Agricultural Livestock Essence",
                  1,
                  410,
                  4,
                ),
                createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
                createMaterial("Lv 3 Gather Essence", 2, 209, 3),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 4 Combat Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-741.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 4 Agricultural Livestock Essence",
                  1,
                  410,
                  4,
                ),
                createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
                createMaterial("Lv 3 Gather Essence", 2, 209, 3),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Golden Fighter Pants",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-358.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Golden Fighter Pants",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-358.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 3 Agricultural Livestock Essence", 1, 215, 3),
            createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 3 Agricultural Livestock Essence",
                  1,
                  215,
                  3,
                ),
                createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 3 Agricultural Livestock Essence",
                  1,
                  215,
                  3,
                ),
                createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
              ],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Diamond Fighter Pants",
      alias: "DiamondFighterPants",
      cdnImage: "https://icons.lumiterra.net/item-icon-343.png",
      requiresLevel: 5,
      stats: [
        {
          name: "Combatdef",
          typeNumber: "integer",
          values: { min: 78, max: 96 },
        },
        {
          name: "Maxhp",
          typeNumber: "integer",
          values: { min: 311, max: 385 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 5 Agricultural Livestock Essence", 1, 411, 5),
            createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
            createMaterial("Lv 4 Gather Essence", 2, 404, 4),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 5 Agricultural Livestock Essence",
                  1,
                  411,
                  5,
                ),
                createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
                createMaterial("Lv 4 Gather Essence", 2, 404, 4),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 5 Agricultural Livestock Essence",
                  1,
                  411,
                  5,
                ),
                createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
                createMaterial("Lv 4 Gather Essence", 2, 404, 4),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 5 Combat Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-742.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 5 Agricultural Livestock Essence",
                  1,
                  411,
                  5,
                ),
                createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
                createMaterial("Lv 4 Gather Essence", 2, 404, 4),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Diamond Fighter Pants",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-343.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Diamond Fighter Pants",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-343.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 4 Agricultural Livestock Essence", 1, 410, 4),
            createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 4 Agricultural Livestock Essence",
                  1,
                  410,
                  4,
                ),
                createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 4 Agricultural Livestock Essence",
                  1,
                  410,
                  4,
                ),
                createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
              ],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Star Fighter Pants",
      alias: "StarFighterPants",
      cdnImage: "https://icons.lumiterra.net/item-icon-348.png",
      requiresLevel: 6,
      stats: [
        {
          name: "Combatdef",
          typeNumber: "integer",
          values: { min: 96, max: 114 },
        },
        {
          name: "Maxhp",
          typeNumber: "integer",
          values: { min: 380, max: 454 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 6 Agricultural Livestock Essence", 1, 412, 6),
            createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
            createMaterial("Lv 5 Gather Essence", 2, 405, 5),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 6 Agricultural Livestock Essence",
                  1,
                  412,
                  6,
                ),
                createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
                createMaterial("Lv 5 Gather Essence", 2, 405, 5),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 6 Agricultural Livestock Essence",
                  1,
                  412,
                  6,
                ),
                createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
                createMaterial("Lv 5 Gather Essence", 2, 405, 5),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 6 Combat Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-743.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 6 Agricultural Livestock Essence",
                  1,
                  412,
                  6,
                ),
                createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
                createMaterial("Lv 5 Gather Essence", 2, 405, 5),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Star Fighter Pants",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-348.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Star Fighter Pants",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-348.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 5 Agricultural Livestock Essence", 1, 411, 5),
            createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 5 Agricultural Livestock Essence",
                  1,
                  411,
                  5,
                ),
                createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 5 Agricultural Livestock Essence",
                  1,
                  411,
                  5,
                ),
                createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
              ],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Lava Combat Pants",
      alias: "LavaCombatPants",
      cdnImage: "https://icons.lumiterra.net/item-icon-532.png",
      requiresLevel: 7,
      stats: [
        {
          name: "Combatdef",
          typeNumber: "integer",
          values: { min: 113, max: 131 },
        },
        {
          name: "Maxhp",
          typeNumber: "integer",
          values: { min: 447, max: 521 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 7 Agricultural Livestock Essence", 1, 611, 7),
            createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
            createMaterial("Lv 6 Gather Essence", 2, 406, 6),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 7 Agricultural Livestock Essence",
                  1,
                  611,
                  7,
                ),
                createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
                createMaterial("Lv 6 Gather Essence", 2, 406, 6),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 7 Agricultural Livestock Essence",
                  1,
                  611,
                  7,
                ),
                createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
                createMaterial("Lv 6 Gather Essence", 2, 406, 6),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 7 Combat Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-744.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 7 Agricultural Livestock Essence",
                  1,
                  611,
                  7,
                ),
                createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
                createMaterial("Lv 6 Gather Essence", 2, 406, 6),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Lava Combat Pants",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-532.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Lava Combat Pants",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-532.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 6 Agricultural Livestock Essence", 1, 412, 6),
            createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 6 Agricultural Livestock Essence",
                  1,
                  412,
                  6,
                ),
                createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 6 Agricultural Livestock Essence",
                  1,
                  412,
                  6,
                ),
                createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
              ],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Hollow Combat Pants",
      alias: "HollowCombatPants",
      cdnImage: "https://icons.lumiterra.net/item-icon-556.png",
      requiresLevel: 8,
      stats: [
        {
          name: "Combatdef",
          typeNumber: "integer",
          values: { min: 131, max: 149 },
        },
        {
          name: "Maxhp",
          typeNumber: "integer",
          values: { min: 514, max: 588 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 8 Agricultural Livestock Essence", 1, 612, 8),
            createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
            createMaterial("Lv 7 Gather Essence", 2, 406, 7),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 8 Agricultural Livestock Essence",
                  1,
                  612,
                  8,
                ),
                createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
                createMaterial("Lv 7 Gather Essence", 2, 406, 7),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 8 Agricultural Livestock Essence",
                  1,
                  612,
                  8,
                ),
                createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
                createMaterial("Lv 7 Gather Essence", 2, 406, 7),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 8 Combat Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-745.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 8 Agricultural Livestock Essence",
                  1,
                  612,
                  8,
                ),
                createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
                createMaterial("Lv 7 Gather Essence", 2, 406, 7),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Hollow Combat Pants",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-556.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Hollow Combat Pants",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-556.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 7 Agricultural Livestock Essence", 1, 611, 7),
            createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 7 Agricultural Livestock Essence",
                  1,
                  611,
                  7,
                ),
                createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 7 Agricultural Livestock Essence",
                  1,
                  611,
                  7,
                ),
                createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
              ],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Bronze Combat Pants",
      alias: "BronzeCombatPants",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-580.png",
      requiresLevel: 9,
      stats: [
        {
          name: "Combatdef",
          typeNumber: "integer",
          values: { min: 148, max: 166 },
        },
        {
          name: "Maxhp",
          typeNumber: "integer",
          values: { min: 583, max: 657 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 9 Agricultural Livestock Essence", 1, 613, 9),
            createMaterial("Lv 9 Agricultural Planting Essence", 1, 610, 9),
            createMaterial("Lv 8 Gather Essence", 2, 606, 8),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 9 Agricultural Livestock Essence",
                  1,
                  613,
                  9,
                ),
                createMaterial("Lv 9 Agricultural Planting Essence", 1, 610, 9),
                createMaterial("Lv 8 Gather Essence", 2, 606, 8),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 9 Agricultural Livestock Essence",
                  1,
                  613,
                  9,
                ),
                createMaterial("Lv 9 Agricultural Planting Essence", 1, 610, 9),
                createMaterial("Lv 8 Gather Essence", 2, 606, 8),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 9 Combat Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-746.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 9 Agricultural Livestock Essence",
                  1,
                  613,
                  9,
                ),
                createMaterial("Lv 9 Agricultural Planting Essence", 1, 610, 9),
                createMaterial("Lv 8 Gather Essence", 2, 606, 8),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Bronze Combat Pants",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-580.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Bronze Combat Pants",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-580.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 8 Agricultural Livestock Essence", 1, 612, 8),
            createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 8 Agricultural Livestock Essence",
                  1,
                  612,
                  8,
                ),
                createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 8 Agricultural Livestock Essence",
                  1,
                  612,
                  8,
                ),
                createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
              ],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Cracked Crystal Armor",
      alias: "CrackedCrystalArmor",
      cdnImage: "https://icons.lumiterra.net/item-icon-46.png",
      requiresLevel: 1,
      stats: [
        {
          name: "Combatdef",
          typeNumber: "integer",
          values: { min: 11, max: 33 },
        },
        { name: "Maxhp", typeNumber: "integer", values: { min: 27, max: 81 } },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 1 Agricultural Livestock Essence", 1, 213, 1),
            createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 1 Combat Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-738.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Cracked Crystal Armor",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-46.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Cracked Crystal Armor",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-46.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 1 Agricultural Livestock Essence", 1, 213, 1),
            createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
              ],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Crystal Skin Armor",
      alias: "CrystalSkinArmor",
      cdnImage: "https://icons.lumiterra.net/item-icon-47.png",
      requiresLevel: 2,
      stats: [
        {
          name: "Combatdef",
          typeNumber: "integer",
          values: { min: 33, max: 55 },
        },
        { name: "Maxhp", typeNumber: "integer", values: { min: 78, max: 132 } },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 2 Agricultural Livestock Essence", 1, 214, 2),
            createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
            createMaterial("Lv 1 Gather Essence", 2, 207, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 2 Agricultural Livestock Essence",
                  1,
                  214,
                  2,
                ),
                createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
                createMaterial("Lv 1 Gather Essence", 2, 207, 1),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 2 Agricultural Livestock Essence",
                  1,
                  214,
                  2,
                ),
                createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
                createMaterial("Lv 1 Gather Essence", 2, 207, 1),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 2 Combat Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-739.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 2 Agricultural Livestock Essence",
                  1,
                  214,
                  2,
                ),
                createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
                createMaterial("Lv 1 Gather Essence", 2, 207, 1),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Crystal Skin Armor",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-47.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Crystal Skin Armor",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-47.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 1 Agricultural Livestock Essence", 1, 213, 1),
            createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
              ],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Crystal Stone Armor",
      alias: "CrystalStoneArmor",
      cdnImage: "https://icons.lumiterra.net/item-icon-48.png",
      requiresLevel: 3,
      stats: [
        {
          name: "Combatdef",
          typeNumber: "integer",
          values: { min: 55, max: 77 },
        },
        {
          name: "Maxhp",
          typeNumber: "integer",
          values: { min: 128, max: 182 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 3 Agricultural Livestock Essence", 1, 215, 3),
            createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
            createMaterial("Lv 2 Gather Essence", 2, 208, 2),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 3 Agricultural Livestock Essence",
                  1,
                  215,
                  3,
                ),
                createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
                createMaterial("Lv 2 Gather Essence", 2, 208, 2),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 3 Agricultural Livestock Essence",
                  1,
                  215,
                  3,
                ),
                createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
                createMaterial("Lv 2 Gather Essence", 2, 208, 2),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 3 Combat Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-740.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 3 Agricultural Livestock Essence",
                  1,
                  215,
                  3,
                ),
                createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
                createMaterial("Lv 2 Gather Essence", 2, 208, 2),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Crystal Stone Armor",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-48.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Crystal Stone Armor",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-48.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 2 Agricultural Livestock Essence", 1, 214, 2),
            createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 2 Agricultural Livestock Essence",
                  1,
                  214,
                  2,
                ),
                createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 2 Agricultural Livestock Essence",
                  1,
                  214,
                  2,
                ),
                createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
              ],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Golden Fighter Coat",
      alias: "GoldenFighterCoat",
      cdnImage: "https://icons.lumiterra.net/item-icon-336.png",
      requiresLevel: 4,
      stats: [
        {
          name: "Combatdef",
          typeNumber: "integer",
          values: { min: 77, max: 99 },
        },
        {
          name: "Maxhp",
          typeNumber: "integer",
          values: { min: 179, max: 233 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 4 Agricultural Livestock Essence", 1, 410, 4),
            createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
            createMaterial("Lv 3 Gather Essence", 2, 209, 3),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 4 Agricultural Livestock Essence",
                  1,
                  410,
                  4,
                ),
                createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
                createMaterial("Lv 3 Gather Essence", 2, 209, 3),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 4 Agricultural Livestock Essence",
                  1,
                  410,
                  4,
                ),
                createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
                createMaterial("Lv 3 Gather Essence", 2, 209, 3),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 4 Combat Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-741.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 4 Agricultural Livestock Essence",
                  1,
                  410,
                  4,
                ),
                createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
                createMaterial("Lv 3 Gather Essence", 2, 209, 3),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Golden Fighter Coat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-336.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Golden Fighter Coat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-336.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 3 Agricultural Livestock Essence", 1, 215, 3),
            createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 3 Agricultural Livestock Essence",
                  1,
                  215,
                  3,
                ),
                createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 3 Agricultural Livestock Essence",
                  1,
                  215,
                  3,
                ),
                createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
              ],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Diamond Fighter Coat",
      alias: "DiamondFighterCoat",
      cdnImage: "https://icons.lumiterra.net/item-icon-341.png",
      requiresLevel: 5,
      stats: [
        {
          name: "Combatdef",
          typeNumber: "integer",
          values: { min: 99, max: 121 },
        },
        {
          name: "Maxhp",
          typeNumber: "integer",
          values: { min: 228, max: 282 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 5 Agricultural Livestock Essence", 1, 411, 5),
            createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
            createMaterial("Lv 4 Gather Essence", 2, 404, 4),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 5 Agricultural Livestock Essence",
                  1,
                  411,
                  5,
                ),
                createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
                createMaterial("Lv 4 Gather Essence", 2, 404, 4),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 5 Agricultural Livestock Essence",
                  1,
                  411,
                  5,
                ),
                createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
                createMaterial("Lv 4 Gather Essence", 2, 404, 4),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 5 Combat Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-742.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 5 Agricultural Livestock Essence",
                  1,
                  411,
                  5,
                ),
                createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
                createMaterial("Lv 4 Gather Essence", 2, 404, 4),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Diamond Fighter Coat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-341.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Diamond Fighter Coat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-341.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 4 Agricultural Livestock Essence", 1, 410, 4),
            createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 4 Agricultural Livestock Essence",
                  1,
                  410,
                  4,
                ),
                createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 4 Agricultural Livestock Essence",
                  1,
                  410,
                  4,
                ),
                createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
              ],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Star Fighter Coat",
      alias: "StarFighterCoat",
      cdnImage: "https://icons.lumiterra.net/item-icon-346.png",
      requiresLevel: 6,
      stats: [
        {
          name: "Combatdef",
          typeNumber: "integer",
          values: { min: 121, max: 143 },
        },
        {
          name: "Maxhp",
          typeNumber: "integer",
          values: { min: 279, max: 333 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 6 Agricultural Livestock Essence", 1, 412, 6),
            createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
            createMaterial("Lv 5 Gather Essence", 2, 405, 5),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 6 Agricultural Livestock Essence",
                  1,
                  412,
                  6,
                ),
                createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
                createMaterial("Lv 5 Gather Essence", 2, 405, 5),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 6 Agricultural Livestock Essence",
                  1,
                  412,
                  6,
                ),
                createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
                createMaterial("Lv 5 Gather Essence", 2, 405, 5),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 6 Combat Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-743.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 6 Agricultural Livestock Essence",
                  1,
                  412,
                  6,
                ),
                createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
                createMaterial("Lv 5 Gather Essence", 2, 405, 5),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Star Fighter Coat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-346.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Star Fighter Coat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-346.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 5 Agricultural Livestock Essence", 1, 411, 5),
            createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 5 Agricultural Livestock Essence",
                  1,
                  411,
                  5,
                ),
                createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 5 Agricultural Livestock Essence",
                  1,
                  411,
                  5,
                ),
                createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
              ],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Lava Combat Coat",
      alias: "LavaCombatCoat",
      cdnImage: "https://icons.lumiterra.net/item-icon-531.png",
      requiresLevel: 7,
      stats: [
        {
          name: "Combatdef",
          typeNumber: "integer",
          values: { min: 143, max: 165 },
        },
        {
          name: "Maxhp",
          typeNumber: "integer",
          values: { min: 329, max: 383 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 7 Agricultural Livestock Essence", 1, 611, 7),
            createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
            createMaterial("Lv 6 Gather Essence", 2, 406, 6),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 7 Agricultural Livestock Essence",
                  1,
                  611,
                  7,
                ),
                createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
                createMaterial("Lv 6 Gather Essence", 2, 406, 6),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 7 Agricultural Livestock Essence",
                  1,
                  611,
                  7,
                ),
                createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
                createMaterial("Lv 6 Gather Essence", 2, 406, 6),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 7 Combat Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-744.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 7 Agricultural Livestock Essence",
                  1,
                  611,
                  7,
                ),
                createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
                createMaterial("Lv 6 Gather Essence", 2, 406, 6),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Lava Combat Coat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-531.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Lava Combat Coat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-531.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 6 Agricultural Livestock Essence", 1, 412, 6),
            createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 6 Agricultural Livestock Essence",
                  1,
                  412,
                  6,
                ),
                createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 6 Agricultural Livestock Essence",
                  1,
                  412,
                  6,
                ),
                createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
              ],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Hollow Combat Coat",
      alias: "HollowCombatCoat",
      cdnImage: "https://icons.lumiterra.net/item-icon-555.png",
      requiresLevel: 8,
      stats: [
        {
          name: "Combatdef",
          typeNumber: "integer",
          values: { min: 165, max: 187 },
        },
        {
          name: "Maxhp",
          typeNumber: "integer",
          values: { min: 378, max: 432 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 8 Agricultural Livestock Essence", 1, 612, 8),
            createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
            createMaterial("Lv 7 Gather Essence", 2, 406, 7),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 8 Agricultural Livestock Essence",
                  1,
                  612,
                  8,
                ),
                createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
                createMaterial("Lv 7 Gather Essence", 2, 406, 7),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 8 Agricultural Livestock Essence",
                  1,
                  612,
                  8,
                ),
                createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
                createMaterial("Lv 7 Gather Essence", 2, 406, 7),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 8 Combat Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-745.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 8 Agricultural Livestock Essence",
                  1,
                  612,
                  8,
                ),
                createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
                createMaterial("Lv 7 Gather Essence", 2, 406, 7),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Hollow Combat Coat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-555.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Hollow Combat Coat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-555.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 7 Agricultural Livestock Essence", 1, 611, 7),
            createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 7 Agricultural Livestock Essence",
                  1,
                  611,
                  7,
                ),
                createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 7 Agricultural Livestock Essence",
                  1,
                  611,
                  7,
                ),
                createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
              ],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Bronze Combat Coat",
      alias: "BronzeCombatCoat",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-579.png",
      requiresLevel: 9,
      stats: [
        {
          name: "Combatdef",
          typeNumber: "integer",
          values: { min: 187, max: 209 },
        },
        {
          name: "Maxhp",
          typeNumber: "integer",
          values: { min: 429, max: 483 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 9 Agricultural Livestock Essence", 1, 613, 9),
            createMaterial("Lv 9 Agricultural Planting Essence", 1, 610, 9),
            createMaterial("Lv 8 Gather Essence", 2, 606, 8),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 9 Agricultural Livestock Essence",
                  1,
                  613,
                  9,
                ),
                createMaterial("Lv 9 Agricultural Planting Essence", 1, 610, 9),
                createMaterial("Lv 8 Gather Essence", 2, 606, 8),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 9 Agricultural Livestock Essence",
                  1,
                  613,
                  9,
                ),
                createMaterial("Lv 9 Agricultural Planting Essence", 1, 610, 9),
                createMaterial("Lv 8 Gather Essence", 2, 606, 8),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 9 Combat Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-746.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 9 Agricultural Livestock Essence",
                  1,
                  613,
                  9,
                ),
                createMaterial("Lv 9 Agricultural Planting Essence", 1, 610, 9),
                createMaterial("Lv 8 Gather Essence", 2, 606, 8),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Bronze Combat Coat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-579.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Bronze Combat Coat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-579.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 8 Agricultural Livestock Essence", 1, 612, 8),
            createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 8 Agricultural Livestock Essence",
                  1,
                  612,
                  8,
                ),
                createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 8 Agricultural Livestock Essence",
                  1,
                  612,
                  8,
                ),
                createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
              ],
              "Usd",
            ),
          },
        },
      ],
    },
  ],
  farming: [
    {
      name: "Iron Hoe",
      alias: "IronHoe",
      cdnImage: "https://icons.lumiterra.net/item-icon-80.png",
      requiresLevel: 1,
      stats: [
        {
          name: "Combatatt",
          typeNumber: "integer",
          values: { min: 20, max: 25 },
        },
        {
          name: "Fertilitycapacity",
          typeNumber: "integer",
          values: { min: 8, max: 24 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [createMaterial("Lv 1 Gather Essence", 2, 207, 1)],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 1 Gather Essence", 2, 207, 1)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 1 Gather Essence", 2, 207, 1)],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 1 Farming Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-747.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 1 Gather Essence", 2, 207, 1),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Iron Hoe",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-80.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Iron Hoe",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-80.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 1 Gather Essence", 2, 207, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 1 Gather Essence", 2, 207, 1)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 1 Gather Essence", 2, 207, 1)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Curse Hoe",
      alias: "CurseHoe",
      cdnImage: "https://icons.lumiterra.net/item-icon-81.png",
      requiresLevel: 2,
      stats: [
        {
          name: "Combatatt",
          typeNumber: "integer",
          values: { min: 20, max: 25 },
        },
        {
          name: "Fertilitycapacity",
          typeNumber: "integer",
          values: { min: 23, max: 37 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 1 Combat Essence", 2, 216, 1),
            createMaterial("Lv 2 Gather Essence", 2, 208, 2),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial("Lv 1 Combat Essence", 2, 216, 1),
                createMaterial("Lv 2 Gather Essence", 2, 208, 2),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial("Lv 1 Combat Essence", 2, 216, 1),
                createMaterial("Lv 2 Gather Essence", 2, 208, 2),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 2 Farming Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-748.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 1 Combat Essence", 2, 216, 1),
                createMaterial("Lv 2 Gather Essence", 2, 208, 2),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Curse Hoe",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-81.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Curse Hoe",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-81.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 1 Gather Essence", 2, 207, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 1 Gather Essence", 2, 207, 1)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 1 Gather Essence", 2, 207, 1)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Blessing Hoe",
      alias: "BlessingHoe",
      cdnImage: "https://icons.lumiterra.net/item-icon-82.png",
      requiresLevel: 3,
      stats: [
        {
          name: "Combatatt",
          typeNumber: "integer",
          values: { min: 20, max: 25 },
        },
        {
          name: "Fertilitycapacity",
          typeNumber: "integer",
          values: { min: 36, max: 48 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 2 Combat Essence", 2, 217, 2),
            createMaterial("Lv 3 Gather Essence", 2, 209, 3),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial("Lv 2 Combat Essence", 2, 217, 2),
                createMaterial("Lv 3 Gather Essence", 2, 209, 3),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial("Lv 2 Combat Essence", 2, 217, 2),
                createMaterial("Lv 3 Gather Essence", 2, 209, 3),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 3 Farming Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-749.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 2 Combat Essence", 2, 217, 2),
                createMaterial("Lv 3 Gather Essence", 2, 209, 3),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Blessing Hoe",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-82.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Blessing Hoe",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-82.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 2 Gather Essence", 2, 208, 2),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 2 Gather Essence", 2, 208, 2)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 2 Gather Essence", 2, 208, 2)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Golden Hoe",
      alias: "GoldenHoe",
      cdnImage: "https://icons.lumiterra.net/item-icon-299.png",
      requiresLevel: 4,
      stats: [
        {
          name: "Combatatt",
          typeNumber: "integer",
          values: { min: 20, max: 25 },
        },
        {
          name: "Fertilitycapacity",
          typeNumber: "integer",
          values: { min: 48, max: 59 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 3 Combat Essence", 2, 218, 3),
            createMaterial("Lv 4 Gather Essence", 2, 404, 4),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial("Lv 3 Combat Essence", 2, 218, 3),
                createMaterial("Lv 4 Gather Essence", 2, 404, 4),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial("Lv 3 Combat Essence", 2, 218, 3),
                createMaterial("Lv 4 Gather Essence", 2, 404, 4),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 4 Farming Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-751.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 3 Combat Essence", 2, 218, 3),
                createMaterial("Lv 4 Gather Essence", 2, 404, 4),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Golden Hoe",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-299.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Golden Hoe",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-299.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 3 Gather Essence", 2, 209, 3),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 3 Gather Essence", 2, 209, 3)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 3 Gather Essence", 2, 209, 3)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Diamond Hoe",
      alias: "DiamondHoe",
      cdnImage: "https://icons.lumiterra.net/item-icon-305.png",
      requiresLevel: 5,
      stats: [
        {
          name: "Combatatt",
          typeNumber: "integer",
          values: { min: 20, max: 25 },
        },
        {
          name: "Fertilitycapacity",
          typeNumber: "integer",
          values: { min: 58, max: 68 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 4 Combat Essence", 2, 401, 4),
            createMaterial("Lv 5 Gather Essence", 2, 405, 5),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial("Lv 4 Combat Essence", 2, 401, 4),
                createMaterial("Lv 5 Gather Essence", 2, 405, 5),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial("Lv 4 Combat Essence", 2, 401, 4),
                createMaterial("Lv 5 Gather Essence", 2, 405, 5),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 5 Farming Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-752.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 4 Combat Essence", 2, 401, 4),
                createMaterial("Lv 5 Gather Essence", 2, 405, 5),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Diamond Hoe",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-305.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Diamond Hoe",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-305.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 4 Gather Essence", 2, 404, 4),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 4 Gather Essence", 2, 404, 4)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 4 Gather Essence", 2, 404, 4)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Star Hoe",
      alias: "StarHoe",
      cdnImage: "https://icons.lumiterra.net/item-icon-311.png",
      requiresLevel: 6,
      stats: [
        {
          name: "Combatatt",
          typeNumber: "integer",
          values: { min: 20, max: 25 },
        },
        {
          name: "Fertilitycapacity",
          typeNumber: "integer",
          values: { min: 68, max: 77 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 5 Combat Essence", 2, 402, 5),
            createMaterial("Lv 6 Gather Essence", 2, 406, 6),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial("Lv 5 Combat Essence", 2, 402, 5),
                createMaterial("Lv 6 Gather Essence", 2, 406, 6),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial("Lv 5 Combat Essence", 2, 402, 5),
                createMaterial("Lv 6 Gather Essence", 2, 406, 6),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 6 Farming Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-753.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 5 Combat Essence", 2, 402, 5),
                createMaterial("Lv 6 Gather Essence", 2, 406, 6),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Star Hoe",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-311.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Star Hoe",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-311.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 5 Gather Essence", 2, 405, 5),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 5 Gather Essence", 2, 405, 5)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 5 Gather Essence", 2, 405, 5)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Lava Hoe",
      alias: "LavaHoe",
      cdnImage: "https://icons.lumiterra.net/item-icon-544.png",
      requiresLevel: 7,
      stats: [
        {
          name: "Combatatt",
          typeNumber: "integer",
          values: { min: 20, max: 25 },
        },
        {
          name: "Fertilitycapacity",
          typeNumber: "integer",
          values: { min: 77, max: 86 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 6 Combat Essence", 2, 403, 6),
            createMaterial("Lv 7 Gather Essence", 2, 605, 7),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial("Lv 6 Combat Essence", 2, 403, 6),
                createMaterial("Lv 7 Gather Essence", 2, 605, 7),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial("Lv 6 Combat Essence", 2, 403, 6),
                createMaterial("Lv 7 Gather Essence", 2, 605, 7),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 7 Farming Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-754.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 6 Combat Essence", 2, 403, 6),
                createMaterial("Lv 7 Gather Essence", 2, 605, 7),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Lava Hoe",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-544.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Lava Hoe",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-544.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 6 Gather Essence", 2, 406, 6),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 6 Gather Essence", 2, 406, 6)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 6 Gather Essence", 2, 406, 6)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Hollow Hoe",
      alias: "HollowHoe",
      cdnImage: "https://icons.lumiterra.net/item-icon-568.png",
      requiresLevel: 8,
      stats: [
        {
          name: "Combatatt",
          typeNumber: "integer",
          values: { min: 20, max: 25 },
        },
        {
          name: "Fertilitycapacity",
          typeNumber: "integer",
          values: { min: 85, max: 94 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 7 Combat Essence", 2, 602, 7),
            createMaterial("Lv 8 Gather Essence", 2, 606, 8),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial("Lv 7 Combat Essence", 2, 602, 7),
                createMaterial("Lv 8 Gather Essence", 2, 606, 8),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial("Lv 7 Combat Essence", 2, 602, 7),
                createMaterial("Lv 8 Gather Essence", 2, 606, 8),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 8 Farming Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-755.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 7 Combat Essence", 2, 602, 7),
                createMaterial("Lv 8 Gather Essence", 2, 606, 8),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Hollow Hoe",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-568.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Hollow Hoe",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-568.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 7 Gather Essence", 2, 406, 7),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 7 Gather Essence", 2, 406, 7)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 7 Gather Essence", 2, 406, 7)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Bronze Hoe",
      alias: "BronzeHoe",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-592.png",
      requiresLevel: 9,
      stats: [
        {
          name: "Combatatt",
          typeNumber: "integer",
          values: { min: 20, max: 25 },
        },
        {
          name: "Fertilitycapacity",
          typeNumber: "integer",
          values: { min: 94, max: 101 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 8 Combat Essence", 2, 603, 8),
            createMaterial("Lv 9 Gather Essence", 2, 607, 9),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial("Lv 8 Combat Essence", 2, 603, 8),
                createMaterial("Lv 9 Gather Essence", 2, 607, 9),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial("Lv 8 Combat Essence", 2, 603, 8),
                createMaterial("Lv 9 Gather Essence", 2, 607, 9),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 9 Farming Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-746.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 8 Combat Essence", 2, 603, 8),
                createMaterial("Lv 9 Gather Essence", 2, 607, 9),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Bronze Hoe",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-592.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Bronze Hoe",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-592.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 8 Gather Essence", 2, 606, 8),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 8 Gather Essence", 2, 606, 8)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 8 Gather Essence", 2, 606, 8)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Iron Kettle",
      alias: "IronKettle",
      cdnImage: "https://icons.lumiterra.net/item-icon-84.png",
      requiresLevel: 1,
      stats: [
        {
          name: "Wateringeffect",
          typeNumber: "integer",
          values: { min: 23, max: 37 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [createMaterial("Lv 1 Gather Essence", 2, 207, 1)],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 1 Gather Essence", 2, 207, 1)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 1 Gather Essence", 2, 207, 1)],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 1 Farming Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-747.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 1 Gather Essence", 2, 207, 1),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Iron Kettle",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-84.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Iron Kettle",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-84.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 1 Gather Essence", 2, 207, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 1 Gather Essence", 2, 207, 1)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 1 Gather Essence", 2, 207, 1)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Curse Kettle",
      alias: "CurseKettle",
      cdnImage: "https://icons.lumiterra.net/item-icon-85.png",
      requiresLevel: 2,
      stats: [
        {
          name: "Wateringeffect",
          typeNumber: "integer",
          values: { min: 38, max: 52 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 1 Combat Essence", 2, 216, 1),
            createMaterial("Lv 2 Gather Essence", 2, 208, 2),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial("Lv 1 Combat Essence", 2, 216, 1),
                createMaterial("Lv 2 Gather Essence", 2, 208, 2),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial("Lv 1 Combat Essence", 2, 216, 1),
                createMaterial("Lv 2 Gather Essence", 2, 208, 2),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 2 Farming Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-748.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 1 Combat Essence", 2, 216, 1),
                createMaterial("Lv 2 Gather Essence", 2, 208, 2),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Curse Kettle",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-85.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Curse Kettle",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-85.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 1 Gather Essence", 2, 207, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 1 Gather Essence", 2, 207, 1)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 1 Gather Essence", 2, 207, 1)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Blessing Kettle",
      alias: "BlessingKettle",
      cdnImage: "https://icons.lumiterra.net/item-icon-86.png",
      requiresLevel: 3,
      stats: [
        {
          name: "Wateringeffect",
          typeNumber: "integer",
          values: { min: 53, max: 67 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 2 Combat Essence", 2, 217, 2),
            createMaterial("Lv 3 Gather Essence", 2, 209, 3),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial("Lv 2 Combat Essence", 2, 217, 2),
                createMaterial("Lv 3 Gather Essence", 2, 209, 3),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial("Lv 2 Combat Essence", 2, 217, 2),
                createMaterial("Lv 3 Gather Essence", 2, 209, 3),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 3 Farming Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-749.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 2 Combat Essence", 2, 217, 2),
                createMaterial("Lv 3 Gather Essence", 2, 209, 3),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Blessing Kettle",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-86.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Blessing Kettle",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-86.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 2 Gather Essence", 2, 208, 2),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 2 Gather Essence", 2, 208, 2)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 2 Gather Essence", 2, 208, 2)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Golden Kettle",
      alias: "GoldenKettle",
      cdnImage: "https://icons.lumiterra.net/item-icon-304.png",
      requiresLevel: 4,
      stats: [
        {
          name: "Wateringeffect",
          typeNumber: "integer",
          values: { min: 68, max: 72 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 3 Combat Essence", 2, 218, 3),
            createMaterial("Lv 4 Gather Essence", 2, 404, 4),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial("Lv 3 Combat Essence", 2, 218, 3),
                createMaterial("Lv 4 Gather Essence", 2, 404, 4),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial("Lv 3 Combat Essence", 2, 218, 3),
                createMaterial("Lv 4 Gather Essence", 2, 404, 4),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 4 Farming Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-751.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 3 Combat Essence", 2, 218, 3),
                createMaterial("Lv 4 Gather Essence", 2, 404, 4),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Golden Kettle",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-304.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Golden Kettle",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-304.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 3 Gather Essence", 2, 209, 3),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 3 Gather Essence", 2, 209, 3)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 3 Gather Essence", 2, 209, 3)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Diamond Kettle",
      alias: "DiamondKettle",
      cdnImage: "https://icons.lumiterra.net/item-icon-310.png",
      requiresLevel: 5,
      stats: [
        {
          name: "Wateringeffect",
          typeNumber: "integer",
          values: { min: 83, max: 97 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 4 Combat Essence", 2, 401, 4),
            createMaterial("Lv 5 Gather Essence", 2, 405, 5),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial("Lv 4 Combat Essence", 2, 401, 4),
                createMaterial("Lv 5 Gather Essence", 2, 405, 5),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial("Lv 4 Combat Essence", 2, 401, 4),
                createMaterial("Lv 5 Gather Essence", 2, 405, 5),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 5 Farming Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-752.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 4 Combat Essence", 2, 401, 4),
                createMaterial("Lv 5 Gather Essence", 2, 405, 5),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Diamond Kettle",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-310.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Diamond Kettle",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-310.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 4 Gather Essence", 2, 404, 4),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 4 Gather Essence", 2, 404, 4)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 4 Gather Essence", 2, 404, 4)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Star Kettle",
      alias: "StarKettle",
      cdnImage: "https://icons.lumiterra.net/item-icon-316.png",
      requiresLevel: 6,
      stats: [
        {
          name: "Wateringeffect",
          typeNumber: "integer",
          values: { min: 98, max: 112 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 5 Combat Essence", 2, 402, 5),
            createMaterial("Lv 6 Gather Essence", 2, 406, 6),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial("Lv 5 Combat Essence", 2, 402, 5),
                createMaterial("Lv 6 Gather Essence", 2, 406, 6),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial("Lv 5 Combat Essence", 2, 402, 5),
                createMaterial("Lv 6 Gather Essence", 2, 406, 6),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 6 Farming Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-753.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 5 Combat Essence", 2, 402, 5),
                createMaterial("Lv 6 Gather Essence", 2, 406, 6),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Star Kettle",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-316.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Star Kettle",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-316.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 5 Gather Essence", 2, 405, 5),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 5 Gather Essence", 2, 405, 5)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 5 Gather Essence", 2, 405, 5)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Lava Kettle",
      alias: "LavaKettle",
      cdnImage: "https://icons.lumiterra.net/item-icon-543.png",
      requiresLevel: 7,
      stats: [
        {
          name: "Wateringeffect",
          typeNumber: "integer",
          values: { min: 113, max: 127 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 6 Combat Essence", 2, 403, 6),
            createMaterial("Lv 7 Gather Essence", 2, 605, 7),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial("Lv 6 Combat Essence", 2, 403, 6),
                createMaterial("Lv 7 Gather Essence", 2, 605, 7),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial("Lv 6 Combat Essence", 2, 403, 6),
                createMaterial("Lv 7 Gather Essence", 2, 605, 7),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 7 Farming Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-754.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 6 Combat Essence", 2, 403, 6),
                createMaterial("Lv 7 Gather Essence", 2, 605, 7),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Lava Kettle",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-543.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Lava Kettle",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-543.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 6 Gather Essence", 2, 406, 6),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 6 Gather Essence", 2, 406, 6)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 6 Gather Essence", 2, 406, 6)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Hollow Kettle",
      alias: "HollowKettle",
      cdnImage: "https://icons.lumiterra.net/item-icon-567.png",
      requiresLevel: 8,
      stats: [
        {
          name: "Wateringeffect",
          typeNumber: "integer",
          values: { min: 128, max: 142 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 7 Combat Essence", 2, 602, 7),
            createMaterial("Lv 8 Gather Essence", 2, 606, 8),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial("Lv 7 Combat Essence", 2, 602, 7),
                createMaterial("Lv 8 Gather Essence", 2, 606, 8),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial("Lv 7 Combat Essence", 2, 602, 7),
                createMaterial("Lv 8 Gather Essence", 2, 606, 8),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 8 Farming Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-755.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 7 Combat Essence", 2, 602, 7),
                createMaterial("Lv 8 Gather Essence", 2, 606, 8),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Hollow Kettle",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-567.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Hollow Kettle",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-567.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 7 Gather Essence", 2, 406, 7),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 7 Gather Essence", 2, 406, 7)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 7 Gather Essence", 2, 406, 7)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Bronze Kettle",
      alias: "BronzeKettle",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-591.png",
      requiresLevel: 9,
      stats: [
        {
          name: "Wateringeffect",
          typeNumber: "integer",
          values: { min: 143, max: 157 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 8 Combat Essence", 2, 603, 8),
            createMaterial("Lv 9 Gather Essence", 2, 607, 9),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial("Lv 8 Combat Essence", 2, 603, 8),
                createMaterial("Lv 9 Gather Essence", 2, 607, 9),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial("Lv 8 Combat Essence", 2, 603, 8),
                createMaterial("Lv 9 Gather Essence", 2, 607, 9),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 9 Farming Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-746.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 8 Combat Essence", 2, 603, 8),
                createMaterial("Lv 9 Gather Essence", 2, 607, 9),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Bronze Kettle",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-591.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Bronze Kettle",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-591.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 8 Gather Essence", 2, 606, 8),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 8 Gather Essence", 2, 606, 8)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 8 Gather Essence", 2, 606, 8)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Copper Brush",
      alias: "CopperBrush",
      cdnImage: "https://icons.lumiterra.net/item-icon-453.png",
      requiresLevel: 1,
      stats: [
        {
          name: "Pethappinesscapacity",
          typeNumber: "integer",
          values: { min: 8, max: 24 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [createMaterial("Lv 1 Gather Essence", 2, 207, 1)],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 1 Gather Essence", 2, 207, 1)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 1 Gather Essence", 2, 207, 1)],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 1 Farming Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-747.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 1 Gather Essence", 2, 207, 1),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Copper Brush",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-453.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Copper Brush",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-453.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 1 Gather Essence", 2, 207, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 1 Gather Essence", 2, 207, 1)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 1 Gather Essence", 2, 207, 1)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Iron Brush",
      alias: "IronBrush",
      cdnImage: "https://icons.lumiterra.net/item-icon-454.png",
      requiresLevel: 2,
      stats: [
        {
          name: "Pethappinesscapacity",
          typeNumber: "integer",
          values: { min: 23, max: 37 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 1 Combat Essence", 2, 216, 1),
            createMaterial("Lv 2 Gather Essence", 2, 208, 2),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial("Lv 1 Combat Essence", 2, 216, 1),
                createMaterial("Lv 2 Gather Essence", 2, 208, 2),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial("Lv 1 Combat Essence", 2, 216, 1),
                createMaterial("Lv 2 Gather Essence", 2, 208, 2),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 2 Farming Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-748.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 1 Combat Essence", 2, 216, 1),
                createMaterial("Lv 2 Gather Essence", 2, 208, 2),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Iron Brush",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-454.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Iron Brush",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-454.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 1 Gather Essence", 2, 207, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 1 Gather Essence", 2, 207, 1)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 1 Gather Essence", 2, 207, 1)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Crystal Brush",
      alias: "CrystalBrush",
      cdnImage: "https://icons.lumiterra.net/item-icon-455.png",
      requiresLevel: 3,
      stats: [
        {
          name: "Pethappinesscapacity",
          typeNumber: "integer",
          values: { min: 36, max: 48 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 2 Combat Essence", 2, 217, 2),
            createMaterial("Lv 3 Gather Essence", 2, 209, 3),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial("Lv 2 Combat Essence", 2, 217, 2),
                createMaterial("Lv 3 Gather Essence", 2, 209, 3),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial("Lv 2 Combat Essence", 2, 217, 2),
                createMaterial("Lv 3 Gather Essence", 2, 209, 3),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 3 Farming Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-749.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 2 Combat Essence", 2, 217, 2),
                createMaterial("Lv 3 Gather Essence", 2, 209, 3),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Crystal Brush",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-455.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Crystal Brush",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-455.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 2 Gather Essence", 2, 208, 2),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 2 Gather Essence", 2, 208, 2)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 2 Gather Essence", 2, 208, 2)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Golden Brush",
      alias: "GoldenBrush",
      cdnImage: "https://icons.lumiterra.net/item-icon-456.png",
      requiresLevel: 4,
      stats: [
        {
          name: "Pethappinesscapacity",
          typeNumber: "integer",
          values: { min: 48, max: 59 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 3 Combat Essence", 2, 218, 3),
            createMaterial("Lv 4 Gather Essence", 2, 404, 4),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial("Lv 3 Combat Essence", 2, 218, 3),
                createMaterial("Lv 4 Gather Essence", 2, 404, 4),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial("Lv 3 Combat Essence", 2, 218, 3),
                createMaterial("Lv 4 Gather Essence", 2, 404, 4),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 4 Farming Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-751.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 3 Combat Essence", 2, 218, 3),
                createMaterial("Lv 4 Gather Essence", 2, 404, 4),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Golden Brush",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-456.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Golden Brush",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-456.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 3 Gather Essence", 2, 209, 3),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 3 Gather Essence", 2, 209, 3)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 3 Gather Essence", 2, 209, 3)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Diamond Brush",
      alias: "DiamondBrush",
      cdnImage: "https://icons.lumiterra.net/item-icon-457.png",
      requiresLevel: 5,
      stats: [
        {
          name: "Pethappinesscapacity",
          typeNumber: "integer",
          values: { min: 58, max: 68 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 4 Combat Essence", 2, 401, 4),
            createMaterial("Lv 5 Gather Essence", 2, 405, 5),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial("Lv 4 Combat Essence", 2, 401, 4),
                createMaterial("Lv 5 Gather Essence", 2, 405, 5),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial("Lv 4 Combat Essence", 2, 401, 4),
                createMaterial("Lv 5 Gather Essence", 2, 405, 5),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 5 Farming Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-752.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 4 Combat Essence", 2, 401, 4),
                createMaterial("Lv 5 Gather Essence", 2, 405, 5),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Diamond Brush",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-457.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Diamond Brush",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-457.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 4 Gather Essence", 2, 404, 4),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 4 Gather Essence", 2, 404, 4)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 4 Gather Essence", 2, 404, 4)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Starlight Brush",
      alias: "StarlightBrush",
      cdnImage: "https://icons.lumiterra.net/item-icon-458.png",
      requiresLevel: 6,
      stats: [
        {
          name: "Pethappinesscapacity",
          typeNumber: "integer",
          values: { min: 68, max: 77 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 5 Combat Essence", 2, 402, 5),
            createMaterial("Lv 6 Gather Essence", 2, 406, 6),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial("Lv 5 Combat Essence", 2, 402, 5),
                createMaterial("Lv 6 Gather Essence", 2, 406, 6),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial("Lv 5 Combat Essence", 2, 402, 5),
                createMaterial("Lv 6 Gather Essence", 2, 406, 6),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 6 Farming Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-753.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 5 Combat Essence", 2, 402, 5),
                createMaterial("Lv 6 Gather Essence", 2, 406, 6),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Starlight Brush",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-458.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Starlight Brush",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-458.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 5 Gather Essence", 2, 405, 5),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 5 Gather Essence", 2, 405, 5)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 5 Gather Essence", 2, 405, 5)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Lava Brush",
      alias: "LavaBrush",
      cdnImage: "https://icons.lumiterra.net/item-icon-545.png",
      requiresLevel: 7,
      stats: [
        {
          name: "Pethappinesscapacity",
          typeNumber: "integer",
          values: { min: 77, max: 86 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 6 Combat Essence", 2, 403, 6),
            createMaterial("Lv 7 Gather Essence", 2, 605, 7),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial("Lv 6 Combat Essence", 2, 403, 6),
                createMaterial("Lv 7 Gather Essence", 2, 605, 7),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial("Lv 6 Combat Essence", 2, 403, 6),
                createMaterial("Lv 7 Gather Essence", 2, 605, 7),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 7 Farming Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-754.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 6 Combat Essence", 2, 403, 6),
                createMaterial("Lv 7 Gather Essence", 2, 605, 7),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Lava Brush",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-545.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Lava Brush",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-545.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 6 Gather Essence", 2, 406, 6),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 6 Gather Essence", 2, 406, 6)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 6 Gather Essence", 2, 406, 6)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Hollow Brush",
      alias: "HollowBrush",
      cdnImage: "https://icons.lumiterra.net/item-icon-569.png",
      requiresLevel: 8,
      stats: [
        {
          name: "Pethappinesscapacity",
          typeNumber: "integer",
          values: { min: 85, max: 94 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 7 Combat Essence", 2, 602, 7),
            createMaterial("Lv 8 Gather Essence", 2, 606, 8),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial("Lv 7 Combat Essence", 2, 602, 7),
                createMaterial("Lv 8 Gather Essence", 2, 606, 8),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial("Lv 7 Combat Essence", 2, 602, 7),
                createMaterial("Lv 8 Gather Essence", 2, 606, 8),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 8 Farming Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-755.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 7 Combat Essence", 2, 602, 7),
                createMaterial("Lv 8 Gather Essence", 2, 606, 8),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Hollow Brush",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-569.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Hollow Brush",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-569.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 7 Gather Essence", 2, 406, 7),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 7 Gather Essence", 2, 406, 7)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 7 Gather Essence", 2, 406, 7)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Bronze Brush",
      alias: "BronzeBrush",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-593.png",
      requiresLevel: 9,
      stats: [
        {
          name: "Pethappinesscapacity",
          typeNumber: "integer",
          values: { min: 94, max: 101 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 8 Combat Essence", 2, 603, 8),
            createMaterial("Lv 9 Gather Essence", 2, 607, 9),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial("Lv 8 Combat Essence", 2, 603, 8),
                createMaterial("Lv 9 Gather Essence", 2, 607, 9),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial("Lv 8 Combat Essence", 2, 603, 8),
                createMaterial("Lv 9 Gather Essence", 2, 607, 9),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 9 Farming Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-746.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 8 Combat Essence", 2, 603, 8),
                createMaterial("Lv 9 Gather Essence", 2, 607, 9),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Bronze Brush",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-593.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Bronze Brush",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-593.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 8 Gather Essence", 2, 606, 8),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 8 Gather Essence", 2, 606, 8)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 8 Gather Essence", 2, 606, 8)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Farming Shoes",
      alias: "FarmingShoesLv1",
      cdnImage: "https://icons.lumiterra.net/item-icon-110.png",
      requiresLevel: 1,
      stats: [
        {
          name: "Breedingproficiency",
          typeNumber: "integer",
          values: { min: 9, max: 27 },
        },
        {
          name: "Plantigproficiency",
          typeNumber: "integer",
          values: { min: 9, max: 27 },
        },
        {
          name: "Maxfertility",
          typeNumber: "integer",
          values: { min: 184, max: 551 },
        },
        {
          name: "Maxpethappiness",
          typeNumber: "integer",
          values: { min: 46, max: 138 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [createMaterial("Lv 1 Gather Essence", 2, 207, 1)],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 1 Gather Essence", 2, 207, 1)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 1 Gather Essence", 2, 207, 1)],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 1 Farming Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-747.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 1 Gather Essence", 2, 207, 1),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Farming Shoes",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-110.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Farming Shoes",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-110.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 1 Gather Essence", 2, 207, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 1 Gather Essence", 2, 207, 1)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 1 Gather Essence", 2, 207, 1)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Farming Shoes",
      alias: "FarmingShoesLv2",
      cdnImage: "https://icons.lumiterra.net/item-icon-111.png",
      requiresLevel: 2,
      stats: [
        {
          name: "Breedingproficiency",
          typeNumber: "integer",
          values: { min: 27, max: 44 },
        },
        {
          name: "Plantigproficiency",
          typeNumber: "integer",
          values: { min: 27, max: 44 },
        },
        {
          name: "Maxfertility",
          typeNumber: "integer",
          values: { min: 551, max: 918 },
        },
        {
          name: "Maxpethappiness",
          typeNumber: "integer",
          values: { min: 138, max: 230 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 1 Combat Essence", 2, 216, 1),
            createMaterial("Lv 2 Gather Essence", 2, 208, 2),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial("Lv 1 Combat Essence", 2, 216, 1),
                createMaterial("Lv 2 Gather Essence", 2, 208, 2),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial("Lv 1 Combat Essence", 2, 216, 1),
                createMaterial("Lv 2 Gather Essence", 2, 208, 2),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 2 Farming Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-748.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 1 Combat Essence", 2, 216, 1),
                createMaterial("Lv 2 Gather Essence", 2, 208, 2),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Farming Shoes",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-111.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Farming Shoes",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-111.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 1 Gather Essence", 2, 207, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 1 Gather Essence", 2, 207, 1)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 1 Gather Essence", 2, 207, 1)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Farming Shoes",
      alias: "FarmingShoesLv3",
      cdnImage: "https://icons.lumiterra.net/item-icon-112.png",
      requiresLevel: 3,
      stats: [
        {
          name: "Breedingproficiency",
          typeNumber: "integer",
          values: { min: 44, max: 62 },
        },
        {
          name: "Plantigproficiency",
          typeNumber: "integer",
          values: { min: 44, max: 62 },
        },
        {
          name: "Maxfertility",
          typeNumber: "integer",
          values: { min: 918, max: 1285 },
        },
        {
          name: "Maxpethappiness",
          typeNumber: "integer",
          values: { min: 230, max: 321 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 2 Combat Essence", 2, 217, 2),
            createMaterial("Lv 3 Gather Essence", 2, 209, 3),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial("Lv 2 Combat Essence", 2, 217, 2),
                createMaterial("Lv 3 Gather Essence", 2, 209, 3),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial("Lv 2 Combat Essence", 2, 217, 2),
                createMaterial("Lv 3 Gather Essence", 2, 209, 3),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 3 Farming Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-749.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 2 Combat Essence", 2, 217, 2),
                createMaterial("Lv 3 Gather Essence", 2, 209, 3),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Farming Shoes",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-112.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Farming Shoes",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-112.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 2 Gather Essence", 2, 208, 2),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 2 Gather Essence", 2, 208, 2)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 2 Gather Essence", 2, 208, 2)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Golden Farmer Shoes",
      alias: "GoldenFarmerShoes",
      cdnImage: "https://icons.lumiterra.net/item-icon-354.png",
      requiresLevel: 4,
      stats: [
        {
          name: "Breedingproficiency",
          typeNumber: "integer",
          values: { min: 62, max: 80 },
        },
        {
          name: "Plantigproficiency",
          typeNumber: "integer",
          values: { min: 62, max: 80 },
        },
        {
          name: "Maxfertility",
          typeNumber: "integer",
          values: { min: 1285, max: 1625 },
        },
        {
          name: "Maxpethappiness",
          typeNumber: "integer",
          values: { min: 321, max: 413 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 3 Combat Essence", 2, 218, 3),
            createMaterial("Lv 4 Gather Essence", 2, 404, 4),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial("Lv 3 Combat Essence", 2, 218, 3),
                createMaterial("Lv 4 Gather Essence", 2, 404, 4),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial("Lv 3 Combat Essence", 2, 218, 3),
                createMaterial("Lv 4 Gather Essence", 2, 404, 4),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 4 Farming Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-751.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 3 Combat Essence", 2, 218, 3),
                createMaterial("Lv 4 Gather Essence", 2, 404, 4),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Golden Farmer Shoes",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-354.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Golden Farmer Shoes",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-354.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 3 Gather Essence", 2, 209, 3),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 3 Gather Essence", 2, 209, 3)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 3 Gather Essence", 2, 209, 3)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Diamond Farmer Shoes",
      alias: "DiamondFarmerShoes",
      cdnImage: "https://icons.lumiterra.net/item-icon-359.png",
      requiresLevel: 5,
      stats: [
        {
          name: "Breedingproficiency",
          typeNumber: "integer",
          values: { min: 80, max: 97 },
        },
        {
          name: "Plantigproficiency",
          typeNumber: "integer",
          values: { min: 80, max: 97 },
        },
        {
          name: "Maxfertility",
          typeNumber: "integer",
          values: { min: 1625, max: 2019 },
        },
        {
          name: "Maxpethappiness",
          typeNumber: "integer",
          values: { min: 413, max: 505 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 4 Combat Essence", 2, 401, 4),
            createMaterial("Lv 5 Gather Essence", 2, 405, 5),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial("Lv 4 Combat Essence", 2, 401, 4),
                createMaterial("Lv 5 Gather Essence", 2, 405, 5),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial("Lv 4 Combat Essence", 2, 401, 4),
                createMaterial("Lv 5 Gather Essence", 2, 405, 5),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 5 Farming Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-752.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 4 Combat Essence", 2, 401, 4),
                createMaterial("Lv 5 Gather Essence", 2, 405, 5),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Diamond Farmer Shoes",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-359.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Diamond Farmer Shoes",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-359.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 4 Gather Essence", 2, 404, 4),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 4 Gather Essence", 2, 404, 4)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 4 Gather Essence", 2, 404, 4)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Star Farmer Shoes",
      alias: "StarFarmerShoes",
      cdnImage: "https://icons.lumiterra.net/item-icon-364.png",
      requiresLevel: 6,
      stats: [
        {
          name: "Breedingproficiency",
          typeNumber: "integer",
          values: { min: 97, max: 115 },
        },
        {
          name: "Plantigproficiency",
          typeNumber: "integer",
          values: { min: 97, max: 115 },
        },
        {
          name: "Maxfertility",
          typeNumber: "integer",
          values: { min: 2019, max: 2386 },
        },
        {
          name: "Maxpethappiness",
          typeNumber: "integer",
          values: { min: 505, max: 597 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 5 Combat Essence", 2, 402, 5),
            createMaterial("Lv 6 Gather Essence", 2, 406, 6),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial("Lv 5 Combat Essence", 2, 402, 5),
                createMaterial("Lv 6 Gather Essence", 2, 406, 6),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial("Lv 5 Combat Essence", 2, 402, 5),
                createMaterial("Lv 6 Gather Essence", 2, 406, 6),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 6 Farming Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-753.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 5 Combat Essence", 2, 402, 5),
                createMaterial("Lv 6 Gather Essence", 2, 406, 6),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Star Farmer Shoes",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-364.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Star Farmer Shoes",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-364.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 5 Gather Essence", 2, 405, 5),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 5 Gather Essence", 2, 405, 5)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 5 Gather Essence", 2, 405, 5)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Lava Farmer Shoes",
      alias: "LavaFarmerShoes",
      cdnImage: "https://icons.lumiterra.net/item-icon-550.png",
      requiresLevel: 7,
      stats: [
        {
          name: "Breedingproficiency",
          typeNumber: "integer",
          values: { min: 115, max: 133 },
        },
        {
          name: "Plantigproficiency",
          typeNumber: "integer",
          values: { min: 115, max: 133 },
        },
        {
          name: "Maxfertility",
          typeNumber: "integer",
          values: { min: 2386, max: 2753 },
        },
        {
          name: "Maxpethappiness",
          typeNumber: "integer",
          values: { min: 597, max: 688 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 6 Combat Essence", 2, 403, 6),
            createMaterial("Lv 7 Gather Essence", 2, 605, 7),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial("Lv 6 Combat Essence", 2, 403, 6),
                createMaterial("Lv 7 Gather Essence", 2, 605, 7),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial("Lv 6 Combat Essence", 2, 403, 6),
                createMaterial("Lv 7 Gather Essence", 2, 605, 7),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 7 Farming Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-754.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 6 Combat Essence", 2, 403, 6),
                createMaterial("Lv 7 Gather Essence", 2, 605, 7),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Lava Farmer Shoes",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-550.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Lava Farmer Shoes",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-550.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 6 Gather Essence", 2, 406, 6),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 6 Gather Essence", 2, 406, 6)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 6 Gather Essence", 2, 406, 6)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Hollow Farmer Shoes",
      alias: "HollowFarmerShoes",
      cdnImage: "https://icons.lumiterra.net/item-icon-574.png",
      requiresLevel: 8,
      stats: [
        {
          name: "Breedingproficiency",
          typeNumber: "integer",
          values: { min: 133, max: 150 },
        },
        {
          name: "Plantigproficiency",
          typeNumber: "integer",
          values: { min: 133, max: 150 },
        },
        {
          name: "Maxfertility",
          typeNumber: "integer",
          values: { min: 2753, max: 3120 },
        },
        {
          name: "Maxpethappiness",
          typeNumber: "integer",
          values: { min: 688, max: 780 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 7 Combat Essence", 2, 602, 7),
            createMaterial("Lv 8 Gather Essence", 2, 606, 8),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial("Lv 7 Combat Essence", 2, 602, 7),
                createMaterial("Lv 8 Gather Essence", 2, 606, 8),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial("Lv 7 Combat Essence", 2, 602, 7),
                createMaterial("Lv 8 Gather Essence", 2, 606, 8),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 8 Farming Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-755.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 7 Combat Essence", 2, 602, 7),
                createMaterial("Lv 8 Gather Essence", 2, 606, 8),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Hollow Farmer Shoes",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-574.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Hollow Farmer Shoes",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-574.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 7 Gather Essence", 2, 406, 7),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 7 Gather Essence", 2, 406, 7)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 7 Gather Essence", 2, 406, 7)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Bronze Farmer Shoes",
      alias: "BronzeFarmerShoes",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-598.png",
      requiresLevel: 9,
      stats: [
        {
          name: "Breedingproficiency",
          typeNumber: "integer",
          values: { min: 150, max: 168 },
        },
        {
          name: "Plantigproficiency",
          typeNumber: "integer",
          values: { min: 150, max: 168 },
        },
        {
          name: "Maxfertility",
          typeNumber: "integer",
          values: { min: 3120, max: 3487 },
        },
        {
          name: "Maxpethappiness",
          typeNumber: "integer",
          values: { min: 780, max: 872 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 8 Combat Essence", 2, 603, 8),
            createMaterial("Lv 9 Gather Essence", 2, 607, 9),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial("Lv 8 Combat Essence", 2, 603, 8),
                createMaterial("Lv 9 Gather Essence", 2, 607, 9),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial("Lv 8 Combat Essence", 2, 603, 8),
                createMaterial("Lv 9 Gather Essence", 2, 607, 9),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 9 Farming Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-746.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 8 Combat Essence", 2, 603, 8),
                createMaterial("Lv 9 Gather Essence", 2, 607, 9),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Bronze Farmer Shoes",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-598.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Bronze Farmer Shoes",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-598.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 8 Gather Essence", 2, 606, 8),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 8 Gather Essence", 2, 606, 8)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 8 Gather Essence", 2, 606, 8)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Farming Pants",
      alias: "FarmingPantsLv1",
      cdnImage: "https://icons.lumiterra.net/item-icon-104.png",
      requiresLevel: 1,
      stats: [
        {
          name: "Breedingproficiency",
          typeNumber: "integer",
          values: { min: 9, max: 27 },
        },
        {
          name: "Plantigproficiency",
          typeNumber: "integer",
          values: { min: 9, max: 27 },
        },
        {
          name: "Maxfertility",
          typeNumber: "integer",
          values: { min: 175, max: 524 },
        },
        {
          name: "Maxpethappiness",
          typeNumber: "integer",
          values: { min: 44, max: 131 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [createMaterial("Lv 1 Gather Essence", 2, 207, 1)],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 1 Gather Essence", 2, 207, 1)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 1 Gather Essence", 2, 207, 1)],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 1 Farming Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-747.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 1 Gather Essence", 2, 207, 1),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Farming Pants",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-104.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Farming Pants",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-104.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 1 Gather Essence", 2, 207, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 1 Gather Essence", 2, 207, 1)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 1 Gather Essence", 2, 207, 1)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Farming Pants",
      alias: "FarmingPantsLv2",
      cdnImage: "https://icons.lumiterra.net/item-icon-105.png",
      requiresLevel: 2,
      stats: [
        {
          name: "Breedingproficiency",
          typeNumber: "integer",
          values: { min: 27, max: 44 },
        },
        {
          name: "Plantigproficiency",
          typeNumber: "integer",
          values: { min: 27, max: 44 },
        },
        {
          name: "Maxfertility",
          typeNumber: "integer",
          values: { min: 524, max: 873 },
        },
        {
          name: "Maxpethappiness",
          typeNumber: "integer",
          values: { min: 131, max: 218 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 1 Combat Essence", 2, 216, 1),
            createMaterial("Lv 2 Gather Essence", 2, 208, 2),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial("Lv 1 Combat Essence", 2, 216, 1),
                createMaterial("Lv 2 Gather Essence", 2, 208, 2),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial("Lv 1 Combat Essence", 2, 216, 1),
                createMaterial("Lv 2 Gather Essence", 2, 208, 2),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 2 Farming Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-748.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 1 Combat Essence", 2, 216, 1),
                createMaterial("Lv 2 Gather Essence", 2, 208, 2),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Farming Pants",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-105.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Farming Pants",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-105.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 1 Gather Essence", 2, 207, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 1 Gather Essence", 2, 207, 1)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 1 Gather Essence", 2, 207, 1)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Farming Pants",
      alias: "FarmingPantsLv3",
      cdnImage: "https://icons.lumiterra.net/item-icon-106.png",
      requiresLevel: 3,
      stats: [
        {
          name: "Breedingproficiency",
          typeNumber: "integer",
          values: { min: 44, max: 62 },
        },
        {
          name: "Plantigproficiency",
          typeNumber: "integer",
          values: { min: 44, max: 62 },
        },
        {
          name: "Maxfertility",
          typeNumber: "integer",
          values: { min: 873, max: 1222 },
        },
        {
          name: "Maxpethappiness",
          typeNumber: "integer",
          values: { min: 218, max: 306 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 2 Combat Essence", 2, 217, 2),
            createMaterial("Lv 3 Gather Essence", 2, 209, 3),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial("Lv 2 Combat Essence", 2, 217, 2),
                createMaterial("Lv 3 Gather Essence", 2, 209, 3),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial("Lv 2 Combat Essence", 2, 217, 2),
                createMaterial("Lv 3 Gather Essence", 2, 209, 3),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 3 Farming Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-749.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 2 Combat Essence", 2, 217, 2),
                createMaterial("Lv 3 Gather Essence", 2, 209, 3),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Farming Pants",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-106.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Farming Pants",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-106.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 2 Gather Essence", 2, 208, 2),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 2 Gather Essence", 2, 208, 2)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 2 Gather Essence", 2, 208, 2)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Golden Farmer Pants",
      alias: "GoldenFarmerPants",
      cdnImage: "https://icons.lumiterra.net/item-icon-353.png",
      requiresLevel: 4,
      stats: [
        {
          name: "Breedingproficiency",
          typeNumber: "integer",
          values: { min: 62, max: 80 },
        },
        {
          name: "Plantigproficiency",
          typeNumber: "integer",
          values: { min: 62, max: 80 },
        },
        {
          name: "Maxfertility",
          typeNumber: "integer",
          values: { min: 1222, max: 1571 },
        },
        {
          name: "Maxpethappiness",
          typeNumber: "integer",
          values: { min: 306, max: 394 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 3 Combat Essence", 2, 218, 3),
            createMaterial("Lv 4 Gather Essence", 2, 404, 4),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial("Lv 3 Combat Essence", 2, 218, 3),
                createMaterial("Lv 4 Gather Essence", 2, 404, 4),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial("Lv 3 Combat Essence", 2, 218, 3),
                createMaterial("Lv 4 Gather Essence", 2, 404, 4),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 4 Farming Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-751.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 3 Combat Essence", 2, 218, 3),
                createMaterial("Lv 4 Gather Essence", 2, 404, 4),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Golden Farmer Pants",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-353.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Golden Farmer Pants",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-353.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 3 Gather Essence", 2, 209, 3),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 3 Gather Essence", 2, 209, 3)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 3 Gather Essence", 2, 209, 3)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Diamond Farmer Pants",
      alias: "DiamondFarmerPants",
      cdnImage: "https://icons.lumiterra.net/item-icon-358.png",
      requiresLevel: 5,
      stats: [
        {
          name: "Breedingproficiency",
          typeNumber: "integer",
          values: { min: 80, max: 97 },
        },
        {
          name: "Plantigproficiency",
          typeNumber: "integer",
          values: { min: 80, max: 97 },
        },
        {
          name: "Maxfertility",
          typeNumber: "integer",
          values: { min: 1571, max: 1920 },
        },
        {
          name: "Maxpethappiness",
          typeNumber: "integer",
          values: { min: 394, max: 482 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 4 Combat Essence", 2, 401, 4),
            createMaterial("Lv 5 Gather Essence", 2, 405, 5),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial("Lv 4 Combat Essence", 2, 401, 4),
                createMaterial("Lv 5 Gather Essence", 2, 405, 5),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial("Lv 4 Combat Essence", 2, 401, 4),
                createMaterial("Lv 5 Gather Essence", 2, 405, 5),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 5 Farming Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-752.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 4 Combat Essence", 2, 401, 4),
                createMaterial("Lv 5 Gather Essence", 2, 405, 5),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Diamond Farmer Pants",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-358.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Diamond Farmer Pants",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-358.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 4 Gather Essence", 2, 404, 4),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 4 Gather Essence", 2, 404, 4)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 4 Gather Essence", 2, 404, 4)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Star Farmer Pants",
      alias: "StarFarmerPants",
      cdnImage: "https://icons.lumiterra.net/item-icon-363.png",
      requiresLevel: 6,
      stats: [
        {
          name: "Breedingproficiency",
          typeNumber: "integer",
          values: { min: 97, max: 115 },
        },
        {
          name: "Plantigproficiency",
          typeNumber: "integer",
          values: { min: 97, max: 115 },
        },
        {
          name: "Maxfertility",
          typeNumber: "integer",
          values: { min: 1920, max: 2269 },
        },
        {
          name: "Maxpethappiness",
          typeNumber: "integer",
          values: { min: 482, max: 570 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 5 Combat Essence", 2, 402, 5),
            createMaterial("Lv 6 Gather Essence", 2, 406, 6),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial("Lv 5 Combat Essence", 2, 402, 5),
                createMaterial("Lv 6 Gather Essence", 2, 406, 6),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial("Lv 5 Combat Essence", 2, 402, 5),
                createMaterial("Lv 6 Gather Essence", 2, 406, 6),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 6 Farming Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-753.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 5 Combat Essence", 2, 402, 5),
                createMaterial("Lv 6 Gather Essence", 2, 406, 6),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Star Farmer Pants",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-363.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Star Farmer Pants",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-363.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 5 Gather Essence", 2, 405, 5),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 5 Gather Essence", 2, 405, 5)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 5 Gather Essence", 2, 405, 5)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Lava Farmer Pants",
      alias: "LavaFarmerPants",
      cdnImage: "https://icons.lumiterra.net/item-icon-548.png",
      requiresLevel: 7,
      stats: [
        {
          name: "Breedingproficiency",
          typeNumber: "integer",
          values: { min: 115, max: 133 },
        },
        {
          name: "Plantigproficiency",
          typeNumber: "integer",
          values: { min: 115, max: 133 },
        },
        {
          name: "Maxfertility",
          typeNumber: "integer",
          values: { min: 2269, max: 2618 },
        },
        {
          name: "Maxpethappiness",
          typeNumber: "integer",
          values: { min: 570, max: 658 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 6 Combat Essence", 2, 403, 6),
            createMaterial("Lv 7 Gather Essence", 2, 605, 7),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial("Lv 6 Combat Essence", 2, 403, 6),
                createMaterial("Lv 7 Gather Essence", 2, 605, 7),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial("Lv 6 Combat Essence", 2, 403, 6),
                createMaterial("Lv 7 Gather Essence", 2, 605, 7),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 7 Farming Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-754.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 6 Combat Essence", 2, 403, 6),
                createMaterial("Lv 7 Gather Essence", 2, 605, 7),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Lava Farmer Pants",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-548.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Lava Farmer Pants",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-548.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 6 Gather Essence", 2, 406, 6),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 6 Gather Essence", 2, 406, 6)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 6 Gather Essence", 2, 406, 6)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Hollow Farmer Pants",
      alias: "HollowFarmerPants",
      cdnImage: "https://icons.lumiterra.net/item-icon-572.png",
      requiresLevel: 8,
      stats: [
        {
          name: "Breedingproficiency",
          typeNumber: "integer",
          values: { min: 133, max: 150 },
        },
        {
          name: "Plantigproficiency",
          typeNumber: "integer",
          values: { min: 133, max: 150 },
        },
        {
          name: "Maxfertility",
          typeNumber: "integer",
          values: { min: 2618, max: 2967 },
        },
        {
          name: "Maxpethappiness",
          typeNumber: "integer",
          values: { min: 658, max: 746 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 7 Combat Essence", 2, 602, 7),
            createMaterial("Lv 8 Gather Essence", 2, 606, 8),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial("Lv 7 Combat Essence", 2, 602, 7),
                createMaterial("Lv 8 Gather Essence", 2, 606, 8),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial("Lv 7 Combat Essence", 2, 602, 7),
                createMaterial("Lv 8 Gather Essence", 2, 606, 8),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 8 Farming Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-755.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 7 Combat Essence", 2, 602, 7),
                createMaterial("Lv 8 Gather Essence", 2, 606, 8),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Hollow Farmer Pants",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-572.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Hollow Farmer Pants",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-572.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 7 Gather Essence", 2, 406, 7),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 7 Gather Essence", 2, 406, 7)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 7 Gather Essence", 2, 406, 7)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Bronze Farmer Pants",
      alias: "BronzeFarmerPants",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-596.png",
      requiresLevel: 9,
      stats: [
        {
          name: "Breedingproficiency",
          typeNumber: "integer",
          values: { min: 150, max: 168 },
        },
        {
          name: "Plantigproficiency",
          typeNumber: "integer",
          values: { min: 150, max: 168 },
        },
        {
          name: "Maxfertility",
          typeNumber: "integer",
          values: { min: 2967, max: 3316 },
        },
        {
          name: "Maxpethappiness",
          typeNumber: "integer",
          values: { min: 746, max: 834 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 8 Combat Essence", 2, 603, 8),
            createMaterial("Lv 9 Gather Essence", 2, 607, 9),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial("Lv 8 Combat Essence", 2, 603, 8),
                createMaterial("Lv 9 Gather Essence", 2, 607, 9),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial("Lv 8 Combat Essence", 2, 603, 8),
                createMaterial("Lv 9 Gather Essence", 2, 607, 9),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 9 Farming Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-746.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 8 Combat Essence", 2, 603, 8),
                createMaterial("Lv 9 Gather Essence", 2, 607, 9),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Bronze Farmer Pants",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-596.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Bronze Farmer Pants",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-596.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 8 Gather Essence", 2, 606, 8),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 8 Gather Essence", 2, 606, 8)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 8 Gather Essence", 2, 606, 8)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Farming Jacket",
      alias: "FarmingJacketLv1",
      cdnImage: "https://icons.lumiterra.net/item-icon-101.png",
      requiresLevel: 1,
      stats: [
        {
          name: "Breedingproficiency",
          typeNumber: "integer",
          values: { min: 6, max: 19 },
        },
        {
          name: "Plantigproficiency",
          typeNumber: "integer",
          values: { min: 6, max: 19 },
        },
        {
          name: "Maxfertility",
          typeNumber: "integer",
          values: { min: 220, max: 659 },
        },
        {
          name: "Maxpethappiness",
          typeNumber: "integer",
          values: { min: 55, max: 165 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [createMaterial("Lv 1 Gather Essence", 2, 207, 1)],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 1 Gather Essence", 2, 207, 1)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 1 Gather Essence", 2, 207, 1)],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 1 Farming Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-747.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 1 Gather Essence", 2, 207, 1),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Farming Jacket",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-101.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Farming Jacket",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-101.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 1 Gather Essence", 2, 207, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 1 Gather Essence", 2, 207, 1)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 1 Gather Essence", 2, 207, 1)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Farming Jacket",
      alias: "FarmingJacketLv2",
      cdnImage: "https://icons.lumiterra.net/item-icon-102.png",
      requiresLevel: 2,
      stats: [
        {
          name: "Breedingproficiency",
          typeNumber: "integer",
          values: { min: 19, max: 32 },
        },
        {
          name: "Plantigproficiency",
          typeNumber: "integer",
          values: { min: 19, max: 32 },
        },
        {
          name: "Maxfertility",
          typeNumber: "integer",
          values: { min: 659, max: 1098 },
        },
        {
          name: "Maxpethappiness",
          typeNumber: "integer",
          values: { min: 165, max: 275 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 1 Combat Essence", 2, 216, 1),
            createMaterial("Lv 2 Gather Essence", 2, 208, 2),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial("Lv 1 Combat Essence", 2, 216, 1),
                createMaterial("Lv 2 Gather Essence", 2, 208, 2),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial("Lv 1 Combat Essence", 2, 216, 1),
                createMaterial("Lv 2 Gather Essence", 2, 208, 2),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 2 Farming Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-748.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 1 Combat Essence", 2, 216, 1),
                createMaterial("Lv 2 Gather Essence", 2, 208, 2),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Farming Jacket",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-102.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Farming Jacket",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-102.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 1 Gather Essence", 2, 207, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 1 Gather Essence", 2, 207, 1)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 1 Gather Essence", 2, 207, 1)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Farming Jacket",
      alias: "FarmingJacketLv3",
      cdnImage: "https://icons.lumiterra.net/item-icon-103.png",
      requiresLevel: 3,
      stats: [
        {
          name: "Breedingproficiency",
          typeNumber: "integer",
          values: { min: 32, max: 45 },
        },
        {
          name: "Plantigproficiency",
          typeNumber: "integer",
          values: { min: 32, max: 45 },
        },
        {
          name: "Maxfertility",
          typeNumber: "integer",
          values: { min: 1098, max: 1537 },
        },
        {
          name: "Maxpethappiness",
          typeNumber: "integer",
          values: { min: 275, max: 385 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 2 Combat Essence", 2, 217, 2),
            createMaterial("Lv 3 Gather Essence", 2, 209, 3),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial("Lv 2 Combat Essence", 2, 217, 2),
                createMaterial("Lv 3 Gather Essence", 2, 209, 3),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial("Lv 2 Combat Essence", 2, 217, 2),
                createMaterial("Lv 3 Gather Essence", 2, 209, 3),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 3 Farming Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-749.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 2 Combat Essence", 2, 217, 2),
                createMaterial("Lv 3 Gather Essence", 2, 209, 3),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Farming Jacket",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-103.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Farming Jacket",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-103.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 2 Gather Essence", 2, 208, 2),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 2 Gather Essence", 2, 208, 2)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 2 Gather Essence", 2, 208, 2)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Golden Farmer Coat",
      alias: "GoldenFarmerCoat",
      cdnImage: "https://icons.lumiterra.net/item-icon-351.png",
      requiresLevel: 4,
      stats: [
        {
          name: "Breedingproficiency",
          typeNumber: "integer",
          values: { min: 45, max: 58 },
        },
        {
          name: "Plantigproficiency",
          typeNumber: "integer",
          values: { min: 45, max: 58 },
        },
        {
          name: "Maxfertility",
          typeNumber: "integer",
          values: { min: 1537, max: 1976 },
        },
        {
          name: "Maxpethappiness",
          typeNumber: "integer",
          values: { min: 385, max: 495 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 3 Combat Essence", 2, 218, 3),
            createMaterial("Lv 4 Gather Essence", 2, 404, 4),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial("Lv 3 Combat Essence", 2, 218, 3),
                createMaterial("Lv 4 Gather Essence", 2, 404, 4),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial("Lv 3 Combat Essence", 2, 218, 3),
                createMaterial("Lv 4 Gather Essence", 2, 404, 4),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 4 Farming Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-751.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 3 Combat Essence", 2, 218, 3),
                createMaterial("Lv 4 Gather Essence", 2, 404, 4),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Golden Farmer Coat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-351.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Golden Farmer Coat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-351.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 3 Gather Essence", 2, 209, 3),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 3 Gather Essence", 2, 209, 3)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 3 Gather Essence", 2, 209, 3)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Diamond Farmer Coat",
      alias: "DiamondFarmerCoat",
      cdnImage: "https://icons.lumiterra.net/item-icon-356.png",
      requiresLevel: 5,
      stats: [
        {
          name: "Breedingproficiency",
          typeNumber: "integer",
          values: { min: 58, max: 71 },
        },
        {
          name: "Plantigproficiency",
          typeNumber: "integer",
          values: { min: 58, max: 71 },
        },
        {
          name: "Maxfertility",
          typeNumber: "integer",
          values: { min: 1976, max: 2415 },
        },
        {
          name: "Maxpethappiness",
          typeNumber: "integer",
          values: { min: 495, max: 605 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 4 Combat Essence", 2, 401, 4),
            createMaterial("Lv 5 Gather Essence", 2, 405, 5),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial("Lv 4 Combat Essence", 2, 401, 4),
                createMaterial("Lv 5 Gather Essence", 2, 405, 5),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial("Lv 4 Combat Essence", 2, 401, 4),
                createMaterial("Lv 5 Gather Essence", 2, 405, 5),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 5 Farming Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-752.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 4 Combat Essence", 2, 401, 4),
                createMaterial("Lv 5 Gather Essence", 2, 405, 5),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Diamond Farmer Coat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-356.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Diamond Farmer Coat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-356.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 4 Gather Essence", 2, 404, 4),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 4 Gather Essence", 2, 404, 4)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 4 Gather Essence", 2, 404, 4)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Star Farmer Coat",
      alias: "StarFarmerCoat",
      cdnImage: "https://icons.lumiterra.net/item-icon-361.png",
      requiresLevel: 6,
      stats: [
        {
          name: "Breedingproficiency",
          typeNumber: "integer",
          values: { min: 71, max: 84 },
        },
        {
          name: "Plantigproficiency",
          typeNumber: "integer",
          values: { min: 71, max: 84 },
        },
        {
          name: "Maxfertility",
          typeNumber: "integer",
          values: { min: 2415, max: 2854 },
        },
        {
          name: "Maxpethappiness",
          typeNumber: "integer",
          values: { min: 605, max: 715 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 5 Combat Essence", 2, 402, 5),
            createMaterial("Lv 6 Gather Essence", 2, 406, 6),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial("Lv 5 Combat Essence", 2, 402, 5),
                createMaterial("Lv 6 Gather Essence", 2, 406, 6),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial("Lv 5 Combat Essence", 2, 402, 5),
                createMaterial("Lv 6 Gather Essence", 2, 406, 6),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 6 Farming Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-753.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 5 Combat Essence", 2, 402, 5),
                createMaterial("Lv 6 Gather Essence", 2, 406, 6),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Star Farmer Coat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-361.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Star Farmer Coat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-361.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 5 Gather Essence", 2, 405, 5),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 5 Gather Essence", 2, 405, 5)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 5 Gather Essence", 2, 405, 5)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Lava Farmer Coat",
      alias: "LavaFarmerCoat",
      cdnImage: "https://icons.lumiterra.net/item-icon-547.png",
      requiresLevel: 7,
      stats: [
        {
          name: "Breedingproficiency",
          typeNumber: "integer",
          values: { min: 84, max: 97 },
        },
        {
          name: "Plantigproficiency",
          typeNumber: "integer",
          values: { min: 84, max: 97 },
        },
        {
          name: "Maxfertility",
          typeNumber: "integer",
          values: { min: 2854, max: 3293 },
        },
        {
          name: "Maxpethappiness",
          typeNumber: "integer",
          values: { min: 715, max: 825 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 6 Combat Essence", 2, 403, 6),
            createMaterial("Lv 7 Gather Essence", 2, 605, 7),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial("Lv 6 Combat Essence", 2, 403, 6),
                createMaterial("Lv 7 Gather Essence", 2, 605, 7),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial("Lv 6 Combat Essence", 2, 403, 6),
                createMaterial("Lv 7 Gather Essence", 2, 605, 7),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 7 Farming Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-754.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 6 Combat Essence", 2, 403, 6),
                createMaterial("Lv 7 Gather Essence", 2, 605, 7),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Lava Farmer Coat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-547.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Lava Farmer Coat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-547.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 6 Gather Essence", 2, 406, 6),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 6 Gather Essence", 2, 406, 6)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 6 Gather Essence", 2, 406, 6)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Hollow Farmer Coat",
      alias: "HollowFarmerCoat",
      cdnImage: "https://icons.lumiterra.net/item-icon-571.png",
      requiresLevel: 8,
      stats: [
        {
          name: "Breedingproficiency",
          typeNumber: "integer",
          values: { min: 97, max: 110 },
        },
        {
          name: "Plantigproficiency",
          typeNumber: "integer",
          values: { min: 97, max: 110 },
        },
        {
          name: "Maxfertility",
          typeNumber: "integer",
          values: { min: 3293, max: 3732 },
        },
        {
          name: "Maxpethappiness",
          typeNumber: "integer",
          values: { min: 825, max: 935 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 7 Combat Essence", 2, 602, 7),
            createMaterial("Lv 8 Gather Essence", 2, 606, 8),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial("Lv 7 Combat Essence", 2, 602, 7),
                createMaterial("Lv 8 Gather Essence", 2, 606, 8),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial("Lv 7 Combat Essence", 2, 602, 7),
                createMaterial("Lv 8 Gather Essence", 2, 606, 8),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 8 Farming Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-755.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 7 Combat Essence", 2, 602, 7),
                createMaterial("Lv 8 Gather Essence", 2, 606, 8),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Hollow Farmer Coat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-571.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Hollow Farmer Coat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-571.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 7 Gather Essence", 2, 406, 7),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 7 Gather Essence", 2, 406, 7)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 7 Gather Essence", 2, 406, 7)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Bronze Farmer Coat",
      alias: "BronzeFarmerCoat",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-595.png",
      requiresLevel: 9,
      stats: [
        {
          name: "Breedingproficiency",
          typeNumber: "integer",
          values: { min: 110, max: 123 },
        },
        {
          name: "Plantigproficiency",
          typeNumber: "integer",
          values: { min: 110, max: 123 },
        },
        {
          name: "Maxfertility",
          typeNumber: "integer",
          values: { min: 3732, max: 4171 },
        },
        {
          name: "Maxpethappiness",
          typeNumber: "integer",
          values: { min: 935, max: 1045 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 8 Combat Essence", 2, 603, 8),
            createMaterial("Lv 9 Gather Essence", 2, 607, 9),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial("Lv 8 Combat Essence", 2, 603, 8),
                createMaterial("Lv 9 Gather Essence", 2, 607, 9),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial("Lv 8 Combat Essence", 2, 603, 8),
                createMaterial("Lv 9 Gather Essence", 2, 607, 9),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 9 Farming Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-746.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 8 Combat Essence", 2, 603, 8),
                createMaterial("Lv 9 Gather Essence", 2, 607, 9),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Bronze Farmer Coat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-595.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Bronze Farmer Coat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-595.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 8 Gather Essence", 2, 606, 8),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 8 Gather Essence", 2, 606, 8)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 8 Gather Essence", 2, 606, 8)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Lucky Clover Hat",
      alias: "LuckyCloverHatLv1",
      cdnImage: "https://icons.lumiterra.net/item-icon-98.png",
      requiresLevel: 1,
      stats: [
        {
          name: "Breedingproficiency",
          typeNumber: "integer",
          values: { min: 8, max: 25 },
        },
        {
          name: "Plantigproficiency",
          typeNumber: "integer",
          values: { min: 8, max: 25 },
        },
        {
          name: "Maxfertility",
          typeNumber: "integer",
          values: { min: 184, max: 551 },
        },
        {
          name: "Maxpethappiness",
          typeNumber: "integer",
          values: { min: 46, max: 138 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [createMaterial("Lv 1 Gather Essence", 2, 207, 1)],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 1 Gather Essence", 2, 207, 1)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 1 Gather Essence", 2, 207, 1)],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 1 Farming Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-747.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 1 Gather Essence", 2, 207, 1),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Lucky Clover Hat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-98.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Lucky Clover Hat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-98.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 1 Gather Essence", 2, 207, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 1 Gather Essence", 2, 207, 1)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 1 Gather Essence", 2, 207, 1)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Lucky Cotton Hat",
      alias: "LuckyCottonHatLv2",
      cdnImage: "https://icons.lumiterra.net/item-icon-99.png",
      requiresLevel: 2,
      stats: [
        {
          name: "Breedingproficiency",
          typeNumber: "integer",
          values: { min: 25, max: 42 },
        },
        {
          name: "Plantigproficiency",
          typeNumber: "integer",
          values: { min: 25, max: 42 },
        },
        {
          name: "Maxfertility",
          typeNumber: "integer",
          values: { min: 551, max: 918 },
        },
        {
          name: "Maxpethappiness",
          typeNumber: "integer",
          values: { min: 138, max: 230 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 1 Combat Essence", 2, 216, 1),
            createMaterial("Lv 2 Gather Essence", 2, 208, 2),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial("Lv 1 Combat Essence", 2, 216, 1),
                createMaterial("Lv 2 Gather Essence", 2, 208, 2),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial("Lv 1 Combat Essence", 2, 216, 1),
                createMaterial("Lv 2 Gather Essence", 2, 208, 2),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 2 Farming Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-748.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 1 Combat Essence", 2, 216, 1),
                createMaterial("Lv 2 Gather Essence", 2, 208, 2),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Lucky Cotton Hat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-99.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Lucky Cotton Hat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-99.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 1 Gather Essence", 2, 207, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 1 Gather Essence", 2, 207, 1)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 1 Gather Essence", 2, 207, 1)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Lucky Hard Hat",
      alias: "LuckyHardHatLv3",
      cdnImage: "https://icons.lumiterra.net/item-icon-100.png",
      requiresLevel: 3,
      stats: [
        {
          name: "Breedingproficiency",
          typeNumber: "integer",
          values: { min: 42, max: 59 },
        },
        {
          name: "Plantigproficiency",
          typeNumber: "integer",
          values: { min: 42, max: 59 },
        },
        {
          name: "Maxfertility",
          typeNumber: "integer",
          values: { min: 918, max: 1285 },
        },
        {
          name: "Maxpethappiness",
          typeNumber: "integer",
          values: { min: 230, max: 321 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 2 Combat Essence", 2, 217, 2),
            createMaterial("Lv 3 Gather Essence", 2, 209, 3),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial("Lv 2 Combat Essence", 2, 217, 2),
                createMaterial("Lv 3 Gather Essence", 2, 209, 3),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial("Lv 2 Combat Essence", 2, 217, 2),
                createMaterial("Lv 3 Gather Essence", 2, 209, 3),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 3 Farming Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-749.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 2 Combat Essence", 2, 217, 2),
                createMaterial("Lv 3 Gather Essence", 2, 209, 3),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Lucky Hard Hat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-100.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Lucky Hard Hat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-100.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 2 Gather Essence", 2, 208, 2),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 2 Gather Essence", 2, 208, 2)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 2 Gather Essence", 2, 208, 2)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Golden Farmer Hat",
      alias: "GoldenFarmerHat",
      cdnImage: "https://icons.lumiterra.net/item-icon-350.png",
      requiresLevel: 4,
      stats: [
        {
          name: "Breedingproficiency",
          typeNumber: "integer",
          values: { min: 59, max: 76 },
        },
        {
          name: "Plantigproficiency",
          typeNumber: "integer",
          values: { min: 59, max: 76 },
        },
        {
          name: "Maxfertility",
          typeNumber: "integer",
          values: { min: 1285, max: 1625 },
        },
        {
          name: "Maxpethappiness",
          typeNumber: "integer",
          values: { min: 321, max: 413 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 3 Combat Essence", 2, 218, 3),
            createMaterial("Lv 4 Gather Essence", 2, 404, 4),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial("Lv 3 Combat Essence", 2, 218, 3),
                createMaterial("Lv 4 Gather Essence", 2, 404, 4),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial("Lv 3 Combat Essence", 2, 218, 3),
                createMaterial("Lv 4 Gather Essence", 2, 404, 4),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 4 Farming Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-751.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 3 Combat Essence", 2, 218, 3),
                createMaterial("Lv 4 Gather Essence", 2, 404, 4),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Golden Farmer Hat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-350.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Golden Farmer Hat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-350.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 3 Gather Essence", 2, 209, 3),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 3 Gather Essence", 2, 209, 3)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 3 Gather Essence", 2, 209, 3)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Diamond Farmer Hat",
      alias: "DiamondFarmerHat",
      cdnImage: "https://icons.lumiterra.net/item-icon-355.png",
      requiresLevel: 5,
      stats: [
        {
          name: "Breedingproficiency",
          typeNumber: "integer",
          values: { min: 76, max: 93 },
        },
        {
          name: "Plantigproficiency",
          typeNumber: "integer",
          values: { min: 76, max: 93 },
        },
        {
          name: "Maxfertility",
          typeNumber: "integer",
          values: { min: 1625, max: 2019 },
        },
        {
          name: "Maxpethappiness",
          typeNumber: "integer",
          values: { min: 413, max: 505 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 4 Combat Essence", 2, 401, 4),
            createMaterial("Lv 5 Gather Essence", 2, 405, 5),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial("Lv 4 Combat Essence", 2, 401, 4),
                createMaterial("Lv 5 Gather Essence", 2, 405, 5),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial("Lv 4 Combat Essence", 2, 401, 4),
                createMaterial("Lv 5 Gather Essence", 2, 405, 5),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 5 Farming Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-752.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 4 Combat Essence", 2, 401, 4),
                createMaterial("Lv 5 Gather Essence", 2, 405, 5),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Diamond Farmer Hat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-355.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Diamond Farmer Hat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-355.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 4 Gather Essence", 2, 404, 4),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 4 Gather Essence", 2, 404, 4)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 4 Gather Essence", 2, 404, 4)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Star Farmer Hat",
      alias: "StarFarmerHat",
      cdnImage: "https://icons.lumiterra.net/item-icon-360.png",
      requiresLevel: 6,
      stats: [
        {
          name: "Breedingproficiency",
          typeNumber: "integer",
          values: { min: 93, max: 110 },
        },
        {
          name: "Plantigproficiency",
          typeNumber: "integer",
          values: { min: 93, max: 110 },
        },
        {
          name: "Maxfertility",
          typeNumber: "integer",
          values: { min: 2019, max: 2386 },
        },
        {
          name: "Maxpethappiness",
          typeNumber: "integer",
          values: { min: 505, max: 597 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 5 Combat Essence", 2, 402, 5),
            createMaterial("Lv 6 Gather Essence", 2, 406, 6),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial("Lv 5 Combat Essence", 2, 402, 5),
                createMaterial("Lv 6 Gather Essence", 2, 406, 6),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial("Lv 5 Combat Essence", 2, 402, 5),
                createMaterial("Lv 6 Gather Essence", 2, 406, 6),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 6 Farming Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-753.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 5 Combat Essence", 2, 402, 5),
                createMaterial("Lv 6 Gather Essence", 2, 406, 6),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Star Farmer Hat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-360.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Star Farmer Hat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-360.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 5 Gather Essence", 2, 405, 5),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 5 Gather Essence", 2, 405, 5)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 5 Gather Essence", 2, 405, 5)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Lava Farmer Hat",
      alias: "LavaFarmerHat",
      cdnImage: "https://icons.lumiterra.net/item-icon-546.png",
      requiresLevel: 7,
      stats: [
        {
          name: "Breedingproficiency",
          typeNumber: "integer",
          values: { min: 110, max: 127 },
        },
        {
          name: "Plantigproficiency",
          typeNumber: "integer",
          values: { min: 110, max: 127 },
        },
        {
          name: "Maxfertility",
          typeNumber: "integer",
          values: { min: 2386, max: 2753 },
        },
        {
          name: "Maxpethappiness",
          typeNumber: "integer",
          values: { min: 597, max: 688 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 6 Combat Essence", 2, 403, 6),
            createMaterial("Lv 7 Gather Essence", 2, 605, 7),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial("Lv 6 Combat Essence", 2, 403, 6),
                createMaterial("Lv 7 Gather Essence", 2, 605, 7),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial("Lv 6 Combat Essence", 2, 403, 6),
                createMaterial("Lv 7 Gather Essence", 2, 605, 7),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 7 Farming Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-754.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 6 Combat Essence", 2, 403, 6),
                createMaterial("Lv 7 Gather Essence", 2, 605, 7),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Lava Farmer Hat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-546.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Lava Farmer Hat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-546.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 6 Gather Essence", 2, 406, 6),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 6 Gather Essence", 2, 406, 6)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 6 Gather Essence", 2, 406, 6)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Hollow Farmer Hat",
      alias: "HollowFarmerHat",
      cdnImage: "https://icons.lumiterra.net/item-icon-570.png",
      requiresLevel: 8,
      stats: [
        {
          name: "Breedingproficiency",
          typeNumber: "integer",
          values: { min: 127, max: 144 },
        },
        {
          name: "Plantigproficiency",
          typeNumber: "integer",
          values: { min: 127, max: 144 },
        },
        {
          name: "Maxfertility",
          typeNumber: "integer",
          values: { min: 2753, max: 3120 },
        },
        {
          name: "Maxpethappiness",
          typeNumber: "integer",
          values: { min: 688, max: 780 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 7 Combat Essence", 2, 602, 7),
            createMaterial("Lv 8 Gather Essence", 2, 606, 8),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial("Lv 7 Combat Essence", 2, 602, 7),
                createMaterial("Lv 8 Gather Essence", 2, 606, 8),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial("Lv 7 Combat Essence", 2, 602, 7),
                createMaterial("Lv 8 Gather Essence", 2, 606, 8),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 8 Farming Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-755.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 7 Combat Essence", 2, 602, 7),
                createMaterial("Lv 8 Gather Essence", 2, 606, 8),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Hollow Farmer Hat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-570.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Hollow Farmer Hat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-570.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 7 Gather Essence", 2, 406, 7),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 7 Gather Essence", 2, 406, 7)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 7 Gather Essence", 2, 406, 7)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Bronze Farmer Hat",
      alias: "BronzeFarmerHat",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-594.png",
      requiresLevel: 9,
      stats: [
        {
          name: "Breedingproficiency",
          typeNumber: "integer",
          values: { min: 144, max: 161 },
        },
        {
          name: "Plantigproficiency",
          typeNumber: "integer",
          values: { min: 144, max: 161 },
        },
        {
          name: "Maxfertility",
          typeNumber: "integer",
          values: { min: 3120, max: 3487 },
        },
        {
          name: "Maxpethappiness",
          typeNumber: "integer",
          values: { min: 780, max: 872 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 8 Combat Essence", 2, 603, 8),
            createMaterial("Lv 9 Gather Essence", 2, 607, 9),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial("Lv 8 Combat Essence", 2, 603, 8),
                createMaterial("Lv 9 Gather Essence", 2, 607, 9),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial("Lv 8 Combat Essence", 2, 603, 8),
                createMaterial("Lv 9 Gather Essence", 2, 607, 9),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 9 Farming Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-746.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 8 Combat Essence", 2, 603, 8),
                createMaterial("Lv 9 Gather Essence", 2, 607, 9),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Bronze Farmer Hat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-594.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Bronze Farmer Hat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-594.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 8 Gather Essence", 2, 606, 8),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 8 Gather Essence", 2, 606, 8)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 8 Gather Essence", 2, 606, 8)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Farming Gloves",
      alias: "FarmingGlovesLv1",
      cdnImage: "https://icons.lumiterra.net/item-icon-107.png",
      requiresLevel: 1,
      stats: [
        {
          name: "Breedingproficiency",
          typeNumber: "integer",
          values: { min: 6, max: 19 },
        },
        {
          name: "Plantigproficiency",
          typeNumber: "integer",
          values: { min: 6, max: 19 },
        },
        {
          name: "Maxfertility",
          typeNumber: "integer",
          values: { min: 139, max: 416 },
        },
        {
          name: "Maxpethappiness",
          typeNumber: "integer",
          values: { min: 35, max: 104 },
        },
        {
          name: "Fertilitycapacity",
          typeNumber: "integer",
          values: { min: 1, max: 3 },
        },
        {
          name: "Pethappinesscapacity",
          typeNumber: "integer",
          values: { min: 1, max: 3 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [createMaterial("Lv 1 Gather Essence", 2, 207, 1)],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 1 Gather Essence", 2, 207, 1)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 1 Gather Essence", 2, 207, 1)],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 1 Farming Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-747.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 1 Gather Essence", 2, 207, 1),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Farming Gloves",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-107.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Farming Gloves",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-107.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 1 Gather Essence", 2, 207, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 1 Gather Essence", 2, 207, 1)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 1 Gather Essence", 2, 207, 1)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Farming Gloves",
      alias: "FarmingGlovesLv2",
      cdnImage: "https://icons.lumiterra.net/item-icon-108.png",
      requiresLevel: 2,
      stats: [
        {
          name: "Breedingproficiency",
          typeNumber: "integer",
          values: { min: 19, max: 32 },
        },
        {
          name: "Plantigproficiency",
          typeNumber: "integer",
          values: { min: 19, max: 32 },
        },
        {
          name: "Maxfertility",
          typeNumber: "integer",
          values: { min: 416, max: 693 },
        },
        {
          name: "Maxpethappiness",
          typeNumber: "integer",
          values: { min: 104, max: 173 },
        },
        {
          name: "Fertilitycapacity",
          typeNumber: "integer",
          values: { min: 3, max: 4 },
        },
        {
          name: "Pethappinesscapacity",
          typeNumber: "integer",
          values: { min: 3, max: 4 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 1 Combat Essence", 2, 216, 1),
            createMaterial("Lv 2 Gather Essence", 2, 208, 2),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial("Lv 1 Combat Essence", 2, 216, 1),
                createMaterial("Lv 2 Gather Essence", 2, 208, 2),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial("Lv 1 Combat Essence", 2, 216, 1),
                createMaterial("Lv 2 Gather Essence", 2, 208, 2),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 2 Farming Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-748.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 1 Combat Essence", 2, 216, 1),
                createMaterial("Lv 2 Gather Essence", 2, 208, 2),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Farming Gloves",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-108.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Farming Gloves",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-108.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 1 Gather Essence", 2, 207, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 1 Gather Essence", 2, 207, 1)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 1 Gather Essence", 2, 207, 1)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Farming Gloves",
      alias: "FarmingGlovesLv3",
      cdnImage: "https://icons.lumiterra.net/item-icon-109.png",
      requiresLevel: 3,
      stats: [
        {
          name: "Breedingproficiency",
          typeNumber: "integer",
          values: { min: 32, max: 45 },
        },
        {
          name: "Plantigproficiency",
          typeNumber: "integer",
          values: { min: 32, max: 45 },
        },
        {
          name: "Maxfertility",
          typeNumber: "integer",
          values: { min: 693, max: 970 },
        },
        {
          name: "Maxpethappiness",
          typeNumber: "integer",
          values: { min: 173, max: 243 },
        },
        {
          name: "Fertilitycapacity",
          typeNumber: "integer",
          values: { min: 4, max: 5 },
        },
        {
          name: "Pethappinesscapacity",
          typeNumber: "integer",
          values: { min: 4, max: 5 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 2 Combat Essence", 2, 217, 2),
            createMaterial("Lv 3 Gather Essence", 2, 209, 3),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial("Lv 2 Combat Essence", 2, 217, 2),
                createMaterial("Lv 3 Gather Essence", 2, 209, 3),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial("Lv 2 Combat Essence", 2, 217, 2),
                createMaterial("Lv 3 Gather Essence", 2, 209, 3),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 3 Farming Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-749.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 2 Combat Essence", 2, 217, 2),
                createMaterial("Lv 3 Gather Essence", 2, 209, 3),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Farming Gloves",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-109.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Farming Gloves",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-109.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 2 Gather Essence", 2, 208, 2),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 2 Gather Essence", 2, 208, 2)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 2 Gather Essence", 2, 208, 2)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Golden Farmer Glove",
      alias: "GoldenFarmerGlove",
      cdnImage: "https://icons.lumiterra.net/item-icon-352.png",
      requiresLevel: 4,
      stats: [
        {
          name: "Breedingproficiency",
          typeNumber: "integer",
          values: { min: 45, max: 58 },
        },
        {
          name: "Plantigproficiency",
          typeNumber: "integer",
          values: { min: 45, max: 58 },
        },
        {
          name: "Maxfertility",
          typeNumber: "integer",
          values: { min: 970, max: 1248 },
        },
        {
          name: "Maxpethappiness",
          typeNumber: "integer",
          values: { min: 243, max: 312 },
        },
        {
          name: "Fertilitycapacity",
          typeNumber: "integer",
          values: { min: 5, max: 7 },
        },
        {
          name: "Pethappinesscapacity",
          typeNumber: "integer",
          values: { min: 5, max: 7 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 3 Combat Essence", 2, 218, 3),
            createMaterial("Lv 4 Gather Essence", 2, 404, 4),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial("Lv 3 Combat Essence", 2, 218, 3),
                createMaterial("Lv 4 Gather Essence", 2, 404, 4),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial("Lv 3 Combat Essence", 2, 218, 3),
                createMaterial("Lv 4 Gather Essence", 2, 404, 4),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 4 Farming Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-751.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 3 Combat Essence", 2, 218, 3),
                createMaterial("Lv 4 Gather Essence", 2, 404, 4),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Golden Farmer Glove",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-352.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Golden Farmer Glove",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-352.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 3 Gather Essence", 2, 209, 3),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 3 Gather Essence", 2, 209, 3)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 3 Gather Essence", 2, 209, 3)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Diamond Farmer Glove",
      alias: "DiamondFarmerGlove",
      cdnImage: "https://icons.lumiterra.net/item-icon-357.png",
      requiresLevel: 5,
      stats: [
        {
          name: "Breedingproficiency",
          typeNumber: "integer",
          values: { min: 58, max: 71 },
        },
        {
          name: "Plantigproficiency",
          typeNumber: "integer",
          values: { min: 58, max: 71 },
        },
        {
          name: "Maxfertility",
          typeNumber: "integer",
          values: { min: 1248, max: 1525 },
        },
        {
          name: "Maxpethappiness",
          typeNumber: "integer",
          values: { min: 312, max: 381 },
        },
        {
          name: "Fertilitycapacity",
          typeNumber: "integer",
          values: { min: 6, max: 8 },
        },
        {
          name: "Pethappinesscapacity",
          typeNumber: "integer",
          values: { min: 6, max: 8 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 4 Combat Essence", 2, 401, 4),
            createMaterial("Lv 5 Gather Essence", 2, 405, 5),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial("Lv 4 Combat Essence", 2, 401, 4),
                createMaterial("Lv 5 Gather Essence", 2, 405, 5),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial("Lv 4 Combat Essence", 2, 401, 4),
                createMaterial("Lv 5 Gather Essence", 2, 405, 5),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 5 Farming Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-752.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 4 Combat Essence", 2, 401, 4),
                createMaterial("Lv 5 Gather Essence", 2, 405, 5),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Diamond Farmer Glove",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-357.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Diamond Farmer Glove",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-357.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 4 Gather Essence", 2, 404, 4),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 4 Gather Essence", 2, 404, 4)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 4 Gather Essence", 2, 404, 4)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Star Farmer Glove",
      alias: "StarFarmerGlove",
      cdnImage: "https://icons.lumiterra.net/item-icon-362.png",
      requiresLevel: 6,
      stats: [
        {
          name: "Breedingproficiency",
          typeNumber: "integer",
          values: { min: 71, max: 84 },
        },
        {
          name: "Plantigproficiency",
          typeNumber: "integer",
          values: { min: 71, max: 84 },
        },
        {
          name: "Maxfertility",
          typeNumber: "integer",
          values: { min: 1525, max: 1802 },
        },
        {
          name: "Maxpethappiness",
          typeNumber: "integer",
          values: { min: 381, max: 450 },
        },
        {
          name: "Fertilitycapacity",
          typeNumber: "integer",
          values: { min: 8, max: 9 },
        },
        {
          name: "Pethappinesscapacity",
          typeNumber: "integer",
          values: { min: 8, max: 9 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 5 Combat Essence", 2, 402, 5),
            createMaterial("Lv 6 Gather Essence", 2, 406, 6),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial("Lv 5 Combat Essence", 2, 402, 5),
                createMaterial("Lv 6 Gather Essence", 2, 406, 6),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial("Lv 5 Combat Essence", 2, 402, 5),
                createMaterial("Lv 6 Gather Essence", 2, 406, 6),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 6 Farming Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-753.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 5 Combat Essence", 2, 402, 5),
                createMaterial("Lv 6 Gather Essence", 2, 406, 6),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Star Farmer Glove",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-362.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Star Farmer Glove",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-362.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 5 Gather Essence", 2, 405, 5),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 5 Gather Essence", 2, 405, 5)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 5 Gather Essence", 2, 405, 5)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Lava Farmer Glove",
      alias: "LavaFarmerGlove",
      cdnImage: "https://icons.lumiterra.net/item-icon-549.png",
      requiresLevel: 7,
      stats: [
        {
          name: "Breedingproficiency",
          typeNumber: "integer",
          values: { min: 84, max: 97 },
        },
        {
          name: "Plantigproficiency",
          typeNumber: "integer",
          values: { min: 84, max: 97 },
        },
        {
          name: "Maxfertility",
          typeNumber: "integer",
          values: { min: 1802, max: 2079 },
        },
        {
          name: "Maxpethappiness",
          typeNumber: "integer",
          values: { min: 450, max: 520 },
        },
        {
          name: "Fertilitycapacity",
          typeNumber: "integer",
          values: { min: 9, max: 10 },
        },
        {
          name: "Pethappinesscapacity",
          typeNumber: "integer",
          values: { min: 9, max: 10 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 6 Combat Essence", 2, 403, 6),
            createMaterial("Lv 7 Gather Essence", 2, 605, 7),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial("Lv 6 Combat Essence", 2, 403, 6),
                createMaterial("Lv 7 Gather Essence", 2, 605, 7),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial("Lv 6 Combat Essence", 2, 403, 6),
                createMaterial("Lv 7 Gather Essence", 2, 605, 7),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 7 Farming Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-754.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 6 Combat Essence", 2, 403, 6),
                createMaterial("Lv 7 Gather Essence", 2, 605, 7),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Lava Farmer Glove",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-549.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Lava Farmer Glove",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-549.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 6 Gather Essence", 2, 406, 6),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 6 Gather Essence", 2, 406, 6)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 6 Gather Essence", 2, 406, 6)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Hollow Farmer Glove",
      alias: "HollowFarmerGlove",
      cdnImage: "https://icons.lumiterra.net/item-icon-573.png",
      requiresLevel: 8,
      stats: [
        {
          name: "Breedingproficiency",
          typeNumber: "integer",
          values: { min: 97, max: 110 },
        },
        {
          name: "Plantigproficiency",
          typeNumber: "integer",
          values: { min: 97, max: 110 },
        },
        {
          name: "Maxfertility",
          typeNumber: "integer",
          values: { min: 2079, max: 2356 },
        },
        {
          name: "Maxpethappiness",
          typeNumber: "integer",
          values: { min: 520, max: 589 },
        },
        {
          name: "Fertilitycapacity",
          typeNumber: "integer",
          values: { min: 9, max: 10 },
        },
        {
          name: "Pethappinesscapacity",
          typeNumber: "integer",
          values: { min: 9, max: 10 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 7 Combat Essence", 2, 602, 7),
            createMaterial("Lv 8 Gather Essence", 2, 606, 8),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial("Lv 7 Combat Essence", 2, 602, 7),
                createMaterial("Lv 8 Gather Essence", 2, 606, 8),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial("Lv 7 Combat Essence", 2, 602, 7),
                createMaterial("Lv 8 Gather Essence", 2, 606, 8),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 8 Farming Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-755.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 7 Combat Essence", 2, 602, 7),
                createMaterial("Lv 8 Gather Essence", 2, 606, 8),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Hollow Farmer Glove",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-573.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Hollow Farmer Glove",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-573.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 7 Gather Essence", 2, 406, 7),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 7 Gather Essence", 2, 406, 7)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 7 Gather Essence", 2, 406, 7)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Bronze Farmer Glove",
      alias: "BronzeFarmerGlove",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-597.png",
      requiresLevel: 9,
      stats: [
        {
          name: "Breedingproficiency",
          typeNumber: "integer",
          values: { min: 110, max: 123 },
        },
        {
          name: "Plantigproficiency",
          typeNumber: "integer",
          values: { min: 110, max: 123 },
        },
        {
          name: "Maxfertility",
          typeNumber: "integer",
          values: { min: 2356, max: 2632 },
        },
        {
          name: "Maxpethappiness",
          typeNumber: "integer",
          values: { min: 589, max: 658 },
        },
        {
          name: "Fertilitycapacity",
          typeNumber: "integer",
          values: { min: 10, max: 11 },
        },
        {
          name: "Pethappinesscapacity",
          typeNumber: "integer",
          values: { min: 10, max: 11 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 8 Combat Essence", 2, 603, 8),
            createMaterial("Lv 9 Gather Essence", 2, 607, 9),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial("Lv 8 Combat Essence", 2, 603, 8),
                createMaterial("Lv 9 Gather Essence", 2, 607, 9),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial("Lv 8 Combat Essence", 2, 603, 8),
                createMaterial("Lv 9 Gather Essence", 2, 607, 9),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 9 Farming Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-746.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 8 Combat Essence", 2, 603, 8),
                createMaterial("Lv 9 Gather Essence", 2, 607, 9),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Bronze Farmer Glove",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-597.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Bronze Farmer Glove",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-597.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 8 Gather Essence", 2, 606, 8),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 8 Gather Essence", 2, 606, 8)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 8 Gather Essence", 2, 606, 8)],
              "Usd",
            ),
          },
        },
      ],
    },
  ],
  gathering: [
    {
      name: "Iron Pickaxe",
      alias: "IronPickaxe",
      cdnImage: "https://icons.lumiterra.net/item-icon-88.png",
      requiresLevel: 1,
      stats: [
        {
          name: "Combatatt",
          typeNumber: "integer",
          values: { min: 20, max: 25 },
        },
        {
          name: "Oreatt",
          typeNumber: "integer",
          values: { min: 41, max: 122 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [createMaterial("Lv 1 Combat Essence", 2, 216, 1)],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 1 Combat Essence", 2, 216, 1)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 1 Combat Essence", 2, 216, 1)],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 1 Gathering Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-756.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 1 Combat Essence", 2, 216, 1),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Iron Pickaxe",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-88.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Iron Pickaxe",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-88.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 1 Combat Essence", 2, 216, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 1 Combat Essence", 2, 216, 1)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 1 Combat Essence", 2, 216, 1)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Cursed Pickaxe",
      alias: "CursedPickaxe",
      cdnImage: "https://icons.lumiterra.net/item-icon-89.png",
      requiresLevel: 2,
      stats: [
        {
          name: "Combatatt",
          typeNumber: "integer",
          values: { min: 20, max: 25 },
        },
        {
          name: "Oreatt",
          typeNumber: "integer",
          values: { min: 122, max: 203 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 1 Agricultural Livestock Essence", 1, 213, 1),
            createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
            createMaterial("Lv 2 Combat Essence", 2, 217, 2),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
                createMaterial("Lv 2 Combat Essence", 2, 217, 2),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
                createMaterial("Lv 2 Combat Essence", 2, 217, 2),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 2 Gathering Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-757.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
                createMaterial("Lv 2 Combat Essence", 2, 217, 2),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Cursed Pickaxe",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-89.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Cursed Pickaxe",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-89.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 1 Combat Essence", 2, 216, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 1 Combat Essence", 2, 216, 1)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 1 Combat Essence", 2, 216, 1)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Blessing Pickaxe",
      alias: "BlessingPickaxe",
      cdnImage: "https://icons.lumiterra.net/item-icon-90.png",
      requiresLevel: 3,
      stats: [
        {
          name: "Combatatt",
          typeNumber: "integer",
          values: { min: 20, max: 25 },
        },
        {
          name: "Oreatt",
          typeNumber: "integer",
          values: { min: 203, max: 284 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 2 Agricultural Livestock Essence", 1, 214, 2),
            createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
            createMaterial("Lv 3 Combat Essence", 2, 218, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 2 Agricultural Livestock Essence",
                  1,
                  214,
                  2,
                ),
                createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
                createMaterial("Lv 3 Combat Essence", 2, 218, 1),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 2 Agricultural Livestock Essence",
                  1,
                  214,
                  2,
                ),
                createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
                createMaterial("Lv 3 Combat Essence", 2, 218, 1),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 3 Gathering Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-758.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 2 Agricultural Livestock Essence",
                  1,
                  214,
                  2,
                ),
                createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
                createMaterial("Lv 3 Combat Essence", 2, 218, 1),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Blessing Pickaxe",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-90.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Blessing Pickaxe",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-90.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 2 Combat Essence", 2, 217, 2),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 2 Combat Essence", 2, 217, 2)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 2 Combat Essence", 2, 217, 2)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Golden Pickaxe",
      alias: "GoldenPickaxe",
      cdnImage: "https://icons.lumiterra.net/item-icon-301.png",
      requiresLevel: 4,
      stats: [
        {
          name: "Combatatt",
          typeNumber: "integer",
          values: { min: 20, max: 25 },
        },
        {
          name: "Oreatt",
          typeNumber: "integer",
          values: { min: 284, max: 365 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 3 Agricultural Livestock Essence", 1, 215, 3),
            createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
            createMaterial("Lv 4 Combat Essence", 2, 401, 4),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 3 Agricultural Livestock Essence",
                  1,
                  215,
                  3,
                ),
                createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
                createMaterial("Lv 4 Combat Essence", 2, 401, 4),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 3 Agricultural Livestock Essence",
                  1,
                  215,
                  3,
                ),
                createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
                createMaterial("Lv 4 Combat Essence", 2, 401, 4),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 4 Gathering Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-759.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 3 Agricultural Livestock Essence",
                  1,
                  215,
                  3,
                ),
                createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
                createMaterial("Lv 4 Combat Essence", 2, 401, 4),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Golden Pickaxe",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-301.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Golden Pickaxe",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-301.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 3 Combat Essence", 2, 218, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 3 Combat Essence", 2, 218, 1)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 3 Combat Essence", 2, 218, 1)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Diamond Pickaxe",
      alias: "DiamondPickaxe",
      cdnImage: "https://icons.lumiterra.net/item-icon-307.png",
      requiresLevel: 5,
      stats: [
        {
          name: "Combatatt",
          typeNumber: "integer",
          values: { min: 20, max: 25 },
        },
        {
          name: "Oreatt",
          typeNumber: "integer",
          values: { min: 365, max: 446 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 4 Agricultural Livestock Essence", 1, 410, 4),
            createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
            createMaterial("Lv 5 Combat Essence", 2, 402, 5),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 4 Agricultural Livestock Essence",
                  1,
                  410,
                  4,
                ),
                createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
                createMaterial("Lv 5 Combat Essence", 2, 402, 5),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 4 Agricultural Livestock Essence",
                  1,
                  410,
                  4,
                ),
                createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
                createMaterial("Lv 5 Combat Essence", 2, 402, 5),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 5 Gathering Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-760.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 4 Agricultural Livestock Essence",
                  1,
                  410,
                  4,
                ),
                createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
                createMaterial("Lv 5 Combat Essence", 2, 402, 5),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Diamond Pickaxe",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-307.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Diamond Pickaxe",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-307.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 4 Combat Essence", 2, 401, 4),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 4 Combat Essence", 2, 401, 4)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 4 Combat Essence", 2, 401, 4)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Star Pickaxe",
      alias: "StarPickaxe",
      cdnImage: "https://icons.lumiterra.net/item-icon-313.png",
      requiresLevel: 6,
      stats: [
        {
          name: "Combatatt",
          typeNumber: "integer",
          values: { min: 20, max: 25 },
        },
        {
          name: "Oreatt",
          typeNumber: "integer",
          values: { min: 446, max: 527 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 5 Agricultural Livestock Essence", 1, 411, 5),
            createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
            createMaterial("Lv 6 Combat Essence", 2, 403, 6),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 5 Agricultural Livestock Essence",
                  1,
                  411,
                  5,
                ),
                createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
                createMaterial("Lv 6 Combat Essence", 2, 403, 6),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 5 Agricultural Livestock Essence",
                  1,
                  411,
                  5,
                ),
                createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
                createMaterial("Lv 6 Combat Essence", 2, 403, 6),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 6 Gathering Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-761.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 5 Agricultural Livestock Essence",
                  1,
                  411,
                  5,
                ),
                createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
                createMaterial("Lv 6 Combat Essence", 2, 403, 6),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Star Pickaxe",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-313.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Star Pickaxe",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-313.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 5 Combat Essence", 2, 402, 5),
            createMaterial("Lv 5 Agricultural Livestock Essence", 1, 411, 5),
            createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
            createMaterial("Lv 6 Combat Essence", 2, 403, 6),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial("Lv 5 Combat Essence", 2, 402, 5),
                createMaterial(
                  "Lv 5 Agricultural Livestock Essence",
                  1,
                  411,
                  5,
                ),
                createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
                createMaterial("Lv 6 Combat Essence", 2, 403, 6),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial("Lv 5 Combat Essence", 2, 402, 5),
                createMaterial(
                  "Lv 5 Agricultural Livestock Essence",
                  1,
                  411,
                  5,
                ),
                createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
                createMaterial("Lv 6 Combat Essence", 2, 403, 6),
              ],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Lava Pickaxe",
      alias: "LavaPickaxe",
      cdnImage: "https://icons.lumiterra.net/item-icon-537.png",
      requiresLevel: 7,
      stats: [
        {
          name: "Combatatt",
          typeNumber: "integer",
          values: { min: 20, max: 25 },
        },
        {
          name: "Oreatt",
          typeNumber: "integer",
          values: { min: 527, max: 608 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 6 Agricultural Livestock Essence", 1, 412, 6),
            createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
            createMaterial("Lv 7 Combat Essence", 2, 602, 7),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 6 Agricultural Livestock Essence",
                  1,
                  412,
                  6,
                ),
                createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
                createMaterial("Lv 7 Combat Essence", 2, 602, 7),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 6 Agricultural Livestock Essence",
                  1,
                  412,
                  6,
                ),
                createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
                createMaterial("Lv 7 Combat Essence", 2, 602, 7),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 7 Gathering Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-762.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 6 Agricultural Livestock Essence",
                  1,
                  412,
                  6,
                ),
                createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
                createMaterial("Lv 7 Combat Essence", 2, 602, 7),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Lava Pickaxe",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-537.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Lava Pickaxe",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-537.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 6 Combat Essence", 2, 403, 6),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 6 Combat Essence", 2, 403, 6)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 6 Combat Essence", 2, 403, 6)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Hollow Pickaxe",
      alias: "HollowPickaxe",
      cdnImage: "https://icons.lumiterra.net/item-icon-561.png",
      requiresLevel: 8,
      stats: [
        {
          name: "Combatatt",
          typeNumber: "integer",
          values: { min: 20, max: 25 },
        },
        {
          name: "Oreatt",
          typeNumber: "integer",
          values: { min: 608, max: 689 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 7 Agricultural Livestock Essence", 1, 611, 7),
            createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
            createMaterial("Lv 8 Combat Essence", 2, 603, 8),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 7 Agricultural Livestock Essence",
                  1,
                  611,
                  7,
                ),
                createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
                createMaterial("Lv 8 Combat Essence", 2, 603, 8),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 7 Agricultural Livestock Essence",
                  1,
                  611,
                  7,
                ),
                createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
                createMaterial("Lv 8 Combat Essence", 2, 603, 8),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 8 Gathering Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-763.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 7 Agricultural Livestock Essence",
                  1,
                  611,
                  7,
                ),
                createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
                createMaterial("Lv 8 Combat Essence", 2, 603, 8),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Hollow Pickaxe",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-561.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Hollow Pickaxe",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-561.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 7 Gather Essence", 2, 406, 7),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 7 Combat Essence", 2, 602, 7)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 7 Combat Essence", 2, 602, 7)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Bronze Pickaxe",
      alias: "BronzePickaxe",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-585.png",
      requiresLevel: 9,
      stats: [
        {
          name: "Combatatt",
          typeNumber: "integer",
          values: { min: 20, max: 25 },
        },
        {
          name: "Oreatt",
          typeNumber: "integer",
          values: { min: 689, max: 770 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 8 Agricultural Livestock Essence", 1, 612, 8),
            createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
            createMaterial("Lv 9 Combat Essence", 2, 604, 9),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 8 Agricultural Livestock Essence",
                  1,
                  612,
                  8,
                ),
                createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
                createMaterial("Lv 9 Combat Essence", 2, 604, 9),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 8 Agricultural Livestock Essence",
                  1,
                  612,
                  8,
                ),
                createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
                createMaterial("Lv 9 Combat Essence", 2, 604, 9),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 9 Gathering Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-764.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 8 Agricultural Livestock Essence",
                  1,
                  612,
                  8,
                ),
                createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
                createMaterial("Lv 9 Combat Essence", 2, 604, 9),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Bronze Pickaxe",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-585.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Bronze Pickaxe",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-585.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 8 Combat Essence", 2, 603, 8),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 8 Combat Essence", 2, 603, 8)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 8 Combat Essence", 2, 603, 8)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Iron Axe",
      alias: "IronAxe",
      cdnImage: "https://icons.lumiterra.net/item-icon-92.png",
      requiresLevel: 1,
      stats: [
        {
          name: "Combatatt",
          typeNumber: "integer",
          values: { min: 20, max: 25 },
        },
        {
          name: "Treeatt",
          typeNumber: "integer",
          values: { min: 41, max: 122 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [createMaterial("Lv 1 Combat Essence", 2, 216, 1)],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 1 Combat Essence", 2, 216, 1)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 1 Combat Essence", 2, 216, 1)],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 1 Gathering Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-756.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 1 Combat Essence", 2, 216, 1),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Iron Axe",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-92.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Iron Axe",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-92.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 1 Combat Essence", 2, 216, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 1 Combat Essence", 2, 216, 1)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 1 Combat Essence", 2, 216, 1)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Curse Axe",
      alias: "CurseAxe",
      cdnImage: "https://icons.lumiterra.net/item-icon-93.png",
      requiresLevel: 2,
      stats: [
        {
          name: "Combatatt",
          typeNumber: "integer",
          values: { min: 20, max: 25 },
        },
        {
          name: "Treeatt",
          typeNumber: "integer",
          values: { min: 122, max: 203 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 1 Agricultural Livestock Essence", 1, 213, 1),
            createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
            createMaterial("Lv 2 Combat Essence", 2, 217, 2),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
                createMaterial("Lv 2 Combat Essence", 2, 217, 2),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
                createMaterial("Lv 2 Combat Essence", 2, 217, 2),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 2 Gathering Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-757.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
                createMaterial("Lv 2 Combat Essence", 2, 217, 2),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Curse Axe",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-93.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Curse Axe",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-93.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 1 Combat Essence", 2, 216, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 1 Combat Essence", 2, 216, 1)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 1 Combat Essence", 2, 216, 1)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Blessed Axe",
      alias: "BlessedAxe",
      cdnImage: "https://icons.lumiterra.net/item-icon-94.png",
      requiresLevel: 3,
      stats: [
        {
          name: "Combatatt",
          typeNumber: "integer",
          values: { min: 20, max: 25 },
        },
        {
          name: "Treeatt",
          typeNumber: "integer",
          values: { min: 203, max: 284 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 2 Agricultural Livestock Essence", 1, 214, 2),
            createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
            createMaterial("Lv 3 Combat Essence", 2, 218, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 2 Agricultural Livestock Essence",
                  1,
                  214,
                  2,
                ),
                createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
                createMaterial("Lv 3 Combat Essence", 2, 218, 1),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 2 Agricultural Livestock Essence",
                  1,
                  214,
                  2,
                ),
                createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
                createMaterial("Lv 3 Combat Essence", 2, 218, 1),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 3 Gathering Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-758.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 2 Agricultural Livestock Essence",
                  1,
                  214,
                  2,
                ),
                createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
                createMaterial("Lv 3 Combat Essence", 2, 218, 1),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Blessed Axe",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-94.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Blessed Axe",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-94.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 2 Combat Essence", 2, 217, 2),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 2 Combat Essence", 2, 217, 2)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 2 Combat Essence", 2, 217, 2)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Golden Axe",
      alias: "GoldenAxe",
      cdnImage: "https://icons.lumiterra.net/item-icon-300.png",
      requiresLevel: 4,
      stats: [
        {
          name: "Combatatt",
          typeNumber: "integer",
          values: { min: 20, max: 25 },
        },
        {
          name: "Treeatt",
          typeNumber: "integer",
          values: { min: 284, max: 365 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 3 Agricultural Livestock Essence", 1, 215, 3),
            createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
            createMaterial("Lv 4 Combat Essence", 2, 401, 4),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 3 Agricultural Livestock Essence",
                  1,
                  215,
                  3,
                ),
                createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
                createMaterial("Lv 4 Combat Essence", 2, 401, 4),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 3 Agricultural Livestock Essence",
                  1,
                  215,
                  3,
                ),
                createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
                createMaterial("Lv 4 Combat Essence", 2, 401, 4),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 4 Gathering Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-759.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 3 Agricultural Livestock Essence",
                  1,
                  215,
                  3,
                ),
                createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
                createMaterial("Lv 4 Combat Essence", 2, 401, 4),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Golden Axe",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-300.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Golden Axe",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-300.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 3 Combat Essence", 2, 218, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 3 Combat Essence", 2, 218, 1)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 3 Combat Essence", 2, 218, 1)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Diamond Axe",
      alias: "DiamondAxe",
      cdnImage: "https://icons.lumiterra.net/item-icon-306.png",
      requiresLevel: 5,
      stats: [
        {
          name: "Combatatt",
          typeNumber: "integer",
          values: { min: 20, max: 25 },
        },
        {
          name: "Treeatt",
          typeNumber: "integer",
          values: { min: 365, max: 446 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 4 Agricultural Livestock Essence", 1, 410, 4),
            createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
            createMaterial("Lv 5 Combat Essence", 2, 402, 5),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 4 Agricultural Livestock Essence",
                  1,
                  410,
                  4,
                ),
                createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
                createMaterial("Lv 5 Combat Essence", 2, 402, 5),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 4 Agricultural Livestock Essence",
                  1,
                  410,
                  4,
                ),
                createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
                createMaterial("Lv 5 Combat Essence", 2, 402, 5),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 5 Gathering Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-760.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 4 Agricultural Livestock Essence",
                  1,
                  410,
                  4,
                ),
                createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
                createMaterial("Lv 5 Combat Essence", 2, 402, 5),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Diamond Axe",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-306.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Diamond Axe",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-306.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 4 Combat Essence", 2, 401, 4),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 4 Combat Essence", 2, 401, 4)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 4 Combat Essence", 2, 401, 4)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Star Axe",
      alias: "StarAxe",
      cdnImage: "https://icons.lumiterra.net/item-icon-312.png",
      requiresLevel: 6,
      stats: [
        {
          name: "Combatatt",
          typeNumber: "integer",
          values: { min: 20, max: 25 },
        },
        {
          name: "Treeatt",
          typeNumber: "integer",
          values: { min: 446, max: 527 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 5 Agricultural Livestock Essence", 1, 411, 5),
            createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
            createMaterial("Lv 6 Combat Essence", 2, 403, 6),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 5 Agricultural Livestock Essence",
                  1,
                  411,
                  5,
                ),
                createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
                createMaterial("Lv 6 Combat Essence", 2, 403, 6),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 5 Agricultural Livestock Essence",
                  1,
                  411,
                  5,
                ),
                createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
                createMaterial("Lv 6 Combat Essence", 2, 403, 6),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 6 Gathering Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-761.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 5 Agricultural Livestock Essence",
                  1,
                  411,
                  5,
                ),
                createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
                createMaterial("Lv 6 Combat Essence", 2, 403, 6),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Star Axe",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-312.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Star Axe",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-312.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 5 Combat Essence", 2, 402, 5),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 5 Combat Essence", 2, 402, 5)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 5 Combat Essence", 2, 402, 5)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Lava Axe",
      alias: "LavaAxe",
      cdnImage: "https://icons.lumiterra.net/item-icon-536.png",
      requiresLevel: 7,
      stats: [
        {
          name: "Combatatt",
          typeNumber: "integer",
          values: { min: 20, max: 25 },
        },
        {
          name: "Treeatt",
          typeNumber: "integer",
          values: { min: 527, max: 608 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 6 Agricultural Livestock Essence", 1, 412, 6),
            createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
            createMaterial("Lv 7 Combat Essence", 2, 602, 7),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 6 Agricultural Livestock Essence",
                  1,
                  412,
                  6,
                ),
                createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
                createMaterial("Lv 7 Combat Essence", 2, 602, 7),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 6 Agricultural Livestock Essence",
                  1,
                  412,
                  6,
                ),
                createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
                createMaterial("Lv 7 Combat Essence", 2, 602, 7),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 7 Gathering Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-762.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 6 Agricultural Livestock Essence",
                  1,
                  412,
                  6,
                ),
                createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
                createMaterial("Lv 7 Combat Essence", 2, 602, 7),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Lava Axe",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-536.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Lava Axe",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-536.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 6 Combat Essence", 2, 403, 6),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 6 Combat Essence", 2, 403, 6)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 6 Combat Essence", 2, 403, 6)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Hollow Axe",
      alias: "HollowAxe",
      cdnImage: "https://icons.lumiterra.net/item-icon-560.png",
      requiresLevel: 8,
      stats: [
        {
          name: "Combatatt",
          typeNumber: "integer",
          values: { min: 20, max: 25 },
        },
        {
          name: "Treeatt",
          typeNumber: "integer",
          values: { min: 608, max: 689 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 7 Agricultural Livestock Essence", 1, 611, 7),
            createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
            createMaterial("Lv 8 Combat Essence", 2, 603, 8),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 7 Agricultural Livestock Essence",
                  1,
                  611,
                  7,
                ),
                createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
                createMaterial("Lv 8 Combat Essence", 2, 603, 8),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 7 Agricultural Livestock Essence",
                  1,
                  611,
                  7,
                ),
                createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
                createMaterial("Lv 8 Combat Essence", 2, 603, 8),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 8 Gathering Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-763.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 7 Agricultural Livestock Essence",
                  1,
                  611,
                  7,
                ),
                createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
                createMaterial("Lv 8 Combat Essence", 2, 603, 8),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Hollow Axe",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-560.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Hollow Axe",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-560.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 7 Gather Essence", 2, 406, 7),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 7 Combat Essence", 2, 602, 7)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 7 Combat Essence", 2, 602, 7)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Bronze Axe",
      alias: "BronzeAxe",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-584.png",
      requiresLevel: 9,
      stats: [
        {
          name: "Combatatt",
          typeNumber: "integer",
          values: { min: 20, max: 25 },
        },
        {
          name: "Treeatt",
          typeNumber: "integer",
          values: { min: 689, max: 770 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 8 Agricultural Livestock Essence", 1, 612, 8),
            createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
            createMaterial("Lv 9 Combat Essence", 2, 604, 9),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 8 Agricultural Livestock Essence",
                  1,
                  612,
                  8,
                ),
                createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
                createMaterial("Lv 9 Combat Essence", 2, 604, 9),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 8 Agricultural Livestock Essence",
                  1,
                  612,
                  8,
                ),
                createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
                createMaterial("Lv 9 Combat Essence", 2, 604, 9),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 9 Gathering Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-764.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 8 Agricultural Livestock Essence",
                  1,
                  612,
                  8,
                ),
                createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
                createMaterial("Lv 9 Combat Essence", 2, 604, 9),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Bronze Axe",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-584.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Bronze Axe",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-584.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 8 Combat Essence", 2, 603, 8),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 8 Combat Essence", 2, 603, 8)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 8 Combat Essence", 2, 603, 8)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Copper Sickle",
      alias: "CopperSickle",
      cdnImage: "https://icons.lumiterra.net/item-icon-226.png",
      requiresLevel: 1,
      stats: [
        {
          name: "Combatatt",
          typeNumber: "integer",
          values: { min: 20, max: 25 },
        },
        {
          name: "Grassatt",
          typeNumber: "integer",
          values: { min: 41, max: 122 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [createMaterial("Lv 1 Combat Essence", 2, 216, 1)],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 1 Combat Essence", 2, 216, 1)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 1 Combat Essence", 2, 216, 1)],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 1 Gathering Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-756.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 1 Combat Essence", 2, 216, 1),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Copper Sickle",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-226.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Copper Sickle",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-226.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 1 Combat Essence", 2, 216, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 1 Combat Essence", 2, 216, 1)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 1 Combat Essence", 2, 216, 1)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Iron Sickle",
      alias: "IronSickle",
      cdnImage: "https://icons.lumiterra.net/item-icon-227.png",
      requiresLevel: 2,
      stats: [
        {
          name: "Combatatt",
          typeNumber: "integer",
          values: { min: 20, max: 25 },
        },
        {
          name: "Grassatt",
          typeNumber: "integer",
          values: { min: 122, max: 203 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 1 Agricultural Livestock Essence", 1, 213, 1),
            createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
            createMaterial("Lv 2 Combat Essence", 2, 217, 2),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
                createMaterial("Lv 2 Combat Essence", 2, 217, 2),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
                createMaterial("Lv 2 Combat Essence", 2, 217, 2),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 2 Gathering Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-757.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
                createMaterial("Lv 2 Combat Essence", 2, 217, 2),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Iron Sickle",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-227.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Iron Sickle",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-227.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 1 Combat Essence", 2, 216, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 1 Combat Essence", 2, 216, 1)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 1 Combat Essence", 2, 216, 1)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Crystal Sickle",
      alias: "CrystalSickle",
      cdnImage: "https://icons.lumiterra.net/item-icon-228.png",
      requiresLevel: 3,
      stats: [
        {
          name: "Combatatt",
          typeNumber: "integer",
          values: { min: 20, max: 25 },
        },
        {
          name: "Grassatt",
          typeNumber: "integer",
          values: { min: 203, max: 284 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 2 Agricultural Livestock Essence", 1, 214, 2),
            createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
            createMaterial("Lv 3 Combat Essence", 2, 218, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 2 Agricultural Livestock Essence",
                  1,
                  214,
                  2,
                ),
                createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
                createMaterial("Lv 3 Combat Essence", 2, 218, 1),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 2 Agricultural Livestock Essence",
                  1,
                  214,
                  2,
                ),
                createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
                createMaterial("Lv 3 Combat Essence", 2, 218, 1),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 3 Gathering Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-758.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 2 Agricultural Livestock Essence",
                  1,
                  214,
                  2,
                ),
                createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
                createMaterial("Lv 3 Combat Essence", 2, 218, 1),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Crystal Sickle",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-228.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Crystal Sickle",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-228.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 2 Combat Essence", 2, 217, 2),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 2 Combat Essence", 2, 217, 2)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 2 Combat Essence", 2, 217, 2)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Golden Sickle",
      alias: "GoldenSickle",
      cdnImage: "https://icons.lumiterra.net/item-icon-303.png",
      requiresLevel: 4,
      stats: [
        {
          name: "Combatatt",
          typeNumber: "integer",
          values: { min: 20, max: 25 },
        },
        {
          name: "Grassatt",
          typeNumber: "integer",
          values: { min: 284, max: 365 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 3 Agricultural Livestock Essence", 1, 215, 3),
            createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
            createMaterial("Lv 4 Combat Essence", 2, 401, 4),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 3 Agricultural Livestock Essence",
                  1,
                  215,
                  3,
                ),
                createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
                createMaterial("Lv 4 Combat Essence", 2, 401, 4),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 3 Agricultural Livestock Essence",
                  1,
                  215,
                  3,
                ),
                createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
                createMaterial("Lv 4 Combat Essence", 2, 401, 4),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 4 Gathering Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-759.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 3 Agricultural Livestock Essence",
                  1,
                  215,
                  3,
                ),
                createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
                createMaterial("Lv 4 Combat Essence", 2, 401, 4),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Golden Sickle",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-303.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Golden Sickle",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-303.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 3 Combat Essence", 2, 218, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 3 Combat Essence", 2, 218, 1)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 3 Combat Essence", 2, 218, 1)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Diamond Sickle",
      alias: "DiamondSickle",
      cdnImage: "https://icons.lumiterra.net/item-icon-309.png",
      requiresLevel: 5,
      stats: [
        {
          name: "Combatatt",
          typeNumber: "integer",
          values: { min: 20, max: 25 },
        },
        {
          name: "Grassatt",
          typeNumber: "integer",
          values: { min: 365, max: 446 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 4 Agricultural Livestock Essence", 1, 410, 4),
            createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
            createMaterial("Lv 5 Combat Essence", 2, 402, 5),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 4 Agricultural Livestock Essence",
                  1,
                  410,
                  4,
                ),
                createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
                createMaterial("Lv 5 Combat Essence", 2, 402, 5),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 4 Agricultural Livestock Essence",
                  1,
                  410,
                  4,
                ),
                createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
                createMaterial("Lv 5 Combat Essence", 2, 402, 5),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 5 Gathering Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-760.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 4 Agricultural Livestock Essence",
                  1,
                  410,
                  4,
                ),
                createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
                createMaterial("Lv 5 Combat Essence", 2, 402, 5),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Diamond Sickle",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-309.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Diamond Sickle",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-309.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 4 Combat Essence", 2, 401, 4),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 4 Combat Essence", 2, 401, 4)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 4 Combat Essence", 2, 401, 4)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Star Sickle",
      alias: "StarSickle",
      cdnImage: "https://icons.lumiterra.net/item-icon-315.png",
      requiresLevel: 6,
      stats: [
        {
          name: "Combatatt",
          typeNumber: "integer",
          values: { min: 20, max: 25 },
        },
        {
          name: "Grassatt",
          typeNumber: "integer",
          values: { min: 446, max: 527 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 5 Agricultural Livestock Essence", 1, 411, 5),
            createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
            createMaterial("Lv 6 Combat Essence", 2, 403, 6),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 5 Agricultural Livestock Essence",
                  1,
                  411,
                  5,
                ),
                createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
                createMaterial("Lv 6 Combat Essence", 2, 403, 6),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 5 Agricultural Livestock Essence",
                  1,
                  411,
                  5,
                ),
                createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
                createMaterial("Lv 6 Combat Essence", 2, 403, 6),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 6 Gathering Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-761.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 5 Agricultural Livestock Essence",
                  1,
                  411,
                  5,
                ),
                createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
                createMaterial("Lv 6 Combat Essence", 2, 403, 6),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Star Sickle",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-315.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Star Sickle",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-315.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 5 Combat Essence", 2, 402, 5),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 5 Combat Essence", 2, 402, 5)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 5 Combat Essence", 2, 402, 5)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Lava Sickle",
      alias: "LavaSickle",
      cdnImage: "https://icons.lumiterra.net/item-icon-535.png",
      requiresLevel: 7,
      stats: [
        {
          name: "Combatatt",
          typeNumber: "integer",
          values: { min: 20, max: 25 },
        },
        {
          name: "Grassatt",
          typeNumber: "integer",
          values: { min: 527, max: 608 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 6 Agricultural Livestock Essence", 1, 412, 6),
            createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
            createMaterial("Lv 7 Combat Essence", 2, 602, 7),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 6 Agricultural Livestock Essence",
                  1,
                  412,
                  6,
                ),
                createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
                createMaterial("Lv 7 Combat Essence", 2, 602, 7),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 6 Agricultural Livestock Essence",
                  1,
                  412,
                  6,
                ),
                createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
                createMaterial("Lv 7 Combat Essence", 2, 602, 7),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 7 Gathering Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-762.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 6 Agricultural Livestock Essence",
                  1,
                  412,
                  6,
                ),
                createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
                createMaterial("Lv 7 Combat Essence", 2, 602, 7),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Lava Sickle",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-535.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Lava Sickle",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-535.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 6 Combat Essence", 2, 403, 6),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 6 Combat Essence", 2, 403, 6)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 6 Combat Essence", 2, 403, 6)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Hollow Sickle",
      alias: "HollowSickle",
      cdnImage: "https://icons.lumiterra.net/item-icon-559.png",
      requiresLevel: 8,
      stats: [
        {
          name: "Combatatt",
          typeNumber: "integer",
          values: { min: 20, max: 25 },
        },
        {
          name: "Grassatt",
          typeNumber: "integer",
          values: { min: 608, max: 689 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 7 Agricultural Livestock Essence", 1, 611, 7),
            createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
            createMaterial("Lv 8 Combat Essence", 2, 603, 8),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 7 Agricultural Livestock Essence",
                  1,
                  611,
                  7,
                ),
                createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
                createMaterial("Lv 8 Combat Essence", 2, 603, 8),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 7 Agricultural Livestock Essence",
                  1,
                  611,
                  7,
                ),
                createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
                createMaterial("Lv 8 Combat Essence", 2, 603, 8),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 8 Gathering Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-763.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 7 Agricultural Livestock Essence",
                  1,
                  611,
                  7,
                ),
                createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
                createMaterial("Lv 8 Combat Essence", 2, 603, 8),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Hollow Sickle",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-559.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Hollow Sickle",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-559.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 7 Gather Essence", 2, 406, 7),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 7 Combat Essence", 2, 602, 7)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 7 Combat Essence", 2, 602, 7)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Bronze Sickle",
      alias: "BronzeSickle",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-583.png",
      requiresLevel: 9,
      stats: [
        {
          name: "Combatatt",
          typeNumber: "integer",
          values: { min: 20, max: 25 },
        },
        {
          name: "Grassatt",
          typeNumber: "integer",
          values: { min: 689, max: 770 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 8 Agricultural Livestock Essence", 1, 612, 8),
            createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
            createMaterial("Lv 9 Combat Essence", 2, 604, 9),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 8 Agricultural Livestock Essence",
                  1,
                  612,
                  8,
                ),
                createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
                createMaterial("Lv 9 Combat Essence", 2, 604, 9),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 8 Agricultural Livestock Essence",
                  1,
                  612,
                  8,
                ),
                createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
                createMaterial("Lv 9 Combat Essence", 2, 604, 9),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 9 Gathering Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-764.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 8 Agricultural Livestock Essence",
                  1,
                  612,
                  8,
                ),
                createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
                createMaterial("Lv 9 Combat Essence", 2, 604, 9),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Bronze Sickle",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-583.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Bronze Sickle",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-583.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 8 Combat Essence", 2, 603, 8),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 8 Combat Essence", 2, 603, 8)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 8 Combat Essence", 2, 603, 8)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Gathering Hat",
      alias: "GatheringHatLv1",
      cdnImage: "https://icons.lumiterra.net/item-icon-116.png",
      requiresLevel: 1,
      stats: [
        {
          name: "Grassproficiency",
          typeNumber: "integer",
          values: { min: 8, max: 25 },
        },
        {
          name: "Oreproficiency",
          typeNumber: "integer",
          values: { min: 8, max: 25 },
        },
        {
          name: "Treeproficiency",
          typeNumber: "integer",
          values: { min: 8, max: 25 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [createMaterial("Lv 1 Combat Essence", 2, 216, 1)],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 1 Combat Essence", 2, 216, 1)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 1 Combat Essence", 2, 216, 1)],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 1 Gathering Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-756.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 1 Combat Essence", 2, 216, 1),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Gathering Hat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-116.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Gathering Hat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-116.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 1 Combat Essence", 2, 216, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 1 Combat Essence", 2, 216, 1)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 1 Combat Essence", 2, 216, 1)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Gathering Hat",
      alias: "GatheringHatLv2",
      cdnImage: "https://icons.lumiterra.net/item-icon-117.png",
      requiresLevel: 2,
      stats: [
        {
          name: "Grassproficiency",
          typeNumber: "integer",
          values: { min: 25, max: 41 },
        },
        {
          name: "Oreproficiency",
          typeNumber: "integer",
          values: { min: 25, max: 41 },
        },
        {
          name: "Treeproficiency",
          typeNumber: "integer",
          values: { min: 25, max: 41 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 1 Agricultural Livestock Essence", 1, 213, 1),
            createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
            createMaterial("Lv 2 Combat Essence", 2, 217, 2),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
                createMaterial("Lv 2 Combat Essence", 2, 217, 2),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
                createMaterial("Lv 2 Combat Essence", 2, 217, 2),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 2 Gathering Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-757.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
                createMaterial("Lv 2 Combat Essence", 2, 217, 2),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Gathering Hat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-117.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Gathering Hat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-117.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 1 Combat Essence", 2, 216, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 1 Combat Essence", 2, 216, 1)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 1 Combat Essence", 2, 216, 1)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Gathering Hat",
      alias: "GatheringHatLv3",
      cdnImage: "https://icons.lumiterra.net/item-icon-118.png",
      requiresLevel: 3,
      stats: [
        {
          name: "Grassproficiency",
          typeNumber: "integer",
          values: { min: 41, max: 58 },
        },
        {
          name: "Oreproficiency",
          typeNumber: "integer",
          values: { min: 41, max: 58 },
        },
        {
          name: "Treeproficiency",
          typeNumber: "integer",
          values: { min: 41, max: 58 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 2 Agricultural Livestock Essence", 1, 214, 2),
            createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
            createMaterial("Lv 3 Combat Essence", 2, 218, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 2 Agricultural Livestock Essence",
                  1,
                  214,
                  2,
                ),
                createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
                createMaterial("Lv 3 Combat Essence", 2, 218, 1),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 2 Agricultural Livestock Essence",
                  1,
                  214,
                  2,
                ),
                createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
                createMaterial("Lv 3 Combat Essence", 2, 218, 1),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 3 Gathering Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-758.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 2 Agricultural Livestock Essence",
                  1,
                  214,
                  2,
                ),
                createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
                createMaterial("Lv 3 Combat Essence", 2, 218, 1),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Crystal Gather Hat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-118.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Crystal Gather Hat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-118.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 2 Combat Essence", 2, 217, 2),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 2 Combat Essence", 2, 217, 2)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 2 Combat Essence", 2, 217, 2)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Golden Gather Hat",
      alias: "GoldenGatherHat",
      cdnImage: "https://icons.lumiterra.net/item-icon-320.png",
      requiresLevel: 4,
      stats: [
        {
          name: "Grassproficiency",
          typeNumber: "integer",
          values: { min: 58, max: 74 },
        },
        {
          name: "Oreproficiency",
          typeNumber: "integer",
          values: { min: 58, max: 74 },
        },
        {
          name: "Treeproficiency",
          typeNumber: "integer",
          values: { min: 58, max: 74 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 3 Agricultural Livestock Essence", 1, 215, 3),
            createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
            createMaterial("Lv 4 Combat Essence", 2, 401, 4),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 3 Agricultural Livestock Essence",
                  1,
                  215,
                  3,
                ),
                createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
                createMaterial("Lv 4 Combat Essence", 2, 401, 4),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 3 Agricultural Livestock Essence",
                  1,
                  215,
                  3,
                ),
                createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
                createMaterial("Lv 4 Combat Essence", 2, 401, 4),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 4 Gathering Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-759.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 3 Agricultural Livestock Essence",
                  1,
                  215,
                  3,
                ),
                createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
                createMaterial("Lv 4 Combat Essence", 2, 401, 4),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Golden Gather Hat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-320.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Golden Gather Hat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-320.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 3 Combat Essence", 2, 218, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 3 Combat Essence", 2, 218, 1)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 3 Combat Essence", 2, 218, 1)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Diamond Gather Hat",
      alias: "DiamondGatherHat",
      cdnImage: "https://icons.lumiterra.net/item-icon-325.png",
      requiresLevel: 5,
      stats: [
        {
          name: "Grassproficiency",
          typeNumber: "integer",
          values: { min: 74, max: 91 },
        },
        {
          name: "Oreproficiency",
          typeNumber: "integer",
          values: { min: 74, max: 91 },
        },
        {
          name: "Treeproficiency",
          typeNumber: "integer",
          values: { min: 74, max: 91 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 4 Agricultural Livestock Essence", 1, 410, 4),
            createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
            createMaterial("Lv 5 Combat Essence", 2, 402, 5),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 4 Agricultural Livestock Essence",
                  1,
                  410,
                  4,
                ),
                createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
                createMaterial("Lv 5 Combat Essence", 2, 402, 5),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 4 Agricultural Livestock Essence",
                  1,
                  410,
                  4,
                ),
                createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
                createMaterial("Lv 5 Combat Essence", 2, 402, 5),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 5 Gathering Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-760.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 4 Agricultural Livestock Essence",
                  1,
                  410,
                  4,
                ),
                createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
                createMaterial("Lv 5 Combat Essence", 2, 402, 5),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Diamond Gather Hat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-325.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Diamond Gather Hat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-325.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 4 Combat Essence", 2, 401, 4),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 4 Combat Essence", 2, 401, 4)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 4 Combat Essence", 2, 401, 4)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Star Gather Hat",
      alias: "StarGatherHat",
      cdnImage: "https://icons.lumiterra.net/item-icon-330.png",
      requiresLevel: 6,
      stats: [
        {
          name: "Grassproficiency",
          typeNumber: "integer",
          values: { min: 91, max: 107 },
        },
        {
          name: "Oreproficiency",
          typeNumber: "integer",
          values: { min: 91, max: 107 },
        },
        {
          name: "Treeproficiency",
          typeNumber: "integer",
          values: { min: 91, max: 107 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 5 Agricultural Livestock Essence", 1, 411, 5),
            createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
            createMaterial("Lv 6 Combat Essence", 2, 403, 6),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 5 Agricultural Livestock Essence",
                  1,
                  411,
                  5,
                ),
                createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
                createMaterial("Lv 6 Combat Essence", 2, 403, 6),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 5 Agricultural Livestock Essence",
                  1,
                  411,
                  5,
                ),
                createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
                createMaterial("Lv 6 Combat Essence", 2, 403, 6),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 6 Gathering Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-761.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 5 Agricultural Livestock Essence",
                  1,
                  411,
                  5,
                ),
                createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
                createMaterial("Lv 6 Combat Essence", 2, 403, 6),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Star Gather Hat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-330.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Star Gather Hat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-330.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 5 Combat Essence", 2, 402, 5),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 5 Combat Essence", 2, 402, 5)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 5 Combat Essence", 2, 402, 5)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Lava Gather Hat",
      alias: "LavaGatherHat",
      cdnImage: "https://icons.lumiterra.net/item-icon-538.png",
      requiresLevel: 7,
      stats: [
        {
          name: "Grassproficiency",
          typeNumber: "integer",
          values: { min: 107, max: 124 },
        },
        {
          name: "Oreproficiency",
          typeNumber: "integer",
          values: { min: 107, max: 124 },
        },
        {
          name: "Treeproficiency",
          typeNumber: "integer",
          values: { min: 107, max: 124 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 6 Agricultural Livestock Essence", 1, 412, 6),
            createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
            createMaterial("Lv 7 Combat Essence", 2, 602, 7),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 6 Agricultural Livestock Essence",
                  1,
                  412,
                  6,
                ),
                createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
                createMaterial("Lv 7 Combat Essence", 2, 602, 7),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 6 Agricultural Livestock Essence",
                  1,
                  412,
                  6,
                ),
                createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
                createMaterial("Lv 7 Combat Essence", 2, 602, 7),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 7 Gathering Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-762.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 6 Agricultural Livestock Essence",
                  1,
                  412,
                  6,
                ),
                createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
                createMaterial("Lv 7 Combat Essence", 2, 602, 7),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Lava Gather Hat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-538.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Lava Gather Hat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-538.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 6 Combat Essence", 2, 403, 6),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 6 Combat Essence", 2, 403, 6)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 6 Combat Essence", 2, 403, 6)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Hollow Gather Hat",
      alias: "HollowGatherHat",
      cdnImage: "https://icons.lumiterra.net/item-icon-562.png",
      requiresLevel: 8,
      stats: [
        {
          name: "Grassproficiency",
          typeNumber: "integer",
          values: { min: 124, max: 142 },
        },
        {
          name: "Oreproficiency",
          typeNumber: "integer",
          values: { min: 124, max: 142 },
        },
        {
          name: "Treeproficiency",
          typeNumber: "integer",
          values: { min: 124, max: 142 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 7 Agricultural Livestock Essence", 1, 611, 7),
            createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
            createMaterial("Lv 8 Combat Essence", 2, 603, 8),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 7 Agricultural Livestock Essence",
                  1,
                  611,
                  7,
                ),
                createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
                createMaterial("Lv 8 Combat Essence", 2, 603, 8),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 7 Agricultural Livestock Essence",
                  1,
                  611,
                  7,
                ),
                createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
                createMaterial("Lv 8 Combat Essence", 2, 603, 8),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 8 Gathering Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-763.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 7 Agricultural Livestock Essence",
                  1,
                  611,
                  7,
                ),
                createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
                createMaterial("Lv 8 Combat Essence", 2, 603, 8),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Hollow Gather Hat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-562.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Hollow Gather Hat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-562.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 7 Gather Essence", 2, 406, 7),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 7 Combat Essence", 2, 602, 7)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 7 Combat Essence", 2, 602, 7)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Bronze Gather Hat",
      alias: "BronzeGatherHat",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-586.png",
      requiresLevel: 9,
      stats: [
        {
          name: "Grassproficiency",
          typeNumber: "integer",
          values: { min: 142, max: 160 },
        },
        {
          name: "Oreproficiency",
          typeNumber: "integer",
          values: { min: 142, max: 160 },
        },
        {
          name: "Treeproficiency",
          typeNumber: "integer",
          values: { min: 142, max: 160 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 8 Agricultural Livestock Essence", 1, 612, 8),
            createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
            createMaterial("Lv 9 Combat Essence", 2, 604, 9),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 8 Agricultural Livestock Essence",
                  1,
                  612,
                  8,
                ),
                createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
                createMaterial("Lv 9 Combat Essence", 2, 604, 9),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 8 Agricultural Livestock Essence",
                  1,
                  612,
                  8,
                ),
                createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
                createMaterial("Lv 9 Combat Essence", 2, 604, 9),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 9 Gathering Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-764.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 8 Agricultural Livestock Essence",
                  1,
                  612,
                  8,
                ),
                createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
                createMaterial("Lv 9 Combat Essence", 2, 604, 9),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Bronze Gather Hat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-586.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Bronze Gather Hat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-586.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 8 Combat Essence", 2, 603, 8),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 8 Combat Essence", 2, 603, 8)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 8 Combat Essence", 2, 603, 8)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Gathering Jacket",
      alias: "GatheringJacketLv1",
      cdnImage: "https://icons.lumiterra.net/item-icon-119.png",
      requiresLevel: 1,
      stats: [
        {
          name: "Grassproficiency",
          typeNumber: "integer",
          values: { min: 10, max: 30 },
        },
        {
          name: "Oreproficiency",
          typeNumber: "integer",
          values: { min: 10, max: 30 },
        },
        {
          name: "Treeproficiency",
          typeNumber: "integer",
          values: { min: 10, max: 30 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [createMaterial("Lv 1 Combat Essence", 2, 216, 1)],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 1 Combat Essence", 2, 216, 1)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 1 Combat Essence", 2, 216, 1)],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 1 Gathering Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-756.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 1 Combat Essence", 2, 216, 1),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Gathering Jacket",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-119.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Gathering Jacket",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-119.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 1 Combat Essence", 2, 216, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 1 Combat Essence", 2, 216, 1)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 1 Combat Essence", 2, 216, 1)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Gathering Jacket",
      alias: "GatheringJacketLv2",
      cdnImage: "https://icons.lumiterra.net/item-icon-120.png",
      requiresLevel: 2,
      stats: [
        {
          name: "Grassproficiency",
          typeNumber: "integer",
          values: { min: 30, max: 49 },
        },
        {
          name: "Oreproficiency",
          typeNumber: "integer",
          values: { min: 30, max: 49 },
        },
        {
          name: "Treeproficiency",
          typeNumber: "integer",
          values: { min: 30, max: 49 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 1 Agricultural Livestock Essence", 1, 213, 1),
            createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
            createMaterial("Lv 2 Combat Essence", 2, 217, 2),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
                createMaterial("Lv 2 Combat Essence", 2, 217, 2),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
                createMaterial("Lv 2 Combat Essence", 2, 217, 2),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 2 Gathering Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-757.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
                createMaterial("Lv 2 Combat Essence", 2, 217, 2),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Gathering Jacket",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-120.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Gathering Jacket",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-120.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 1 Combat Essence", 2, 216, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 1 Combat Essence", 2, 216, 1)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 1 Combat Essence", 2, 216, 1)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Gathering Jacket",
      alias: "GatheringJacketLv3",
      cdnImage: "https://icons.lumiterra.net/item-icon-121.png",
      requiresLevel: 3,
      stats: [
        {
          name: "Grassproficiency",
          typeNumber: "integer",
          values: { min: 49, max: 69 },
        },
        {
          name: "Oreproficiency",
          typeNumber: "integer",
          values: { min: 49, max: 69 },
        },
        {
          name: "Treeproficiency",
          typeNumber: "integer",
          values: { min: 49, max: 69 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 2 Agricultural Livestock Essence", 1, 214, 2),
            createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
            createMaterial("Lv 3 Combat Essence", 2, 218, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 2 Agricultural Livestock Essence",
                  1,
                  214,
                  2,
                ),
                createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
                createMaterial("Lv 3 Combat Essence", 2, 218, 1),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 2 Agricultural Livestock Essence",
                  1,
                  214,
                  2,
                ),
                createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
                createMaterial("Lv 3 Combat Essence", 2, 218, 1),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 3 Gathering Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-758.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 2 Agricultural Livestock Essence",
                  1,
                  214,
                  2,
                ),
                createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
                createMaterial("Lv 3 Combat Essence", 2, 218, 1),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Crystal Gather Coat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-121.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Crystal Gather Coat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-121.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 2 Combat Essence", 2, 217, 2),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 2 Combat Essence", 2, 217, 2)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 2 Combat Essence", 2, 217, 2)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Golden Gather Coat",
      alias: "GoldenGatherCoat",
      cdnImage: "https://icons.lumiterra.net/item-icon-321.png",
      requiresLevel: 4,
      stats: [
        {
          name: "Grassproficiency",
          typeNumber: "integer",
          values: { min: 69, max: 89 },
        },
        {
          name: "Oreproficiency",
          typeNumber: "integer",
          values: { min: 69, max: 89 },
        },
        {
          name: "Treeproficiency",
          typeNumber: "integer",
          values: { min: 69, max: 89 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 3 Agricultural Livestock Essence", 1, 215, 3),
            createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
            createMaterial("Lv 4 Combat Essence", 2, 401, 4),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 3 Agricultural Livestock Essence",
                  1,
                  215,
                  3,
                ),
                createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
                createMaterial("Lv 4 Combat Essence", 2, 401, 4),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 3 Agricultural Livestock Essence",
                  1,
                  215,
                  3,
                ),
                createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
                createMaterial("Lv 4 Combat Essence", 2, 401, 4),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 4 Gathering Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-759.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 3 Agricultural Livestock Essence",
                  1,
                  215,
                  3,
                ),
                createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
                createMaterial("Lv 4 Combat Essence", 2, 401, 4),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Golden Gather Coat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-321.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Golden Gather Coat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-321.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 3 Combat Essence", 2, 218, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 3 Combat Essence", 2, 218, 1)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 3 Combat Essence", 2, 218, 1)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Diamond Gather Coat",
      alias: "DiamondGatherCoat",
      cdnImage: "https://icons.lumiterra.net/item-icon-326.png",
      requiresLevel: 5,
      stats: [
        {
          name: "Grassproficiency",
          typeNumber: "integer",
          values: { min: 89, max: 109 },
        },
        {
          name: "Oreproficiency",
          typeNumber: "integer",
          values: { min: 89, max: 109 },
        },
        {
          name: "Treeproficiency",
          typeNumber: "integer",
          values: { min: 89, max: 109 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 4 Agricultural Livestock Essence", 1, 410, 4),
            createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
            createMaterial("Lv 5 Combat Essence", 2, 402, 5),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 4 Agricultural Livestock Essence",
                  1,
                  410,
                  4,
                ),
                createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
                createMaterial("Lv 5 Combat Essence", 2, 402, 5),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 4 Agricultural Livestock Essence",
                  1,
                  410,
                  4,
                ),
                createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
                createMaterial("Lv 5 Combat Essence", 2, 402, 5),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 5 Gathering Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-760.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 4 Agricultural Livestock Essence",
                  1,
                  410,
                  4,
                ),
                createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
                createMaterial("Lv 5 Combat Essence", 2, 402, 5),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Diamond Gather Coat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-326.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Diamond Gather Coat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-326.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 4 Combat Essence", 2, 401, 4),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 4 Combat Essence", 2, 401, 4)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 4 Combat Essence", 2, 401, 4)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Star Gather Coat",
      alias: "StarGatherCoat",
      cdnImage: "https://icons.lumiterra.net/item-icon-331.png",
      requiresLevel: 6,
      stats: [
        {
          name: "Grassproficiency",
          typeNumber: "integer",
          values: { min: 109, max: 128 },
        },
        {
          name: "Oreproficiency",
          typeNumber: "integer",
          values: { min: 109, max: 128 },
        },
        {
          name: "Treeproficiency",
          typeNumber: "integer",
          values: { min: 109, max: 128 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 5 Agricultural Livestock Essence", 1, 411, 5),
            createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
            createMaterial("Lv 6 Combat Essence", 2, 403, 6),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 5 Agricultural Livestock Essence",
                  1,
                  411,
                  5,
                ),
                createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
                createMaterial("Lv 6 Combat Essence", 2, 403, 6),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 5 Agricultural Livestock Essence",
                  1,
                  411,
                  5,
                ),
                createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
                createMaterial("Lv 6 Combat Essence", 2, 403, 6),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 6 Gathering Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-761.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 5 Agricultural Livestock Essence",
                  1,
                  411,
                  5,
                ),
                createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
                createMaterial("Lv 6 Combat Essence", 2, 403, 6),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Star Gather Coat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-331.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Star Gather Coat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-331.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 5 Combat Essence", 2, 402, 5),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 5 Combat Essence", 2, 402, 5)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 5 Combat Essence", 2, 402, 5)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Lava Gather Coat",
      alias: "LavaGatherCoat",
      cdnImage: "https://icons.lumiterra.net/item-icon-539.png",
      requiresLevel: 7,
      stats: [
        {
          name: "Grassproficiency",
          typeNumber: "integer",
          values: { min: 128, max: 148 },
        },
        {
          name: "Oreproficiency",
          typeNumber: "integer",
          values: { min: 128, max: 148 },
        },
        {
          name: "Treeproficiency",
          typeNumber: "integer",
          values: { min: 128, max: 148 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 6 Agricultural Livestock Essence", 1, 412, 6),
            createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
            createMaterial("Lv 7 Combat Essence", 2, 602, 7),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 6 Agricultural Livestock Essence",
                  1,
                  412,
                  6,
                ),
                createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
                createMaterial("Lv 7 Combat Essence", 2, 602, 7),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 6 Agricultural Livestock Essence",
                  1,
                  412,
                  6,
                ),
                createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
                createMaterial("Lv 7 Combat Essence", 2, 602, 7),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 7 Gathering Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-762.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 6 Agricultural Livestock Essence",
                  1,
                  412,
                  6,
                ),
                createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
                createMaterial("Lv 7 Combat Essence", 2, 602, 7),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Lava Gather Coat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-539.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Lava Gather Coat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-539.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 6 Combat Essence", 2, 403, 6),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 6 Combat Essence", 2, 403, 6)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 6 Combat Essence", 2, 403, 6)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Hollow Gather Coat",
      alias: "HollowGatherCoat",
      cdnImage: "https://icons.lumiterra.net/item-icon-563.png",
      requiresLevel: 8,
      stats: [
        {
          name: "Grassproficiency",
          typeNumber: "integer",
          values: { min: 148, max: 168 },
        },
        {
          name: "Oreproficiency",
          typeNumber: "integer",
          values: { min: 148, max: 168 },
        },
        {
          name: "Treeproficiency",
          typeNumber: "integer",
          values: { min: 148, max: 168 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 7 Agricultural Livestock Essence", 1, 611, 7),
            createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
            createMaterial("Lv 8 Combat Essence", 2, 603, 8),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 7 Agricultural Livestock Essence",
                  1,
                  611,
                  7,
                ),
                createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
                createMaterial("Lv 8 Combat Essence", 2, 603, 8),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 7 Agricultural Livestock Essence",
                  1,
                  611,
                  7,
                ),
                createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
                createMaterial("Lv 8 Combat Essence", 2, 603, 8),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 8 Gathering Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-763.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 7 Agricultural Livestock Essence",
                  1,
                  611,
                  7,
                ),
                createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
                createMaterial("Lv 8 Combat Essence", 2, 603, 8),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Hollow Gather Coat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-563.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Hollow Gather Coat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-563.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 7 Gather Essence", 2, 406, 7),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 7 Combat Essence", 2, 602, 7)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 7 Combat Essence", 2, 602, 7)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Bronze Gather Coat",
      alias: "BronzeGatherCoat",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-587.png",
      requiresLevel: 9,
      stats: [
        {
          name: "Grassproficiency",
          typeNumber: "integer",
          values: { min: 168, max: 188 },
        },
        {
          name: "Oreproficiency",
          typeNumber: "integer",
          values: { min: 168, max: 188 },
        },
        {
          name: "Treeproficiency",
          typeNumber: "integer",
          values: { min: 168, max: 188 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 8 Agricultural Livestock Essence", 1, 612, 8),
            createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
            createMaterial("Lv 9 Combat Essence", 2, 604, 9),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 8 Agricultural Livestock Essence",
                  1,
                  612,
                  8,
                ),
                createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
                createMaterial("Lv 9 Combat Essence", 2, 604, 9),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 8 Agricultural Livestock Essence",
                  1,
                  612,
                  8,
                ),
                createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
                createMaterial("Lv 9 Combat Essence", 2, 604, 9),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 9 Gathering Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-764.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 8 Agricultural Livestock Essence",
                  1,
                  612,
                  8,
                ),
                createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
                createMaterial("Lv 9 Combat Essence", 2, 604, 9),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Bronze Gather Coat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-587.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Bronze Gather Coat",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-587.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 8 Combat Essence", 2, 603, 8),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 8 Combat Essence", 2, 603, 8)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 8 Combat Essence", 2, 603, 8)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Gathering Pants",
      alias: "GatheringPantsLv1",
      cdnImage: "https://icons.lumiterra.net/item-icon-122.png",
      requiresLevel: 1,
      stats: [
        {
          name: "Grassproficiency",
          typeNumber: "integer",
          values: { min: 8, max: 24 },
        },
        {
          name: "Oreproficiency",
          typeNumber: "integer",
          values: { min: 8, max: 24 },
        },
        {
          name: "Treeproficiency",
          typeNumber: "integer",
          values: { min: 8, max: 24 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [createMaterial("Lv 1 Combat Essence", 2, 216, 1)],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 1 Combat Essence", 2, 216, 1)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 1 Combat Essence", 2, 216, 1)],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 1 Gathering Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-756.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 1 Combat Essence", 2, 216, 1),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Gathering Pants",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-122.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Gathering Pants",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-122.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 1 Combat Essence", 2, 216, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 1 Combat Essence", 2, 216, 1)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 1 Combat Essence", 2, 216, 1)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Gathering Pants",
      alias: "GatheringPantsLv2",
      cdnImage: "https://icons.lumiterra.net/item-icon-123.png",
      requiresLevel: 2,
      stats: [
        {
          name: "Grassproficiency",
          typeNumber: "integer",
          values: { min: 24, max: 39 },
        },
        {
          name: "Oreproficiency",
          typeNumber: "integer",
          values: { min: 24, max: 39 },
        },
        {
          name: "Treeproficiency",
          typeNumber: "integer",
          values: { min: 24, max: 39 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 1 Agricultural Livestock Essence", 1, 213, 1),
            createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
            createMaterial("Lv 2 Combat Essence", 2, 217, 2),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
                createMaterial("Lv 2 Combat Essence", 2, 217, 2),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
                createMaterial("Lv 2 Combat Essence", 2, 217, 2),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 2 Gathering Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-757.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
                createMaterial("Lv 2 Combat Essence", 2, 217, 2),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Gathering Pants",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-123.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Gathering Pants",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-123.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 1 Combat Essence", 2, 216, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 1 Combat Essence", 2, 216, 1)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 1 Combat Essence", 2, 216, 1)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Gathering Pants",
      alias: "GatheringPantsLv3",
      cdnImage: "https://icons.lumiterra.net/item-icon-124.png",
      requiresLevel: 3,
      stats: [
        {
          name: "Grassproficiency",
          typeNumber: "integer",
          values: { min: 39, max: 55 },
        },
        {
          name: "Oreproficiency",
          typeNumber: "integer",
          values: { min: 39, max: 55 },
        },
        {
          name: "Treeproficiency",
          typeNumber: "integer",
          values: { min: 39, max: 55 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 2 Agricultural Livestock Essence", 1, 214, 2),
            createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
            createMaterial("Lv 3 Combat Essence", 2, 218, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 2 Agricultural Livestock Essence",
                  1,
                  214,
                  2,
                ),
                createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
                createMaterial("Lv 3 Combat Essence", 2, 218, 1),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 2 Agricultural Livestock Essence",
                  1,
                  214,
                  2,
                ),
                createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
                createMaterial("Lv 3 Combat Essence", 2, 218, 1),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 3 Gathering Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-758.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 2 Agricultural Livestock Essence",
                  1,
                  214,
                  2,
                ),
                createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
                createMaterial("Lv 3 Combat Essence", 2, 218, 1),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Crystal Gather Pants",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-124.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Crystal Gather Pants",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-124.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 2 Combat Essence", 2, 217, 2),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 2 Combat Essence", 2, 217, 2)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 2 Combat Essence", 2, 217, 2)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Golden Gather Pants",
      alias: "GoldenGatherPants",
      cdnImage: "https://icons.lumiterra.net/item-icon-323.png",
      requiresLevel: 4,
      stats: [
        {
          name: "Grassproficiency",
          typeNumber: "integer",
          values: { min: 55, max: 71 },
        },
        {
          name: "Oreproficiency",
          typeNumber: "integer",
          values: { min: 55, max: 71 },
        },
        {
          name: "Treeproficiency",
          typeNumber: "integer",
          values: { min: 55, max: 71 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 3 Agricultural Livestock Essence", 1, 215, 3),
            createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
            createMaterial("Lv 4 Combat Essence", 2, 401, 4),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 3 Agricultural Livestock Essence",
                  1,
                  215,
                  3,
                ),
                createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
                createMaterial("Lv 4 Combat Essence", 2, 401, 4),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 3 Agricultural Livestock Essence",
                  1,
                  215,
                  3,
                ),
                createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
                createMaterial("Lv 4 Combat Essence", 2, 401, 4),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 4 Gathering Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-759.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 3 Agricultural Livestock Essence",
                  1,
                  215,
                  3,
                ),
                createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
                createMaterial("Lv 4 Combat Essence", 2, 401, 4),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Golden Gather Pants",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-323.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Golden Gather Pants",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-323.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 3 Combat Essence", 2, 218, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 3 Combat Essence", 2, 218, 1)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 3 Combat Essence", 2, 218, 1)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Diamond Gather Pants",
      alias: "DiamondGatherPants",
      cdnImage: "https://icons.lumiterra.net/item-icon-328.png",
      requiresLevel: 5,
      stats: [
        {
          name: "Grassproficiency",
          typeNumber: "integer",
          values: { min: 71, max: 86 },
        },
        {
          name: "Oreproficiency",
          typeNumber: "integer",
          values: { min: 71, max: 86 },
        },
        {
          name: "Treeproficiency",
          typeNumber: "integer",
          values: { min: 71, max: 86 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 4 Agricultural Livestock Essence", 1, 410, 4),
            createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
            createMaterial("Lv 5 Combat Essence", 2, 402, 5),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 4 Agricultural Livestock Essence",
                  1,
                  410,
                  4,
                ),
                createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
                createMaterial("Lv 5 Combat Essence", 2, 402, 5),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 4 Agricultural Livestock Essence",
                  1,
                  410,
                  4,
                ),
                createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
                createMaterial("Lv 5 Combat Essence", 2, 402, 5),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 5 Gathering Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-760.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 4 Agricultural Livestock Essence",
                  1,
                  410,
                  4,
                ),
                createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
                createMaterial("Lv 5 Combat Essence", 2, 402, 5),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Diamond Gather Pants",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-328.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Diamond Gather Pants",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-328.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 4 Combat Essence", 2, 401, 4),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 4 Combat Essence", 2, 401, 4)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 4 Combat Essence", 2, 401, 4)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Star Gather Pants",
      alias: "StarGatherPants",
      cdnImage: "https://icons.lumiterra.net/item-icon-333.png",
      requiresLevel: 6,
      stats: [
        {
          name: "Grassproficiency",
          typeNumber: "integer",
          values: { min: 86, max: 102 },
        },
        {
          name: "Oreproficiency",
          typeNumber: "integer",
          values: { min: 86, max: 102 },
        },
        {
          name: "Treeproficiency",
          typeNumber: "integer",
          values: { min: 86, max: 102 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 5 Agricultural Livestock Essence", 1, 411, 5),
            createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
            createMaterial("Lv 6 Combat Essence", 2, 403, 6),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 5 Agricultural Livestock Essence",
                  1,
                  411,
                  5,
                ),
                createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
                createMaterial("Lv 6 Combat Essence", 2, 403, 6),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 5 Agricultural Livestock Essence",
                  1,
                  411,
                  5,
                ),
                createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
                createMaterial("Lv 6 Combat Essence", 2, 403, 6),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 6 Gathering Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-761.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 5 Agricultural Livestock Essence",
                  1,
                  411,
                  5,
                ),
                createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
                createMaterial("Lv 6 Combat Essence", 2, 403, 6),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Star Gather Pants",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-333.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Star Gather Pants",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-333.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 5 Combat Essence", 2, 402, 5),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 5 Combat Essence", 2, 402, 5)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 5 Combat Essence", 2, 402, 5)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Lava Gather Pants",
      alias: "LavaGatherPants",
      cdnImage: "https://icons.lumiterra.net/item-icon-540.png",
      requiresLevel: 7,
      stats: [
        {
          name: "Grassproficiency",
          typeNumber: "integer",
          values: { min: 102, max: 118 },
        },
        {
          name: "Oreproficiency",
          typeNumber: "integer",
          values: { min: 102, max: 118 },
        },
        {
          name: "Treeproficiency",
          typeNumber: "integer",
          values: { min: 102, max: 118 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 6 Agricultural Livestock Essence", 1, 412, 6),
            createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
            createMaterial("Lv 7 Combat Essence", 2, 602, 7),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 6 Agricultural Livestock Essence",
                  1,
                  412,
                  6,
                ),
                createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
                createMaterial("Lv 7 Combat Essence", 2, 602, 7),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 6 Agricultural Livestock Essence",
                  1,
                  412,
                  6,
                ),
                createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
                createMaterial("Lv 7 Combat Essence", 2, 602, 7),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 7 Gathering Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-762.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 6 Agricultural Livestock Essence",
                  1,
                  412,
                  6,
                ),
                createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
                createMaterial("Lv 7 Combat Essence", 2, 602, 7),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Lava Gather Pants",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-540.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Lava Gather Pants",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-540.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 6 Combat Essence", 2, 403, 6),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 6 Combat Essence", 2, 403, 6)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 6 Combat Essence", 2, 403, 6)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Hollow Gather Pants",
      alias: "HollowGatherPants",
      cdnImage: "https://icons.lumiterra.net/item-icon-564.png",
      requiresLevel: 8,
      stats: [
        {
          name: "Grassproficiency",
          typeNumber: "integer",
          values: { min: 118, max: 136 },
        },
        {
          name: "Oreproficiency",
          typeNumber: "integer",
          values: { min: 118, max: 136 },
        },
        {
          name: "Treeproficiency",
          typeNumber: "integer",
          values: { min: 118, max: 136 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 7 Agricultural Livestock Essence", 1, 611, 7),
            createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
            createMaterial("Lv 8 Combat Essence", 2, 603, 8),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 7 Agricultural Livestock Essence",
                  1,
                  611,
                  7,
                ),
                createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
                createMaterial("Lv 8 Combat Essence", 2, 603, 8),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 7 Agricultural Livestock Essence",
                  1,
                  611,
                  7,
                ),
                createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
                createMaterial("Lv 8 Combat Essence", 2, 603, 8),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 8 Gathering Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-763.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 7 Agricultural Livestock Essence",
                  1,
                  611,
                  7,
                ),
                createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
                createMaterial("Lv 8 Combat Essence", 2, 603, 8),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Hollow Gather Pants",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-564.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Hollow Gather Pants",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-564.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 7 Gather Essence", 2, 406, 7),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 7 Combat Essence", 2, 602, 7)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 7 Combat Essence", 2, 602, 7)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Bronze Gather Pants",
      alias: "BronzeGatherPants",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-588.png",
      requiresLevel: 9,
      stats: [
        {
          name: "Grassproficiency",
          typeNumber: "integer",
          values: { min: 136, max: 156 },
        },
        {
          name: "Oreproficiency",
          typeNumber: "integer",
          values: { min: 136, max: 156 },
        },
        {
          name: "Treeproficiency",
          typeNumber: "integer",
          values: { min: 136, max: 156 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 8 Agricultural Livestock Essence", 1, 612, 8),
            createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
            createMaterial("Lv 9 Combat Essence", 2, 604, 9),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 8 Agricultural Livestock Essence",
                  1,
                  612,
                  8,
                ),
                createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
                createMaterial("Lv 9 Combat Essence", 2, 604, 9),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 8 Agricultural Livestock Essence",
                  1,
                  612,
                  8,
                ),
                createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
                createMaterial("Lv 9 Combat Essence", 2, 604, 9),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 9 Gathering Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-764.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 8 Agricultural Livestock Essence",
                  1,
                  612,
                  8,
                ),
                createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
                createMaterial("Lv 9 Combat Essence", 2, 604, 9),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Bronze Gather Pants",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-588.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Bronze Gather Pants",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-588.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 8 Combat Essence", 2, 603, 8),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 8 Combat Essence", 2, 603, 8)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 8 Combat Essence", 2, 603, 8)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Gathering Shoes",
      alias: "GatheringShoesLv1",
      cdnImage: "https://icons.lumiterra.net/item-icon-113.png",
      requiresLevel: 1,
      stats: [
        {
          name: "Grassproficiency",
          typeNumber: "integer",
          values: { min: 8, max: 25 },
        },
        {
          name: "Oreproficiency",
          typeNumber: "integer",
          values: { min: 8, max: 25 },
        },
        {
          name: "Treeproficiency",
          typeNumber: "integer",
          values: { min: 8, max: 25 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [createMaterial("Lv 1 Combat Essence", 2, 216, 1)],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 1 Combat Essence", 2, 216, 1)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 1 Combat Essence", 2, 216, 1)],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 1 Gathering Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-756.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 1 Combat Essence", 2, 216, 1),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Gathering Shoes",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-113.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Gathering Shoes",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-113.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 1 Combat Essence", 2, 216, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 1 Combat Essence", 2, 216, 1)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 1 Combat Essence", 2, 216, 1)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Gathering Shoes",
      alias: "GatheringShoesLv2",
      cdnImage: "https://icons.lumiterra.net/item-icon-114.png",
      requiresLevel: 2,
      stats: [
        {
          name: "Grassproficiency",
          typeNumber: "integer",
          values: { min: 25, max: 41 },
        },
        {
          name: "Oreproficiency",
          typeNumber: "integer",
          values: { min: 25, max: 41 },
        },
        {
          name: "Treeproficiency",
          typeNumber: "integer",
          values: { min: 25, max: 41 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 1 Agricultural Livestock Essence", 1, 213, 1),
            createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
            createMaterial("Lv 2 Combat Essence", 2, 217, 2),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
                createMaterial("Lv 2 Combat Essence", 2, 217, 2),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
                createMaterial("Lv 2 Combat Essence", 2, 217, 2),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 2 Gathering Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-757.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
                createMaterial("Lv 2 Combat Essence", 2, 217, 2),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Gathering Shoes",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-114.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Gathering Shoes",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-114.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 1 Combat Essence", 2, 216, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 1 Combat Essence", 2, 216, 1)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 1 Combat Essence", 2, 216, 1)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Gathering Shoes",
      alias: "GatheringShoesLv3",
      cdnImage: "https://icons.lumiterra.net/item-icon-115.png",
      requiresLevel: 3,
      stats: [
        {
          name: "Grassproficiency",
          typeNumber: "integer",
          values: { min: 41, max: 58 },
        },
        {
          name: "Oreproficiency",
          typeNumber: "integer",
          values: { min: 41, max: 58 },
        },
        {
          name: "Treeproficiency",
          typeNumber: "integer",
          values: { min: 41, max: 58 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 2 Agricultural Livestock Essence", 1, 214, 2),
            createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
            createMaterial("Lv 3 Combat Essence", 2, 218, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 2 Agricultural Livestock Essence",
                  1,
                  214,
                  2,
                ),
                createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
                createMaterial("Lv 3 Combat Essence", 2, 218, 1),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 2 Agricultural Livestock Essence",
                  1,
                  214,
                  2,
                ),
                createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
                createMaterial("Lv 3 Combat Essence", 2, 218, 1),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 3 Gathering Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-758.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 2 Agricultural Livestock Essence",
                  1,
                  214,
                  2,
                ),
                createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
                createMaterial("Lv 3 Combat Essence", 2, 218, 1),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Crystal Gather Shoes",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-115.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Crystal Gather Shoes",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-115.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 2 Combat Essence", 2, 217, 2),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 2 Combat Essence", 2, 217, 2)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 2 Combat Essence", 2, 217, 2)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Golden Gather Shoes",
      alias: "GoldenGatherShoes",
      cdnImage: "https://icons.lumiterra.net/item-icon-324.png",
      requiresLevel: 4,
      stats: [
        {
          name: "Grassproficiency",
          typeNumber: "integer",
          values: { min: 58, max: 74 },
        },
        {
          name: "Oreproficiency",
          typeNumber: "integer",
          values: { min: 58, max: 74 },
        },
        {
          name: "Treeproficiency",
          typeNumber: "integer",
          values: { min: 58, max: 74 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 3 Agricultural Livestock Essence", 1, 215, 3),
            createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
            createMaterial("Lv 4 Combat Essence", 2, 401, 4),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 3 Agricultural Livestock Essence",
                  1,
                  215,
                  3,
                ),
                createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
                createMaterial("Lv 4 Combat Essence", 2, 401, 4),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 3 Agricultural Livestock Essence",
                  1,
                  215,
                  3,
                ),
                createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
                createMaterial("Lv 4 Combat Essence", 2, 401, 4),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 4 Gathering Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-759.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 3 Agricultural Livestock Essence",
                  1,
                  215,
                  3,
                ),
                createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
                createMaterial("Lv 4 Combat Essence", 2, 401, 4),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Golden Gather Shoes",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-324.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Golden Gather Shoes",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-324.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 3 Combat Essence", 2, 218, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 3 Combat Essence", 2, 218, 1)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 3 Combat Essence", 2, 218, 1)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Diamond Gather Shoes",
      alias: "DiamondGatherShoes",
      cdnImage: "https://icons.lumiterra.net/item-icon-329.png",
      requiresLevel: 5,
      stats: [
        {
          name: "Grassproficiency",
          typeNumber: "integer",
          values: { min: 74, max: 91 },
        },
        {
          name: "Oreproficiency",
          typeNumber: "integer",
          values: { min: 74, max: 91 },
        },
        {
          name: "Treeproficiency",
          typeNumber: "integer",
          values: { min: 74, max: 91 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 4 Agricultural Livestock Essence", 1, 410, 4),
            createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
            createMaterial("Lv 5 Combat Essence", 2, 402, 5),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 4 Agricultural Livestock Essence",
                  1,
                  410,
                  4,
                ),
                createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
                createMaterial("Lv 5 Combat Essence", 2, 402, 5),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 4 Agricultural Livestock Essence",
                  1,
                  410,
                  4,
                ),
                createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
                createMaterial("Lv 5 Combat Essence", 2, 402, 5),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 5 Gathering Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-760.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 4 Agricultural Livestock Essence",
                  1,
                  410,
                  4,
                ),
                createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
                createMaterial("Lv 5 Combat Essence", 2, 402, 5),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Diamond Gather Shoes",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-329.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Diamond Gather Shoes",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-329.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 4 Combat Essence", 2, 401, 4),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 4 Combat Essence", 2, 401, 4)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 4 Combat Essence", 2, 401, 4)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Star Gather Shoes",
      alias: "StarGatherShoes",
      cdnImage: "https://icons.lumiterra.net/item-icon-334.png",
      requiresLevel: 6,
      stats: [
        {
          name: "Grassproficiency",
          typeNumber: "integer",
          values: { min: 91, max: 107 },
        },
        {
          name: "Oreproficiency",
          typeNumber: "integer",
          values: { min: 91, max: 107 },
        },
        {
          name: "Treeproficiency",
          typeNumber: "integer",
          values: { min: 91, max: 107 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 5 Agricultural Livestock Essence", 1, 411, 5),
            createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
            createMaterial("Lv 6 Combat Essence", 2, 403, 6),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 5 Agricultural Livestock Essence",
                  1,
                  411,
                  5,
                ),
                createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
                createMaterial("Lv 6 Combat Essence", 2, 403, 6),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 5 Agricultural Livestock Essence",
                  1,
                  411,
                  5,
                ),
                createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
                createMaterial("Lv 6 Combat Essence", 2, 403, 6),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 6 Gathering Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-761.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 5 Agricultural Livestock Essence",
                  1,
                  411,
                  5,
                ),
                createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
                createMaterial("Lv 6 Combat Essence", 2, 403, 6),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Star Gather Shoes",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-334.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Star Gather Shoes",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-334.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 5 Combat Essence", 2, 402, 5),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 5 Combat Essence", 2, 402, 5)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 5 Combat Essence", 2, 402, 5)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Lava Gather Shoes",
      alias: "LavaGatherShoes",
      cdnImage: "https://icons.lumiterra.net/item-icon-542.png",
      requiresLevel: 7,
      stats: [
        {
          name: "Grassproficiency",
          typeNumber: "integer",
          values: { min: 107, max: 124 },
        },
        {
          name: "Oreproficiency",
          typeNumber: "integer",
          values: { min: 107, max: 124 },
        },
        {
          name: "Treeproficiency",
          typeNumber: "integer",
          values: { min: 107, max: 124 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 6 Agricultural Livestock Essence", 1, 412, 6),
            createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
            createMaterial("Lv 7 Combat Essence", 2, 602, 7),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 6 Agricultural Livestock Essence",
                  1,
                  412,
                  6,
                ),
                createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
                createMaterial("Lv 7 Combat Essence", 2, 602, 7),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 6 Agricultural Livestock Essence",
                  1,
                  412,
                  6,
                ),
                createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
                createMaterial("Lv 7 Combat Essence", 2, 602, 7),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 7 Gathering Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-762.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 6 Agricultural Livestock Essence",
                  1,
                  412,
                  6,
                ),
                createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
                createMaterial("Lv 7 Combat Essence", 2, 602, 7),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Lava Gather Shoes",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-542.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Lava Gather Shoes",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-542.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 6 Combat Essence", 2, 403, 6),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 6 Combat Essence", 2, 403, 6)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 6 Combat Essence", 2, 403, 6)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Hollow Gather Shoes",
      alias: "HollowGatherShoes",
      cdnImage: "https://icons.lumiterra.net/item-icon-566.png",
      requiresLevel: 8,
      stats: [
        {
          name: "Grassproficiency",
          typeNumber: "integer",
          values: { min: 124, max: 140 },
        },
        {
          name: "Oreproficiency",
          typeNumber: "integer",
          values: { min: 124, max: 140 },
        },
        {
          name: "Treeproficiency",
          typeNumber: "integer",
          values: { min: 124, max: 140 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 7 Agricultural Livestock Essence", 1, 611, 7),
            createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
            createMaterial("Lv 8 Combat Essence", 2, 603, 8),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 7 Agricultural Livestock Essence",
                  1,
                  611,
                  7,
                ),
                createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
                createMaterial("Lv 8 Combat Essence", 2, 603, 8),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 7 Agricultural Livestock Essence",
                  1,
                  611,
                  7,
                ),
                createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
                createMaterial("Lv 8 Combat Essence", 2, 603, 8),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 8 Gathering Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-763.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 7 Agricultural Livestock Essence",
                  1,
                  611,
                  7,
                ),
                createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
                createMaterial("Lv 8 Combat Essence", 2, 603, 8),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Hollow Gather Shoes",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-566.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Hollow Gather Shoes",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-566.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 7 Gather Essence", 2, 406, 7),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 7 Combat Essence", 2, 602, 7)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 7 Combat Essence", 2, 602, 7)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Bronze Gather Shoes",
      alias: "BronzeGatherShoes",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-590.png",
      requiresLevel: 9,
      stats: [
        {
          name: "Grassproficiency",
          typeNumber: "integer",
          values: { min: 140, max: 157 },
        },
        {
          name: "Oreproficiency",
          typeNumber: "integer",
          values: { min: 140, max: 157 },
        },
        {
          name: "Treeproficiency",
          typeNumber: "integer",
          values: { min: 140, max: 157 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 8 Agricultural Livestock Essence", 1, 612, 8),
            createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
            createMaterial("Lv 9 Combat Essence", 2, 604, 9),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 8 Agricultural Livestock Essence",
                  1,
                  612,
                  8,
                ),
                createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
                createMaterial("Lv 9 Combat Essence", 2, 604, 9),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 8 Agricultural Livestock Essence",
                  1,
                  612,
                  8,
                ),
                createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
                createMaterial("Lv 9 Combat Essence", 2, 604, 9),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 9 Gathering Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-764.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 8 Agricultural Livestock Essence",
                  1,
                  612,
                  8,
                ),
                createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
                createMaterial("Lv 9 Combat Essence", 2, 604, 9),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Bronze Gather Shoes",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-590.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Bronze Gather Shoes",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-590.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 8 Combat Essence", 2, 603, 8),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 8 Combat Essence", 2, 603, 8)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 8 Combat Essence", 2, 603, 8)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Gathering Gloves",
      alias: "GatheringGlovesLv1",
      cdnImage: "https://icons.lumiterra.net/item-icon-125.png",
      requiresLevel: 1,
      stats: [
        {
          name: "Grassproficiency",
          typeNumber: "integer",
          values: { min: 6, max: 19 },
        },
        {
          name: "Oreproficiency",
          typeNumber: "integer",
          values: { min: 6, max: 19 },
        },
        {
          name: "Treeproficiency",
          typeNumber: "integer",
          values: { min: 6, max: 19 },
        },
        {
          name: "Grassatt",
          typeNumber: "integer",
          values: { min: 5, max: 14 },
        },
        { name: "Oreatt", typeNumber: "integer", values: { min: 5, max: 14 } },
        { name: "Treeatt", typeNumber: "integer", values: { min: 5, max: 14 } },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [createMaterial("Lv 1 Combat Essence", 2, 216, 1)],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 1 Combat Essence", 2, 216, 1)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 1 Combat Essence", 2, 216, 1)],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 1 Gathering Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-756.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial("Lv 1 Combat Essence", 2, 216, 1),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Gathering Gloves",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-125.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Gathering Gloves",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-125.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 1 Combat Essence", 2, 216, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 1 Combat Essence", 2, 216, 1)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 1 Combat Essence", 2, 216, 1)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Gathering Gloves",
      alias: "GatheringGlovesLv2",
      cdnImage: "https://icons.lumiterra.net/item-icon-126.png",
      requiresLevel: 2,
      stats: [
        {
          name: "Grassproficiency",
          typeNumber: "integer",
          values: { min: 19, max: 31 },
        },
        {
          name: "Oreproficiency",
          typeNumber: "integer",
          values: { min: 19, max: 31 },
        },
        {
          name: "Treeproficiency",
          typeNumber: "integer",
          values: { min: 19, max: 31 },
        },
        {
          name: "Grassatt",
          typeNumber: "integer",
          values: { min: 14, max: 23 },
        },
        { name: "Oreatt", typeNumber: "integer", values: { min: 14, max: 23 } },
        {
          name: "Treeatt",
          typeNumber: "integer",
          values: { min: 14, max: 23 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 1 Agricultural Livestock Essence", 1, 213, 1),
            createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
            createMaterial("Lv 2 Combat Essence", 2, 217, 2),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
                createMaterial("Lv 2 Combat Essence", 2, 217, 2),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
                createMaterial("Lv 2 Combat Essence", 2, 217, 2),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 2 Gathering Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-757.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 1 Agricultural Livestock Essence",
                  1,
                  213,
                  1,
                ),
                createMaterial("Lv 1 Agricultural Planting Essence", 1, 210, 1),
                createMaterial("Lv 2 Combat Essence", 2, 217, 2),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Gathering Gloves",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-126.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Gathering Gloves",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-126.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 1 Combat Essence", 2, 216, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 1 Combat Essence", 2, 216, 1)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 1 Combat Essence", 2, 216, 1)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Gathering Gloves",
      alias: "GatheringGlovesLv3",
      cdnImage: "https://icons.lumiterra.net/item-icon-127.png",
      requiresLevel: 3,
      stats: [
        {
          name: "Grassproficiency",
          typeNumber: "integer",
          values: { min: 31, max: 44 },
        },
        {
          name: "Oreproficiency",
          typeNumber: "integer",
          values: { min: 31, max: 44 },
        },
        {
          name: "Treeproficiency",
          typeNumber: "integer",
          values: { min: 31, max: 44 },
        },
        {
          name: "Grassatt",
          typeNumber: "integer",
          values: { min: 23, max: 32 },
        },
        { name: "Oreatt", typeNumber: "integer", values: { min: 23, max: 32 } },
        {
          name: "Treeatt",
          typeNumber: "integer",
          values: { min: 23, max: 32 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 2 Agricultural Livestock Essence", 1, 214, 2),
            createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
            createMaterial("Lv 3 Combat Essence", 2, 218, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 2 Agricultural Livestock Essence",
                  1,
                  214,
                  2,
                ),
                createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
                createMaterial("Lv 3 Combat Essence", 2, 218, 1),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 2 Agricultural Livestock Essence",
                  1,
                  214,
                  2,
                ),
                createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
                createMaterial("Lv 3 Combat Essence", 2, 218, 1),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 3 Gathering Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-758.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 2 Agricultural Livestock Essence",
                  1,
                  214,
                  2,
                ),
                createMaterial("Lv 2 Agricultural Planting Essence", 1, 211, 2),
                createMaterial("Lv 3 Combat Essence", 2, 218, 1),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Crystal Gather Glove",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-127.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Crystal Gather Glove",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-127.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 2 Combat Essence", 2, 217, 2),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 2 Combat Essence", 2, 217, 2)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 2 Combat Essence", 2, 217, 2)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Golden Gather Glove",
      alias: "GoldenGatherGlove",
      cdnImage: "https://icons.lumiterra.net/item-icon-322.png",
      requiresLevel: 4,
      stats: [
        {
          name: "Grassproficiency",
          typeNumber: "integer",
          values: { min: 44, max: 56 },
        },
        {
          name: "Oreproficiency",
          typeNumber: "integer",
          values: { min: 44, max: 56 },
        },
        {
          name: "Treeproficiency",
          typeNumber: "integer",
          values: { min: 44, max: 56 },
        },
        {
          name: "Grassatt",
          typeNumber: "integer",
          values: { min: 32, max: 41 },
        },
        { name: "Oreatt", typeNumber: "integer", values: { min: 32, max: 41 } },
        {
          name: "Treeatt",
          typeNumber: "integer",
          values: { min: 32, max: 41 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 3 Agricultural Livestock Essence", 1, 215, 3),
            createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
            createMaterial("Lv 4 Combat Essence", 2, 401, 4),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 3 Agricultural Livestock Essence",
                  1,
                  215,
                  3,
                ),
                createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
                createMaterial("Lv 4 Combat Essence", 2, 401, 4),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 3 Agricultural Livestock Essence",
                  1,
                  215,
                  3,
                ),
                createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
                createMaterial("Lv 4 Combat Essence", 2, 401, 4),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 4 Gathering Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-759.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 3 Agricultural Livestock Essence",
                  1,
                  215,
                  3,
                ),
                createMaterial("Lv 3 Agricultural Planting Essence", 1, 212, 3),
                createMaterial("Lv 4 Combat Essence", 2, 401, 4),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Golden Gather Glove",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-322.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Golden Gather Glove",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-322.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 3 Combat Essence", 2, 218, 1),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 3 Combat Essence", 2, 218, 1)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 3 Combat Essence", 2, 218, 1)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Diamond Gather Glove",
      alias: "DiamondGatherGlove",
      cdnImage: "https://icons.lumiterra.net/item-icon-327.png",
      requiresLevel: 5,
      stats: [
        {
          name: "Grassproficiency",
          typeNumber: "integer",
          values: { min: 56, max: 69 },
        },
        {
          name: "Oreproficiency",
          typeNumber: "integer",
          values: { min: 56, max: 69 },
        },
        {
          name: "Treeproficiency",
          typeNumber: "integer",
          values: { min: 56, max: 69 },
        },
        {
          name: "Grassatt",
          typeNumber: "integer",
          values: { min: 41, max: 50 },
        },
        { name: "Oreatt", typeNumber: "integer", values: { min: 41, max: 50 } },
        {
          name: "Treeatt",
          typeNumber: "integer",
          values: { min: 41, max: 50 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 4 Agricultural Livestock Essence", 1, 410, 4),
            createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
            createMaterial("Lv 5 Combat Essence", 2, 402, 5),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 4 Agricultural Livestock Essence",
                  1,
                  410,
                  4,
                ),
                createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
                createMaterial("Lv 5 Combat Essence", 2, 402, 5),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 4 Agricultural Livestock Essence",
                  1,
                  410,
                  4,
                ),
                createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
                createMaterial("Lv 5 Combat Essence", 2, 402, 5),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 5 Gathering Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-760.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 4 Agricultural Livestock Essence",
                  1,
                  410,
                  4,
                ),
                createMaterial("Lv 4 Agricultural Planting Essence", 1, 407, 4),
                createMaterial("Lv 5 Combat Essence", 2, 402, 5),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Diamond Gather Glove",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-327.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Diamond Gather Glove",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-327.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 4 Combat Essence", 2, 401, 4),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 4 Combat Essence", 2, 401, 4)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 4 Combat Essence", 2, 401, 4)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Star Gather Glove",
      alias: "StarGatherGlove",
      cdnImage: "https://icons.lumiterra.net/item-icon-327.png",
      requiresLevel: 6,
      stats: [
        {
          name: "Grassproficiency",
          typeNumber: "integer",
          values: { min: 69, max: 81 },
        },
        {
          name: "Oreproficiency",
          typeNumber: "integer",
          values: { min: 69, max: 81 },
        },
        {
          name: "Treeproficiency",
          typeNumber: "integer",
          values: { min: 69, max: 81 },
        },
        {
          name: "Grassatt",
          typeNumber: "integer",
          values: { min: 50, max: 59 },
        },
        { name: "Oreatt", typeNumber: "integer", values: { min: 50, max: 59 } },
        {
          name: "Treeatt",
          typeNumber: "integer",
          values: { min: 50, max: 59 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 5 Agricultural Livestock Essence", 1, 411, 5),
            createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
            createMaterial("Lv 6 Combat Essence", 2, 403, 6),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 5 Agricultural Livestock Essence",
                  1,
                  411,
                  5,
                ),
                createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
                createMaterial("Lv 6 Combat Essence", 2, 403, 6),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 5 Agricultural Livestock Essence",
                  1,
                  411,
                  5,
                ),
                createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
                createMaterial("Lv 6 Combat Essence", 2, 403, 6),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 6 Gathering Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-761.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 5 Agricultural Livestock Essence",
                  1,
                  411,
                  5,
                ),
                createMaterial("Lv 5 Agricultural Planting Essence", 1, 408, 5),
                createMaterial("Lv 6 Combat Essence", 2, 403, 6),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Star Gather Glove",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-327.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Star Gather Glove",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-327.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 5 Combat Essence", 2, 402, 5),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 5 Combat Essence", 2, 402, 5)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 5 Combat Essence", 2, 402, 5)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Lava Gather Glove",
      alias: "LavaGatherGlove",
      cdnImage: "https://icons.lumiterra.net/item-icon-541.png",
      requiresLevel: 7,
      stats: [
        {
          name: "Grassproficiency",
          typeNumber: "integer",
          values: { min: 81, max: 94 },
        },
        {
          name: "Oreproficiency",
          typeNumber: "integer",
          values: { min: 81, max: 94 },
        },
        {
          name: "Treeproficiency",
          typeNumber: "integer",
          values: { min: 81, max: 94 },
        },
        {
          name: "Grassatt",
          typeNumber: "integer",
          values: { min: 59, max: 68 },
        },
        { name: "Oreatt", typeNumber: "integer", values: { min: 59, max: 68 } },
        {
          name: "Treeatt",
          typeNumber: "integer",
          values: { min: 59, max: 68 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 6 Agricultural Livestock Essence", 1, 412, 6),
            createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
            createMaterial("Lv 7 Combat Essence", 2, 602, 7),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 6 Agricultural Livestock Essence",
                  1,
                  412,
                  6,
                ),
                createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
                createMaterial("Lv 7 Combat Essence", 2, 602, 7),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 6 Agricultural Livestock Essence",
                  1,
                  412,
                  6,
                ),
                createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
                createMaterial("Lv 7 Combat Essence", 2, 602, 7),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 7 Gathering Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-762.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 6 Agricultural Livestock Essence",
                  1,
                  412,
                  6,
                ),
                createMaterial("Lv 6 Agricultural Planting Essence", 1, 409, 6),
                createMaterial("Lv 7 Combat Essence", 2, 602, 7),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Lava Gather Glove",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-541.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Lava Gather Glove",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-541.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 6 Combat Essence", 2, 403, 6),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 6 Combat Essence", 2, 403, 6)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 6 Combat Essence", 2, 403, 6)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Hollow Gather Glove",
      alias: "HollowGatherGlove",
      cdnImage: "https://icons.lumiterra.net/item-icon-565.png",
      requiresLevel: 8,
      stats: [
        {
          name: "Grassproficiency",
          typeNumber: "integer",
          values: { min: 94, max: 106 },
        },
        {
          name: "Oreproficiency",
          typeNumber: "integer",
          values: { min: 94, max: 106 },
        },
        {
          name: "Treeproficiency",
          typeNumber: "integer",
          values: { min: 94, max: 106 },
        },
        {
          name: "Grassatt",
          typeNumber: "integer",
          values: { min: 68, max: 77 },
        },
        { name: "Oreatt", typeNumber: "integer", values: { min: 68, max: 77 } },
        {
          name: "Treeatt",
          typeNumber: "integer",
          values: { min: 68, max: 77 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 7 Agricultural Livestock Essence", 1, 611, 7),
            createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
            createMaterial("Lv 8 Combat Essence", 2, 603, 8),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 7 Agricultural Livestock Essence",
                  1,
                  611,
                  7,
                ),
                createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
                createMaterial("Lv 8 Combat Essence", 2, 603, 8),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 7 Agricultural Livestock Essence",
                  1,
                  611,
                  7,
                ),
                createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
                createMaterial("Lv 8 Combat Essence", 2, 603, 8),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 8 Gathering Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-763.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 7 Agricultural Livestock Essence",
                  1,
                  611,
                  7,
                ),
                createMaterial("Lv 7 Agricultural Planting Essence", 1, 608, 7),
                createMaterial("Lv 8 Combat Essence", 2, 603, 8),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Hollow Gather Glove",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-565.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Hollow Gather Glove",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-565.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 7 Gather Essence", 2, 406, 7),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 7 Combat Essence", 2, 602, 7)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 7 Combat Essence", 2, 602, 7)],
              "Usd",
            ),
          },
        },
      ],
    },
    {
      name: "Bronze Gather Glove",
      alias: "BronzeGatherGlove",
      prices: { ron: null, usd: null },
      cdnImage: "https://icons.lumiterra.net/item-icon-589.png",
      requiresLevel: 9,
      stats: [
        {
          name: "Grassproficiency",
          typeNumber: "integer",
          values: { min: 106, max: 119 },
        },
        {
          name: "Oreproficiency",
          typeNumber: "integer",
          values: { min: 106, max: 119 },
        },
        {
          name: "Treeproficiency",
          typeNumber: "integer",
          values: { min: 106, max: 119 },
        },
        {
          name: "Grassatt",
          typeNumber: "integer",
          values: { min: 77, max: 86 },
        },
        { name: "Oreatt", typeNumber: "integer", values: { min: 77, max: 86 } },
        {
          name: "Treeatt",
          typeNumber: "integer",
          values: { min: 77, max: 86 },
        },
      ],
      recipe: [
        {
          type: "buy essences and craft item",
          materials: [
            createMaterial("Lv 8 Agricultural Livestock Essence", 1, 612, 8),
            createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
            createMaterial("Lv 9 Combat Essence", 2, 604, 9),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 8 Agricultural Livestock Essence",
                  1,
                  612,
                  8,
                ),
                createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
                createMaterial("Lv 9 Combat Essence", 2, 604, 9),
              ],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [
                createMaterial(
                  "Lv 8 Agricultural Livestock Essence",
                  1,
                  612,
                  8,
                ),
                createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
                createMaterial("Lv 9 Combat Essence", 2, 604, 9),
              ],
              "Usd",
            ),
          },
        },
        {
          type: "desenchant floor items and craft item",
          materials: [
            {
              name: "Lv 9 Gathering Equipment Fragment",
              cdnImage: "https://icons.lumiterra.net/item-icon-764.png",
              quantity: 100,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy energy and craft essence",
          materials: [
            {
              name: "Energy",
              quantity: calculateTotalRequireEnergy([
                createMaterial(
                  "Lv 8 Agricultural Livestock Essence",
                  1,
                  612,
                  8,
                ),
                createMaterial("Lv 8 Agricultural Planting Essence", 1, 609, 8),
                createMaterial("Lv 9 Combat Essence", 2, 604, 9),
              ]),
              cdnImage:
                "https://cdn.skymavis.com/mm-cache/2/f/28a7cd01bb467a933644f181055f11.png",
              price: { ron: null, usd: null },
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item",
          materials: [
            {
              name: "Bronze Gather Glove",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-589.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
          ],
          minPricesTotal: { ron: null, usd: null },
        },
        {
          type: "buy floor item and essence for upgrade",
          materials: [
            {
              name: "Bronze Gather Glove",
              quantity: 1,
              cdnImage: "https://icons.lumiterra.net/item-icon-589.png",
              price: { ron: null, usd: null },
              tokenId: null,
            },
            createMaterial("Lv 8 Combat Essence", 2, 603, 8),
          ],
          minPricesTotal: {
            ron: calculateTotalPrice(
              [createMaterial("Lv 8 Combat Essence", 2, 603, 8)],
              "Ron",
            ),
            usd: calculateTotalPrice(
              [createMaterial("Lv 8 Combat Essence", 2, 603, 8)],
              "Usd",
            ),
          },
        },
      ],
    },
  ],
};

export { itemsData };
