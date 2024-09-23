"use client";

import "@/styles/contacts.css";
import React, { useState } from "react";
import SectionHeaders from "@/components/common/SectionHeaders";
import PagesNav from "@/components/common/PagesNav";
import { SendIcon } from "lucide-react";

const ContactsPage = () => {
  const [formData, setFormData] = useState({
    clientName: "",
    telephone: "",
    email: "",
    country: "",
    city: "",
    sum: "",
    text: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Валидация формы
    if (checkContactsForm()) {
      // Логика отправки данных на сервер
      console.log("Form submitted:", formData);
    }
  };

  const checkContactsForm = () => {
    // Пример простой валидации
    if (!formData.clientName || !formData.telephone || !formData.email) {
      alert("Заполните все обязательные поля");
      return false;
    }
    return true;
  };

  return (
    <section>
      <div className="container mx-auto">
        <PagesNav />

        <div className="">
          <SectionHeaders mainHeader={"Контакти"} />
          <div className="max-w-4xl mx-auto py-12">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              {/* Телефон */}
              <div className="p-6 bg-[#84c5cf] dark:bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <img
                  src="/pages/contacts/01.svg"
                  alt="Phone Icon"
                  className="mx-auto mb-4 w-16 h-16"
                />
                <p className="text-lg font-semibold text-gray-100 dark:text-gray-600">
                  Для швидкого зв&apos;язку з нами
                </p>
                <a
                  href="tel:+380974379424"
                  className=" mt-2 block text-xl font-bold text-gray-100 dark:text-gray-600 hover:text-primary/80"
                >
                  +380974379424
                </a>
              </div>

              {/* График работы */}
              <div className="p-6 bg-[#84c5cf] dark:bg-white rounded-lg text-gray-100 dark:text-gray-600 shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center justify-center">
                <p className="text-lg font-semibold">Графік роботи</p>
                <p className="mt-2">Понеділок - Неділя</p>
                <p className="">09:00 - 19:00</p>
              </div>

              {/* Электронная почта */}
              <div className="p-6 bg-[#84c5cf] dark:bg-white text-gray-100 dark:text-gray-600 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
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
            className="form-control border border-slate-200 p-6 bg-[#84c5cf] dark:bg-[#ececec] text-gray-100 dark:text-gray-600"
          >
            <div className="form-left-part">
              <div className="input-group">
                <label>Ім&apos;я</label>
                <input
                  type="text"
                  name="clientName"
                  id="clientName"
                  required
                  value={formData.clientName}
                  onChange={handleInputChange}
                  className="dark:border-b-slate-500 dark:text-gray-600"
                />
              </div>

              <div className="input-group">
                <label>Телефон:</label>
                <input
                  type="phone"
                  id="telephone"
                  name="telephone"
                  placeholder="+38 (097) 999 99 99"
                  required
                  value={formData.telephone}
                  onChange={handleInputChange}
                  className="dark:border-b-slate-500 dark:text-gray-600"
                />
              </div>

              <div className="input-group">
                <label>Імейл</label>
                <input
                  type="email"
                  id="email"
                  placeholder="mail@ukr.net"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="dark:border-b-slate-500 dark:text-gray-600"
                />
              </div>

              <div className="input-group">
                <label>Країна</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  required
                  value={formData.country}
                  onChange={handleInputChange}
                  className="dark:border-b-slate-500 dark:text-gray-600"
                />
              </div>

              <div className="input-group">
                <label>Місто</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleInputChange}
                  className="dark:border-b-slate-500 dark:text-gray-600"
                />
              </div>

              <div className="input-group">
                <label>Перевірка</label>
                <input
                  type="text"
                  id="sum"
                  name="sum"
                  required
                  value={formData.sum}
                  onChange={handleInputChange}
                  className="dark:border-b-slate-500 dark:text-gray-600"
                />
              </div>
            </div>

            <div className="form-right-part">
              <div className="input-group textarea-block">
                <label>Введіть текст..</label>
                <textarea
                  type="text"
                  id="text"
                  name="text"
                  required
                  value={formData.text}
                  onChange={handleInputChange}
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
