"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress, Box, Card, CardContent, Typography } from "@mui/joy";
import Filters from "@/components/Filters";

import AspectRatio from "@mui/joy/AspectRatio";
import Link from "@mui/joy/Link";

const Essence = () => {
  const [data, setData] = useState([]);
  const [dataFiltered, setDataFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchData(url) {
    try {
      const res = await axios.get(url);
      setData(res.data);
      setDataFiltered(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(true);
    }
  }

  useEffect(() => {
    fetchData(`${window.location.origin}/api/essence`);
  }, []);

  if (loading)
    return (
      <div className="grid w-full flex-grow place-content-center">
        <CircularProgress />
      </div>
    );

  return (
    <main className="flex">
      <Filters data={data} setDataFiltered={setDataFiltered} />
      <div className="flex h-full w-full flex-wrap justify-center gap-3 p-3">
        {dataFiltered?.map(
          ({
            name,
            minPriceUsd,
            minPriceRon,
            cdnImage,
            attributes,
            tokenId,
          }) => {
            return (
              <>
                <Card
                  variant="plain"
                  orientation="horizontal"
                  sx={{
                    width: 320,
                  }}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      height: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        alignItems: "center",
                      }}
                    >
                      <AspectRatio ratio="1" sx={{ width: 60 }}>
                        <img src={cdnImage} loading="lazy" alt={name} />
                      </AspectRatio>
                      <Box>
                        <Typography level="body-sm" fontWeight="lg">
                          <Link
                            overlay
                            underline="none"
                            href={`https://marketplace.skymavis.com/collections/lumiterra/${tokenId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ color: "text.tertiary" }}
                          >
                            {name}
                          </Link>
                        </Typography>
                        <Typography
                          level="body-xs"
                          fontWeight="lg"
                          textColor="text.tertiary"
                        >
                          {attributes
                            .filter((attribute) => {
                              const key = Object.keys(attribute)[0];
                              return key === "requires level";
                            })
                            .map((attribute, index) => {
                              const key = Object.keys(attribute)[0];
                              const value = Object.values(attribute)[0];
                              return (
                                <Typography key={index} fontWeight="lg">
                                  Lv {value}
                                </Typography>
                              );
                            })}
                        </Typography>
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <Typography fontSize="xl" fontWeight="lg">
                            {!isNaN(Number(minPriceRon))
                              ? `${minPriceRon}RON`
                              : minPriceRon}
                          </Typography>
                          <Typography fontSize="xl" fontWeight="lg">
                            {!isNaN(Number(minPriceUsd))
                              ? `${minPriceUsd}USD`
                              : minPriceUsd}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </>
            );
          },
        )}
      </div>
    </main>
  );
};

export default Essence;
