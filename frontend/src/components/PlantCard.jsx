"use client";
import { useState } from "react";
import BorderGlow from "@/components/BorderGlow";
import { useCart } from "@/components/CartContext";

const API_BASE = "http://127.0.0.1:8000";

const PlantCard = ({ plant_id, plant_name, price, plant_image_url, stock_quantity, care_requirements }) => {
  const { addToCart } = useCart();
  const [isClicked, setIsClicked] = useState(false);

  const isLowStock = stock_quantity > 0 && stock_quantity < 5;
  const isOutOfStock = stock_quantity === 0;

  const care = care_requirements && care_requirements.length > 0 ? care_requirements[0] : null;

  const fullImageUrl = plant_image_url?.startsWith("http")
    ? plant_image_url
    : `${API_BASE}/${plant_image_url?.replace(/^\//, "")}`;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (isOutOfStock) return;
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);
    addToCart({ plant_id, plant_name, price, plant_image_url });
  };

  return (
    <BorderGlow
      className={`w-full cursor-pointer group transition-transform duration-300 ${isClicked ? "scale-95" : "scale-100"}`}
      glowColor="160 80 60"
      backgroundColor="#09090b"
      glowRadius={60}
      glowIntensity={0.9}
      colors={["#10B981", "#34d399", "#064e3b"]}
    >
      <div className="flex flex-col p-4 h-full">
        <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-5 bg-zinc-900 border border-white/5">
          <img
            src={fullImageUrl}
            alt={plant_name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          <div className="absolute top-3 left-3 px-3 py-1.5 rounded-lg bg-emerald-500 text-white font-bold text-lg shadow-xl">
            ₹{price.toFixed(2)}
          </div>

          <div
            className={`absolute top-3 right-3 px-3 py-1 rounded-md backdrop-blur-md border text-[10px] font-black uppercase tracking-tighter transition-all duration-300 ${
              isOutOfStock
                ? "bg-red-500/20 border-red-500/40 text-red-400"
                : isLowStock
                ? "bg-orange-500/20 border-orange-500/40 text-orange-400"
                : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
            }`}
          >
            {isOutOfStock ? "Out of Stock" : isLowStock ? "Low Stock" : "In Stock"}
          </div>

          <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center space-y-4">
            <button
              disabled={isOutOfStock}
              onClick={handleAddToCart}
              className={`px-6 py-2 bg-emerald-500 hover:bg-emerald-400 disabled:bg-zinc-700 text-white text-xs font-black uppercase tracking-widest rounded-full transition-all active:scale-90 ${
                isClicked ? "bg-white text-emerald-600" : ""
              }`}
            >
              {isClicked ? "Added!" : isOutOfStock ? "Unavailable" : "Add to Cart"}
            </button>
            <div className="text-3xl font-black text-white">
              {stock_quantity} <span className="text-sm font-normal text-zinc-400">units</span>
            </div>
          </div>
        </div>

        <div className="px-1 flex flex-col flex-grow">
          <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-emerald-400 transition-colors uppercase">
            {plant_name}
          </h3>
          
          {care && (
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="text-[10px] uppercase font-black bg-zinc-950 text-zinc-400 px-2.5 py-1 rounded border border-white/5 tracking-wider">
                <span className="text-white">Sunlight requirements:</span> {care.sunlight_requirement}
              </span>
              <span className="text-[10px] uppercase font-black bg-zinc-950 text-zinc-400 px-2.5 py-1 rounded border border-white/5 tracking-wider">
                <span className="text-white">Soil type:</span> {care.soil_type}
              </span>
            </div>
          )}
        </div>
      </div>
    </BorderGlow>
  );
};

export default PlantCard;