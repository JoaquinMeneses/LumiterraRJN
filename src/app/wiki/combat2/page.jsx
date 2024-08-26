"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import {
  CircularProgress,
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
} from "@mui/joy";

import AspectRatio from "@mui/joy/AspectRatio";

const Profession = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  async function fetchData() {
    try {
      const res = await axios.post(
        `${window.location.origin}/api/wiki/farming`,
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
  console.log(selectedItem);
  return (
    <main className="flex w-full flex-grow flex-col-reverse justify-center gap-2 p-2 sm:flex-row">
      <div className="flex flex-col gap-1">
        {data
          ?.sort((a, b) => a.requiresLevel - b.requiresLevel)
          .map((item, index) => (
            <AspectRatio
              key={index}
              ratio="1"
              objectFit="contain"
              className="h-20 w-20 cursor-pointer rounded-md"
              onClick={() => setSelectedItem(item)}
            >
              <Image fill src={item.cdnImage} loading="lazy" alt={item.name} />
            </AspectRatio>
          ))
          .reduce((acc, curr, index) => {
            if (index % 8 === 0) acc.push([]);
            acc[acc.length - 1].push(curr);
            return acc;
          }, [])
          .map((row, rowIndex) => (
            <div key={rowIndex} className="flex flex-wrap justify-center gap-1">
              {row}
            </div>
          ))}
      </div>
      {selectedItem ? (
        <Card variant="plain" className="sticky top-0 h-fit w-full p-2 sm:w-96">
          <CardContent>
            <Typography
              level="h3"
              component="h1"
              endDecorator={
                <Chip component="span">Level {selectedItem.requiresLevel}</Chip>
              }
              className="flex w-full justify-between"
            >
              {selectedItem.name}
            </Typography>
            <AspectRatio objectFit="contain">
              {selectedItem.cdnImage ? (
                <Image
                  fill
                  src={selectedItem.cdnImage}
                  loading="lazy"
                  alt={selectedItem.name}
                />
              ) : (
                <Typography level="h3" component="h1">
                  No Image Available
                </Typography>
              )}
            </AspectRatio>
            <Box className="flex flex-col gap-1">
              <Typography level="title-lg" component="p">
                Stats
              </Typography>
              <Box className="flex flex-wrap">
                {selectedItem.stats?.map((stat, index) => (
                  <Box
                    key={index}
                    className="flex w-1/2 flex-col p-1 text-center capitalize"
                  >
                    <Typography level="title-sm" component="p">
                      {stat.name}
                    </Typography>
                    <Typography level="title-lg" component="p">
                      {stat.values.min} - {stat.values.max}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
            <Box className="flex flex-col gap-1">
              <Typography level="title-lg" component="p">
                Recipes
              </Typography>
              <Box className="flex flex-wrap">
                {selectedItem.stats?.map((stat, index) => (
                  <Box
                    key={index}
                    className="flex w-full flex-col p-1 capitalize"
                  >
                    <Typography level="title-sm" component="p">
                      {stat.name}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </CardContent>
        </Card>
      ) : (
        <Card variant="plain" className="sticky top-0 h-fit w-full p-2 sm:w-96">
          <CardContent>
            <Typography level="h3" component="h1">
              Selecciona un item para ver su información.
            </Typography>
          </CardContent>
        </Card>
      )}
    </main>
  );
};

export default Profession;
