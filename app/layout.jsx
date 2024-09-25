import "@/styles/globals.css";

export const metadata = {
  title: "Trendy Tail - Welcome",
  description: "Trendy Tail - Welcome",
};

export default function HomeLayout({ children }) {
  return (
    <html lang="en">
      <body className="text-black dark:text-white bg-white dark:bg-slate-700">
        {children}
      </body>
    </html>
  );
}
