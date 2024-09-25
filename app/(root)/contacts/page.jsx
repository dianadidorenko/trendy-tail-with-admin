"use client";

import "@/styles/contacts.css";

import React, { useState, useEffect } from "react";
import { SendIcon } from "lucide-react";

import SectionHeaders from "@/components/common/SectionHeaders";
import PagesNav from "@/components/common/PagesNav";
import toast from "react-hot-toast";
import axios from "axios";

const ContactsPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [sum, setSum] = useState("");
  const [message, setMessage] = useState("");

  const [randomNumber1, setRandomNumber1] = useState(0);
  const [randomNumber2, setRandomNumber2] = useState(0);

  // Генерация случайных чисел при загрузке страницы
  useEffect(() => {
    generateRandomNumbers();
  }, []);

  const generateRandomNumbers = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    setRandomNumber1(num1);
    setRandomNumber2(num2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const regexName = /^[a-zA-Zа-яА-я\s]+$/;
    const regexEmail = /\w+@\w+\.\w+/;

    let valid = true;

    if (
      !regexName.test(name) ||
      !regexName.test(country) ||
      !regexName.test(city)
    ) {
      toast.error("Введіть лише літери");
      valid = false;
    }

    if (!regexEmail.test(email)) {
      toast.error("Формат мейла - trendy@ukr.net");
      valid = false;
    }

    if (message.length <= 10) {
      toast.error("Повідомлення повинно містити мінімум 10 літер");
      valid = false;
    }

    if (parseInt(sum) !== randomNumber1 + randomNumber2) {
      toast.error("Неправильна сума");
      valid = false;
      generateRandomNumbers();
    }

    if (valid) {
      try {
        const data = {
          formType: "form1",
          name,
          email,
          message,
        };
        await axios.post("/api/sendMessage", data);
        toast.success("Повідомлення надіслано!");
        setName("");
        setEmail("");
        setMessage("");
        setSum("");
        generateRandomNumbers();
      } catch (error) {
        console.error("Помилка відправки повідомлення:", error);
        toast.error("Не вдалося відправити повідомлення.");
      }
    }
  };

  return (
    <section className="pb-20">
      <div className="container mx-auto">
        <PagesNav />

        <div className="">
          <SectionHeaders mainHeader={"Контакти"} />
          <div className="max-w-4xl mx-auto py-12">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              {/* Телефон */}
              <div className="p-6 bg-[#7d3044] dark:bg-[#adadad] rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <img
                  src="/pages/contacts/01.svg"
                  alt="Phone Icon"
                  className="mx-auto mb-4 w-16 h-16"
                />
                <p className="text-lg font-semibold text-gray-100 dark:text-black/60">
                  Для швидкого зв&apos;язку з нами
                </p>
                <a
                  href="tel:+380974379424"
                  className=" mt-2 block text-xl font-bold text-gray-100 dark:text-black/60 hover:text-primary/80"
                >
                  +380974379424
                </a>
              </div>

              {/* График работы */}
              <div className="p-6 bg-[#7d3044] dark:bg-[#adadad] rounded-lg text-gray-100 dark:text-black/60 shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center justify-center">
                <p className="text-lg font-semibold">Графік роботи</p>
                <p className="mt-2">Понеділок - Неділя</p>
                <p className="">09:00 - 19:00</p>
              </div>

              {/* Электронная почта */}
              <div className="p-6 bg-[#7d3044] dark:bg-[#adadad] text-gray-100 dark:text-black/60 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <img
                  src="/pages/contacts/02.svg"
                  alt="Mail Icon"
                  className="mx-auto mb-4 w-16 h-16"
                />
                <p className=" text-lg font-semibold">Написати на пошту</p>
                <a
                  href="mailto:trendytail@ukr.net"
                  className="mt-2 block text-xl font-bold hover:text-primary/80"
                >
                  trendytail@ukr.net
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="page__contacts-form contacts-form">
        <div className="contacts-form__container">
          <SectionHeaders mainHeader={"Заповнити форму"} />
          <form
            onSubmit={handleSubmit}
            className="form-control border border-slate-200 p-6 bg-[#7d3044] dark:bg-[#adadad] text-gray-100 dark:text-gray-600"
          >
            <input type="hidden" name="formType" value="form2" />
            <div className="form-left-part">
              <div className="input-group">
                <label>Ім&apos;я</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="dark:border-b-slate-500 dark:text-gray-600"
                />
              </div>

              <div className="input-group">
                <label>Телефон:</label>
                <input
                  type="phone"
                  placeholder="+38 (097) 999 99 99"
                  required
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  className="dark:border-b-slate-500 dark:text-gray-600 placeholder:text-white/50 dark:placeholder:text-black/50"
                />
              </div>

              <div className="input-group">
                <label>Імейл</label>
                <input
                  type="email"
                  id="email"
                  placeholder="mail@ukr.net"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="dark:border-b-slate-500 dark:text-gray-600 placeholder:text-white/50 dark:placeholder:text-black/50"
                />
              </div>

              <div className="input-group">
                <label>Країна</label>
                <input
                  type="text"
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="dark:border-b-slate-500 dark:text-gray-600"
                />
              </div>

              <div className="input-group">
                <label>Місто</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="dark:border-b-slate-500 dark:text-gray-600"
                />
              </div>

              <div className="input-group">
                <label>
                  Введіть суму: {randomNumber1} + {randomNumber2}
                </label>
                <input
                  type="text"
                  required
                  value={sum}
                  onChange={(e) => setSum(e.target.value)}
                  className="dark:border-b-slate-500 dark:text-gray-600"
                />
              </div>
            </div>

            <div className="form-right-part">
              <div className="input-group textarea-block">
                <label>Введіть текст..</label>
                <textarea
                  type="text"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="dark:border-slate-500 mt-2 dark:text-gray-600"
                />
              </div>

              <button
                className="flex items-center justify-center gap-4 font-bold border-2 rounded-lg p-2 border-white dark:border-slate-500"
                type="submit"
              >
                Надіслати <SendIcon />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactsPage;
