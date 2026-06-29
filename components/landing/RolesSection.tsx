"use client";

import React from 'react';
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
  moveset: {
    name: string;
    description: string;
    cooldown?: number;
  }[];
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
    stats: { atk: 90, hp: 75, def: 50, mag: 20 },
    moveset: [
      { name: "Heavy Attack", description: "Deals 334% ATK, 80% hit, 50% chance to inflict Bonecracked.", cooldown: 2 },
      { name: "All-in Attack", description: "Deals 834% ATK, 40% hit.", cooldown: 3 },
      { name: "Berserk State", description: "Inflicts Rage on self. Requirement: HP at 50%.", cooldown: 4 }
    ]
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
    stats: { atk: 45, hp: 95, def: 90, mag: 30 },
    moveset: [
      { name: "Taunt", description: "Forces the boss to target you for 2 turns.", cooldown: 2 },
      { name: "Fortify", description: "Gain shield equal to +30% max HP for 2 turns.", cooldown: 4 },
      { name: "Guardian’s Oath", description: "Sacrifice 25% current HP, shield all allies for 25% current HP.", cooldown: 4 }
    ]
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
    stats: { atk: 30, hp: 60, def: 40, mag: 95 },
    moveset: [
      { name: "Heal", description: "Restore HP equivalent to 100 (+50% MAG) to ally, and heals self for 50%.", cooldown: 2 },
      { name: "Blessing", description: "Apply +20% DMG buff for 2 turns to ally.", cooldown: 3 },
      { name: "Purify", description: "Removes all debuffs to all players.", cooldown: 2 }
    ]
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
    stats: { atk: 85, hp: 65, def: 45, mag: 40 },
    moveset: [
      { name: "Piercing Arrow", description: "Deals 225% ATK, ignores defense, 80% hit.", cooldown: 3 },
      { name: "Focus Aim", description: "Apply +30% hit chance and ignore 20% enemy DEF.", cooldown: 4 },
      { name: "Explosive Arrow", description: "Deals 300 (+ 500% ATK), 50% hit, 30% chance to commit Overexplosion.", cooldown: 3 }
    ]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    }
  }
} as const;

const itemHeaderVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
} as const;

const itemTextVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.6 }
  }
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.8 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 14,
    }
  }
} as const;

import { useGameStore } from '@/lib/store';

const RolesSection: React.FC = () => {
  const selectedRoleId = useGameStore((state) => state.selectedRoleId);
  const selectRoleId = useGameStore((state) => state.selectRole);
  const playTheme = useGameStore((state) => state.playTheme);
  const stopTheme = useGameStore((state) => state.stopTheme);

  const selectedRole = ROLES_DATA.find((r) => r.id === selectedRoleId) || null;

  const selectRole = (role: RoleData) => {
    if (selectedRoleId === role.id) {
      selectRoleId(null);
      stopTheme();
    } else {
      selectRoleId(role.id);
      playTheme(role.themeSrc);
    }
  };


  return (
    <section className="py-20 border-t-4 border-[#0C4A6E] bg-gradient-to-b from-[#F0F9FF] to-[#E0F2FE]">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-6xl mx-auto px-4"
      >
        <motion.h2 
          variants={itemHeaderVariants}
          className="text-3xl font-pixel text-[#0C4A6E] mb-4 text-center uppercase tracking-widest"
        >
          Choose Your Destiny
        </motion.h2>
        <motion.p 
          variants={itemTextVariants}
          className="text-center font-serif text-lg text-[#0C4A6E]/80 max-w-2xl mx-auto mb-12"
        >
          &quot;Mabuhay, mga manlalakbay. Behind these portals lie legends. Choose your champion and listen to their ancient themes.&quot;
        </motion.p>

        {/* Roles Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {ROLES_DATA.map((role) => {
            const isSelected = selectedRole?.id === role.id;
            return (
              <motion.button
                key={role.id}
                variants={cardVariants}
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
                <div 
                  style={{ width: '280px', height: '380px' }} 
                  className="relative border-4 border-[#0C4A6E] bg-slate-900 shadow-md p-1 overflow-hidden"
                >
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

              {/* Right Column: Bio, Signature Abilities and RPG Stats */}
              <div className="w-full md:w-2/3 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-xs font-pixel text-[#F97316] mb-1">{selectedRole.tagline}</div>
                  <h3 className="text-2xl font-pixel text-[#0C4A6E] uppercase mb-3 tracking-wider">
                    {selectedRole.name}
                  </h3>
                  <p className="font-serif text-base text-[#0C4A6E] leading-relaxed">
                    {selectedRole.description}
                  </p>
                </div>

                {/* Signature Abilities Section */}
                <div className="space-y-2">
                  <h4 className="font-pixel text-[10px] text-[#0C4A6E] uppercase tracking-wider border-b-2 border-dotted border-[#0C4A6E]/20 pb-1">
                    Signature Abilities
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {selectedRole.moveset.map((move, idx) => (
                      <div 
                        key={idx} 
                        className="border-2 border-black p-2.5 bg-amber-50/20 flex flex-col justify-between hover:bg-[#FFF7ED] transition-colors relative"
                      >
                        <div className="flex justify-between items-start gap-1">
                          <span className="font-pixel text-[9px] text-[#0C4A6E] uppercase leading-tight">
                            {move.name}
                          </span>
                          {move.cooldown && (
                            <span className="font-pixel text-[6px] bg-black text-white px-1 py-[2px] leading-none shrink-0">
                              {move.cooldown} CD
                            </span>
                          )}
                        </div>
                        <p className="font-serif text-[11px] text-gray-600 leading-normal mt-1.5 italic">
                          &quot;{move.description}&quot;
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* RPG Character Sheets Stats */}
                <div className="bg-[#F0F9FF] border-2 border-[#0C4A6E]/30 p-4 space-y-3">
                  <div className="font-pixel text-[10px] text-[#0C4A6E] mb-1 border-b border-[#0C4A6E]/20 pb-1 flex justify-between items-center">
                    <span>RPG Attribute Sheet</span>
                    <span className="text-[#F97316] text-[8px]">Class Role: {selectedRole.primaryFunction}</span>
                  </div>
                  
                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                    {Object.entries(selectedRole.stats).map(([statName, val]) => {
                      const isKey = selectedRole.keyStats.toLowerCase().includes(statName.toLowerCase());
                      const colors: Record<string, string> = {
                        atk: 'bg-red-500',
                        hp: 'bg-emerald-500',
                        def: 'bg-sky-500',
                        mag: 'bg-purple-500',
                      };
                      const barColor = colors[statName] || 'bg-slate-500';
                      
                      return (
                        <div key={statName} className="space-y-1">
                          <div className="flex justify-between items-center text-xs font-pixel">
                            <span className="uppercase text-[#0C4A6E] flex items-center gap-1.5">
                              {statName}
                              {isKey && <span className="text-[#F97316] text-[7px] border border-[#F97316] px-1 font-bold">KEY</span>}
                            </span>
                            <span className="text-[#0C4A6E] font-bold">{val} / 100</span>
                          </div>
                          {/* Pixel Stat Bar */}
                          <div 
                            style={{ height: '16px' }} 
                            className="bg-white border-2 border-[#0C4A6E] p-[1px] relative shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1)]"
                          >
                            <div
                              style={{ width: `${val}%` }}
                              className={`h-full ${barColor} shadow-[inset_-2px_0px_0px_rgba(0,0,0,0.2)]`}
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
      </motion.div>
    </section>
  );
};

export default RolesSection;
