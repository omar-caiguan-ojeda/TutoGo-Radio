import { motion } from "framer-motion";
import { FaPlay } from "react-icons/fa";

export default function RadioCard({ radio, onPlay }) {
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
      whileHover={{ 
        y: -10, 
        scale: 1.05,
        rotateX: 5,
        rotateY: 5,
        transition: { type: "spring", stiffness: 300 } 
      }}
      transition={{ duration: 0.3 }}
      className="glass-card relative flex flex-col items-center p-4 rounded-xl group cursor-pointer"
      role="article"
      onClick={() => onPlay(radio)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-tutonaranja/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
      
      <div className="relative w-full aspect-square mb-4 rounded-lg overflow-hidden bg-slate-900 shadow-inner flex items-center justify-center">
        <img
          src={isValidUrl(radio.favicon) ? radio.favicon : "/iconEmisora.PNG"}
          alt={radio.name || "Logo de la emisora"}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
          onError={(e) => e.target.src = "/iconEmisora.PNG"}
        />
        
        {/* Play Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300 backdrop-blur-[2px]">
          <div className="bg-tutonaranja text-white p-3 rounded-full shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-75">
            <FaPlay className="ml-1 text-lg" />
          </div>
        </div>
      </div>

      <div className="text-center w-full z-10">
        <h3 className="text-white font-bold truncate text-lg group-hover:text-tutonaranja transition-colors">
          {radio.name}
        </h3>
        <p className="text-slate-400 text-sm truncate uppercase tracking-wider text-xs mt-1">
          {radio.country}
        </p>
      </div>
    </motion.div>
  );
}