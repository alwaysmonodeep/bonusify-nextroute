import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { companies } from '../data/companies'; // Import from your data file

export default function StoresComponent() {
  const [selectedBrand, setSelectedBrand] = useState(null);

  return (
    <>
      {companies.map((brand, i) => (
        <Link key={brand.id} href={`/stores/${brand.slug}`} className="h-full">
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

      {/* Simple Modal like screenshot */}
      {selectedBrand && (
        <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="bg-gray-100 p-4 border-b border-gray-200 relative">
              <button
                onClick={() => setSelectedBrand(null)}
                className="cursor-pointer absolute top-4 right-4 p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-600 text-3xl font-bold"
              >
                ×
              </button>
              
              <h2 className="text-lg md:text-xl xl:text-2xl font-semibold text-gray-800 text-center mb-1">
                Reward Rates & Terms
              </h2>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)] space-y-4">
              {selectedBrand.terms.cashbackSlabs && selectedBrand.terms.cashbackSlabs.length > 0 ? (
                selectedBrand.terms.cashbackSlabs.map((slab, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="text-[#00A63E] font-bold text-lg mt-1 min-w-[60px]">
                      {slab.rate}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-700 text-xs md:text-base leading-relaxed">
                        Cashback on {slab.category}
                        {slab.maxCashback && ` (Max Cashback: ${slab.maxCashback})`}
                        {slab.minOrder && ` (Min Order: ${slab.minOrder})`}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex gap-3">
                  <div className="text-[#00A63E] font-bold text-lg mt-1 min-w-[60px]">
                    {selectedBrand.terms.rate}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700 text-xs md:text-base leading-relaxed">
                      {selectedBrand.terms.desc}
                    </p>
                  </div>
                </div>
              )}
               <div className="p-6  max-h-[40vh] mt-10 border-t border-gray-600 space-y-4">
              {selectedBrand.terms.conditions.map((condition, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-gray-600 text-xs md:text-base leading-relaxed">{condition}</p>
                </div>
              ))}
            </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}