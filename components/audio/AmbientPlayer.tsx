"use client";

import React, { useState, useRef } from 'react';

const AmbientPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => {
        console.error("Audio play failed:", err);
      });
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-8 left-8 z-40">
      <audio 
        ref={audioRef}
        loop
        src="/ambient-loop.mp3" 
      />
      <button 
        onClick={toggleAudio}
        className="group relative flex items-center gap-3 bg-white border-4 border-[#0C4A6E] p-2 hover:bg-[#F0F9FF] transition-colors shadow-[4px_4px_0px_0px_rgba(12,74,110,1)] active:translate-x-1 active:translate-y-1 active:shadow-none"
      >
        <div className="w-8 h-8 flex items-center justify-center bg-[#0C4A6E]">
          {isPlaying ? (
            <div className="flex gap-1 items-end h-3">
              <div className="w-1 bg-[#F0F9FF] animate-pulse" />
              <div className="w-1 bg-[#F0F9FF] animate-pulse" />
              <div className="w-1 bg-[#F0F9FF] animate-pulse" />
            </div>
          ) : (
            <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-[#F0F9FF] border-b-[6px] border-b-transparent ml-1" />
          )}
        </div>
        <span className="font-pixel text-[10px] text-[#0C4A6E] pr-2 uppercase">
          {isPlaying ? 'MUTE' : 'UNMUTE'}
        </span>
      </button>
    </div>
  );
};

export default AmbientPlayer;
