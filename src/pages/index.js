import React, { useEffect,useRef, useState, useMemo } from "react";
import {FaMobileAlt,FaLaptop,FaTshirt,FaUtensils,FaPlane,FaCreditCard,FaBook,FaShieldAlt,FaServer,FaHome,FaHandHoldingUsd,FaPumpSoap,FaClock,FaUniversity,FaFutbol,FaBaby,FaCapsules,FaArrowRight,FaMoneyBill,FaChevronLeft, FaChevronRight} from "react-icons/fa";
import Link from "next/link";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";
import dynamic from "next/dynamic";

import FlashDealSection from "@/components/FlashDeal";
// Lazy load heavy component
const Loanandcardcomp = dynamic(() => import("@/components/Loan&cardComp"), {
  loading: () => <div className="animate-pulse bg-gray-200 h-32 rounded-lg"></div>,
  ssr: false,
});
const FourStepCahback = dynamic(() => import("@/components/FourStepCahback"), {
  loading: () => <div className="animate-pulse bg-gray-200 h-32 rounded-lg"></div>,
  ssr: false,
});
const StoresComp = dynamic(() => import("@/components/StoresComp"), {
  loading: () => <div className="animate-pulse bg-gray-200 h-24 rounded-lg"></div>,
  ssr: false,
});
const WhyBonusify = dynamic(() => import("@/components/Whybonusify"), {
  loading: () => <div className="animate-pulse bg-gray-200 h-64 rounded-lg"></div>,
  ssr: false,
});
const TopDealComp = dynamic(() => import("@/components/TopDealComp"), {
  loading: () => <div className="animate-pulse bg-gray-200 h-40 rounded-lg"></div>,
  ssr: false,
});

