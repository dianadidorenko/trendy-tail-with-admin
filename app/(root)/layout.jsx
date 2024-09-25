import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import CartProvider from "@/lib/context/CartContext";
import ToasterProvider from "@/lib/providers/ToasterProvider";
import "@/styles/globals.css";

export const metadata = {
  title: "Trendy Tail Store",
  description: "Trendy Tail Store - Ecommerce",
};

export default function RootLayout({ children }) {
  return (
    <CartProvider>
      <html lang="en" suppressHydrationWarning>
        <body className="text-black dark:text-white bg-white dark:bg-slate-800">
          <ThemeProvider attribute="class" defaultTheme="light">
            <ToasterProvider />
            <Header />
            {children}
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </CartProvider>
  );
}
