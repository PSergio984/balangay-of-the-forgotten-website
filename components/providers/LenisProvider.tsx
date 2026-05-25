"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useRef } from "react";

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    let frameId: number;

    function update(time: number) {
      lenisRef.current?.lenis?.raf(time);
      frameId = requestAnimationFrame(update);
    }

    frameId = requestAnimationFrame(update);
    
    return () => {
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <ReactLenis root ref={lenisRef} options={{ autoRaf: false, duration: 1.2 }}>
      {children}
    </ReactLenis>
  );
}
