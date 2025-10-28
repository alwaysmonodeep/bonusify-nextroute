import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "@/lib/superbase";
import bcrypt from "bcryptjs";

// HELPER FUNCTIONS
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const formatPhone = (phone) => {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return digits;
  if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2);
  return digits;
};

const generatePassword = (phone) => {
  return `Bonusify_${phone}_2025`;
};

// ASYNC THUNKS
export const initializeAuth = createAsyncThunk(
  "auth/initializeAuth",
  async (_, thunkAPI) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        return { authenticated: false, session: null, profile: null };
      }

      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        await supabase.auth.signOut();
        return { authenticated: false, session: null, profile: null };
      }

      const { data: profile, error } = await supabase
        .from("users")
        .select("*")
        .eq("uid", user.id)
        .single();

      if (error) {
        console.error("Profile fetch error:", error);
        await supabase.auth.signOut();
        return { authenticated: false, session: null, profile: null };
      }

      return { authenticated: true, session, profile };
    } catch (err) {
      console.error("Init auth error:", err);
      try {
        await supabase.auth.signOut();
      } catch (e) {
        // ignore
      }
      return { authenticated: false, session: null, profile: null };
    }
  }
);

export const checkUserExists = createAsyncThunk(
  "auth/checkUserExists",
  async ({ email, phone }, thunkAPI) => {
    try {
      let query = supabase.from("users").select("id, email, phone, full_name");

      if (email) {
        query = query.eq("email", email.toLowerCase().trim());
      } else if (phone) {
        const formattedPhone = formatPhone(phone);
        query = query.eq("phone", formattedPhone);
      } else {
        return thunkAPI.rejectWithValue("Email or phone required");
      }

      const { data, error } = await query.maybeSingle();

      if (error && error.code !== "PGRST116") {
        return thunkAPI.rejectWithValue(error.message);
      }

      return { 
        exists: !!data,
        userData: data || null,
        field: email ? "email" : "phone"
      };
    } catch (err) {
      console.error("Check user error:", err);
      return thunkAPI.rejectWithValue(err.message || "Failed to check user");
    }
  }
);

