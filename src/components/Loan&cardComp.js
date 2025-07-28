import React from 'react';
import Image from 'next/image';

const Loanandcardcomp = ({ items, type }) => {
  // Credit Card Component
  const CreditCardIcon = ({ item }) => (
    <div className="w-14 h-9 xs:w-16 xs:h-10 sm:w-18 sm:h-11 md:w-20 md:h-12 lg:w-22 lg:h-13 xl:w-24 xl:h-14 bg-gray-800 rounded-sm sm:rounded-md relative overflow-hidden flex-shrink-0">
      {/* Chip */}
      <div className="absolute top-1.5 left-1.5 xs:top-2 xs:left-2 sm:top-2.5 sm:left-2.5 md:top-3 md:left-3 w-2.5 h-2 xs:w-3 xs:h-2.5 sm:w-3.5 sm:h-3 md:w-4 md:h-3.5 bg-yellow-400 rounded-sm"></div>

      {/* Contactless */}
      <div className="absolute top-1.5 right-1.5 md:top-2 md:right-2 w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3">
        <div className="w-full h-full border border-white rounded-full border-b-transparent border-l-transparent transform rotate-45"></div>
      </div>

      {/* Card Text */}
      <div className="absolute bottom-1.5 right-1.5 text-white text-[7px] md:text-[9px] font-light text-right ">
        <div className=" truncate max-w-[60px] sm:max-w-[40px] md:max-w-[60px] lg:max-w-[90px]">
          {item.bank || item.lender}
        </div>
        
      </div>
    </div>
  );

  // Money Bundle Component
  const MoneyBundleIcon = ({ item }) => (
    <div className="w-14 h-9 xs:w-16 xs:h-10 sm:w-18 sm:h-11 md:w-20 md:h-12 lg:w-22 lg:h-13 xl:w-24 xl:h-14 relative flex-shrink-0">
      {/* Money Stack - Bottom Layer */}
      <div className="absolute bottom-0 right-2 xs:right-2.5 sm:right-3 w-10 h-6 xs:w-12 xs:h-7 sm:w-14 sm:h-8 md:w-16 md:h-9 lg:w-18 lg:h-10 bg-gray-600 rounded-sm rotate-2">
        <div className="absolute top-1.5 left-1.5 xs:top-2 xs:left-2 text-gray-400 text-[10px] xs:text-[11px] sm:text-xs md:text-sm lg:text-base font-bold">
          ₹
        </div>
      </div>

      {/* Money Stack - Top Layer */}
      <div className="absolute bottom-0.5 right-0 xs:bottom-1 w-10 h-6 xs:w-12 xs:h-7 sm:w-14 sm:h-8 md:w-16 md:h-9 lg:w-18 lg:h-10 bg-gray-800 rounded-sm">
        <div className="absolute top-1.5 left-1.5 xs:top-2 xs:left-2 text-gray-300 text-[10px] xs:text-[11px] sm:text-xs md:text-sm lg:text-base font-bold">
          ₹
        </div>
        <div className="absolute bottom-1.5 right-1.5 xs:bottom-2 xs:right-2 text-gray-300 text-[8px] xs:text-[9px] sm:text-[10px] md:text-xs lg:text-sm font-semibold">
          {item.maxAmount}
        </div>
      </div>
    </div>
  );

 return (
  <>
    {items.map((item, i) => (
      <a href="#" key={i} className="block">
        <div className="relative bg-[#699CEC] overflow-hidden rounded-lg cursor-pointer transition-transform duration-150 hover:scale-[0.98] min-h-[170px] md:min-h-[180px] xl:min-h-[190px]">
          <div className="relative p-3 sm:p-4 md:p-5 lg:p-4 h-full flex flex-col justify-between">
            {/* Top Section */}
            <div className="flex justify-between items-start">
              <div className="bg-white rounded-md sm:rounded-lg px-1 py-1.5 xl:px-2 xl:py-2 shadow-md h-9 sm:h-9  lg:h-11 flex items-center justify-center">
                <Image
                  src={item.logo}
                  alt={item.bank}
                  width={100}
                  height={22}
                  className="object-fit w-full h-full"
                />
              </div>

              {type === "creditCard" ? (
                <CreditCardIcon item={item} />
              ) : (
                <MoneyBundleIcon item={item} />
              )}
            </div>

            {/* Main Content */}
            <div className="flex-1 gap-1 md:gap-0 flex flex-col justify-center pb-2 pt-6 xl:pb-3 xl:pt-8">
              <p className="text-white font-medium text-sm md:text-base xl:text-base sm:mb-2 leading-relaxed">
                {item.features[0]}
              </p>
              <p className="text-white font-light text-xs  md:text-base lg:text-sm xl:text-base mb-2 xs:mb-2.5 sm:mb-3 drop-shadow-md line-clamp-2">
                {item.features[1]}
              </p>

              {/* Reward Section */}
              <div className="flex items-center gap-2 sm:gap-3 mt-4">
                <div className="w-5 h-5 xs:w-6 xs:h-6 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 bg-[#332B4E] rounded-sm sm:rounded-md flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-[9px] sm:text-[10px] md:text-xs lg:text-sm xl:text-base">
                    BI
                  </span>
                </div>
                <span className="text-white font-semibold text-base xl:text-lg">
                  Flat {item.reward} Rewards
                </span>
              </div>
            </div>

            {/* Apply Button */}
            <div className="flex justify-end mt-auto">
              <button className="bg-white text-black font-semibold px-3 py-1.5 md:px-5 md:py-2.5 lg:px-5 lg:py-2 rounded-md sm:rounded-lg text-[10px] xs:text-xs sm:text-sm md:text-sm lg:text-base xl:text-base hover:bg-gray-50 transition-colors duration-100 shadow-md whitespace-nowrap">
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