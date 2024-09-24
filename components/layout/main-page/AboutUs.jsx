"use client";

import SectionHeaders from "@/components/common/SectionHeaders";
import Image from "next/image";
import { useEffect, useState } from "react";

const AboutUs = () => {
  const aboutUsText =
    "Давним-давно група любителів собак відкрила інтернет-магазин модного одягу для собак у невеликому містечку біля моря. Урочиствідкриття магазину пройшло успішно, на ньому було представлено стильні варіанти для собак усіх розмірів та порід. Команда використовувала маркетингові тактики, такі як соціальні мережі та співпраця з впливовими особами свійських тварин, щоб поширити інформацію. Вони спростили процес онлайн-покупок та забезпечили швидке обслуговування клієнтів. Магазин також пропонував практичні, але модні аксесуари. Цей інтернет-магазин одягу для собак ознаменував новий початок в індустрії моди для домашніх тварин, обіцяючи привнести інноваційні можливості у моду.";

  // изменение элементов при уменьшении/увеличении окна
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showFullText, setShowFullText] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    if (typeof window !== "undefined") {
      // Проверяем наличие объекта window
      handleResize();
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  return (
    <section>
      <SectionHeaders mainHeader={"О нас"} />
      <div className="container mx-auto py-[70px] xs:py-[50px]">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <Image
              src={"/pages/main/about.png"}
              width={550}
              height={418}
              alt="О нас"
              className="hidden lg:flex lg:max-w-[450px] xl:max-w-none"
            />
          </div>
          <div className="flex flex-col items-center gap-6">
            <Image
              src={"/logo.svg"}
              width={80}
              height={80}
              alt="Лого"
              className="xs:max-w-[60px]"
            />
            <p>
              {isMobile && !showFullText
                ? aboutUsText.slice(0, 285) + "..."
                : aboutUsText}
            </p>
            {isMobile && !showFullText && (
              <button
                className="border border-gray-400/40 rounded-xl p-2 hover:bg-gray-200 hover:dark:bg-gray-500 transition-all duration-300"
                onClick={() => setShowFullText(true)}
              >
                Показати ще
              </button>
            )}
            {isMobile && showFullText && (
              <button
                className="border border-gray-400/40 rounded-xl p-2 hover:bg-gray-200 hover:dark:bg-gray-500 transition-all duration-300"
                onClick={() => setShowFullText(false)}
              >
                Сховати
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