export const sendOTPAction = createAsyncThunk(
  "auth/sendOTP",
  async (phone, thunkAPI) => {
    try {
      const isDevelopment = process.env.NODE_ENV === "development";
      const otp = isDevelopment ? "1234" : generateOTP();
      const formattedPhone = formatPhone(phone);

      // TODO: Send actual SMS in production
      console.log(`OTP for ${formattedPhone}: ${otp}`);

      return {
        success: true,
        phone: formattedPhone,
        otp,
        expiresAt: Date.now() + 10 * 60 * 1000,
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Failed to send OTP");
    }
  }
);

export const verifyOTPAction = createAsyncThunk(
  "auth/verifyOTP",
  async ({ phone, otp }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const { otpData } = state.auth;
      const formattedPhone = formatPhone(phone);

      if (!otpData?.otp) {
        return thunkAPI.rejectWithValue("OTP expired. Request a new OTP.");
      }

      if (otpData.phone !== formattedPhone) {
        return thunkAPI.rejectWithValue("Phone mismatch. Request a new OTP.");
      }

      if (Date.now() > otpData.expiresAt) {
        return thunkAPI.rejectWithValue("OTP expired. Request a new OTP.");
      }

      if (otp !== otpData.otp) {
        return thunkAPI.rejectWithValue("Invalid OTP.");
      }

      return { phone: formattedPhone };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "OTP verification failed");
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ fullName, email, phone, pin }, thunkAPI) => {
    try {
      const userEmail = email?.trim().toLowerCase() || null;
      const formattedPhone = formatPhone(phone);
      const password = generatePassword(formattedPhone);
      const authEmail = userEmail || `${formattedPhone}@temp.bonusify.app`;

      const { data: existingUser } = await supabase
        .from("users")
        .select("id, email, phone")
        .or(`email.eq.${userEmail},phone.eq.${formattedPhone}`)
        .maybeSingle();

      if (existingUser) {
        if (existingUser.email === userEmail) {
          return thunkAPI.rejectWithValue("Email already registered");
        }
        if (existingUser.phone === formattedPhone) {
          return thunkAPI.rejectWithValue("Phone already registered");
        }
      }

      // ✅ UPDATED: Added emailRedirectTo for email verification
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: authEmail,
        password,
        options: { 
          emailRedirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}/auth/callback`,
          data: { phone: formattedPhone, full_name: fullName }
        },
      });

      if (signUpError) {
        return thunkAPI.rejectWithValue(signUpError.message);
      }

      if (!authData.user) {
        return thunkAPI.rejectWithValue("Failed to create account");
      }

      let session = authData.session;
      
      if (!session) {
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email: authEmail,
          password,
        });

        if (signInError) {
          await supabase.auth.admin.deleteUser(authData.user.id);
          return thunkAPI.rejectWithValue("Account creation failed");
        }
        session = signInData.session;
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPin = await bcrypt.hash(pin, salt);

      const { data: profileData, error: profileError } = await supabase
        .from("users")
        .insert([
          {
            uid: authData.user.id,
            full_name: fullName,
            email: userEmail,
            phone: formattedPhone,
            pin: hashedPin,
            auth_method: "manual",
            google_id: null,
            has_google_oauth: false,
            email_verified: false,
          },
        ])
        .select()
        .single();

      if (profileError) {
        await supabase.auth.admin.deleteUser(authData.user.id);
        return thunkAPI.rejectWithValue("Registration failed");
      }

      return { session, profile: profileData };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Registration failed");
    }
  }
);

export const completeGoogleRegistration = createAsyncThunk(
  "auth/completeGoogleRegistration",
  async ({ phone, pin }, thunkAPI) => {
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session) {
        return thunkAPI.rejectWithValue("No active Google session found. Please try again.");
      }

      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        return thunkAPI.rejectWithValue("Failed to get user data");
      }

      const formattedPhone = formatPhone(phone);
      
      const { data: existingUser } = await supabase
        .from("users")
        .select("id, phone")
        .eq("phone", formattedPhone)
        .maybeSingle();

      if (existingUser) {
        return thunkAPI.rejectWithValue("This phone number is already registered. Please use a different number or try logging in.");
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPin = await bcrypt.hash(pin, salt);

      const password = generatePassword(formattedPhone, "google");
      
      const { error: updateError } = await supabase.auth.updateUser({
        password: password,
      });

      if (updateError) {
        console.warn("Could not set password:", updateError);
      }

      const { data: profileData, error: profileError } = await supabase
        .from("users")
        .insert([
          {
            uid: user.id,
            full_name: user.user_metadata?.full_name || user.user_metadata?.name || "User",
            email: user.email,
            phone: formattedPhone,
            pin: hashedPin,
            auth_method: "google",
            google_id: user.user_metadata?.sub || user.id,
            has_google_oauth: true,
            email_verified: true,
            email_verified_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (profileError) {
        console.error("Profile creation error:", profileError);
        
        if (profileError.code === "23505" && profileError.message.includes("users_phone_key")) {
          return thunkAPI.rejectWithValue("This phone number is already registered. Please use a different number.");
        }
        return thunkAPI.rejectWithValue(profileError.message);
      }

      if (typeof window !== 'undefined') {
        sessionStorage.removeItem("googleAuthData");
      }

      return {
        session: session,
        profile: profileData,
      };
    } catch (err) {
      console.error("Google registration error:", err);
      return thunkAPI.rejectWithValue(err.message || "Failed to complete registration");
    }
  }
);

export const sendVerificationEmail = createAsyncThunk(
  "auth/sendVerificationEmail",
  async ({ userId, email }, thunkAPI) => {
    try {
      const { data: tokenData, error: tokenError } = await supabase.rpc(
        "generate_email_verification_token",
        { p_user_id: userId }
      );

      if (tokenError) {
        return thunkAPI.rejectWithValue(tokenError.message);
      }

      console.log("Verification email sent to:", email);
      return { success: true, email };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Failed to send verification email");
    }
  }
);

export const verifyEmailWithToken = createAsyncThunk(
  "auth/verifyEmailWithToken",
  async (token, thunkAPI) => {
    try {
      const { data, error } = await supabase.rpc("verify_email_with_token", {
        p_token: token,
      });

      if (error) {
        return thunkAPI.rejectWithValue(error.message);
      }

      const result = data?.[0];
      if (!result?.success) {
        return thunkAPI.rejectWithValue(result?.message || "Email verification failed");
      }

      return { success: true, userId: result.user_id };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Email verification failed");
    }
  }
);

export const resendVerificationEmail = createAsyncThunk(
  "auth/resendVerificationEmail",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const { profile } = state.auth;

      if (!profile?.email) {
        return thunkAPI.rejectWithValue("No email address found");
      }

      if (profile.email_verified) {
        return thunkAPI.rejectWithValue("Email already verified");
      }

      // ✅ UPDATED: Use Supabase's built-in password reset email as verification
      const { error } = await supabase.auth.resetPasswordForEmail(profile.email, {
        redirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}/auth/callback`,
      });

      if (error) {
        return thunkAPI.rejectWithValue(error.message);
      }

      return { success: true };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Failed to resend verification email");
    }
  }
);

