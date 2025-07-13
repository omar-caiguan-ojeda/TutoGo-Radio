// // src/components/Footer.jsx
// import { motion } from "framer-motion";
// import { FaLinkedin, FaEnvelope, FaWhatsapp, FaGlobe, FaFileAlt } from "react-icons/fa";

// export default function Footer() {
//   return (
//     <motion.footer
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="bg-[#1E1E1E]/80 backdrop-blur-sm text-[#F1F5F9] py-10 px-6 md:px-16 mt-20 border-t-4 border-[#F97316]"
//     >
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
//         {/* Marca y lema */}
//         <div className="flex flex-col items-start">
//           <div className="flex items-center space-x-1">
//             <img
//               src="/Geminis.svg"
//               alt="Geminis Icon"
//               className="w-8 h-8 object-contain filter brightness-1 invert opacity-50"
//             />
//             <h1 className="text-2xl font-bold tracking-tight text-[#F97316]">
//               GEM <span className="font-light">IT</span>
//             </h1>
//           </div>
//           <p className="mt-2 text-sm italic">
//             Innovación y tecnología, el equilibrio perfecto.
//           </p>
//         </div>

//         {/* Contacto profesional */}
//         <div className="flex flex-col items-center">
//           <h2 className="text-lg font-semibold mb-2 text-[#F1F5F9]">¿Quieres trabajar conmigo?</h2>
//           <p className="text-sm text-center mb-3">Conecta a través de mis redes:</p>
//           <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
//             <a
//               href="https://www.linkedin.com/in/omar-leonardo-caiguan-ojeda/"
//               target="_blank"
//               rel="noopener noreferrer"
//               title="LinkedIn"
//               className="hover:scale-110 transition-transform text-[#F97316]"
//             >
//               <FaLinkedin className="text-xl" />
//             </a>
//             <a
//               href="https://omar-caiguan.vercel.app/"
//               target="_blank"
//               rel="noopener noreferrer"
//               title="Portafolio"
//               className="hover:scale-110 transition-transform text-[#F97316]"
//             >
//               <FaGlobe className="text-xl" />
//             </a>
//             <a
//               href="mailto:omar.caiguan@gmail.com"
//               title="Email"
//               className="hover:scale-110 transition-transform text-[#F97316]"
//             >
//               <FaEnvelope className="text-xl" />
//             </a>
//             <a
//               href="https://wa.me/+56930579869"
//               target="_blank"
//               rel="noopener noreferrer"
//               title="WhatsApp"
//               className="hover:scale-110 transition-transform text-[#F97316]"
//             >
//               <FaWhatsapp className="text-xl" />
//             </a>
//             <a
//               href="https://drive.google.com/file/d/1JU3sMX3lCxJvKdDRsAvTvntZaYxaS0ET/view?usp=drive_link"
//               target="_blank"
//               rel="noopener noreferrer"
//               title="Curriculum Vitae"
//               className="hover:scale-110 transition-transform text-[#F97316]"
//             >
//               <FaFileAlt className="text-xl" />
//             </a>
//           </div>
//         </div>

//         {/* Derechos reservados */}
//         <div className="flex flex-col items-end justify-center text-sm">
//           <p className="text-xs opacity-70 text-right">
//             © {new Date().getFullYear()} TutoGo Radio. Desarrollado por Omar Leonardo Caiguan Ojeda. Todos los derechos reservados.
//           </p>
//         </div>
//       </div>
//     </motion.footer>
//   );
// }

import { motion } from "framer-motion";
import { FaLinkedin, FaEnvelope, FaWhatsapp, FaGlobe, FaFileAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#1E1E1E]/80 backdrop-blur-sm text-[#F1F5F9] py-8 px-4 sm:px-6 md:px-16 mt-12 sm:mt-16 md:mt-20 border-t-4 border-[#F97316]"
      role="contentinfo"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
        <div className="flex flex-col items-start">
          <div className="flex items-center space-x-1">
            <img
              src="/Geminis.svg"
              alt="Geminis Icon"
              className="w-6 h-6 sm:w-8 sm:h-8 object-contain filter brightness-1 invert opacity-50"
              loading="lazy"
            />
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#F97316]">
              GEM <span className="font-light">IT</span>
            </h1>
          </div>
          <p className="mt-2 text-xs sm:text-sm italic">
            Innovación y tecnología, el equilibrio perfecto.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-base sm:text-lg font-semibold mb-2 text-[#F1F5F9]">¿Quieres trabajar conmigo?</h2>
          <p className="text-xs sm:text-sm text-center mb-3">Conecta a través de mis redes:</p>
          <div className="flex flex-row space-x-3 sm:space-x-4">
            {[
              { href: "https://www.linkedin.com/in/omar-leonardo-caiguan-ojeda/", icon: <FaLinkedin className="text-lg sm:text-xl" />, title: "LinkedIn" },
              { href: "https://omar-caiguan.vercel.app/", icon: <FaGlobe className="text-lg sm:text-xl" />, title: "Portafolio" },
              { href: "mailto:omar.caiguan@gmail.com", icon: <FaEnvelope className="text-lg sm:text-xl" />, title: "Email" },
              { href: "https://wa.me/+56930579869", icon: <FaWhatsapp className="text-lg sm:text-xl" />, title: "WhatsApp" },
              { href: "https://drive.google.com/file/d/1JU3sMX3lCxJvKdDRsAvTvntZaYxaS0ET/view?usp=drive_link", icon: <FaFileAlt className="text-lg sm:text-xl" />, title: "Curriculum" },
            ].map((cfg, idx) => (
              <a
                key={idx}
                href={cfg.href}
                target="_blank"
                rel="noopener noreferrer"
                title={cfg.title}
                className="hover:scale-110 transition-transform text-[#F97316]"
                aria-label={cfg.title}
              >
                {cfg.icon}
              </a>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-end justify-center text-xs sm:text-sm">
          <p className="text-xs sm:text-sm opacity-70 text-right">
            © {new Date().getFullYear()} TutoGo Radio. Desarrollado por Omar Leonardo Caiguan Ojeda. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}