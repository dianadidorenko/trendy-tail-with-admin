"use client";

import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";

import { fadeIn } from "@/lib/variants";
import PagesNav from "@/components/common/PagesNav";
import SectionHeaders from "@/components/common/SectionHeaders";
import CatalogCard from "@/components/layout/catalog/CatalogCard";
import CatalogSlider from "@/components/layout/catalog/CatalogSlider";
import Filter from "@/components/layout/catalog/Filter";
import Loader from "@/components/elements/Loader";
import { fetchItems } from "@/lib/fetchItems";

const ITEMS_PER_PAGE = 9;

const CatalogPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedBrand, setSelectedBrand] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 2500]);

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

  const filteredItems = useMemo(() => {
    const result = items.filter((item) => {
      const matchesBrand = selectedBrand ? item.brand === selectedBrand : true;
      const matchesCategory = selectedCategory
        ? item.categoryShow === selectedCategory
        : true;
      const matchesSeason = selectedSeason
        ? item.season === selectedSeason
        : true;
      const matchesType = selectedType ? item.type === selectedType : true;
      const price = parseFloat(item.sizes[0].price);

      const matchesPrice = price >= priceRange[0] && price <= priceRange[1];

      return (
        matchesBrand &&
        matchesCategory &&
        matchesSeason &&
        matchesType &&
        matchesPrice
      );
    });

    return result;
  }, [
    items,
    selectedBrand,
    selectedCategory,
    selectedSeason,
    selectedType,
    priceRange,
  ]);

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredItems.slice(startIndex, endIndex);
  }, [filteredItems, currentPage]);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleBrandClick = (brand) => {
    setSelectedBrand(brand);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleSeasonClick = (season) => {
    setSelectedSeason(season);
  };

  const handleTypeClick = (type) => {
    setSelectedType(type);
  };

  const handlePriceRangeChange = (range) => {
    setPriceRange(range);
  };

  const resetFilters = () => {
    setCurrentPage(1);
    setSelectedBrand(null);
    setSelectedCategory(null);
    setSelectedSeason(null);
    setSelectedType(null);
    setPriceRange([0, 2500]);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[100vh]">
        <Loader />
      </div>
    );
  }

  return (
    <section>
      <div className="container mx-auto">
        <PagesNav items={items} />
        
        <CatalogSlider />

        <SectionHeaders mainHeader={"Каталог"} />

        <motion.div
          className="flex flex-col justify-center gap-10 xs:px-0 xs2:pb-8 px-8 mx-auto relative"
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true, amount: 0.2 }}
        >
          {!items || items.length === 0 ? (
            <p>Не знайдено товар</p>
          ) : (
            <div className="flex items-center lg:items-start marker:justify-center lg:justify-between gap-4 sm:gap-10 py-8 flex-col lg:flex-row">
              <aside className="flex flex-col gap-4">
                <Filter
                  items={items}
                  selectedBrand={selectedBrand}
                  selectedCategory={selectedCategory}
                  selectedSeason={selectedSeason}
                  selectedType={selectedType}
                  priceRange={priceRange}
                  handleBrandClick={handleBrandClick}
                  handleCategoryClick={handleCategoryClick}
                  handleSeasonClick={handleSeasonClick}
                  handleTypeClick={handleTypeClick}
                  onPriceRangeChange={handlePriceRangeChange}
                  resetFilters={resetFilters}
                />
              </aside>

              <div className="flex flex-col gap-8">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                  {paginatedItems.length > 0 ? (
                    paginatedItems.map((item, index) => (
                      <CatalogCard key={index} item={item} />
                    ))
                  ) : (
                    <p>Товары не найдены.</p>
                  )}
                </div>

                {totalPages > 1 && (
                  <div className="pagination">
                    {Array.from({ length: totalPages }, (_, index) => (
                      <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={currentPage === index + 1 ? "active" : ""}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default CatalogPage;
