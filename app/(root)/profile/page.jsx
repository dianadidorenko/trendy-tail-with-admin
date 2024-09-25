"use client";

import Loader from "@/components/elements/Loader";
import UserForm from "@/components/layout/profile/UserForm";
import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function ProfilePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const adminStatus = JSON.parse(localStorage.getItem("isAdmin"));
      const email = localStorage.getItem("userEmail");

      if (token) {
        setIsLoggedIn(true);
        setUserEmail(email);
      }
      if (adminStatus === true) {
        setIsAdmin(true);
      }
      setLoading(false);
    }
  }, []);

  const clearLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("isAdmin");
  };

  const handleLogout = () => {
    clearLocalStorage();
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="m-10 flex flex-col items-center gap-10">
          {isLoggedIn ? (
            <>
              <div className="flex gap-4 items-center justify-between p-2 border-2 border-slate-300 rounded-md">
                {isAdmin && (
                  <>
                    <Link
                      href={"/admin"}
                      className="text-black dark:text-white/80 cursor-pointer flex items-center text-[14px] lg:text-base hover:text-orangeColor hover:dark:text-orangeColor transition-all"
                    >
                      Адмін
                    </Link>
                    <span> | </span>
                  </>
                )}

                <Link
                  href={"/"}
                  onClick={handleLogout}
                  className="text-primary dark:text-white/80 transition-all hover:text-orangeColor hover:dark:text-orangeColor text-[14px] lg:text-base"
                >
                  Вийти
                </Link>
              </div>
              <UserForm email={userEmail} />
            </>
          ) : (
            <div className="flex flex-col items-center gap-10 justify-center">
              <h1>Треба зареєструватися чи залогінитися</h1>
              <div>
                <Link
                  href={"/login"}
                  className="border text-gray-900 dark:text-gray-100 font-bold dark:border-gray-400 border-gray-900 rounded mr-2 p-2 hover:bg-gradient-to-r from-indigo-700 via-violet-700 to-cyan-950 duration-300 hover:text-gray-100"
                >
                  Логін
                </Link>
                <Link
                  href={"/register"}
                  className="border text-gray-900 dark:text-gray-100 font-bold dark:border-gray-400 border-gray-900 rounded mr-2 p-2 hover:bg-gradient-to-r from-indigo-700 via-violet-700 to-cyan-950 duration-300 hover:text-gray-100"
                >
                  Реєстрація
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
