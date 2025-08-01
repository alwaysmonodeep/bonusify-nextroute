import React from 'react'
import { FiChevronRight } from "react-icons/fi";
import { FiDownload, FiClock } from "react-icons/fi";
import Image from "next/image";

function PendCashback() {
      const pendingReward = [
    {
      id: 1,
      cashback: 5.6,
      orderId: "OD3347031656726871",
      logo: "/images/brands/boat.png",
    },
    {
      id: 2,
      cashback: 5.6,
      orderId: "OD3347031656726871",
      logo: "/images/brands/flipkart.png",
    },
    {
      id: 3,
      cashback: 7,
      orderId: "OD3346403279270451",
      logo: "/images/brands/oneplus.png",
    },
  ];
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8">
             {/* Header */}
             <div className="bg-gray-100 border-b border-gray-200 p-4">
               <div className="flex items-center justify-between">
                 <div className="flex items-center gap-5">
                   <div className="p-3 bg-[#332B4E] rounded-xl shadow-md">
                     <FiClock className="text-white texl-xl md:text-xl" />
                   </div>
                   <div>
                     <h3 className="text-base md:text-xl font-bold text-gray-900 mb-1">Pending Cashbacks</h3>
                     <p className="text-gray-600 text-xs md:text-sm">Track your upcoming rewards</p>
                   </div>
                 </div>
                 <div className="hidden sm:flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg shadow-sm">
                   <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                   <span className="text-sm font-medium text-gray-700">{pendingReward.length} Pending</span>
                 </div>
               </div>
             </div>
   
             {/* Orders List */}
             <div className="">
               {pendingReward.map((order) => (
                 <div key={order.id}>
                   <div className="border border-gray-100 rounded-lg p-4 flex items-center justify-between cursor-pointer hover:bg-gray-100 transition-colors">
                     {/* Left Side - Logo and Details */}
                     <div className="flex items-center space-x-4">
                       {/* Flipkart Logo Placeholder */}
                       <div className="flex-shrink-0 w-8 h-8 sm:w-12 sm:h-12 bg-gray-100 rounded-full flex items-center justify-center">                     
                           <Image
                             src={order.logo}
                             alt="Order icon"
                             width={25}
                             height={48}
                             className="rounded-full object-cover"
                             onError={(e) => {
                               e.target.style.display = "none";
                               e.target.nextSibling.style.display = "block";
                             }}
                           />
                       </div>
   
                       {/* Order Details */}
                       <div>
                         <p className="text-sm md:text-base font-semibold text-black mb-1">
                           Cashback : <span className='text-green-600'>₹{order.cashback}</span>
                         </p>
                         <p className="text-gray-600 text-xs">
                           OID: {order.orderId}
                         </p>
                         <p className="text-gray-600 text-xs py-1">Expected Date: 04 Apr,2026</p>
                       </div>
                     </div>
   
                     {/* Right Side - Status and Arrow */}
                      <div className="flex items-center">
                           <div className="bg-gray-100 border border-gray-200 rounded-xl px-4 py-2.5 flex items-center gap-2 shadow-sm">
                             <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                             <span className="text-gray-700 font-semibold text-xs md:text-sm">Pending</span>
                           </div>
                           <div className=" rounded-full hover:bg-gray-100 transition-colors duration-200">
                             <FiChevronRight className="w-5 h-5 text-gray-500 " />
                           </div>
                         </div>
                   </div>
                 </div>
               ))}
             </div>
           </div>
  )
}

export default PendCashback