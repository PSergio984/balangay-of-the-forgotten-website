"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { useGameStore } from "@/lib/store";

export default function ParallaxHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Sticky Parallax transformations (scrollYProgress-based)
  const logoY = useTransform(scrollYProgress, [0, 0.5], ["0px", "-150px"]);
  const logoOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const logoScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.85]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  // Video background adjustments
  const videoScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.15]);
  const videoOpacity = useTransform(scrollYProgress, [0.3, 0.6], [1, 0.2]);

  const [shouldAnimate, setShouldAnimate] = useState(false);
  const isReady = useGameStore((state) => state.isReady);

  useEffect(() => {
    if (isReady) {
      setShouldAnimate(true);
    }
  }, [isReady]);


  return (
    <div 
      ref={containerRef} 
      className="relative h-[180vh] w-full bg-black"
    >
      {/* Sticky container that stays in place while scrolling */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center z-10">
        
        {/* Background Video Layer */}
        <motion.div 
          style={{ scale: videoScale, opacity: videoOpacity }}
          className="absolute inset-0 w-full h-full"
        >
          <video
            src="/videos/animations/menuscreen.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover rendering-pixelated"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 pointer-events-none" />
        </motion.div>

        {/* Foreground Logo & Text Layer with scroll-linked translations */}
        <motion.div 
          style={{ y: logoY, opacity: logoOpacity, scale: logoScale }}
          className="relative z-20 flex flex-col items-center justify-center px-4 max-w-4xl text-center pointer-events-none"
        >
          {/* Inner Logo Image with Spring Entrance Animation */}
          <motion.img 
            initial={{ opacity: 0, y: 120, scale: 0.85 }}
            animate={shouldAnimate ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ type: "spring", stiffness: 50, damping: 12, delay: 0.3 }}
            src="/videos/animations/logo.png" 
            alt="Balangay of the Forgotten" 
            fetchPriority="high"
            className="w-[90%] md:w-full h-auto max-h-[50vh] object-contain rendering-pixelated drop-shadow-[0_8px_8px_rgba(0,0,0,0.8)]"
          />
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={shouldAnimate ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            style={{ opacity: textOpacity }}
            className="mt-12 flex flex-col items-center gap-4"
          >
            <span className="font-pixel text-[10px] md:text-xs text-white tracking-widest bg-black/50 px-4 py-2 border-2 border-white/20 animate-pulse">
              SCROLL TO EXPLORE ARCHIVES
            </span>
            <div className="w-1 h-12 bg-gradient-to-b from-white to-transparent animate-bounce mt-4" />
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
}
