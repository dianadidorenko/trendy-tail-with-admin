"use client";

import "@/styles/globals.css";

import { useEffect, useState } from "react";

import Loader from "@/components/elements/Loader";
import CookieConsent from "@/components/CookieConsent";
import AboutUs from "@/components/layout/main-page/AboutUs";
import CatalogNav from "@/components/layout/main-page/CatalogNav";
import InTrendsSlider from "@/components/layout/main-page/InTrendsSlider";
import MainSlider from "@/components/layout/main-page/MainSlider";
import WelcomeTitle from "@/components/layout/main-page/WelcomeTitle";
import { fetchItems } from "@/lib/fetchItems";

export default function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getItems = async () => {
      setLoading(true);
      try {
        const data = await fetchItems();
        setItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };

    getItems();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[100vh]">
        <Loader />
      </div>
    );
  }

  return (
    <main>
      <WelcomeTitle />
      <MainSlider />
      <AboutUs />
      <CatalogNav items={items} />
      <InTrendsSlider items={items} />
      <CookieConsent />
    </main>
  );
}
