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

// components/RadioCard.jsx
function RadioCard({ radio, onPlay }) {
  return (
    <div className="bg-[#334155] p-4 rounded-2xl shadow-md w-full sm:w-80 hover:bg-opacity-80 transition">
      <img src={radio.logo} alt={radio.nombre} className="w-full h-24 object-contain mb-2" />
      <h2 className="text-xl font-semibold text-[#F1F5F9]">{radio.nombre}</h2>
      <p className="text-sm text-gray-300">{radio.genero} · {radio.pais}</p>
      <button
        onClick={() => onPlay(radio)}
        className="mt-4 bg-[#F97316] text-white py-1 px-4 rounded hover:bg-opacity-80"
      >
        Escuchar
      </button>
    </div>
  );
}

export default RadioCard;