export const verifyPin = createAsyncThunk(
  "auth/verifyPin",
  async ({ email, phone, pin }, thunkAPI) => {
    try {
      console.log("Starting PIN login...");
      
      let query = supabase.from("users").select("*");

      if (email) {
        query = query.eq("email", email.toLowerCase());
      } else if (phone) {
        query = query.eq("phone", formatPhone(phone));
      } else {
        return thunkAPI.rejectWithValue("Email or phone required");
      }

      const { data: userData, error: dbError } = await query.single();

      if (dbError) {
        console.error("User query error:", dbError);
        return thunkAPI.rejectWithValue(
          dbError.code === "PGRST116" ? "User not found" : dbError.message
        );
      }

      console.log("User found:", userData.phone);
      console.log("Auth method:", userData.auth_method);
      console.log("Has Google OAuth:", userData.has_google_oauth);

      // Verify PIN
      const pinMatch = await bcrypt.compare(pin, userData.pin);
      if (!pinMatch) {
        console.log("PIN mismatch");
        return thunkAPI.rejectWithValue("Invalid PIN");
      }

      console.log("PIN verified successfully");

      // FIXED: Only block if auth_method is STILL "google" 
      // If they set a PIN, auth_method becomes "manual" so they can login
      if (userData.has_google_oauth && userData.auth_method === "google") {
        return thunkAPI.rejectWithValue("Please set a PIN first to use PIN login, or continue with Google");
      }

      const authEmail = userData.email || `${userData.phone}@temp.bonusify.app`;
      const password = generatePassword(userData.phone);

      console.log("Attempting Supabase auth login...");
      console.log("Email:", authEmail);

      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: authEmail,
        password,
      });

      if (signInError) {
        console.error("Supabase auth error:", signInError);
        return thunkAPI.rejectWithValue(
          "Login failed. Please use 'Login with OTP' once to sync your account."
        );
      }

      console.log("Login successful");

      await supabase
        .from("users")
        .update({ last_login_at: new Date().toISOString() })
        .eq("uid", userData.uid);

      return { session: signInData.session, profile: userData };
    } catch (err) {
      console.error("PIN verification error:", err);
      return thunkAPI.rejectWithValue(err.message || "Login failed");
    }
  }
);

