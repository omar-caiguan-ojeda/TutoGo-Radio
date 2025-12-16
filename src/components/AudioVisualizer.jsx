"use client";

import { motion } from "framer-motion";

export default function AudioVisualizer({ isPlaying }) {
  const bars = 20;

  return (
    <div className="flex items-center justify-center gap-[2px] h-8 w-full max-w-[200px] overflow-hidden">
      {Array.from({ length: bars }).map((_, i) => (
        <motion.div
          key={i}
          className="w-1.5 bg-tutonaranja rounded-full"
          animate={{
            height: isPlaying ? ["20%", "80%", "20%"] : "10%",
            opacity: isPlaying ? 1 : 0.3,
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
            delay: i * 0.05,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
