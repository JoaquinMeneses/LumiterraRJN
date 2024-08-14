import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Sheet, IconButton } from "@mui/joy";
import { House } from "lucide-react";

export default function Sidebar() {
  return (
    <Sheet
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 1,
        gap: 1,
      }}
    >
      <Link href="/">
        <IconButton>
          <House />
        </IconButton>
      </Link>
      <Link href="/energia">
        <IconButton>
          <Image
            src="https://cdn.skymavis.com/mm-cache/7/e/803fdd893e99fbdb34c55cb81fd6eb.png"
            alt="Lv 1 Energy Restoration Potion 2.0"
            width={32}
            height={32}
          />
        </IconButton>
      </Link>
      <Link href="/combat">
        <IconButton>
          <Image
            src="https://cdn.skymavis.com/mm-cache/e/d/34767ef4192a43fa9e43bf6536d4a8.png"
            alt="Stone Sword"
            width={32}
            height={32}
          />
        </IconButton>
      </Link>
      <Link href="/farming">
        <IconButton>
          <Image
            src="https://cdn.skymavis.com/mm-cache/5/a/a07b32d1643fa4d3ac4972256efc57.png"
            alt="Iron Hoe"
            width={32}
            height={32}
          />
        </IconButton>
      </Link>
      <Link href="/gathering">
        <IconButton>
          <Image
            src="https://cdn.skymavis.com/mm-cache/d/e/18aa0ea45c2e1af5581934b49a7647.png"
            alt="Iron Pickaxe"
            width={32}
            height={32}
          />
        </IconButton>
      </Link>
    </Sheet>
  );
}
