import axios from "axios";

export async function POST(req) {
  const { formType, name, email, message, clientInfo, cartInfo } =
    await req.json();

  let text;
  switch (formType) {
    case "form1":
      text = `Форма главной страницы: Ім'я: ${name}, Імейл: ${email}, Текст: ${message}`;
      break;
    case "form2":
      text = `Форма из корзины: ${clientInfo}, ${cartInfo}`;
      break;
    default:
      text = `Неизвестная форма: ${name}, ${email}, ${message}`;
  }

  const TELEGRAM_API_URL = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;

  try {
    await axios.post(TELEGRAM_API_URL, {
      chat_id: process.env.TELEGRAM_CHAT_ID,
      text: text,
    });
    return new Response(JSON.stringify({ message: "Сообщение отправлено" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Ошибка при отправке сообщения в Telegram:", error);
    return new Response(
      JSON.stringify({ error: "Ошибка при отправке сообщения в Telegram" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
