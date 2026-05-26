"use client";
import { useState, useEffect } from "react";

export default function ManagePlants() {
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]); // Add suppliers state
  const [form, setForm] = useState({
    plant_name: "",
    price: "",
    plant_image_url: "",
    stock_quantity: "",
    category_id: "",
    supplier_id: "" // Add this to the form
  });

  useEffect(() => {
    // Fetch both for the dropdowns
    Promise.all([
      fetch("http://127.0.0.1:8000/categories/").then(res => res.json()),
      fetch("http://127.0.0.1:8000/suppliers/").then(res => res.json())
    ]).then(([catData, supData]) => {
      setCategories(catData);
      setSuppliers(supData);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://127.0.0.1:8000/plants/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        ...form, 
        price: parseFloat(form.price), 
        stock_quantity: parseInt(form.stock_quantity), 
        category_id: parseInt(form.category_id),
        supplier_id: parseInt(form.supplier_id) 
      })
    });

    if (res.ok) {
      alert("Plant Added Successfully!");
      setForm({ plant_name: "", price: "", plant_image_url: "", stock_quantity: "", category_id: "", supplier_id: "" });
    } else {
      const err = await res.json();
      alert(`Error: ${err.detail}`);
    }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-4xl font-black uppercase mb-8 tracking-tighter">Add New Specimen</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          placeholder="Plant Name" 
          className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-emerald-500"
          value={form.plant_name}
          onChange={e => setForm({...form, plant_name: e.target.value})}
          required
        />
        
        <div className="grid grid-cols-2 gap-4">
          <input 
            type="number" placeholder="Price" 
            className="bg-white/5 border border-white/10 p-4 rounded-xl outline-none"
            value={form.price}
            onChange={e => setForm({...form, price: e.target.value})}
            required
          />
          <input 
            type="number" placeholder="Initial Stock" 
            className="bg-white/5 border border-white/10 p-4 rounded-xl outline-none"
            value={form.stock_quantity}
            onChange={e => setForm({...form, stock_quantity: e.target.value})}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <select 
            className="bg-white/5 border border-white/10 p-4 rounded-xl outline-none text-zinc-400"
            value={form.category_id}
            onChange={e => setForm({...form, category_id: e.target.value})}
            required
          >
            <option value="">Select Category</option>
            {categories.map(c => (
              <option key={c.category_id} value={c.category_id} className="text-black">{c.category_name}</option>
            ))}
          </select>

          <select 
            className="bg-white/5 border border-white/10 p-4 rounded-xl outline-none text-zinc-400"
            value={form.supplier_id}
            onChange={e => setForm({...form, supplier_id: e.target.value})}
            required
          >
            <option value="">Select Supplier</option>
            {suppliers.map(s => (
              <option key={s.supplier_id} value={s.supplier_id} className="text-black">{s.supplier_name}</option>
            ))}
          </select>
        </div>

        <input 
          placeholder="Image URL" 
          className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none"
          value={form.plant_image_url}
          onChange={e => setForm({...form, plant_image_url: e.target.value})}
          required
        />
        
        <button className="w-full bg-emerald-500 p-4 rounded-xl text-black font-black uppercase tracking-widest hover:bg-emerald-400 transition-all">
          Upload to Database
        </button>
      </form>

      {/* Simple List to verify additions */}
        <div className="mt-16">
          <h2 className="text-2xl font-black uppercase tracking-tight mb-6 opacity-30">Recent Additions</h2>
          <div className="space-y-2">
            {/* You can map through a 'plants' state here if you fetch them on mount */}
            <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-[0.2em]">
              Total Inventory sync active with PostgreSQL
            </p>
          </div>
        </div>
    </div>
  );
}