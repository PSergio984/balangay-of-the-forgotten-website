"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RelicData {
  id: string;
  name: string;
  type: string;
  icon: string;
  rarity: "Common" | "Rare" | "Epic" | "Legendary";
  description: string;
  effect: string;
  // objectPosition targets the centre of the artwork within the 640×640 canvas
  objectPosition: string;
}

const RELICS: RelicData[] = [
  {
    id: "korona",
    name: "Korona ni Apolaki",
    type: "Solar Crown Relic",
    icon: "/relics/korona.png",
    rarity: "Legendary",
    description: "The golden crown of Apolaki, the god of sun and war. Hand-crafted from solar fire and celestial metal. It pulses with intense heat, commanding the respect of fire-dwelling creatures.",
    effect: "+25% Fire damage, +15% ATK, and grants immunity to overheat effects.",
    objectPosition: "25% 66%"  // artwork at left-bottom quadrant
  },
  {
    id: "luhain",
    name: "Luhain ni Mayari",
    type: "Lunar Pearl Relic",
    icon: "/relics/luhain.png",
    rarity: "Epic",
    description: "A crystalized tear shed by Mayari, the goddess of the moon. It glows with a soft, comforting lunar aura. It cools the mind of the wearer and protects against dark shadow magic.",
    effect: "+30% Mana regeneration, +20% Magic Defense, and unlocks night vision.",
    objectPosition: "68% 30%"  // artwork at right-top quadrant
  },
  {
    id: "memory-fragment",
    name: "Memory Fragment",
    type: "Divine Memory Shard",
    icon: "/relics/memory-fragment.png",
    rarity: "Rare",
    description: "A floating, pixelated shard of memories. It holds fragmental visions of the old world before the Great Fragmentation. Staring into it reveals battles waged between the gods and the sea dragon.",
    effect: "Permanently unlocks deep lore entries in the archives and grants +10% EXP.",
    objectPosition: "50% 50%"  // artwork fills almost all canvas
  },
  {
    id: "pangil",
    name: "Pangil ni Bakunawa",
    type: "Draconic Fang Relic",
    icon: "/relics/pangil.png",
    rarity: "Legendary",
    description: "A colossal fang carved from the jaws of Bakunawa, the moon-eating serpent. Cold to the touch, it holds the power of the crushing ocean depths and tidal currents.",
    effect: "Allows underwater breathing, +20% Water damage, and chance to freeze on hit.",
    objectPosition: "25% 30%"  // artwork at left-top quadrant
  },
  {
    id: "silang",
    name: "Silang Relic",
    type: "Crescent Star Compass",
    icon: "/relics/silang.png",
    rarity: "Epic",
    description: "An ancient navigation relic shaped like a crescent star. Used by the first pinili voyage to navigate the Sky Mists. It points toward lost relics and guides the balangay safely through storms.",
    effect: "+15% Voyage Speed, decreases combat encounter rate by 20% in deep mists.",
    objectPosition: "68% 66%"  // artwork at right-bottom quadrant
  }
];

