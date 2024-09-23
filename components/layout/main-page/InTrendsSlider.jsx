"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variants";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";

import Link from "next/link";
import Button from "@/components/elements/Button";
import SectionHeaders from "@/components/common/SectionHeaders";
import Loader from "@/components/elements/Loader";

const InTrendsSlider = ({ items }) => {
  if (!items) return <Loader />;

  return (
    <section>
      <SectionHeaders mainHeader={"В тренді"} />

      <motion.div
        className="container mx-auto relative py-[70px] xs:py-[50px]"
        variants={fadeIn("up", 0.4)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: true, amount: 0.2 }}
      >
        <Swiper
          className="h-[450px] max-w-[1100px] mx-auto"
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          spaceBetween={20}
          modules={[Autoplay, Pagination]}
          pagination={{ clickable: true }}
        >
          {items.slice(0, 6).map((item) => (
            <SwiperSlide className="px-2" key={item._id}>
              <div className="max-w-[200px] max-h-[354px] text-center mx-auto flex flex-col items-center justify-center gap-2 border border-gray-300 shadow-md dark:border-white px-1 py-6 rounded-[20px] hover:shadow-xl hover:dark:shadow-slate-600 hover:cursor-pointer transition-all duration-300">
                <Image
                  src={item.images[0]}
                  width={180}
                  height={180}
                  alt={item.name}
                  className="rounded-[20px] object-cover md:max-w-[150px] xl:max-w-none"
                />
                <h2 className="text-[16px] font-bold">{item.name}</h2>
                <div className="flex gap-2">
                  {item.sizes.map((size) => (
                    <em key={size.size} className="text-[14px]">
                      {size.size}
                    </em>
                  ))}
                </div>
                <p className="flex gap-2 items-baseline">
                  від
                  <span className="text-2xl text-redColor">
                    {item.sizes[0]?.price}{" "}
                    {/* Берём первую цену из массива sizes */}
                  </span>
                  ₴
                </p>

                <Link href={`/products/${item.urlName}`}>
                  <Button
                    text={"Перейти"}
                    containerStyles={"w-[120px] h-[45px]"}
                  />
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </section>
  );
};

export default InTrendsSlider;
