"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

import PagesNav from "@/components/common/PagesNav";
import Gallery from "@/components/layout/product-details/Gallery";
import ProductDetails from "@/components/layout/product-details/ProductDetails";
import { fadeIn } from "@/lib/variants";
import { useEffect, useMemo, useState } from "react";
import Loader from "@/components/elements/Loader";
import { fetchItems } from "@/lib/fetchItems";

const sizeData = [
  {
    size: "XXS",
    length: "20-22",
    chest: "25-29",
    weight: "до 1.5",
    breeds: "Цуценята дрібних порід",
  },
  {
    size: "XS",
    length: "23-25",
    chest: "28-32",
    weight: "1.5-2.5",
    breeds: "Мініатюрний йоркширський тер'єр, чихуахуа, мініатюрний пінчер",
  },
  {
    size: "XS такса",
    length: "33-35",
    chest: "42-52",
    weight: "6.0-8.0",
    breeds: "Такса",
  },
  {
    size: "XS2",
    length: "26-28",
    chest: "32-39",
    weight: "2.0-3.0",
    breeds:
      "Йоркширський тер'єр, чихуахуа, мініатюрний пінчер, той-тер'єр, померанський шпіц, мальтезе, мальтіпу",
  },
  {
    size: "S",
    length: "27-29",
    chest: "37-44",
    weight: "2.5-3.5",
    breeds:
      "Йоркширський тер'єр, чихуахуа, мініатюрний пінчер, той-тер'єр, померанський шпіц, мальтезе, мальтіпу",
  },
  {
    size: "S такса",
    length: "38-40",
    chest: "44-54",
    weight: "8.0-10.0",
    breeds: "Такса",
  },
  {
    size: "S2",
    length: "28-30",
    chest: "50-57",
    weight: "7.0-9.0",
    breeds: "Мопс, французький бульдог",
  },
  {
    size: "S2 такса",
    length: "38-40",
    chest: "50-62",
    weight: "12.0-15.0",
    breeds: "Такса, пекінес, невеликі коргі",
  },
  {
    size: "SM",
    length: "28-30",
    chest: "44-52",
    weight: "4.0-6.0",
    breeds: "Пінчер, бішон фризе, джек-рассел-тер'єр",
  },
  {
    size: "M",
    length: "34-36",
    chest: "40-48",
    weight: "3.0-6.0",
    breeds:
      "Мальтезе, ши-тцу, той-пудель, карликовий пудель, бішон фризе, кавалер-кінг-чарльз-спанієль",
  },
  {
    size: "M такса",
    length: "43-45",
    chest: "50-62",
    weight: "10.0-13.0",
    breeds: "Такса",
  },
  {
    size: "M2",
    length: "32-34",
    chest: "55-65",
    weight: "10.0-14.0",
    breeds: "Мопс, французький бульдог",
  },
  {
    size: "ML",
    length: "33-35",
    chest: "44-55",
    weight: "4.0-7.0",
    breeds: "Джек-рассел-тер'єр",
  },
  {
    size: "L",
    length: "38-40",
    chest: "47-56",
    weight: "6.0-13.0",
    breeds:
      "Китайська чубата, ши-тцу, той-пудель, пудель, шнауцер, японський хін, кокер-спанієль",
  },
  {
    size: "XL",
    length: "41-43",
    chest: "55-65",
    weight: "10.0-15.0",
    breeds:
      "Шнауцер, кокер-спаніель, фокстер'єр, скотчтер'єр, цвергшнауцер, англійський спаніель, міні бультер'єр",
  },
  {
    size: "2XL",
    length: "44-46",
    chest: "60-72",
    weight: "20.0-25.0",
    breeds: "Самоїд, бультер'єр",
  },
  {
    size: "3XL",
    length: "47-49",
    chest: "68-80",
    weight: "25.0-30.0",
    breeds: "Самоїд великий, стаффорд, бультер'єр",
  },
  {
    size: "4XL",
    length: "49-51",
    chest: "72-85",
    weight: "30.0-35.0",
    breeds: "Стаффорд, хаскі",
  },
  {
    size: "5XL",
    length: "55-57",
    chest: "78-91",
    weight: "35.0-45.0",
    breeds: "Ретрівер, лабрадор, боксер",
  },
  {
    size: "6XL",
    length: "61-63",
    chest: "82-95",
    weight: "45.0-50.0",
    breeds: "Вівчарка, ротвейлер, доберман",
  },
  {
    size: "7XL",
    length: "70-72",
    chest: "86-99",
    weight: "60.0-66.0",
    breeds: "Кане-корсо",
  },
];

