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
  Avatar,
} from "@mui/joy";

import AspectRatio from "@mui/joy/AspectRatio";

const Profession = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  async function fetchData() {
    try {
      const res = await axios.post(`${window.location.origin}/api/wiki/combat`);
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
    <main className="flex flex-grow flex-col-reverse justify-end gap-2 p-2 sm:flex-row">
      <div className="flex w-full bg-green-600 sm:w-3/4">
        <div className="w-[48px]">1</div>
        <div className="w-[48px]">2</div>
        <div className="w-[48px]">3</div>
        <div className="w-[48px]">4</div>
        <div className="w-[48px]">5</div>
        <div className="w-[48px]">6</div>
        <div className="w-[48px]">7</div>
        <div className="w-[48px]">8</div>
        <div className="w-[48px]">9</div>
      </div>
      <Card variant="plain" className="w-full p-2 sm:w-1/4">
        <CardContent>
          <Typography level="h3" component="h1">
            Cracked Crystal Bracelet
          </Typography>
          <AspectRatio objectFit="contain" className="">
            <Image
              src={"https://icons.lumiterra.net/item-icon-52.png"}
              loading="lazy"
              alt={"Cracked Crystal Bracelet"}
              fill
            />
          </AspectRatio>
          <Box className="flex gap-1">
            <Typography level="title-lg" component="p">
              Level:
            </Typography>
            <Box>
              <Typography level="title-lg" component="p">
                1
              </Typography>
            </Box>
          </Box>
          <Box className="flex items-center gap-1">
            <Typography level="title-lg" component="p">
              Recipe:
            </Typography>
            <Box className="flex">
              <Chip
                variant="soft"
                color="neutral"
                size="lg"
                startDecorator={
                  <Avatar
                    size="sm"
                    src={`https://icons.lumiterra.net/item-icon-411.png`}
                  />
                }
              >
                Mark
              </Chip>
              <Typography level="title-lg" component="p">
                x2
              </Typography>
            </Box>
          </Box>
          <Box>
            <Typography level="title-lg" component="p">
              Stats
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </main>
  );
};

export default Profession;
