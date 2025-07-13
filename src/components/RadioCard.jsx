// function RadioCard({ radio, onPlay }) {
//   return (
//     <div className="bg-tutogris p-4 rounded-2xl shadow-md w-full sm:w-80 hover:bg-opacity-80 transition">
//       <img src={radio.logo} alt={radio.nombre} className="w-full h-24 object-contain mb-2" />
//       <h2 className="text-xl font-semibold text-claro">{radio.nombre}</h2>
//       <p className="text-sm text-gray-300">{radio.genero} · {radio.pais}</p>
//       <button
//         onClick={() => onPlay(radio)}
//         className="mt-4 bg-tutonaranja text-white py-1 px-4 rounded hover:bg-opacity-80"
//       >
//         Escuchar
//       </button>
//     </div>
//   );
// }

// export default RadioCard;















// // components/RadioCard.jsx
// function RadioCard({ radio, onPlay }) {
//   return (
//     <div className="bg-[#334155] p-4 rounded-2xl shadow-md w-full sm:w-80 hover:bg-opacity-80 transition">
//       <img src={radio.logo} alt={radio.nombre} className="w-full h-24 object-contain mb-2" />
//       <h2 className="text-xl font-semibold text-[#F1F5F9]">{radio.nombre}</h2>
//       <p className="text-sm text-gray-300">{radio.genero} · {radio.pais}</p>
//       <button
//         onClick={() => onPlay(radio)}
//         className="mt-4 bg-[#F97316] text-white py-1 px-4 rounded hover:bg-opacity-80"
//       >
//         Escuchar
//       </button>
//     </div>
//   );
// }

// export default RadioCard;





// // srcc\components\RadioCard.jsx
// function RadioCard({ radio, onPlay }) {
//   return (
//     <div
//       className="bg-[#334155] p-4 rounded-2xl shadow-md w-full sm:w-80 transform hover:scale-105 transition-transform duration-200"
//     >
//       <img
//         src={radio.favicon || "/iconEmisora.PNG" || "https://via.placeholder.com/150"}
//         alt={radio.name}
//         className="w-full h-24 object-contain mb-2 rounded"
//       />
//       <h2 className="text-xl font-semibold text-[#F1F5F9] truncate">{radio.name}</h2>
//       <p className="text-sm text-gray-300">{radio.country || "Desconocido"}</p>
//       <p className="text-sm text-gray-300">{radio.tags || "Sin género"}</p>
//       <button
//         onClick={() => onPlay(radio)}
//         className="mt-4 bg-[#F97316] text-white py-1 px-4 rounded hover:bg-opacity-80 transition hover:cursor-pointer"
//       >
//         Escuchar
//       </button>
//     </div>
//   );
// }

// export default RadioCard;


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
      className="bg-gradient-to-br from-[#1e1e1e]/90 via-[#334155]/90 to-[#1e1e1e]/80 p-4 rounded-2xl shadow-lg shadow-[#F97316]/20 border-2 border-[#F97316]/40 backdrop-blur-sm w-64"
    >
      <img
        src={isValidUrl(radio.favicon) ? radio.favicon : "/iconEmisora.PNG"}
        alt={radio.name}
        className="w-full h-32 object-contain rounded mb-2"
      />
      <h3 className="text-[#F1F5F9] font-semibold truncate">{radio.name}</h3>
      <p className="text-gray-300 text-sm truncate">{radio.country}</p>
      <button
        onClick={() => onPlay(radio)}
        className="mt-2 bg-[#F97316] text-white py-1 px-3 rounded hover:bg-opacity-80 flex items-center gap-2 hover:cursor-pointer"
      >
        <FaPlay /> Reproducir
      </button>
    </motion.div>
  );
}