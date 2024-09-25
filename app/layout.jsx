import "@/styles/globals.css";

export const metadata = {
  title: "Trendy Tail - Welcome",
  description: "Trendy Tail - Welcome",
};

export default function HomeLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="./site.webmanifest" />
      </head>
      <body className="text-black dark:text-white bg-white dark:bg-slate-700">
        {children}
      </body>
    </html>
  );
}
