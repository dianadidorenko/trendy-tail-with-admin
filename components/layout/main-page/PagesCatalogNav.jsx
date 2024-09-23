"use client";

import { useMemo, useState } from "react";
import Filter from "../catalog/Filter";
import CatalogCard from "../catalog/CatalogCard";
import PagesNav from "@/components/common/PagesNav";
import SectionHeaders from "@/components/common/SectionHeaders";

const ITEMS_PER_PAGE = 9;

const PagesCatalogNav = ({ items, paramsCategory }) => {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 2500]);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesBrand = selectedBrand ? item.brand === selectedBrand : true;
      const matchesSeason = selectedSeason
        ? item.season === selectedSeason
        : true;
      const matchesType = selectedType ? item.type === selectedType : true;
      const matchesPrice =
        item.sizes[0].price >= priceRange[0] &&
        item.sizes[0].price <= priceRange[1];
      return matchesSeason && matchesType && matchesBrand && matchesPrice;
    });
  }, [items, selectedBrand, selectedSeason, selectedType, priceRange]);

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
    setCurrentPage(1);
  };

  const handleSeasonClick = (season) => {
    setSelectedSeason(season);
    setCurrentPage(1);
  };

  const handleTypeClick = (type) => {
    setSelectedType(type);
    setCurrentPage(1);
  };

  const handlePriceRangeChange = (range) => {
    setPriceRange(range);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSelectedBrand(null);
    setSelectedSeason(null);
    setSelectedType(null);
    setPriceRange([0, 2500]);
    setCurrentPage(1);
  };

  return (
    <section>
      <div className="container mx-auto">
        <PagesNav items={items} />
        <SectionHeaders mainHeader={"Каталог"} />

        <div className="flex flex-col justify-center gap-10 xs:px-0 xs2:pb-8 px-8 mx-auto relative">
          {!items || items.length === 0 ? (
            <p>Не знайдено товар</p>
          ) : (
            <div className="flex items-center lg:items-start marker:justify-center lg:justify-between gap-4 sm:gap-10 py-8 flex-col lg:flex-row">
              <aside className="flex flex-col gap-4">
                <Filter
                  items={items}
                  selectedBrand={selectedBrand}
                  selectedSeason={selectedSeason}
                  selectedType={selectedType}
                  priceRange={priceRange}
                  handleBrandClick={handleBrandClick}
                  handleSeasonClick={handleSeasonClick}
                  handleTypeClick={handleTypeClick}
                  onPriceRangeChange={handlePriceRangeChange}
                  resetFilters={resetFilters}
                  paramsCategory={paramsCategory}
                />
              </aside>

              <div className="flex flex-col gap-8">
                <div className="grid grid-cols-1 xsSm:grid-cols-2 md:grid-cols-3 gap-8">
                  {paginatedItems.length > 0 ? (
                    paginatedItems.map((item, index) => (
                      <CatalogCard key={index} item={item} />
                    ))
                  ) : (
                    <div className="flex items-center justify-center">
                      <h2>Не знайдено товар.</h2>
                    </div>
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
        </div>
      </div>
    </section>
  );
};

export default PagesCatalogNav;
