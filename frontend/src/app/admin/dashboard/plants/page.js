"use client";
import { useState, useEffect } from "react";

export default function ManagePlants() {
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [plants, setPlants] = useState([]);
  
  const [showQuickSupplier, setShowQuickSupplier] = useState(false);
  const [quickSupplier, setQuickSupplier] = useState({ supplier_name: "", city: "" });

  const [editingPlantId, setEditingPlantId] = useState(null);

  const [form, setForm] = useState({
    plant_name: "",
    price: "",
    plant_image_url: "",
    stock_quantity: "",
    category_id: "",
    supplier_id: "", 
    sunlight_requirement: "",
    soil_type: ""
  });

  const fetchData = () => {
    fetch("http://127.0.0.1:8000/categories/")
      .then(res => res.json())
      .then(data => setCategories(data));

    fetch("http://127.0.0.1:8000/suppliers/")
      .then(res => res.json())
      .then(data => setSuppliers(data))
      .catch(() => setSuppliers([]));

    fetch("http://127.0.0.1:8000/plants/")
      .then(res => res.json())
      .then(data => setPlants(data))
      .catch(() => setPlants([]));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleQuickSupplierSubmit = async (e) => {
    e.preventDefault();
    if (!quickSupplier.supplier_name || !quickSupplier.city) {
      alert("Please fill in both Supplier Name and City.");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/suppliers/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quickSupplier)
      });

      if (res.ok) {
        const savedSupplier = await res.json();
        alert("New Supplier Registered Successfully!");
        
        fetch("http://127.0.0.1:8000/suppliers/")
          .then(r => r.json())
          .then(data => {
            setSuppliers(data);
            setForm(prev => ({ ...prev, supplier_id: savedSupplier.supplier_id }));
          });

        setQuickSupplier({ supplier_name: "", city: "" });
        setShowQuickSupplier(false);
      } else {
        alert("Failed to register supplier profile.");
      }
    } catch {
      alert("Error contacting the server.");
    }
  };

  const handleEditClick = (plant) => {
    setEditingPlantId(plant.plant_id);
    const careInfo = plant.care_requirements && plant.care_requirements.length > 0 
      ? plant.care_requirements[0] 
      : { sunlight_requirement: "", soil_type: "" };

    setForm({
      plant_name: plant.plant_name,
      price: plant.price.toString(),
      plant_image_url: plant.plant_image_url,
      stock_quantity: plant.stock_quantity.toString(),
      category_id: plant.category_id.toString(),
      supplier_id: plant.supplier_id.toString(),
      sunlight_requirement: careInfo.sunlight_requirement || "",
      soil_type: careInfo.soil_type || ""
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingPlantId(null);
    setForm({ 
      plant_name: "", 
      price: "", 
      plant_image_url: "", 
      stock_quantity: "", 
      category_id: "",
      supplier_id: "",
      sunlight_requirement: "",
      soil_type: ""
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.category_id || !form.supplier_id) {
      alert("Please select both a Category and a Supplier.");
      return;
    }

    const payload = {
      plant_name: form.plant_name, 
      price: parseFloat(form.price), 
      plant_image_url: form.plant_image_url, 
      stock_quantity: parseInt(form.stock_quantity), 
      category_id: parseInt(form.category_id),
      supplier_id: parseInt(form.supplier_id)
    };

    if (editingPlantId) {
      const plantRes = await fetch(`http://127.0.0.1:8000/plants/${editingPlantId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (plantRes.ok) {
        if (form.sunlight_requirement || form.soil_type) {
          await fetch(`http://127.0.0.1:8000/care/${editingPlantId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              sunlight_requirement: form.sunlight_requirement || "Not specified",
              soil_type: form.soil_type || "Not specified"
            })
          });
        }
        alert("Specimen details updated successfully!");
        handleCancelEdit();
        fetchData();
      } else {
        alert("Failed to update plant specimen.");
      }
    } else {
      const plantRes = await fetch("http://127.0.0.1:8000/plants/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (plantRes.ok) {
        const createdPlant = await plantRes.json();
        const newPlantId = createdPlant.plant_id;

        if (form.sunlight_requirement || form.soil_type) {
          await fetch("http://127.0.0.1:8000/care/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              plant_id: newPlantId,
              sunlight_requirement: form.sunlight_requirement || "Not specified",
              soil_type: form.soil_type || "Not specified"
            })
          });
        }

        alert("Plant, Supplier link, & Care Requirements Added Successfully!");
        handleCancelEdit();
        fetchData();
      } else {
        alert("Failed to create plant specimen. Verify your inputs.");
      }
    }
  };

  return (
    <div className="max-w-4xl space-y-16">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-black uppercase mb-8">
          {editingPlantId ? "Modify Specimen" : "Add New Specimen"}
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            placeholder="Plant Name" 
            className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-emerald-500 text-white"
            value={form.plant_name}
            onChange={e => setForm({...form, plant_name: e.target.value})}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <input 
              type="number" placeholder="Price (₹)" 
              className="bg-white/5 border border-white/10 p-4 rounded-xl outline-none text-white"
              value={form.price}
              onChange={e => setForm({...form, price: e.target.value})}
            />
            <input 
              type="number" placeholder="Initial Stock" 
              className="bg-white/5 border border-white/10 p-4 rounded-xl outline-none text-white"
              value={form.stock_quantity}
              onChange={e => setForm({...form, stock_quantity: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select 
              className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none text-white"
              value={form.category_id}
              onChange={e => setForm({...form, category_id: e.target.value})}
            >
              <option value="" className="bg-zinc-950">Select Category</option>
              {categories.map(c => (
                <option key={c.category_id} value={c.category_id} className="text-black">{c.category_name}</option>
              ))}
            </select>

            <div className="flex gap-2">
              <select 
                className="flex-grow bg-white/5 border border-white/10 p-4 rounded-xl outline-none text-white"
                value={form.supplier_id}
                onChange={e => setForm({...form, supplier_id: e.target.value})}
              >
                <option value="" className="bg-zinc-950">Select Supplier</option>
                {suppliers.map(s => (
                  <option key={s.supplier_id} value={s.supplier_id} className="text-black">{s.supplier_name}</option>
                ))}
              </select>
              
              <button
                type="button"
                onClick={() => setShowQuickSupplier(!showQuickSupplier)}
                className={`px-4 rounded-xl font-black text-xl transition-all duration-300 ${
                  showQuickSupplier 
                    ? "bg-red-500/20 text-red-400 border border-red-500/30 rotate-45" 
                    : "bg-emerald-500 text-black hover:bg-emerald-400"
                }`}
                title="Add New Supplier Directly"
              >
                +
              </button>
            </div>
          </div>

          {showQuickSupplier && (
            <div className="p-5 border border-emerald-500/20 rounded-2xl bg-emerald-500/[0.02] space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-black uppercase tracking-widest text-emerald-400">Quick Register Supplier</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input 
                  placeholder="Supplier Name" 
                  className="bg-white/5 border border-white/10 p-3 rounded-xl outline-none text-white text-sm focus:border-emerald-500"
                  value={quickSupplier.supplier_name}
                  onChange={e => setQuickSupplier({...quickSupplier, supplier_name: e.target.value})}
                />
                <input 
                  placeholder="City Location" 
                  className="bg-white/5 border border-white/10 p-3 rounded-xl outline-none text-white text-sm focus:border-emerald-500"
                  value={quickSupplier.city}
                  onChange={e => setQuickSupplier({...quickSupplier, city: e.target.value})}
                />
              </div>
              <button 
                type="button"
                onClick={handleQuickSupplierSubmit}
                className="w-full py-2.5 bg-emerald-500 text-black font-bold uppercase text-xs tracking-wider rounded-lg hover:bg-emerald-400 transition-all"
              >
                Save & Apply Supplier
              </button>
            </div>
          )}

          <input 
            placeholder="Image URL" 
            className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none text-white focus:border-emerald-500"
            value={form.plant_image_url}
            onChange={e => setForm({...form, plant_image_url: e.target.value})}
          />

          <div className="p-5 border border-dashed border-white/10 rounded-2xl space-y-4 bg-white/[0.01]">
            <h3 className="text-xs font-black uppercase tracking-widest text-emerald-500">Care Specifications</h3>
            <div className="grid grid-cols-2 gap-4">
              <input 
                placeholder="Sunlight Requirement" 
                className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none text-white"
                value={form.sunlight_requirement}
                onChange={e => setForm({...form, sunlight_requirement: e.target.value})}
              />
              <input 
                placeholder="Soil Type " 
                className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none text-white"
                value={form.soil_type}
                onChange={e => setForm({...form, soil_type: e.target.value})}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button type="submit" className="flex-grow bg-emerald-500 p-4 rounded-xl text-black font-black uppercase tracking-widest hover:bg-emerald-400 transition-all">
              {editingPlantId ? "Save Modifications" : "Upload Specimen to Database"}
            </button>
            {editingPlantId && (
              <button type="button" onClick={handleCancelEdit} className="bg-zinc-900 border border-white/10 text-white px-6 rounded-xl font-bold uppercase text-xs tracking-wider hover:bg-zinc-800 transition-all">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="border-t border-white/5 pt-12">
        <h2 className="text-2xl font-black uppercase mb-6 text-zinc-400">Inventory Management Log</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {plants.map((plant) => (
            <div key={plant.plant_id} className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex justify-between items-center group hover:border-white/10 transition-colors">
              <div className="flex items-center gap-4">
                <img src={plant.plant_image_url} alt={plant.plant_name} className="w-12 h-12 object-cover rounded-lg border border-white/5 bg-zinc-950" />
                <div>
                  <p className="font-bold text-white text-sm uppercase">{plant.plant_name}</p>
                  <p className="text-xs text-zinc-500 font-mono">₹{plant.price} • Stock: {plant.stock_quantity}</p>
                </div>
              </div>
              <button onClick={() => handleEditClick(plant)} className="px-4 py-2 bg-white/5 border border-white/10 hover:border-emerald-500/30 text-zinc-300 hover:text-emerald-400 font-bold uppercase text-xs rounded-xl transition-all">
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}