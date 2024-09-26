import { Search, ShoppingBag, UserRound, UserRoundCheck } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
import SearchInput from "./SearchInput";
import ThemeToggler from "../ThemeToggler";
import { CartContext } from "@/lib/context/CartContext";
import { Button } from "../ui/button";

const SettingsHeader = ({ containerStyles, linkStyles }) => {
  const { itemAmount } = useContext(CartContext);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const adminStatus = JSON.parse(localStorage.getItem("isAdmin"));

      if (token) {
        setIsLoggedIn(true);
      }
      if (adminStatus === true) {
        setIsAdmin(true);
      }
      setLoading(false);
    }
  }, []);

  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const closeSearch = () => {
    setIsSearchVisible(false);
  };

  return (
    <div className={`${containerStyles}`}>
      {isSearchVisible && <SearchInput closeSearch={closeSearch} />}

      <button href={""} className={`${linkStyles}`} onClick={toggleSearch}>
        <Search size={20} />
      </button>
      <button className={`${linkStyles}`}>
        <ThemeToggler />
      </button>

      {isLoggedIn ? (
        <Link href={"/profile"} className={`${linkStyles}`}>
          <UserRoundCheck size={20} />
        </Link>
      ) : (
        <Link href={"/login"} className={`${linkStyles}`}>
          <UserRound size={20} />
        </Link>
      )}

      <Link href={"/cart"} className={`flex gap-2`}>
        <ShoppingBag
          size={20}
          className="hover:text-orangeColor transition-all hover:dark:text-darkBlueColor"
        />
        {itemAmount > 0 && (
          <span className="absolute right-5 top-4 max-[390px]:right-2 bg-white border-2 border-darkBlueColor py-[1px] px-[6px] rounded-full text-primary text-[12px] transition-all">
            {itemAmount}
          </span>
        )}
      </Link>
    </div>
  );
};

export default SettingsHeader;
