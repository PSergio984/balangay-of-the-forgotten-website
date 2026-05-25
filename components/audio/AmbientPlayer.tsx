"use client";

import React, { useState, useRef, useEffect } from 'react';

const AmbientPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const charAudioRef = useRef<HTMLAudioElement | null>(null);

  const toggleAudio = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        // Mute/Pause everything
        audioRef.current.pause();
        if (charAudioRef.current) {
          charAudioRef.current.pause();
        }
        setIsPlaying(false);
      } else {
        // If a custom theme was active, play it instead of the main background
        if (charAudioRef.current) {
          await charAudioRef.current.play();
        } else {
          await audioRef.current.play();
        }
        setIsPlaying(true);
      }
    } catch (err) {
      console.error("Audio play failed:", err);
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const handlePlayTheme = async (e: Event) => {
      const customEvent = e as CustomEvent<{ src: string }>;
      const { src } = customEvent.detail;

      // Pause main ambient theme
      if (audioRef.current) {
        audioRef.current.pause();
      }

      // Stop current theme if any
      if (charAudioRef.current) {
        charAudioRef.current.pause();
        charAudioRef.current = null;
      }

      // Initialize and play new theme
      const newAudio = new Audio(src);
      newAudio.loop = true;
      newAudio.volume = 0.5;
      charAudioRef.current = newAudio;

      if (isPlaying) {
        try {
          await newAudio.play();
        } catch (err) {
          console.error("Failed to play custom theme:", err);
        }
      }
    };

    const handleStopTheme = () => {
      if (charAudioRef.current) {
        charAudioRef.current.pause();
        charAudioRef.current = null;
      }

      // Resume main ambient theme if we should be playing
      if (isPlaying && audioRef.current) {
        audioRef.current.play().catch(err => console.error(err));
      }
    };

    window.addEventListener('play-game-theme', handlePlayTheme);
    window.addEventListener('stop-game-theme', handleStopTheme);

    return () => {
      window.removeEventListener('play-game-theme', handlePlayTheme);
      window.removeEventListener('stop-game-theme', handleStopTheme);
      if (charAudioRef.current) {
        charAudioRef.current.pause();
      }
    };
  }, [isPlaying]);

  return (
    <div className="fixed bottom-8 left-8 z-40">
      <audio 
        ref={audioRef}
        loop
        src="/audio/intro/isla-ng-lihim.mp3" 
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
