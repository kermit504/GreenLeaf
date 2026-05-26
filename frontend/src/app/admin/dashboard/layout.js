"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };

  return (
    <div className="flex min-h-screen bg-[#050505] text-white font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 p-8 flex flex-col gap-8">
        <div className="text-emerald-500 font-black text-2xl tracking-tighter uppercase">
          Greenleaf <span className="text-white opacity-50 text-xs block">Staff Portal</span>
        </div>
        
        <nav className="flex flex-col gap-2 flex-1">
          <Link href="/admin/dashboard" className="p-4 rounded-xl bg-white/5 hover:bg-emerald-500 hover:text-black font-bold uppercase text-[10px] tracking-widest transition-all">
            Overview
          </Link>
          <Link href="/admin/dashboard/plants" className="p-4 rounded-xl hover:bg-white/5 font-bold uppercase text-[10px] tracking-widest transition-all text-zinc-500 hover:text-white">
            Manage Plants
          </Link>
          <Link href="/admin/dashboard/categories" className="p-4 rounded-xl hover:bg-white/5 font-bold uppercase text-[10px] tracking-widest transition-all text-zinc-500 hover:text-white">
            Categories
          </Link>
        </nav>

        <button onClick={handleLogout} className="mt-auto p-4 text-[10px] font-black uppercase text-red-500 hover:bg-red-500/10 rounded-xl transition-all">
          Exit System
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}