"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function FireflyBackground() {
  const [fireflies, setFireflies] = useState([]);

  useEffect(() => {
    // Generate fireflies on client side only
    const count = 30;
    const newFireflies = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }));
    setFireflies(newFireflies);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#0a0f1e]">
      {/* Deep Night Sky Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#0f172a] to-[#1e293b] opacity-90" />
      
      {/* Fireflies */}
      {fireflies.map((firefly) => (
        <motion.div
          key={firefly.id}
          className="absolute rounded-full bg-yellow-400/60 blur-[1px] shadow-[0_0_10px_2px_rgba(250,204,21,0.3)]"
          style={{
            width: firefly.size,
            height: firefly.size,
            left: `${firefly.x}%`,
            top: `${firefly.y}%`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
            opacity: [0, 1, 0.5, 1, 0],
            scale: [0.5, 1.2, 0.8, 1, 0.5],
          }}
          transition={{
            duration: firefly.duration,
            repeat: Infinity,
            ease: "linear",
            delay: firefly.delay,
          }}
        />
      ))}
      
      {/* Subtle Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-tutonaranja/10 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: "2s" }} />
    </div>
  );
}
