"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Each relic PNG is 640×640 px with artwork in ONE quadrant:
 *   Pangil  → top-left     (x:40-349,  y:40-349)
 *   Luhain  → top-right    (x:250-599, y:40-349)
 *   Korona  → bottom-left  (x:40-349,  y:260-599)
 *   Silang  → bottom-right (x:270-599, y:260-599)
 *
 * Grid strategy: render each PNG at 320px (0.5×) inside a 160px slot so that
 * the four slots tile into the complete 640px composition with zero gap.
 *   Pangil : left=0,    top=0
 *   Luhain : left=-160, top=0
 *   Korona : left=0,    top=-160
 *   Silang : left=-160, top=-160
 */

interface RelicData {
  id: string;
  name: string;
  type: string;
  icon: string;
  rarity: "Common" | "Rare" | "Epic" | "Legendary";
  description: string;
  effect: string;
  /** offset of the 320px-rendered image inside the 160px grid slot */
  gridLeft: number;
  gridTop: number;
  /** offset of the 640px-native image inside the 224px inspector thumbnail */
  inspLeft: number;
  inspTop: number;
}

const RELICS: RelicData[] = [
  {
    id: "pangil",
    name: "Pangil ni Bakunawa",
    type: "Draconic Fang Relic",
    icon: "/relics/pangil.png",
    rarity: "Legendary",
    description: "A colossal fang carved from the jaws of Bakunawa, the moon-eating serpent. Cold to the touch, it holds the power of the crushing ocean depths and tidal currents.",
    effect: "Allows underwater breathing, +20% Water damage, and chance to freeze on hit.",
    gridLeft: 0, gridTop: 0,
    // centre (195,195) → inspector (224px): 112-195=-83
    inspLeft: -83, inspTop: -83,
  },
  {
    id: "luhain",
    name: "Luhain ni Mayari",
    type: "Lunar Pearl Relic",
    icon: "/relics/luhain.png",
    rarity: "Epic",
    description: "A crystalized tear shed by Mayari, the goddess of the moon. It glows with a soft, comforting lunar aura. It cools the mind of the wearer and protects against dark shadow magic.",
    effect: "+30% Mana regeneration, +20% Magic Defense, and unlocks night vision.",
    gridLeft: -160, gridTop: 0,
    // centre (425,195) → inspector: 112-425=-313, 112-195=-83
    inspLeft: -313, inspTop: -83,
  },
  {
    id: "korona",
    name: "Korona ni Apolaki",
    type: "Solar Crown Relic",
    icon: "/relics/korona.png",
    rarity: "Legendary",
    description: "The golden crown of Apolaki, the god of sun and war. Hand-crafted from solar fire and celestial metal. It pulses with intense heat, commanding the respect of fire-dwelling creatures.",
    effect: "+25% Fire damage, +15% ATK, and grants immunity to overheat effects.",
    gridLeft: 0, gridTop: -160,
    // centre (195,430) → inspector: 112-195=-83, 112-430=-318
    inspLeft: -83, inspTop: -318,
  },
  {
    id: "silang",
    name: "Silang Relic",
    type: "Crescent Star Compass",
    icon: "/relics/silang.png",
    rarity: "Epic",
    description: "An ancient navigation relic shaped like a crescent star. Used by the first pinili voyage to navigate the Sky Mists. It points toward lost relics and guides the balangay safely through storms.",
    effect: "+15% Voyage Speed, decreases combat encounter rate by 20% in deep mists.",
    gridLeft: -160, gridTop: -160,
    // centre (435,430) → inspector: 112-435=-323, 112-430=-318
    inspLeft: -323, inspTop: -318,
  },
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

          {/* ── 2×2 Inventory Grid ── */}
          <div className="flex flex-col justify-center items-center">
            <div className="border-4 border-[#0C4A6E] bg-white p-6 shadow-[6px_6px_0px_0px_rgba(12,74,110,1)]">
              <div className="font-pixel text-[10px] text-[#0C4A6E] border-b border-[#0C4A6E]/20 pb-2 mb-4 uppercase tracking-widest text-center">
                Balangay Storage — Relics
              </div>

              {/* 2×2 grid, no gap so the four relic pieces tile seamlessly */}
              <div className="grid grid-cols-2" style={{ gap: 0 }}>
                {RELICS.map((relic) => {
                  const isSelected = selectedRelic?.id === relic.id;
                  return (
                    <motion.button
                      key={relic.id}
                      onClick={() => selectRelic(relic)}
                      whileHover={{ scale: 1.04, zIndex: 10 }}
                      whileTap={{ scale: 0.97 }}
                      style={{
                        width: '160px',
                        height: '160px',
                        position: 'relative',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        outline: isSelected ? '3px solid #F97316' : '2px solid #0C4A6E',
                        outlineOffset: '-2px',
                        boxShadow: isSelected
                          ? 'inset 0 0 0 2px #F97316'
                          : undefined,
                        background: '#F0F9FF',
                        zIndex: isSelected ? 5 : 1,
                      }}
                    >
                      {/* 320px-rendered image positioned so this quadrant fills the 160px slot */}
                      <img
                        src={relic.icon}
                        alt={relic.name}
                        style={{
                          position: 'absolute',
                          width: '320px',
                          height: '320px',
                          maxWidth: 'none',
                          left: `${relic.gridLeft}px`,
                          top: `${relic.gridTop}px`,
                          imageRendering: 'pixelated',
                        }}
                      />
                      {/* Rarity dot */}
                      <div className={`absolute top-1 right-1 w-2.5 h-2.5 rounded-full z-10 ${
                        relic.rarity === "Legendary" ? "bg-amber-500" : "bg-purple-500"
                      }`} />
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Inspector Panel ── */}
          <div className="flex-1 flex">
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
                        selectedRelic.rarity === "Legendary" ? "bg-amber-500" : "bg-purple-500"
                      }`}>
                        {selectedRelic.rarity}
                      </span>
                    </div>

                    <div className="flex gap-4 items-center">
                      {/* 224px inspector thumbnail — native 640px image centred on artwork */}
                      <div
                        style={{ width: '224px', height: '224px', minWidth: '224px', position: 'relative', overflow: 'hidden' }}
                        className="border-4 border-[#0C4A6E] bg-[#F0F9FF] shadow-[4px_4px_0px_0px_rgba(12,74,110,0.2)]"
                      >
                        <img
                          src={selectedRelic.icon}
                          alt={selectedRelic.name}
                          style={{
                            position: 'absolute',
                            width: '640px',
                            height: '640px',
                            maxWidth: 'none',
                            left: `${selectedRelic.inspLeft}px`,
                            top: `${selectedRelic.inspTop}px`,
                            imageRendering: 'pixelated',
                          }}
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
                    CLICK AN ITEM FROM THE BALANGAY STORAGE INVENTORY TO INSPECT DIVINE LORE &amp; MAGICAL ATTRIBUTES
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
