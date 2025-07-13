// // src/components/RadioPlayer.jsx
// import { useEffect, useState } from "react";
// import { Howl } from "howler";
// import { FaPlay, FaPause, FaMusic, FaVolumeUp } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";

// export default function RadioPlayer({ current }) {
//   const [sound, setSound] = useState(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [volume, setVolume] = useState(0.5);

//   useEffect(() => {
//     if (current) {
//       setIsLoading(true);
//       const newSound = new Howl({
//         src: [current.url_resolved],
//         html5: true,
//         format: [current.codec.toLowerCase()],
//         volume: volume,
//         onplay: () => {
//           setIsLoading(false);
//           setIsPlaying(true);
//         },
//         onloaderror: () => {
//           setIsLoading(false);
//           console.error("Error al cargar la emisora");
//         },
//         onplayerror: () => {
//           setIsLoading(false);
//           console.error("Error al reproducir la emisora");
//         },
//       });
//       setSound(newSound);
//       newSound.play();
//       return () => {
//         newSound.stop();
//         newSound.unload();
//         setSound(null);
//         setIsPlaying(false);
//         setIsLoading(false);
//       };
//     }
//   }, [current]);

//   useEffect(() => {
//     if (sound) {
//       sound.volume(volume);
//     }
//   }, [volume, sound]);

//   const togglePlay = () => {
//     if (sound) {
//       if (isPlaying) {
//         sound.pause();
//         setIsPlaying(false);
//       } else {
//         sound.play();
//         setIsPlaying(true);
//       }
//     }
//   };

//   const handleVolumeChange = (e) => {
//     const newVolume = parseFloat(e.target.value);
//     setVolume(newVolume);
//   };

