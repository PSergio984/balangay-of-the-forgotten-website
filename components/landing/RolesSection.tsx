"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RoleData {
  id: string;
  name: string;
  tagline: string;
  description: string;
  primaryFunction: string;
  keyStats: string;
  cardGif: string;
  shadowGif: string;
  themeSrc: string;
  stats: {
    atk: number;
    hp: number;
    def: number;
    mag: number;
  };
}

const ROLES_DATA: RoleData[] = [
  {
    id: "mandirigma",
    name: "Mandirigma",
    tagline: "The Unstoppable Warrior",
    description: "Blessed by Apolaki with raw strength and relentless courage. The Mandirigma excels in melee combat, slashing through enemies and unleashing devastating physical strikes to dominate the frontlines.",
    primaryFunction: "Melee DPS",
    keyStats: "ATK, HP",
    cardGif: "/cards/mandirigma-card.gif",
    shadowGif: "/characters/mandirigma-shadow.gif",
    themeSrc: "/audio/roles/mandirigma.mp3",
    stats: { atk: 90, hp: 75, def: 50, mag: 20 }
  },
  {
    id: "bagani",
    name: "Bagani",
    tagline: "The Shield of the Tribe",
    description: "The ultimate protector, a fortress on two legs. Using an ancient shield carved from ironwood, the Bagani stands firm against the fiercest bosses, absorbing blows and defending allies from harm.",
    primaryFunction: "Protector / Defender",
    keyStats: "HP, DEF",
    cardGif: "/cards/bagani-card.gif",
    shadowGif: "/characters/bagani-shadow.gif",
    themeSrc: "/audio/roles/bagani.mp3",
    stats: { atk: 45, hp: 95, def: 90, mag: 30 }
  },
  {
    id: "babaylan",
    name: "Babaylan",
    tagline: "The Spirit Healer",
    description: "A mystical caster attuned to the spirits and ancient deities. The Babaylan commands restorative magics, cleanses curses, and channels spirit energy to bolster the party's vitality and mind.",
    primaryFunction: "Support / Caster",
    keyStats: "MAG, HP",
    cardGif: "/cards/babaylan-card.gif",
    shadowGif: "/characters/babaylan-shadow.gif",
    themeSrc: "/audio/roles/babaylan.mp3",
    stats: { atk: 30, hp: 60, def: 40, mag: 95 }
  },
  {
    id: "mangangayaw",
    name: "Mangangayaw",
    tagline: "The Phantom Hunter",
    description: "A lethal ranged hunter who strikes from the shadows. Armed with a custom composite bow, the Mangangayaw fires precise, rapid shots and places traps to control the battlefield from afar.",
    primaryFunction: "Ranged DPS",
    keyStats: "ATK, HP",
    cardGif: "/cards/mangangayaw-card.gif",
    shadowGif: "/characters/mangangayaw-shadow.gif",
    themeSrc: "/audio/roles/mangangayaw.mp3",
    stats: { atk: 85, hp: 65, def: 45, mag: 40 }
  }
];

