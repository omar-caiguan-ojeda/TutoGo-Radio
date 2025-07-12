// import React from 'react';

// const topStations = [
//   {
//     stationuuid: "acogida-chile",
//     name: "Acogida - Entre Lagos",
//     country: "Chile",
//     favicon: "/radioAcogida.png",
//     url_resolved: "https://streaming.chiloestreaming.com/8018/stream",
//     codec: "mp3",
//   },
//   {
//     stationuuid: "lared-argentina",
//     name: "La Red 910 - Buenos Aires",
//     country: "Argentina",
//     favicon: "/radioLaRed910.jpg",
//     url_resolved: "https://26573.live.streamtheworld.com/LA_RED_AM910AAC_SC",
//     codec: "aac",
//   },
//   {
//     stationuuid: "correio-joaopessoa",
//     name: "Correio - João Pessoa",
//     country: "Brasil",
//     favicon: "/radioCorreioJP.png",
//     url_resolved: "https://shout25.crossradio.com.br:18066/live",
//     codec: "mp3",
//   },
//   {
//     stationuuid: "cbn-joaopessoa",
//     name: "CBN - João Pessoa",
//     country: "Brasil",
//     favicon: "/radioCbnJP.jpg",
//     url_resolved: "https://servidor25.brlogic.com:7018/live",
//     codec: "mp3",
//   },
//   {
//     stationuuid: "sucesso-joaopessoa",
//     name: "Sucesso - João Pessoa",
//     country: "Brasil",
//     favicon: "/radioSucessoJP.png",
//     url_resolved: "https://streaming.engelhosting.com.br:10032/stream",
//     codec: "mp3",
//   },
//   {
//     stationuuid: "arepuan-joaopessoa",
//     name: "Arepuan João Pessoa",
//     country: "Brasil",
//     favicon: "/radioArepuanJP.png",
//     url_resolved: "https://streaming.engelhosting.com.br:10026/stream",
//     codec: "mp3",
//   },
//   {
//     stationuuid: "clube-brasilia",
//     name: "Clube FM - Brasilia",
//     country: "Brasil",
//     favicon: "/radioClubeBR.png",
//     url_resolved: "https://8157.brasilstream.com.br/stream",
//     codec: "mp3",
//   },
//   {
//     stationuuid: "cabobranco-joaopessoa",
//     name: "Cabo Branco - João Pessoa",
//     country: "Brasil",
//     favicon: "/radioCaboBranco.png",
//     url_resolved: "https://servidor20.brlogic.com:7086/live",
//     codec: "mp3",
//   },
// ];

// export default function TopStations({ onPlay }) {
//   return (
//     <div className="mb-6">
//       <h3 className="text-lg text-[#F97316] font-medium">Emisoras principales</h3>
//       <ul className="text-[#F1F5F9]">
//         {topStations.map((station) => (
//           <li
//             key={station.stationuuid}
//             className="py-2 flex items-center gap-2 hover:text-[#F97316] cursor-pointer"
//             onClick={() => onPlay(station)}
//           >
//             <img
//               src={station.favicon}
//               alt={station.name}
//               className="w-8 h-8 object-contain rounded"
//             />
//             <div>
//               <p className="font-semibold">{station.name}</p>
//               <p className="text-sm text-gray-300">{station.country}</p>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

import React from 'react';
import { motion } from 'framer-motion';

const topStations = [
  {
    stationuuid: "acogida-chile",
    name: "Acogida - Entre Lagos",
    country: "Chile",
    favicon: "/radioAcogida.png",
    url_resolved: "https://streaming.chiloestreaming.com/8018/stream",
    codec: "mp3",
  },
  {
    stationuuid: "lared-argentina",
    name: "La Red 910 - Buenos Aires",
    country: "Argentina",
    favicon: "/radioLaRed910.jpg",
    url_resolved: "https://26573.live.streamtheworld.com/LA_RED_AM910AAC_SC",
    codec: "aac",
  },
  {
    stationuuid: "correio-joaopessoa",
    name: "Correio - João Pessoa",
    country: "Brasil",
    favicon: "/radioCorreioJP.png",
    url_resolved: "https://shout25.crossradio.com.br:18066/live",
    codec: "mp3",
  },
  {
    stationuuid: "cbn-joaopessoa",
    name: "CBN - João Pessoa",
    country: "Brasil",
    favicon: "/radioCbnJP.jpg",
    url_resolved: "https://servidor25.brlogic.com:7018/live",
    codec: "mp3",
  },
  {
    stationuuid: "sucesso-joaopessoa",
    name: "Sucesso - João Pessoa",
    country: "Brasil",
    favicon: "/radioSucessoJP.png",
    url_resolved: "https://streaming.engelhosting.com.br:10032/stream",
    codec: "mp3",
  },
  {
    stationuuid: "arepuan-joaopessoa",
    name: "Arepuan João Pessoa",
    country: "Brasil",
    favicon: "/radioArepuanJP.png",
    url_resolved: "https://streaming.engelhosting.com.br:10026/stream",
    codec: "mp3",
  },
  {
    stationuuid: "clube-brasilia",
    name: "Clube FM - Brasilia",
    country: "Brasil",
    favicon: "/radioClubeBR.png",
    url_resolved: "https://8157.brasilstream.com.br/stream",
    codec: "mp3",
  },
  {
    stationuuid: "cabobranco-joaopessoa",
    name: "Cabo Branco - João Pessoa",
    country: "Brasil",
    favicon: "/radioCaboBranco.png",
    url_resolved: "https://servidor20.brlogic.com:7086/live",
    codec: "mp3",
  },
];

export default function TopStations({ onPlay }) {
  return (
    <div className="mb-6">
      <h3 className="text-lg text-[#F97316] font-medium">Emisoras principales</h3>
      <ul className="text-[#F1F5F9]">
        {topStations.map((station) => (
          <motion.li
            key={station.stationuuid}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 4px 8px rgba(249, 115, 22, 0.3)",
              transition: { duration: 0.2 },
            }}
            className="py-2 flex items-center gap-2 hover:text-[#F97316] cursor-pointer rounded"
            onClick={() => onPlay(station)}
          >
            <img
              src={station.favicon}
              alt={station.name}
              className="w-8 h-8 object-contain rounded"
            />
            <div>
              <p className="font-semibold">{station.name}</p>
              <p className="text-sm text-gray-300">{station.country}</p>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}