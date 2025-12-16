import { useEffect, useState, useRef } from "react";
import { Howl, Howler } from "howler";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import AudioVisualizer from "./AudioVisualizer";

// Global singleton to track the active Howl instance across renders/remounts
let globalSound = null;

export default function RadioPlayer({ current }) {
  // Local state for UI feedback
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [playError, setPlayError] = useState(null);
  const [isMuted, setIsMuted] = useState(false);

  // Sync global volume 
  useEffect(() => {
    Howler.volume(isMuted ? 0 : volume);
  }, [volume, isMuted]);

  useEffect(() => {
    if (current) {
      // 1. Force stop and unload ANY existing global sound
      if (globalSound) {
        globalSound.stop();
        globalSound.unload();
        globalSound = null;
      }

      setIsLoading(true);
      setPlayError(null);
      setIsPlaying(false);

      // 2. Create new global instance
      globalSound = new Howl({
        src: [current.url_resolved],
        html5: true, // Force HTML5 Audio to support streaming better
        format: [current.codec?.toLowerCase() || 'mp3'],
        autoplay: true,
        onplay: () => {
          setIsLoading(false);
          setIsPlaying(true);
          setPlayError(null);
        },
        onload: () => {
           if (globalSound && !globalSound.playing()) {
               globalSound.play();
           }
        },
        onloaderror: (id, err) => {
          setIsLoading(false);
          setPlayError("Error de conexión");
          console.error("Load Error:", err);
        },
        onplayerror: (id, err) => {
          setIsLoading(false);
          setIsPlaying(false);
          setPlayError("Error de reproducción");
          console.error("Play Error:", err);
          globalSound.once('unlock', function() {
            globalSound.play();
          });
        },
        onend: () => {
           setIsPlaying(false);
        }
      });

    }

    // Cleanup when component unmounts OR when current changes (effect re-runs)
    return () => {
      // Intentional: We do NOT unload sound here to allow playback to continue 
      // if the user navigates (if we had navigation). 
      // But since 'current' dependency triggers this cleanup, we only want to 
      // stop if we constitute a "stop" action. 
      // actually, for this app, logic above handles "switching" stations.
      // If we unmount (e.g. close player), we probably want to stop.
      // For now, relying on the 'if(current)' block above to handle switching.
    };
  }, [current]);

  const togglePlay = () => {
    if (globalSound) {
      if (globalSound.playing()) {
        globalSound.pause();
        setIsPlaying(false);
      } else {
        globalSound.play();
        setIsPlaying(true);
      }
    }
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (isMuted && val > 0) setIsMuted(false);
  };

  if (!current) return null;

  return (
    <div className="sticky top-4 z-50 w-full mb-6">
       <motion.div 
        className="glass-panel w-full rounded-2xl p-3 sm:p-4 flex flex-col border-t-2 border-white/20 shadow-2xl relative overflow-hidden"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Background Glow for Player */}
        <div className="absolute inset-0 bg-gradient-to-r from-tutonaranja/10 to-blue-500/10 pointer-events-none" />

        {/* Error Message */}
        <AnimatePresence>
          {playError && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-red-500/90 text-white text-xs px-3 py-1 rounded mb-2 text-center backdrop-blur-sm z-10"
            >
              {playError}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-between gap-4 relative z-10">
          
          {/* Station Info */}
          <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
            <div className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden shadow-lg border border-white/10 ${isPlaying ? 'animate-pulse-slow' : ''}`}>
              <img
                src={current?.favicon || "/iconEmisora.PNG"}
                alt={current?.name || "Logo"}
                className="w-full h-full object-cover bg-slate-900"
                onError={(e) => e.target.src = "/iconEmisora.PNG"}
              />
              {!current && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-800/50">
                  <span className="text-2xl text-white/20">♫</span>
                </div>
              )}
            </div>
            
            <div className="min-w-0">
              <h3 className="text-white font-bold truncate text-sm sm:text-base leading-tight">
                {current ? current.name : "Selecciona una emisora"}
              </h3>
              <p className="text-slate-400 text-xs truncate">
                {current ? current.country : "TutoGo Radio"}
              </p>
            </div>
          </div>

          {/* Controls & Visualizer */}
          <div className="flex flex-col items-center gap-1 flex-shrink-0">
             <div className="hidden sm:block w-24 h-6">
               <AudioVisualizer isPlaying={isPlaying && !isLoading} />
             </div>
             
             <div className="flex items-center gap-4">
              <button
                onClick={togglePlay}
                disabled={!current || isLoading}
                className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-tutonaranja text-white shadow-lg shadow-tutonaranja/40 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed border-2 border-white/20"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : isPlaying ? (
                  <FaPause />
                ) : (
                  <FaPlay className="ml-1" />
                )}
              </button>
             </div>
          </div>

          {/* Volume */}
          <div className="hidden sm:flex items-center gap-2 w-auto justify-end">
            <button onClick={() => setIsMuted(!isMuted)} className="text-slate-400 hover:text-white transition-colors p-2">
              {isMuted || volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-20 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full hover:[&::-webkit-slider-thumb]:scale-125 transition-all"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}