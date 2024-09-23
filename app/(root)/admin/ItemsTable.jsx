"use client";

import React, { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useRouter } from "next/navigation";
import Loader from "@/components/elements/Loader";
import { useMediaQuery } from "react-responsive";

export default function ItemsTable() {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const isSmallScreen = useMediaQuery({
    query: "(max-width: 767px)",
  });
  const isMiddleScreen = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1023px)",
  });

  useEffect(() => {
    async function fetchItems() {
      try {
        setLoading(true);
        const response = await fetch("/api/items");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchItems();
  }, []);

  const handleRowClick = (item) => {
    router.push(`/admin`);
  };

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Вы уверены, что хотите удалить этот товар?");
    if (confirmDelete) {
      setLoading(true);
      try {
        const response = await fetch(`/api/items/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          alert("Товар успешно удален");
          setItems((prev) => prev.filter((item) => item._id !== id));
        } else {
          alert("Не удалось удалить товар");
        }
      } catch (error) {
        console.error("Ошибка удаления товара:", error);
        alert("Произошла ошибка при удалении товара");
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto py-2 lg:py-10">
      <DataTable
        columns={columns(handleDelete, isSmallScreen, isMiddleScreen)}
        data={items}
        onRowClick={handleRowClick}
      />
    </div>
  );
}
