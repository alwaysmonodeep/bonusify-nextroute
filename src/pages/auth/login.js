"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { supabase } from "@/lib/superbase";
import {
  initializeAuth,
  sendOTPAction,
  verifyOTPAction,
  registerUser,
  verifyPin,
  checkUserExists,
  clearError,
  resetOtpState,
  completeGoogleRegistration,
  sendLoginOTP,
  verifyLoginOTP,
} from "../../store/slices/authSlice";
import Head from "next/head";

// Validation utilities
const validators = {
  email: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
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

const maskPhone = (phone) => {
  const digits = phone.replace(/\D/g, "");
  return digits.length === 10 ? `${digits.slice(0, 2)}******${digits.slice(-2)}` : phone;
};

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { google } = router.query;

  const { loading, error, otpSent, otpVerified, isAuthenticated, profile, initialized } =
    useSelector((state) => state.auth);

  // State management
  const [step, setStep] = useState("initial");
  const [userType, setUserType] = useState("existing");
  const [inputType, setInputType] = useState("");
  const [localError, setLocalError] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);
  const [googleAuthData, setGoogleAuthData] = useState(null);
  const [existingUserName, setExistingUserName] = useState("");
  const [useOtpLogin, setUseOtpLogin] = useState(false);
  const [form, setForm] = useState({
    emailOrPhone: "",
    email: "",
    phone: "",
    otp: "",
    name: "",
    pin: "",
    confirmPin: "",
    loginOtp: "",
  });

  // Step configuration
  const steps = {
    initial: { title: "Login & Signup", desc: "We'll text you shortly" },
    "phone-input": {
      title: googleAuthData ? "Enter Your Phone Number" : "Enter Phone Number",
      desc: "We need your phone number to send OTP",
    },
    otp: { title: "Verify OTP", desc: `Code sent to ${maskPhone(form.phone || form.emailOrPhone)}` },
    "complete-profile": { title: "Complete Profile", desc: "Just a few more details to get started" },
    "create-pin": { title: "Create Login PIN", desc: "Set up a secure 4-6 digit PIN" },
    "login-pin": {
      title: "Enter Login PIN",
      desc: userType === "existing" && existingUserName 
        ? `Welcome back ${existingUserName}! Enter your PIN` 
        : "Enter your PIN to login",
    },
    "login-otp": {
      title: "Verify OTP",
      desc: userType === "existing" && existingUserName
        ? `Welcome back ${existingUserName}! OTP sent to ${maskPhone(form.phone)}`
        : `OTP sent to ${maskPhone(form.phone)}`,
    },
  };

  // Effects
  useEffect(() => {
    if (!initialized) dispatch(initializeAuth());
  }, [initialized, dispatch]);

  useEffect(() => {
    if (google === "new") {
      const data = sessionStorage.getItem("googleAuthData");
      if (data) {
        const parsed = JSON.parse(data);
        setGoogleAuthData(parsed);
        setForm((prev) => ({ ...prev, email: parsed.email, name: parsed.name }));
        setUserType("new");
        setStep("phone-input");
      }
    }
  }, [google]);

  useEffect(() => {
    if (initialized && isAuthenticated && profile) {
      router.push("/");
    }
  }, [initialized, isAuthenticated, profile, router]);

  useEffect(() => {
    if (error) setLocalError(error);
  }, [error]);

  useEffect(() => {
    if (otpSent && step !== "otp" && step !== "login-otp") setStep(userType === "existing" && useOtpLogin ? "login-otp" : "otp");
  }, [otpSent, step, userType, useOtpLogin]);

  useEffect(() => {
    if (otpVerified && step === "otp") {
      dispatch(resetOtpState());
      setStep(userType === "existing" ? "login-pin" : "complete-profile");
    }
  }, [otpVerified, step, userType, dispatch]);

  // Helper functions
  const clearErrors = () => {
    setLocalError("");
    dispatch(clearError());
  };

  const updateForm = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    clearErrors();
  };

  const goBack = () => {
    const backMap = {
      "phone-input": "initial",
      otp: userType === "new" && inputType === "email" ? "phone-input" : "initial",
      "complete-profile": "otp",
      "create-pin": "complete-profile",
      "login-pin": "initial",
      "login-otp": "login-pin",
    };

    if (step === "phone-input" && googleAuthData) {
      sessionStorage.removeItem("googleAuthData");
      setGoogleAuthData(null);
    }

    if (step === "login-otp") {
      setUseOtpLogin(false);
      setForm((prev) => ({ ...prev, loginOtp: "" }));
    }

    setStep(backMap[step]);
    setForm((prev) => ({ ...prev, otp: "", pin: "", confirmPin: "" }));
    setShowPin(false);
    setShowConfirmPin(false);
    clearErrors();
  };

  // Submit handlers
  const handleInitialSubmit = async (e) => {
    e.preventDefault();
    const input = form.emailOrPhone.trim();
    if (!input) return;

    const isEmail = input.includes("@");
    const isValid = isEmail ? validators.email(input) : validators.phone(input);

    if (!isValid) {
      setLocalError(`Please enter a valid ${isEmail ? "email" : "phone number"}`);
      return;
    }

    setInputType(isEmail ? "email" : "phone");
    clearErrors();

    const payload = isEmail
      ? { email: input.toLowerCase(), phone: null }
      : { email: null, phone: input.replace(/\D/g, "") };

    const result = await dispatch(checkUserExists(payload));

    if (result.payload?.exists) {
      setUserType("existing");
      const userData = result.payload.userData;
      const firstName = userData?.full_name?.split(" ")[0] || "User";
      setExistingUserName(firstName);
      
      if (isEmail) {
        setForm((prev) => ({ ...prev, email: input.toLowerCase(), phone: userData?.phone || "" }));
      } else {
        setForm((prev) => ({ ...prev, phone: input.replace(/\D/g, ""), email: userData?.email || "" }));
      }
      setStep("login-pin");
    } else {
      setUserType("new");
      if (isEmail) {
        setForm((prev) => ({ ...prev, email: input.toLowerCase() }));
        setStep("phone-input");
      } else {
        setForm((prev) => ({ ...prev, phone: input.replace(/\D/g, "") }));
        dispatch(sendOTPAction(input.replace(/\D/g, "")));
      }
    }
  };

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    if (!validators.phone(form.phone)) {
      setLocalError("Please enter a valid phone number");
      return;
    }
    
    clearErrors();
    
    const result = await dispatch(checkUserExists({ email: null, phone: form.phone }));
    
    if (result.payload?.exists) {
      setLocalError("This phone number is already registered. Please use a different number or try logging in.");
      return;
    }
    
    dispatch(sendOTPAction(form.phone));
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (!form.otp || form.otp.length < 4) {
      setLocalError("Please enter the complete OTP");
      return;
    }
    clearErrors();
    await dispatch(verifyOTPAction({ phone: form.phone, otp: form.otp }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.name.trim()) {
      setLocalError("Please enter your name");
      return;
    }
    
    if (inputType === "phone" && !validators.email(form.email)) {
      setLocalError("Please enter a valid email");
      return;
    }
    if (inputType === "email" && !validators.phone(form.phone)) {
      setLocalError("Please enter a valid phone number");
      return;
    }
    
    clearErrors();
    
    if (inputType === "phone" && form.email) {
      const result = await dispatch(checkUserExists({ email: form.email, phone: null }));
      if (result.payload?.exists) {
        setLocalError("This email is already registered. Please use a different email or try logging in.");
        return;
      }
    }
    
    if (inputType === "email" && form.phone) {
      const result = await dispatch(checkUserExists({ email: null, phone: form.phone }));
      if (result.payload?.exists) {
        setLocalError("This phone number is already registered. Please use a different number or try logging in.");
        return;
      }
    }
    
    setStep("create-pin");
  };

  const handleCreatePin = async (e) => {
    e.preventDefault();
    if (!validators.pin(form.pin)) {
      setLocalError("PIN must be 4-6 digits and not repeated");
      return;
    }
    if (form.pin !== form.confirmPin) {
      setLocalError("PINs do not match");
      return;
    }
    clearErrors();

    if (googleAuthData) {
      await dispatch(completeGoogleRegistration({ phone: form.phone, pin: form.pin }));
    } else {
      await dispatch(
        registerUser({
          fullName: form.name,
          email: form.email,
          phone: form.phone,
          pin: form.pin,
        })
      );
    }
  };

  const handleLoginPin = (e) => {
    e.preventDefault();
    if (!form.pin || form.pin.length < 4) {
      setLocalError("Please enter your PIN");
      return;
    }
    clearErrors();
    dispatch(verifyPin({ email: form.email || null, phone: form.phone || null, pin: form.pin }));
  };

  const handleGetOtpClick = async (e) => {
    e.preventDefault();
    clearErrors();
    setUseOtpLogin(true);
    
    const result = await dispatch(
      sendLoginOTP({ 
        email: form.email || null, 
        phone: form.phone || null 
      })
    );
    
    if (result.payload?.success) {
      setStep("login-otp");
    }
  };

  const handleLoginOtpSubmit = async (e) => {
    e.preventDefault();
    if (!form.loginOtp || form.loginOtp.length < 4) {
      setLocalError("Please enter the complete OTP");
      return;
    }
    clearErrors();
    
    await dispatch(
      verifyLoginOTP({ 
        phone: form.phone, 
        otp: form.loginOtp 
      })
    );
  };

  const handleGoogleLogin = async () => {
    try {
      clearErrors();
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          skipBrowserRedirect: true,
          queryParams: {
            access_type: 'offline',
            prompt: 'select_account',
          },
        },
      });
      
      if (error) throw error;
      
      if (data?.url) {
        const width = 500;
        const height = 600;
        const left = window.screenX + (window.outerWidth - width) / 2;
        const top = window.screenY + (window.outerHeight - height) / 2;
        
        const popup = window.open(
          data.url,
          'googleSignIn',
          `width=${width},height=${height},left=${left},top=${top},toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes`
        );
        
        if (!popup) {
          setLocalError('Popup was blocked. Please allow popups for this site.');
          return;
        }
        
        const handleMessage = (event) => {
          if (event.origin !== window.location.origin) return;
          
          if (event.data.type === 'GOOGLE_AUTH_SUCCESS') {
            popup?.close();
            dispatch(initializeAuth());
            window.removeEventListener('message', handleMessage);
            
          } else if (event.data.type === 'GOOGLE_AUTH_NEW_USER') {
            popup?.close();
            const googleData = event.data.googleAuthData;
            setGoogleAuthData(googleData);
            setForm((prev) => ({ 
              ...prev, 
              email: googleData.email, 
              name: googleData.name 
            }));
            setUserType("new");
            setStep("phone-input");
            window.removeEventListener('message', handleMessage);
            
          } else if (event.data.type === 'GOOGLE_AUTH_ERROR') {
            popup?.close();
            setLocalError(event.data.error || 'Authentication failed');
            window.removeEventListener('message', handleMessage);
          }
        };
        
        window.addEventListener('message', handleMessage);
        
        const checkPopup = setInterval(() => {
          if (popup.closed) {
            clearInterval(checkPopup);
            window.removeEventListener('message', handleMessage);
          }
        }, 500);
      }
    } catch (err) {
      console.error('Google auth error:', err);
      setLocalError("Google authentication failed");
    }
  };

  // Loading state
  if (!initialized || (isAuthenticated && profile)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4" />
          <p className="text-gray-600">{isAuthenticated ? "Redirecting..." : "Loading..."}</p>
        </div>
      </div>
    );
  }

  return (
    <>
    <Head>
  {/* ✅ Basic SEO Meta */}
  <title>Login or Signup to Bobusify| Access Your Account</title>
  <meta
    name="description"
    content="Securely log in to your account to access cashback offers, recharge services, and personalized deals. Your security and privacy are our priority."
  />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://yourdomain.com/auth/login" />

  {/* ✅ Open Graph (for social sharing) */}
  <meta property="og:title" content="Login | Access Your Account" />
  <meta
    property="og:description"
    content="Sign in to explore the latest cashback deals, bill payments, and shopping offers on our platform."
  />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://yourdomain.com/auth/login" />
  <meta property="og:image" content="https://yourdomain.com/og-image.png" />
  <meta property="og:site_name" content="YourAppName" />

  {/* ✅ Twitter Cards */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Login | Access Your Account" />
  <meta
    name="twitter:description"
    content="Log in securely to manage your cashback rewards, recharges, and exclusive offers."
  />
  <meta name="twitter:image" content="https://yourdomain.com/og-image.png" />
</Head>

    <div className="min-h-screen bg-white flex flex-col items-center justify-center mb-5">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm relative">
        {/* Back Button */}
        {step !== "initial" && (
          <button onClick={goBack} className="absolute left-6 cursor-pointer top-4 flex items-center text-gray-900 hover:text-gray-600 duration-300 hover:-translate-y-0.5 active:translate-y-0">
            <FaArrowLeft size={20} className="mr-2" />
            <span className="text-sm font-medium">Back</span>
          </button>
        )}

        {/* Logo */}
        <div className="text-left mb-8 pt-8">
          <Image src="/bonusifygreen.png" width={90} height={50} alt="Logo" className="w-[90px]" />
        </div>

        {/* Title */}
        <div className="text-left mb-10">
          <h2 className="texxt-xl md:text-2xl font-bold text-gray-800 pb-2">
            {steps[step]?.title}
          </h2>
          <p className="text-xs md:text-sm font-semibold text-gray-600">
            {steps[step]?.desc}
          </p>
        </div>

        {/* Error Message */}
        {(localError || error) && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs md:text-sm">
            {localError || error}
          </div>
        )}

        {/* INITIAL STEP */}
        {step === "initial" && (
          <>
            <form onSubmit={handleInitialSubmit}>
              <input
                type="text"
                placeholder="Email or Mobile Number"
                value={form.emailOrPhone}
                onChange={(e) => updateForm("emailOrPhone", e.target.value)}
                className="w-full px-4 py-4 text-sm bg-gray-50 rounded-xl border-0 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 mb-4"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer w-full py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-700 disabled:opacity-50"
              >
                {loading ? "Processing..." : "Continue"}
              </button>
            </form>

            <div className="my-6 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full duration-300 hover:-translate-y-0.5 active:translate-y-0 flex justify-center items-center gap-2 px-4 py-3 cursor-pointer rounded-lg bg-gray-200 hover:bg-gray-100 disabled:opacity-50"
            >
              <FcGoogle className="text-2xl" />
              <span className="text-gray-700 font-semibold">Google</span>
            </button>
          </>
        )}

        {/* PHONE INPUT */}
        {step === "phone-input" && (
          <form onSubmit={handlePhoneSubmit}>
            <input
              type="tel"
              placeholder="Mobile Number"
              value={form.phone}
              onChange={(e) => updateForm("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
              className="w-full px-4 py-4 text-sm bg-gray-50 rounded-xl focus:ring-2 focus:ring-blue-500 mb-4"
              maxLength={10}
              required
            />
            <button type="submit" disabled={loading} className="duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer w-full py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-700 disabled:opacity-50">
              {loading ? "Checking..." : "Send OTP"}
            </button>
          </form>
        )}

        {/* OTP */}
        {step === "otp" && (
          <form onSubmit={handleOtpSubmit}>
            <input
              type="text"
              placeholder="Enter OTP"
              value={form.otp}
              onChange={(e) => updateForm("otp", e.target.value.replace(/\D/g, "").slice(0, 6))}
              className="w-full px-4 py-4 text-sm bg-gray-50 rounded-xl text-center tracking-widest mb-4 focus:ring-2 focus:ring-blue-500"
              maxLength={6}
              required
            />
            <button type="submit" disabled={loading} className="duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer w-full py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-700 mb-4 disabled:opacity-50">
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
            <div className="text-center">
              <button type="button" onClick={() => dispatch(sendOTPAction(form.phone))} className="text-sm text-blue-600 hover:text-blue-500">
                Resend OTP
              </button>
            </div>
          </form>
        )}

        {/* COMPLETE PROFILE */}
           {step === "complete-profile" && (
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => updateForm("email", e.target.value)}
              className={`w-full px-4 py-4 text-sm rounded-xl ${inputType === "email" || googleAuthData ? "bg-gray-100 cursor-not-allowed" : "bg-gray-50"}`}
              readOnly={inputType === "email" || googleAuthData}
              required
            />
            <input
              type="tel"
              placeholder="Mobile Number"
              value={form.phone}
              onChange={(e) => updateForm("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
              className="w-full px-4 py-4 text-sm rounded-xl bg-gray-100 cursor-not-allowed"
              readOnly={true}
              maxLength={10}
              required
            />
            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => updateForm("name", e.target.value)}
              className="w-full px-4 py-4 text-sm bg-gray-50 rounded-xl focus:ring-2 focus:ring-blue-500"
              required
            />
            <button type="submit" disabled={loading} className="duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer w-full py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-700 disabled:opacity-50">
              {loading ? "Checking..." : "Continue"}
            </button>
          </form>
        )}

        {/* CREATE PIN */}
        {step === "create-pin" && (
          <form onSubmit={handleCreatePin} className="space-y-4">
            <div className="relative">
              <input
                type={showPin ? "text" : "password"}
                placeholder="Create PIN (4-6 digits)"
                value={form.pin}
                onChange={(e) => updateForm("pin", e.target.value.replace(/\D/g, "").slice(0, 6))}
                className="w-full px-4 py-4 pr-12 text-sm bg-gray-50 rounded-xl text-center tracking-widest focus:ring-2 focus:ring-blue-500"
                maxLength={6}
                required
              />
              <button type="button" onClick={() => setShowPin(!showPin)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                {showPin ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>

            <div className="relative">
              <input
                type={showConfirmPin ? "text" : "password"}
                placeholder="Confirm PIN"
                value={form.confirmPin}
                onChange={(e) => updateForm("confirmPin", e.target.value.replace(/\D/g, "").slice(0, 6))}
                className="w-full px-4 py-4 pr-12 text-sm bg-gray-50 rounded-xl text-center tracking-widest focus:ring-2 focus:ring-blue-500"
                maxLength={6}
                required
              />
              <button type="button" onClick={() => setShowConfirmPin(!showConfirmPin)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                {showConfirmPin ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>

            <button type="submit" disabled={loading} className="duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer w-full py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-700 disabled:opacity-50">
              {loading ? "Creating Account..." : "Complete Registration"}
            </button>
          </form>
        )}

        {/* LOGIN PIN */}
        {step === "login-pin" && (
          <form onSubmit={handleLoginPin}>
            <div className="relative mb-4">
              <input
                type={showPin ? "text" : "password"}
                placeholder="Enter your PIN"
                value={form.pin}
                onChange={(e) => updateForm("pin", e.target.value.replace(/\D/g, "").slice(0, 6))}
                className="w-full px-4 py-4 pr-12 text-sm bg-gray-50 rounded-xl text-center tracking-widest focus:ring-2 focus:ring-blue-500"
                maxLength={6}
                required
              />
              <button type="button" onClick={() => setShowPin(!showPin)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                {showPin ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
            <button type="submit" disabled={loading} className="duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer w-full py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-700 mb-4 disabled:opacity-50">
              {loading ? "Logging in..." : "Login"}
            </button>
            <button 
              type="button"
              onClick={handleGetOtpClick}
              disabled={loading}
              className="w-full cursor-pointer py-2 text-blue-600 hover:text-blue-400 font-semibold text-center text-sm"
            >
              Get OTP on your phone
            </button>
          </form>
        )}

        {/* LOGIN OTP */}
        {step === "login-otp" && (
          <form onSubmit={handleLoginOtpSubmit}>
            <input
              type="text"
              placeholder="Enter OTP"
              value={form.loginOtp}
              onChange={(e) => updateForm("loginOtp", e.target.value.replace(/\D/g, "").slice(0, 6))}
              className="w-full px-4 py-4 text-sm bg-gray-50 rounded-xl text-center tracking-widest mb-4 focus:ring-2 focus:ring-blue-500"
              maxLength={6}
              required
            />
            <button type="submit" disabled={loading} className="duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer w-full py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-700 mb-4 disabled:opacity-50">
              {loading ? "Verifying..." : "Verify & Login"}
            </button>
            <div className="text-center">
              <button 
                type="button" 
                onClick={() => dispatch(sendLoginOTP({ email: form.email || null, phone: form.phone || null }))} 
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                Resend OTP
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Terms */}
      {step === "initial" && (
        <div className="max-w-sm pt-6 text-center px-4">
          <p className="text-sm text-gray-600">
            By continuing, I agree to Bonusify's{" "}
            <span className="text-blue-600 hover:text-blue-500 cursor-pointer">terms & conditions</span> and{" "}
            <span className="text-blue-600 hover:text-blue-500 cursor-pointer">privacy policy</span>
          </p>
        </div>
      )}
    </div>
    </>
  );
};

export default Login;