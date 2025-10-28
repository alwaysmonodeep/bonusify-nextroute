"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { supabase } from "@/lib/superbase";
import { setProfile } from "@/store/slices/authSlice";

export default function AuthCallback() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [status, setStatus] = useState("Processing...");

  // Check if this is running in a popup window
  const isPopup = typeof window !== 'undefined' && window.opener && !window.opener.closed;

  // Helper: extract first name safely
  const getFirstName = (fullName) => {
    if (!fullName || typeof fullName !== "string") return "";
    const parts = fullName.trim().split(/\s+/);
    return parts[0] || "";
  };

  useEffect(() => {
    handleCallback();
  }, []);

  const handleCallback = async () => {
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError || !session) {
        console.error("Session error:", sessionError);
        setStatus("Authentication failed");
        
        if (isPopup) {
          // Send error to parent and close popup
          window.opener.postMessage(
            { type: 'GOOGLE_AUTH_ERROR', error: 'Authentication failed' },
            window.location.origin
          );
          setTimeout(() => window.close(), 1000);
        } else {
          setTimeout(() => router.push("/auth/login"), 2000);
        }
        return;
      }

      const user = session.user;

      // Extract name fields from user metadata
      const fullName =
        user.user_metadata?.full_name ||
        user.user_metadata?.name ||
        user.user_metadata?.display_name ||
        "";
      const firstName = getFirstName(fullName);

      // Check if user exists in database
      const { data: existingUser, error: dbError } = await supabase
        .from("users")
        .select("*")
        .eq("uid", user.id)
        .maybeSingle();

      if (dbError && dbError.code !== "PGRST116") {
        throw dbError;
      }

      if (existingUser) {
        // EXISTING USER - Log them in and mark email as verified
        // ✅ UPDATED: Added email verification
        await supabase
          .from("users")
          .update({ 
            last_login_at: new Date().toISOString(),
            email_verified: true,
            email_verified_at: new Date().toISOString()
          })
          .eq("uid", user.id);

        // Update local profile with verified status
        const updatedUser = {
          ...existingUser,
          email_verified: true,
          email_verified_at: new Date().toISOString()
        };

        dispatch(setProfile(updatedUser));
        setStatus(`Welcome back, ${firstName}!`);

        if (isPopup) {
          // Send success to parent and close popup
          window.opener.postMessage(
            { 
              type: 'GOOGLE_AUTH_SUCCESS', 
              user: updatedUser,
              session: session 
            },
            window.location.origin
          );
          setTimeout(() => window.close(), 500);
        } else {
          setTimeout(() => router.push("/"), 1500);
        }
      } else {
        // NEW USER - Complete registration
        setStatus("Setting up your account...");

        const googleAuthData = {
          uid: user.id,
          email: user.email,
          name: fullName,
          avatar: user.user_metadata?.avatar_url || "",
          googleId: user.id,
          emailVerified: true,
        };

        if (isPopup) {
          // Send new user data to parent and close popup
          window.opener.postMessage(
            { 
              type: 'GOOGLE_AUTH_NEW_USER',
              googleAuthData: googleAuthData
            },
            window.location.origin
          );
          setTimeout(() => window.close(), 500);
        } else {
          sessionStorage.setItem("googleAuthData", JSON.stringify(googleAuthData));
          setTimeout(() => router.push("/auth/login?google=new"), 1000);
        }
      }
    } catch (error) {
      console.error("Callback error:", error);
      setStatus("Something went wrong. Redirecting...");
      
      if (isPopup) {
        window.opener.postMessage(
          { type: 'GOOGLE_AUTH_ERROR', error: error.message || 'Unknown error' },
          window.location.origin
        );
        setTimeout(() => window.close(), 1000);
      } else {
        setTimeout(() => router.push("/auth/login"), 2000);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <p className="text-gray-600 text-lg">{status}</p>
        {isPopup && (
          <p className="text-gray-500 text-sm mt-2">This window will close automatically...</p>
        )}
      </div>
    </div>
  );
}