import React from "react";
import Image from "next/image";
import Carousel from "react-multi-carousel";

const TopDealComp = ({ title, slides, isMobile, responsive }) => {
  return (
    <div className="py-1">
      <div className="flex justify-between px-2">
        <h2 className="text-base md:text-xl font-bold mb-4">{title}</h2>
        <a
          href="#"
          className="text-black text-sm md:text-base font-medium hover:underline flex items-center"
        >
          View All <span className="ml-1">&#8594;</span>
        </a>
      </div>

      {isMobile ? (
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-3 snap-x snap-mandatory">
            {slides.map((slide, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 snap-start"
                style={{ width: "88vw", maxWidth: 350 }}
              >
                <a href={slide.link}>
                  <div className="relative aspect-[16/9] bg-white rounded-2xl overflow-hidden shadow">
                    <Image
                      src={slide.image}
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Carousel customTransition="transform 700ms" responsive={responsive}>
          {slides.map((slide, idx) => (
            <div className="mx-2" key={idx}>
              <a
                href={slide.link}
                style={{ width: "100%", maxWidth: 350, minWidth: 220 }}
              >
                <div className="h-50 flex bg-white rounded-2xl overflow-hidden">
                  <Image
                    width={800}
                    height={10}
                    src={slide.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              </a>
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default TopDealComp
