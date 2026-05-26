import ParallaxHero from "@/components/landing/ParallaxHero";
import AncientScrollContainer from "@/components/landing/AncientScrollContainer";
import LogbookEntry from "@/components/landing/LogbookEntry";
import BulletinBoard from "@/components/landing/BulletinBoard";
import RolesSection from "@/components/landing/RolesSection";
import WorldMapSection from "@/components/landing/WorldMapSection";
import RelicShowcase from "@/components/landing/RelicShowcase";
import AccoladesSection from "@/components/landing/AccoladesSection";
import { getPayloadInstance } from "@/lib/payload";

export const revalidate = 3600;

export default async function Home() {
  const payload = await getPayloadInstance();
  
  // Fetch latest 3 news items for the Bulletin Board
  const newsResult = await payload.find({
    collection: 'news',
    sort: '-publishedDate',
    limit: 3,
  });

  return (
    <main className="flex min-h-screen flex-col">
      {/* Pinned Video Parallax Hero Section */}
      <ParallaxHero />
      
      {/* Ancient Logbook Story Section */}
      <AncientScrollContainer>
        <section className="space-y-16 py-12">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl font-pixel text-[#0C4A6E] mb-4">THE ANCIENT ARCHIVES</h2>
            <div className="w-24 h-1 bg-[#0EA5E9] mx-auto"></div>
          </div>

          <LogbookEntry 
            title="THE FLOATING BALANGAY"
            content="Discovered adrift in the Sky Mist of the archipelago. Its hull is etched with symbols that predate the Great Fragmentation. How it remains buoyant without a modern core remains the greatest mystery of our age. It serves as our vessel through the afterlife."
            imageSrc="/globe.svg"
            imageAlt="Balangay sketch"
          />

          <LogbookEntry 
            title="THE SOULS OF THE CHOSEN"
            content="In the afterlife, the deities test the strength of the travelers (Pinili). Form a party with a Warrior, Protector, Healer, or Hunter, and prove your unity against the primordial forces."
            imageSrc="/window.svg"
            imageAlt="Chosen souls sketch"
            reversed={true}
          />
          
        </section>
      </AncientScrollContainer>

      {/* Interactive Role Selection Section */}
      <RolesSection />

      {/* Interactive Map Showcase Section */}
      <WorldMapSection />

      {/* Interactive Relic Collection Section */}
      <RelicShowcase />

      {/* Game Awards and Recognitions */}
      <AccoladesSection />

      {/* Town Bulletin Board (News Feed) */}
      <BulletinBoard news={newsResult.docs.map(doc => ({
        id: doc.id,
        title: doc.title,
        publishedDate: doc.publishedDate,
        summary: (doc as any).summary, // Ensure we map whatever summary field we might add later
        content: doc.content
      }))} />
    </main>
  );
}
