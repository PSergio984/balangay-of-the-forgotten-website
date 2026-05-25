import ParallaxHero from "@/components/landing/ParallaxHero";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <ParallaxHero />
      
      {/* Content spacer to allow scrolling */}
      <section className="h-[200vh] bg-zinc-900 flex items-center justify-center p-8">
        <div className="max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-white mb-8">SCROLL TO EXPLORE</h2>
          <p className="text-zinc-400 text-lg">
            The Balangay is a symbol of our forgotten heritage, a vessel that carried our ancestors across the vast seas.
            In this world of floating islands and ancient machinery, you will rediscover the secrets of the past.
          </p>
        </div>
      </section>
    </main>
  );
}
