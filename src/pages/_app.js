import "@/styles/globals.css";
import Nav from "../components/Nav";
import { useState } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
// 👉 Lazy load Footer
const Footer = dynamic(() => import("../components/Footer"), {
  loading: () => <div className="text-center py-4">Loading footer...</div>
});

export default function App({ Component, pageProps }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen flex flex-col">
       <Head>
        <title>Bonusify: The Highest Cashback Store</title>
      </Head>
      <Nav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <main className={`flex-1 transition-all duration-300 mb-0 xl:pb-0 ${sidebarOpen ? "xl:ml-42" : "xl:ml-15"}`}>
        <Component {...pageProps} />
      </main>

      {/* Lazy loaded Footer */}
      <main className={`transition-all duration-300 ${sidebarOpen ? "xl:ml-42" : "xl:ml-15"}`}>
        <Footer />
      </main>
    </div>
  );
}