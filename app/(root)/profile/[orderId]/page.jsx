"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import toast from "react-hot-toast";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Loader from "@/components/elements/Loader";

const ProfileOrderPage = ({ params }) => {
  const { orderId } = params;
  const [order, setOrder] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Проверяем, является ли пользователь администратором
  useEffect(() => {
    if (typeof window !== "undefined") {
      const adminStatus = JSON.parse(localStorage.getItem("isAdmin"));
      setIsAdmin(adminStatus === true);
    }
  }, []);

  // Получаем данные о заказе
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/orders/${orderId}`);
        if (!response.ok) {
          throw new Error("Не удалось загрузить заказ.");
        }
        const data = await response.json();
        setOrder(data);
      } catch (error) {
        console.error("Error", error);
      }
    };

    fetchOrder();
  }, [orderId]);

  // Функция для обновления статуса заказа
  const updateOrderStatus = async (newStatus) => {
    console.log("Отправляемый статус:", newStatus);
    try {
      const response = await axios.patch(`/api/orders/${orderId}`, {
        status: newStatus,
      });

      if (response.data.success) {
        // Если обновление прошло успешно, обновляем локальный статус
        setOrder((prevOrder) => ({ ...prevOrder, status: newStatus }));
        toast.success("Cтатус замовлення оновлено");
        console.log("Статус заказа обновлен:", response.data.order);
      } else {
        toast.error("Cтатус замовлення не оновлено");
      }
    } catch (error) {
      toast.error("Cтатус замовлення не оновлено");
      console.error("Ошибка при обновлении статуса заказа:", error);
    }
  };

  if (!order) {
    return (
      <div className="flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="m-10">
      <Link
        href={"/profile"}
        className="flex gap-2 text-white p-1 rounded-lg mb-6"
      >
        <ArrowLeft />
        Назад
      </Link>

      <h1 className="text-primary text-xl dark:text-white mb-6 font-extrabold">
        Замовлення: #{order._id}
      </h1>
      <div className="p-2 sm:p-4 border rounded-md shadow-md dark:bg-[#d8d8d8] text-primary dark:text-gray-600 hover:shadow-lg transition-shadow">
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 flex-col sm:flex-row justify-between">
            <p className="font-semibold">
              Замовлення вiд: {new Date(order.createdAt).toLocaleDateString()}
            </p>

            {isAdmin && (
              <select
                value={order.status}
                onChange={(e) => updateOrderStatus(e.target.value)}
                className="p-1 border border-gray-400 rounded dark:bg-white outline-none"
              >
                <option value="pending">в обробці</option>
                <option value="в процесі підготовки до відправлення">
                  в процесі підготовки до відправлення
                </option>
                <option value="видано">видано</option>
              </select>
            )}
          </div>
          <div className="flex flex-col">
            <p>
              <span className="font-semibold">Клiент:</span> {order.client.name}{" "}
              {order.client.surname} ({order.client.phone}, {order.client.email}
              )
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
              <div key={item._id} className="flex justify-between flex-col">
                <div className="flex flex-col items-center gap-1 border border-gray-400 p-2 sm:flex-row sm:gap-4">
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
            <span className="font-semibold">Сума:</span> {order.total} ₴
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileOrderPage;
