"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ShinyText from "./ShinyText";

export default function AuthModal({ isOpen, onClose }) {
  const [role, setRole] = useState("user"); 
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  
  if (!isOpen) return null;

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");

    const endpoint = isRegistering ? "/Users/" : "/login/";

    try {
      const res = await fetch(`http://127.0.0.1:8000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          username, 
          password,
          is_admin: false 
        }),
      });

      const data = await res.json();

      if (res.ok) {
        if (isRegistering) {
          setIsRegistering(false);
          alert("Account created! Please login.");
        } else {
          if (role === "admin" && !data.is_admin) {
            setError("Access Denied: Not an Administrator.");
            return;
          }
          localStorage.setItem("user_id", data.user_id);
          localStorage.setItem("is_admin", data.is_admin);
          router.push(data.is_admin ? "/admin/dashboard" : "/dashboard");
          onClose();
        }
      } else {
        const errorMessage = typeof data.detail === 'string' 
          ? data.detail 
          : "Authentication Failed";
        setError(errorMessage);
      }
    } catch (err) {
      setError("Server Connection Error");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-zinc-950 border border-white/10 rounded-[2.5rem] p-10 shadow-2xl">
        <div className="flex bg-white/5 p-1 rounded-2xl mb-8 border border-white/5">
          <button 
            onClick={() => { setRole("user"); setIsRegistering(false); setError(""); }}
            className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${role === "user" ? "bg-emerald-500 text-black" : "text-zinc-500 hover:text-white"}`}
          >
            Customer
          </button>
          <button 
            onClick={() => { setRole("admin"); setIsRegistering(false); setError(""); }}
            className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${role === "admin" ? "bg-emerald-500 text-black" : "text-zinc-500 hover:text-white"}`}
          >
            Administrator
          </button>
        </div>

        <div className="text-center mb-8">
          <ShinyText 
            text={isRegistering ? "Create Account" : role === "admin" ? "Staff Login" : "Welcome Back"} 
            speed={3} 
            color="#10B981" 
            className="text-3xl font-black uppercase tracking-tighter" 
          />
        </div>

        {error && <p className="text-red-500 text-[10px] font-bold uppercase text-center mb-6">{error}</p>}

        <form onSubmit={handleAuth} className="space-y-4">
          <input type="text" name="fake_username" style={{ display: 'none' }} tabIndex="-1" aria-hidden="true" />
          <input type="password" name="fake_password" style={{ display: 'none' }} tabIndex="-1" aria-hidden="true" />
          
          <input
            type="text"
            placeholder="Username"
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white outline-none focus:border-emerald-500/50 transition-all"
            required
          />
          <input
            type="password"
            placeholder="Password"
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white outline-none focus:border-emerald-500/50 transition-all"
            required
          />
          <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-widest py-5 rounded-2xl mt-4 transition-all active:scale-95">
            {isRegistering ? "Sign Up" : "Enter"}
          </button>
        </form>

        {role === "user" && (
          <div className="mt-6 text-center">
            <button 
              type="button"
              onClick={() => { setIsRegistering(!isRegistering); setError(""); }}
              className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors"
            >
              {isRegistering ? "Already have an account? Login" : "New Client? Register Here"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}