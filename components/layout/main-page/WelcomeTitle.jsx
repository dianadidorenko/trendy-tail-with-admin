"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import CustomButton from "@/components/elements/Button";
import { fadeIn } from "@/lib/variants";

export default function WelcomeTitle() {
  return (
    <section>
      <div className="container mx-auto">
        <div className="flex items-center justify-center text-center py-[70px] xs:py-[50px] xs:flex-col md:flex-row xs:gap-8 md:gap-2">
          <motion.div
            className="flex"
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.2 }}
          >
            <Image
              src={"/pages/main/01.png"}
              width={400}
              height={424}
              alt="Картинка"
              className="xs:max-w-[180px] lg:max-w-[240px]"
            />
          </motion.div>
          <div className="welcome-title xs:max-w-[350px] lg:max-w-none xl:max-w-[530px]">
            <motion.h1
              className="text-lightBlueColor font-orelegaOne pb-3 text-[20px] md:text-[23px] lg:text-[26px] xl:text-[30px]"
              variants={fadeIn("up", 0.4)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: true, amount: 0.2 }}
            >
              Якісні зоотовари від виробника для ваших улюбленців
            </motion.h1>
            <motion.h2
              className="max-w-[380px] xl:max-w-[480px] mx-auto pb-[30px] xs:pb-[20px] text-[14px] lg:text-[18px] xl:text-[22px] text-primary dark:text-white"
              variants={fadeIn("up", 0.8)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: true, amount: 0.2 }}
            >
              Онлайн магазин з продажу товарів для домашніх тварин з доставкою
              по всій Україні
            </motion.h2>
            <motion.div
              variants={fadeIn("up", 1)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: true, amount: 0.2 }}
            >
              <Link
                href={"/catalog"}
                variants={fadeIn("up", 0.8)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: true, amount: 0.2 }}
              >
                <CustomButton
                  text="Каталог"
                  containerStyles="w-[150px] h-[45px] xl:text-xl xl:h-[50px]"
                />
              </Link>
            </motion.div>
          </div>
          <motion.div
            className="flex"
            variants={fadeIn("left", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.2 }}
          >
            <Image
              src={"/pages/main/02.png"}
              width={388}
              height={424}
              alt="Картинка"
              className="xs:max-w-[180px] lg:max-w-[240px]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
