"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import SectionHeaders from "@/components/common/SectionHeaders";
import AboutUs from "@/components/layout/main-page/AboutUs";
import { fadeIn } from "@/lib/variants";
import PagesNav from "@/components/common/PagesNav";

const AboutUsPage = () => {
  return (
    <section className="container mx-auto">
      <PagesNav />

      <motion.div
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: true, amount: 0.2 }}
      >
        <AboutUs />
      </motion.div>

      <SectionHeaders mainHeader={"Наша мета та місія"} />

      <div className="flex flex-col gap-6 lg:gap-12 items-center py-[70px] xs:py-[50px]">
        <Image
          src={"/pages/about/01.jpg"}
          width={600}
          height={400}
          alt="Наша мета та місія"
        />
        <motion.p
          variants={fadeIn("up", 0.4)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true, amount: 0.2 }}
        >
          <em>Мета та місія</em> продажу одягу для собак – надати модні та
          функціональні варіанти одягу для наших пухнастих друзів. У
          зв&apos;язку з зростаючою тенденцією володіння домашніми тваринами та
          бажанням ставитися до наших вихованців як до членів сім&apos;ї, на
          ринку зростає попит на одяг для собак. Наша місія полягає в тому, щоб
          задовольнити цю потребу, пропонуючи широкий асортимент стильного та
          добре продуманого одягу, який не тільки покращує зовнішній вигляд
          собак, але й забезпечує комфорт та захист. зовнішній вигляд собак, але
          й забезпечує комфорт та захист.
        </motion.p>
        <motion.p
          variants={fadeIn("up", 0.6)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true, amount: 0.2 }}
        >
          Продаючи одяг для собак, ми прагнемо покращити загальне враження від
          володіння домашніми тваринами, дозволяючи власникам домашніх тварин
          висловлювати своє кохання та турботу за допомогою модних нарядів для
          своїх собачих компаньйонів. У нашій колекції ми прагнемо поєднувати
          моду та функціональність, гарантуючи, що наш одяг не тільки естетично
          привабливий, а й служить практичній меті. Будь то светри для холодних
          зимових днів або плащі для вологої погоди, наш одяг для собак
          призначений для задоволення різних потреб різних порід та розмірів.
        </motion.p>
        <motion.p
          variants={fadeIn("up", 0.8)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true, amount: 0.2 }}
        >
          Ми вважаємо, що перевдягання наших собак не лише додає елемент
          веселощів, а й допомагає створити міцніший зв&apos;язок між людьми та
          їх пухнастими друзями. Так що приєднуйтесь до нас у цій захоплюючій
          подорожі, щоб вбирати собак і робити їх життя трохи більш стильним і
          комфортним.
        </motion.p>
      </div>

      <SectionHeaders mainHeader={"Наші переваги"} />

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-center justify-center py-[70px] xs:py-[50px]">
        <Image
          src={"/pages/about/02.jpg"}
          width={350}
          height={400}
          alt="Наші переваги"
        />
        <motion.ul
          className="flex flex-col gap-6 list-square"
          variants={fadeIn("up", 0.9)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true, amount: 0.2 }}
        >
          <li data-lang="about-us_page-7">
            Широкий вибір елегантних дизайнів.
          </li>
          <li data-lang="about-us_page-8">
            Виняткове обслуговування клієнтів для вирішення будь-яких питань.
          </li>
          <li data-lang="about-us_page-9">
            Високоякісні матеріали, що забезпечують довговічність.
          </li>
          <li data-lang="about-us_page-10">
            Ідеальні розміри для всіх порід собак.
          </li>
          <li data-lang="about-us_page-11">
            Доступні ціни на будь-який бюджет.
          </li>
          <li data-lang="about-us_page-12">
            Простий процес онлайн-замовлення.
          </li>
          <li data-lang="about-us_page-13">
            Оперативні та надійні служби доставки.
          </li>
          <li data-lang="about-us_page-14">
            Співпраця з відомими впливовими особами в галузі моди на своїх
            улюбленців.
          </li>
          <li data-lang="about-us_page-15">
            Регулярно оновлювані колекції відповідно до останніх тенденцій.
          </li>
        </motion.ul>
      </div>
    </section>
  );
};

export default AboutUsPage;