const ProductDetailsPage = () => {
  const path = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const item = useMemo(
    () => items.find((item) => item.urlName === path.productId),
    [items, path.productId]
  );

  useEffect(() => {
    const getItems = async () => {
      setLoading(true);
      try {
        const data = await fetchItems();
        setItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };

    getItems();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (!item) {
    return (
      <div className="flex flex-col items-center justify-center mt-10 gap-4 p-6">
        <p className="text-2xl">Продукт не знайдено</p>
        <button
          className="mt-4 p-2 bg-blue-500 text-white rounded"
          onClick={() => window.history.back()}
        >
          Назад до каталогу
        </button>
      </div>
    );
  }

  const {
    id,
    images,
    name,
    category,
    characteristics,
    careInstructions,
    materialAdditionalInfo,
  } = item;

  return (
    <section>
      <div className="container mx-auto">
        <PagesNav items={items} itemName={name} />

        <motion.div
          className="flex gap-10 py-6 flex-col lg:flex-row"
          variants={fadeIn("up", 0.6)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true, amount: 0.2 }}
        >
          <Gallery productMedia={images} />

          <ProductDetails item={item} />
        </motion.div>

        {(characteristics?.length > 1 ||
          materialAdditionalInfo?.length > 1 ||
          careInstructions?.length > 1) && (
          <div>
            <Image
              src="/catalogue-detail-item/paws.png"
              className="paws-decor"
              width={550}
              height={100}
              alt="Декор у вигляді лапок"
              objectFit={"cover"}
            />

            <div className="below-block">
              <p className="text-[23px] text-primary dark:text-white/80 font-semibold max-[360px]:text-[17px]">
                ОПИС
              </p>
              <div className="characteristics">
                {characteristics?.length > 0 && (
                  <div>
                    <h3 className="text-black max-[360px]:text-[14px] dark:text-white dark:underline">
                      <strong>Переваги:</strong>
                    </h3>

                    <ul>
                      {characteristics?.length > 0 &&
                        characteristics?.map((adv, index) => (
                          <li
                            key={index}
                            className="text-primary max-[360px]:text-[14px] dark:text-white/60"
                          >
                            {adv}
                          </li>
                        ))}
                    </ul>
                  </div>
                )}

                {materialAdditionalInfo?.length > 0 && (
                  <div>
                    <h3 className="text-black max-[360px]:text-[14px] dark:text-white dark:underline">
                      <strong>Матерал:</strong>
                    </h3>

                    <ul>
                      <li className="text-primary max-[360px]:text-[14px] dark:text-white/60">
                        {materialAdditionalInfo}
                      </li>
                    </ul>
                  </div>
                )}

                {careInstructions?.length > 0 && (
                  <div>
                    <h3 className="text-black max-[360px]:text-[14px] dark:text-white dark:underline">
                      <strong>Рекомендації щодо користування:</strong>
                    </h3>

                    <ul>
                      {careInstructions?.length > 0 &&
                        careInstructions?.map((rec, index) => (
                          <li
                            key={index}
                            className="text-primary max-[360px]:text-[14px] dark:text-white/60"
                          >
                            {rec}
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {category === "cloth" && (
          <div
            id="sizes"
            className="sizes-table pt-2 dark:bg-slate-700 dark:text-white/90 mb-[100px]"
          >
            <h2 className="uppercase text-xl">Розмірна сітка</h2>
            <div>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-20 justify-center py-5 text-[12px] sm:text-[15px]">
                <div className="flex flex-col items-center gap-2 max-w-[400px]">
                  <h3>Довжина тіла "A"</h3>
                  <Image
                    src="/catalogue-detail-item/back-length.jpeg"
                    alt="Заміри спини"
                    width={200}
                    height={200}
                    objectFit={"cover"}
                  />
                  <img />
                  <p>&Xi;</p>
                  <p className="max-w-[250px] text-center">
                    Переконайтесь, що ваш собака стоїть прямо. Виміряйте довжину
                    тіла від шиї до хвоста. Якщо довжина тіла між розмірами, то
                    краще вибрати більшу.
                  </p>
                </div>

                <div className="flex flex-col items-center gap-2 max-w-[400px]">
                  <h3>Об&apos;єм грудей "B"</h3>
                  <Image
                    src="/catalogue-detail-item/chest-meisure.jpeg"
                    alt="Заміри грудної клітки"
                    width={200}
                    height={200}
                    objectFit={"cover"}
                  />

                  <p>&Xi;</p>
                  <p className="max-w-[250px] text-center">
                    Відміряйте найширшу частину грудей вашого вихованця.
                    Зверніть увагу, що модель одягу може бути тонкою або вільною
                    відповідно до дизайну, тканини або за власним смаком.
                  </p>
                </div>
              </div>
              <table>
                <thead>
                  <tr className="bg-tableTitle">
                    <th className="font-bold text-[12px] sm:text-[15px]">
                      Розмір
                    </th>
                    <th className="font-bold text-[12px] sm:text-[15px]">
                      "A" довжина спини (см)
                    </th>
                    <th className="font-bold text-[12px] sm:text-[15px]">
                      “В” об’єм грудей (см)
                    </th>
                    <th className="font-bold text-[12px] sm:text-[15px]">
                      Вага (кг)
                    </th>
                    <th className="font-bold text-[12px] sm:text-[15px]">
                      Рекомендовані породи
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sizeData.map((data, index) => (
                    <tr key={index} className="text-[12px] sm:text-[15px]">
                      <td>{data.size}</td>
                      <td>{data.length}</td>
                      <td>{data.chest}</td>
                      <td>{data.weight}</td>
                      <td>{data.breeds}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductDetailsPage;
