import Silk from "@/components/Silk";
import ShinyText from "@/components/ShinyText";
import PlantCard from "@/components/PlantCard";
import Link from "next/link";
import CheckoutButton from "@/components/CheckoutButton";
import LogoutButton from "@/components/LogoutButton";

const API_BASE = "http://127.0.0.1:8000";

export default async function CategoryPlantsPage({ params }) {
  const { category } = await params;

  const [plantRes, catRes] = await Promise.all([
    fetch(`${API_BASE}/plants/?category_id=${category}`, { cache: "no-store" }),
    fetch(`${API_BASE}/categories/`, { cache: "no-store" }),
  ]);

  const plants = await plantRes.json();
  const allCats = await catRes.json();

  const currentCat = allCats.find((c) => Number(c.category_id) === Number(category));
  const displayTitle = currentCat ? currentCat.category_name : "Botanical Collection";

  return (
    <div className="relative min-h-screen w-full bg-[#050505] font-sans overflow-hidden py-16 px-8 md:px-16">
      <CheckoutButton />
      <LogoutButton />
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <Silk speed={0.8} scale={1.4} color="#10B981" noiseIntensity={1.2} rotation={0} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <Link
          href="/dashboard"
          className="group inline-flex items-center gap-3 text-zinc-500 hover:text-emerald-400 transition-all duration-300 mb-16"
        >
          <div className="p-2 rounded-full border border-white/5 bg-white/5 group-hover:border-emerald-500/30">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
          <span className="text-xs font-bold uppercase tracking-[0.2em]">Return to Dashboard</span>
        </Link>

        <div className="relative mb-24 p-8 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-md">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <ShinyText
              text={displayTitle}
              speed={3}
              color="#10B981"
              shineColor="#ECFDF5"
              className="text-7xl md:text-8xl font-black tracking-tighter leading-none uppercase"
            />
            <div className="px-8 py-6 rounded-2xl bg-white/[0.03] border border-white/5 text-center min-w-[140px]">
              <p className="text-3xl font-black text-white">{plants.length}</p>
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">Species</p>
            </div>
          </div>
        </div>

        {plants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {plants.map((plant) => (
              <div key={plant.plant_id} className="group transition-all duration-700">
                <PlantCard
                  plant_id={plant.plant_id}
                  plant_name={plant.plant_name}
                  price={plant.price}
                  stock_quantity={plant.stock_quantity}
                  plant_image_url={plant.plant_image_url}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="col-span-full py-32 flex flex-col items-center justify-center rounded-[3rem] border border-dashed border-white/10 bg-white/[0.01]">
            <div className="w-16 h-16 rounded-full bg-emerald-500/5 flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-emerald-500/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <p className="text-zinc-400 text-xl font-medium tracking-tight">No botanical specimens listed</p>
            <Link
              href="/dashboard"
              className="mt-8 px-8 py-3 rounded-full bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-emerald-400 transition-colors"
            >
              Back to Dashboard
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}