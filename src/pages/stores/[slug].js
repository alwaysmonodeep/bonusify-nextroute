import React, { useState, useEffect, useMemo, useCallback, memo } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { MdContentCopy } from "react-icons/md";
import dynamic from "next/dynamic";

// Lazy load with higher priority
const FourStepCahback = dynamic(() => import("@/components/FourStepCahback"), {
  loading: () => <div className="animate-pulse bg-gray-200 h-32 rounded-lg"></div>,
  ssr: false,
});

// Memoized Modal Component
const Modal = memo(({ isOpen, onClose, title, children }) => {
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
});

Modal.displayName = 'Modal';

// Memoized Offer Component
const OfferItem = memo(({ offer, index, copiedCoupon, onCopy }) => (
  <div key={index} className="rounded-xl p-1">
    <div className="flex gap-2 ">
      <div className="w-2 h-2 bg-gray-700 rounded-full mt-3 flex-shrink-0" />
      <p className="text-sm xl:text-base text-gray-900 mb-2">{offer.title}</p>
    </div>
    {offer.coupon && (
      <div className="flex items-center gap-2">
        <div className="border-dashed border-1 border-gray-500 ml-5 rounded px-2 py-1 bg-white">
          <span className="font-bold text-xs md:text-sm text-gray-700">{offer.coupon}</span>
        </div>
        <button
          onClick={() => onCopy(offer.coupon)}
          className="text-blue-600 hover:text-blue-700 flex items-center gap-2 md:ml-2 text-xs md:text-sm cursor-pointer">
          {copiedCoupon === offer.coupon ? 'Copied!' : 'Copy Code'}<MdContentCopy/>
        </button>
      </div>
    )}
  </div>
));

OfferItem.displayName = 'OfferItem';

