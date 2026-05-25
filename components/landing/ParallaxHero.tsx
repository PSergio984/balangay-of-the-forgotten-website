"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP, ScrollTrigger } from "@/lib/gsap";

export default function ParallaxHero() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Background layer moves slowly
      gsap.to('[data-layer="background"]', {
        yPercent: -25,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Mid layer moves medium
      gsap.to('[data-layer="mid"]', {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Foreground layer moves fast
      gsap.to('[data-layer="foreground"]', {
        yPercent: -5,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: container }
  );

  return (
    <section 
      ref={container} 
      className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center"
    >
      {/* Background Layer */}
      <div 
        data-layer="background" 
        className="absolute inset-0 bg-indigo-950 opacity-50"
        style={{ imageRendering: 'pixelated' }}
      >
        {/* Placeholder for starfield/distant mountains */}
      </div>

      {/* Mid Layer */}
      <div 
        data-layer="mid" 
        className="absolute inset-0 flex items-center justify-center"
        style={{ imageRendering: 'pixelated' }}
      >
        <h1 className="text-6xl md:text-9xl font-bold text-white tracking-tighter">
          BALANGAY
        </h1>
      </div>

      {/* Foreground Layer */}
      <div 
        data-layer="foreground" 
        className="absolute inset-0 pointer-events-none"
        style={{ imageRendering: 'pixelated' }}
      >
        {/* Placeholder for foreground foliage/ruins */}
      </div>
    </section>
  );
}
