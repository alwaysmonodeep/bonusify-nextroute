import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { companies } from "../../data/companies";
import Image from "next/image";

// Modal Component
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
        <div className="bg-gray-100 p-4 border-b border-gray-200 relative">
          <button
            onClick={onClose}
            className="cursor-pointer absolute top-4 right-4 p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-600 text-3xl font-bold"
          >
            ×
          </button>
          <h2 className="text-lg md:text-xl xl:text-2xl font-semibold text-gray-800 text-center">
            {title}
          </h2>
        </div>
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default function StorePage() {
  const [showRewardRates, setShowRewardRates] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();
  const { slug } = router.query;

  const store = companies.find((company) => company.slug === slug);

  // Auto-slide for store benefits
  useEffect(() => {
    if (store?.benefits?.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % store.benefits.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [store?.benefits?.length]);

  if (router.isFallback) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  // Store not found
  if (!store) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Store Not Found</h1>
          <p className="text-gray-600 mb-8">The store you're looking for doesn't exist.</p>
          <Link
            href="/stores"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Back to Stores
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-3 md:px-6 py-4 md:py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Sidebar */}
          <div className="hidden md:flex justify-evenly xl:justify-normal flex-col md:flex-row lg:flex-col xl:flex-col gap-4">
            {/* Store Info Card */}
            <div className="bg-gray-50 rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex pb-6 items-center justify-between">
                <Image src={store.logo} height="50" width="90" alt={store.name} className="object-contain max-h-[50px] max-w-[90px]" />
                {store.badge && (
                  <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-lg">
                    {store.badge}
                  </span>
                )}
              </div>
              
              <div className="text-center mb-8 text-gray-800 space-x-1 text-2xl">
                {store.qty && <span className="font-bold">{store.qty}</span>}
                <span className="text-[#00A63E] text-4xl font-bold">{store.cashback}</span>
                <span className="font-bold">{store.type}</span>
              </div>
              
              <Link
                href="#"
                className="w-full bg-gray-900 text-white py-3 px-2 rounded-lg font-semibold hover:bg-gray-700 transition-colors inline-block text-center text-sm xl:text-base"
              >
                Earn {store.type} on {store.name} →
              </Link>
              
              <button
                onClick={() => setShowRewardRates(true)}
                className="w-full text-center text-sm font-medium cursor-pointer text-gray-900 hover:text-gray-700 hover:underline mt-2"
              >
                View Reward Rates
              </button>
            </div>

            {/* How it Works */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">How it Works</h3>
              <div className="space-y-4 text-sm text-gray-600">
                {[
                  `Click on "Earn Cashback" button to visit ${store.name}`,
                  `Complete your purchase on ${store.name} website or app`,
                  `Get ${store.type.toLowerCase()} credited to your Wallet`,
                  `Use your ${store.type.toLowerCase()} to make recharges or cash out`, 
                ].map((text, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="w-6 h-6 bg-gray-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-sm md:text-base">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8"> 
            {/* Store Benefits Carousel */}
            {store.benefits?.length > 0 && (
              <div className="bg-white rounded-xl overflow-hidden">
                <div className="relative">
                  {/* Images */}
                  <div 
                    className="flex transition-transform duration-500"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                    {store.benefits.map((benefit, i) => (
                      <img
                        key={i}
                        src={benefit.image}
                        alt={benefit.alt}
                        className="w-full h-[260px] sm:h-[290px] md:h-[390px] lg:h-[350px] xl:h-[390px] object-fit flex-shrink-0"
                        onError={(e) => e.target.src = 'https://via.placeholder.com/600x300/f3f4f6/9ca3af?text=Image+Not+Available'}
                      />
                    ))}
                  </div>
                  
                  {/* Controls - only if multiple images */}
                  {store.benefits.length > 1 && (
                    <>                 
                      {/* Dots */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                        {store.benefits.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setCurrentSlide(i)}
                            className={`w-2 h-2 rounded-full transition-colors ${
                              i === currentSlide ? 'bg-white' : 'bg-white/50'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
             
            {/* Timeline Section */}
            {store.timeline && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 px-4 py-6 xl:py-8">
                <h2 className="text-lg xl:text-xl font-bold text-gray-900 mb-6">Important Timelines</h2>
                <div className="grid grid-cols-2 gap-6 p-1">
                  {store.timeline.map((item, index) => (
                    <div key={index} className="bg-gray-100 rounded-xl py-2 md:py-3 text-center relative">
                      <h3 className="text-gray-800 text-sm md:text-base font-semibold mb-2">{item.title}</h3>
                      <div className="text-2xl md:text-4xl font-semibold text-gray-700 mb-2">{item.value}</div>
                      <div className="text-gray-800 font-semibold text-sm md:text-base">{item.unit}</div>
                      {index < store.timeline.length - 1 && (
                        <div className="hidden md:block absolute -right-3 top-1/2 transform -translate-y-1/2">
                          <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                            <span className="text-gray-600 text-sm">→</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* How it Works - Mobile */}
            <div className="md:hidden bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">How it Works</h3>
              <div className="space-y-4 text-sm text-gray-600">
                {[
                  `Click on "Earn Cashback" button to visit ${store.name}`,
                  `Complete your purchase on ${store.name} website or app`,
                  `Get ${store.type.toLowerCase()} credited to your Wallet`,
                  `Use your ${store.type.toLowerCase()} to make recharges or cash out`, 
                ].map((text, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="w-6 h-6 bg-gray-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <p>{text}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Terms Section */}
            {store.terms && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <h3 className="text-lg xl:text-xl font-bold text-gray-900 mb-6">Terms & Conditions</h3>
                <div className="space-y-4">
                  {store.terms.conditions.map((term, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="w-2 h-2 bg-gray-500 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-gray-700 text-sm md:text-base leading-relaxed">{term}</p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setShowTerms(true)}
                  className="mt-8 inline-flex text-md font-semibold cursor-pointer text-[#0036DA] hover:text-gray-700"
                >
                  View All Terms & Conditions →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reward Rates Modal */}
      <Modal
        isOpen={showRewardRates}
        onClose={() => setShowRewardRates(false)}
        title="Reward Rates">
        <div className="space-y-4">
          {store.terms?.cashbackSlabs?.length > 0 ? (
            store.terms.cashbackSlabs.map((slab, i) => (
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
                {store.terms?.rate || 'N/A'}
              </div>
              <div className="flex-1">
                <p className="text-gray-700 leading-relaxed">
                  {store.terms?.desc || 'No description available'}
                </p>
              </div>
            </div>
          )}
        </div>
      </Modal>

      {/* Terms Modal */}
      <Modal
        isOpen={showTerms}
        onClose={() => setShowTerms(false)}
        title="Terms & Conditions"
      >
        <div className="space-y-4">
          {store.terms?.conditions?.map((condition, i) => (
            <div key={i} className="flex gap-3">
              <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
              <p className="text-gray-600 text-xs md:text-base leading-relaxed">{condition}</p>
            </div>
          ))}
        </div>
      </Modal>
      
      {/* Fixed Bottom Section for Mobile */}
      <div className="fixed bottom-19 left-2 right-2 bg-white border border-gray-200 rounded-xl md:hidden z-50 shadow-lg">
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="flex pb-8 items-center justify-between">
            <Image src={store.logo} height="40" width="90" alt={store.name} className="object-contain max-h-[40px] max-w-[90px]" />
            {store.badge && (
              <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-lg">
                {store.badge}
              </span>
            )}
          </div>
          
          <div className="text-center mb-4 text-gray-800 space-x-1 text-xl">
            {store.qty && <span className="font-bold">{store.qty}</span>}
            <span className="text-[#00A63E] text-3xl font-bold">{store.cashback}</span>
            <span className="font-bold">{store.type}</span>
          </div>
          
          <Link
            href="#"
            className="w-full bg-gray-900 text-white py-2 px-2 rounded-lg font-semibold hover:bg-gray-700 transition-colors inline-block text-center text-sm"
          >
            Earn {store.type} on {store.name} →
          </Link>
          
          <button
            onClick={() => setShowRewardRates(true)}
            className="w-full text-center text-xs font-medium cursor-pointer text-gray-900 hover:text-gray-700 hover:underline mt-2"
          >
            View Reward Rates
          </button>
        </div>
      </div>
    </div>
  );
}

// Static generation functions
export async function getStaticPaths() {
  const paths = companies.map((company) => ({
    params: { slug: company.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const store = companies.find((company) => company.slug === params.slug);

  if (!store) {
    return { notFound: true };
  }

  return { props: { store } };
}