const RelicShowcase: React.FC = () => {
  const [selectedRelic, setSelectedRelic] = useState<RelicData | null>(null);

  const selectRelic = (relic: RelicData) => {
    setSelectedRelic(selectedRelic?.id === relic.id ? null : relic);
  };

  return (
    <section className="py-20 border-t-4 border-[#0C4A6E] bg-gradient-to-b from-[#E0F2FE] to-[#F0F9FF]">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-pixel text-[#0C4A6E] mb-4 text-center uppercase tracking-widest">
          Collect Divine Relics
        </h2>
        <p className="text-center font-serif text-lg text-[#0C4A6E]/80 max-w-2xl mx-auto mb-12">
          &quot;Reclaim these lost artifacts scattered across the realms. Click on an item in your inventory to inspect its power and origin.&quot;
        </p>

        <div className="flex flex-col md:flex-row gap-8 items-stretch justify-center">
          
          {/* Inventory Grid Grid */}
          <div className="w-full md:w-1/2 flex flex-col justify-center items-center">
            <div className="border-4 border-[#0C4A6E] bg-white p-6 shadow-[6px_6px_0px_0px_rgba(12,74,110,1)] max-w-md w-full">
              <div className="font-pixel text-[10px] text-[#0C4A6E] border-b border-[#0C4A6E]/20 pb-2 mb-4 uppercase tracking-widest text-center">
                Balangay Storage - Relics
              </div>
              
              <div className="grid grid-cols-3 gap-4 justify-items-center">
                {RELICS.map((relic) => {
                  const isSelected = selectedRelic?.id === relic.id;
                  return (
                    <motion.button
                      key={relic.id}
                      onClick={() => selectRelic(relic)}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-36 h-36 border-4 bg-[#F0F9FF] flex items-center justify-center relative cursor-pointer group overflow-hidden ${
                        isSelected
                          ? 'border-[#F97316] bg-[#FFF7ED] shadow-[4px_4px_0px_0px_rgba(249,115,22,1)]'
                          : 'border-[#0C4A6E] hover:border-[#0EA5E9] hover:bg-white shadow-[4px_4px_0px_0px_rgba(12,74,110,0.5)]'
                      }`}
                    >
                      <img
                        src={relic.icon}
                        alt={relic.name}
                        className="w-full h-full group-hover:rotate-12 transition-transform duration-200 rendering-pixelated"
                        style={{ objectFit: 'none', objectPosition: relic.objectPosition, transform: 'scale(2.2)', imageRendering: 'pixelated' }}
                      />
                      <div className={`absolute top-1 right-1 w-2.5 h-2.5 rounded-full ${
                        relic.rarity === "Legendary" ? "bg-amber-500" :
                        relic.rarity === "Epic" ? "bg-purple-500" : "bg-sky-500"
                      }`} />
                    </motion.button>
                  );
                })}
                {/* Empty slots for inventory visual effect */}
                {[...Array(4)].map((_, i) => (
                  <div
                    key={`empty-${i}`}
                    className="w-36 h-36 border-4 border-dashed border-[#0C4A6E]/30 bg-slate-50/50 flex items-center justify-center text-slate-300 font-pixel text-[10px]"
                  >
                    EMPTY
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Relic Inspector Panel */}
          <div className="w-full md:w-1/2 flex">
            <AnimatePresence mode="wait">
              {selectedRelic ? (
                <motion.div
                  key={selectedRelic.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="border-4 border-[#0C4A6E] bg-white p-6 shadow-[8px_8px_0px_0px_rgba(12,74,110,1)] w-full flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-[#0C4A6E]/20 pb-2">
                      <span className="font-pixel text-[8px] text-[#0C4A6E]/60 uppercase">{selectedRelic.type}</span>
                      <span className={`px-2 py-0.5 text-[8px] font-pixel uppercase text-white ${
                        selectedRelic.rarity === "Legendary" ? "bg-amber-500" :
                        selectedRelic.rarity === "Epic" ? "bg-purple-500" : "bg-sky-500"
                      }`}>
                        {selectedRelic.rarity}
                      </span>
                    </div>

                    <div className="flex gap-4 items-center">
                      <div className="w-48 h-48 border-4 border-[#0C4A6E] bg-[#F0F9FF] flex items-center justify-center shrink-0 shadow-[4px_4px_0px_0px_rgba(12,74,110,0.2)] overflow-hidden">
                        <img
                          src={selectedRelic.icon}
                          alt={selectedRelic.name}
                          className="w-full h-full rendering-pixelated"
                          style={{ objectFit: 'none', objectPosition: selectedRelic.objectPosition, transform: 'scale(3)', imageRendering: 'pixelated' }}
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-pixel text-[#0C4A6E] uppercase">
                          {selectedRelic.name}
                        </h3>
                        <p className="text-[10px] font-pixel text-[#F97316] uppercase mt-1">
                          Relic Attribute
                        </p>
                      </div>
                    </div>

                    <p className="font-serif text-[#0C4A6E] text-md leading-relaxed">
                      {selectedRelic.description}
                    </p>
                  </div>

                  <div className="bg-[#FFF7ED] border-2 border-[#F97316]/50 p-3 mt-4">
                    <div className="font-pixel text-[8px] text-[#F97316] mb-1">
                      EQUIPPED PASSIVE BONUS:
                    </div>
                    <p className="font-serif text-[#0C4A6E] text-sm italic">
                      {selectedRelic.effect}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <div className="border-4 border-dashed border-[#0C4A6E]/40 p-8 text-center bg-white/20 flex flex-col justify-center items-center w-full">
                  <div className="w-12 h-12 border-2 border-dashed border-[#0C4A6E]/40 rounded-full flex items-center justify-center text-[#0C4A6E]/40 font-pixel text-lg mb-4">
                    ?
                  </div>
                  <p className="font-pixel text-[10px] text-[#0C4A6E]/60 max-w-xs leading-normal">
                    CLICK AN ITEM FROM THE BALANGAY STORAGE INVENTORY TO INSPECT DIVINE LORE & MAGICAL ATTRIBUTES
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

export default RelicShowcase;
