"use client";

import React from "react";
import { useState } from "react";

import { UploadButton } from "@/utils/uploadthing";
import { useRouter } from "next/navigation";

const initialItemState = {
  name: "",
  urlName: "",
  category: "",
  categoryShow: "",
  type: "",
  description: "",
  images: [],
  brand: "",
  material: "",
  season: "",
  colors: [],
  sizes: [],
  materialAdditionalInfo: "",
  characteristics: [],
  careInstructions: [],
};

export default function AddItemPage() {
  const [item, setItem] = useState(initialItemState);
  const [images, setImages] = useState([]);

  const router = useRouter();

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prev) => ({ ...prev, [name]: value }));
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
      const updatedArray = [...(item[field] ?? [])];
      updatedArray[index] = value;
      setItem((prev) => ({ ...prev, [field]: updatedArray }));
    } else if (field === "sizes") {
      const updatedSizes = [...(item.sizes ?? [])];
      if (index >= 0 && index < updatedSizes.length) {
        updatedSizes[index] = {
          ...updatedSizes[index],
          [e.target.name]: value,
        };
        setItem((prev) => ({ ...prev, sizes: updatedSizes }));
      }
    }
  };

  const handleAddToArray = (field) => {
    if (isArrayField(field)) {
      setItem((prev) => ({
        ...prev,
        [field]: [...(prev[field] ?? []), ""],
      }));
    }
  };

  const handleRemoveFromArray = (index, field) => {
    if (isArrayField(field)) {
      setItem((prev) => ({
        ...prev,
        [field]: (prev[field] ?? []).filter((_, i) => i !== index),
      }));
    }
  };

  const handleAddSize = () => {
    setItem((prev) => ({
      ...prev,
      sizes: [...(prev.sizes ?? []), { size: "", price: "" }],
    }));
  };

  const handleSizeChange = (index, e) => {
    const { name, value } = e.target;
    setItem((prev) => {
      const updatedSizes = [...(prev.sizes || [])];
      if (index >= 0 && index < updatedSizes.length) {
        updatedSizes[index] = { ...updatedSizes[index], [name]: value };
      }
      return { ...prev, sizes: updatedSizes };
    });
  };

  const handleRemoveSize = (index) => {
    setItem((prev) => ({
      ...prev,
      sizes: (prev.sizes ?? []).filter((_, i) => i !== index),
    }));
  };

  const handleAddItem = async () => {
    console.log("Submitting item:", item);

    try {
      const response = await fetch("/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });

      if (response.ok) {
        alert("Item successfully added");
        setItem(initialItemState);
        setImages([]);
      } else {
        const data = await response.json();
        alert(`Failed to add item: ${data.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Unexpected error occurred");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleAddItem();
    router.push("/admin");
  };

  return (
    <div className="form-container mx-auto p-4 max-w-[600px] lg:max-w-[800px] text-black dark:text-white bg-white dark:bg-slate-700">
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
              value={item.name}
              onChange={handleChange}
              placeholder="Назва товару"
              required
              className="input-field dark:bg-slate-400 dark:text-slate-100 dark:placeholder:text-slate-100"
            />
          </div>

          {/* URL Name */}
          <div className="flex flex-col gap-2 w-full">
            <label>Назва товару у посиланнi</label>
            <input
              type="text"
              name="urlName"
              value={item.urlName}
              onChange={handleChange}
              placeholder="Назва товару англійською"
              required
              className="input-field dark:bg-slate-400 dark:text-slate-100 dark:placeholder:text-slate-100"
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
              value={item.category}
              onChange={handleChange}
              placeholder="Категорія англійською"
              required
              className="input-field dark:bg-slate-400 dark:text-slate-100 dark:placeholder:text-slate-100"
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label>Назва категорії в посиланні</label>
            <input
              type="text"
              name="categoryShow"
              value={item.categoryShow}
              onChange={handleChange}
              placeholder="Назва катeгорії"
              required
              className="input-field dark:bg-slate-400 dark:text-slate-100 dark:placeholder:text-slate-100"
            />
          </div>
        </div>

        {/* Type */}
        <div className="flex flex-col gap-2 mb-4">
          <label>Тип товару</label>
          <input
            type="text"
            name="type"
            value={item.type}
            onChange={handleChange}
            placeholder="Тип товару"
            className="input-field dark:bg-slate-400 dark:text-slate-100 dark:placeholder:text-slate-100"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2 mb-4">
          <label>Опис товару</label>
          <textarea
            name="description"
            value={item.description}
            onChange={handleChange}
            placeholder="Опис"
            required
            className="input-field dark:bg-slate-400 dark:text-slate-100 dark:placeholder:text-slate-100"
          />
        </div>

        {/* Brand, Material */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex flex-col gap-2 w-full">
            <label>Бренд</label>
            <input
              type="text"
              name="brand"
              value={item.brand}
              onChange={handleChange}
              placeholder="Бренд"
              required
              className="input-field dark:bg-slate-400 dark:text-slate-100 dark:placeholder:text-slate-100"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label>Матеріал</label>
            <input
              type="text"
              name="material"
              value={item.material}
              onChange={handleChange}
              placeholder="Матеріал"
              className="input-field dark:bg-slate-400 dark:text-slate-100 dark:placeholder:text-slate-100"
            />
          </div>
        </div>

        {/* Season */}
        <div className="flex flex-col gap-2 mb-4">
          <label>Сезон</label>
          <input
            type="text"
            name="season"
            value={item.season}
            onChange={handleChange}
            placeholder="Сезон"
            className="input-field dark:bg-slate-400 dark:text-slate-100 dark:placeholder:text-slate-100"
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
                container:
                  "h-[100px] flex flex-col items-center justify-center rounded-md border-cyan-300 bg-slate-800",
                allowedContent:
                  "flex h-8 flex-col items-center justify-center px-2 text-white text-center",
              }}
              content={{
                button() {
                  return <span></span>;
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
            <div className="flex flex-wrap gap-2">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    className="h-[200px] w-[200px] object-cover"
                    alt={`image ${index + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
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
          {(item.sizes ?? []).map((size, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-start sm:items-center mb-2 gap-4"
            >
              <input
                type="text"
                name="size"
                value={size.size}
                onChange={(e) => handleSizeChange(index, e)}
                placeholder={`Розмір ${index + 1}`}
                className="dark:bg-slate-400 dark:text-slate-100 dark:placeholder:text-slate-100 w-full"
              />
              <input
                type="text"
                name="price"
                value={size.price}
                onChange={(e) => handleSizeChange(index, e)}
                placeholder={`Ціна ${index + 1}`}
                className="dark:bg-slate-400 dark:text-slate-100 dark:placeholder:text-slate-100 w-full"
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
            className="hover:underline border rounded-md p-2 border-slate-300"
          >
            Додати розмір
          </button>
        </div>

        {/* Colors */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-4 border-b-slate-300 border-b">
            Кольори
          </h2>
          {item.colors.map((color, index) => (
            <div key={index} className="flex items-center gap-4">
              <input
                type="text"
                value={color}
                onChange={(e) => handleArrayChange(index, e, "colors")}
                placeholder={`Колір ${index + 1}`}
                className="input-field dark:bg-slate-400 dark:text-slate-100 dark:placeholder:text-slate-100"
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
          {(item.characteristics ?? []).map((characteristic, index) => (
            <div key={index} className="flex items-center mb-2 gap-4">
              <input
                type="text"
                value={characteristic}
                onChange={(e) => handleArrayChange(index, e, "characteristics")}
                placeholder={`Характеристика ${index + 1}`}
                className="input-field dark:bg-slate-400 dark:text-slate-100 dark:placeholder:text-slate-100"
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
            className="hover:underline border rounded-md p-2 border-slate-300"
          >
            Додати характеристику
          </button>
        </div>

        {/* Care Instructions */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-4 border-b-slate-300 border-b">
            Інструкції по догляду
          </h2>
          {(item.careInstructions ?? []).map((instruction, index) => (
            <div key={index} className="flex items-center mb-2 gap-4">
              <input
                type="text"
                value={instruction}
                onChange={(e) =>
                  handleArrayChange(index, e, "careInstructions")
                }
                placeholder={`Інструкція ${index + 1}`}
                className="input-field dark:bg-slate-400 dark:text-slate-100 dark:placeholder:text-slate-100"
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
            className="hover:underline border rounded-md p-2 border-slate-300"
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
            value={item.materialAdditionalInfo}
            onChange={handleChange}
            placeholder="Додаткова інформація о матеріалі"
            className="input-field dark:bg-slate-400 dark:text-slate-100 dark:placeholder:text-slate-100"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Додати товар
          </button>
        </div>
      </form>
    </div>
  );
}
