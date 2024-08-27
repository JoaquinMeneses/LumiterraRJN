"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress, Box, Card, CardContent, Typography } from "@mui/joy";
import FiltersTemporally from "@/components/FiltersTemporally";

import AspectRatio from "@mui/joy/AspectRatio";
import Link from "@mui/joy/Link";

const Profession = ({ params }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    auctionType: "All",
    type: "sword",
    quality: "basic",
    requiresLevel: 1,
  });

  async function fetchData(body) {
    try {
      const res = await axios.post(
        `${window.location.origin}/api/market/${params.profession}`,
        body,
      );
      setData(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(true);
    }
  }

  useEffect(() => {
    fetchData(filters);
  }, []);

  if (loading)
    return (
      <div className="grid w-full flex-grow place-content-center">
        <CircularProgress />
      </div>
    );

  return (
    <main className="flex flex-grow">
      <FiltersTemporally
        filters={filters}
        setFilters={setFilters}
        fetchData={fetchData}
        skill="combat"
      />
      <div className="flex h-full w-full flex-wrap justify-center gap-3 p-3">
        {data?.map(({ name, prices, cdnImage, attributes, tokenId }) => {
          return (
            <Card
              key={tokenId}
              variant="plain"
              orientation="vertical"
              sx={{
                height: "auto",
<<<<<<< Updated upstream
                width: 310,
                
=======
                width: 320,
                display: "flex",
>>>>>>> Stashed changes
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
                 
                >
                  <Box 
                  sx={{
                    display: "flex",
<<<<<<< Updated upstream
                    gap: 1,
                    alignItems: "center",
                    flexDirection: "column-reverse"
               
                  }}
                >
                  <AspectRatio ratio="1" sx={{ width: 130, marginBottom: 2 }}>
                    <img src={cdnImage} loading="lazy" alt={name} />
                  </AspectRatio>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    <Box>
                    <Typography level="body-sm" fontSize="lg" fontWeight="lg">
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
                      fontWeight="xl"
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
                            <Typography key={index}  fontWeight="lg">
                              Lv {value}
                            </Typography>
                          );
                        })}
                    </Typography>
                    </Box>
                    <Box >
                    <Typography fontSize="md" fontWeight="lg">
                      {!isNaN(Number(prices.usd))
                        ? `Price USD ${prices.usd} `
                        : prices.usd}
                    </Typography>
                    <Typography fontSize="md" fontWeight="lg">
                      {!isNaN(Number(prices.usd))
                        ? `Price RON ${prices.ron} `
                        : prices.ron}
                    </Typography>
                    </Box>
                   
                    
                  </Box>
=======
                    justifyContent: "space-between"
                  }
                  }
                  >
                    <Box>
                      <Typography level="body-lg" fontWeight="lg">
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
                    </Box>
                    <Box>
                      <Typography fontSize="md" fontWeight="lg">
                        {!isNaN(Number(prices.usd))
                          ? `${prices.usd}usd`
                          : prices.usd}
                      </Typography>
                    </Box>
                
                  </Box >
                  <AspectRatio ratio="1" sx={{ width: 150, marginLeft: 10, marginBottom: 2 }}>
                    <img src={cdnImage} loading="lazy" alt={name} />
                  </AspectRatio>
>>>>>>> Stashed changes
                </Box>
                <Box
                  sx={{
                    bgcolor: "background.level1",
                    borderRadius: "sm",
                    p: 0.5,
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 0.5,
                    height: "40%",
                    "& > div": { flex: 1 },
<<<<<<< Updated upstream
                   alignContent: "space-between",
                   alignItems: "center",
=======
>>>>>>> Stashed changes
                    
                  }}
                >
                  {attributes
                    .filter((attribute) => {
                      const key = Object.keys(attribute)[0];
                      const value = Object.values(attribute)[0];
                      return key !== "requires level" && !isNaN(value);
                    })
                    .map((attribute, index) => {
                      const key = Object.keys(attribute)[0];
                      const value = Object.values(attribute)[0];
                      return (
                        <Box key={index} sx={{
                          display: "flex",
                          gap: 1,
                          alignItems: "center",
                          marginLeft: 1,
                          }}>
                          <Typography level="body-xs" fontWeight="lg">
                            {key}
                          </Typography>
                          <Typography fontWeight="lg" >{value}</Typography>
                        </Box>
                      );
                    })}
                </Box>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </main>
  );
};

export default Profession;
