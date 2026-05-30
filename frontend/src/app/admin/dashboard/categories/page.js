"use client";
import { useState, useEffect } from "react";

export default function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [form, setForm] = useState({
    category_name: "",
    category_image_url: ""
  });

  const fetchCategories = async () => {
    const res = await fetch("http://127.0.0.1:8000/categories/");
    const data = await res.json();
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleEditClick = (cat) => {
    setEditingCategoryId(cat.category_id);
    setForm({
      category_name: cat.category_name,
      category_image_url: cat.category_image_url || ""
    });
  };

  const handleCancelEdit = () => {
    setEditingCategoryId(null);
    setForm({ category_name: "", category_image_url: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingCategoryId 
      ? `http://127.0.0.1:8000/categories/${editingCategoryId}`
      : "http://127.0.0.1:8000/categories/";
    const method = editingCategoryId ? "PUT" : "POST";

    const res = await fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    if (res.ok) {
      alert(editingCategoryId ? "Category Updated Successfully!" : "New Category Registered!");
      handleCancelEdit();
      fetchCategories();
    } else {
      const err = await res.json();
      alert(`Error: ${err.detail}`);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-16">
      <div className="flex-1 max-w-md">
        <h1 className="text-4xl font-black uppercase mb-8 tracking-tighter">
          {editingCategoryId ? "Edit Category" : "Add Category"}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Display Name</label>
            <input 
              placeholder="Flowers" 
              className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-emerald-500 transition-all"
              value={form.category_name}
              onChange={e => setForm({...form, category_name: e.target.value})}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Thumbnail URL</label>
            <input 
              placeholder="https://images.unsplash.com/..." 
              className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-emerald-500 transition-all"
              value={form.category_image_url}
              onChange={e => setForm({...form, category_image_url: e.target.value})}
              required
            />
          </div>

          <div className="flex gap-4">
            <button className="flex-grow bg-emerald-500 p-5 rounded-2xl text-black font-black uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 active:scale-95">
              {editingCategoryId ? "Save Changes" : "Initialize Category"}
            </button>
            {editingCategoryId && (
              <button type="button" onClick={handleCancelEdit} className="bg-zinc-900 border border-white/10 text-white px-6 rounded-2xl font-bold uppercase text-xs tracking-wider hover:bg-zinc-800 transition-all">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="flex-1">
        <h2 className="text-4xl font-black uppercase mb-8 tracking-tighter opacity-30">Active Sections</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categories.map((cat) => (
            <div key={cat.category_id} className="group p-6 bg-white/[0.02] border border-white/5 rounded-3xl flex items-center justify-between hover:border-emerald-500/30 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 font-mono text-xs">
                  #{cat.category_id}
                </div>
                <div>
                  <p className="font-black uppercase tracking-tight leading-none">{cat.category_name}</p>
                  <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest mt-1">ID Verified</p>
                </div>
              </div>
              <button onClick={() => handleEditClick(cat)} className="px-4 py-2 bg-white/5 border border-white/10 hover:border-emerald-500/30 text-zinc-300 hover:text-emerald-400 font-bold uppercase text-xs rounded-xl transition-all">
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}