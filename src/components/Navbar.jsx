"use client";
import React from "react";
import Link from "next/link";
import {
  Sheet,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  Dropdown,
} from "@mui/joy";
import { House } from "lucide-react";

const DropdownMenu = ({ label, links }) => {
  return (
    <Dropdown>
      <MenuButton variant="plain">{label}</MenuButton>
      <Menu variant="plain">
        {links.map((link) => (
          <MenuItem key={link.href}>
            <Link href={link.href}>{link.label}</Link>
          </MenuItem>
        ))}
      </Menu>
    </Dropdown>
  );
};

const Navbar = () => {
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

      <DropdownMenu
        label="Market"
        links={[
          { href: "/market/combat", label: "Combat" },
          { href: "/market/farming", label: "Farming" },
          { href: "/market/gathering", label: "Gathering" },
          { href: "/market/energy", label: "Energy" },
          { href: "/market/essence", label: "Essence" },
        ]}
      />

      <DropdownMenu
        label="Wiki"
        links={[
          { href: "/wiki/combat", label: "Combat" },
          { href: "/wiki/farming", label: "Farming" },
          { href: "/wiki/gathering", label: "Gathering" },
        ]}
      />

      <Link href="/lulumoon-airdrop">
        <IconButton>Lulumoon Airdrop</IconButton>
      </Link>
    </Sheet>
  );
};

export default Navbar;
