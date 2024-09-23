"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay } from "swiper/modules";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variants";

import "swiper/css";
import "swiper/css/autoplay";

import SwiperNavButtons from "@/components/elements/SwiperNavButtons";

const mainSliderData = [
  {
    imgPath: "/pages/main/main-slider/01.jpg",
  },
  {
    imgPath: "/pages/main/main-slider/02.jpg",
  },
  {
    imgPath: "/pages/main/main-slider/03.jpg",
  },
  {
    imgPath: "/pages/main/main-slider/01.jpg",
  },
  {
    imgPath: "/pages/main/main-slider/02.jpg",
  },
  {
    imgPath: "/pages/main/main-slider/03.jpg",
  },
];

const MainSlider = () => {
  return (
    <section>
      <motion.div
        className="container mx-auto xl:max-w-[1000px] py-[70px] xs:py-[50px]"
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: true, amount: 0.2 }}
      >
        <Swiper
          className=""
          slidesPerView={1}
          breakpoints={{}}
          spaceBetween={30}
          //   autoplay={true}
          modules={[Autoplay]}
        >
          {mainSliderData.map((picture, index) => (
            <SwiperSlide key={index}>
              <Image
                src={picture.imgPath}
                width={1000}
                height={700}
                alt="pic"
                className="rounded-[20px]"
              />
            </SwiperSlide>
          ))}
          {/* swiper navigation */}
          <SwiperNavButtons
            containerStylesLeft="absolute xs:bottom-[50%] left-5 h-[30px] z-10 flex gap-1"
            containerStylesRight="absolute xs:bottom-[50%] right-5 h-[30px] z-10 flex justify-center gap-1"
            btnStyles="border border-white text-white w-[30px] h-[30px] lg:w-[36px] lg:h-[36px] flex justify-center items-center hover:bg-primary/60 transition-all duration-300 rounded-[8px]"
            iconStyles="text-md lg:text-lg"
          />
        </Swiper>
      </motion.div>
    </section>
  );
};

export default MainSlider;
