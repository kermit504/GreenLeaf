"use client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };

  return (
    <button 
      onClick={handleLogout}
      className="fixed top-8 right-8 z-[60] px-6 py-3 bg-white/5 hover:bg-red-500/10 border border-white/10 text-zinc-500 hover:text-red-500 rounded-full font-black uppercase text-[10px] tracking-widest transition-all backdrop-blur-md"
    >
      Sign Out
    </button>
  );
}