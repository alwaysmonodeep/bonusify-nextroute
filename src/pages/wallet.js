"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { LuHistory, LuUserPlus, LuWalletMinimal, LuClock4 } from "react-icons/lu";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import PendCashback from "@/components/PendCashback";

const WalletDashboard = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen px-3 py-8 md:px-6 bg-white">
      <Head>
        <title>Wallet - Bonusify</title>
      </Head>

      <div
        className={`max-w-6xl mx-auto transition-all duration-700 ease-out ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {/* Wallet Balance Section */}
        <div className="bg-gray-100 rounded-2xl shadow-lg border border-gray-200 px-4 py-8 mb-8 relative z-0 overflow-hidden">
          {/* Decorative background */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full -translate-y-16 translate-x-16"></div>

          <div className="flex justify-between items-center relative z-10">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 md:p-3 bg-[#332B4E] rounded-lg">
                  <LuWalletMinimal className="text-white text-md md:text-xl" />
                </div>
                <div className="flex flex-col">
                  <p className="md:text-lg text-sm font-semibold text-black">
                    Bonusify Wallet
                  </p>
                  <p className="md:text-sm text-xs text-black">
                    Current Balance
                  </p>
                </div>
              </div>

              <h2 className="py-2 pl-2 text-4xl md:text-5xl font-bold text-[#00A63E] mb-2">
                ₹<span className="text-4xl md:text-5xl">2</span>
              </h2>

              <p className="flex text-xs md:text-sm font-medium text-gray-600 bg-gray-200 px-3 py-2 rounded-lg">
                💡 Earnings Will Show Here{" "}
                <span className="hidden md:block pl-1">
                  After Cashback Get Confirmed
                </span>
              </p>
            </div>

            <div className="flex flex-col pt-10 gap-3">
              <Link href={"/withdrawl"}>
                <button className="bg-[#332B4E] cursor-pointer text-xs md:text-sm text-white px-4 md:px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:opacity-90">
                  Withdraw Now
                </button>
              </Link>
              <div className="text-xs text-gray-500 text-center">Min: ₹100</div>
            </div>
          </div>
        </div>

        {/* Transaction Details Section */}
        <div className="bg-gray-100 p-1 md:p-4 rounded-lg relative overflow-hidden shadow-sm transition-all duration-700 ease-out delay-100 transform hover:scale-[1.01]">
          <div className="absolute top-0 left-0 w-30 h-30 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full -translate-y-16 -translate-x-16"></div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6 space-y-4 md:space-y-2 px-2 py-4">
            {/* Total Cashback */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 md:h-10 md:w-10 xl:w-12 xl:h-12 bg-[#332B4E] rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                <RiMoneyRupeeCircleFill className="text-xl text-white" />
              </div>
              <div>
                <p className="text-gray-700 text-xs md:text-sm font-medium mb-1">
                  Total cashback:
                </p>
                <p className="text-xl md:text-2xl font-semibold text-black">
                  ₹111
                </p>
              </div>
            </div>

            {/* Pending Cashback */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 md:h-10 md:w-10 xl:w-12 xl:h-12 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                <LuClock4 className="text-xl text-white" />
              </div>
              <div>
                <p className="text-gray-700 text-xs md:text-sm font-medium mb-1">
                  Pending cashback:
                </p>
                <p className="text-xl md:text-2xl font-semibold text-gray-500">
                  ₹0
                </p>
              </div>
            </div>

            {/* Total Referrals */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 md:h-10 md:w-10 xl:w-12 xl:h-12 bg-[#332B4E] rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                <LuUserPlus className="text-xl text-white" />
              </div>
              <div>
                <p className="text-gray-700 text-xs md:text-sm font-medium mb-1">
                  Total referrals:
                </p>
                <p className="text-xl md:text-2xl font-semibold text-black">
                  ₹10
                </p>
              </div>
            </div>

            {/* Pending Referrals */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 md:h-10 md:w-10 xl:w-12 xl:h-12 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                <LuClock4 className="text-xl text-white" />
              </div>
              <div>
                <p className="text-gray-700 text-xs md:text-sm font-medium mb-1">
                  Pending referrals:
                </p>
                <p className="text-xl md:text-2xl font-semibold text-gray-500">
                  ₹0
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Cashback Section */}
        <div
          className={`transition-all duration-700 ease-out delay-150 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <PendCashback />
        </div>

        {/* Action Buttons */}
        <div
          className={`flex justify-center gap-4 mb-8 transition-all duration-700 ease-out delay-200 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Link href={"/wallet-history"}>
            <button className="bg-[#332B4E] text-xs md:text-base text-white cursor-pointer px-5 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-3 shadow-lg hover:opacity-90">
              <LuHistory className="text-xl" />
              Wallet History
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WalletDashboard;
