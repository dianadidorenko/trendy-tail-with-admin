"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { UploadButton } from "@/utils/uploadthing";
import Loader from "@/components/elements/Loader";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function UpdateItemPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [existingItem, setExistingItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [itemId, setItemId] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const id = pathname.split("/").pop();
    setItemId(id);
  }, [pathname]);

  useEffect(() => {
    const fetchItem = async () => {
      if (itemId) {
        try {
          const response = await fetch(`/api/items/${itemId}`);
          if (!response.ok) {
            throw new Error("Не удалось загрузить товар");
          }
          const data = await response.json();
          setExistingItem(data);
          setImages(data.images || []);
        } catch (error) {
          console.error("Ошибка загрузки товара:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchItem();
  }, [itemId]);

  if (loading) {
    return <Loader />;
  }

  if (!existingItem) {
    return <div>Товар не знайдено</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExistingItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const isArrayField = (field) => {
    return (
      field === "images" ||
      field === "colors" ||
      field === "characteristics" ||
      field === "careInstructions"
    );
  };

  const handleArrayChange = (index, e, field) => {
    const { value } = e.target;
    if (isArrayField(field)) {
      const updatedArray = [...(existingItem[field] ?? [])];
      updatedArray[index] = value;
      setExistingItem((prev) => ({ ...prev, [field]: updatedArray }));
    } else if (field === "sizes") {
      const updatedSizes = [...(existingItem.sizes ?? [])];
      if (index >= 0 && index < updatedSizes.length) {
        updatedSizes[index] = {
          ...updatedSizes[index],
          [e.target.name]: value,
        };
        setExistingItem((prev) => ({ ...prev, sizes: updatedSizes }));
      }
    }
  };

  const handleAddToArray = (field) => {
    if (isArrayField(field)) {
      setExistingItem((prev) => ({
        ...prev,
        [field]: [...(prev[field] ?? []), ""],
      }));
    }
  };

  const handleRemoveFromArray = (index, field) => {
    if (isArrayField(field)) {
      setExistingItem((prev) => ({
        ...prev,
        [field]: (prev[field] ?? []).filter((_, i) => i !== index),
      }));
    }
  };

  const handleAddSize = () => {
    setExistingItem((prev) => ({
      ...prev,
      sizes: [...(prev.sizes ?? []), { size: "", price: "" }],
    }));
  };

  const handleSizeChange = (index, e) => {
    const { name, value } = e.target;
    setExistingItem((prev) => {
      const updatedSizes = [...(prev.sizes || [])];
      if (index >= 0 && index < updatedSizes.length) {
        updatedSizes[index] = { ...updatedSizes[index], [name]: value };
      }
      return { ...prev, sizes: updatedSizes };
    });
  };

  const handleRemoveSize = (index) => {
    setExistingItem((prev) => ({
      ...prev,
      sizes: (prev.sizes ?? []).filter((_, i) => i !== index),
    }));
  };

  const handleUpdateItem = async () => {
    try {
      const response = await fetch(`/api/items`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: existingItem._id, ...existingItem }),
      });

      if (response.ok) {
        const data = await response.json();
        setExistingItem(data.data);
        alert("Товар успешно обновлен");
        router.push("/admin");
      } else {
        const data = await response.json();
        alert(
          `Не удалось обновить товар: ${data.error || "Неизвестная ошибка"}`
        );
      }
    } catch (error) {
      console.error("Ошибка обновления товара:", error);
      alert("Произошла непредвиденная ошибка");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleUpdateItem();
  };

  return (
    <div className="form-container mx-auto p-4 my-8 max-w-[600px] lg:max-w-[800px] text-black dark:text-white bg-white dark:bg-slate-600">
      <Link
        href={"/admin"}
        className="flex gap-2 text-white p-1 rounded-lg mb-6"
      >
        <ArrowLeft />
        Назад
      </Link>
      
      <h1 className="text-2xl font-bold mb-10 text-center">
        Панель адміністратора
      </h1>
      <h2 className="text-xl font-semibold border-b-slate-300 border-b mb-6">
        Загальна інформація
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex flex-col gap-2 w-full">
            {/* Name */}
            <label>Назва товару</label>
            <input
              type="text"
              name="name"
              value={existingItem.name}
              onChange={(e) =>
                setExistingItem({ ...existingItem, name: e.target.value })
              }
              placeholder="Назва товару"
              required
              className="input-field dark:bg-slate-400 dark:text-slate-100"
            />
          </div>

          {/* URL Name */}
          <div className="flex flex-col gap-2 w-full">
            <label>Назва товару у посиланнi</label>
            <input
              type="text"
              name="urlName"
              value={existingItem.urlName}
              onChange={(e) =>
                setExistingItem({ ...existingItem, urlName: e.target.value })
              }
              placeholder="Назва товару англійською"
              required
              className="input-field dark:bg-slate-400 dark:text-slate-100"
            />
          </div>
        </div>

        {/* Category, Category Show  */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex flex-col gap-2 w-full">
            <label>Категорія англійською</label>
            <input
              type="text"
              name="category"
              value={existingItem.category}
              onChange={(e) =>
                setExistingItem({ ...existingItem, category: e.target.value })
              }
              placeholder="Категорія англійською"
              required
              className="input-field dark:bg-slate-400 dark:text-slate-100"
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label>Назва категорії в посиланні</label>
            <input
              type="text"
              name="categoryShow"
              value={existingItem.categoryShow}
              onChange={(e) =>
                setExistingItem({
                  ...existingItem,
                  categoryShow: e.target.value,
                })
              }
              placeholder="Назва катeгорії"
              required
              className="input-field dark:bg-slate-400 dark:text-slate-100"
            />
          </div>
        </div>

        {/* Type */}
        <div className="flex flex-col gap-2 mb-4">
          <label>Тип товару</label>
          <input
            type="text"
            name="type"
            value={existingItem.type}
            onChange={handleChange}
            placeholder="Тип товару"
            className="input-field dark:bg-slate-400 dark:text-slate-100"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2 mb-4">
          <label>Опис товару</label>
          <textarea
            name="description"
            value={existingItem.description}
            onChange={handleChange}
            placeholder="Опис"
            required
            className="input-field dark:bg-slate-400 dark:text-slate-100"
          />
        </div>

        {/* Brand, Material */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex flex-col gap-2 w-full">
            <label>Бренд</label>
            <input
              type="text"
              name="brand"
              value={existingItem.brand}
              onChange={handleChange}
              placeholder="Бренд"
              required
              className="input-field dark:bg-slate-400 dark:text-slate-100"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label>Матеріал</label>
            <input
              type="text"
              name="material"
              value={existingItem.material}
              onChange={handleChange}
              placeholder="Матеріал"
              className="input-field dark:bg-slate-400 dark:text-slate-100"
            />
          </div>
        </div>

        {/* Season */}
        <div className="flex flex-col gap-2 mb-4">
          <label>Сезон</label>
          <input
            type="text"
            name="season"
            value={existingItem.season}
            onChange={handleChange}
            placeholder="Сезон"
            className="input-field dark:bg-slate-400 dark:text-slate-100"
          />
        </div>

        {/* Images */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-4 border-b-slate-300 border-b">
            Зображення
          </h2>
          {images.length < 1 ? (
            <UploadButton
              endpoint="imageUploader"
              appearance={{
                button({ ready, isUploading }) {
                  return {
                    color: "black",
                    ...(ready && { color: "#ecfdf5" }),
                    ...(isUploading && { color: "#d1d5db" }),
                  };
                },
                container: "flex-row rounded-md border-cyan-300 bg-slate-800",
                allowedContent:
                  "flex h-8 flex-col items-center justify-center px-2 text-white",
              }}
              content={{
                button({ ready }) {
                  if (ready) return <span></span>;
                  return "В процесі...";
                },
                allowedContent({ ready, fileTypes, isUploading }) {
                  if (!ready) return "Перевіряємо файли";
                  if (isUploading) return "У процесі завантаження";
                  return `Файли, які ви можете додавати: ${fileTypes.join(
                    ", "
                  )}`;
                },
              }}
              onClientUploadComplete={(res) => {
                const newImages = res.map((e) => e.url);
                setImages(newImages);
                setItem((prev) => ({
                  ...prev,
                  images: newImages,
                }));
              }}
              onUploadError={(error) => {
                alert(`ERROR ${error.message}`);
              }}
            />
          ) : (
            <div className="flex flex-wrap gap-6">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    className="h-[200px] w-[200px] object-cover border border-slate-200 rounded"
                    alt={`image ${index + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute -top-3 -right-3 z-10 bg-red-600 hover:bg-red-500 duration-300 text-white py-1 px-2 rounded text-[14px] text-bold"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sizes */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-4 border-b-slate-300 border-b">
            Розміри
          </h2>
          {(existingItem.sizes ?? []).map((size, index) => (
            <div key={index} className="flex items-center mb-2 gap-4">
              <input
                type="text"
                name="size"
                value={size.size}
                onChange={(e) => handleSizeChange(index, e)}
                placeholder={`Розмір ${index + 1}`}
                className="input-field dark:bg-slate-400 dark:text-slate-100"
              />
              <input
                type="text"
                name="price"
                value={size.price}
                onChange={(e) => handleSizeChange(index, e)}
                placeholder={`Ціна ${index + 1}`}
                className="input-field dark:bg-slate-400 dark:text-slate-100"
              />
              <button
                type="button"
                onClick={() => handleRemoveSize(index)}
                className="hover:underline border rounded-md p-2 border-slate-300"
              >
                Видалити
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddSize}
            className="hover:underline border rounded-md p-2 border-slate-300 mt-2"
          >
            Додати розмір
          </button>
        </div>

        {/* Colors */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-4 border-b-slate-300 border-b">
            Кольори
          </h2>
          {existingItem.colors.map((color, index) => (
            <div key={index} className="flex items-center gap-4">
              <input
                type="text"
                value={color}
                onChange={(e) => handleArrayChange(index, e, "colors")}
                placeholder={`Колір ${index + 1}`}
                className="input-field dark:bg-slate-400 dark:text-slate-100 w-full mb-2"
              />
              <button
                type="button"
                onClick={() => handleRemoveFromArray(index, "colors")}
                className="hover:underline border rounded-md p-2 border-slate-300"
              >
                Видалити
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddToArray("colors")}
            className="hover:underline border rounded-md p-2 border-slate-300 mt-2"
          >
            Додати колір
          </button>
        </div>

        {/* Characteristics */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-4 border-b-slate-300 border-b">
            Характеристики
          </h2>
          {(existingItem.characteristics ?? []).map((characteristic, index) => (
            <div key={index} className="flex items-center mb-2 gap-4">
              <input
                type="text"
                value={characteristic}
                onChange={(e) => handleArrayChange(index, e, "characteristics")}
                placeholder={`Характеристика ${index + 1}`}
                className="input-field dark:bg-slate-400 dark:text-slate-100 w-full"
              />
              <button
                type="button"
                onClick={() => handleRemoveFromArray(index, "characteristics")}
                className="hover:underline border rounded-md p-2 border-slate-300"
              >
                Видалити
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddToArray("characteristics")}
            className="hover:underline border rounded-md p-2 border-slate-300 mt-2"
          >
            Додати характеристику
          </button>
        </div>

        {/* Care Instructions */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-4 border-b-slate-300 border-b">
            Інструкції по догляду
          </h2>
          {(existingItem.careInstructions ?? []).map((instruction, index) => (
            <div key={index} className="flex items-center mb-2 gap-4">
              <input
                type="text"
                value={instruction}
                onChange={(e) =>
                  handleArrayChange(index, e, "careInstructions")
                }
                placeholder={`Інструкція ${index + 1}`}
                className="input-field dark:bg-slate-400 dark:text-slate-100 w-full"
              />
              <button
                type="button"
                onClick={() => handleRemoveFromArray(index, "careInstructions")}
                className="hover:underline border rounded-md p-2 border-slate-300"
              >
                Видалити
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddToArray("careInstructions")}
            className="hover:underline border rounded-md p-2 border-slate-300 mt-2"
          >
            Додати інструкцію
          </button>
        </div>

        {/* Material Additional Info */}
        <div className="flex flex-col gap-2 mb-4">
          <label>Додаткова інформація о матеріалі</label>
          <input
            type="text"
            name="materialAdditionalInfo"
            value={existingItem.materialAdditionalInfo}
            onChange={handleChange}
            placeholder="Додаткова інформація о матеріалі"
            className="input-field dark:bg-slate-400 dark:text-slate-100"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Оновити товар
          </button>
        </div>
      </form>
    </div>
  );
}
