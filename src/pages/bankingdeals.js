import FourStepCahback from "@/components/FourStepCahback";
import Loanandcardcomp from "@/components/Loan&cardComp";
import React, { useState } from "react";

  const creditCards = [
    {
      name: "SBI SimplyCLICK Card",
      logo: "/images/brands/sbi-simply-click-card.png",
      bank: "SBI Bank",
      cardType: "SimplyCLICK",
      reward: "₹1,400",
      features: [
        "10X Reward Point",
        "Savings on online Spends",
        "Fuel Surcharge Waiver",
      ],
    },
    {
      name: "IDFC First Card",
      logo: "/images/brands/idfcfist-card.png",
      bank: "IDFC Bank",
      cardType: "Visa",
      reward: "₹500",
      features: ["Cashback on Online", "Amazon Prime Benefits"],
    },
    {
      name: "HDFC Pixel Card",
      logo: "/images/brands/hdfc-pixel-card.png",
      bank: "HDFC Bank",
      cardType: "Pixel Play",
      reward: "₹750",
      features: ["Online Shopping Rewards", "Fuel Surcharge Waiver"],
    },
    {
      name: "Axis Bank Flipkart Card",
      logo: "/images/brands/axis-flipcard-card.png",
      bank: "Axis Bank",
      cardType: "Flipkart Axis",
      reward: "₹1,200",
      features: ["Flipkart Cashback", "No Annual Fee"],
    },
  ];

function Bankingdeals() {
 
  const filterTabs = ["All", "Cards", "Loans", "Others"];
 const [activeFilter, setActiveFilter] = useState(filterTabs[0]);
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    console.log(`Filtering by: ${filter}`);
  };
  return (
    <div className="min-h-screen w-full mx-auto px-2 py-4 md:px-10">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
        Loan & Card Deals
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
    
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
          <Loanandcardcomp items={creditCards} type="creditCard" />
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

export default Bankingdeals;