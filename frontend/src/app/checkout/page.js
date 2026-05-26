"use client";
import { useCart } from "@/components/CartContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

const API_BASE = "http://127.0.0.1:8000";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleConfirmOrder = async () => {
    if (cart.length === 0) return;

    const storedUserId = localStorage.getItem("user_id");
    
    const orderData = {
      customer_id: storedUserId ? parseInt(storedUserId) : 1,
      sale_date: new Date().toISOString().split("T")[0],
      items: cart.map((item) => ({
        plant_id: parseInt(item.plant_id),
        qty_sold: parseInt(item.quantity),
      })),
    };

    try {
      const res = await fetch(`${API_BASE}/checkout/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      if (res.ok) {
        clearCart();
        router.push("/dashboard?ordered=true");
      } else {
        const message = typeof data.detail === 'string' 
          ? data.detail 
          : JSON.stringify(data.detail);
        alert(`Transaction Failed: ${message}`);
      }
    } catch {
      alert("Backend is offline!");
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 md:p-24 font-sans">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/dashboard"
          className="text-zinc-500 hover:text-emerald-400 text-xs font-bold uppercase tracking-widest mb-8 inline-block transition-colors"
        >
          ← Continue Shopping
        </Link>

        <h1 className="text-6xl md:text-8xl font-black mb-16 tracking-tighter uppercase text-emerald-500">
          Checkout
        </h1>

        <div className="space-y-4 mb-12">
          {cart.length > 0 ? (
            cart.map((item, index) => (
              <div
                key={`${item.plant_id}-${index}`}
                className="flex justify-between items-center p-8 bg-white/[0.02] border border-white/5 rounded-3xl hover:border-emerald-500/30 transition-colors"
              >
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-tight">{item.plant_name}</h2>
                  <p className="text-zinc-500 font-bold text-sm uppercase tracking-widest mt-1">
                    Qty: {item.quantity} × ${item.price.toFixed(2)}
                  </p>
                </div>
                <p className="text-2xl font-mono text-emerald-400">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))
          ) : (
            <div className="py-20 text-center border border-dashed border-white/10 rounded-3xl">
              <p className="text-zinc-500 italic text-lg">Your cart is currently empty.</p>
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="flex flex-col md:flex-row justify-between items-center p-12 bg-emerald-500 rounded-[2rem] text-black gap-8">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">Final Balance</p>
              <p className="text-6xl font-black tracking-tighter">${totalPrice.toFixed(2)}</p>
            </div>
            <button
              onClick={handleConfirmOrder}
              className="w-full md:w-auto px-16 py-6 bg-black text-white font-black uppercase tracking-widest rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-2xl"
            >
              Confirm Purchase
            </button>
          </div>
        )}
      </div>
    </div>
  );
}