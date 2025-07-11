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
    <div className="w-full bg-[#334155] p-4 rounded-lg border-8 border-[#F97316]">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 1,
          scale: isLoading ? [1, 1.1, 1] : 1,
          transition: isLoading
            ? { scale: { repeat: Infinity, duration: 0.8 } }
            : { duration: 0.3 },
        }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <img
            src={current ? current.favicon || "/iconEmisora.PNG" : "/iconEmisora.PNG"}
            alt={current ? current.name : "Reproductor"}
            className="w-12 h-12 object-contain rounded"
          />
          <div>
            <p className="font-semibold text-[#F1F5F9]">
              {current ? current.name : "Selecciona una emisora"}
            </p>
            <p className="text-sm text-gray-300">
              {current ? current.country : "No hay emisora seleccionada"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <AnimatePresence>
            {isPlaying && !isLoading && (
              <motion.div
                className="flex gap-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {[0, 1, 2].map((index) => (
                  <motion.div
                    key={index}
                    animate={{
                      y: [0, -10, 0],
                      opacity: [0.3, 1, 0.3],
                      transition: {
                        y: { repeat: Infinity, duration: 1.5, delay: index * 0.3 },
                        opacity: { repeat: Infinity, duration: 1.5, delay: index * 0.3 },
                      },
                    }}
                  >
                    <FaMusic className="text-[#F97316] text-lg" />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          <div className="flex items-center gap-2">
            {isLoading ? (
              <span className="text-[#F97316]">Cargando...</span>
            ) : (
              <button
                onClick={togglePlay}
                disabled={!current}
                className={`p-2 rounded-full transition ${
                  current
                    ? "bg-[#F97316] text-white hover:bg-opacity-80"
                    : "bg-gray-500 text-gray-300 cursor-not-allowed"
                }`}
              >
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
            )}
            <div className="flex items-center gap-1">
              <FaVolumeUp className="text-[#F97316]" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                disabled={!current}
                className={`w-24 accent-[#F97316] ${
                  !current ? "opacity-50 cursor-not-allowed" : ""
                }`}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}


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

//   // Combinar nombre de la emisora y título de la canción (placeholder)
//   const getDisplayText = () => {
//     if (!current) return "Selecciona una emisora";
//     const songTitle = current.tags ? current.tags.split(",")[0] : "Canción desconocida";
//     const fullText = `${current.name} - ${songTitle}`;
//     return fullText.length > 50 ? `${fullText.slice(0, 47)}...` : fullText;
//   };

//   return (
//     <div className="w-full bg-[#334155] p-4 rounded-lg border-4 border-[#F97316]">
//       <style>
//         {`
//           .marquee {
//             display: inline-block;
//             white-space: nowrap;
//             animation: marquee 10s linear infinite;
//           }
//           @keyframes marquee {
//             0% { transform: translateX(0); }
//             100% { transform: translateX(-100%); }
//           }
//           .marquee-container {
//             overflow: hidden;
//             white-space: nowrap;
//             width: 100%;
//           }
//           .marquee:hover {
//             animation-play-state: paused;
//           }
//         `}
//       </style>
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
//         <div className="flex items-center gap-4 flex-1">
//           <img
//             src={current ? current.favicon || "/iconEmisora.PNG" : "/iconEmisora.PNG"}
//             alt={current ? current.name : "Reproductor"}
//             className="w-12 h-12 object-contain rounded"
//           />
//           <div className="flex-1">
//             <div className="marquee-container">
//               <p className="font-semibold text-[#F1F5F9] marquee">
//                 {getDisplayText()}
//               </p>
//             </div>
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
//                 className={`p-2 rounded-full transition ${
//                   current
//                     ? "bg-[#F97316] text-white hover:bg-opacity-80"
//                     : "bg-gray-500 text-gray-300 cursor-not-allowed"
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
//                 className={`w-24 accent-[#F97316] ${
//                   !current ? "opacity-50 cursor-not-allowed" : ""
//                 }`}
//               />
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// }