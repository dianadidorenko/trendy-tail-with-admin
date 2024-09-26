"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

import Loader from "@/components/elements/Loader";
import UserForm from "@/components/layout/profile/UserForm";

export default function ProfilePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  orders.map((order) => console.log(order));

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

  useEffect(() => {
    const fetchOrders = async () => {
      if (userEmail) {
        try {
          const response = await axios.get("/api/orders", {
            params: { email: userEmail },
          });
          setOrders(response.data);
        } catch (error) {
          console.error("Ошибка при загрузке заказов:", error);
        }
      }
    };

    fetchOrders();
  }, [userEmail]);

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

              <div className="m-10 flex flex-col items-center gap-10">
                <h2 className="text-2xl font-bold mb-6">
                  {isAdmin
                    ? `Усього замовлень: ${orders.length}`
                    : `Мої замовлення: ${orders.length}`}
                </h2>
                {orders.length > 0 ? (
                  <ul className="space-y-4 dark:text-black/50">
                    {orders.map((order) => (
                      <li
                        key={order._id}
                        className="p-4 border rounded-md shadow-md dark:bg-[#adadad] text-gray-100 dark:text-gray-600 hover:shadow-lg transition-shadow"
                      >
                        <div className="flex flex-col gap-4">
                          <div className="flex justify-between">
                            <p className="font-semibold">
                              Замовлення вiд:{" "}
                              {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                            <p className="font-semibold">
                              Статус:{" "}
                              <span className="text-green-700">
                                {order.status === "pending" ? "в обробцi" : ""}
                                {order.status ===
                                "в процесі підготовки до відправлення"
                                  ? "в процесі підготовки до відправлення"
                                  : ""}
                                {order.status === "видано" ? "видано" : ""}
                              </span>
                            </p>
                          </div>
                          <div className="flex flex-col">
                            <p>
                              <span className="font-semibold">Клiент:</span>{" "}
                              {order.client.name} {order.client.surname} (
                              {order.client.phone}, {order.client.email})
                            </p>
                            <p>
                              <span className="font-semibold">Адрес:</span>{" "}
                              {order.client.region}, {order.client.city},{" "}
                              {order.client.warehouse}
                            </p>
                          </div>
                          <p>
                            <span className="font-semibold">Товари:</span>
                          </p>
                          <div className="space-y-2">
                            {order.items.map((item) => (
                              <div
                                key={item._id}
                                className="flex justify-between flex-col"
                              >
                                <div className="flex items-center gap-4 border border-gray-300 p-2">
                                  <Image
                                    src={item.image}
                                    width={80}
                                    height={80}
                                    alt={item.name}
                                    className="rounded mr-2"
                                  />
                                  <span>{item.name}</span>
                                  <span>{item.size}</span>
                                  <span>К-во: {item.amount}</span>
                                  <span>Ціна: {item.price} ₴</span>
                                </div>
                              </div>
                            ))}
                          </div>
                          <p>
                            <span className="font-semibold">Сума:</span>{" "}
                            {order.total} ₴
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">У вас ще немає замовлень.</p>
                )}
              </div>
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
