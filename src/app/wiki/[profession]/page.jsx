"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { CircularProgress, Box, Card, CardContent, Typography } from "@mui/joy";

import AspectRatio from "@mui/joy/AspectRatio";

const Profession = ({ params }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const image = (url, alt) => {
    <Image src={url} alt={alt} width={20} height={20} />;
  };
  async function fetchData() {
    try {
      const res = await axios.post(
        `${window.location.origin}/api/wiki/${params.profession}`,
      );
      setData(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(true);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="grid w-full flex-grow place-content-center">
        <CircularProgress />
      </div>
    );

  return (
    <main className="flex flex-grow">
      <div className="flex h-full w-full flex-wrap justify-center gap-2 p-2">
        {data?.map((item) => {
          return (
            <Box
              sx={{
                display: "flex",
                gap: 1,
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  width: "25%",
                }}
              >
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(1, 1fr)",
                    gap: "10px",
                  }}
                >
                  <Card
                    key={item.name}
                    variant="plain"
                    sx={{ cursor: "pointer" }}
                    onClick={() => setSelectedItem(item)}
                  >
                    <CardContent>
                      <AspectRatio ratio="1" sx={{ width: 60 }}>
                        <img
                          src={item.cdnImage}
                          loading="lazy"
                          alt={item.name}
                        />
                      </AspectRatio>
                    </CardContent>
                  </Card>
                </Box>
              </Box>
            </Box>
          );
        })}
      </div>
      <div className="flex h-full w-full flex-wrap justify-center gap-2 p-2">
        <Box sx={{ width: "70%", padding: "15px" }}>
          {selectedItem ? (
            <Card variant="plain">
              <CardContent>
                <Typography level="h4">{selectedItem.name}</Typography>
                <AspectRatio objectFit="contain" sx={{ width: "100%", mb: 2 }}>
                  {selectedItem.cdnImage ? (
                    <img
                      src={selectedItem.cdnImage}
                      loading="lazy"
                      alt={selectedItem.name}
                    />
                  ) : (
                    <Typography>No Image Available</Typography>
                  )}
                </AspectRatio>
                <Typography level="body1">
                  Require Level: {selectedItem.requiresLevel}
                </Typography>
                <Typography level="body1">
                  Floor Price:
                  <Typography level="body2">
                    {selectedItem.prices.ron} RON
                  </Typography>
                  <Typography level="body2">
                    {selectedItem.prices.usd} USD
                  </Typography>
                </Typography>
                <Typography level="body1" sx={{ mt: 2 }}>
                  Stats:
                </Typography>
                {selectedItem.stats?.map((stat, index) => (
                  <Box key={index}>
                    <Typography level="body2">
                      {stat.name}: {stat.values.min} - {stat.values.max}
                    </Typography>
                  </Box>
                ))}
                <Typography level="body1" sx={{ mt: 2 }}>
                  Recipe:
                </Typography>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
                >
                  {selectedItem.recipe.materials.map((material, index) => (
                    <React.Fragment key={index}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <img
                          src={material.cdnImage}
                          alt={material.name}
                          style={{ width: 40, height: 40 }}
                        />
                        <Typography level="body2">
                          x {material.quantity}
                        </Typography>
                      </Box>
                      {index < selectedItem.recipe.materials.length - 1 && (
                        <Typography level="body2" sx={{ mx: 1 }}>
                          +
                        </Typography>
                      )}
                    </React.Fragment>
                  ))}
                </Box>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
                >
                  {/* Resumen de Precios y Energía */}
                  <Typography level="body2">
                    Total Recipe Price:
                    <Box sx={{ display: "flex", gap: 0.5 }}>
                      <Image
                        src="https://cdn.skymavis.com/ronin/2020/ron/logo.png"
                        alt="Ron"
                        width={20}
                        height={20}
                      />
                      {selectedItem.recipe.minPriceTotalRon}
                      <Image
                        src="https://cdn.skymavis.com/ronin/2020/erc20/0x0b7007c13325c48911f73a2dad5fa5dcbf808adc/logo.png"
                        alt="Ron"
                        width={20}
                        height={20}
                      />
                      {selectedItem.recipe.minPriceTotalUsd}
                    </Box>
                  </Typography>
                  <Typography level="body2">
                    Total Energy Required:{" "}
                    {selectedItem.recipe.totalRequireEnergy}
                  </Typography>
                  <Typography level="body2">Total Energy Cost:</Typography>
                  <Typography level="body2">
                    USD: {selectedItem.recipe.totalEnergyCost}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ) : (
            <Typography level="body1">
              Selecciona un item para ver su información.
            </Typography>
          )}
        </Box>
      </div>
    </main>
  );
};

export default Profession;
