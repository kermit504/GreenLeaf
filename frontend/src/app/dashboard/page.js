import Silk from "@/components/Silk";
import ShinyText from "@/components/ShinyText";
import Link from 'next/link';
import CategoryCard from '@/components/CategoryCard';

export default function Home() {
  const categories = [
    { 
      id: 1, 
      name: "Bonsai", 
      imageUrl: "https://images.unsplash.com/photo-1641412722397-3be359096577?auto=format&fit=crop&q=80&w=1000", 
      varieties: "4" 
    },

    //https://images.unsplash.com/photo-1641412722397-3be359096577?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ym9uc2FpfGVufDB8fDB8fHww
    { 
      id: 2, 
      name: "Herbs", 
      imageUrl: "https://images.unsplash.com/photo-1533792344354-ed5e8fc12494?auto=format&fit=crop&q=80&w=1000", 
      //https://images.unsplash.com/photo-1533792344354-ed5e8fc12494?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aGVyYnN8ZW58MHx8MHx8fDA%3D
      varieties: "5" 
    },
    { 
      id: 3, 
      name: "Succulents", 
      imageUrl: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&q=80&w=1000", 
      varieties: "6" 
    },
    { 
      id: 4, 
      name: "Tropical", 
      imageUrl: "https://images.unsplash.com/photo-1522428938647-2baa7c899f2f?auto=format&fit=crop&q=80&w=1000", 
      //https://images.unsplash.com/photo-1522428938647-2baa7c899f2f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyb3BpY2FsJTIwcGxhbnR8ZW58MHx8MHx8fDA%3D
      varieties: "7" 
    },
  ];

  return (
    <div className="relative min-h-screen w-full bg-[#050505] font-sans overflow-hidden py-16 px-8 md:px-16">

      <div className="absolute inset-0 z-0 pointer-events-none opacity-70">
        <Silk
          speed={1.5}
          scale={1.1}
          color="#10B981"
          noiseIntensity={1.4}
          rotation={0}
        />
      </div>

      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, transparent 10%, rgba(5,5,5,0.85) 100%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">

        <div className="mb-20 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div className="space-y-4">

            <ShinyText
              text="Categories"
              speed={3}
              color="#10B981"
              shineColor="#ECFDF5"
              className="text-7xl md:text-9xl font-black tracking-tighter leading-none"
            />
            <p className="text-zinc-500 max-w-xl text-xl font-medium leading-relaxed">
              Explore our diverse botanical collections. Select a category to manage stock and specific plant details.
            </p>
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              href={`/dashboard/${category.name.toLowerCase()}`}
              className="group transition-all duration-500 ease-out hover:scale-[1.02]"
            >
              <CategoryCard 
                name={category.name}
                imageUrl={category.imageUrl}
                varieties={category.varieties}
              />
            </Link>
          ))}
        </div>

        <div className="mt-24 border-t border-white/5 pt-8 flex justify-center">
          <p className="text-zinc-600 text-sm font-light tracking-widest uppercase">
            Greenleaf Plant Nursery &copy; 2026
          </p>
        </div>
      </div>
    </div>
  );
}