import FourStepCahback from "@/components/FourStepCahback";
import StoresComp from "@/components/StoresComp";
import React, { useState } from "react";

function Stores() {
  
  const filterTabs = ["Popularity", "A-Z", "Percent", "Amount"];
const [activeFilter, setActiveFilter] = useState(filterTabs[0]);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    console.log(`Filtering by: ${filter}`);
  };

  return (
    <div className="w-full mx-auto py-2  xl:px-8">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
        Popular Stores
      </h2>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-1 sm:gap-2 mb-6 sm:mb-8">
        {filterTabs.map((filter) => (
          <button
            key={filter}
            onClick={() => handleFilterChange(filter)}
            className={`px-3 py-1.5 sm:px-6 sm:py-2 text-sm sm:text-base rounded-lg font-medium transition-all duration-200 ${
              activeFilter === filter
                ? "bg-[#332B4E] text-white shadow-lg"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div
        className="
  px-4
  grid grid-cols-2 gap-4 
  rows-[35vw]
  md:rows-[14vw]
  md:grid-cols-3
  lg:grid-cols-4
  xl:grid-cols-5
  pb-4
"
      >
        <StoresComp />
      </div>
      <div className="px-3 my-10">
        <h2 className="text-base md:text-xl font-bold mb-3 md:mb-5">
          Four Steps To Save
        </h2>
        <div className=" overflow-x-auto md:overflow-x-visible scrollbar-hide ">
          <FourStepCahback />
        </div>
      </div>
    </div>
  );
}

export default Stores;
