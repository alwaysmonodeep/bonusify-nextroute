"use client";
import React, { useEffect, useState } from "react";
import { FaUser, FaSignOutAlt, FaCheck, FaPhoneAlt, FaTimes, FaEdit } from "react-icons/fa";
import { MdMail, MdLock } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { 
  sendOTPAction, 
  verifyOTPAction, 
  resendVerificationEmail,
  updateUserProfile,
  updateUserPhone,
  updateUserPin,
  deleteUserAccount
} from "@/store/slices/authSlice";
import { supabase } from "@/lib/superbase";
import { useRouter } from "next/router";
import Head from "next/head";

// Validation utilities
const validators = {
  phone: (phone) => {
    const digits = String(phone).replace(/\D/g, "");
    return digits.length === 10 && ["6", "7", "8", "9"].includes(digits[0]);
  },
  pin: (pin) => {
    if (!/^\d{4,6}$/.test(pin)) return false;
    if (/^(\d)\1+$/.test(pin)) return false;
    return !["1234", "0000", "1111"].includes(pin);
  },
};

const deleteReasons = [
  { value: "not_useful", label: "Not useful anymore" },
  { value: "temporary_account", label: "Created for temporary use" },
  { value: "technical_issues", label: "Technical issues" },
  { value: "other", label: "Other reason" },
];

