import Image from "next/image";
import React from "react";
import { FiClock } from "react-icons/fi";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const FlashDealSection = ({ deals,isMobile, responsive }) => {
  const DealCard = ({ deal }) => (
    <div
      key={deal.id}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-200 hover:scale-96 flex-shrink-0 w-55 sm:w-72 lg:w-70 cursor-pointer flex flex-col h-80 md:h-full">
      <div className="flex items-center justify-between p-2 sm:p-3 h-12">
        <div className="flex items-center space-x-2">
          <Image
            src={deal.brand}
            width={60}
            height={2}
            className="object-fit"
            sizes="(max-width: 768px) 80px, 320px"
            alt="Brand"
          />
        </div>
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
          {deal.subtitle}
        </span>
      </div>

      <div className="relative h-[140px] sm:h-[160px] lg:h-[180px] overflow-hidden rounded">
  <Image
    src={deal.image}
    alt={deal.title}
    fill
    sizes="(max-width: 768px) 80vw, 320px"
    className="object-cover"
  />
  {deal.discount && (
    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
      {deal.discount}
    </div>
  )}
</div>


      <div className="p-3 sm:p-4 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="font-semibold text-gray-800 mb-2 text-xs sm:text-sm lg:text-base leading-tight line-clamp-2">
            {deal.title}
          </h3>

          {deal.cashback ? (
            <div className="mb-3">
              <span className="text-base sm:text-lg lg:text-xl font-bold text-green-600">
                {deal.cashback}
              </span>
            </div>
          ) : (
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">
                ₹{deal.currentPrice}
              </span>
              {deal.originalPrice && (
                <span className="text-gray-500 line-through text-sm sm:text-base">
                  ₹{deal.originalPrice}
                </span>
              )}
            </div>
          )}
        </div>

        <button className="w-full bg-black hover:bg-gray-800 cursor-pointer text-white font-semibold py-2 sm:py-2.5 lg:py-3 rounded-lg transition-colors duration-200 text-sm sm:text-base">
          {deal.buttonText}
        </button>
      </div>
    </div>
  );

  return (
    
    <div className="relative bg-gradient-to-br from-slate-300 via-slate-200 to-slate-400 py-6 sm:py-8 px-3 sm:px-4 min-h-[460px]">
  <div className="absolute inset-0 bg-white/10 pointer-events-none" />
  <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3 drop-shadow-lg">
            FLASH DEAL
          </h1>
          <div className="inline-flex items-center bg-white/90 backdrop-blur-sm rounded-full px-3 sm:px-6 py-1 sm:py-3 shadow-lg gap-2">
            <FiClock className="text-lg text-gray-600" />
            <span className="text-gray-800 font-medium text-xs sm:text-base">
              Ends Soon
            </span>
          </div>
        </div>


           <div className="relative mb-4 sm:mb-6">
          {isMobile ? (
            <div className="flex gap-3 overflow-x-auto scrollbar-hide px-1">
              {deals.map((deal) => (
                <div key={deal.id} className="[min-w-85vw] ">
                  <DealCard deal={deal} />
                </div>
              ))}
            </div>
          ) : (
            <Carousel
              responsive={responsive}
              customTransition="transform 500ms"
            >
              {deals.map((deal) => (
                <div key={deal.id} className="px-2 h-full">
                  <DealCard deal={deal} />
                </div>
              ))}
            </Carousel>
          )}
        </div>

        {/* <div className="text-center">
          <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-full border border-white/30 transition-all duration-200 text-sm sm:text-base">
            View All
          </button>
        </div> */}
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default FlashDealSection;