const RolesSection: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<RoleData | null>(null);

  const selectRole = (role: RoleData) => {
    if (selectedRole?.id === role.id) {
      // Deselect
      setSelectedRole(null);
      window.dispatchEvent(new CustomEvent('stop-game-theme'));
    } else {
      setSelectedRole(role);
      // Play character theme
      window.dispatchEvent(
        new CustomEvent('play-game-theme', { detail: { src: role.themeSrc } })
      );
    }
  };

  return (
    <section className="py-20 border-t-4 border-[#0C4A6E] bg-gradient-to-b from-[#F0F9FF] to-[#E0F2FE]">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-pixel text-[#0C4A6E] mb-4 text-center uppercase tracking-widest">
          Choose Your Destiny
        </h2>
        <p className="text-center font-serif text-lg text-[#0C4A6E]/80 max-w-2xl mx-auto mb-12">
          &quot;Mabuhay, mga manlalakbay. Behind these portals lie legends. Choose your champion and listen to their ancient themes.&quot;
        </p>

        {/* Roles Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {ROLES_DATA.map((role) => {
            const isSelected = selectedRole?.id === role.id;
            return (
              <motion.button
                key={role.id}
                onClick={() => selectRole(role)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className={`relative flex flex-col items-center p-4 border-4 transition-all duration-300 ${
                  isSelected
                    ? 'border-[#F97316] bg-[#FFF7ED] shadow-[4px_4px_0px_0px_rgba(249,115,22,1)]'
                    : 'border-[#0C4A6E] bg-white hover:bg-[#F0F9FF] shadow-[4px_4px_0px_0px_rgba(12,74,110,1)]'
                }`}
              >
                {/* Character shadow sprite */}
                {/* Character sprite — GIFs are 800×800 but sprites fill ~75% of canvas, so a 256px object-contain shows them large */}
                <div style={{ width: '192px', height: '192px' }} className="relative mb-4 overflow-hidden">
                  <img
                    src={role.shadowGif}
                    alt={role.name}
                    style={{
                      width: '192px',
                      height: '192px',
                      objectFit: 'contain',
                      imageRendering: 'pixelated',
                    }}
                  />
                </div>

                <span className="font-pixel text-xs md:text-sm text-[#0C4A6E] uppercase">
                  {role.name}
                </span>
                <span className="text-[9px] font-pixel text-[#F97316] mt-2">
                  {role.primaryFunction}
                </span>

                {/* Animated selection indicator */}
                {isSelected && (
                  <div className="absolute top-2 right-2 w-3 h-3 bg-[#F97316] border-2 border-white animate-ping" />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Selected Role Detailed Panel */}
        <AnimatePresence mode="wait">
          {selectedRole ? (
            <motion.div
              key={selectedRole.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="border-4 border-[#0C4A6E] bg-white p-6 md:p-8 flex flex-col md:flex-row gap-8 shadow-[8px_8px_0px_0px_rgba(12,74,110,1)] relative overflow-hidden"
            >
              {/* Corner accent border details */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-[#0C4A6E]" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-[#0C4A6E]" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-[#0C4A6E]" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-[#0C4A6E]" />

              {/* Left Column: Card Animation */}
              <div className="w-full md:w-1/3 flex flex-col items-center justify-center border-b-4 md:border-b-0 md:border-r-4 border-[#0C4A6E]/20 pb-6 md:pb-0 md:pr-8">
                <div className="relative w-48 h-64 border-4 border-[#0C4A6E] bg-slate-900 shadow-md p-1 overflow-hidden">
                  <img
                    src={selectedRole.cardGif}
                    alt={`${selectedRole.name} card`}
                    className="w-full h-full object-cover rendering-pixelated"
                  />
                </div>
                <div className="mt-4 font-pixel text-[9px] text-[#F97316] animate-pulse">
                  ♪ Playing Character Theme...
                </div>
              </div>

              {/* Right Column: Bio and RPG Stats */}
              <div className="w-full md:w-2/3 flex flex-col justify-between space-y-6">
                <div>
                  <div className="text-xs font-pixel text-[#F97316] mb-1">{selectedRole.tagline}</div>
                  <h3 className="text-2xl font-pixel text-[#0C4A6E] uppercase mb-4 tracking-wider">
                    {selectedRole.name}
                  </h3>
                  <p className="font-serif text-lg text-[#0C4A6E] leading-relaxed">
                    {selectedRole.description}
                  </p>
                </div>

                {/* RPG Character Sheets Stats */}
                <div className="bg-[#F0F9FF] border-2 border-[#0C4A6E]/30 p-4 space-y-3">
                  <div className="font-pixel text-[10px] text-[#0C4A6E] mb-2 border-b border-[#0C4A6E]/20 pb-1">
                    Attributes & Primary Function: {selectedRole.primaryFunction}
                  </div>
                  
                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.entries(selectedRole.stats).map(([statName, val]) => {
                      const isKey = selectedRole.keyStats.toLowerCase().includes(statName.toLowerCase());
                      return (
                        <div key={statName} className="space-y-1">
                          <div className="flex justify-between items-center text-xs font-pixel">
                            <span className="uppercase text-[#0C4A6E] flex items-center gap-1">
                              {statName}
                              {isKey && <span className="text-[#F97316] text-[8px]">(Key)</span>}
                            </span>
                            <span className="text-[#0C4A6E]">{val}/100</span>
                          </div>
                          {/* Pixel Stat Bar */}
                          <div className="h-3 bg-white border-2 border-[#0C4A6E] p-[1px] relative">
                            <div
                              style={{ width: `${val}%` }}
                              className={`h-full ${
                                isKey ? 'bg-[#F97316]' : 'bg-[#0EA5E9]'
                              }`}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="border-4 border-dashed border-[#0C4A6E]/40 p-12 text-center bg-white/20">
              <p className="font-pixel text-xs text-[#0C4A6E]/60">
                SELECT A CHARACTER ROLE ABOVE TO REVEAL THEIR BIO, ANCIENT CARDS, AND THEME MUSIC
              </p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default RolesSection;