// Memoized Carousel Component
const Carousel = memo(({ catalogue, brandName, currentSlide, setCurrentSlide }) => {
  if (!catalogue?.length) return null;

  return (
    <div className="bg-white rounded-xl overflow-hidden">
      <div className="relative">
        <div 
          className="flex transition-transform duration-500" 
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {catalogue.map((item, i) => (
            <img 
              key={i} 
              src={item.imageUrl} 
              alt={item.altText || brandName} 
              className="w-full h-[210px] sm:h-[290px] md:h-[390px] lg:h-[350px] xl:h-[390px] object-cover flex-shrink-0"
              loading={i === 0 ? "eager" : "lazy"}
              onError={(e) => e.target.src = '/images/placeholder.jpg'} 
            />
          ))}
        </div>
        {catalogue.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {catalogue.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setCurrentSlide(i)} 
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === currentSlide ? 'bg-white' : 'bg-white/50'
                }`} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

Carousel.displayName = 'Carousel';

export default function StorePage({ store, hasError, errorCode }) {
  const [modals, setModals] = useState({
    rewardRates: false,
    terms: false,
    allOffers: false
  });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [copiedCoupon, setCopiedCoupon] = useState(null);
  const router = useRouter();

  // Memoized helper functions
  const displayRate = useMemo(() => {
    if (!store?.deal) return '';
    return store.deal.maxRateType === "percentage" 
      ? `${store.deal.maxRateValue}%` 
      : store.deal.maxRateType === "fixed" 
        ? `₹${store.deal.maxRateValue}` 
        : "";
  }, [store?.deal]);

  const rewardType = useMemo(() => store?.deal?.type || 'Rewards', [store?.deal?.type]);

  const seoData = useMemo(() => {
    if (!store) return null;
    const title = `${store.brandName} Cashback & Offers | ${store.deal?.qualifier} ${displayRate} ${rewardType} on ${store.brandName}`;
    const description = `Get ${store.deal.qualifier} ${displayRate} ${rewardType} on ${store.brandName}. Shop through bonusify and earn rewards on every purchase.`;
    
    return {
      title,
      description,
      ogImage: store.branding?.logo || '/images/default-og.png',
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Store",
        "name": store.brandName,
        "image": store.branding?.logo,
        "url": store.url,
        "offers": {
          "@type": "Offer",
          "description": `Up to ${displayRate} cashback`
        }
      }
    };
  }, [store, displayRate, rewardType]);

  // Auto-slide for carousel
  useEffect(() => {
    if (!store?.catalogue?.length || store.catalogue.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % store.catalogue.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [store?.catalogue?.length]);

  // Memoized copy function
  const copyCoupon = useCallback(async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCoupon(code);
      setTimeout(() => setCopiedCoupon(null), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  }, []);

  // Memoized modal handlers
  const toggleModal = useCallback((modalName, value) => {
    setModals(prev => ({ ...prev, [modalName]: value }));
  }, []);

  // Loading state
  if (router.isFallback) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 rounded-full border-4 border-gray-600 border-t-transparent animate-spin"></div>
      </div>
    );
  }

  // Handle server-side errors
  if (hasError && errorCode) {
    const Error = require('next/error').default;
    return <Error statusCode={errorCode} />;
  }

  // Fallback error handling
  if (!store) {
    return (
      <>
        <Head>
          <title>Store Not Found | Bonusify</title>
          <meta name="description" content="The store you're looking for doesn't exist." />
          <meta name="robots" content="noindex" />
        </Head>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Store Not Found</h1>
            <p className="text-gray-600 mb-8">The store you're looking for doesn't exist.</p>
            <Link href={'/stores'} className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
              Back to Stores
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <link rel="canonical" href={`https://bonusify.in/stores/${router.query.slug}`} />
        <link rel="preconnect" href="https://bonusify.in" />
        <link rel="dns-prefetch" href="https://bonusify.in" />
        <meta property="og:title" content={seoData.title} />
        <meta property="og:description" content={seoData.description} />
        <meta property="og:image" content={seoData.ogImage} />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content={seoData.title} />
        <meta name="twitter:description" content={seoData.description} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(seoData.structuredData) }} />
      </Head>

      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-3 md:px-6 py-2 md:py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Desktop Sidebar */}
            <div className="hidden md:flex flex-col md:flex-row lg:flex-col gap-6">
              {/* Store Info Card */}
              <div className="bg-gray-50 rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex pb-6 items-center justify-between">
                  <Image 
                    src={store.branding?.logo || '/images/default-logo.png'} 
                    height={50} 
                    width={90} 
                    alt={store.brandName} 
                    className="object-contain max-h-[50px] max-w-[90px]"
                    priority
                  />
                  {store.branding?.badge && (
                    <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-lg">
                      {store.branding.badge}
                    </span>
                  )}
                </div>
                
                <div className="text-center mb-8 text-gray-800 text-2xl">
                  {store.deal?.maxRateValue?.toString().length < 4 && (
                    <span className="font-bold">{store.deal?.qualifier} </span>
                  )}
                  <span className="text-4xl font-bold text-green-600">{displayRate}</span>
                  <span className="font-bold"> {rewardType}</span>
                </div>
                
                <Link 
                  target="_blank"
                  href={store.url || "#"} 
                  className="w-full bg-gray-900 text-white py-3 px-2 rounded-lg font-semibold hover:bg-gray-700 transition-colors inline-block text-center text-sm xl:text-base"
                >
                  Earn {rewardType} on {store.brandName} →
                </Link>
                
                <button 
                  onClick={() => toggleModal('rewardRates', true)} 
                  className="w-full text-center text-sm font-medium text-gray-900 hover:text-gray-700 cursor-pointer mt-2"
                >
                  View Reward Rates
                </button>
              </div>

              {/* Top Offers Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h1 className="text-lg font-bold text-gray-900 mb-6">{store.brandName} Top Offers & Coupons</h1>
                {store.topOfferAndCoupon?.length > 0 ? (
                  <div className="space-y-3 font-medium">
                    {store.topOfferAndCoupon.slice(0, 2).map((offer, index) => (
                      <OfferItem 
                        key={index} 
                        offer={offer} 
                        index={index} 
                        copiedCoupon={copiedCoupon} 
                        onCopy={copyCoupon} />
                    ))}
                    {store.topOfferAndCoupon.length > 2 && (
                      <button
                        onClick={() => toggleModal('allOffers', true)}
                        className="text-base font-semibold text-[#0036DA] hover:text-blue-500 cursor-pointer mt-1"
                      >
                        View More ({store.topOfferAndCoupon.length - 2} more) →
                      </button>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-600">No offers available</p>
                )}
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Catalogue Carousel */}
              <Carousel 
                catalogue={store.catalogue} 
                brandName={store.brandName}
                currentSlide={currentSlide}
                setCurrentSlide={setCurrentSlide}
              />

              {/* Mobile Offers */}
              <div className="md:hidden bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <h3 className="text-sm font-bold text-gray-900 mb-6">{store.brandName} Top Offers & Coupons</h3>
                {store.topOfferAndCoupon?.length > 0 ? (
                  <div className="space-y-3 font-medium">
                    {store.topOfferAndCoupon.slice(0, 2).map((offer, index) => (
                      <OfferItem 
                        key={index} 
                        offer={offer} 
                        index={index} 
                        copiedCoupon={copiedCoupon} 
                        onCopy={copyCoupon} 
                      />
                    ))}
                    {store.topOfferAndCoupon.length > 2 && (
                      <button onClick={() => toggleModal('allOffers', true)} className="text-blue-600 text-sm">
                        View More ({store.topOfferAndCoupon.length - 2} more) →
                      </button>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-600">No offers available</p>
                )}
              </div>
              
              {/* Cashback Timeline */}
              {store.cashbackTimeline?.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 px-4 py-4 xl:py-8">
                  <h2 className="text-sm xl:text-xl font-bold text-gray-900 mb-6">Importent Timeline</h2>
                  <div className="grid grid-cols-2 gap-5">
                    {store.cashbackTimeline.map((item, i) => (
                      <div key={i} className="bg-gray-100 rounded-xl px-2 py-6 text-center">
                        <h3 className="text-gray-800 text-xs md:text-base font-semibold mb-2">
                          {item.milestone}
                        </h3>
                        <div className="text-xl md:text-4xl font-semibold text-gray-700 mb-2">
                          {item.duration}
                        </div>
                        <div className="text-gray-800 font-semibold text-xs md:text-base">
                          {item.unit}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Terms */}
              {store.termsAndConditions?.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                  <h3 className="text-sm xl:text-xl font-bold text-gray-900 mb-6">Terms & Conditions</h3>
                  <div className="space-y-4">
                    {store.termsAndConditions.slice(0, 3).map((condition, i) => (
                      <div key={i} className="flex gap-3">
                        <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0" />
                        <p className="text-gray-900 text-sm md:text-base leading-relaxed">{condition}</p>
                      </div>
                    ))}
                  </div>
                  {store.termsAndConditions.length > 3 && (
                    <button 
                      onClick={() => toggleModal('terms', true)} 
                      className="mt-6 cursor-pointer text-xs md:text-base font-semibold text-[#0036DA] hover:text-blue-500"
                    >
                      View All Terms & Conditions →
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modals */}
        <Modal isOpen={modals.allOffers} onClose={() => toggleModal('allOffers', false)} title="All Offers">
          <div className="space-y-3 text-xs md:text-base">
            {store.topOfferAndCoupon?.map((offer, index) => (
              <OfferItem 
                key={index} 
                offer={offer} 
                index={index} 
                copiedCoupon={copiedCoupon} 
                onCopy={copyCoupon} 
              />
            ))}
          </div>
        </Modal>

        {/* Reward Rates Modal */}
        <Modal isOpen={modals.rewardRates} onClose={() => toggleModal('rewardRates', false)} title="Reward Rates">
         <div className="space-y-4">
            {store.categoryRates?.length > 0 ? (
              store.categoryRates.map((rate, i) => (
                <div key={i} className="flex gap-3 items-center">
                  <div className="text-[#00A63E] font-semibold text-sm md:text-lg mt-1 min-w-[60px]">
                    {rate.rateType === "percentage" ? `${rate.rate}%` : 
                     rate.rateType === "fixed" ? `₹${rate.rate}` : rate.rate}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700 text-xs md:text-base leading-relaxed">
                      Cashback on {rate.category}
                    </p>
                    {rate.subcategories?.length > 0 && (
                      <p className="text-xs text-gray-500 mt-1">
                        {rate.subcategories.join(", ")}
                      </p>
                    )}
                    {rate.maxCashback && (
                      <p className="text-xs">
                        {rate.maxRateType === "percentage" ? `Max: ${rate.maxCashback}%` : 
                         rate.maxRateType === "fixed" ? `Max: ₹${rate.maxCashback}` : 
                         `Max: ${rate.maxCashback}`}
                      </p>
                    )}
                  </div>
                </div>
              ))
            ) : (
             <div className="flex gap-2">
                <div className="text-[#00A63E] font-bold text-xs md:text-base min-w-[60px]">
                  {store.deal?.primaryRateType === "percentage" ? `${store.deal?.primaryRate}%` : `₹${store.deal?.primaryRate || "N/A"}`}
                </div>
                <p className="text-gray-700">General Rewards</p>
              </div>
            )}
          </div>
        </Modal>

        {/* Terms Modal */}
        <Modal isOpen={modals.terms} onClose={() => toggleModal('terms', false)} title="Terms & Conditions">
          <div className="space-y-4">
            {store.termsAndConditions?.map((condition, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-2 h-2 bg-gray-700 rounded-full mt-2 flex-shrink-0" />
                <p className="text-gray-900 text-xs md:text-base leading-relaxed">{condition}</p>
              </div>
            ))}
          </div>
        </Modal>

        {/* Cashback Steps Section */}
        <div className="mx-auto max-w-7xl">
          <section className="xl:ml-9 ml-3 py-8">
            <div className="overflow-x-auto md:overflow-x-visible scrollbar-hide">
              <FourStepCahback />
            </div>
          </section>
        </div>

        {/* Mobile CTA */}
        <div className="fixed bottom-19 left-2 right-2 bg-gray-100 border border-gray-300 rounded-xl md:hidden z-10 shadow-lg">
          <div className="bg-gray-200 rounded-xl py-5 px-4">
            <div className="flex pb-6 items-center justify-between">
              <Image 
                src={store.branding?.logo || '/images/default-logo.png'} 
                height="40" 
                width="90" 
                alt={store.brandName} 
                className="object-contain max-h-[40px] max-w-[90px]" 
              />
              {store.branding?.badge && (
                <span className="px-2 py-1 bg-red-500 text-white text-[9px] font-bold rounded-lg">
                  {store.branding.badge}
                </span>
              )}
            </div>
            <div className="text-center mb-3 text-gray-800 space-x-1 text-lg">
              {store.deal?.maxRateValue?.toString().length < 4 && (
                <span className="font-semibold">{store.deal?.qualifier}</span>
              )}
              <span className="font-bold text-2xl text-green-600">{displayRate}</span>
              <span className="font-semibold">{rewardType}</span>
            </div>
            <Link 
              href={store.url || "#"} 
              className="w-full bg-gray-900 text-white py-3 px-2 rounded-lg font-semibold hover:bg-gray-700 transition-colors inline-block text-center text-xs"
            >
              Earn {rewardType} on {store.brandName} →
            </Link>
            <button 
              onClick={() => toggleModal('rewardRates', true)} 
              className="w-full text-center text-xs font-medium cursor-pointer text-gray-900 hover:text-gray-700 hover:underline mt-2"
            >
              View Reward Rates
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// Optimized Server-Side Rendering
export async function getServerSideProps(context) {
  const { slug } = context.params;
  
  // Set cache headers for better performance
  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=120'
  );
  
  try {
    const protocol = context.req.headers['x-forwarded-proto'] || 'http';
    const host = context.req.headers.host;
    const baseURL = `${protocol}://${host}`;
    
    // Add timeout to prevent hanging requests
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
    
    const response = await fetch(`${baseURL}/api/stores/${slug}`, {
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    clearTimeout(timeoutId);
    
    if (response.status === 404) {
      return { notFound: true };
    }
    
    if (!response.ok) {
      console.error(`API Error: ${response.status} - ${response.statusText}`);
      return {
        props: {
          store: null,
          hasError: true,
          errorCode: response.status,
        },
      };
    }
    
    const data = await response.json();
    
    if (!data.success || !data.data) {
      return { notFound: true };
    }
    
    return {
      props: {
        store: data.data,
        hasError: false,
        errorCode: null,
      }
    };
    
  } catch (error) {
    console.error('Error fetching store data:', error);
    
    return {
      props: {
        store: null,
        hasError: true,
        errorCode: 500,
      },
    };
  }
}