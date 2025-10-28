import FourStepCahback from "@/components/FourStepCahback";
import StoresComp from "@/components/StoresComp";
import Head from "next/head";
import React, { useState } from "react";

function Stores() {
  const [activeFilter, setActiveFilter] = useState("Popular");

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    console.log(`Filtering by: ${filter}`);
  };

  return (
    <>
      <Head>
        <title>Best Cashback & Deals Stores 2025 | Shop & Save Money - Bonusify</title>
        <meta name="description" content="Discover 500+ top cashback stores offering up to 30% rewards. Shop from popular brands like Amazon, Flipkart, Myntra & earn money back on every purchase." />
        <link rel="canonical" href="https://bonusify.in/stores" />
        <meta property="og:title" content="Best Cashback Stores & Deals 2025 | Bonusify" />
        <meta property="og:description" content="Discover 500+ top cashback stores offering up to 30% rewards. Shop & earn money back on every purchase." />
        <meta property="og:image" content="https://bonusify.in/images/stores-og-image.jpg" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Best Cashback Stores & Deals 2025 | Bonusify" />
        <meta name="twitter:description" content="Discover 500+ top cashback stores offering up to 30% rewards. Shop & earn money back." />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Cashback Stores",
          "description": "Best cashback and deals stores for online shopping",
          "url": "https://bonusify.in/stores"
        }) }} />
      </Head>

      <div className="w-full mx-auto py-2 xl:px-8">
        <h1 className="text-xl font-bold text-gray-800 text-center mb-8">
          Top Cashback Stores
        </h1>

        {/* Stores Component with Filters and Pagination */}
        <div className="px-2 pb-4">
          <StoresComp 
            filterType={activeFilter}
            limit={null}
            showFilters={true}
            onFilterChange={handleFilterChange}
            enablePagination={true}
            initialLimit={25}
          />
        </div>

        <div className="px-3 my-10">
          <h2 className="text-base md:text-xl font-bold mb-3 md:mb-5">
            Four Steps To Save
          </h2>
          <div className="overflow-x-auto md:overflow-x-visible scrollbar-hide">
            <FourStepCahback />
          </div>
        </div>
      </div>
    </>
  );
}

export default Stores;