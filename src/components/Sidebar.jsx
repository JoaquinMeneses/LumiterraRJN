import React from "react";
import Link from "next/link";
import { Sheet, IconButton } from "@mui/joy";
import Image from "next/image";

export default function Sidebar() {
  return (
    <Sheet
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 1,
        gap: 1,
      }}
    >
      <Link href="/">
        <IconButton>Inicio</IconButton>
      </Link>
      <Link href="/energia">
        <IconButton>
          <Image
            src="https://cdn.skymavis.com/mm-cache/7/e/803fdd893e99fbdb34c55cb81fd6eb.png"
            alt="Item de energia"
            width={32}
            height={32}
          />
        </IconButton>
      </Link>
    </Sheet>
  );
}