// Static data - moved outside component and memoized
const SLIDES = [
  {
    image: "https://asset20.ckassets.com/resources/image/slider_images/ck-storepage-v2/segment/desktop-slider5-1748490751.png",
    link: "https://example.com/ajio",
  },
  {
    image: "https://asset20.ckassets.com/resources/image/slider_images/ck-storepage-v2/segment/desktop-slider4-1748544160.png",
    link: "https://example.com/myntra",
  },
  {
    image: "https://asset20.ckassets.com/resources/image/slider_images/ck-storepage-v2/segment/desktop-slider4-1748541429.png",
    link: "https://example.com/amazon",
  },
  {
    image: "https://asset20.ckassets.com/resources/image/slider_images/ck-storepage-v2/segment/desktop-slider1-1748846114.png",
    link: "https://example.com/flipkart",
  },
  {
    image: "https://asset20.ckassets.com/resources/image/slider_images/ck-storepage-v2/segment/desktop-slider8-1748714858.png",
    link: "https://example.com/nykaa",
  },
];
const CATEGORIES = [
  { name: "Mobiles", icon: FaMobileAlt },
  { name: "Laptops", icon: FaLaptop },
  { name: "Fashion", icon: FaTshirt },
  { name: "Watches", icon: FaClock },
  { name: "Pharmacy", icon: FaCapsules },
  { name: "Food & Grocery", icon: FaUtensils },
  { name: "Travel", icon: FaPlane },
  { name: "Credit Cards", icon: FaCreditCard },
  { name: "Education", icon: FaBook },
  { name: "Insurances", icon: FaShieldAlt },
  { name: "Hosting", icon: FaServer },
  { name: "Home Appliance", icon: FaHome },
  { name: "Beauty & Grooming", icon: FaPumpSoap },
  { name: "Loans", icon: FaHandHoldingUsd },
  { name: "Banking", icon: FaUniversity },
  { name: "Sports", icon: FaFutbol },
  { name: "Baby Care", icon: FaBaby },
];
const FLASH_DEALS = [
  {
    id: 1,
    brand: "/images/brands/myntra.svg",
    title: "Men's Polo T-Shirt at Just ₹500 Each!",
    subtitle: "Limited Stock",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80",
    currentPrice: 500,
    originalPrice: 1499,
    discount: "67% off",
    buttonText: "Grab Deal",
  },
  {
    id: 2,
    brand: "/images/brands/flipkart.png",
    title: "Up to 80% Off",
    subtitle: "10% + Extra 20% Off",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=400&q=80",
    cashback: "Flat 60% Cashback",
    buttonText: "Grab Deal",
  },
  {
    id: 3,
    brand: "/images/brands/makemytrip.png",
    title: "100% Pure Daanedaar Cow Ghee - 1L",
    subtitle: "Premium Pack",
    image:
      "https://images.unsplash.com/photo-1628294895950-9805252327bc?auto=format&fit=crop&w=400&q=80",
    currentPrice: 546,
    originalPrice: 780,
    buttonText: "Grab Deal",
  },
  {
    id: 4,
    brand: "/images/brands/boat.png",
    title: "Buy Any 5 Cotton Stretch Trunks at ₹175 Each!",
    subtitle: "Exclusive Offer",
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=400&q=80",
    currentPrice: 874,
    originalPrice: 1695,
    discount: "30% off",
    buttonText: "Grab Deal",
  },
  {
    id: 5,
    brand: "/images/brands/indigo.png",
    title: "Men's Polo T-Shirt at Just ₹500!",
    subtitle: "Limited Stock",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80",
    currentPrice: 500,
    originalPrice: 1499,
    discount: "67% off",
    buttonText: "Grab Deal",
  },
  {
    id: 6,
    brand: "/images/brands/myntra.svg",
    title: "Men's Polo T-Shirt at Just ₹500 Each!",
    subtitle: "Limited Stock",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80",
    currentPrice: 500,
    originalPrice: 1499,
    discount: "67% off",
    buttonText: "Grab Deal",
  },
  {
    id: 7,
    brand: "/images/brands/flipkart.png",
    title: "Up to 80% Off",
    subtitle: "10% + Extra 20% Off",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=400&q=80",
    cashback: "Flat 60% Cashback",
    buttonText: "Grab Deal",
  },
]; // Flash deal data
const CREDIT_CARDS = [
  {
    name: "SBI SimplyCLICK Card",
    logo: "/images/brands/sbi-simply-click-card.png",
    bank: "SBI Bank",
    cardType: "SimplyCLICK",
    reward: "₹1,400",
    features: ["10X Reward Point", "Savings on online Spends", "Fuel Surcharge Waiver"],
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
const BLOGS = [
  {
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    link: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
    title: "Exploring the Mountains",
  },
  {
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
    link: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
    title: "A Day at the Beach",
  },
    {
    image:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    link: "https://www.youtube.com/watch?v=3fumBcKC6RE",
    title: "Forest Camping Vlog",
  },
  {
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80",
    link: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
    title: "Road Trip Diaries",
  },
  {
    image:
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=600&q=80",
    link: "https://www.youtube.com/watch?v=VYOjWnS4cMY",
    title: "Food Tasting Around Town",
  },
];

// Custom hook for responsive detection
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 1025);
    
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return isMobile;
};

const SectionHeader = React.memo(({ title, href, linkText = "View All" }) => (
  <div className="flex justify-between items-center px-2 my-4">
    <h2 className="text-base md:text-xl xl:text-2xl font-semibold">{title}</h2>
    {href && (
      <Link href={href} className="text-black text-sm md:text-base font-medium flex items-center gap-1">
        {linkText}
        <span className="text-lg">&#8594;</span>
      </Link>
    )}
  </div>
));

