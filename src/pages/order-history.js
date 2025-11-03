"use client";
import React, { useEffect, useState } from "react";
import { MdCheckCircle, MdCancel, MdAccessTime, MdHelpOutline } from "react-icons/md";
import Image from "next/image";

const orders = [
  { id: 1, name: "Nutech Auto Repair", transactionId: "2362510859", date: "04 Apr, 2019", amount: "220.50", reward: "5.50", status: "pending", icon: "/images/brands/boat.png" },
  { id: 2, name: "Refer", transactionId: "2362510859", date: "04 Apr, 2019", amount: "4,230.50", reward: "20.00", status: "success", icon: "/images/brands/boat.png" },
  { id: 3, name: "Add Money to Wallet", transactionId: "2362510859", date: "04 Apr, 2019", amount: "2,500.00", reward: "0.00", status: "declined", icon: "/images/brands/boat.png" },
  { id: 4, name: "Vancouver Euro Exotic", transactionId: "2362510859", date: "04 Apr, 2019", amount: "2,190.50", reward: "15.75", status: "success", icon: "/images/brands/boat.png" },
];

const statusIcons = {
  success: { icon: MdCheckCircle, text: "Success", color: "text-green-600" },
  declined: { icon: MdCancel, text: "Declined", color: "text-red-600" },
  pending: { icon: MdAccessTime, text: "Pending", color: "text-gray-600" },
};

const OrderPage = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={`min-h-screen bg-white my-5 mb-8 sm:mb-12 sm:pt-5 px-3 sm:px-6 lg:px-10 pb-0 transition-all duration-700 ease-out ${
        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gray-100 rounded-2xl shadow-sm mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="text-black px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex flex-row flex-wrap items-center justify-between gap-2 sm:gap-4">
            <div className="flex-1 min-w-0">
              <h2 className="text-sm sm:text-xl font-semibold mb-0 sm:mb-2">
                Order History
              </h2>
              <p className="text-xs sm:text-sm text-black">
                Orders are updated within 72 hours
              </p>
            </div>
            <select className="flex-shrink-0 w-34 sm:w-auto border rounded-md px-3 sm:px-4 py-2 bg-white outline-0 text-black border-gray-300 text-sm sm:text-base">
              <option>March 2025</option>
              <option>February 2025</option>
              <option>January 2025</option>
              <option>December 2024</option>
            </select>
          </div>
        </div>

        {/* Order Table */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden transition-all duration-700 ease-out">
          <div className="bg-[#332B4E] text-white px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between">
            <div className="flex-1 font-medium text-sm sm:text-base">Order ID</div>
            <div className="flex-1 font-medium text-center text-sm sm:text-base">Amount</div>
            <div className="flex-1 font-medium text-center text-sm sm:text-base">Reward</div>
          </div>

          <div className="divide-y divide-gray-100">
            {orders.length === 0 ? (
              <div className="px-4 sm:px-6 lg:px-8 py-12 text-center">
                <MdHelpOutline className="mx-auto w-12 h-12 text-gray-400 mb-4" />
                <h3 className="text-md font-medium text-gray-900 mb-2">
                  No orders to show
                </h3>
                <p className="text-gray-500">
                  Your order history will appear here once you make your first purchase.
                </p>
              </div>
            ) : (
              orders.map((order) => {
                const { icon: Icon, text, color } = statusIcons[order.status];
                return (
                  <div
                    key={order.id}
                    className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 hover:bg-gray-50 transition-all duration-500"
                  >
                    <div className="flex items-center">
                      <div className="flex-1 flex items-center space-x-2 sm:space-x-4">
                        <div className="hidden md:flex flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gray-100 rounded-full items-center justify-center overflow-hidden">
                          <Image
                            src={order.icon}
                            alt="Order icon"
                            width={30}
                            height={48}
                            className="rounded-full object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs lg:text-sm text-gray-500 truncate">
                            OID: {order.transactionId}
                          </p>
                          <p className="text-xs lg:text-sm text-gray-400 hidden sm:block">
                            {order.date}
                          </p>
                        </div>
                      </div>
                      <div className="flex-1 text-center">
                        <span className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900">
                          ₹{order.amount}
                        </span>
                      </div>
                      <div className="flex-1 text-center">
                        <span className="text-sm sm:text-base lg:text-lg font-semibold text-green-600">
                          ₹{order.reward}
                        </span>
                        <div className="flex items-center justify-center space-x-1 sm:space-x-2 mt-1">
                          <Icon className={`w-3 h-3 sm:w-4 sm:h-4 ${color}`} />
                          <span className={`font-medium text-xs sm:text-xs lg:text-sm ${color}`}>
                            {text}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
