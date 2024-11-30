import { NextResponse } from "next/server";
import apiUrl from "@/utils/apiUrl";
import { Result } from "postcss";
import { Ruslan_Display } from "next/font/google";
export const dynamic = "force-dynamic";

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
      throw new Error(`Failed to fetch data ${response.data}`);
    }
    return response.json();
};

export async function GET(request) {

    try{

      const rate = `
        query MyQuery {        
          exchangeRate {
            ron {
              usd
            }
          }
        }
      `;

      const response = await fetchData(rate)
      const exchangeRate = response.data.exchangeRate.ron.usd;

      const query = `
        query MyQuery {
          erc1155Tokens(
            from: 0
            size: 50
            tokenAddress: "0xcc451977a4be9adee892f7e610fe3e3b3927b5a1"
            name: "Packaging box"
            sort: PriceAsc
            auctionType: Sale
          ) {
            results {
              minPrice
              name
              attributes
              cdnImage
              tokenId
            }
          }
        }`;


      const dataBoxes = await fetchData(query);
      const resultsDataBoxes =
        dataBoxes.data.erc1155Tokens.results.map((result) => ({
          ...result,
          minPriceRon: Number(result.minPrice / 1000000000000000000).toFixed(2),
          minPriceUsd: result.minPrice
            ? Number(
                (result.minPrice / 1000000000000000000) * exchangeRate,
              ).toFixed(2)
            : "Not sale",
          requireLevel: result.attributes["requires level"] && result.attributes["requires level"][0],
        }));


      const dataEnergy = await fetchDataEnergy();
      const dataEssence = await fetchDataEssen();

      const calculateEnergyForMaterial = (material) => {
        const baseEnergy = 15;
        let energyRequired = baseEnergy;      
        for (let i = 2; i <= material; i++) {
          energyRequired = baseEnergy + 2 * energyRequired;
        }
        
        return energyRequired;
      };

      function findPreviousLevelItem(name) {
        // Buscar el ítem actual en base al nombre
          const currentItem = dataEssence.find(item => item.name === name);
          if (!currentItem) {
              return null;
          }
      
          // Buscar el valor del "requires level" dentro del array de attributes
          const requiresLevelObj = currentItem.attributes.find(attribute => attribute["requires level"]);
      
          if (requiresLevelObj) {
              // Extraer el nivel actual y convertirlo a número
              const currentLevel = parseInt(requiresLevelObj["requires level"], 10);
      
              // Comprobar si el nivel es un número válido
              if (isNaN(currentLevel)) {
                  return null;
              }
      
              // Si el nivel es 1, retornar null
              if (currentLevel === 1) {
                  return null;
              }
        
              // Filtrar el tipo de rama y buscar en el nivel anterior en la misma rama
              const branch = name.split(" ").slice(2).join(" "); // Extraer la rama completa
              const previousLevelItem = dataEssence.find(item => {
                  const prevLevelObj = item.attributes.find(attribute => attribute["requires level"]);
                  const prevLevel = parseInt(prevLevelObj["requires level"], 10);
      
                  // Asegurarse de que el nivel coincida y la rama también coincida exactamente
                  return prevLevel === currentLevel - 1 && item.name.includes(branch);
              });
        
              return previousLevelItem.minPriceUsd || null;
            }
        
            return null;
      };

      function findRequireBox(level){
        const result = resultsDataBoxes.find(box => box.requireLevel === level);

        // Accede al valor minPriceUsd si se encontró el objeto
        const minPriceUsd = result ? result.minPriceUsd : null;

        return minPriceUsd;
      }

      const costPerEnergy = dataEnergy[0].costPerEnergy

      const finalRsult = dataEssence.map((result) => {
          let energyRequired = calculateEnergyForMaterial(result.attributes.find(attr => attr["requires level"])?.["requires level"])
          return{
              name: result.name,
              requireLevel: result.attributes.find(attr => attr["requires level"])?.["requires level"],
              img: result.cdnImage,
              tokenId: result.tokenId,
              minPriceRon: result.minPriceRon,
              minPriceUsd: result.minPriceUsd,
              requieredEnergy: energyRequired,
              minPriceUsdBelowEssence: findPreviousLevelItem(result.name),
              costEnergy: costPerEnergy,
              minPriceBox: findRequireBox(result.attributes.find(attr => attr["requires level"])?.["requires level"]),
              url: "https://marketplace.skymavis.com/collections/lumiterra/"+ result.tokenId
            }
        })

    return NextResponse.json(finalRsult);
    }   catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}