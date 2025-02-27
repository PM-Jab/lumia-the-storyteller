"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  // Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import Image from "next/image";
import { useState } from "react";
import ThemeSwitch from "./ThemeSwitch";
import { Button } from "@heroui/button";
// import { useUser, SignOutButton } from "@clerk/nextjs";

export default function Header() {
  const menuList: any = [
    // {
    //   name: "Home",
    //   path: "/home",
    // },
    // {
    //   name: "Explore",
    //   path: "#",
    // },
    // {
    //   name: "My Shelf",
    //   path: "#",
    // },
    // {
    //   name: "Create Story",
    //   path: "#",
    // },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const { user, isSignedIn } = useUser();

  return (
    <Navbar
      maxWidth="full"
      onMenuOpenChange={setIsMenuOpen}
      className="fixed top-0 left-0 w-full z-50"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/" className="flex items-center">
            <Image src="/logo.svg" alt="Logo" width={40} height={40} />
            <h2 className="font-bold text-2xl text-primary ml-3">Lumia</h2>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="center" className="hidden sm:flex">
        {menuList.map((item: any, index: number) => (
          <NavbarItem key={index} className="font-light mx-4">
            <Link
              href={item.path}
              className="text-xl text-black hover:underline"
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarMenu>
        {menuList.map((item: any, index: number) => (
          <NavbarMenuItem
            key={index}
            className="text-primary font-semibold mx-4"
          >
            <Link href={item.path} className="text-xl hover:underline">
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
      <NavbarContent justify="end">
        <ThemeSwitch />
        {/* <Button>Click me</Button> */}
      </NavbarContent>
    </Navbar>
  );
}
