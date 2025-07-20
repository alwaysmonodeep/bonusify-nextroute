import React from 'react';
import {FaSignInAlt,FaShoppingBag,FaWallet,FaMoneyCheckAlt,} from "react-icons/fa";

const Step_Data = [
    {
      icon: <FaSignInAlt size={20} color="#332B4E" />,
      title: "Log In & Click",
      desc: "Click your favourite Product & Store",
    },
    {
      icon: <FaShoppingBag size={20} color="#e74c3c" />,
      title: "Shop Seamlessly",
      desc: "Shop from your favourite sotre",
    },
    {
      icon: <FaWallet size={20} color="#332B4E" />,
      title: "Cashback Earned",
      desc: "Cashback gets added to your Bonusify wallet",
    },
    {
      icon: <FaMoneyCheckAlt size={20} color="#e74c3c" />,
      title: "Withdraw Cashback",
      desc: "To your bank account, or as a voucher, recharge",
    },
  ];

function FourStepCahback() {
  return (
    <div>
        <div className="flex gap-3 md:gap-5 justify-around">
          {Step_Data.map((step, idx) => (
            <div
              key={idx}
              className="relative border border-gray-200 rounded-xl p-2 md:p-4 flex flex-col items-center text-center min-w-[45vw] md:w-1/3 md:min-w-0 max-w-xs flex-shrink-0 md:flex-shrink shadow-sm"
            >
              <span className="absolute top-3 right-2 md:-top-3 md:right-4 bg-white border border-[#edeaff] text-[#00A63E] font-bold rounded-xl px-2 py-0.5 text-base md:text-lg shadow-md z-10">
                {idx + 1}
              </span>
              <div className="w-8 h-8 md:w-14 md:h-14 rounded-full bg-[#eaf7f2] flex items-center justify-center mb-2 md:mb-3">
                {step.icon}
              </div>
              <div>
                <span className="font-bold text-sm xl:text-base">
                  {step.title}
                </span>
                <div className="text-gray-700 text-xs lg:text-sm">
                  {step.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
    </div>
  )
}
export default FourStepCahback