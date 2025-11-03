
"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  FaUser, 
  FaSignOutAlt, 
  FaCheck, 
  FaPhoneAlt, 
  FaTimes, 
  FaEdit,
  FaUserFriends,
  FaHeadset,
  FaChevronRight,
  FaTrash,
  FaLock
} from "react-icons/fa";
import { MdMail } from "react-icons/md";
import {
  updateUserProfile,
  updateUserPhone,
  updateUserPin,
  deleteUserAccount,
  logout,
  sendOTPAction,
  verifyOTPAction,
} from "@/store/slices/authSlice";

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

export default function FunctionalAccountPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { profile, loading } = useSelector((state) => state.auth);

  // Animation state
  const [mounted, setMounted] = useState(false);

  const [personalDetails, setPersonalDetails] = useState({
    fname: "",
    mobile: "",
  });

  const [pinDetails, setPinDetails] = useState({
    newPin: "",
    confirmPin: "",
  });

  const [pinOtpFlow, setPinOtpFlow] = useState({
    active: false,
    step: 1,
    otp: "",
    timer: 0,
  });

  const [showPersonalDetails, setShowPersonalDetails] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showPinChange, setShowPinChange] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const [otpFlow, setOtpFlow] = useState({
    active: false,
    field: null,
    step: 1,
    otp: "",
    newValue: "",
    timer: 0,
  });

  const [deleteFlow, setDeleteFlow] = useState({
    step: 0,
    reason: "",
    otherReason: "",
    otp: "",
    timer: 0,
  });

  // Trigger animations on mount
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!profile) {
      router.push("/auth/login");
      return;
    }
    setPersonalDetails({
      fname: profile.full_name || "User",
      mobile: profile.phone || "",
    });
  }, [profile, router]);

  useEffect(() => {
    if (otpFlow.timer > 0) {
      const interval = setInterval(() => {
        setOtpFlow((prev) => ({ ...prev, timer: prev.timer - 1 }));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [otpFlow.timer]);

  useEffect(() => {
    if (pinOtpFlow.timer > 0) {
      const interval = setInterval(() => {
        setPinOtpFlow((prev) => ({ ...prev, timer: prev.timer - 1 }));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [pinOtpFlow.timer]);

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
      case "confirmPin":
        if (value !== pinDetails.newPin) {
          newErrors.confirmPin = "PINs don't match";
        } else {
          delete newErrors.confirmPin;
        }
        break;
    }
    
    setErrors(newErrors);
    return !newErrors[field];
  };

  const handleStartSecureEdit = async (field) => {
    try {
      await dispatch(sendOTPAction(profile.phone)).unwrap();
      setOtpFlow({
        active: true,
        field,
        step: 1,
        otp: "",
        newValue: "",
        timer: 120,
      });
      showMessage(`OTP sent to ${profile.phone}`);
    } catch (error) {
      showMessage(error || "Failed to send OTP");
    }
  };

  const handleVerifyOTP = async () => {
    try {
      await dispatch(verifyOTPAction({ 
        phone: otpFlow.step === 1 ? profile.phone : otpFlow.newValue, 
        otp: otpFlow.otp 
      })).unwrap();
      
      if (otpFlow.step === 1) {
        setOtpFlow({ ...otpFlow, step: 2, otp: "" });
        showMessage("Verified!");
      } else {
        await dispatch(updateUserPhone({ 
          userId: profile.id, 
          phone: otpFlow.newValue 
        })).unwrap();
        showMessage("Phone number updated successfully!");
        setOtpFlow({ active: false, field: null, step: 1, otp: "", newValue: "", timer: 0 });
        setShowPersonalDetails(false);
      }
    } catch (error) {
      showMessage(error || "Verification failed");
    }
  };

  const handleUpdateProfile = async () => {
    if (!hasChanges()) return;
    
    setIsUpdating(true);
    try {
      await dispatch(updateUserProfile({
        userId: profile.id,
        fullName: personalDetails.fname,
      })).unwrap();
      showMessage("Personal details updated!");
      setShowPersonalDetails(false);
    } catch (error) {
      showMessage(error || "Update failed");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleUpdatePin = async () => {
    const newPinValid = validateField("pin", pinDetails.newPin);
    const confirmValid = validateField("confirmPin", pinDetails.confirmPin);
    
    if (!newPinValid || !confirmValid) return;

    setIsUpdating(true);
    try {
      await dispatch(updateUserPin({
        userId: profile.id,
        currentPin: null,
        newPin: pinDetails.newPin,
      })).unwrap();
      showMessage("PIN updated successfully!");
      setPinOtpFlow({ active: false, step: 1, otp: "", timer: 0 });
      setPinDetails({ newPin: "", confirmPin: "" });
      setErrors({});
    } catch (error) {
      showMessage(error || "PIN update failed");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await dispatch(deleteUserAccount({
        userId: profile.id,
        uid: profile.uid,
        reason: deleteFlow.reason,
        otherReason: deleteFlow.otherReason,
      })).unwrap();
      showMessage("Account deleted successfully");
      setTimeout(() => {
        router.push("/auth/login");
      }, 1500);
    } catch (error) {
      showMessage(error || "Failed to delete account");
      setDeleteFlow({ step: 0, reason: "", otherReason: "", otp: "", timer: 0 });
    }
  };

  const hasChanges = () => {
    return personalDetails.fname !== profile?.full_name;
  };

  const menuItems = [
    {
      id: "personal",
      icon: FaUser,
      title: "Update Personal Details",
      description: "Change your name and phone number",
      action: () => setShowPersonalDetails(true),
      type: "button"
    },
    {
      id: "pin",
      icon: FaLock,
      title: "Change Login PIN",
      description: "Update your account security PIN",
      action: () => setShowPinChange(true),
      type: "button"
    },
    {
      id: "invite",
      icon: FaUserFriends,
      title: "Invite and Get Cashback",
      description: "Refer friends and earn rewards",
      href: "/refer-and-earn",
      type: "link"
    },
    {
      id: "support",
      icon: FaHeadset,
      title: "Customer Service",
      description: "Get help with your account",
      href: "/help",
      type: "link"
    },
    {
      id: "logout",
      icon: FaSignOutAlt,
      title: "Logout",
      description: "Sign out from your account",
      action: () => setShowLogoutModal(true),
      type: "button"
    },
    {
      id: "delete",
      icon: FaTrash,
      title: "Delete Account",
      description: "Permanently remove your account",
      action: () => setDeleteFlow({ step: 1, reason: "", otherReason: "", otp: "", timer: 0 }),
      type: "button",
      danger: true
    }
  ];

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-300 border-b border-gray-200 pt-8 pb-24 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Account Card with Animation */}
          <div 
            className={`bg-white rounded-2xl p-6 border border-gray-200 shadow-sm transition-all duration-800 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-2xl font-semibold text-gray-700">
                {profile.full_name?.charAt(0) || 'U'}
              </div>
              <div className="flex-1">
                <h3 className="text-md md:text-lg font-semibold text-gray-900">{profile.full_name}</h3>
                <p className="text-xs text-gray-500">Account Holder</p>
              </div>
              <div className="bg-green-50 px-3 py-1 rounded-full border border-green-200">
                <span className="text-green-700 text-xs font-medium">Active</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-200">
                  <MdMail className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm font-medium text-gray-900">{profile.email || "Not provided"}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-200">
                  <FaPhoneAlt className="w-4 h-4 text-gray-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Mobile</p>
                  <p className="text-sm font-medium text-gray-900">{profile.phone}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items with Staggered Animation */}
      <div className="max-w-4xl mx-auto px-4 -mt-16 pb-8">
        <div className="space-y-3">
          {menuItems.map((item, idx) => {
            const content = (
              <div className="flex items-center space-x-4">
                <div className="p-3 md:p-4 rounded-xl flex items-center justify-center flex-shrink-0 bg-gray-100">
                  <item.icon className="text-sm text-black" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className={`text-sm md:text-base font-semibold ${item.danger ? 'text-red-600' : 'text-gray-900'}`}>
                    {item.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-500 mt-0.5">{item.description}</p>
                </div>
                <FaChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            );

            const animationClass = `transition-all duration-100 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`;

            if (item.type === "link") {
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`block w-full bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 hover:border-gray-300 ${animationClass}`}
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  {content}
                </Link>
              );
            }

            return (
              <button
                key={item.id}
                onClick={item.action}
                disabled={loading}
                className={`w-full bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 border ${
                  item.danger 
                    ? 'border-red-200 hover:border-red-300' 
                    : 'border-gray-200 hover:border-gray-300'
                } cursor-pointer disabled:opacity-50 ${animationClass}`}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {content}
              </button>
            );
          })}
        </div>
      </div>

      {/* All modals remain the same - Personal Details Modal */}
      {showPersonalDetails && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-slideUp">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Update Personal Details</h2>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={personalDetails.fname}
                  onChange={(e) => setPersonalDetails({ ...personalDetails, fname: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                <div className="relative">
                  <input
                    type="tel"
                    value={personalDetails.mobile}
                    disabled
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 pr-12"
                  />
                  <button
                    onClick={() => handleStartSecureEdit("mobile")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900"
                  >
                    <FaEdit className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">Click edit icon to change phone number</p>
              </div>

              {message && (
                <div className="flex items-center text-green-600 text-sm bg-green-50 p-3 rounded-lg border border-green-200">
                  <FaCheck className="w-4 h-4 mr-2" />
                  {message}
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowPersonalDetails(false)}
                  className="text-sm flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateProfile}
                  disabled={isUpdating || !hasChanges()}
                  className="text-sm flex-1 px-4 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium cursor-pointer"
                >
                  {isUpdating ? "Updating..." : "Update Details"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Change PIN Modal */}
      {showPinChange && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full animate-slideUp">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Change Login PIN</h2>
              <button
                onClick={() => setShowPinChange(false)}
                className="text-gray-400 hover:text-gray-600 p-2"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                <p className="text-sm text-blue-800">
                  You'll need to verify your identity via OTP before changing your PIN.
                </p>
              </div>

              <button
                onClick={async () => {
                  try {
                    await dispatch(sendOTPAction(profile.phone)).unwrap();
                    setPinOtpFlow({
                      active: true,
                      step: 1,
                      otp: "",
                      timer: 120,
                    });
                    setShowPinChange(false);
                    showMessage(`OTP sent to ${profile.phone}`);
                  } catch (error) {
                    showMessage(error || "Failed to send OTP");
                  }
                }}
                disabled={loading}
                className="text-sm w-full bg-gray-900 text-white py-3 rounded-xl hover:bg-gray-800 font-medium disabled:bg-gray-400 cursor-pointer"
              >
                {loading ? "Sending OTP..." : "Proceed to Change PIN"}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* PIN OTP Modal */}
      {pinOtpFlow.active && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {pinOtpFlow.step === 1 ? "Verify Your Identity" : "Set New PIN"}
                </h3>
                <button
                  onClick={() => {
                    setPinOtpFlow({ active: false, step: 1, otp: "", timer: 0 });
                    setPinDetails({ newPin: "", confirmPin: "" });
                    setErrors({});
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes />
                </button>
              </div>

              {pinOtpFlow.step === 1 ? (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    OTP sent to {profile.phone}
                  </p>
                  <input
                    type="text"
                    maxLength="6"
                    value={pinOtpFlow.otp}
                    onChange={(e) => setPinOtpFlow({ ...pinOtpFlow, otp: e.target.value.replace(/\D/g, "") })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl text-center text-2xl tracking-widest outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="------"
                  />
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {pinOtpFlow.timer > 0 ? `Resend in ${pinOtpFlow.timer}s` : ""}
                    </span>
                    {pinOtpFlow.timer === 0 && (
                      <button 
                        onClick={async () => {
                          try {
                            await dispatch(sendOTPAction(profile.phone)).unwrap();
                            setPinOtpFlow({ ...pinOtpFlow, timer: 120 });
                            showMessage("OTP resent!");
                          } catch (error) {
                            showMessage(error || "Failed to resend OTP");
                          }
                        }}
                        className="text-gray-900 hover:underline font-medium"
                      >
                        Resend OTP
                      </button>
                    )}
                  </div>
                  <button
                    onClick={async () => {
                      try {
                        await dispatch(verifyOTPAction({ 
                          phone: profile.phone, 
                          otp: pinOtpFlow.otp 
                        })).unwrap();
                        setPinOtpFlow({ ...pinOtpFlow, step: 2, otp: "" });
                        showMessage("Verified! Now set your new PIN");
                      } catch (error) {
                        showMessage(error || "Verification failed");
                      }
                    }}
                    disabled={pinOtpFlow.otp.length < 4 || loading}
                    className="text-sm w-full bg-gray-900 text-white py-3 rounded-xl hover:bg-gray-800 disabled:bg-gray-400 cursor-pointer"
                  >
                    {loading ? "Verifying..." : "Verify OTP"}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">New PIN</label>
                    <input
                      type="password"
                      maxLength="6"
                      value={pinDetails.newPin}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        setPinDetails({ ...pinDetails, newPin: value });
                        if (value) validateField("pin", value);
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
                      placeholder="4-6 digits"
                    />
                    {errors.pin && <p className="text-red-600 text-xs mt-1">{errors.pin}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New PIN</label>
                    <input
                      type="password"
                      maxLength="6"
                      value={pinDetails.confirmPin}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        setPinDetails({ ...pinDetails, confirmPin: value });
                        if (value) validateField("confirmPin", value);
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
                      placeholder="Re-enter new PIN"
                    />
                    {errors.confirmPin && <p className="text-red-600 text-xs mt-1">{errors.confirmPin}</p>}
                  </div>

                  <button
                    onClick={handleUpdatePin}
                    disabled={
                      isUpdating || 
                      !pinDetails.newPin || 
                      !pinDetails.confirmPin ||
                      !!errors.pin ||
                      !!errors.confirmPin
                    }
                    className="text-sm w-full bg-gray-900 text-white py-3 rounded-xl hover:bg-gray-800 disabled:bg-gray-400 font-medium"
                  >
                    {isUpdating ? "Updating..." : "Update PIN"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* OTP Modal */}
      {otpFlow.active && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {otpFlow.step === 1 && "Verify Current Number"}
                  {otpFlow.step === 2 && "Enter New Phone Number"}
                  {otpFlow.step === 3 && "Verify New Number"}
                </h3>
                <button
                  onClick={() => setOtpFlow({ active: false, field: null, step: 1, otp: "", newValue: "", timer: 0 })}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes />
                </button>
              </div>

              {otpFlow.step === 2 ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={otpFlow.newValue}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      setOtpFlow({ ...otpFlow, newValue: value });
                      setErrors({ ...errors, mobile: undefined });
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="10 digit phone"
                    maxLength="10"
                  />
                  {errors.mobile && (
                    <p className="text-red-600 text-xs">{errors.mobile}</p>
                  )}
                  <button
                    onClick={async () => {
                      const isValid = validateField("mobile", otpFlow.newValue);
                      if (isValid) {
                        try {
                          await dispatch(sendOTPAction(otpFlow.newValue)).unwrap();
                          setOtpFlow({ ...otpFlow, step: 3, timer: 120 });
                          showMessage("OTP sent!");
                        } catch (error) {
                          showMessage(error || "Failed to send OTP");
                        }
                      }
                    }}
                    disabled={!otpFlow.newValue || otpFlow.newValue.length !== 10}
                    className="w-full bg-gray-900 text-white py-3 rounded-xl hover:bg-gray-800 disabled:bg-gray-400"
                  >
                    Continue
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    OTP sent to {otpFlow.step === 1 ? profile.phone : otpFlow.newValue}
                  </p>
                  <input
                    type="text"
                    maxLength="6"
                    value={otpFlow.otp}
                    onChange={(e) => setOtpFlow({ ...otpFlow, otp: e.target.value.replace(/\D/g, "") })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl text-center text-2xl tracking-widest outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="------"
                  />
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {otpFlow.timer > 0 ? `Resend in ${otpFlow.timer}s` : ""}
                    </span>
                    {otpFlow.timer === 0 && (
                      <button 
                        onClick={async () => {
                          try {
                            await dispatch(sendOTPAction(otpFlow.step === 1 ? profile.phone : otpFlow.newValue)).unwrap();
                            setOtpFlow({ ...otpFlow, timer: 120 });
                            showMessage("OTP resent!");
                          } catch (error) {
                            showMessage(error || "Failed to resend OTP");
                          }
                        }}
                        className="text-gray-900 hover:underline font-medium"
                      >
                        Resend OTP
                      </button>
                    )}
                  </div>
                  <button
                    onClick={handleVerifyOTP}
                    disabled={otpFlow.otp.length < 4 || loading}
                    className="w-full bg-gray-900 text-white py-3 rounded-xl hover:bg-gray-800 disabled:bg-gray-400"
                  >
                    {loading ? "Verifying..." : "Verify OTP"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Modal */}
      {deleteFlow.step > 0 && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            {deleteFlow.step === 1 && (
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">Why are you leaving?</h3>
                  <button
                    onClick={() => setDeleteFlow({ step: 0, reason: "", otherReason: "", otp: "", timer: 0 })}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <FaTimes className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-sm text-gray-600 mb-6">
                  We'd love to know why you're deleting your account.
                </p>

                <div className="space-y-3 mb-6">
                  {deleteReasons.map((reason) => (
                    <label
                      key={reason.value}
                      className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        deleteFlow.reason === reason.value
                          ? "border-gray-900 bg-gray-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="deleteReason"
                        value={reason.value}
                        checked={deleteFlow.reason === reason.value}
                        onChange={(e) => setDeleteFlow({ ...deleteFlow, reason: e.target.value })}
                        className="w-4 h-4 text-gray-900"
                      />
                      <span className="ml-3 text-sm text-gray-700">{reason.label}</span>
                    </label>
                  ))}
                </div>

                {deleteFlow.reason === "other" && (
                  <textarea
                    value={deleteFlow.otherReason}
                    onChange={(e) => setDeleteFlow({ ...deleteFlow, otherReason: e.target.value })}
                    placeholder="Tell us more..."
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl mb-6 resize-none outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                )}

                <div className="flex gap-3">
                  <button
                    onClick={() => setDeleteFlow({ step: 0, reason: "", otherReason: "", otp: "", timer: 0 })}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setDeleteFlow({ ...deleteFlow, step: 2 })}
                    disabled={!deleteFlow.reason || (deleteFlow.reason === "other" && !deleteFlow.otherReason.trim())}
                    className="flex-1 px-4 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 disabled:bg-gray-300"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {deleteFlow.step === 2 && (
              <div className="p-6">
                <div className="flex flex-col items-center mb-6 relative">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <button
                    onClick={() => setDeleteFlow({ step: 0, reason: "", otherReason: "", otp: "", timer: 0 })}
                    className="absolute top-0 right-0 text-gray-400 hover:text-gray-600"
                  >
                    <FaTimes className="w-5 h-5" />
                  </button>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 text-center mb-3">
                  Are you absolutely sure?
                </h3>

                <p className="text-sm text-gray-600 text-center mb-6">
                  This action cannot be undone. Your account will be permanently deleted.
                </p>

                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                  <h4 className="text-sm font-semibold text-red-900 mb-2">This will:</h4>
                  <ul className="text-sm text-red-700 space-y-2">
                    <li>• Delete all your personal data</li>
                    <li>• Cancel pending rewards and cashback</li>
                    <li>• Remove access to special offers</li>
                  </ul>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setDeleteFlow({ ...deleteFlow, step: 1 })}
                    className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300"
                  >
                    Go Back
                  </button>
                  <button
                    onClick={handleDeleteAccount}
                    disabled={loading}
                    className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 disabled:bg-red-300"
                  >
                    {loading ? "Deleting..." : "Delete Account"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Logout Confirmation Modal */}
{showLogoutModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div className="bg-gray-50 rounded-2xl shadow-2xl max-w-md w-full">
      <div className="p-6">
        <div className="flex flex-col items-center mb-6">
          <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <FaSignOutAlt className="w-6 h-6 text-gray-600" />
          </div>
          <h3 className="text-lg md:text-xl font-semibold text-gray-900 text-center mb-2">
            Logout Confirmation
          </h3>
          <p className="text-xs md:text-sm text-gray-600 text-center">
            Are you sure you want to logout from your account?
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setShowLogoutModal(false)}
            className="text-sm flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 font-medium cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={async () => {
              try {
                await dispatch(logout()).unwrap();
                setShowLogoutModal(false);
                showMessage("Logging out...");
                setTimeout(() => {
                  router.push("/auth/login");
                }, 1000);
              } catch (error) {
                showMessage("Logout failed");
                setShowLogoutModal(false);
              }
            }}
            disabled={loading}
            className="text-sm flex-1 px-4 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 disabled:bg-gray-400 font-medium cursor-pointer"
          >
            {loading ? "Logging out..." : "Yes, Logout"}
          </button>
        </div>
      </div>
    </div>
  </div>
)}

      {/* Toast Message */}
      {message && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full shadow-lg z-50 flex items-center space-x-2">
          <FaCheck className="w-4 h-4" />
          <span className="text-xs md:text-sm font-medium">{message}</span>
        </div>
      )}
    </div>
  );
}