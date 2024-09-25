import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchItems } from "@/lib/fetchItems";

const categoryTranslation = {
  одяг: "cloth",
  ліжаки: "beds",
  "сумки-переноски": "carrying-bags",
  аксесуари: "accessories",
};

const SearchInput = ({ closeSearch }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [categories, setCategories] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const searchContainerRef = useRef(null);
  const router = useRouter();

  const [items, setItems] = useState([]);

  useEffect(() => {
    const getItems = async () => {
      try {
        const data = await fetchItems();
        setItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
      }
    };

    getItems();
  }, []);

  const getCategoryMapping = () => {
    const categories = new Set();
    items.forEach((item) => categories.add(item.categoryShow));

    const categoryMapping = {};
    categories.forEach((category) => {
      const categoryPath =
        categoryTranslation[category.toLowerCase()] ||
        categoryTranslation[category] ||
        category.toLowerCase();
      categoryMapping[category] = `${categoryPath}`;
    });

    return categoryMapping;
  };

  const categoryMapping = getCategoryMapping();

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);

    if (value.length > 0) {
      const filteredResults = items.filter(
        (item) =>
          item.name?.toLowerCase().includes(value) ||
          item.categoryShow?.toLowerCase().includes(value) ||
          item.type?.toLowerCase().includes(value)
      );
      setResults(filteredResults);
      setNoResults(filteredResults.length === 0);

      const filteredCategories = Object.keys(categoryMapping).filter(
        (category) => category.toLowerCase().includes(value)
      );
      setCategories(filteredCategories);
    } else {
      setResults([]);
      setNoResults(false);
      setCategories([]);
    }
  };

  const handleResultClick = (urlName) => {
    router.push(`/products/${urlName}`);
    closeSearch();
  };

  const handleCategoryClick = (category) => {
    const categoryPath = categoryMapping[category];
    if (categoryPath) {
      router.push(`/${categoryPath}?category=${encodeURIComponent(category)}`);
      closeSearch();
    }
  };

  const handleIconClick = () => {
    if (query.length > 0) {
      const lowerCaseQuery = query.toLowerCase();
      const translatedCategory = categoryTranslation[lowerCaseQuery];
      if (translatedCategory) {
        const originalCategory = items.find(
          (item) => item.categoryShow.toLowerCase() === lowerCaseQuery
        )?.categoryShow;

        if (originalCategory) {
          router.push(
            `/${translatedCategory}?category=${encodeURIComponent(
              originalCategory
            )}`
          );
          closeSearch();
        } else {
          console.warn("Категория не найдена");
        }
      } else {
        console.warn("Перевод категории не найден");
      }
    } else {
      console.warn("Пустой запрос");
    }
  };

  const handleClickOutside = (event) => {
    if (
      searchContainerRef.current &&
      !searchContainerRef.current.contains(event.target)
    ) {
      closeSearch();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="search-container w-full flex flex-col items-center justify-center p-1 dark:bg-accent border border-gray-300 shadow-lg"
      ref={searchContainerRef}
    >
      <div className="relative max-w-[170px] my-2">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Пошук товара..."
          className="w-full p-2 bg-transparent border border-gray-200 rounded-md text-primary placeholder:dark:text-white/70 placeholder:text-black/70 placeholder:text-[15px] pr-8"
        />
        <button
          onClick={handleIconClick}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" // Позиционируем иконку
        >
          🔍
        </button>
      </div>
      <ul className="search-results w-full max-h-60 overflow-y-auto bg-white dark:bg-accent rounded-md shadow-lg">
        {categories.map((category) => (
          <li
            key={category}
            className="p-2 hover:bg-gray-100 hover:dark:bg-gray-500 cursor-pointer"
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </li>
        ))}
        {results.map((item) => (
          <li
            key={item.id}
            className="p-2 hover:bg-gray-100 hover:dark:bg-gray-500 cursor-pointer"
            onClick={() => handleResultClick(item.urlName)}
          >
            {item.name}
          </li>
        ))}
        {noResults && query.length > 0 && (
          <li className="p-2 text-gray-500">Нічого не знайдено</li>
        )}
      </ul>
    </div>
  );
};

export default SearchInput;
