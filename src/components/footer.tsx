"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Home", link: "/" },
  { name: "Brand", link: "/brand" },
  { name: "Category", link: "/category" },
];

export default function Footer() {
  const pathname = usePathname();
  // console.log(pathname);

  return (
    <footer className="bg-[#222831] p-4 text-white">
      <div className="flex justify-between px-10">
        {links.map((link) => (
          <Link
            key={link.link}
            href={link.link}
            className={`${
              pathname === link.link ? " text-[#00ADB5] font-semibold" : ""
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </footer>
  );
}
