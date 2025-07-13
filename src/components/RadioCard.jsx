// srcc\components\RadioCard.jsx
import { motion } from "framer-motion";
import { FaPlay } from "react-icons/fa";

export default function RadioCard({ radio, onPlay }) {
  // Validar si favicon es una URL válida
  const isValidUrl = (url) => {
    if (!url || url === "null" || url === "") return false;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-br from-[#1e1e1e]/90 via-[#334155]/90 to-[#1e1e1e]/80 p-4 rounded-2xl shadow-lg shadow-[#F97316]/20 border-2 border-[#F97316]/40 backdrop-blur-sm w-full max-w-xs sm:max-w-sm flex flex-col items-center"
    >
      <img
        src={isValidUrl(radio.favicon) ? radio.favicon : "/iconEmisora.PNG"}
        alt={radio.name || 'Logo de la emisora'}
        className="w-full h-28 sm:h-32 object-contain rounded mb-2 transition-all duration-200"
        loading="lazy"
      />
      <h3 className="text-[#F1F5F9] font-semibold truncate">{radio.name}</h3>
      <p className="text-gray-300 text-sm truncate">{radio.country}</p>
      <button
        onClick={() => onPlay(radio)}
        className="mt-2 bg-[#F97316] text-white py-1 px-3 rounded hover:bg-opacity-80 flex items-center gap-2 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F97316]"
        aria-label={`Reproducir ${radio.name}`}
      >
        <FaPlay /> <span className="text-sm sm:text-base">Reproducir</span>
      </button>
    </motion.div>
  );
}