// "use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import Image from "next/image";

export default function Header() {
  const menuList = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "My Shelf",
      path: "/shelf",
    },
    {
      name: "Create Story",
      path: "/create-story",
    },
  ];
  return (
    <Navbar>
      <NavbarContent>
        <NavbarBrand>
          <Link href="/" className="flex items-center">
            <Image src="/logo.svg" alt="Logo" width={40} height={40} />
            <h2 className="font-bold text-2xl text-primary-50 ml-3">Lumia</h2>
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent>
        {menuList.map((item, index) => (
          <NavbarItem key={index}>
            <Link href={item.path || ""}>{item.name}</Link>
          </NavbarItem>
        ))}
      </NavbarContent>
    </Navbar>
  );
}
