// import { motion } from "framer-motion";

// const pawConfig = [
//   { top: 0, rotate: -12, delay: 0.36 },
//   { top: 8, rotate: 8, delay: 0.51 },
//   { top: -6, rotate: 10, delay: 0.66 },
//   { top: 10, rotate: -8, delay: 0.81 },
//   { top: -4, rotate: 6, delay: 0.96 },
// ];

// export default function PawAnimation() {
//   return (
//     <span className="relative ml-2 sm:ml-4 md:ml-6" style={{ minWidth: '10em sm:12em md:18em', height: '2em sm:2.5em md:2.8em' }}>
//       <style>{`
//         @keyframes pawStep {
//           0% { opacity: 0; transform: translateY(20px) scale(0.7); }
//           60% { opacity: 1; transform: translateY(-4px) scale(1.08); }
//           80% { opacity: 1; transform: translateY(0px) scale(0.95); }
//           100% { opacity: 1; transform: translateY(0px) scale(1); }
//         }
//       `}</style>
//       {pawConfig.map((cfg, idx) => (
//         <motion.img
//           key={idx}
//           src="/catPaw.png"
//           alt="Huella de gato"
//           className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 object-contain absolute"
//           style={{
//             left: `${idx * 2.5}em sm:${idx * 3}em md:${idx * 3.5}em`,
//             top: `${cfg.top}px`,
//             transform: `rotate(${cfg.rotate}deg)`,
//           }}
//           animate={{ opacity: 1, y: 0, scale: 1 }}
//           initial={{ opacity: 0, y: 20, scale: 0.7 }}
//           transition={{ duration: 0.6, delay: cfg.delay, ease: [0.4, 2, 0.5, 1] }}
//           onError={() => console.error("Error cargando /catPaw.png")}
//         />
//       ))}
//     </span>
//   );
// }



import { motion } from "framer-motion";

const pawConfig = [
  { top: 0, rotate: -12, delay: 0.36 },
  { top: 8, rotate: 8, delay: 0.51 },
  { top: -6, rotate: 10, delay: 0.66 },
  { top: 10, rotate: -8, delay: 0.81 },
  { top: -4, rotate: 6, delay: 0.96 },
];

export default function PawAnimation() {
  return (
    <span
      className="hidden md:inline-flex relative ml-6 min-w-[12em] lg:min-w-[16em] h-[2.5em]"
    >
      <style>{`
        @keyframes pawStep {
          0% { opacity: 0; transform: translateY(20px) scale(0.7); }
          60% { opacity: 1; transform: translateY(-4px) scale(1.08); }
          80% { opacity: 1; transform: translateY(0px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0px) scale(1); }
        }
      `}</style>
      {pawConfig.map((cfg, idx) => (
        <motion.img
          key={idx}
          src="/catPaw.png"
          alt="Huella de gato"
          className="absolute object-contain w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8"
          style={{
            left: `${idx * 3}em`,
            top: `${cfg.top}px`,
            transform: `rotate(${cfg.rotate}deg)`,
          }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          initial={{ opacity: 0, y: 20, scale: 0.7 }}
          transition={{ duration: 0.6, delay: cfg.delay, ease: [0.4, 2, 0.5, 1] }}
          onError={() => console.error("Error cargando /catPaw.png")}
        />
      ))}
    </span>
  );
}