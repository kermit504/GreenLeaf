"use client";
import { useState, useEffect } from "react";

export default function ManagePlants() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    plant_name: "",
    price: "",
    plant_image_url: "",
    stock_quantity: "",
    category_id: ""
  });

  useEffect(() => {
    fetch("http://127.0.0.1:8000/categories/")
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://127.0.0.1:8000/plants/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, price: parseFloat(form.price), stock_quantity: parseInt(form.stock_quantity), category_id: parseInt(form.category_id) })
    });

    if (res.ok) {
      alert("Plant Added Successfully!");
      setForm({ plant_name: "", price: "", plant_image_url: "", stock_quantity: "", category_id: "" });
    }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-4xl font-black uppercase mb-8">Add New Specimen</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          placeholder="Plant Name" 
          className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-emerald-500"
          value={form.plant_name}
          onChange={e => setForm({...form, plant_name: e.target.value})}
        />
        <div className="grid grid-cols-2 gap-4">
          <input 
            type="number" placeholder="Price" 
            className="bg-white/5 border border-white/10 p-4 rounded-xl outline-none"
            value={form.price}
            onChange={e => setForm({...form, price: e.target.value})}
          />
          <input 
            type="number" placeholder="Initial Stock" 
            className="bg-white/5 border border-white/10 p-4 rounded-xl outline-none"
            value={form.stock_quantity}
            onChange={e => setForm({...form, stock_quantity: e.target.value})}
          />
        </div>
        <select 
          className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none"
          value={form.category_id}
          onChange={e => setForm({...form, category_id: e.target.value})}
        >
          <option value="">Select Category</option>
          {categories.map(c => (
            <option key={c.category_id} value={c.category_id} className="text-black">{c.category_name}</option>
          ))}
        </select>
        <input 
          placeholder="Image URL" 
          className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none"
          value={form.plant_image_url}
          onChange={e => setForm({...form, plant_image_url: e.target.value})}
        />
        <button className="w-full bg-emerald-500 p-4 rounded-xl text-black font-black uppercase tracking-widest hover:bg-emerald-400 transition-all">
          Upload to Database
        </button>
      </form>
    </div>
  );
}