import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { motion } from "framer-motion";

const links = [
  { path: "/catalog", name: "Каталог" },
  { path: "/about", name: "О нас" },
  { path: "/delivery", name: "Доставка і оплата" },
  { path: "/contacts", name: "Контакти" },
  { path: "/feedback", name: "Відгуки" },
];

const Nav = ({ containerStyles, linkStyles, underlineStyles }) => {
  const path = usePathname();

  return (
    <nav className={`${containerStyles}`}>
      {links.map((link, index) => (
        <Link href={link.path} key={index} className={`${linkStyles}`}>
          {link.path === path && (
            <motion.span
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              transition={{ type: "tween" }}
              layoutId="underline"
              className={`${underlineStyles}`}
            />
          )}
          {link.name}
        </Link>
      ))}
    </nav>
  );
};

export default Nav;