export const sendLoginOTP = createAsyncThunk(
  "auth/sendLoginOTP",
  async ({ email, phone }, thunkAPI) => {
    try {
      let query = supabase.from("users").select("id, email, phone, full_name");

      if (email) {
        query = query.eq("email", email.toLowerCase().trim());
      } else if (phone) {
        const formattedPhone = formatPhone(phone);
        query = query.eq("phone", formattedPhone);
      } else {
        return thunkAPI.rejectWithValue("Email or phone required");
      }

      const { data: userData, error } = await query.maybeSingle();

      if (error && error.code !== "PGRST116") {
        return thunkAPI.rejectWithValue(error.message);
      }

      if (!userData) {
        return thunkAPI.rejectWithValue("User not found. Please check your email or phone number.");
      }

      if (!userData.phone) {
        return thunkAPI.rejectWithValue("No phone number associated with this account. Please contact support.");
      }

      const isDevelopment = process.env.NODE_ENV === "development";
      const otp = isDevelopment ? "1234" : generateOTP();
      const formattedPhone = formatPhone(userData.phone);

      // TODO: Send actual SMS in production
      console.log(`Login OTP for ${formattedPhone}: ${otp}`);

      return {
        success: true,
        phone: formattedPhone,
        email: userData.email,
        userId: userData.id,
        otp,
        expiresAt: Date.now() + 10 * 60 * 1000,
      };
    } catch (err) {
      console.error("Send login OTP error:", err);
      return thunkAPI.rejectWithValue(err.message || "Failed to send OTP");
    }
  }
);

export const verifyLoginOTP = createAsyncThunk(
  "auth/verifyLoginOTP",
  async ({ phone, otp }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const { loginOtpData } = state.auth;
      const formattedPhone = formatPhone(phone);

      if (!loginOtpData?.otp) {
        return thunkAPI.rejectWithValue("OTP expired");
      }

      if (loginOtpData.phone !== formattedPhone) {
        return thunkAPI.rejectWithValue("Phone mismatch");
      }

      if (Date.now() > loginOtpData.expiresAt) {
        return thunkAPI.rejectWithValue("OTP expired");
      }

      if (otp !== loginOtpData.otp) {
        return thunkAPI.rejectWithValue("Invalid OTP");
      }

      const { data: userData, error: dbError } = await supabase
        .from("users")
        .select("*")
        .eq("phone", formattedPhone)
        .single();

      if (dbError) {
        return thunkAPI.rejectWithValue("User not found");
      }

      // Allow OTP login for everyone (Google users too)
      const authEmail = userData.email || `${userData.phone}@temp.bonusify.app`;
      const password = generatePassword(userData.phone);

      console.log("OTP verified, attempting login...");

      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: authEmail,
        password,
      });

      if (signInError) {
        console.error("Sign in error:", signInError);
        return thunkAPI.rejectWithValue("Login failed. Please contact support.");
      }

      await supabase
        .from("users")
        .update({ last_login_at: new Date().toISOString() })
        .eq("uid", userData.uid);

      return { session: signInData.session, profile: userData };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Login failed");
    }
  }
);

