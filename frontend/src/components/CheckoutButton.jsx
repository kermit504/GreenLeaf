"use client";
import { useCart } from "@/components/CartContext";
import Link from "next/link";

export default function CheckoutButton() {
  const { cart } = useCart();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  if (cartCount === 0) return null;

  return (
    <Link 
      href="/checkout"
      className="fixed top-8 left-8 z-[60] flex items-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-black px-6 py-3 rounded-full font-black uppercase text-[10px] tracking-widest transition-all hover:scale-105 active:scale-95 shadow-xl shadow-emerald-500/20 group"
    >
      <div className="relative">
        <svg className="w-4 h-4 transition-transform group-hover:-rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      </div>
      <span>Checkout ({cartCount})</span>
    </Link>
  );
}