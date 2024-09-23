"use client";

import { MoonStarIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();

  return (
    <p
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={`${
        theme === "dark"
          ? "border-0 p-0 border-darkBlueColor"
          : "border-0 p-0 border-lightBlueColor"
      }`}
    >
      <SunIcon
        size={20}
        className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
      />
      <MoonStarIcon
        size={20}
        className="absolute top-[37%] rotate-0 scale-0 transition-all dark:rotate-0 dark:scale-100"
      />
    </p>
  );
};

export default ThemeToggler;
