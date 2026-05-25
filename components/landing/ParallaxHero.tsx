"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ParallaxHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Replicating GSAP yPercent differences:
  // Background: -25%
  // Mid: -15%
  // Foreground: -5%
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const midY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const foregroundY = useTransform(scrollYProgress, [0, 1], ["0%", "-5%"]);

  return (
    <section 
      ref={containerRef} 
      className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center"
    >
      {/* Background Layer */}
      <motion.div 
        style={{ y: backgroundY, imageRendering: 'pixelated' }}
        className="absolute inset-0 bg-indigo-950 opacity-50"
      >
        {/* Placeholder for starfield/distant mountains */}
      </motion.div>

      {/* Mid Layer */}
      <motion.div 
        style={{ y: midY, imageRendering: 'pixelated' }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <h1 className="text-6xl md:text-9xl font-bold text-white tracking-tighter">
          BALANGAY
        </h1>
      </motion.div>

      {/* Foreground Layer */}
      <motion.div 
        style={{ y: foregroundY, imageRendering: 'pixelated' }}
        className="absolute inset-0 pointer-events-none"
      >
        {/* Placeholder for foreground foliage/ruins */}
      </motion.div>
    </section>
  );
}
