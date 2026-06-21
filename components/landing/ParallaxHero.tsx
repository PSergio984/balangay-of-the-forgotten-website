"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ParallaxHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll();

  // Parallax calculations (scrollY-based)
  // Background moves down/slower relative to viewport scroll to create deep parallax
  const videoY = useTransform(scrollY, [0, 1000], ["0px", "300px"]);
  // Logo flies up slightly faster than normal scroll to feel lightweight
  const logoYScroll = useTransform(scrollY, [0, 1000], [0, -120]);
  const logoOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const textOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    // If loader has already executed, animate immediately
    if (sessionStorage.getItem('balangay-site-loaded')) {
      setShouldAnimate(true);
      return;
    }

    const handleReady = () => {
      setShouldAnimate(true);
    };

    window.addEventListener('balangay-ready', handleReady);
    return () => window.removeEventListener('balangay-ready', handleReady);
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative h-screen w-full bg-black overflow-hidden flex items-center justify-center"
    >
      {/* Background Video Layer with Parallax */}
      <motion.div 
        style={{ y: videoY }}
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

      {/* Foreground Logo & Text Layer */}
      <motion.div 
        initial={{ opacity: 0, y: 120, scale: 0.85 }}
        animate={shouldAnimate ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ type: "spring", stiffness: 50, damping: 12, delay: 0.3 }}
        style={{ y: logoYScroll, opacity: logoOpacity }}
        className="relative z-20 flex flex-col items-center justify-center px-4 max-w-4xl text-center pointer-events-none"
      >
        <img 
          src="/videos/animations/logo.png" 
          alt="Balangay of the Forgotten" 
          className="w-[90%] md:w-full h-auto max-h-[50vh] object-contain rendering-pixelated drop-shadow-[0_8px_8px_rgba(0,0,0,0.8)]"
        />
        
        <motion.div 
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
  );
}
