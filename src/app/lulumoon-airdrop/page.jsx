"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Avatar from "@mui/joy/Avatar";
import LinkIcon from "@mui/icons-material/Link";
import Link from "@mui/joy/Link";

const LulumoonAirdrop = () => {
  const [data, setData] = useState([]);

  async function fetchData() {
    try {
      const res = await axios.post(
        `${window.location.origin}/api/lulumoon-airdrop`,
      );
      setData(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const formatNumber = (value) =>
    new Intl.NumberFormat("en-US").format(value || 0);

  return (
    <div className="p-3">
      <Card variant="soft">
        <CardContent orientation="horizontal" className="items-center">
          <Avatar alt={data.image} src={data.image} />
          <CardContent>
            <Sheet
              sx={{
                borderRadius: "sm",
                p: 1.5,
                my: 1.5,
                display: "flex",
                gap: 2,
                "& > div": { flex: 1 },
              }}
            >
              <div>
                <Typography
                  level="body-md"
                  sx={{ fontWeight: "lg" }}
                  endDecorator={
                    <Link
                      variant="outlined"
                      href="https://app.roninchain.com/token/0xcc451977a4be9adee892f7e610fe3e3b3927b5a1/268692752"
                      target="_blank"
                      sx={{ fontSize: "md", borderRadius: "sm" }}
                    >
                      <LinkIcon />
                    </Link>
                  }
                >
                  Total supply
                </Typography>
                <Typography sx={{ fontWeight: "lg" }}>
                  {data?.total?.percentage || 0}%
                </Typography>
                <Typography sx={{ fontWeight: "sm" }}>
                  {formatNumber(data?.total?.value)}
                </Typography>
              </div>
              <div>
                <Typography level="body-md" sx={{ fontWeight: "lg" }}>
                  Burned in meme coins
                </Typography>
                <Typography sx={{ fontWeight: "lg" }}>
                  {data?.burned?.percentage || 0}%
                </Typography>
                <Typography sx={{ fontWeight: "sm" }}>
                  {formatNumber(data?.burned?.value)}
                </Typography>
              </div>
              <div>
                <Typography level="body-md" sx={{ fontWeight: "lg" }}>
                  In circulation
                </Typography>
                <Typography sx={{ fontWeight: "lg" }}>
                  {data?.circulation?.percentage || 0}%
                </Typography>
                <Typography sx={{ fontWeight: "sm" }}>
                  {formatNumber(data?.circulation?.value)}
                </Typography>
              </div>
              <div>
                <Typography
                  level="body-md"
                  sx={{ fontWeight: "lg" }}
                  endDecorator={
                    <Link
                      variant="outlined"
                      href="https://marketplace.skymavis.com/collections/0xcc451977a4be9adee892f7e610fe3e3b3927b5a1/268692752"
                      target="_blank"
                      sx={{ fontSize: "md", borderRadius: "sm" }}
                    >
                      <LinkIcon />
                    </Link>
                  }
                >
                  In sale
                </Typography>
                <Typography sx={{ fontWeight: "lg" }}>
                  {data?.sale?.percentage || 0}%
                </Typography>
                <Typography sx={{ fontWeight: "sm" }}>
                  {formatNumber(data?.sale?.value)}
                </Typography>
              </div>
            </Sheet>
          </CardContent>
        </CardContent>
      </Card>
    </div>
  );
};

export default LulumoonAirdrop;
