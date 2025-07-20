import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const companies = [
  {
    name: "Myntra",
    logo: "/images/brands/myntra.svg",
    badge: "Sale Live",
    cashback: "6%",
    qty: "Upto",
    type: "Cashback",
    terms: {
      rate: "6%",
      desc: "Cashback on all Orders | 10 times per user in a month",
      conditions: ["Only use coupon codes mentioned on CashKaro and mCaffeine website"]
    }
  },
  {
    name: "Flipkart",
    logo: "/images/brands/flipkart.png",
    badge: "Sale Live",
    cashback: "7%",
    qty: "Upto",
    type: "Cashback",
    terms: {
      rate: "7%",
      desc: "Cashback on all Orders | 8 times per user in a month",
      conditions: ["Valid only on purchases made through CashKaro links"]
    }
  },
  {
    name: "HDFC Bank",
    logo: "/images/brands/hdfc.png",
    cashback: "₹1100",
    type: "Rewards",
    terms: {
      rate: "₹1100",
      desc: "Welcome Bonus on Credit Card | One time per user",
      conditions: ["Valid only for new HDFC credit card applications"]
    }
  },
  {
    name: "Nykaa",
    logo: "/images/brands/nyakaa.svg",
    badge: "50% off",
    cashback: "7%",
    qty: "Upto",
    type: "Cashback",
    terms: {
      rate: "7%",
      desc: "Cashback on all Beauty Orders | 6 times per user in a month",
      conditions: [
        "Valid on beauty and personal care products only",
        "Cashback is applicable only 6 times per month for each user"
      ]
    }
  },
  {
    name: "Amazon",
    logo: "/images/brands/amazon.webp",
    badge: "Sale Live",
    cashback: "6%",
    qty: "Upto",
    type: "Reward",
    terms: {
      rate: "6%",
      desc: "Rewards on all Orders | 12 times per user in a month",
      conditions: ["Valid on most product categories except gift cards"]
    }
  },
  {
    name: "Zandu",
    logo: "/images/brands/zandu.png",
    badge: "Flat 35% Off",
    cashback: "18%",
    qty: "Flat",
    type: "Cashback",
    terms: {
      rate: "18%",
      desc: "Flat Cashback on all Health Products | 3 times per user in a month",
      conditions: ["Valid on all Zandu health and wellness products"]
    }
  },
  {
    name: "MakeMyTrip",
    logo: "/images/brands/makemytrip.png",
    cashback: "15%",
    qty: "Flat",
    type: "Cashback",
    terms: {
      rate: "15%",
      desc: "Flat Cashback on all Bookings | 2 times per user in a month",
      conditions: ["Valid on flights, hotels, and holiday packages"]
    }
  },
  {
    name: "boAt",
    logo: "/images/brands/boat.png",
    badge: "Sale Live",
    cashback: "5%",
    qty: "Flat",
    type: "Cashback",
    terms: {
      rate: "5%",
      desc: "Flat Cashback on all Audio Products | 5 times per user in a month",
      conditions: [
        "Valid on all boAt audio and lifestyle products",
        "Flat rate applies on all product categories"
      ]
    }
  },
  {
    name: "IndiGo",
    logo: "/images/brands/indigo.png",
    badge: "30% Off",
    cashback: "₹1000",
    type: "Cashback",
    terms: {
      rate: "₹1000",
      desc: "Fixed Cashback on Flight Bookings | 1 time per user in a month",
      conditions: [
        "Valid on domestic and international flight bookings",
        "Minimum booking value of ₹5000 required"
      ]
    }
  },
  {
    name: "Levi's",
    logo: "/images/brands/livis.svg",
    badge: "40% Off",
    cashback: "10%",
    qty: "Flat",
    type: "Cashback",
    terms: {
      rate: "10%",
      desc: "Flat Cashback on all Apparel | 4 times per user in a month",
      conditions: ["Valid on all Levi's jeans, shirts, and accessories"]
    }
  },
  {
    name: "OnePlus",
    logo: "/images/brands/oneplus.png",
    badge: "New Launch",
    cashback: "8%",
    qty: "Upto",
    type: "Cashback",
    terms: {
      rate: "8%",
      desc: "Cashback on all Smartphone Orders | 2 times per user in a month",
      conditions: ["Valid on OnePlus smartphones and accessories"]
    }
  },
  {
    name: "Samsung",
    logo: "/images/brands/samsung.png",
    badge: "Mega Sale",
    cashback: "12%",
    qty: "Upto",
    type: "Cashback",
    terms: {
      rate: "12%",
      desc: "Cashback on all Electronics | 3 times per user in a month",
      conditions: ["Valid on Samsung smartphones, TVs, and home appliances"]
    }
  }
];

export default () => {
  const [selectedBrand, setSelectedBrand] = useState(null);
return (
    <>
      {companies.map((brand, i) => (
        <Link key={i} href="#" className="h-full">
          <div className="bg-gray-100 border border-gray-200 rounded-xl p-3 pt-8 h-[160px] flex flex-col relative shadow-sm hover:shadow-lg hover:bg-gray-50 hover:border-green-500 transition-all cursor-pointer">
            {brand.badge && (
              <span className="absolute top-0 left-1/2 -translate-x-1/2 px-2 py-1 text-xs font-bold text-white rounded-b-xl bg-[#FF5A7B]">
                {brand.badge}
              </span>
            )}
            
            <div className="flex justify-between items-center flex-grow mt-2">
              <Image
                src={brand.logo}
                alt={brand.name}
                width={70}
                height={40}
                className="object-contain"
              />
              
              <div className="text-right">
                <div className="flex items-center font-semibold">
                  {brand.qty && <span className="text-sm">{brand.qty}</span>}
                  <span className="text-2xl text-green-600 ml-1">{brand.cashback}</span>
                </div>
                <span className="text-sm font-semibold">{brand.type}</span>
              </div>
            </div>
            
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setSelectedBrand(brand);
              }}
              className="text-xs underline text-left mt-auto cursor-pointer hover:text-gray-700 transition-colors"
            >
              Reward Rates & Terms
            </button>
          </div>
        </Link>
      ))}

      {selectedBrand && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="bg-gray-100 p-4 border-b border-gray-200 relative">
              <button
                onClick={() => setSelectedBrand(null)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-600 text-3xl font-bold"
              >
                ×
              </button>
              
              <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
                Cashback Rate & Terms
              </h2>

              <div className="flex items-center justify-center gap-4">
                <span className="text-xl font-semibold text-green-600">
                  {selectedBrand.terms.rate}
                </span>
                <span className="text-gray-600 font-semibold">
                  {selectedBrand.terms.desc}
                </span>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[40vh] space-y-4">
              {selectedBrand.terms.conditions.map((condition, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-gray-600 leading-relaxed">{condition}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};