export const googleAuth = createAsyncThunk(
  "auth/googleAuth",
  async (_, thunkAPI) => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${typeof window !== "undefined" ? window.location.origin : ""}/auth/callback`,
        },
      });

      if (error) {
        return thunkAPI.rejectWithValue(error.message);
      }

      return { success: true };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Google auth failed");
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async ({ userId, fullName }, thunkAPI) => {
    try {
      const { data, error } = await supabase
        .from("users")
        .update({ 
          full_name: fullName,
          updated_at: new Date().toISOString()
        })
        .eq("id", userId)
        .select()
        .single();

      if (error) {
        return thunkAPI.rejectWithValue(error.message);
      }

      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Failed to update profile");
    }
  }
);

export const updateUserPhone = createAsyncThunk(
  "auth/updateUserPhone",
  async ({ userId, phone }, thunkAPI) => {
    try {
      const formattedPhone = formatPhone(phone);

      const { data: existingUser } = await supabase
        .from("users")
        .select("id")
        .eq("phone", formattedPhone)
        .neq("id", userId)
        .maybeSingle();

      if (existingUser) {
        return thunkAPI.rejectWithValue("This phone number is already in use by another account");
      }

      const { data: currentUser } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();

      if (!currentUser) {
        return thunkAPI.rejectWithValue("User not found");
      }

      const { data, error } = await supabase
        .from("users")
        .update({ 
          phone: formattedPhone,
          updated_at: new Date().toISOString()
        })
        .eq("id", userId)
        .select()
        .single();

      if (error) {
        return thunkAPI.rejectWithValue(error.message);
      }

      const newPassword = generatePassword(formattedPhone, "phone");
      
      const { error: authError } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (authError) {
        console.error("Failed to update auth password:", authError);
        await supabase
          .from("users")
          .update({ 
            phone: currentUser.phone,
            updated_at: new Date().toISOString()
          })
          .eq("id", userId);
        
        return thunkAPI.rejectWithValue("Failed to update authentication. Please try again.");
      }

      console.log("Phone and auth password updated successfully");
      return data;
    } catch (err) {
      console.error("Update phone error:", err);
      return thunkAPI.rejectWithValue(err.message || "Failed to update phone");
    }
  }
);

export const updateUserPin = createAsyncThunk(
  "auth/updateUserPin",
  async ({ userId, currentPin, newPin }, thunkAPI) => {
    try {
      console.log("Starting PIN update for user:", userId);
      
      const { data: currentUser, error: fetchError } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();

      if (fetchError || !currentUser) {
        console.error("User fetch error:", fetchError);
        return thunkAPI.rejectWithValue("User not found");
      }

      // If user has PIN, verify it (skip for Google users setting PIN first time)
      if (currentPin && currentUser.pin) {
        const pinMatch = await bcrypt.compare(currentPin, currentUser.pin);
        if (!pinMatch) {
          return thunkAPI.rejectWithValue("Current PIN is incorrect");
        }
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPin = await bcrypt.hash(newPin, salt);

      console.log("Updating PIN and enabling manual login...");
      
      // Update PIN AND enable manual login (even for Google users)
      const { data, error } = await supabase
        .from("users")
        .update({ 
          pin: hashedPin,
          // Don't change has_google_oauth, just change auth_method
          auth_method: "manual",  // Now they can use PIN login
          updated_at: new Date().toISOString()
        })
        .eq("id", userId)
        .select()
        .single();

      if (error) {
        console.error("Database update error:", error);
        return thunkAPI.rejectWithValue(error.message);
      }

      console.log("PIN updated successfully, manual login enabled");
      return data;
    } catch (err) {
      console.error("Update PIN error:", err);
      return thunkAPI.rejectWithValue(err.message || "Failed to update PIN");
    }
  }
);

export const deleteUserAccount = createAsyncThunk(
  "auth/deleteUserAccount",
  async ({ userId, uid, reason, otherReason }, thunkAPI) => {
    try {
      console.log("Starting account deletion for user:", userId);

      // Call backend API to delete account
      const response = await fetch("/api/delete-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          uid,
          reason,
          otherReason,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Delete account API error:", data);
        return thunkAPI.rejectWithValue(data.error || "Failed to delete account");
      }

      console.log("Account deleted successfully from database and auth");

      // Sign out the user locally
      await supabase.auth.signOut();

      // Clear all local storage
      localStorage.clear();
      sessionStorage.clear();

      console.log("User logged out and local data cleared");
      
      return { success: true };
    } catch (err) {
      console.error("Delete account error:", err);
      return thunkAPI.rejectWithValue(err.message || "Failed to delete account");
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await supabase.auth.signOut();
    return null;
  } catch (err) {
    return null;
  }
});

// REDUX SLICE
const initialState = {
  session: null,
  user: null,
  profile: null,
  loading: false,
  error: null,
  otpSent: false,
  otpVerified: false,
  isAuthenticated: false,
  googleUser: null,
  userExists: null,
  otpData: null,
  loginOtpData: null,
  emailVerificationSent: false,
  initialized: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetOtpState: (state) => {
      state.otpSent = false;
      state.otpVerified = false;
      state.otpData = null;
    },
    resetAuthState: () => initialState,
    setProfile: (state, action) => {
      state.profile = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // Initialize Auth
      .addCase(initializeAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.initialized = true;
        if (action.payload.authenticated) {
          state.session = action.payload.session;
          state.profile = action.payload.profile;
          state.isAuthenticated = true;
        } else {
          state.session = null;
          state.profile = null;
          state.isAuthenticated = false;
        }
      })
      .addCase(initializeAuth.rejected, (state) => {
        state.loading = false;
        state.initialized = true;
        state.isAuthenticated = false;
        state.session = null;
        state.profile = null;
      })
      
      // Check User Exists
      .addCase(checkUserExists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkUserExists.fulfilled, (state, action) => {
        state.loading = false;
        state.userExists = action.payload.exists;
      })
      .addCase(checkUserExists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.userExists = false;
      })
      
      // Send OTP
      .addCase(sendOTPAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOTPAction.fulfilled, (state, action) => {
        state.loading = false;
        state.otpSent = true;
        state.otpData = {
          otp: action.payload.otp,
          phone: action.payload.phone,
          expiresAt: action.payload.expiresAt,
        };
      })
      .addCase(sendOTPAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Verify OTP
      .addCase(verifyOTPAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOTPAction.fulfilled, (state) => {
        state.loading = false;
        state.otpVerified = true;
      })
      .addCase(verifyOTPAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Register User
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.session = action.payload.session;
        state.profile = action.payload.profile;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Complete Google Registration
      .addCase(completeGoogleRegistration.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(completeGoogleRegistration.fulfilled, (state, action) => {
        state.loading = false;
        state.session = action.payload.session;
        state.profile = action.payload.profile;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(completeGoogleRegistration.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      
      // Email Verification
      .addCase(sendVerificationEmail.pending, (state) => {
        state.emailVerificationSent = false;
      })
      .addCase(sendVerificationEmail.fulfilled, (state) => {
        state.emailVerificationSent = true;
      })
      .addCase(sendVerificationEmail.rejected, (state) => {
        state.emailVerificationSent = false;
      })
      .addCase(resendVerificationEmail.fulfilled, (state) => {
        state.emailVerificationSent = true;
      })
      .addCase(verifyEmailWithToken.fulfilled, (state) => {
        if (state.profile) {
          state.profile.email_verified = true;
          state.profile.email_verified_at = new Date().toISOString();
        }
      })
      
      // Verify PIN
      .addCase(verifyPin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyPin.fulfilled, (state, action) => {
        state.loading = false;
        state.session = action.payload.session;
        state.profile = action.payload.profile;
        state.isAuthenticated = true;
      })
      .addCase(verifyPin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Send Login OTP
      .addCase(sendLoginOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendLoginOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.otpSent = true;
        state.loginOtpData = {
          otp: action.payload.otp,
          phone: action.payload.phone,
          email: action.payload.email,
          userId: action.payload.userId,
          expiresAt: action.payload.expiresAt,
        };
      })
      .addCase(sendLoginOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Verify Login OTP
      .addCase(verifyLoginOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyLoginOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.session = action.payload.session;
        state.profile = action.payload.profile;
        state.isAuthenticated = true;
        state.loginOtpData = null;
      })
      .addCase(verifyLoginOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Google Auth
      .addCase(googleAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleAuth.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(googleAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update User Profile
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = { ...state.profile, ...action.payload };
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update User Phone
      .addCase(updateUserPhone.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserPhone.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = { ...state.profile, ...action.payload };
      })
      .addCase(updateUserPhone.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update User PIN
      .addCase(updateUserPin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserPin.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = { ...state.profile, ...action.payload };
      })
      .addCase(updateUserPin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete Account
      .addCase(deleteUserAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserAccount.fulfilled, () => {
        return initialState;
      })
      .addCase(deleteUserAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, () => {
        return initialState;
      })
      .addCase(logout.rejected, () => {
        return initialState;
      });
  },
});

export const { clearError, resetOtpState, resetAuthState, setProfile } = authSlice.actions;
export default authSlice.reducer;