import Image from "next/image";
import Silk from "../components/Silk";

export default function Home() {
  return (

    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black overflow-hidden">

      <div className="absolute inset-0 z-0">
        <Silk
          speed={5}
          scale={1}
          color="#10B981"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>

      <main className="relative z-10 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-white">
          Greenleaf
        </h1>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400">
          hi
        </p>
      </main>

    </div>
  );
}