// function RadioPlayer({ current }) {
//   if (!current) return null;

//   return (
//     <div className="mt-6 w-full max-w-lg text-center">
//       <h3 className="text-lg text-tutonaranja font-medium mb-1">
//         🔊 Reproduciendo: {current.nombre}
//       </h3>
//       <audio controls autoPlay className="w-full">
//         <source src={current.url} type="audio/aac" />
//         Tu navegador no soporta el elemento de audio.
//       </audio>
//     </div>
//   );
// }

// export default RadioPlayer;

// components/RadioPlayer.jsx
function RadioPlayer({ current }) {
  if (!current) return null;

  return (
    <div className="mt-6 w-full max-w-lg text-center">
      <h3 className="text-lg text-[#F97316] font-medium mb-1">
        🔊 Reproduciendo: {current.nombre}
      </h3>
      <audio controls autoPlay className="w-full">
        <source src={current.url} type="audio/aac" />
        Tu navegador no soporta el elemento de audio.
      </audio>
    </div>
  );
}

export default RadioPlayer;