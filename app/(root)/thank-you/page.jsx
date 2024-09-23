"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Bone } from "lucide-react";

const ThankYouPageContent = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const searchParams = useSearchParams();
  const orderParam = searchParams.get("order");

  useEffect(() => {
    if (orderParam) {
      try {
        const orderData = JSON.parse(decodeURIComponent(orderParam));
        setOrderDetails(orderData);
      } catch (error) {
        console.error("Ошибка декодирования данных заказа:", error);
      }
    }
  }, [orderParam]);

  if (!orderDetails) {
    return <div>Загрузка данных заказа...</div>;
  }

  return (
    <section className="xs:py-[50px] py-[70px]">
      <div className="container mx-auto max-w-[750px]">
        <div className="text-center">
          <h1 className="text-2xl">
            Дякуємо за Ваше замовлення,{" "}
            {orderDetails?.clientInfo.split(" ")[2].replace(",", "")}!
          </h1>
          <p className="text-xl">
            Замовлення вже в обробці. <br /> Деталі замовлення:
          </p>
        </div>

        <div className="flex flex-col gap-4 pt-10">
          <h2 className="rounded-xl px-2 py-1 border-2 border-gray-400/40 flex items-center justify-center">
            Клієнт:
          </h2>
          <p className="border-b-gray-500/40 border-b">
            Ім&apos;я і прізвище:{" "}
            {orderDetails.clientInfo.split(" ")[2].replace(",", "")}{" "}
            {orderDetails.clientInfo.split(" ")[3].replace(",", "")}
          </p>
          <p className="border-b-gray-500/40 border-b">
            Мейл: {orderDetails.clientInfo.split(" ")[4].replace(",", "")}
          </p>
          <p className="border-b-gray-500/40 border-b">
            Адреса доставки:{" "}
            {orderDetails.clientInfo.split(" ")[5].replace(",", "")} обл., м.{" "}
            {orderDetails.clientInfo.split(" ")[6]}{" "}
            {orderDetails.clientInfo
              .split(" ")
              .slice(7)
              .join(" ")
              .replace(/,\s*$/, "")}
          </p>

          <h2 className="rounded-xl px-2 py-1 border-2 border-gray-400/40 flex items-center justify-center">
            Товари:
          </h2>
          <ul className="border-b-gray-500/40 border-b">
            {orderDetails.cartInfo.map((item, index) => (
              <li key={index}>
                {index + 1}. {item.replace(/Товар\s*-\s*|\[|\]/g, "")}
              </li>
            ))}
          </ul>
          <p>{orderDetails.total}</p>
        </div>

        <div className="flex items-center justify-center py-10">
          <Bone color="orange" className="animate-pulse" />
        </div>

        <div>
          <h4 className="text-center">
            P.S. Якщо залишились запитання, зателефонуйте нам за номером{" "}
            <Link
              href="tel:+380974379424"
              className="dark:text-white/80 underline"
            >
              +38 (097) 437 94 24 <br />
            </Link>{" "}
            чи на мейл{" "}
            <Link
              href="mailto:trendytail@ukr.net"
              className="dark:text-white/80 underline"
            >
              trendytail@ukr.net
            </Link>
          </h4>
        </div>
      </div>
    </section>
  );
};

const ThankYouPage = () => {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <ThankYouPageContent />
    </Suspense>
  );
};

export default ThankYouPage;
