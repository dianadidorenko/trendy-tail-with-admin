"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import { fetchItems } from "@/lib/fetchItems";
import Loader from "@/components/elements/Loader";
import PagesCatalogNav from "@/components/layout/main-page/PagesCatalogNav";

const BedsPage = () => {
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

  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  // Фильтруем товары по выбранной категории
  const filteredItems = useMemo(() => {
    if (!category) return items;
    return items.filter(
      (item) =>
        item.categoryShow.trim().toLowerCase() === category.trim().toLowerCase()
    );
  }, [category, items]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[100vh]">
        <Loader />
      </div>
    );
  }

  return (
    <div>
      {filteredItems.length === 0 ? (
        <p>Товари не знайдени.</p>
      ) : (
        <PagesCatalogNav items={filteredItems} paramsCategory={category} />
      )}
    </div>
  );
};

export default BedsPage;
