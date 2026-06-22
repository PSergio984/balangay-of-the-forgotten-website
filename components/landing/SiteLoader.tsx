"use client";

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BOSSES = [
  { name: "BAKUNAWA",   title: "Ancient Serpent of the Moon",    src: "/media/Bakunawa.png"    },
  { name: "BATHALA",    title: "Supreme God of Creation",         src: "/media/Bathala.png"     },
  { name: "APOLAKI",    title: "God of War and the Sun",          src: "/media/Apolaki.png"     },
  { name: "MAYARI",     title: "Goddess of the Moon",             src: "/media/Mayari.png"      },
  { name: "KAPRE",      title: "Ancient Giant of the Forest",     src: "/media/Kapre.png"       },
  { name: "MANANANGGAL","title": "Terror of the Night Sky",       src: "/media/Manananggal.png" },
  { name: "MINOKAWA",   title: "The Sky-Devouring Beast",         src: "/media/Minokawa.png"    },
  { name: "SIRENA",     title: "Sovereign of the Deep",           src: "/media/Sirena.png"      },
]

const BOOT_MESSAGES = [
  "INITIALIZING BALANGAY CORE...",
  "MOUNTING MEMORY VECTORS...",
  "ESTABLISHING TEMPORAL LINK...",
  "DECRYPTING ARCHIVAL CHANNELS...",
  "LOADING ENTITY DATA...",
  "SYNCING LORE FRAGMENTS...",
  "CALIBRATING BATTLE SYSTEMS...",
  "BALANGAY OS v1.0 ONLINE.",
]

// 20-segment pixel progress bar
function PixelProgressBar({ progress }: { progress: number }) {
  const filled = Math.floor((progress / 100) * 20)
  const isLow = progress < 30
  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-center font-pixel text-[8px]">
        <span className="text-white/60">HP</span>
        <span className={isLow ? "text-red-400 animate-pulse" : "text-[#F97316]"}>{progress}%</span>
      </div>
      <div className="flex gap-[3px] w-full border-2 border-white/20 bg-black p-1">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className={`h-5 flex-1 transition-colors duration-100 ${
              i < filled
                ? isLow
                  ? "bg-red-500"
                  : "bg-[#F97316]"
                : "bg-white/10"
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default function SiteLoader() {
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)
  const [bootMsgIndex, setBootMsgIndex] = useState(0)
  const [bossIndex] = useState(() => Math.floor(Math.random() * BOSSES.length))
  const [typedName, setTypedName] = useState("")
  const [flash, setFlash] = useState(false)
  const progressRef = useRef(0)

  const boss = BOSSES[bossIndex]

  // Typewriter effect for boss name
  useEffect(() => {
    if (!visible) return
    let i = 0
    const interval = setInterval(() => {
      setTypedName(boss.name.slice(0, i + 1))
      i++
      if (i >= boss.name.length) clearInterval(interval)
    }, 80)
    return () => clearInterval(interval)
  }, [visible, boss.name])

  // Cycle boot messages
  useEffect(() => {
    if (!visible) return
    const interval = setInterval(() => {
      setBootMsgIndex((prev) => (prev + 1) % BOOT_MESSAGES.length)
    }, 600)
    return () => clearInterval(interval)
  }, [visible])

  // Progress loader
  useEffect(() => {
    if (!visible) return
    const interval = setInterval(() => {
      progressRef.current += 6
      const next = Math.min(progressRef.current, 100)
      setProgress(next)
      if (next >= 100) {
        clearInterval(interval)
        setFlash(true)
        setTimeout(() => {
          setVisible(false)
          sessionStorage.setItem('balangay-site-loaded', 'true')
          window.dispatchEvent(new CustomEvent('balangay-ready'))
        }, 700)
      }
    }, 120)
    return () => clearInterval(interval)
  }, [visible])

  useEffect(() => {
    setMounted(true)
    const isLoaded = sessionStorage.getItem('balangay-site-loaded')
    if (!isLoaded) setVisible(true)
  }, [])

  if (!mounted || !visible) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050508] overflow-hidden"
        >
          {/* Scanline overlay */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.18) 2px, rgba(0,0,0,0.18) 4px)",
            }}
          />

          {/* Flash on complete */}
          <AnimatePresence>
            {flash && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.8, 0] }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 bg-white z-20 pointer-events-none"
              />
            )}
          </AnimatePresence>

          {/* Main panel */}
          <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-sm px-6">

            {/* Boss sprite */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 16 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -8, 0],
              }}
              transition={{
                opacity: { duration: 0.6, ease: "easeOut" },
                scale: { duration: 0.6, ease: "easeOut" },
                y: { delay: 0.6, duration: 2.2, repeat: Infinity, ease: "easeInOut" },
              }}
              className="relative"
            >
              {/* Glow behind sprite */}
              <div className="absolute inset-0 blur-2xl opacity-30 bg-[#F97316] rounded-full scale-75 translate-y-4" />
              <img
                src={boss.src}
                alt={boss.name}
                className="relative w-48 h-48 object-contain"
                style={{ imageRendering: "pixelated" }}
              />
            </motion.div>

            {/* Boss identity */}
            <div className="text-center space-y-2">
              <div className="font-pixel text-[#F97316] text-lg tracking-widest min-h-[1.5rem]">
                {typedName}
                {typedName.length < boss.name.length && (
                  <span className="inline-block w-[10px] h-[1em] bg-[#F97316] ml-1 animate-pulse align-middle" />
                )}
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: typedName.length === boss.name.length ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                className="font-serif italic text-white/50 text-sm"
              >
                {boss.title}
              </motion.div>
            </div>

            {/* Progress bar */}
            <div className="w-full">
              <PixelProgressBar progress={progress} />
            </div>

            {/* Scrolling boot message */}
            <div className="w-full overflow-hidden border-t border-white/10 pt-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={bootMsgIndex}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.25 }}
                  className="font-pixel text-[7px] text-green-400/70 tracking-wider flex gap-2 items-center"
                >
                  <span className="text-green-600">&gt;</span>
                  {BOOT_MESSAGES[bootMsgIndex]}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Corner decorations — pixel brackets */}
          {[
            "top-4 left-4 border-t-4 border-l-4",
            "top-4 right-4 border-t-4 border-r-4",
            "bottom-4 left-4 border-b-4 border-l-4",
            "bottom-4 right-4 border-b-4 border-r-4",
          ].map((cls, i) => (
            <div key={i} className={`absolute w-8 h-8 border-white/20 ${cls}`} />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
