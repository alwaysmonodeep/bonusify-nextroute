import Link from "next/link";
import React from "react";
import { LuHistory, LuUserPlus,LuWalletMinimal,LuClock4 } from "react-icons/lu";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import PendCashback from "@/components/PendCashback";
import Head from "next/head";
const WalletDashboard = () => {
  return (
    <div className="min-h-screen px-2 py-8 md:px-6">
       <Head>
        <title>Wallet-Bonusify</title>
      </Head>
      <div className="max-w-6xl mx-auto">
        {/* Wallet Balance Section */}
        <div className="bg-gray-100 rounded-2xl shadow-lg border border-gray-200 px-4 py-8 mb-8 relative z-0 overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full -translate-y-16 translate-x-16"></div>

          <div className="flex justify-between items-center relative z-10">
            <div className="">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-[#332B4E] rounded-lg">
                  <LuWalletMinimal className="text-white text-lg md:text-xl" />
                </div>
                <div className="flex flex-col">
                <p className="md:text-lg text-md font-semibold text-black">
                  Bonusify Wallet
                </p>
                <p className="md:text-sm text-xs  text-black">
                  Current Balance
                </p></div>
              </div>
              <h2 className="py-2 pl-2 text-4xl md:text-5xl font-bold text-[#00A63E] mb-2">
                ₹<span className="text-5xl md:text-6xl">2</span>
              </h2>
              <p className="flex text-sm font-medium text-gray-600 bg-gray-200 px-3 py-2 rounded-lg ">
                💡 Earnings Will Show Here <span className="hidden md:block pl-1">After Cashback Get Confirmed</span>
              </p>
            </div>
            <div className="flex flex-col pt-10 gap-3">
              <Link href={'/withdrawl'}><button className="bg-[#332B4E] cursor-pointer text-xs md:text-sm text-white px-5 md:px-6 py-3 rounded-xl font-semibold">
                Withdraw Now
              </button></Link>
              <div className="text-xs text-gray-500 text-center">Min: ₹100</div>
            </div>
          </div>
       
        </div>

        {/* Transaction Details Section */}
    <div className="bg-gray-100 p-2 md:p-4 rounded-lg relative overflow-hidden shadow-sm">
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full -translate-y-16 -translate-x-16"></div>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 py-6">
            {/* Confirmed Cashback */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 md:h-10 md:w-10 xl:w-12 xl:h-12 bg-[#332B4E] rounded-full flex items-center justify-center flex-shrink-0">
                <RiMoneyRupeeCircleFill className="text-xl text-white" />
              </div>
              <div>
                <p className="text-gray-700 text-xs md:text-sm font-medium mb-1">
                  Total cashback:
                </p>
                <p className="text-2xl font-bold text-black">₹111</p>
              </div>
            </div>

            {/* Pending Cashback */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 md:h-10 md:w-10 xl:w-12 xl:h-12 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
                <LuClock4 className="text-xl text-white" />
              </div>
              <div>
                <p className="text-gray-700 text-xs md:text-sm font-medium mb-1">
                  Pending cashback:
                </p>
                <p className="text-2xl font-bold text-gray-500">₹0</p>
              </div>
            </div>

            {/* Confirmed Rewards */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 md:h-10 md:w-10 xl:w-12 xl:h-12 bg-[#332B4E] rounded-full flex items-center justify-center flex-shrink-0">
                <LuUserPlus className="texl-xl text-white" />
              </div>
              <div>
                <p className="text-gray-700 text-xs md:text-sm font-medium mb-1">
                  Total referrals:
                </p>
                <p className="text-2xl font-bold text-black">₹10</p>
              </div>
            </div>

            {/* Pending Rewards */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 md:h-10 md:w-10 xl:w-12 xl:h-12 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
                <LuClock4 className="texl-xl text-white" />
              </div>
              <div>
                <p className="text-gray-700 text-sm font-medium mb-1">
                  Pending referrals:
                </p>
                <p className="text-xl font-bold text-gray-500">₹0</p>
              </div>
            </div>
          </div>
        </div>

        {/* Gap between sections */}
        <div className="h-6"></div>

        {/* Pending Cashback Section */}
        <div>
          <PendCashback/>
        </div>
        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <Link href={"/wallet-history"}>
            <button className="bg-[#332B4E] text-white cursor-pointer px-5 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 shadow-lg">
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
