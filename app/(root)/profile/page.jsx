"use client";

import UserForm from "@/components/layout/profile/UserForm";
import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function ProfilePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

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
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("isAdmin");
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  return (
    <div>
      {isAdmin && (
        <Link
          href={"/admin"}
          className="text-black dark:text-white/80 cursor-pointer flex items-center text-[12px] md:text-[14px] lg:text-base"
        >
          Адмін
        </Link>
      )}

      {isLoggedIn && (
        <Link
          href={"/"}
          onClick={handleLogout}
          className="text-primary dark:text-white/80 transition-all hover:text-orangeColor hover:dark:text-orangeColor text-[12px] md:text-[14px] lg:text-base"
        >
          Вийти
        </Link>
      )}

      <UserForm />
    </div>
  );
}
