import ParallaxHero from "@/components/landing/ParallaxHero";
import AncientScrollContainer from "@/components/landing/AncientScrollContainer";
import LogbookEntry from "@/components/landing/LogbookEntry";
import BulletinBoard from "@/components/landing/BulletinBoard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <ParallaxHero />
      
      <AncientScrollContainer>
        <section className="space-y-12 py-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-pixel text-[#0C4A6E] mb-4">THE ANCIENT ARCHIVES</h2>
            <div className="w-24 h-1 bg-[#0EA5E9] mx-auto"></div>
          </div>

          <LogbookEntry 
            title="THE FLOATING BALANGAY"
            content="Discovered adrift in the Sky Mist of the third quadrant. Its hull is etched with symbols that predate the Great Fragmentation. How it remains buoyant without a modern core remains the greatest mystery of our age."
            imageSrc="/globe.svg"
            imageAlt="Balangay sketch"
          />

          <LogbookEntry 
            title="THE WHISPERING GEARS"
            content="Found deep within the core of the Iron Isle. These gears rotate in a sequence that matches the movement of the stars. It is as if the machinery itself is breathing, keeping the island afloat through a rhythm we have yet to decipher."
            imageSrc="/window.svg"
            imageAlt="Ancient gears"
            reversed={true}
          />

          <LogbookEntry 
            title="SKIES OF THE FORGOTTEN"
            content="Beyond the horizon of the known islands lies the Void. Explorers speak of ghost ships and echoes of a civilization that once sailed between the stars. The Balangay may be our only way to reach those who were left behind."
            imageSrc="/file.svg"
            imageAlt="Cloud map"
          />
        </section>
      </AncientScrollContainer>

      <BulletinBoard />

      {/* Footer spacer */}
      <section className="h-[50vh] bg-[#0C4A6E] flex items-center justify-center p-8">
        <p className="text-[#F0F9FF] font-serif text-center max-w-2xl italic">
          &quot;The past is not gone; it is merely waiting for the right wind to carry its echoes back to us.&quot;
        </p>
      </section>
    </main>
  );
}
