import React from 'react';
import Image from 'next/image';

const Loanandcardcomp = ({ items, type }) => {
  // Credit Card Component
  const CreditCardIcon = ({ item }) => (
    <div className="w-12 h-7 xs:w-14 xs:h-9 sm:w-16 sm:h-10 md:w-18 md:h-11 lg:w-20 lg:h-12 xl:w-22 xl:h-13 bg-gray-800 rounded-sm sm:rounded-md relative overflow-hidden flex-shrink-0">
      {/* Chip */}
      <div className="absolute top-1 left-1 xs:top-1.5 xs:left-1.5 sm:top-2 sm:left-2 md:top-2.5 md:left-2.5 w-2 h-1.5 xs:w-2.5 xs:h-2 sm:w-3 sm:h-2.5 md:w-3.5 md:h-3 bg-yellow-400 rounded-sm"></div>

      {/* Contactless */}
      <div className="absolute top-1 right-1 xs:top-1.5 xs:right-1.5 sm:top-2 sm:right-2 md:top-2.5 md:right-2.5 w-1.5 h-1.5 xs:w-2 xs:h-2 sm:w-2.5 sm:h-2.5">
        <div className="w-full h-full border border-white rounded-full border-b-transparent border-l-transparent transform rotate-45"></div>
      </div>

      {/* Card Text */}
      <div className="absolute bottom-1 right-1 xs:bottom-1.5 xs:right-1.5 sm:bottom-2 sm:right-2 md:bottom-2.5 md:right-2.5 text-white text-[4px] xs:text-[5px] sm:text-[6px] md:text-[7px] lg:text-[8px] font-bold text-right leading-tight">
        <div className="truncate max-w-[25px] xs:max-w-[30px] sm:max-w-[35px] md:max-w-[40px] lg:max-w-[45px]">
          {item.bank || item.lender}
        </div>
        <span className="text-[3px] xs:text-[4px] sm:text-[5px] md:text-[6px] lg:text-[7px]">
          {item.cardType || "User"}
        </span>
      </div>
    </div>
  );

  // Money Bundle Component
  const MoneyBundleIcon = ({ item }) => (
    <div className="w-12 h-7 xs:w-14 xs:h-9 sm:w-16 sm:h-10 md:w-18 md:h-11 lg:w-20 lg:h-12 xl:w-22 xl:h-13 relative flex-shrink-0">
      {/* Money Stack - Bottom Layer */}
      <div className="absolute bottom-0 right-1.5 xs:right-2 sm:right-2.5 w-9 h-5 xs:w-11 xs:h-6 sm:w-13 sm:h-7 md:w-15 md:h-8 lg:w-17 lg:h-9 bg-gray-600 rounded-sm rotate-2">
        <div className="absolute top-1 left-1 xs:top-1.5 xs:left-1.5 text-gray-400 text-[6px] xs:text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] font-bold">
          ₹
        </div>
      </div>

      {/* Money Stack - Top Layer */}
      <div className="absolute bottom-0.5 right-0 xs:bottom-1 w-9 h-5 xs:w-11 xs:h-6 sm:w-13 sm:h-7 md:w-15 md:h-8 lg:w-17 lg:h-9 bg-gray-800 rounded-sm">
        <div className="absolute top-1 left-1 xs:top-1.5 xs:left-1.5 text-gray-300 text-[6px] xs:text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] font-bold">
          ₹
        </div>
        <div className="absolute bottom-1 right-1 xs:bottom-1.5 xs:right-1.5 text-gray-300 text-[4px] xs:text-[5px] sm:text-[6px] md:text-[7px] lg:text-[8px] font-semibold">
          {item.maxAmount}
        </div>
      </div>
    </div>
  );

 return (
  <>
    {items.map((item, i) => (
      <a href="#" key={i} className="block">
        <div className="relative bg-gradient-to-br from-blue-300 via-blue-400 to-blue-500 border-blue-300/20 overflow-hidden rounded-lg sm:rounded-xl cursor-pointer transition-transform duration-150 hover:scale-[0.98] min-h-[130px] xs:min-h-[140px] sm:min-h-[150px] md:min-h-[160px] lg:min-h-[170px] xl:min-h-[180px] 2xl:min-h-[190px] group">
          <div className="relative p-2 xs:p-2.5 sm:p-3 md:p-4 lg:p-4.5 h-full flex flex-col justify-between">
            {/* Top Section */}
            <div className="flex justify-between items-start">
              <div className="bg-white rounded-md sm:rounded-lg px-1.5 py-1 xs:px-2 xs:py-1.5 sm:px-2.5 sm:py-2 md:px-3 md:py-2.5 shadow-md min-w-0 max-w-[45%] xs:max-w-[50%] sm:max-w-[55%] h-6 xs:h-7 sm:h-8 md:h-9 lg:h-10 xl:h-10 flex items-center justify-center">
                <Image
                  src={item.logo}
                  alt={item.bank || item.lender}
                  width={100}
                  height={22}
                  className="object-contain w-full h-full max-h-5 xs:max-h-6 sm:max-h-7 md:max-h-8 lg:max-h-8"
                  loading="lazy"
                />
              </div>

              {type === "creditCard" ? (
                <CreditCardIcon item={item} />
              ) : (
                <MoneyBundleIcon item={item} />
              )}
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col justify-center py-1.5 xs:py-2 sm:py-2.5 md:py-3 min-h-0">
              <p className="text-white font-semibold text-[8px] xs:text-[9px] sm:text-[10px] md:text-xs lg:text-sm xl:text-sm mb-1 xs:mb-1.5 sm:mb-2 drop-shadow-md leading-tight line-clamp-1">
                {item.features[0]}
              </p>
              <p className="text-white text-[7px] xs:text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs xl:text-xs mb-1.5 xs:mb-2 sm:mb-2.5 drop-shadow-md leading-tight line-clamp-1">
                {item.features[1]}
              </p>

              {/* Reward Section */}
              <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-2 mb-1.5 xs:mb-2 sm:mb-3">
                <div className="w-4 h-4 xs:w-5 xs:h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 bg-[#332B4E] rounded-sm sm:rounded-md flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-[6px] xs:text-[7px] sm:text-[7px] md:text-[8px] lg:text-[9px] xl:text-[10px]">
                    BI
                  </span>
                </div>
                <span className="text-white font-bold text-[8px] xs:text-[9px] sm:text-[10px] md:text-xs lg:text-sm xl:text-base leading-tight">
                  Flat {item.reward} Rewards
                </span>
              </div>
            </div>

            {/* Apply Button */}
            <div className="flex justify-end mt-auto">
              <button className="bg-white text-black font-semibold px-2 py-1 xs:px-2.5 xs:py-1.5 sm:px-3 sm:py-1.5 md:px-4 md:py-2 lg:px-5 lg:py-2.5 rounded-md sm:rounded-lg text-[7px] xs:text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs xl:text-sm hover:bg-gray-50 transition-colors duration-100 shadow-md whitespace-nowrap">
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </a>
    ))}
  </>
);
};
export default Loanandcardcomp;