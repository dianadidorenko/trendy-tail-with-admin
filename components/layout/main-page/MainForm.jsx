import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const MainForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const regexName = /^[a-zA-Zа-яА-я\s]+$/;
    const regexEmail = /\w+@\w+\.\w+/;

    let valid = true;

    if (!regexName.test(name)) {
      toast.error("Введіть тільки літери для імені");
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
      } catch (error) {
        console.error("Помилка відправки повідомлення:", error);
        toast.error("Не вдалося відправити повідомлення.");
      }
    }
  };

  return (
    <form className="flex flex-col gap-y-2" onSubmit={handleSubmit}>
      <input type="hidden" name="formType" value="form1" />

      <label className="xs:text-sm">Ім'я</label>
      <input
        type="text"
        placeholder="Trendy"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="bg-white border border-gray-300 p-2 rounded-md text-primary"
        required
      />

      <label className="xs:text-sm">E-mail</label>
      <input
        type="email"
        placeholder="trendy@ukr.net"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-white border border-gray-300 p-2 rounded-md text-primary"
        required
      />

      <label className="xs:text-sm">Текст повідомлення</label>
      <textarea
        placeholder="Ваш текст"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="bg-white border border-gray-300 p-2 rounded-md text-primary"
        required
      />

      <button
        type="submit"
        className="rounded-md bg-darkBlueColor dark:bg-lightBlueColor text-white py-1 px-4 xs:text-[10px] sm:text-xs lg:text-sm mt-1"
      >
        Надіслати
      </button>
    </form>
  );
};

export default MainForm;
