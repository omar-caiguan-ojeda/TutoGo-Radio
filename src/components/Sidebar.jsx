// // src/components/Sidebar.jsx
// import { useState, useEffect } from "react";
// import { useTranslation } from "next-i18next";
// import axios from "axios";
// import { FaCloud, FaSun, FaCloudRain } from "react-icons/fa";

// export default function Sidebar({ onPlay }) {
//   const { t } = useTranslation("common");
//   const [weather, setWeather] = useState(null);
//   const [topStations, setTopStations] = useState([]);
//   const [history, setHistory] = useState([]);

//   useEffect(() => {
//     // Obtener ubicación del usuario
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(async (position) => {
//         const { latitude, longitude } = position.coords;
//         const apiKey = "f09c0d582d57f99582dc7ec273da3c6e" //"TU_API_KEY"; // Reemplaza con tu API key de OpenWeatherMap
//         try {
//           const response = await axios.get(
//             `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
//           );
//           setWeather(response.data);
//         } catch (error) {
//           console.error("Error fetching weather:", error);
//         }
//       });
//     }

//     // Obtener top 5 estaciones
//     axios.get("https://de1.api.radio-browser.info/json/stations/topvote/5")
//       .then((response) => setTopStations(response.data))
//       .catch((error) => console.error("Error fetching top stations:", error));

//     // Cargar historial desde localStorage
//     const savedHistory = JSON.parse(localStorage.getItem("radioHistory")) || [];
//     setHistory(savedHistory);
//   }, []);

//   useEffect(() => {
//     if (onPlay) {
//       const addToHistory = (station) => {
//         const newHistory = [
//           station,
//           ...history.filter((s) => s.stationuuid !== station.stationuuid),
//         ].slice(0, 5);
//         setHistory(newHistory);
//         localStorage.setItem("radioHistory", JSON.stringify(newHistory));
//       };
//       onPlay.addToHistory = addToHistory;
//     }
//   }, [history, onPlay]);

//   const getWeatherIcon = (weatherCode) => {
//     if (weatherCode.includes("cloud")) return <FaCloud />;
//     if (weatherCode.includes("clear")) return <FaSun />;
//     if (weatherCode.includes("rain")) return <FaCloudRain />;
//     return <FaCloud />;
//   };

//   return (
//     <div className="w-full sm:w-80 bg-[#334155] p-4 rounded-lg sm:sticky top-4">
//       {weather && (
//         <div className="mb-6">
//           <h3 className="text-lg text-[#F97316] font-medium">
//             {t("weather", { city: weather.name })}
//           </h3>
//           <div className="flex items-center gap-2">
//             {getWeatherIcon(weather.weather[0].main.toLowerCase())}
//             <p className="text-[#F1F5F9]">{weather.main.temp}°C - {weather.weather[0].description}</p>
//           </div>
//         </div>
//       )}
//       <div className="mb-6">
//         <h3 className="text-lg text-[#F97316] font-medium">{t("topGlobal")}</h3>
//         <ul className="text-[#F1F5F9]">
//           {topStations.map((station) => (
//             <li
//               key={station.stationuuid}
//               className="py-1 hover:text-[#F97316] cursor-pointer"
//               onClick={() => onPlay(station)}
//             >
//               {station.name}
//             </li>
//           ))}
//         </ul>
//       </div>
//       <div>
//         <h3 className="text-lg text-[#F97316] font-medium">{t("history")}</h3>
//         <ul className="text-[#F1F5F9]">
//           {history.map((station) => (
//             <li
//               key={station.stationuuid}
//               className="py-1 hover:text-[#F97316] cursor-pointer"
//               onClick={() => onPlay(station)}
//             >
//               {station.name}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import axios from "axios";
import { FaCloud, FaSun, FaCloudRain } from "react-icons/fa";

export default function Sidebar({ onPlay }) {
  const [weather, setWeather] = useState(null);
  const [topStations, setTopStations] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Obtener ubicación del usuario
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const apiKey = "f09c0d582d57f99582dc7ec273da3c6e"; // Reemplaza con tu API key de OpenWeatherMap
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
          );
          setWeather(response.data);
        } catch (error) {
          console.error("Error al obtener el clima:", error);
        }
      });
    }

    // Obtener top 5 estaciones
    axios.get("https://de1.api.radio-browser.info/json/stations/topvote/5")
      .then((response) => setTopStations(response.data))
      .catch((error) => console.error("Error al obtener emisoras principales:", error));

    // Cargar historial desde localStorage
    const savedHistory = JSON.parse(localStorage.getItem("radioHistory")) || [];
    setHistory(savedHistory);
  }, []);

  useEffect(() => {
    if (onPlay) {
      const addToHistory = (station) => {
        const newHistory = [
          station,
          ...history.filter((s) => s.stationuuid !== station.stationuuid),
        ].slice(0, 5);
        setHistory(newHistory);
        localStorage.setItem("radioHistory", JSON.stringify(newHistory));
      };
      onPlay.addToHistory = addToHistory;
    }
  }, [history, onPlay]);

  const getWeatherIcon = (weatherCode) => {
    if (weatherCode.includes("cloud")) return <FaCloud />;
    if (weatherCode.includes("clear")) return <FaSun />;
    if (weatherCode.includes("rain")) return <FaCloudRain />;
    return <FaCloud />;
  };

  return (
    <div className="w-full sm:w-80 bg-[#334155] p-4 rounded-lg sm:sticky top-4">
      {weather && (
        <div className="mb-6">
          <h3 className="text-lg text-[#F97316] font-medium">
            Clima en {weather.name}
          </h3>
          <div className="flex items-center gap-2">
            {getWeatherIcon(weather.weather[0].main.toLowerCase())}
            <p className="text-[#F1F5F9]">{weather.main.temp}°C - {weather.weather[0].description}</p>
          </div>
        </div>
      )}
      <div className="mb-6">
        <h3 className="text-lg text-[#F97316] font-medium">Emisoras principales</h3>
        <ul className="text-[#F1F5F9]">
          {topStations.map((station) => (
            <li
              key={station.stationuuid}
              className="py-1 hover:text-[#F97316] cursor-pointer"
              onClick={() => onPlay(station)}
            >
              {station.name}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-lg text-[#F97316] font-medium">Historial</h3>
        <ul className="text-[#F1F5F9]">
          {history.map((station) => (
            <li
              key={station.stationuuid}
              className="py-1 hover:text-[#F97316] cursor-pointer"
              onClick={() => onPlay(station)}
            >
              {station.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}