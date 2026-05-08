"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.15; // Extremely subtle
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <div className="fixed bottom-12 left-12 z-9999 flex flex-col items-center">
      <audio
        ref={audioRef}
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
        loop
      />
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="w-12 h-12 bg-raat/80 backdrop-blur-md border border-sona/30 rounded-full flex items-center justify-center text-sona hover:bg-sona hover:text-raat transition-all duration-500 shadow-2xl group"
        title={isPlaying ? "Mute Ambient Sound" : "Enable Ambient Soundscape"}
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="volume-on"
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 45 }}
            >
              <Volume2 size={20} />
            </motion.div>
          ) : (
            <motion.div
              key="volume-off"
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 45 }}
            >
              <VolumeX size={20} />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Pulsing ring when playing */}
        {isPlaying && (
          <div className="absolute inset-0 rounded-full border border-sona animate-ping opacity-20" />
        )}
        
        {/* Tooltip */}
        <span className="absolute right-full mr-4 bg-raat/90 text-sona text-[10px] uppercase tracking-widest px-3 py-1 border border-sona/20 rounded-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          {isPlaying ? "Silent Sanctuary" : "Harmonious Ambience"}
        </span>
      </button>
    </div>
  );
}
