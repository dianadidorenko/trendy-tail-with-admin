import Loader from "@/components/elements/Loader";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function UserForm({ email }) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch(`/api/profile/`, {
        method: "GET",
        headers: {
          userEmail: email,
        },
      });
      const data = await response.json();

      if (data.success) {
        const { name, surname, phone, city, country } = data.user;
        setName(name);
        setSurname(surname);
        setPhone(phone);
        setCity(city);
        setCountry(country);
      } else {
        toast.error("Не удалось загрузить данные пользователя");
      }
      setLoading(false);
    };

    if (email) {
      fetchUserData();
    }
  }, [email]);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setIsLoading(true);

    const response = await fetch(`/api/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, name, surname, phone, city, country }),
    });

    const data = await response.json();

    setIsLoading(false);

    if (data.success) {
      setName(data.user.name);
      setSurname(data.user.surname);
      setPhone(data.user.phone);
      setCity(data.user.city);
      setCountry(data.user.country);

      toast.success("Дані оновлені");
      router.refresh();
    } else {
      toast.error("Дані не оновлені");
      console.log(`Ошибка: ${data.message}`);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 mb-8">
      {loading ? (
        <Loader />
      ) : (
        <form
          className="flex flex-col gap-2 sm:gap-6 profile-form"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="Ім'я"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
              className="w-[200px] dark:bg-white dark:text-black/80"
            />
            <input
              type="text"
              placeholder="Прізвище"
              value={surname}
              onChange={(ev) => setSurname(ev.target.value)}
              className="w-[200px] dark:bg-white dark:text-black/80"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              disabled={true}
              value={email}
              placeholder={"Імейл"}
              className={`${
                email
                  ? "pointer-events-none bg-gray-300 text-gray-400 dark:bg-gray-300 dark:text-gray-500"
                  : "bg-white dark:text-black/80"
              } w-[200px] dark:bg-white dark:text-black/80`}
            />

            <input
              type="tel"
              placeholder="Телефон"
              value={phone}
              onChange={(ev) => setPhone(ev.target.value)}
              className="w-[200px] dark:bg-white dark:text-black/80"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="Місто"
              value={city}
              onChange={(ev) => setCity(ev.target.value)}
              className="w-[200px] dark:bg-white dark:text-black/80"
            />

            <input
              type="text"
              placeholder="Країна"
              value={country}
              onChange={(ev) => setCountry(ev.target.value)}
              className="w-[200px] dark:bg-white dark:text-black/80"
            />
          </div>

          <button
            type="submit"
            className="button px-4 py-2 rounded-lg text-sm border-2 border-gray-300"
            disabled={isLoading}
          >
            {isLoading ? "Завантаження..." : "Зберегти"}
          </button>
        </form>
      )}
    </div>
  );
}
