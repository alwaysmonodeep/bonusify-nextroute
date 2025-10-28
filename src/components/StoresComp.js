import React, { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";

export default function StoresComponent({
  filterType = "popular",
  limit = null,
  showFilters = false,
  onFilterChange = null,
  enablePagination = false,
  initialLimit = 30,
  gridClassName = "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
}) {
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [activeFilter, setActiveFilter] = useState(filterType);
  const [currentLimit, setCurrentLimit] = useState(initialLimit);

  // Fetch stores
  useEffect(() => {
    fetch("/api/stores")
      .then(res => res.json())
      .then(data => {
        setStores(Array.isArray(data) ? data : data.data || data.stores || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching stores:", err);
        setLoading(false);
      });
  }, []);

  // Filter stores
  const filteredStores = useMemo(() => {
    if (!stores.length) return [];

    switch (activeFilter.toLowerCase()) {
      case "popular":
      default:
        return stores
          .filter(store => store.metadata?.popularRank > 0)
          .sort((a, b) => a.metadata.popularRank - b.metadata.popularRank);

      case "all":
        return stores.sort((a, b) => {
          const aFirst = a.slug?.charAt(0).toLowerCase() || "z";
          const bFirst = b.slug?.charAt(0).toLowerCase() || "z";
          return aFirst.localeCompare(bFirst);
        });

      case "percent":
        return stores.filter(store => 
          store.deal?.maxRateType === "percentage" || 
          store.categoryRates?.some(rate => rate.rateType === "percentage")
        );

      case "amount":
        return stores.filter(store => 
          store.deal?.maxRateType === "fixed" || 
          store.categoryRates?.some(rate => rate.rateType === "fixed")
        );
    }
  }, [stores, activeFilter]);

  // Apply limits
  const displayedStores = useMemo(() => {
    if (limit && limit > 0 && !enablePagination) return filteredStores.slice(0, limit);
    if (enablePagination) return filteredStores.slice(0, currentLimit);
    return filteredStores;
  }, [filteredStores, limit, enablePagination, currentLimit]);

  const loadMore = useCallback(() => {
    if (loadingMore || currentLimit >= filteredStores.length) return;
    setLoadingMore(true);
    setTimeout(() => {
      setCurrentLimit(prev => prev + 25);
      setLoadingMore(false);
    }, 300);
  }, [loadingMore, currentLimit, filteredStores.length]);

  // Infinite scroll
  useEffect(() => {
    if (!enablePagination) return;
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= 
          document.documentElement.offsetHeight - 1000) {
        loadMore();
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [enablePagination, loadMore]);

  const handleFilterChange = useCallback((filter) => {
    setActiveFilter(filter);
    setCurrentLimit(initialLimit);
    onFilterChange?.(filter);
  }, [onFilterChange, initialLimit]);

  useEffect(() => setActiveFilter(filterType), [filterType]);

  if (loading || loadingMore) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-full border-4 border-white"></div>
            <div className="absolute top-0 left-0 w-12 h-12 rounded-full border-4 border-grayn-600 border-t-transparent animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {showFilters && (
        <div className="flex flex-wrap justify-center gap-1 sm:gap-2 mb-6 sm:mb-8">
          {["Popular", "All", "Percent", "Amount"].map(tab => (
            <button
              key={tab}
              onClick={() => handleFilterChange(tab)}
              className={`px-3 py-2 sm:px-6 sm:py-2 text-xs sm:text-base rounded-lg font-medium transition-all duration-200 ${
                activeFilter.toLowerCase() === tab.toLowerCase()
                  ? "bg-[#332B4E] text-white shadow-lg"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      )}

      <div className={`grid gap-2 ${gridClassName}`}>
        {displayedStores.map(store => (
          <Link key={store._id} href={`/stores/${store.slug}`} className="h-full">
            <div className="bg-gray-100 border border-gray-200 shadow-sm rounded-xl p-3 pt-8 h-[160px] flex flex-col relative hover:shadow-lg hover:border-gray-300 hover:bg-gray-50 transition-all cursor-pointer">
              {store.branding?.badge && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 px-2 py-1 text-[10px] md:text-xs font-semibold text-white rounded-b-xl bg-[#FF5A7B]">
                  {store.branding.badge}
                </span>
              )}

              <div className="flex justify-between items-center flex-grow mt-2">
                <Image
                  src={store.branding?.logo || "/images/default-logo.png"}
                  alt={store.brandName}
                  width={75}
                  height={40}
                  className="object-contain md:w-[75px] w-[65px]"
                />

                <div className="text-right">
                  <div className="flex items-center font-semibold">
                    {store.deal?.maxRateValue &&
                      store.deal?.maxRateValue.toString().length < 4 && (
                        <span className="text-[10px] md:text-sm">
                          {store.deal?.qualifier}
                        </span>
                      )}
                    <span className="text-lg md:text-2xl text-green-600 ml-1">
                      {store.deal?.maxRateType === "percentage"
                        ? `${store.deal.maxRateValue}%`
                        : store.deal?.maxRateType === "fixed"
                        ? `₹${store.deal.maxRateValue}`
                        : ""}
                    </span>
                  </div>
                  <span className="text-xs md:text-base font-semibold">
                    {store.deal?.type || "Rewards"}
                  </span>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedStore(store);
                }}
                className="text-xs underline text-left cursor-pointer mt-auto hover:text-gray-700"
              >
                Reward Rates & Terms
              </button>
            </div>
          </Link>
        ))}
      </div>

      {enablePagination && currentLimit < filteredStores.length && (
        <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-full border-4 border-white"></div>
            <div className="absolute top-0 left-0 w-12 h-12 rounded-full border-4 border-grayn-600 border-t-transparent animate-spin"></div>
          </div>
        </div>
      </div>
      )}

      {selectedStore && (
        <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white shadow-2xl rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="bg-gray-100 p-4 border-b border-gray-200 relative">
              <button
                onClick={() => setSelectedStore(null)}
                className="absolute top-4 right-4 text-2xl hover:bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer"
              >
                ×
              </button>
              <h2 className="text-sm md:text-lg font-semibold text-center">
                {selectedStore.brandName} - Rates & Terms
              </h2>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              {selectedStore.categoryRates?.map((rate, i) => (
                <div key={i} className="flex items-center md:gap-2">
                  <div className="text-green-600 font-bold text-base md:text-lg min-w-[60px]">
                    {rate.rateType === "percentage" ? `${rate.rate}%` : 
                     rate.rateType === "fixed" ? `₹${rate.rate}` : rate.rate}
                  </div>
                  <div>
                    <p className="text-gray-700 text-sm md:text-base">
                      Cashback on {rate.category}
                    </p>
                    {rate.subcategories && rate.subcategories.length > 0 && (
                      <p className="text-xs text-gray-500">
                        {rate.subcategories.join(", ")}
                      </p>
                    )}
                    <p className="text-xs">
                      {rate.maxCashback && `Max: ${rate.maxCashback}`}
                    </p>
                  </div>
                </div>
              ))}

              {selectedStore.termsAndConditions && (
                <div className="border-t pt-4">
                  {selectedStore.termsAndConditions.map((term, i) => (
                    <div key={i} className="flex gap-3 mb-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full mt-2"></div>
                      <p className="text-xs md:text-sm text-gray-600">{term}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}