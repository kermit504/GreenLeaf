"use client";
import { useState, useEffect } from "react";

export default function AdminDashboardHome() {
  const [stats, setStats] = useState({
    totalSalesCount: 0,
    totalRevenue: 0,
    lowStockCount: 0,
    supplierCount: 0,
    salesStream: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch live inventory, supply lines, and sales ledgers from your FastAPI backend
    Promise.all([
      fetch("http://127.0.0.1:8000/plants/").then((res) => res.json()).catch(() => []),
      fetch("http://127.0.0.1:8000/suppliers/").then((res) => res.json()).catch(() => []),
      // Using your existing backend sales table query fallback
      fetch("http://127.0.0.1:8000/checkout/").then((res) => res.json()).catch(() => []) 
    ])
      .then(([plants, suppliers, sales]) => {
        // 1. Calculate genuine low stock items (less than 5 units left)
        const lowStock = plants.filter((p) => p.stock_quantity < 5).length;

        // 2. Map plant prices into a fast dictionary look-up for parsing sales records
        const plantPriceMap = {};
        const plantNameMap = {};
        plants.forEach(p => {
          plantPriceMap[p.plant_id] = p.price;
          plantNameMap[p.plant_id] = p.plant_name;
        });

        // 3. Process genuine sales records if they exist in your database
        let realRevenue = 0;
        let realSalesCount = 0;
        const processedSales = [];

        if (Array.isArray(sales)) {
          realSalesCount = sales.length;
          sales.forEach((sale) => {
            const price = plantPriceMap[sale.plant_id] || 0;
            const lineTotal = price * (sale.qty_sold || 0);
            realRevenue += lineTotal;

            processedSales.push({
              id: sale.sale_id,
              item: plantNameMap[sale.plant_id] || `Plant ID: ${sale.plant_id}`,
              total: `₹${lineTotal.toFixed(2)}`,
              status: "Success"
            });
          });
        }

        setStats({
          totalSalesCount: realSalesCount,
          totalRevenue: realRevenue,
          lowStockCount: lowStock,
          supplierCount: suppliers.length,
          salesStream: processedSales.reverse() // Shows newest orders first
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-emerald-500 animate-pulse">
          Synchronizing Live Ledger...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl space-y-12 animate-in fade-in duration-500">
      {/* Top Banner Row */}
      <div>
        <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-white">
            Overview
        </h1>

      </div>

      {/* Analytics Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Gross Revenue */}
        <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col justify-between group hover:border-emerald-500/30 transition-colors">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Gross Revenue</p>
          <p className="text-3xl font-black text-emerald-400 mt-4 tracking-tight">
            ₹{stats.totalRevenue.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </p>
        </div>

        {/* Completed Orders */}
        <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col justify-between group hover:border-emerald-500/30 transition-colors">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Items Sold</p>
          <p className="text-3xl font-black text-white mt-4 tracking-tight">
            {stats.totalSalesCount} <span className="text-xs text-zinc-600 font-normal">units</span>
          </p>
        </div>

        {/* Critical Stock Alerts */}
        <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col justify-between group hover:border-red-500/30 transition-colors">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Low Stock Alerts</p>
          <p className={`text-3xl font-black mt-4 tracking-tight ${stats.lowStockCount > 0 ? "text-red-400" : "text-zinc-400"}`}>
            {stats.lowStockCount} <span className="text-xs text-zinc-600 font-normal">items</span>
          </p>
        </div>

        {/* Active Suppliers */}
        <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col justify-between group hover:border-emerald-500/30 transition-colors">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Registered Suppliers</p>
          <p className="text-3xl font-black text-white mt-4 tracking-tight">
            {stats.supplierCount} <span className="text-xs text-zinc-600 font-normal">firms</span>
          </p>
        </div>
      </div>

      {/* Live Transaction Stream Monitor */}
      <div className="bg-white/[0.01] border border-white/5 rounded-3xl p-8">
        <h2 className="text-xl font-black uppercase tracking-tight text-white mb-6">
          Live Database Checkout Feed
        </h2>
        
        {stats.salesStream.length > 0 ? (
          <div className="divide-y divide-white/5 max-h-[300px] overflow-y-auto pr-2">
            {stats.salesStream.map((sale) => (
              <div key={sale.id} className="py-4 flex justify-between items-center text-sm first:pt-0 last:pb-0">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs bg-zinc-900 border border-white/5 text-zinc-500 px-2 py-1 rounded">
                    SALE #{sale.id}
                  </span>
                  <p className="font-bold text-white uppercase tracking-tight">{sale.item}</p>
                </div>
                <div className="flex items-center gap-6">
                  <p className="font-mono text-zinc-300 font-bold">{sale.total}</p>
                  <span className="text-[9px] uppercase font-black bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded tracking-wider">
                    {sale.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-zinc-600 text-sm italic py-4">
            No checkouts have occurred yet. Complete a transaction from the checkout page to see the feed update live!
          </p>
        )}
      </div>
    </div>
  );
}