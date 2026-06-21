"use client";

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function SiteLoader() {
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)
  const [bootStep, setBootStep] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setMounted(true)
    const isLoaded = sessionStorage.getItem('balangay-site-loaded')
    if (isLoaded) {
      setVisible(false)
      return
    }

    setVisible(true)

    // Sequence of simulated boot commands
    const bootTimer = setInterval(() => {
      setBootStep((prev) => {
        if (prev < 4) return prev + 1
        clearInterval(bootTimer)
        return prev
      })
    }, 300)

    // Progress bar loader
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer)
          // Hide loader after loading completes
          setTimeout(() => {
            setVisible(false)
            sessionStorage.setItem('balangay-site-loaded', 'true')
          }, 400)
          return 100
        }
        return prev + 10
      })
    }, 150)

    return () => {
      clearInterval(bootTimer)
      clearInterval(progressTimer)
    }
  }, [])

  if (!mounted || !visible) return null

  const bootLines = [
    "INITIALIZING BALANGAY CORE...",
    "MOUNTING MEMORY VECTORS...",
    "ESTABLISHING TEMPORAL LINK...",
    "DECRYPTING ARCHIVAL CHANNELS...",
    "BALANGAY OS v1.0 ONLINE."
  ]

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0a] text-green-500 font-pixel p-6"
        >
          {/* CRT effect wrapper */}
          <div className="absolute inset-0 bg-radial-crt opacity-15 pointer-events-none" />
          
          <div className="w-full max-w-lg flex flex-col gap-6">
            <div className="border-4 border-green-500 p-6 bg-black shadow-[4px_4px_0px_0px_rgba(0,255,0,0.2)]">
              <div className="flex flex-col gap-2 min-h-[140px] text-[8px] md:text-[10px] leading-relaxed">
                {bootLines.slice(0, bootStep + 1).map((line, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <span className="text-green-800">&gt;</span>
                    <span>{line}</span>
                    {index === bootStep && index < 4 && (
                      <span className="w-2 h-4 bg-green-500 animate-pulse inline-block" />
                    )}
                  </div>
                ))}
              </div>

              {/* Progress bar container */}
              <div className="mt-8 space-y-2">
                <div className="flex justify-between text-[8px] text-green-700">
                  <span>SYSTEM LOADING</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full h-8 border-4 border-green-500 bg-black p-1 flex items-center">
                  <div 
                    className="h-full bg-green-500 transition-all duration-150 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="text-center text-[6px] text-green-800 tracking-wider">
              WARNING: DO NOT INTERRUPT THE SYNC SEQUENCE
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
