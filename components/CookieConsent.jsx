import { useState } from "react";

const CookieConsent = () => {
  const [consent, setConsent] = useState(false);

  const handleConsent = () => {
    setConsent(true);
    document.cookie = "cookieConsent=true; path=/";
  };
  const forbidConsent = () => {
    setConsent(false);
    document.cookie = "cookieConsent=false; path=/";
  };

  if (consent || document.cookie.includes("cookieConsent=true")) {
    return null;
  }

  return (
    <div
      style={styles.container}
      className="bg-white dark:bg-slate-400 dark:text-white dark:border-white"
    >
      <p className="pb-2">
        Цей сайт використовує кукі для покращення вашого досвіду. <br />{" "}
        Продовжуючи використовувати цей сайт, ви погоджуєтесь з нашою політикою
        конфіденційності.
      </p>
      <div className="flex gap-4 items-center justify-center">
        <button
          onClick={handleConsent}
          className="border border-gray-400/40 rounded-xl p-2 hover:bg-gray-200 hover:dark:bg-gray-500 transition-all duration-300"
        >
          Схвалити всі файли cookie
        </button>
        <button
          onClick={forbidConsent}
          className="border border-gray-400/40 rounded-xl p-2 hover:bg-gray-200 hover:dark:bg-gray-500 transition-all duration-300"
        >
          Не даю згоду
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    borderTop: "1px solid #ccc",
    padding: "10px",
    textAlign: "center",
    zIndex: 10,
  },
};

export default CookieConsent;
