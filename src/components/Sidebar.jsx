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
        height: "10vh",
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
      <Link href="/market/combat">
        <IconButton>
          <Image
            src="https://cdn.skymavis.com/mm-cache/e/d/34767ef4192a43fa9e43bf6536d4a8.png"
            alt="Stone Sword"
            width={32}
            height={32}
          />
        </IconButton>
      </Link>
      <Link href="/market/farming">
        <IconButton>
          <Image
            src="https://cdn.skymavis.com/mm-cache/5/3/ca3f1a32f548ca9f52572f02517fac.png"
            alt="Iron Kettle"
            width={32}
            height={32}
          />
        </IconButton>
      </Link>
      <Link href="/market/gathering">
        <IconButton>
          <Image
            src="https://cdn.skymavis.com/mm-cache/d/e/18aa0ea45c2e1af5581934b49a7647.png"
            alt="Iron Pickaxe"
            width={32}
            height={32}
          />
        </IconButton>
      </Link>
      <Link href="/essence">
        <IconButton>
          <Image
            src="https://cdn.skymavis.com/mm-cache/a/8/537df7e2d347efdb00720fbd031436.png"
            alt="Essence"
            width={32}
            height={32}
          />
        </IconButton>
      </Link>
      <Link href="/wiki/combat">
        <IconButton>
          Wiki Combat
        </IconButton>
      </Link>
      <Link href="/wiki/farming">
        <IconButton>
          Wiki Farming
        </IconButton>
      </Link>
      <Link href="/wiki/gathering">
        <IconButton>
          Wiki Gathering
        </IconButton>
      </Link>
    </Sheet>
  );
}