export default function MyAccountSection() {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.auth);
  const isAuthenticated = !!profile;
  const router = useRouter();

  const [personalDetails, setPersonalDetails] = useState({
    fname: "",
    mobile: "",
    pin: "",
  });

  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("personal");

  // OTP states
  const [otpFlow, setOtpFlow] = useState({
    active: false,
    field: null,
    step: 1,
    otp: "",
    newValue: "",
    timer: 0,
  });

  // Delete account states
  const [deleteFlow, setDeleteFlow] = useState({
    step: 0,
    reason: "",
    otherReason: "",
    otp: "",
    timer: 0,
  });

  const [errors, setErrors] = useState({});
  const [isResendingEmail, setIsResendingEmail] = useState(false);

  useEffect(() => {
    if (isAuthenticated && profile) {
      setPersonalDetails({
        fname: profile.full_name || profile.name || "User",
        email: profile.email || "",
        mobile: profile.phone || "",
        pin: profile.pin || "",
      });
    }
  }, [isAuthenticated, profile]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (otpFlow.timer > 0) {
      const interval = setInterval(() => {
        setOtpFlow((prev) => ({ ...prev, timer: prev.timer - 1 }));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [otpFlow.timer]);

  useEffect(() => {
    if (deleteFlow.timer > 0) {
      const interval = setInterval(() => {
        setDeleteFlow((prev) => ({ ...prev, timer: prev.timer - 1 }));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [deleteFlow.timer]);

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 2500);
  };

  const validateField = (field, value) => {
    const newErrors = { ...errors };
    
    switch (field) {
      case "mobile":
        if (!validators.phone(value)) {
          newErrors.mobile = "Invalid phone (10 digits, starts with 6-9)";
        } else {
          delete newErrors.mobile;
        }
        break;
      case "pin":
        if (!validators.pin(value)) {
          newErrors.pin = "PIN must be 4-6 digits, not all same, not 1234/0000";
        } else {
          delete newErrors.pin;
        }
        break;
    }
    
    setErrors(newErrors);
    return !newErrors[field];
  };

  const handleSendOTP = async (phoneNumber) => {
    try {
      const result = await dispatch(sendOTPAction(phoneNumber)).unwrap();
      if (result.success) {
        setOtpFlow((prev) => ({
          ...prev,
          timer: 120,
        }));
        showMessage(`OTP sent to ${phoneNumber}`);
        return true;
      }
      return false;
    } catch (error) {
      showMessage(error || "Failed to send OTP");
      return false;
    }
  };

  const handleSendDeleteOTP = async () => {
    try {
      if (!profile?.phone) {
        showMessage("Session expired. Please login again.");
        return false;
      }

      const result = await dispatch(sendOTPAction(profile.phone)).unwrap();
      if (result.success) {
        setDeleteFlow((prev) => ({
          ...prev,
          step: 3,
          timer: 120,
          otp: "",
        }));
        showMessage(`OTP sent to ${profile.phone}`);
        return true;
      }
      return false;
    } catch (error) {
      showMessage(error || "Failed to send OTP");
      return false;
    }
  };

  const handleVerifyDeleteOTP = async () => {
    try {
      if (!profile?.phone) {
        showMessage("Session expired. Please login again.");
        return;
      }

      await dispatch(
        verifyOTPAction({ phone: profile.phone, otp: deleteFlow.otp })
      ).unwrap();

      await handleDeleteAccount();
    } catch (error) {
      setErrors({ ...errors, deleteOtp: error || "Wrong OTP entered" });
      showMessage(error || "Wrong OTP entered");
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const phoneToVerify = otpFlow.step === 1 
        ? profile.phone 
        : otpFlow.newValue;

      await dispatch(
        verifyOTPAction({ phone: phoneToVerify, otp: otpFlow.otp })
      ).unwrap();

      if (otpFlow.step === 1) {
        setOtpFlow({ ...otpFlow, step: 2, otp: "", timer: 0 });
        setErrors({});
        showMessage("Verified! Enter new value");
      } else if (otpFlow.step === 3) {
        await updateFieldValue(otpFlow.field, otpFlow.newValue);
      }
    } catch (error) {
      setErrors({ ...errors, otp: error || "Wrong OTP entered" });
      showMessage(error || "Wrong OTP entered");
    }
  };

  const handleStartSecureEdit = async (field) => {
    try {
      const result = await dispatch(sendOTPAction(profile.phone)).unwrap();
      
      if (result.success) {
        setOtpFlow({
          active: true,
          field,
          step: 1,
          otp: "",
          newValue: "",
          timer: 120,
        });
        showMessage(`OTP sent to ${profile.phone}`);
      }
    } catch (error) {
      showMessage(error || "Failed to send OTP");
    }
  };

  const handleResendVerification = async () => {
    setIsResendingEmail(true);
    try {
      await dispatch(resendVerificationEmail()).unwrap();
      showMessage("Verification email sent! Check your inbox.");
    } catch (error) {
      showMessage(error || "Failed to send verification email");
    } finally {
      setIsResendingEmail(false);
    }
  };

  const handleNewValueSubmit = async () => {
    const { field, newValue } = otpFlow;
    
    const isValid = validateField(field, newValue);
    if (!isValid) {
      showMessage("Please enter a valid value");
      return;
    }

    const currentValue = field === "mobile" ? profile.phone : profile.pin;
    if (newValue === currentValue) {
      showMessage("New value cannot be same as current");
      return;
    }

    setIsUpdating(true);
    
    try {
      if (field === "mobile") {
        const sent = await handleSendOTP(newValue);
        if (sent) {
          setOtpFlow((prev) => ({ ...prev, step: 3, otp: "" }));
        }
      } else {
        await updateFieldValue(field, newValue);
      }
    } catch (error) {
      showMessage("Failed to proceed");
    } finally {
      setIsUpdating(false);
    }
  };

  const updateFieldValue = async (field, value) => {
    setIsUpdating(true);
    try {
      let result;
      
      if (field === "mobile") {
        result = await dispatch(updateUserPhone({ userId: profile.id, phone: value })).unwrap();
      } else if (field === "pin") {
        result = await dispatch(updateUserPin({ 
          userId: profile.id, 
          currentPin: null,
          newPin: value 
        })).unwrap();
      }
      
      setPersonalDetails({
        ...personalDetails,
        [field]: value,
      });
      
      setOtpFlow({ active: false, field: null, step: 1, otp: "", newValue: "", timer: 0 });
      showMessage(`${field.charAt(0).toUpperCase() + field.slice(1)} updated successfully!`);
    } catch (error) {
      showMessage(error || "Update failed");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleUpdate = async () => {
    if (!hasChanges()) return;
    setIsUpdating(true);
    
    try {
      await dispatch(
        updateUserProfile({
          userId: profile.id,
          fullName: personalDetails.fname,
        })
      ).unwrap();
      
      showMessage("Personal details updated!");
    } catch (error) {
      showMessage(error || "Update failed");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsUpdating(true);
    try {
      await dispatch(
        deleteUserAccount({
          userId: profile.id,
          uid: profile.uid,
          reason: deleteFlow.reason,
          otherReason: deleteFlow.otherReason,
        })
      ).unwrap();

      window.location.href = "/";
    } catch (error) {
      showMessage(error || "Failed to delete account");
      setDeleteFlow({ step: 0, reason: "", otherReason: "", otp: "", timer: 0 });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleLogout = async () => {
    if (!window.confirm("Are you sure you want to logout?")) return;

    try {
      await supabase.auth.signOut();
      localStorage.removeItem("persist:auth");
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith("sb-")) localStorage.removeItem(key);
      });
      window.location.href = "/auth/login";
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed. Please try again.");
    }
  };

  const hasChanges = () => {
    return personalDetails.fname !== (profile?.full_name || profile?.name);
  };

  return (
    <>
    <Head>
  <title>My Account | Manage Your Profile and Settings</title>
  <meta
    name="description"
    content="Manage your account details, update your profile, and control your preferences securely in your My Account section."
  />
  <meta property="og:title" content="My Account | Manage Your Profile and Settings" />
  <meta
    property="og:description"
    content="Easily manage your profile, update your phone or email, and secure your account settings."
  />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://yourdomain.com/account" />
  <meta property="og:image" content="https://yourdomain.com/og-image.png" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://yourdomain.com/account" />
</Head>

    <div className="min-h-screen bg-white py-6 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gray-100">
                <FaUser className="text-3xl text-gray-900" />
              </div>

              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-900 mb-1">
                  {isAuthenticated
                    ? profile?.full_name || profile?.name
                    : "Guest User"}
                </h4>
                <p className="text-xs text-gray-500 mb-4">Account Holder</p>

                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center mr-3">
                      <MdMail className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {profile?.email || "N/A"}
                      </p>
                      <p className="text-xs text-gray-500">Email</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center mr-3">
                      <FaPhoneAlt className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {profile?.phone || "N/A"}
                      </p>
                      <p className="text-xs text-gray-500">Mobile</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Account Status</span>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    isAuthenticated
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                      isAuthenticated ? "bg-green-500" : "bg-yellow-500"
                    }`}
                  ></div>
                  {isAuthenticated ? "Active" : "Guest"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab("personal")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "personal"
                    ? "border-gray-900 text-gray-900"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Personal Details
              </button>
            </nav>
          </div>

          {/* OTP Modal */}
          {otpFlow.active && (
            <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center z-50">
              <div className="bg-white shadow-xl rounded-xl p-6 max-w-md w-full mx-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">
                    {otpFlow.step === 1 && "Verify Current Number"}
                    {otpFlow.step === 2 && `Enter New ${otpFlow.field === "mobile" ? "Phone Number" : "PIN"}`}
                    {otpFlow.step === 3 && "Verify New Number"}
                  </h3>
                  <button
                    onClick={() => setOtpFlow({ active: false, field: null, step: 1, otp: "", newValue: "", timer: 0 })}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FaTimes />
                  </button>
                </div>

                {otpFlow.step === 2 ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Enter New {otpFlow.field === "mobile" ? "Phone Number" : "PIN"}
                      </label>
                      <input
                        type={otpFlow.field === "pin" ? "password" : "text"}
                        value={otpFlow.newValue}
                        onChange={(e) => {
                          setOtpFlow({ ...otpFlow, newValue: e.target.value });
                          setErrors({ ...errors, [otpFlow.field]: undefined });
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        placeholder={
                          otpFlow.field === "mobile" 
                            ? "10 digit phone" 
                            : "4-6 digit PIN"
                        }
                      />
                      {errors[otpFlow.field] && (
                        <p className="text-red-500 text-xs mt-1">{errors[otpFlow.field]}</p>
                      )}
                    </div>
                    <button
                      onClick={handleNewValueSubmit}
                      disabled={!otpFlow.newValue || isUpdating}
                      className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      {isUpdating ? "Processing..." : "Continue"}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                      OTP sent to {otpFlow.step === 1 ? profile.phone : otpFlow.newValue}
                    </p>
                    <div>
                      <input
                        type="text"
                        maxLength="6"
                        value={otpFlow.otp}
                        onChange={(e) => {
                          setOtpFlow({ ...otpFlow, otp: e.target.value.replace(/\D/g, "") });
                          setErrors({ ...errors, otp: undefined });
                        }}
                        className={`w-full px-4 py-3 border rounded-lg text-center text-2xl tracking-widest ${
                          errors.otp ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="------"
                      />
                      {errors.otp && (
                        <p className="text-red-500 text-xs mt-1 text-center">{errors.otp}</p>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">
                        {otpFlow.timer > 0 ? `Resend in ${otpFlow.timer}s` : ""}
                      </span>
                      {otpFlow.timer === 0 && (
                        <button
                          onClick={() => handleSendOTP(otpFlow.step === 1 ? profile.phone : otpFlow.newValue)}
                          className="text-gray-900 hover:underline font-medium"
                        >
                          Resend OTP
                        </button>
                      )}
                    </div>
                    <button
                      onClick={handleVerifyOTP}
                      disabled={otpFlow.otp.length < 4 || isUpdating}
                      className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      {isUpdating ? "Verifying..." : "Verify OTP"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Delete Account Modal */}
          {deleteFlow.step > 0 && (
            <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center z-50 p-4">
              <div className="bg-white shadow-xl rounded-2xl max-w-md w-full mx-4 overflow-hidden">
                {/* Step 1: Reason Selection */}
                {deleteFlow.step === 1 && (
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                        Why are you leaving?
                      </h3>
                      <button
                        onClick={() => setDeleteFlow({ step: 0, reason: "", otherReason: "", otp: "", timer: 0 })}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <FaTimes className="w-5 h-5" />
                      </button>
                    </div>

                    <p className="text-xs md:text-sm text-gray-600 mb-6">
                      We'd love to know why you're deleting your account. Your feedback helps us improve.
                    </p>

                    <div className="space-y-3 mb-6">
                      {deleteReasons.map((reason) => (
                        <label
                          key={reason.value}
                          className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            deleteFlow.reason === reason.value
                              ? "border-red-500 bg-red-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <input
                            type="radio"
                            name="deleteReason"
                            value={reason.value}
                            checked={deleteFlow.reason === reason.value}
                            onChange={(e) =>
                              setDeleteFlow({ ...deleteFlow, reason: e.target.value })
                            }
                            className="w-4 h-4 text-red-600 focus:ring-red-500"
                          />
                          <span className="ml-3 text-xs md:text-sm text-gray-700">{reason.label}</span>
                        </label>
                      ))}
                    </div>

                    {deleteFlow.reason === "other" && (
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Please tell us more
                        </label>
                        <textarea
                          value={deleteFlow.otherReason}
                          onChange={(e) =>
                            setDeleteFlow({ ...deleteFlow, otherReason: e.target.value })
                          }
                          placeholder="Help us understand your reason..."
                          rows="3"
                          className="w-full text-xs md:text-sm px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 outline-0 focus:border-transparent resize-none"
                        />
                      </div>
                    )}

                    <div className="flex gap-3">
                      <button
                        onClick={() => setDeleteFlow({ step: 0, reason: "", otherReason: "", otp: "", timer: 0 })}
                        className="flex-1 cursor-pointer text-xs md:text-sm px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => setDeleteFlow({ ...deleteFlow, step: 2 })}
                        disabled={!deleteFlow.reason || (deleteFlow.reason === "other" && !deleteFlow.otherReason.trim())}
                        className="flex-1 cursor-pointer text-xs md:text-sm px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Confirmation */}
                {deleteFlow.step === 2 && (
                  <div className="p-6">
                    <div className="flex flex-col items-center mb-6 relative">
                      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                        <svg
                          className="w-8 h-8 text-red-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                          />
                        </svg>
                      </div>
                      <button
                        onClick={() => setDeleteFlow({ step: 0, reason: "", otherReason: "", otp: "", timer: 0 })}
                        className="absolute top-0 right-0 text-gray-400 hover:text-gray-600"
                      >
                        <FaTimes className="w-5 h-5" />
                      </button>
                    </div>

                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 text-center mb-3">
                      Are you sure you want to delete your account permanently?
                    </h3>

                    <p className="text-xs md:text-sm text-gray-600 text-center mb-6">
                      By doing this, your account will be deleted permanently and you will not be able to recover your account anymore.
                    </p>

                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                      <h4 className="text-sm font-semibold text-red-900 mb-2">
                        This action will:
                      </h4>
                      <ul className="text-xs md:text-sm text-red-700 space-y-2">
                        <li>• You will loss access to all associated data including your earnings history, saved payment details</li>
                        <li>• Pending or confirmed cashback/rewards will be automatically cancelled</li>                      
                        <li>• You will not recive new user offers if you sign up again using the same mobile number or email ID.</li>
                      </ul>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setDeleteFlow({ ...deleteFlow, step: 1 })}
                        className="flex-1 cursor-pointer text-sm md:text-sm px-4 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
                      >
                        Go Back
                      </button>
                      <button
                        onClick={handleSendDeleteOTP}
                        disabled={isUpdating}
                        className="flex-1 cursor-pointer text-sm px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
                      >
                        {isUpdating ? "Processing..." : "Verify & Delete"}
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: OTP Verification */}
                {deleteFlow.step === 3 && (
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                        Verify Your Identity
                      </h3>
                      <button
                        onClick={() => setDeleteFlow({ step: 0, reason: "", otherReason: "", otp: "", timer: 0 })}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <FaTimes className="w-5 h-5" />
                      </button>
                    </div>

                    <p className="text-xs md:text-sm text-gray-600 mb-6">
                      For security purposes, please enter the OTP sent to <span className="font-semibold">{profile?.phone}</span> to confirm account deletion.
                    </p>

                    <div className="space-y-4">
                      <div>
                        <input
                          type="text"
                          maxLength="6"
                          value={deleteFlow.otp}
                          onChange={(e) => {
                            setDeleteFlow({ ...deleteFlow, otp: e.target.value.replace(/\D/g, "") });
                            setErrors({ ...errors, deleteOtp: undefined });
                          }}
                          className={`w-full px-4 py-3 border rounded-lg text-center text-2xl tracking-widest ${
                            errors.deleteOtp ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="------"
                        />
                        {errors.deleteOtp && (
                          <p className="text-red-500 text-xs mt-1 text-center">{errors.deleteOtp}</p>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">
                          {deleteFlow.timer > 0 ? `Resend in ${deleteFlow.timer}s` : ""}
                        </span>
                        {deleteFlow.timer === 0 && (
                          <button
                            onClick={handleSendDeleteOTP}
                            className="text-red-600 hover:underline font-medium"
                          >
                            Resend OTP
                          </button>
                        )}
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => setDeleteFlow({ ...deleteFlow, step: 2, otp: "", timer: 0 })}
                          className="flex-1 cursor-pointer text-xs md:text-sm px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                        >
                          Go Back
                        </button>
                        <button
                          onClick={handleVerifyDeleteOTP}
                          disabled={deleteFlow.otp.length < 4 || isUpdating}
                          className="flex-1 cursor-pointer text-xs md:text-sm px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
                        >
                          {isUpdating ? "Deleting..." : "Confirm Delete"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "personal" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={personalDetails.fname}
                  onChange={(e) =>
                    setPersonalDetails({ ...personalDetails, fname: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl"
                />

                <div className="relative">
                  <input
                    type="tel"
                    placeholder="Mobile Number"
                    value={personalDetails.mobile}
                    disabled
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-gray-50 pr-12"
                  />
                  <button
                    onClick={() => handleStartSecureEdit("mobile")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900"
                    title="Edit Mobile"
                  >
                    <FaEdit className="w-4 h-4" />
                  </button>
                </div>

                <div className="relative">
                  <input
                    type="password"
                    placeholder="Login PIN"
                    value={personalDetails.pin}
                    disabled
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-gray-50 pr-12"
                  />
                  <button
                    onClick={() => handleStartSecureEdit("pin")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900"
                    title="Edit PIN"
                  >
                    <FaEdit className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {message && (
                <div className="flex items-center text-green-600 text-sm">
                  <FaCheck className="w-4 h-4 mr-2" />
                  {message}
                </div>
              )}

              <button
                onClick={handleUpdate}
                disabled={isUpdating || !hasChanges()}
                className="bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-sm font-medium"
              >
                {isUpdating ? "Updating..." : "Update Details"}
              </button>
            </div>
          )}
        </div>

        <button
          onClick={handleLogout}
          className="flex xl:hidden items-center ml-5 text-sm md:text-base text-red-600 cursor-pointer mt-6 rounded-lg hover:bg-gray-100 transition-colors font-medium"
        >
          <FaSignOutAlt className="w-4 h-4 mr-2 text-red-600" />
          Logout
        </button>

        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-sm md:text-lg font-semibold py-1 text-gray-900">Delete Account</h3>
              <p className="text-gray-600 text-xs md:text-sm">Permanently delete your account and all data</p>
            </div>
            <button
              onClick={() => setDeleteFlow({ step: 1, reason: "", otherReason: "", otp: "", timer: 0 })}
              className="flex-shrink-0 flex text-xs md:text-sm cursor-pointer items-center bg-red-600 text-white py-2 px-3 md:px-4 rounded-lg hover:bg-red-700 transition-colors font-medium whitespace-nowrap"
            >
              <FaSignOutAlt className="w-3 h-3 md:w-4 md:h-4 mr-1.5 md:mr-2" />
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}