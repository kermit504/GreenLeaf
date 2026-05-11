import BorderGlow from "@/components/BorderGlow";

const CategoryCard = ({ name, imageUrl, varieties }) => {
  return (
    <BorderGlow
      className="w-full cursor-pointer group"
      glowColor="160 80 60"
      backgroundColor="#09090b"
      glowRadius={70} // Increased glow for bigger cards
      glowIntensity={1}
      colors={['#10B981', '#34d399', '#064e3b']}
    >
      <div className="flex flex-col p-5 h-full">
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-6 border border-white/5 bg-zinc-900">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
          />

          <div className="absolute top-5 right-5 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-emerald-400 text-xs uppercase font-bold tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all duration-300">
            {varieties} Varieties
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="absolute bottom-6 right-6 w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 shadow-2xl shadow-emerald-500/40">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>

        <div className="px-2 pb-2">
          <h3 className="text-4xl font-black text-zinc-100 tracking-tighter group-hover:text-emerald-400 transition-colors duration-300">
            {name}
          </h3>
          <div className="h-1 w-0 group-hover:w-24 bg-emerald-500 transition-all duration-700 mt-2 rounded-full" />
        </div>
      </div>
    </BorderGlow>
  );
};

export default CategoryCard;