//   return (
//     <div
//   className="w-full max-w-4xl mx-auto bg-gradient-to-br from-[#1e1e1e]/90 via-[#334155]/90 to-[#1e1e1e]/80 p-4 rounded-2xl shadow-lg shadow-[#F97316]/20 border-4 border-[#F97316]/40 backdrop-blur-sm z-20"
//   style={{ position: 'sticky', top: '1rem' }}
// >
//       <motion.div
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{
//           opacity: 1,
//           scale: isLoading ? [1, 1.1, 1] : 1,
//           transition: isLoading
//             ? { scale: { repeat: Infinity, duration: 0.8 } }
//             : { duration: 0.3 },
//         }}
//         className="flex items-center justify-between"
//       >
//         <div className="flex items-center gap-4">
//           <img
//             src={current ? current.favicon || "/iconEmisora.PNG" : "/iconEmisora.PNG"}
//             alt={current ? current.name : "Reproductor"}
//             className="w-12 h-12 object-contain rounded"
//           />
//           <div>
//             <p className="font-semibold text-[#F1F5F9]">
//               {current ? current.name : "Selecciona una emisora"}
//             </p>
//             <p className="text-sm text-gray-300">
//               {current ? current.country : "No hay emisora seleccionada"}
//             </p>
//           </div>
//         </div>
//         <div className="flex items-center gap-4">
//           <AnimatePresence>
//             {isPlaying && !isLoading && (
//               <motion.div
//                 className="flex gap-1"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//               >
//                 {[0, 1, 2].map((index) => (
//                   <motion.div
//                     key={index}
//                     animate={{
//                       y: [0, -10, 0],
//                       opacity: [0.3, 1, 0.3],
//                       transition: {
//                         y: { repeat: Infinity, duration: 1.5, delay: index * 0.3 },
//                         opacity: { repeat: Infinity, duration: 1.5, delay: index * 0.3 },
//                       },
//                     }}
//                   >
//                     <FaMusic className="text-[#F97316] text-lg" />
//                   </motion.div>
//                 ))}
//               </motion.div>
//             )}
//           </AnimatePresence>
//           <div className="flex items-center gap-2">
//             {isLoading ? (
//               <span className="text-[#F97316]">Cargando...</span>
//             ) : (
//               <button
//                 onClick={togglePlay}
//                 disabled={!current}
//                 className={`p-2 rounded-full transition hover:cursor-pointer ${
//                   current
//                     ? "bg-[#F97316] text-white hover:bg-opacity-80"
//                     : "bg-gray-500 text-gray-300 hover:cursor-pointer"
//                 }`}
//               >
//                 {isPlaying ? <FaPause /> : <FaPlay />}
//               </button>
//             )}
//             <div className="flex items-center gap-1">
//               <FaVolumeUp className="text-[#F97316]" />
//               <input
//                 type="range"
//                 min="0"
//                 max="1"
//                 step="0.01"
//                 value={volume}
//                 onChange={handleVolumeChange}
//                 disabled={!current}
//                 className={`w-24 accent-[#F97316] hover:cursor-pointer ${
//                   !current ? "opacity-50" : ""
//                 }`}
//               />
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// }




import { useEffect, useState } from "react";
import { Howl } from "howler";
import { FaPlay, FaPause, FaMusic, FaVolumeUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function RadioPlayer({ current }) {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    if (current) {
      setIsLoading(true);
      const newSound = new Howl({
        src: [current.url_resolved],
        html5: true,
        format: [current.codec.toLowerCase()],
        volume: volume,
        onplay: () => {
          setIsLoading(false);
          setIsPlaying(true);
        },
        onloaderror: () => {
          setIsLoading(false);
          console.error("Error al cargar la emisora");
        },
        onplayerror: () => {
          setIsLoading(false);
          console.error("Error al reproducir la emisora");
        },
      });
      setSound(newSound);
      newSound.play();
      return () => {
        newSound.stop();
        newSound.unload();
        setSound(null);
        setIsPlaying(false);
        setIsLoading(false);
      };
    }
  }, [current]);

  useEffect(() => {
    if (sound) {
      sound.volume(volume);
    }
  }, [volume, sound]);

  const togglePlay = () => {
    if (sound) {
      if (isPlaying) {
        sound.pause();
        setIsPlaying(false);
      } else {
        sound.play();
        setIsPlaying(true);
      }
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  return (
    <div
      className="w-full max-w-3xl mx-auto bg-gradient-to-br from-[#1e1e1e]/90 via-[#334155]/90 to-[#1e1e1e]/80 p-3 sm:p-4 rounded-2xl shadow-lg shadow-[#F97316]/20 border-4 border-[#F97316]/40 backdrop-blur-sm z-20"
      style={{ position: 'sticky', top: '0.5rem' }}
      role="region"
      aria-label="Reproductor de radio"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 1,
          scale: isLoading ? [1, 1.1, 1] : 1,
          transition: isLoading ? { scale: { repeat: Infinity, duration: 0.8 } } : { duration: 0.3 },
        }}
        className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4"
      >
        <div className="flex items-center gap-2 sm:gap-4">
          <img
            src={current ? current.favicon || "/iconEmisora.PNG" : "/iconEmisora.PNG"}
            alt={current ? current.name : "Reproductor"}
            className="w-10 h-10 sm:w-12 sm:h-12 object-contain rounded"
            loading="lazy"
          />
          <div className="text-center sm:text-left">
            <p className="font-semibold text-[#F1F5F9] text-sm sm:text-base">
              {current ? current.name : "Selecciona una emisora"}
            </p>
            <p className="text-xs sm:text-sm text-gray-300">
              {current ? current.country : "No hay emisora seleccionada"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <AnimatePresence>
            {isPlaying && !isLoading && (
              <motion.div className="flex gap-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {[0, 1, 2].map((index) => (
                  <motion.div
                    key={index}
                    animate={{
                      y: [0, -8, 0],
                      opacity: [0.3, 1, 0.3],
                      transition: {
                        y: { repeat: Infinity, duration: 1.5, delay: index * 0.3 },
                        opacity: { repeat: Infinity, duration: 1.5, delay: index * 0.3 },
                      },
                    }}
                  >
                    <FaMusic className="text-[#F97316] text-sm sm:text-lg" />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          <div className="flex items-center gap-1 sm:gap-2">
            {isLoading ? (
              <span className="text-[#F97316] text-sm sm:text-base">Cargando...</span>
            ) : (
              <button
                onClick={togglePlay}
                disabled={!current}
                className={`p-2 rounded-full transition hover:cursor-pointer ${
                  current
                    ? "bg-[#F97316] text-white hover:bg-opacity-80"
                    : "bg-gray-500 text-gray-300 hover:cursor-not-allowed"
                }`}
                aria-label={isPlaying ? "Pausar emisora" : "Reproducir emisora"}
                role="button"
              >
                {isPlaying ? <FaPause className="text-sm sm:text-base" /> : <FaPlay className="text-sm sm:text-base" />}
              </button>
            )}
            <div className="flex items-center gap-1">
              <FaVolumeUp className="text-[#F97316] text-sm sm:text-base" aria-hidden="true" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                disabled={!current}
                className={`w-20 sm:w-24 accent-[#F97316] hover:cursor-pointer ${!current ? "opacity-50" : ""}`}
                aria-label="Control de volumen"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}