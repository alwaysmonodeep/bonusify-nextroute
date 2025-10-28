import "@/styles/globals.css";
import Nav from "../components/ui/Nav";
import { useState } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../store";
import EmailVerificationBanner from "@/components/ui/EmailVerificationBanner";

// Lazy load Footer
const Footer = dynamic(() => import("../components/ui/Footer"), {
  loading: () => <div className="text-center py-4">Loading footer...</div>,
});

// ===============================
// WRAPPER COMPONENT
// ===============================
function AppContent({ Component, pageProps }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { profile } = useSelector((state) => state.auth); // ✅ Check if user logged in

  const isAuthenticated = !!profile; // true if logged in

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Bonusify: The Highest Cashback Store</title>
      </Head>

      {/* Show banner + navbar always */}
      <EmailVerificationBanner />
      <Nav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* MAIN CONTENT */}
      <main
        className={`flex-1 transition-all duration-300 mb-0 xl:pb-0 ${
          isAuthenticated ? (sidebarOpen ? "xl:ml-42" : "xl:ml-15") : ""
        }`}
      >
        <Component {...pageProps} />
      </main>

      {/* FOOTER (lazy-loaded) */}
      <main
        className={`transition-all duration-300 ${
          isAuthenticated ? (sidebarOpen ? "xl:ml-42" : "xl:ml-15") : ""
        }`}
      >
        <Footer />
      </main>
    </div>
  );
}

// ===============================
// ROOT COMPONENT
// ===============================
export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>} persistor={persistor}>
        <AppContent Component={Component} pageProps={pageProps} />
      </PersistGate>
    </Provider>
  );
}
