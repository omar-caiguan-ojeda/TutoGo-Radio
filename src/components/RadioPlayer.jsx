

// // src/components/RadioPlayer.jsx
// import { useState, useEffect, useRef } from "react";
// import { useTranslation } from "next-i18next";
// import { Howl } from "howler";
// import { FaSpinner, FaPlay, FaPause, FaStop, FaVolumeUp } from "react-icons/fa";

// function RadioPlayer({ current }) {
//   const { t } = useTranslation("common");
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [volume, setVolume] = useState(0.5);
//   const soundRef = useRef(null);

//   useEffect(() => {
//     if (current) {
//       setIsLoading(true);
//       if (soundRef.current) {
//         soundRef.current.stop();
//         soundRef.current.unload();
//       }

//       soundRef.current = new Howl({
//         src: [current.url_resolved],
//         format: [current.codec.toLowerCase() === "mp3" ? "mp3" : "aac"],
//         html5: true,
//         autoplay: true,
//         volume,
//         onplay: () => {
//           setIsPlaying(true);
//           setIsLoading(false);
//         },
//         onstop: () => {
//           setIsPlaying(false);
//           setIsLoading(false);
//         },
//         onend: () => {
//           setIsPlaying(false);
//           setIsLoading(false);
//         },
//         onloaderror: () => {
//           alert(t("error", { message: "No se pudo cargar la emisora" }));
//           setIsLoading(false);
//         },
//         onplayerror: () => {
//           alert(t("error", { message: "Error al reproducir la emisora" }));
//           setIsLoading(false);
//         },
//       });

//       return () => {
//         if (soundRef.current) {
//           soundRef.current.stop();
//           soundRef.current.unload();
//         }
//       };
//     }
//   }, [current, t]);

//   const handleVolumeChange = (e) => {
//     const newVolume = parseFloat(e.target.value);
//     setVolume(newVolume);
//     if (soundRef.current) {
//       soundRef.current.volume(newVolume);
//     }
//   };

//   return (
//     <div className="fixed bottom-0 left-0 right-0 bg-[#334155] p-4 shadow-lg z-50">
//       {current ? (
//         <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
//           <div>
//             <h3 className="text-lg text-[#F97316] font-medium">
//               {isLoading ? (
//                 <FaSpinner className="animate-spin inline mr-2" />
//               ) : (
//                 "🔊 "
//               )}
//               {t("playing", { name: current.name })}
//             </h3>
//             <p className="text-sm text-[#F1F5F9]">
//               {current.tags || "Sin género"} · {current.country || "Desconocido"}
//             </p>
//           </div>
//           <div className="flex items-center gap-2">
//             <button
//               onClick={() => {
//                 if (soundRef.current) {
//                   if (isPlaying) {
//                     soundRef.current.pause();
//                     setIsPlaying(false);
//                   } else {
//                     soundRef.current.play();
//                     setIsPlaying(true);
//                   }
//                 }
//               }}
//               className="bg-[#F97316] text-white p-2 rounded hover:bg-opacity-80 transition"
//             >
//               {isPlaying ? <FaPause /> : <FaPlay />}
//             </button>
//             <button
//               onClick={() => {
//                 if (soundRef.current) {
//                   soundRef.current.stop();
//                   setIsPlaying(false);
//                 }
//               }}
//               className="bg-[#F97316] text-white p-2 rounded hover:bg-opacity-80 transition"
//             >
//               <FaStop />
//             </button>
//             <div className="flex items-center gap-2">
//               <FaVolumeUp className="text-[#F97316]" />
//               <input
//                 type="range"
//                 min="0"
//                 max="1"
//                 step="0.01"
//                 value={volume}
//                 onChange={handleVolumeChange}
//                 className="w-24 accent-[#F97316]"
//               />
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="text-center text-[#F1F5F9]">{t("noStations")}</div>
//       )}
//     </div>
//   );
// }

// export default RadioPlayer;



import { useState, useEffect, useRef } from "react";
import { Howl } from "howler";
import { FaSpinner, FaPlay, FaPause, FaStop, FaVolumeUp } from "react-icons/fa";

function RadioPlayer({ current }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const soundRef = useRef(null);

  useEffect(() => {
    if (current) {
      setIsLoading(true);
      if (soundRef.current) {
        soundRef.current.stop();
        soundRef.current.unload();
      }

      soundRef.current = new Howl({
        src: [current.url_resolved],
        format: [current.codec.toLowerCase() === "mp3" ? "mp3" : "aac"],
        html5: true,
        autoplay: true,
        volume,
        onplay: () => {
          setIsPlaying(true);
          setIsLoading(false);
        },
        onstop: () => {
          setIsPlaying(false);
          setIsLoading(false);
        },
        onend: () => {
          setIsPlaying(false);
          setIsLoading(false);
        },
        onloaderror: () => {
          alert("No se pudo cargar la emisora");
          setIsLoading(false);
        },
        onplayerror: () => {
          alert("Error al reproducir la emisora");
          setIsLoading(false);
        },
      });

      return () => {
        if (soundRef.current) {
          soundRef.current.stop();
          soundRef.current.unload();
        }
      };
    }
  }, [current]);

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (soundRef.current) {
      soundRef.current.volume(newVolume);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#334155] p-4 shadow-lg z-50">
      {current ? (
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg text-[#F97316] font-medium">
              {isLoading ? (
                <FaSpinner className="animate-spin inline mr-2" />
              ) : (
                "🔊 "
              )}
              Reproduciendo: {current.name}
            </h3>
            <p className="text-sm text-[#F1F5F9]">
              {current.tags || "Sin género"} · {current.country || "Desconocido"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (soundRef.current) {
                  if (isPlaying) {
                    soundRef.current.pause();
                    setIsPlaying(false);
                  } else {
                    soundRef.current.play();
                    setIsPlaying(true);
                  }
                }
              }}
              className="bg-[#F97316] text-white p-2 rounded hover:bg-opacity-80 transition"
            >
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button
              onClick={() => {
                if (soundRef.current) {
                  soundRef.current.stop();
                  setIsPlaying(false);
                }
              }}
              className="bg-[#F97316] text-white p-2 rounded hover:bg-opacity-80 transition"
            >
              <FaStop />
            </button>
            <div className="flex items-center gap-2">
              <FaVolumeUp className="text-[#F97316]" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-24 accent-[#F97316]"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-[#F1F5F9]">No se seleccionó ninguna emisora</div>
      )}
    </div>
  );
}

export default RadioPlayer;