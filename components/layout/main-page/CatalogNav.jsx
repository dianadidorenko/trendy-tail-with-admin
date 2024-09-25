"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import SectionHeaders from "@/components/common/SectionHeaders";
import { fadeIn } from "@/lib/variants";

const CatalogNav = ({ items }) => {
  const uniqueCategories = items.filter(
    (item, index, self) =>
      index === self.findIndex((t) => t.categoryShow === item.categoryShow)
  );

  return (
    <section>
      <SectionHeaders mainHeader={"Каталог"} />

      <motion.div
        className="container mx-auto py-[70px] xs:py-[50px]"
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {uniqueCategories.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-center hover:animate-swipe transition-all duration-300"
            >
              <Link
                href={`/${item.category}?category=${item.categoryShow}`}
                className="relative"
              >
                <Image
                  src={`${item.images[0]}`}
                  width={300}
                  height={260}
                  alt={item.categoryShow}
                  className="object-cover rounded-xl shadow-md dark:shadow-slate-100"
                />
                <p className="absolute shadow-md text-[14px] text-white bg-primary/60 dark:shadow-slate-300 uppercase left-4 top-4 z-10 px-2 py-1 border border-white rounded-md">
                  {item.categoryShow}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default CatalogNav;
