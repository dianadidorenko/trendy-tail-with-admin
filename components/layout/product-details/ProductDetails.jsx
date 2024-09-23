"use client";

import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import Modal from "react-modal";
import Link from "next/link";
import { motion } from "framer-motion";
import { CartContext } from "@/lib/context/CartContext";
import { fadeIn } from "@/lib/variants";

Modal.setAppElement("body");

const modalStyles = {
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  position: "static",
};

const tableLink = {
  target: "sizes",
  offset: -200,
};

const ProductDetails = ({ item }) => {
  const [modal, setModal] = useState(false);
  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);

  const { addToCart } = useContext(CartContext);

  const [quantity, setQuantity] = useState(1);

  const [selectedSize, setSelectedSize] = useState(
    item.sizes.length > 0 ? item.sizes[0].size : ""
  );
  const [selectedPrice, setSelectedPrice] = useState(
    item.sizes.length > 0 ? item.sizes[0].price : 0
  );

  const [totalPrice, setTotalPrice] = useState(0);

  const handleClick = (size, price) => {
    setSelectedSize(size);
    setSelectedPrice(price);
  };

  useEffect(() => {
    setTotalPrice(Number(selectedPrice * quantity));
  }, [selectedPrice, quantity]);

  return (
    <motion.div
      className="flex flex-col gap-4 px-2 font-poppins"
      variants={fadeIn("up", 0.2)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="flex flex-col">
        <h1 className="text-primary dark:text-white text-[22px]">
          {item.name}
        </h1>

        <h2 className="pt-6">{item.description}</h2>

        {/* Product details */}
        <div className="flex flex-col gap-2 pt-6 max-[360px]:text-[14px]">
          {item.brand && (
            <div className="flex items-center gap-2">
              <p>Бренд:</p>
              <p className="font-bold">{item.brand}</p>
            </div>
          )}
          {item.material && (
            <div className="flex items-center gap-2">
              <p>Матеріал:</p>
              <p className="font-bold">{item.material}</p>
            </div>
          )}
          {item.season && (
            <div className="flex items-center gap-2">
              <p>Сезон:</p>
              <p className="font-bold">{item.season}</p>
            </div>
          )}
          {item.colors && item.colors.length > 0 && (
            <div className="flex items-center gap-2">
              <p>Колір:</p>
              {item.colors.map((color, index) => (
                <div
                  key={index}
                  className={`${color} w-[30px] h-[30px] rounded-lg border border-gray-200 dark:border-white`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Sizes & Price */}
        <div className="flex flex-col pt-6 max-[360px]:text-[14px]">
          <p className="pb-2">Розмір:</p>
          <div className="flex flex-col">
            <div className="flex gap-4 flex-wrap pb-4">
              {item.sizes.length > 0 &&
                item.sizes.map((sizeObj, sizeIndex) => (
                  <button
                    key={sizeIndex}
                    className={`font-bold px-2 p-2 min-w-[42px] max-w-[120px] text-center border-lightBlueColor border-2 rounded-lg cursor-pointer text-[15px] max-[360px]:text-[14px] ${
                      selectedSize === sizeObj.size
                        ? "bg-lightBlueColor text-white"
                        : "bg-white text-primary"
                    }`}
                    onClick={() => {
                      handleClick(sizeObj.size, sizeObj.price);
                    }}
                  >
                    {sizeObj.size}
                  </button>
                ))}
            </div>

            {/* Size chart link */}

            {item.category === "cloth" && (
              <div className="flex items-center gap-2 py-4">
                <ScrollLink
                  offset={tableLink.offset}
                  to={tableLink.target}
                  smooth
                  spy
                  className="underline text-gray-500 cursor-pointer hover:text-accent transition-all dark:text-white/90"
                >
                  Таблиця розмірів
                </ScrollLink>
                <Image
                  src="/catalogue-detail-item/sizes.svg"
                  alt="Розміри"
                  width={50}
                  height={50}
                />
              </div>
            )}
          </div>

          {selectedSize && selectedPrice !== null && (
            <div className="py-4">
              <span className="font-semibold text-[32px] text-redColor">
                <span>{quantity === 1 ? selectedPrice : totalPrice} ₴</span>
              </span>
            </div>
          )}
        </div>

        <button
          className="w-[150px] h-[45px] group relative cursor-pointer overflow-hidden bg-redColor p-2 rounded-full border-2 shadow-lg"
          onClick={() => {
            addToCart(
              item.id,
              item.name,
              selectedPrice,
              item.images[0],
              selectedSize,
              quantity
            );
            openModal();
          }}
        >
          <span className="ease absolute top-1/2 h-0 w-64 origin-center -translate-x-20 rotate-45 bg-[#f04340] transition-all duration-500 group-hover:h-64 group-hover:-translate-y-32"></span>
          <span className="ease relative text-white transition duration-500 group-hover:text-white">
            Купить
          </span>
        </button>

        {/* Modal */}
        {modal && (
          <Modal
            isOpen={modal}
            style={modalStyles}
            onRequestClose={closeModal}
            contentLabel="Catalog Modal"
            className="bg-white dark:bg-accent outline-none p-2 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-xl"
          >
            <div className="min-w-[180px] border border-gray-800/40 px-4 py-2 md:px-6 rounded-[10px] flex flex-col items-center gap-2 md:gap-4 dark:text-white dark:border-white">
              <h2 className="text-center text-[12px] max-w-[170px] md:text-[16px] md:max-w-[230px]">
                ТОВАР УСПІШНО ДОДАНО ДО ВАШОГО КОШИКА
              </h2>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 md:gap-4">
                <div>
                  <Image
                    src={item.images[0]}
                    width={150}
                    height={150}
                    alt={name}
                    className="rounded-xl max-w-[110px] max-h-[110px] md:max-w-[150px] md:max-h-[150px]"
                  />
                </div>
                <div className="flex flex-col gap-1 text-[13px] text-center md:text-[16px]">
                  <h2>{item.name}</h2>
                  <p>Розмір: {selectedSize}</p>
                  <p>Кількість: {quantity} шт.</p>
                  <p>Итого: {selectedPrice} ₴</p>
                </div>
              </div>
              <div className="flex flex-col gap-2 md:gap-4 justify-between">
                <button
                  onClick={closeModal}
                  className="rounded-[10px] p-1 bg-gray-500 hover:bg-gray-400 transition-all text-white text-center text-[12px] xsSm:text-[14px] md:text-[15px] md:px-2 lg:text-[16px]"
                >
                  Продовжити покупки
                </button>
                <Link
                  href={"/cart"}
                  className="rounded-[10px] p-1 bg-green-600 hover:bg-green-500 transition-all text-white text-center text-[12px] xsSm:text-[14px] md:text-[15px] md:px-2 lg:text-[16px]"
                >
                  Перейти до кошика
                </Link>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </motion.div>
  );
};

export default ProductDetails;
