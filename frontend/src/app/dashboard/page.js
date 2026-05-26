"use client";
import { useState, useEffect } from "react";
import Silk from "@/components/Silk";
import ShinyText from "@/components/ShinyText";
import CheckoutButton from "@/components/CheckoutButton";
import LogoutButton from "@/components/LogoutButton";
import Link from "next/link";
import CategoryCard from "@/components/CategoryCard";

const API_BASE = "http://127.0.0.1:8000";

export default function Dashboard() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/categories/`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching categories:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#050505] font-sans overflow-hidden py-16 px-8 md:px-16">
      <CheckoutButton />
      <LogoutButton />

      <div className="absolute inset-0 z-0 pointer-events-none opacity-70">
        <Silk speed={1.5} scale={1.1} color="#10B981" noiseIntensity={1.4} rotation={0} />
      </div>

      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: "radial-gradient(circle at center, transparent 10%, rgba(5,5,5,0.85) 100%)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="mb-20 space-y-4">
          <ShinyText
            text="Categories"
            speed={3}
            color="#10B981"
            shineColor="#ECFDF5"
            className="text-7xl md:text-9xl font-black tracking-tighter leading-none"
          />
          <p className="text-zinc-500 max-w-xl text-xl font-medium leading-relaxed">
            Explore our diverse botanical collections. Select a category to manage stock and plant details.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="rounded-3xl bg-zinc-900/40 border border-white/5 h-72 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
            {categories.map((category) => (
              <Link
                key={category.category_id}
                href={`/dashboard/${category.category_id}`}
                className="group transition-all duration-500 ease-out hover:scale-[1.02]"
              >
                <CategoryCard
                  name={category.category_name}
                  imageUrl={
                    category.category_image_url.startsWith("http")
                      ? category.category_image_url
                      : `${API_BASE}${category.category_image_url.startsWith("/") ? "" : "/"}${category.category_image_url}`
                  }
                />
              </Link>
            ))}
          </div>
        )}

        <div className="mt-24 border-t border-white/5 pt-8 flex justify-center">
          <p className="text-zinc-600 text-sm font-light tracking-widest uppercase">
            Greenleaf Plant Nursery &copy; 2026
          </p>
        </div>
      </div>
    </div>
  );
}