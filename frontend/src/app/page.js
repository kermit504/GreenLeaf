import Silk from "@/components/Silk";
import ShinyText from "@/components/ShinyText";
import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-zinc-950 font-sans overflow-hidden">

      <div className="absolute inset-0 z-0">
        <Silk
          speed={3}
          scale={0.8}
          color="#059669"
          noiseIntensity={1.2}
          rotation={0}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl px-6">

        <ShinyText
          text="Greenleaf Plant Nursery"
          speed={3}
          color="#47996e"
          shineColor="#42d09e"
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
        />

        <p className="text-zinc-400 text-lg md:text-xl leading-relaxed font-light max-w-xl mb-10">
          Bring nature's finest breath into your living space. We curate rare tropical
          foliage and hardy indoor companions designed to transform your home into
          a thriving sanctuary of calm and color.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link 
            href = "/dashboard"
            className="group px-8 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-base transition-all duration-300 flex items-center gap-2.5 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-400/40 hover:scale-105 active:scale-95">
            <span>Get Started</span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>

    </div>
  );
}