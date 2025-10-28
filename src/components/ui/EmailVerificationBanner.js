"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resendVerificationEmail } from "@/store/slices/authSlice";
import { FiMail, FiX } from "react-icons/fi";

const EmailVerificationBanner = () => {
  const dispatch = useDispatch();
  const { profile, emailVerificationSent } = useSelector((state) => state.auth);
  const [dismissed, setDismissed] = useState(false);
  const [resending, setResending] = useState(false);

  if (dismissed || !profile || !profile.email || profile.email_verified) {
    return null;
  }

  const handleResend = async () => {
    setResending(true);
    await dispatch(resendVerificationEmail());
    setResending(false);
  };

  return (
    <div className="bg-[#111111] border-l-4 p-3 md:p-3.5 relative z-10">
      <div className="flex items-center justify-center relative flex-wrap gap-2 md:gap-4 text-center md:text-left">
        {/* Icon + Text + Button in one line for all screens */}
        <div className="flex items-center justify-center flex-wrap gap-2 md:gap-3">
          <FiMail className="text-base sm:text-lg md:text-xl text-white" />

          <p className="text-xs sm:text-sm text-gray-100 whitespace-nowrap">
            <span className="font-medium">
              Verify your email to complete your registration -
            </span>
          </p>

          <button
            onClick={handleResend}
            disabled={resending || emailVerificationSent}
            className="text-sm font-semibold border-b cursor-pointer  hover:border-white text-white hover:text-gray-300"
          >
            {resending
              ? "Sending..."
              : emailVerificationSent
              ? "Email sent! Check your inbox"
              : "Resend verification email"}
          </button>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setDismissed(true)}
          className="absolute right-3 top-0.5 text-white hover:text-gray-400 cursor-pointer transition-colors"
        >
          <FiX className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default EmailVerificationBanner;
