"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/joy";

import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";

const Combat = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchData(url) {
    try {
      const res = await axios.get(url);
      setData(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(true);
    }
  }

  useEffect(() => {
    fetchData(`${window.location.origin}/api/gathering`);
  }, []);

  if (loading)
    return (
      <div className="grid w-full flex-grow place-content-center">
        <CircularProgress />
      </div>
    );

  return (
    <main className="flex w-full flex-wrap justify-center gap-3 p-3">
      {data?.map(({ name, minPrice, cdnImage, attributes, tokenId }) => {
        return (
          <Card
            key={tokenId}
            variant="plain"
            orientation="horizontal"
            sx={{
              width: 240,
              flexWrap: "wrap",
              overflow: "auto",
            }}
          >
            <img src={cdnImage} loading="lazy" alt={name} />
            <CardContent>
              <Typography
                level="body-sm"
                fontWeight="lg"
                textColor="text.tertiary"
              >
                {name}
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
                    return <Typography key={index} fontWeight="lg">Lv {value}</Typography>;
                  })}
              </Typography>
              <Typography fontSize="xl" fontWeight="lg">
                {!isNaN(Number(minPrice)) ? `${minPrice} usd` : minPrice}
              </Typography>
              <Sheet
                sx={{
                  bgcolor: "background.level1",
                  borderRadius: "sm",
                  p: 1,
                  my: 1,
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 2,
                  "& > div": { flex: 1 },
                }}
              >
                <div className="flex min-h-[108px] w-full flex-wrap">
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
                        <div key={index} className="w-1/2">
                          <Typography level="body-xs" fontWeight="lg">
                            {key}
                          </Typography>
                          <Typography fontWeight="lg">{value}</Typography>
                        </div>
                      );
                    })}
                </div>
              </Sheet>
              <Box
                sx={{ display: "flex", gap: 1.5, "& > button": { flex: 1 } }}
              >
                <Button
                  variant="solid"
                  color="primary"
                  component="a"
                  href={`https://marketplace.skymavis.com/collections/lumiterra/${tokenId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ width: "100%" }}
                >
                  Ver item
                </Button>
              </Box>
            </CardContent>
          </Card>
        );
      })}
    </main>
  );
};

export default Combat;
