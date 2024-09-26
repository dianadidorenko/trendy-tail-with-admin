import "@/styles/globals.css";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Trendy Tail - Панель Авторізації",
  description: "Next.js 15 Trendy Tail Онлайн магазин",
};

export default async function AuthLayout({ children }) {
  return (
    <>
      <div>
        <Link
          href={"/"}
          className="flex gap-2 bg-[#002255] dark:bg-gray-900 text-white p-4"
        >
          <ArrowLeft />
          Назад
        </Link>
      </div>
      {children}
    </>
  );
}
