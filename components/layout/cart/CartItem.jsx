"use client";

import React, { useContext, useEffect, useState } from "react";
import { MinusCircle, PlusCircle } from "lucide-react";
import { HiTrash } from "react-icons/hi";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

import SectionHeaders from "@/components/common/SectionHeaders";
import Loader from "@/components/elements/Loader";
import { CartContext } from "@/lib/context/CartContext";
import { fadeIn } from "@/lib/variants";

const CartItem = () => {
  const router = useRouter();

  const {
    itemAmount,
    cart,
    cartTotal,
    removeItem,
    increaseAmount,
    decreaseAmount,
    clearCart,
  } = useContext(CartContext);

  const [loading, setLoading] = useState(false);
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedWarehouse, setSelectedWarehouse] = useState("");

  const apiKey = "6c4bdf6606f029fdcda5699c4fde13d9";
  const apiUrl = "https://api.novaposhta.ua/v2.0/json/";

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const regexName = /^[a-zA-Zа-яА-я\s]+$/;
    const regexEmail = /\w+@\w+\.\w+/;
    const phoneRegex = /^\+380\d{9}$/;

    let valid = true;

    if (!regexName.test(name)) {
      toast.error("Введіть тільки літери в ім'я");
      valid = false;
    }

    if (!regexName.test(surname)) {
      toast.error("Введіть тільки літери в прізвище");
      valid = false;
    }

    if (!phoneRegex.test(phone)) {
      toast.error("Невірний формат телефонного номера");
      valid = false;
    }

    if (!regexEmail.test(email)) {
      toast.error("Невірний формат email");
      valid = false;
    }

    if (valid) {
      try {
        const clientInfo = `Клієнт - ${name}, ${surname}, ${email}, ${chosenRegion}, ${chosenCity}, ${chosenWarehouse}`;

        const cartInfo = cart.map(
          (item) =>
            `Товар - [${item.name}, кількість - ${item.amount} шт., розмір - ${item.size}, ${item.price} ₴]`
        );

        const total = `Загальна сума замовлення - ${cartTotal} ₴`;

        const data = {
          formType: "form2",
          clientInfo,
          cartInfo,
          total,
        };

        await axios.post("/api/sendMessage", data);
        toast.success("Повідомлення надіслано!");

        const encodedData = encodeURIComponent(JSON.stringify(data));
        router.push(`/thank-you?order=${encodedData}`);
        clearCart();
      } catch (error) {
        console.error("Помилка відправки повідомлення:", error);
        toast.error("Не вдалося відправити повідомлення.");
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    const fetchRegions = async () => {
      try {
        const response = await axios.post(apiUrl, {
          apiKey: apiKey,
          modelName: "Address",
          calledMethod: "getAreas",
        });
        setRegions(response.data.data);
      } catch (error) {
        console.error("Error fetching regions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegions();
  }, []);

  const handleRegionChange = async (region) => {
    setSelectedRegion(region.Ref);
    try {
      const response = await axios.post(apiUrl, {
        apiKey: apiKey,
        modelName: "Address",
        calledMethod: "getCities",
        methodProperties: {
          AreaRef: region.Ref,
        },
      });
      setCities(response.data.data);
      setSelectedCity("");
      setWarehouses([]);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const handleCityChange = async (city) => {
    setSelectedCity(city.Ref);
    try {
      const response = await axios.post(apiUrl, {
        apiKey: apiKey,
        modelName: "AddressGeneral",
        calledMethod: "getWarehouses",
        methodProperties: {
          CityRef: city.Ref,
        },
      });
      setWarehouses(response.data.data);
      setSelectedWarehouse("");
    } catch (error) {
      console.error("Error fetching warehouses:", error);
    }
  };

  const handleWarehouseChange = (e) => {
    const selectedWarehouseRef = e.target.value;
    const warehouse = warehouses.find(
      (warehouse) => warehouse.Ref === selectedWarehouseRef
    );
    if (!warehouse) {
      toast.error("Выбранный склад не найден");
      return;
    }
    setSelectedWarehouse(warehouse.Ref);
  };

  const chosenRegion = regions.find(
    (region) => region.Ref === selectedRegion
  )?.Description;

  const chosenCity = cities.find(
    (city) => city.Ref === selectedCity
  )?.Description;

  const chosenWarehouse = warehouses.find(
    (warehouse) => warehouse.Ref === selectedWarehouse
  )?.Description;

  if (loading) {
    return <Loader />;
  }

  return itemAmount === 0 ? (
    <div className="empty-order h-[50vh]">
      <h2 className="border-double border-lightBlueColor dark:border-darkBlueColor border-[7px]">
        Ваш кошик порожній 🙁
      </h2>
    </div>
  ) : (
    <div className="cart-page pb-20">
      <div>
        <SectionHeaders mainHeader={"Замовлення"} />
        <div className="flex flex-col items-center justify-center mb-8">
          <motion.div
            className="flex items-center justify-center gap-2 text-center"
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.2 }}
          >
            <Image
              src={"/cart/paw-icon.svg"}
              width={30}
              height={30}
              alt="Лапа"
              className="xs:hidden sm:flex"
            />
            <h1 className="text-[30px] text-lightBlueColor">
              Оформлення замовлення
            </h1>
            <Image
              src={"/cart/paw-icon.svg"}
              width={30}
              height={30}
              alt="Лапа"
              className="xs:hidden sm:flex"
            />
          </motion.div>
          <motion.p
            className="text-[15px] max-w-[220px] sm:max-w-none text-center"
            variants={fadeIn("up", 0.8)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.2 }}
          >
            Заповніть наступні поля для оформлення вашого замовлення
          </motion.p>
        </div>
      </div>

      <div className="flex flex-col-reverse items-center sm:items-start sm:flex-row gap-10 lg:gap-20 px-5 lg:px-20 justify-center">
        <motion.div
          className="flex flex-col max-w-[350px]"
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true, amount: 0.4 }}
        >
          <h2 className="uppercase border-b-gray-400 border-b-2 pb-1 text-primary dark:text-white/80">
            Ваші дані
          </h2>
          <form className="cart-form my-4" onSubmit={handleSubmit}>
            <div className="info-user-block">
              <input type="hidden" name="formType" value="form2" />
              <input
                type="text"
                placeholder="Ім'я"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white border border-gray-300 p-2 rounded-md placeholder:text-primary text-primary placeholder:text-[14px]"
                required
              />
              <input
                type="text"
                placeholder="Прізвище"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                className="bg-white border border-gray-300 p-2 rounded-md placeholder:text-primary text-primary placeholder:dark:text-primary placeholder:text-[14px]"
                required
              />
              <input
                type="text"
                placeholder="+38 (0__) ___-__-__"
                value={phone}
                name="phone"
                onChange={(e) => setPhone(e.target.value)}
                className="bg-white border border-gray-300 p-2 rounded-md placeholder:text-primary text-primary placeholder:text-[14px]"
                required
              />
              <input
                type="email"
                placeholder="trendy@ukr.net"
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white border border-gray-300 p-2 rounded-md placeholder:text-primary text-primary placeholder:text-[14px]"
                required
              />
            </div>

            <div>
              <div className="nova-poshta">
                <h2 className="uppercase border-b-gray-400  border-b-2 pb-1 text-primary dark:text-white/80">
                  Доставка
                </h2>

                <p className="text-primary flex gap-2 items-center dark:text-white/80">
                  Нова Пошта
                  <span className="text-gray-400 text-[12px]">
                    Доставка по Україні 1-3 дні
                  </span>
                </p>

                <select
                  onChange={(e) =>
                    handleRegionChange(JSON.parse(e.target.value))
                  }
                  className="text-[14px] text-primary bg-white border border-gray-300 p-2 rounded-md"
                >
                  <option value="">Оберіть область</option>
                  {regions.map((region) => (
                    <option key={region.Ref} value={JSON.stringify(region)}>
                      {region.Description}
                    </option>
                  ))}
                </select>

                <select
                  onChange={(e) => handleCityChange(JSON.parse(e.target.value))}
                  value={selectedCity || ""}
                  disabled={!selectedRegion}
                  className="text-[14px] text-primary bg-white border border-gray-300 p-2 rounded-md"
                >
                  <option value="">Оберіть місто</option>
                  {cities.map((city) => (
                    <option key={city.Ref} value={JSON.stringify(city)}>
                      {city.Description}
                    </option>
                  ))}
                </select>

                <select
                  onChange={handleWarehouseChange}
                  value={selectedWarehouse || ""}
                  disabled={!selectedCity}
                  className="text-[14px] text-primary bg-white border border-gray-300 p-2 rounded-md"
                >
                  <option value="" disabled>
                    Оберіть склад
                  </option>
                  {warehouses.map((warehouse) => (
                    <option key={warehouse.Ref} value={warehouse.Ref}>
                      {warehouse.Description}
                    </option>
                  ))}
                </select>
              </div>

              <h2 className="uppercase border-b-gray-400 border-b-2 pb-1 text-primary dark:text-white/80">
                Оплата
              </h2>

              <div className="pay-block text-primary flex gap-2">
                <input type="checkbox" defaultChecked />
                <label className="text-[14px] dark:text-white/80">
                  Післяплата
                </label>
                <p className="text-gray-400 text-[12px] dark:text-white/80">
                  Оплата при отримуванні
                </p>
              </div>

              <div className="pay-block text-primary flex gap-2">
                <input type="checkbox" />
                <label className="text-[14px] dark:text-white/80">
                  Я згоден з умовами угоди користувача.
                </label>
              </div>

              <button
                type="submit"
                className="mt-4 order-button flex items-center justify-center gap-2 text-[15px] max-w-[300px]"
              >
                Сплатити
                <span>{cartTotal} ₴</span>
              </button>
            </div>
          </form>
        </motion.div>

        <motion.div
          className="flex flex-col gap-6 text-md"
          variants={fadeIn("up", 0.3)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true, amount: 0.6 }}
        >
          <h2 className="uppercase border-b-gray-400 border-b-2 pb-1 text-primary dark:text-white/80">
            Ваше Замовлення
          </h2>
          {cart.map((cartItem, index) => (
            <div
              className="flex gap-3 border-2 px-12 py-4 md:px-6 md:py-6 border-gray-200 order-block relative shadow-xl dark:shadow-white/30"
              key={index}
            >
              <HiTrash
                size={18}
                onClick={() =>
                  removeItem(cartItem.id, cartItem.price, cartItem.size)
                }
                className="absolute right-1 top-1 text-[#ffa95c] hover:text-orange-500 transition cursor-pointer"
              />
              <Image
                src={cartItem.image}
                width={150}
                height={150}
                alt="Товар"
                className="w-[100px] md:w-[150px] rounded-[10px]"
              />

              <div>
                <div>
                  <div className="text-[15px] flex flex-col gap-2">
                    <p className="font-bold">{cartItem.name}</p>
                    <p className="italic">
                      Розмір: <span>{cartItem.size}</span>
                    </p>

                    <div className="flex flex-col items-center gap-2">
                      <p>Кількість: </p>
                      <div className="flex gap-2">
                        <MinusCircle
                          size={18}
                          className="hover:text-orange-400 transition cursor-pointer"
                          onClick={() =>
                            decreaseAmount(cartItem.id, cartItem.price)
                          }
                        />
                        <p>{cartItem.amount}</p>
                        <PlusCircle
                          size={18}
                          className="hover:text-orange-400 transition cursor-pointer"
                          onClick={() =>
                            increaseAmount(cartItem.id, cartItem.price)
                          }
                        />
                      </div>
                    </div>

                    <p className="font-semibold">
                      Ціна:{" "}
                      <span className="text-[15px]">{cartItem.price} </span>
                      <span className="text-[13px]">₴</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="mt-4 text-center flex justify-center items-baseline gap-1 border rounded-md p-2 border-gray-200 dark:border-white">
            {`${itemAmount} ${
              itemAmount > 1
                ? itemAmount === 2 || itemAmount === 3
                  ? "товара "
                  : "товарів "
                : "товар "
            }`}
            загальною сумою: {cartTotal}
            <span className="text-[16px]">₴</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CartItem;
