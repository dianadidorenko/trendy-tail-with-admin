// import { useState, useRef, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { items } from "@/items";

// const categoryTranslation = {
//   одяг: "cloth",
//   ліжаки: "beds",
//   "сумки-переноски": "carrying-bags",
//   аксесуари: "accessories",
// };

// const SearchInput = ({ closeSearch }) => {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [noResults, setNoResults] = useState(false);
//   const searchContainerRef = useRef(null);
//   const router = useRouter();

//   const getCategoryMapping = () => {
//     const categories = new Set();
//     items.forEach((item) => categories.add(item.categoryShow));

//     const categoryMapping = {};
//     categories.forEach((category) => {
//       const categoryPath =
//         categoryTranslation[category.toLowerCase()] || category.toLowerCase();
//       categoryMapping[category] = `${categoryPath}`;
//     });

//     return categoryMapping;
//   };

//   const categoryMapping = getCategoryMapping();

//   const handleSearch = (e) => {
//     const value = e.target.value.toLowerCase();
//     setQuery(value);

//     if (value.length > 0) {
//       const filteredResults = items.filter(
//         (item) =>
//           item.name?.toLowerCase().includes(value) ||
//           item.categoryShow?.toLowerCase().includes(value) ||
//           item.type?.toLowerCase().includes(value)
//       );
//       setResults(filteredResults);
//       setNoResults(filteredResults.length === 0);

//       const filteredCategories = Object.keys(categoryMapping).filter(
//         (category) => category.toLowerCase().includes(value)
//       );
//       setCategories(filteredCategories);
//     } else {
//       setResults([]);
//       setNoResults(false);
//       setCategories([]);
//     }
//   };

//   const handleResultClick = (urlName) => {
//     router.push(`/products/${urlName}`);
//     closeSearch();
//   };

//   const handleIconClick = () => {
//     if (query.length > 0) {
//       const lowerCaseQuery = query.toLowerCase();
//       const translatedCategory = categoryTranslation[lowerCaseQuery];
//       if (translatedCategory) {
//         const originalCategory = items.find(
//           (item) => item.categoryShow.toLowerCase() === lowerCaseQuery
//         )?.categoryShow;

//         if (originalCategory) {
//           router.push(
//             `/${translatedCategory}?category=${encodeURIComponent(
//               originalCategory
//             )}`
//           );
//           closeSearch();
//         } else {
//           console.warn("Категория не найдена");
//         }
//       } else {
//         console.warn("Перевод категории не найден");
//       }
//     } else {
//       console.warn("Пустой запрос");
//     }
//   };

//   const handleClickOutside = (event) => {
//     if (
//       searchContainerRef.current &&
//       !searchContainerRef.current.contains(event.target)
//     ) {
//       closeSearch();
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div
//       className="search-container w-full flex flex-col items-center justify-center p-1 bg-white dark:bg-accent border border-gray-300 shadow-lg"
//       ref={searchContainerRef}
//     >
//       <div className="flex mb-2">
//         <input
//           type="text"
//           value={query}
//           onChange={handleSearch}
//           placeholder="Пошук товара..."
//           className="search-input max-w-[150px] p-2 border border-gray-300 rounded-l-md text-primary placeholder:text-primary placeholder:text-[15px] dark:bg-white/80"
//         />
//         <button
//           onClick={handleIconClick}
//           className="search-icon p-2 border border-gray-300 bg-gray-200 rounded-r-md"
//         >
//           🔍
//         </button>
//       </div>
//       <ul className="search-results w-full max-h-60 overflow-y-auto bg-white dark:bg-accent rounded-md shadow-lg">
//         {categories.map((category) => (
//           <li
//             key={category}
//             className="p-2 hover:bg-gray-100 hover:dark:bg-gray-500 cursor-pointer"
//             onClick={() => {
//               router.push(
//                 `${categoryMapping[category]}?category=${encodeURIComponent(
//                   category
//                 )}`
//               );
//               closeSearch();
//             }}
//           >
//             {category}
//           </li>
//         ))}
//         {results.map((item) => (
//           <li
//             key={item.id}
//             className="p-2 hover:bg-gray-100 hover:dark:bg-gray-500 cursor-pointer"
//             onClick={() => handleResultClick(item.urlName)}
//           >
//             {item.name}
//           </li>
//         ))}
//         {noResults && query.length > 0 && (
//           <li className="p-2 text-gray-100">Нічого не знайдено</li>
//         )}
//       </ul>
//     </div>
//   );
// };

// export default SearchInput;

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
// import { items } from "@/items";

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
      className="search-container w-full flex flex-col items-center justify-center p-1 bg-white dark:bg-accent border border-gray-300 shadow-lg"
      ref={searchContainerRef}
    >
      <div className="flex my-1">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Пошук товара..."
          className="search-input max-w-[150px] p-2 border border-gray-300 rounded-l-md text-primary placeholder:text-primary placeholder:text-[15px] dark:bg-white/80"
        />
        <button
          onClick={handleIconClick}
          className="search-icon p-2 border border-gray-300 bg-gray-200 rounded-r-md"
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
