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
              orientation="horizontal"
              sx={{
                height: 180,
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
                    <Typography fontSize="xl" fontWeight="lg">
                      {!isNaN(Number(prices.usd))
                        ? `${prices.usd}usd`
                        : prices.usd}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    bgcolor: "background.level1",
                    borderRadius: "sm",
                    p: 0.5,
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 0.5,
                    height: "100%",
                    "& > div": { flex: 1 },
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
                        <Box key={index}>
                          <Typography level="body-xs" fontWeight="lg">
                            {key}
                          </Typography>
                          <Typography fontWeight="lg">{value}</Typography>
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
