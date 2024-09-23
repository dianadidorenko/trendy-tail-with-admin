"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

import PagesNav from "@/components/common/PagesNav";
import Gallery from "@/components/layout/product-details/Gallery";
import ProductDetails from "@/components/layout/product-details/ProductDetails";
import { fadeIn } from "@/lib/variants";
import { useEffect, useState } from "react";
import Loader from "@/components/elements/Loader";
import { fetchItems } from "@/lib/fetchItems";

const ProductDetailsPage = () => {
  const path = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const item = items.find((item) => item.urlName === path.productId);

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
                <tbody>
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
                  <tr className="text-[12px] sm:text-[15px]">
                    <td>XXS</td>
                    <td>20-22</td>
                    <td>25-29</td>
                    <td>до 1.5</td>
                    <td className="text-[12px] sm:text-[15px]">
                      Цуценята дрібних порід
                    </td>
                  </tr>
                  <tr className="text-[12px] sm:text-[15px]">
                    <td>XS</td>
                    <td>23-25</td>
                    <td>28-32</td>
                    <td>1.5-2.5</td>
                    <td className="text-[12px] sm:text-[15px]">
                      Мініатюрний йоркширський тер&apos;єр, чихуахуа,
                      мініатюрний пінчер, той-тер&apos;єр
                    </td>
                  </tr>
                  <tr className="text-[12px] sm:text-[15px]">
                    <td>XS такса</td>
                    <td>33-35</td>
                    <td>42-52</td>
                    <td>6.0-8.0</td>
                    <td>Такса</td>
                  </tr>
                  <tr className="text-[12px] sm:text-[15px]">
                    <td>XS2</td>
                    <td>26-28</td>
                    <td>32-39</td>
                    <td>2.0-3.0</td>
                    <td className="text-[12px] sm:text-[15px]">
                      Йоркширський тер&apos;єр, чихуахуа, мініатюрний пінчер,
                      той-тер&apos;єр, померанський шпіц, мальтезе, мальтіпу
                    </td>
                  </tr>
                  <tr className="text-[12px] sm:text-[15px]">
                    <td>S</td>
                    <td>27-29</td>
                    <td>37-44</td>
                    <td>2.5-3.5</td>
                    <td className="text-[12px] sm:text-[15px]">
                      Йоркширський тер&apos;єр, чихуахуа, мініатюрний пінчер,
                      той-тер&apos;єр, померанський шпіц, мальтезе, мальтіпу
                    </td>
                  </tr>
                  <tr className="text-[12px] sm:text-[15px]">
                    <td>S такса</td>
                    <td>38-40</td>
                    <td>44-54</td>
                    <td>8.0-10.0</td>
                    <td>Такса</td>
                  </tr>
                  <tr className="text-[12px] sm:text-[15px]">
                    <td>S2</td>
                    <td>28-30</td>
                    <td>50-57</td>
                    <td>7.0-9.0</td>
                    <td className="text-[12px] sm:text-[15px]">
                      Мопс, французький бульдог
                    </td>
                  </tr>
                  <tr className="text-[12px] sm:text-[15px]">
                    <td>S2 такса</td>
                    <td>38-40</td>
                    <td>50-62</td>
                    <td>12.0-15.0</td>
                    <td className="text-[12px] sm:text-[15px]">
                      Такса, пекінес, невеликі коргі
                    </td>
                  </tr>
                  <tr className="text-[12px] sm:text-[15px]">
                    <td>SM</td>
                    <td>28-30</td>
                    <td>44-52</td>
                    <td>4.0-6.0</td>
                    <td className="text-[12px] sm:text-[15px]">
                      Пінчер, бішон фризе, джек-рассел-тер&apos;єр
                    </td>
                  </tr>
                  <tr className="text-[12px] sm:text-[15px]">
                    <td>M</td>
                    <td>34-36</td>
                    <td>40-48</td>
                    <td>3.0-6.0</td>
                    <td className="text-[12px] sm:text-[15px]">
                      Мальтезе, ши-тцу, той- пудель, карликовий пудель (собаки
                      середніх порід), бішон фризе, кавалер-кінг-чарльз-спанієль
                    </td>
                  </tr>
                  <tr className="text-[12px] sm:text-[15px]">
                    <td>M такса</td>
                    <td>43-45</td>
                    <td>50-62</td>
                    <td>10.0-13.0</td>
                    <td className="text-[12px] sm:text-[15px]">Такса</td>
                  </tr>
                  <tr className="text-[12px] sm:text-[15px]">
                    <td>M2</td>
                    <td>32-34</td>
                    <td>55-65</td>
                    <td>10.0-14.0</td>
                    <td className="text-[12px] sm:text-[15px]">
                      Мопс, французький бульдог
                    </td>
                  </tr>
                  <tr className="text-[12px] sm:text-[15px]">
                    <td>ML</td>
                    <td>33-35</td>
                    <td>44-55</td>
                    <td>4.0-7.0</td>
                    <td className="text-[12px] sm:text-[15px]">
                      Джек-рассел-тер&apos;єр
                    </td>
                  </tr>
                  <tr className="text-[12px] sm:text-[15px]">
                    <td>L</td>
                    <td>38-40</td>
                    <td>47-56</td>
                    <td>6.0-13.0</td>
                    <td className="text-[12px] sm:text-[15px]">
                      Китайська чубата, ши-тцу, той- пудель, пудель, шнауцер,
                      японський хін, кокер-спанієль
                    </td>
                  </tr>
                  <tr className="text-[12px] sm:text-[15px]">
                    <td>XL</td>
                    <td>41-43</td>
                    <td>55-65</td>
                    <td>10.0-15.0</td>
                    <td className="text-[12px] sm:text-[15px]">
                      Шнауцер, кокер-спаніель, фокстер&apos;єр, скотчтер&apos;єр,
                      цвергшнауцер, англійський спанієль, міні бультер&apos;єр
                    </td>
                  </tr>
                  <tr className="text-[12px] sm:text-[15px]">
                    <td>2XL</td>
                    <td>44-46</td>
                    <td>60-72</td>
                    <td>20.0-25.0</td>
                    <td className="text-[12px] sm:text-[15px]">
                      Самоїд, бультер&apos;єр
                    </td>
                  </tr>
                  <tr className="text-[12px] sm:text-[15px]">
                    <td>3XL</td>
                    <td>47-49</td>
                    <td>68-80</td>
                    <td>25.0-30.0</td>
                    <td className="text-[12px] sm:text-[15px]">
                      Самоїд великий, стаффорд, бультер&apos;єр
                    </td>
                  </tr>
                  <tr className="text-[12px] sm:text-[15px]">
                    <td>4XL</td>
                    <td>49-51</td>
                    <td>72-85</td>
                    <td>30.0-35.0</td>
                    <td className="text-[12px] sm:text-[15px]">
                      Стаффорд, хаскі
                    </td>
                  </tr>
                  <tr className="text-[12px] sm:text-[15px]">
                    <td>5XL</td>
                    <td>55-57</td>
                    <td>78-91</td>
                    <td>35.0-45.0</td>
                    <td className="text-[12px] sm:text-[15px]">
                      Ретрівер, лабрадор, боксер
                    </td>
                  </tr>
                  <tr className="text-[12px] sm:text-[15px]">
                    <td>6XL</td>
                    <td>61-63</td>
                    <td>82-95</td>
                    <td>45.0-50.0</td>
                    <td className="text-[12px] sm:text-[15px]">
                      Вівчарка, ротвейлер, доберман
                    </td>
                  </tr>
                  <tr className="text-[12px] sm:text-[15px]">
                    <td>7XL</td>
                    <td>70-72</td>
                    <td>86-99</td>
                    <td>60.0-66.0</td>
                    <td className="text-[12px] sm:text-[15px]">Кане-корсо</td>
                  </tr>
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
