import { FaMoneyBillWave, FaShoppingCart, FaGift } from 'react-icons/fa';
import React from 'react'

function WhyBonusify() {
  const benefitsData = [
    {
      id: 1,
      icon: FaMoneyBillWave,
      title: "Earn Real Cashback",
      description: "Get up to 25% cashback on every purchase from 1000+ popular brands. Your shopping pays you back!"
    },
    {
      id: 2,
      icon: FaShoppingCart,
      title: "Shop Your Favorites",
      description: "Access deals from Amazon, Flipkart, Myntra, Nykaa, and hundreds of other trusted retailers all in one place."
    },
    {
      id: 3,
      icon: FaGift,
      title: "Exclusive Offers",
      description: "Get access to member-only deals, bonus cashback events, and special promotions you won't find anywhere else."
    }
  ];

  const statsData = [
    {
      id: 1,
      value: "1000+",
      label: "Partner Brands"
    },
    {
      id: 2,
      value: "25%",
      label: "Max Cashback"
    },
    {
      id: 3,
      value: "72hrs",
      label: "Cashback Processing"
    }
  ];

  return (
    <div className="py-10 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-600 mb-2">
            Why Choose <span className="text-[#332B4E]">Bonusify</span>?
          </h2>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {benefitsData.map((benefit) => {
            const IconComponent = benefit.icon;
            return (
              <div key={benefit.id} className="bg-white rounded-lg border border-gray-100 p-4 ">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg mb-4 mx-auto">
                  <IconComponent className="w-6 h-6 text-[#332B4E]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 text-center">
                  {benefit.title}
                </h3>
                <p className="text-gray-700 text-center text-xs">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-full border border-gray-100 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {statsData.map((stat, index) => (
              <div key={stat.id} className={`${index < statsData.length - 1 ? 'md:border-r border-gray-200' : ''}`}>
                <div className="text-2xl font-bold text-[#332B4E] mb-1">{stat.value}</div>
                <div className="text-gray-600 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default WhyBonusify