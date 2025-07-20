import React, { useState } from "react";
import {
  FaShoppingBag,
  FaWhatsapp,
  FaCopy,
  FaGift,
  FaShareAlt,
   FaMoneyBill} from "react-icons/fa";

const ReferEarnSection = () => {
  const [activeTab, setActiveTab] = useState("refer");

  const handleWhatsAppShare = () => {
    const message = encodeURIComponent(
      "Check out this amazing cashback app! You can earn money while shopping. Use my referral link to get started!"
    );
    const whatsappUrl = `https://wa.me/?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleReferralLinkShare = () => {
    navigator.clipboard
      .writeText("https://bonusify.in?r=9872065&fn...")
      .then(() => {
        alert("Referral link copied to clipboard!");
      });
  };

  const steps = [
    {
      icon: <FaShareAlt  className="w-6 h-6 text-gray-800" />,
      title: "Share referral link with friends",
      description: "Your friends should sign up on bonusify using your referal link"
    },
    {
      icon: <FaShoppingBag className="w-6 h-6 text-gray-800" />,
      title: "Your 3 friends shop at least once",
      description: "Each friend needs to make at least one purchase via bonusify"
    },
    {
      icon: < FaMoneyBill className="w-6 h-6 text-gray-800" />,
      title: "You get flat ₹50 cashback",
      description: "Earn ₹50 for every 3 successful referrals - cycle continues"
    },
  ];

  const ReferNowTab = () => (
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
      {/* Left Section - How it works */}
      <div className="space-y-6 lg:space-y-8 border bg-gray-50 border-slate-200 rounded-xl p-6 lg:p-8">
        <div className="space-y-3">
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-900">
            How This Works?
          </h2>
        </div>

        <div className="space-y-8 lg:space-y-12">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start space-x-4 group">
              <div className="flex-shrink-0 w-10 h-10 lg:w-12 lg:h-12 bg-slate-100 rounded-lg flex items-center justify-center group-hover:bg-slate-200 transition-colors duration-200">
                {step.icon}
              </div>
              <div className="flex-1 pt-1 lg:pt-2">
                <h3 className="font-semibold text-slate-900 text-base lg:text-lg mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm lg:text-base">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Example Section */}
        <div className="bg-gray-100 border border-slate-200 rounded-xl p-4 lg:p-6">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <p className="text-slate-800 font-medium mb-1 text-sm lg:text-base">
                Example: Refer 3 friends → They each shop once → You get ₹50!
              </p>
              <p className="text-slate-600 text-xs lg:text-sm">
                Complete 3 successful referrals and the cycle repeats for continuous earnings.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Action Buttons */}
      <div className="space-y-6 lg:space-y-8 w-full max-w-md mx-auto lg:mx-0">
        <div className="text-center space-y-2">
          <h3 className="text-xl lg:text-2xl font-bold text-slate-900">
            Start Earning Today
          </h3>
        </div>

        {/* Referral Link Section */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 lg:p-6 shadow-sm">
          <h4 className="text-base lg:text-lg font-semibold text-slate-900 mb-4">
            Your Referral Link
          </h4>
          <div className="bg-slate-50 rounded-lg border border-slate-200 p-3 lg:p-4 flex items-center justify-between">
            <div className="flex-1 min-w-0 mr-3">
              <p className="text-slate-600 text-xs lg:text-sm truncate font-mono">
                https://bonusify.in?r=9872065&fn...
              </p>
            </div>
            <button
              onClick={handleReferralLinkShare}
              className="text-slate-700 hover:text-slate-900 font-medium text-xs lg:text-sm flex items-center space-x-1 lg:space-x-2 px-2 lg:px-3 py-1.5 rounded-md hover:bg-slate-100 transition-colors duration-200 flex-shrink-0"
            >
              <span>Copy</span>
              <FaCopy className="w-3 h-3 lg:w-4 lg:h-4" />
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center space-x-4 text-slate-400">
          <div className="flex-1 h-px bg-slate-200"></div>
          <span className="text-sm font-medium">OR</span>
          <div className="flex-1 h-px bg-slate-200"></div>
        </div>

        {/* Share Options */}
        <div className="space-y-3">
          <button
            onClick={handleWhatsAppShare}
            className="w-full bg-[#20B038] hover:bg-[#1a8f2e] text-white font-medium py-3 lg:py-4 px-4 lg:px-6 rounded-xl flex items-center justify-center space-x-2 lg:space-x-3 transition-colors duration-200 shadow-sm"
          >
            <FaWhatsapp className="w-4 h-4 lg:w-5 lg:h-5" />
            <span className="text-sm lg:text-base">Share via WhatsApp</span>
          </button>
           <p className="text-blue-500 text-sm hover:underline cursor-pointer text-center">View Terms</p>
        </div>
       
      </div>
    </div>
  );

  const MyReferralsTab = () => (
    <div className="w-full border-1 rounded-xl border-gray-200 max-w-4xl mx-auto space-y-6 lg:space-y-8 p-4">
      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 lg:p-6">
          <h3 className="text-slate-600 font-medium mb-3 text-sm lg:text-base">Total Referral Cashback Earned</h3>
          <div className="text-2xl lg:text-3xl font-bold text-[#00A63E]">₹0</div>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 lg:p-6">
          <h3 className="text-slate-600 font-medium mb-3 text-sm lg:text-base">Number of Friends Joined</h3>
          <div className="text-2xl lg:text-3xl font-bold text-blue-600">0</div>
        </div>
      </div>

      {/* Referral Illustration */}
      <div className="text-center py-4 lg:py-6 relative overflow-hidden">
        <div className="relative inline-block mb-6 lg:mb-8">
          {/* Phone illustration */}
          <div className="w-32 h-52 sm:w-40 sm:h-64 lg:w-48 lg:h-80 bg-white border-2 lg:border-4 border-slate-200 rounded-2xl lg:rounded-3xl mx-auto relative shadow-lg">
            <div className="w-4 h-4 lg:w-6 lg:h-6 bg-[#332B4E] rounded-full mx-auto mt-2 lg:mt-4 mb-1 lg:mb-2"></div>
            <div className="flex items-center justify-center h-32 sm:h-40 lg:h-48">
              <div className="text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2 lg:mb-4">
                  <div className="text-blue-600 text-lg sm:text-xl lg:text-2xl">📢</div>
                </div>
                <div className="text-xs lg:text-xs text-slate-600 font-medium">Refer</div>
                <div className="text-xs lg:text-xs text-slate-600 font-medium">Three Friend</div>
              </div>
            </div>
            <div className="absolute bottom-2 lg:bottom-4 left-1/2 transform -translate-x-1/2 w-8 lg:w-12 h-0.5 lg:h-1 bg-slate-300 rounded-full"></div>
          </div>

          {/* Floating avatars - Hidden on mobile, shown on larger screens */}
          <div className="hidden sm:block">
            <div className="absolute -top-2 -left-4 sm:-top-4 sm:-left-8 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-slate-100 rounded-full border-2 border-white shadow-md flex items-center justify-center">
              <div className="text-slate-400 text-xs sm:text-sm lg:text-base">👤</div>
            </div>
            <div className="absolute top-4 -right-4 sm:top-8 sm:-right-8 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-slate-100 rounded-full border-2 border-white shadow-md flex items-center justify-center">
              <div className="text-slate-400 text-xs sm:text-sm lg:text-base">👤</div>
            </div>
            <div className="absolute -bottom-8 -left-2 sm:-bottom-12 sm:-left-4 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-slate-100 rounded-full border-2 border-white shadow-md flex items-center justify-center">
              <div className="text-slate-400 text-xs sm:text-sm lg:text-base">👤</div>
            </div>
            <div className="absolute -bottom-6 -right-2 sm:-bottom-8 sm:-right-4 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-slate-100 rounded-full border-2 border-white shadow-md flex items-center justify-center">
              <div className="text-slate-400 text-xs sm:text-sm lg:text-base">👤</div>
            </div>
          </div>

          {/* Coins and gift boxes */}
          <div className="absolute -bottom-2 left-1/4 w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-md">
            <span className="text-xs sm:text-sm">₹</span>
          </div>
          <div className="absolute -bottom-2 right-1/4 w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-blue-500 rounded-sm flex items-center justify-center shadow-md">
            <FaGift className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-white" />
          </div>

          {/* Floating icons - Hidden on mobile, shown on larger screens */}
          <div className="hidden lg:block">
            <div className="absolute top-1/4 -left-12 text-slate-300 text-xl">💬</div>
            <div className="absolute top-1/3 -right-12 text-slate-300 text-xl">📱</div>
            <div className="absolute bottom-1/4 -left-16 text-slate-300 text-xl">🎁</div>
            <div className="absolute bottom-1/3 -right-16 text-slate-300 text-xl">💰</div>
          </div>
        </div>

        <div className="space-y-3 lg:space-y-4 px-4 lg:px-0">
          <h3 className="text-lg lg:text-xl font-bold text-slate-900">Nothing yet!</h3>
          <div className="space-y-2">
            
            <p className="text-slate-600 text-sm lg:text-base">
              Refer 3 friend today and get <span className="text-[#00A63E] font-semibold">₹50</span> back when they make one purchase.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
  
  return (
    <div className="min-h-screen w-full max-w-7xl mx-auto p-4 lg:p-8 bg-white">
      {/* Tab Navigation */}
      <div className="flex justify-center mb-6 lg:mb-8">
        <div className="bg-slate-100 rounded-lg p-1 flex w-full max-w-sm sm:w-auto">
          <button
            onClick={() => setActiveTab("refer")}
            className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-3 rounded-md font-medium transition-colors duration-200 text-sm sm:text-base ${
              activeTab === "refer"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Refer Now
          </button>
          <button
            onClick={() => setActiveTab("referrals")}
            className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-3 rounded-md font-medium transition-colors duration-200 text-sm sm:text-base ${
              activeTab === "referrals"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            My Referrals
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px] lg:min-h-[600px]">
        {activeTab === "refer" ? <ReferNowTab /> : <MyReferralsTab />}
      </div>
    </div>
  );
};

export default ReferEarnSection;