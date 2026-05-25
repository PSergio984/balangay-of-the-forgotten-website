"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RegionData {
  id: string;
  name: string;
  tagline: string;
  description: string;
  mapImage: string;
  themeSrc: string;
  difficulty: "Normal" | "Hard" | "Expert" | "Legendary";
  boss: string;
}

const REGIONS: RegionData[] = [
  {
    id: "choosing-territory",
    name: "Archipelago of the Forgotten",
    tagline: "The Entire World Map",
    description: "A mythical archipelago suspended in the afterlife. The lands are split between the volcanic realms of magma, the misty peaks of the high mountains, the treacherous turquoise seas, and the gates of the heavens above.",
    mapImage: "/maps/choosing-territory.png",
    themeSrc: "/audio/maps/special.mp3",
    difficulty: "Normal",
    boss: "Various Bosses"
  },
  {
    id: "bundok-pulag",
    name: "Bundok Pulag",
    tagline: "The Misty Highland Peak",
    description: "The sacred peak that penetrates the heavens. Shrouded in freezing mists and guarded by ancient forest spirits. Warriors must navigate high altitudes and face wild beasts to reach the summit.",
    mapImage: "/maps/bundok-pulag.png",
    themeSrc: "/audio/maps/bundok-pulag.mp3",
    difficulty: "Hard",
    boss: "Kapre & Minokawa"
  },
  {
    id: "dagat-kabisayaan",
    name: "Dagat Kabisayaan",
    tagline: "The Turquoise Abyss",
    description: "A sprawling sea hiding ancient ruins beneath its waves. Sighted with ghost balangays and Sirenas pulling sailors down. Deep in the trenches, the sea dragon Bakunawa slumbers, waiting to consume the moon.",
    mapImage: "/maps/dagat-kabisayaan.png",
    themeSrc: "/audio/maps/dagat-kabisayaan.mp3",
    difficulty: "Hard",
    boss: "Bakunawa & Sirena"
  },
  {
    id: "daragang-magayon",
    name: "Daragang Magayon",
    tagline: "The Volcanic Ashlands",
    description: "A land of constant fire and lava rivers. Ash clouds block the sun, and the heat drains travelers of their stamina. Only those who survive the molten flows can face Apolaki's trial of fire.",
    mapImage: "/maps/daragang-magayon.png",
    themeSrc: "/audio/maps/daragang-magayon.mp3",
    difficulty: "Expert",
    boss: "Apolaki & Tiyanak"
  },
  {
    id: "kaluwalhatian",
    name: "Kaluwalhatian",
    tagline: "The Heavenly Realm",
    description: "The floating golden islands of the supreme deities. Protected by Bathala's blinding light and divine guardians. Only those who have collected the forgotten relics are granted entry to this sacred sky.",
    mapImage: "/maps/kaluwalhatian.png",
    themeSrc: "/audio/maps/kaluwalhatian.mp3",
    difficulty: "Legendary",
    boss: "Bathala & Mayari"
  },
  {
    id: "ang-lagusan",
    name: "Ang Lagusan",
    tagline: "The Passage Portal",
    description: "The mystical gateway where all lost souls enter the afterlife. It is a swirling rift connecting the physical world to the realms of the forgotten, where the trials of the gods begin.",
    mapImage: "/maps/anglagusan.png",
    themeSrc: "/audio/intro/introduction.mp3",
    difficulty: "Normal",
    boss: "Sentinel Spirits"
  }
];

const WorldMapSection: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<RegionData>(REGIONS[0]);

  const selectRegion = (region: RegionData) => {
    setSelectedRegion(region);
    // Play region theme
    window.dispatchEvent(
      new CustomEvent('play-game-theme', { detail: { src: region.themeSrc } })
    );
  };

  return (
    <section className="py-20 border-t-4 border-[#0C4A6E] bg-[#0C4A6E] text-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-pixel text-white mb-4 text-center uppercase tracking-widest">
          Explore The Realms
        </h2>
        <p className="text-center font-serif text-lg text-slate-300 max-w-2xl mx-auto mb-12">
          &quot;Select a territory on the map or from the list to view regional maps, listen to local scores, and read the forgotten lore.&quot;
        </p>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Map Viewer Panel */}
          <div className="w-full lg:w-2/3 space-y-4">
            <div className="relative border-4 border-[#F97316] bg-slate-900 shadow-[0_10px_20px_rgba(0,0,0,0.6)] aspect-[16/9] w-full overflow-hidden p-1">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedRegion.id}
                  src={selectedRegion.mapImage}
                  alt={selectedRegion.name}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full object-cover rendering-pixelated"
                />
              </AnimatePresence>

              {/* Map Border Overlay */}
              <div className="absolute inset-0 border-4 border-[#0C4A6E] pointer-events-none opacity-40" />

              {/* Region Label Tag */}
              <div className="absolute top-4 left-4 bg-black/80 border-2 border-[#F97316] px-4 py-2 font-pixel text-xs text-[#F97316]">
                ZONE: {selectedRegion.name.toUpperCase()}
              </div>

              {/* Theme sound active indicator */}
              <div className="absolute bottom-4 right-4 bg-black/80 border-2 border-white/20 px-3 py-1 font-pixel text-[9px] text-white animate-pulse">
                ♪ Playing Zone OST
              </div>
            </div>

            {/* Region selectors */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {REGIONS.map((reg) => (
                <button
                  key={reg.id}
                  onClick={() => selectRegion(reg)}
                  className={`py-2 px-1 text-[8px] font-pixel border-2 text-center uppercase transition-colors ${
                    selectedRegion.id === reg.id
                      ? 'bg-[#F97316] border-white text-white'
                      : 'bg-black/40 border-[#F97316] text-[#F97316] hover:bg-black/60'
                  }`}
                >
                  {reg.name.split(" ").slice(-1)[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Lore and Details Panel */}
          <div className="w-full lg:w-1/3 border-4 border-[#F97316] bg-black/60 p-6 space-y-6 shadow-[8px_8px_0px_0px_rgba(249,115,22,1)] min-h-[400px] flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-white/20 pb-2">
                <span className="font-pixel text-[10px] text-[#F97316]">{selectedRegion.tagline}</span>
                <span className={`px-2 py-0.5 text-[8px] font-pixel uppercase ${
                  selectedRegion.difficulty === "Legendary" ? "bg-red-900 border border-red-500" :
                  selectedRegion.difficulty === "Expert" ? "bg-amber-900 border border-amber-500" :
                  selectedRegion.difficulty === "Hard" ? "bg-orange-950 border border-orange-600" : "bg-green-950 border border-green-600"
                }`}>
                  {selectedRegion.difficulty}
                </span>
              </div>

              <h3 className="text-xl font-pixel text-white uppercase tracking-wider">
                {selectedRegion.name}
              </h3>

              <p className="font-serif text-slate-200 text-md leading-relaxed">
                {selectedRegion.description}
              </p>
            </div>

            <div className="border-t border-white/20 pt-4 space-y-2">
              <div className="flex justify-between font-pixel text-[9px] text-slate-400">
                <span>TERRITORY BOSS:</span>
                <span className="text-white">{selectedRegion.boss}</span>
              </div>
              <div className="flex justify-between font-pixel text-[9px] text-slate-400">
                <span>SOUNDTRACK:</span>
                <span className="text-[#F97316] lowercase truncate max-w-[180px]">
                  {selectedRegion.themeSrc.split("/").pop()}
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default WorldMapSection;
