"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UserForm({ user }) {
  const router = useRouter();

  const [name, setName] = useState(user?.firstName || "");
  const [surname, setSurname] = useState(user?.lastName || "");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const email = user?.emailAddresses[0].emailAddress;

  return (
    <div className="flex flex-col items-center gap-4 mb-8">
      <Image
        src={user?.imageUrl}
        width={120}
        height={100}
        alt="Аватар"
        className="rounded-lg"
      />

      <form
        className="flex flex-col gap-2 profile-form"
        // onSubmit={(ev) =>
        //   onSave(ev, {
        //     name: userName,
        //     image,
        //     phone,
        //     admin,
        //     city,
        //     country,
        //   })
        // }
      >
        <input
          type="text"
          placeholder="Ім'я"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
        />
        <input
          type="text"
          placeholder="Прізвище"
          value={surname}
          onChange={(ev) => setSurname(ev.target.value)}
          className="w-[200px]"
        />

        <input
          type="email"
          disabled={true}
          value={email}
          placeholder={"Імейл"}
        />
        <div className="flex flex-col gap-2">
          <div className="mb-2">
            <input
              type="tel"
              placeholder="Телефон"
              value={phone}
              onChange={(ev) => setPhone(ev.target.value)}
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Місто"
              value={city}
              onChange={(ev) => setCity(ev.target.value)}
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Країна"
              value={country}
              onChange={(ev) => setCountry(ev.target.value)}
            />
          </div>
        </div>
        {/* {loggedInUserData.admin && (
          <div>
            <label
              className="p-2 inline-flex items-center gap-4 mb-2"
              htmlFor="adminCb"
            >
              <input
                id="adminCb"
                type="checkbox"
                className=""
                value={"1"}
                checked={admin}
                onChange={(ev) => setAdmin(ev.target.checked)}
              />
              <span>Адмін</span>
            </label>
          </div>
        )} */}
        <button
          type="submit"
          className="button px-4 py-2 rounded-lg text-sm border border-gray-400/40"
        >
          Зберегти
        </button>
      </form>
    </div>
  );
}
