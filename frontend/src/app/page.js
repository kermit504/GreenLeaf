"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Silk from "@/components/Silk";
import ShinyText from "@/components/ShinyText";
import AuthModal from "@/components/AuthModal";

export default function Home() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is already in storage
    const user = localStorage.getItem("user_id");
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleStart = () => {
    if (isLoggedIn) {
      // If logged in, go straight to plants
      router.push("/dashboard");
    } else {
      // Otherwise, open the modal
      setIsAuthOpen(true);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-zinc-950 font-sans overflow-hidden">
      
      <div className="absolute inset-0 z-0">
        <Silk
          speed={3}
          scale={0.8}
          color="#059669"
          noiseIntensity={1.2}
          rotation={0}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl px-6">
        <ShinyText
          text="Greenleaf Plant Nursery"
          speed={3}
          color="#47996e"
          shineColor="#42d09e"
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
        />

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button 
            onClick={handleStart}
            className="group px-10 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-widest text-sm transition-all duration-300 flex items-center gap-3 shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95"
          >
            <span>{isLoggedIn ? "Continue Shopping" : "Get Started"}</span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>

          {isLoggedIn && (
            <button 
              onClick={() => {
                localStorage.clear();
                setIsLoggedIn(false);
              }}
              className="text-zinc-500 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors px-6 py-4"
            >
              Logout Account
            </button>
          )}
        </div>
      </div>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
}