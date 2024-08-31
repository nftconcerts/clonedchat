import { CloneProvider } from "@/context/CloneContext";
import CloneApp from "@/components/CloneApp";

export default function Home() {
  return (
    <div className="relative w-full min-h-screen bg-[#6e199a]">
      {/* Background Image (commented out) */}
      {/* <div className="absolute inset-0 z-0">
        <Image
          src="/images/bench.jpg"
          alt="Background"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div> */}

      {/* Content */}
      <main className="relative z-10 flex w-full min-h-screen flex-col items-center justify-between">
        <CloneProvider>
          <CloneApp />
        </CloneProvider>
      </main>
    </div>
  );
}