export default function Home() {
const categoryScrollRef = useRef(null);

const scrollCategories = (direction) => {
  const container = categoryScrollRef.current;
  if (container) {
    const scrollAmount = 300;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  }
};
  const isMobile = useIsMobile();
// Memoize carousel responsive config
  const responsive = useMemo(() => ({
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
      slidesToSlide: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1281 },
      items: 3.5,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1281, min: 540 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 540, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  }), []);

  return (
    <div className="my-2 px-0 relative z-0">
      {/* Hero Carousel */}
      <section className="xl:pl-5 px-1 md:py-2">
        <Carousel
          showDots={isMobile}
          autoPlay={isMobile}
          autoPlaySpeed={5000}
          draggable
          customTransition="transform 500ms"
          responsive={responsive}>
          {SLIDES.map((slide, idx) => (
            <div className="mx-2" key={idx}>
              <a href={slide.link} target="_blank" rel="noopener noreferrer">
                <div className="w-full h-60 flex items-center justify-center bg-white rounded-2xl overflow-hidden">
                  <Image
                    width={800}
                    height={240}
                    src={slide.image}
                    alt={`Slide ${idx + 1}`}
                    className="w-full h-full object-fit"
                    priority={idx < 2}
                  />
                </div>
              </a>
            </div>
          ))}
        </Carousel>
      </section>

 {/* Categories Section */}
{/* Categories Section */}
<section className="xl:ml-7 ml-2 py-6 relative">
  <h2 className="text-base md:ml-2 md:text-xl xl:text-2xl ml-1 font-semibold mb-4">
    Browse By Category
  </h2>
  
  <div className="relative group">
    {/* Left Swipe Button */}
    <button
      onClick={() => scrollCategories('left')}
      className="hidden xl:block absolute left-1 top-1/2 -translate-y-1/2 z-10  bg-gray-100 border border-gray-400 shadow-2xl rounded-full p-4 cursor-pointer duration-500 transform hover:scale-110 active:scale-95"
      aria-label="Scroll left"
    >
      <FaChevronLeft className="text-black text-lg drop-shadow-sm" />
    </button>

    {/* Right Swipe Button */}
    <button
      onClick={() => scrollCategories('right')}
      className="hidden xl:block absolute right-1 top-1/2 -translate-y-1/2 z-10 bg-gray-100 border border-gray-400 shadow-2xl rounded-full p-4 cursor-pointer duration-500 transform hover:scale-110 active:scale-95"
      aria-label="Scroll right"
    >
      <FaChevronRight className="text-black text-lg drop-shadow-sm" />
    </button>

    {/* Categories Container */}
    <div 
      ref={categoryScrollRef}
      className="flex overflow-x-auto gap-5 py-2 xl:py-4 px-1 scrollbar-hide scroll-smooth"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {CATEGORIES.map((category, idx) => {
        const IconComponent = category.icon;
        return (
          <div key={idx} className="flex flex-col items-center w-[100px] min-w-[100px] max-w-[100px] cursor-pointer hover:text-[#332B4E] transition outline-1 outline-gray-300 rounded-full p-1 hover:bg-gray-100">
            <IconComponent size={30} className="text-lg mb-1 text-gray-700" />
            <span className="text-[11px] text-center truncate w-full">
              {category.name}
            </span>
          </div>
        );
      })}
    </div>
  </div>
</section>

      {/* Flash Deal Section */}
      <section className="my-6">
        <FlashDealSection
          deals={FLASH_DEALS}
          responsive={responsive}
          isMobile={isMobile}
        />
      </section>

      {/* Popular Store Section */}
      <section className="xl:ml-7 ml-2 py-8">
        <SectionHeader title="Popular Stores" href="/stores" />
        <div className="sm:px-2 grid grid-flow-col auto-cols-[42vw] gap-2 overflow-x-auto md:grid-cols-3 md:grid-flow-row md:auto-cols-auto md:overflow-x-visible lg:grid-cols-4 xl:grid-cols-6 scrollbar-hide">
          <StoresComp />
        </div>
      </section>

      {/* Loan & Credit Card Section */}
 <section className="xl:ml-7 ml-1.5 py-7 ">   
  <SectionHeader title="Loan & Card Deals" href="/bankingdeals" />      
  
  <div className="flex gap-4 overflow-x-auto lg:overflow-x-visible">     
    {/* Credit Cards */}     
    <div className="flex flex-col xl:flex-row min-w-[300px] sm:min-w-[340px] lg:min-w-0 lg:w-full bg-[#f5f8ff] p-2 rounded-2xl gap-3 flex-shrink-0 lg:flex-shrink">       
      <div className="flex gap-3 xl:gap-0 xl:flex-col items-center justify-center bg-gray-100 bg-opacity-40 rounded-xl px-3 py-2 text-center shadow-sm lg:min-w-fit">         
        <FaCreditCard className="text-4xl mb-2" />         
        <p className="text-base font-semibold text-center pb-2">Credit Cards</p>       
      </div>       
      <div className="grid grid-cols-2 gap-5 w-full">         
        <Loanandcardcomp items={CREDIT_CARDS} type="creditCard" />       
      </div>     
    </div>          
    
    {/* Bank Loans */}     
    <div className="flex flex-col xl:flex-row min-w-[300px] sm:min-w-[340px] lg:min-w-0 lg:w-full bg-[#f5f8ff] p-2 rounded-2xl gap-2 flex-shrink-0 lg:flex-shrink">       
      <div className="flex gap-3 xl:gap-0 xl:flex-col items-center justify-center bg-gray-100 bg-opacity-40 rounded-xl px-3 py-2 text-center shadow-sm lg:min-w-fit">         
        <FaMoneyBill className="text-4xl mb-2"/>         
        <p className="text-base font-semibold text-center pb-2">Bank Loans</p>       
      </div>       
      <div className="grid grid-cols-2 gap-5 w-full">         
        <Loanandcardcomp items={CREDIT_CARDS} type="loan" />       
      </div>     
    </div>   
  </div> 
</section>
      {/* Top Deal Sections */}
      <section className="xl:ml-7 ml-3 md:py-8 py-3 space-y-4 md:space-y-6">
        {["Flipkart", "Amazon", "Myntra"].map((brand) => (
          <TopDealComp
            key={brand}
            title={`${brand} - Top Deal`}
            slides={SLIDES}
            isMobile={isMobile}
            responsive={responsive}
          />
        ))}
        <TopDealComp
          title="Best - Lifetime free Credit Card"
          slides={SLIDES}
          isMobile={isMobile}
          responsive={responsive}
        />
      </section>

      {/* Cashback Steps Section */}
      <section className="xl:ml-9 ml-3 py-8">
        <h2 className="text-base md:text-xl font-semibold mb-3 md:mb-5">
          Four Steps To Save
        </h2>
        <div className="overflow-x-auto md:overflow-x-visible scrollbar-hide">
          <FourStepCahback />
        </div>
      </section>

        <section className="py-10 px-4 relative bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-black">
              Recent Posts
            </h2>
          </div>

          <div className="mb-8">
            <Carousel responsive={responsive} className="pb-4 cursor-pointer">
              {BLOGS.map((blog, idx) => (
                <div key={idx} className="px-2 md:px-3">
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full max-w-sm md:max-w-md lg:max-w-lg mx-auto">
                    <div className="relative p-1">
                      <Image
                        src={blog.image}
                        alt={blog.title}
                        width={500}
                        height={180}
                        className="rounded-xl h-40 sm:h-48 md:h-52 lg:h-56 xl:h-60 w-full object-cover"
                      />
                    </div>
                    <div className="p-3 sm:p-4 md:p-5">
                      <h3 className="text-lg sm:text-xl md:text-lg lg:text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                        {blog.title}
                      </h3>
                      <div className="mb-2 flex justify-between items-center">
                        <p className="text-sm sm:text-base md:text-sm lg:text-base text-gray-600 flex-1 mr-2">
                          Join me on adventure
                        </p>
                        <span className="text-gray-400 flex-shrink-0">&rarr;</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>

          <div className="text-center">
            <Link href="/blogs">
              <button
                type="button"
                className="inline-flex items-center px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 text-sm md:text-base font-medium rounded-full text-white bg-black hover:bg-gray-800 cursor-pointer focus:outline-none transition-colors duration-200"
              >
                View All Posts
                <FaArrowRight className="ml-2 -mr-1 w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      <WhyBonusify />
    </div>
  );
}
