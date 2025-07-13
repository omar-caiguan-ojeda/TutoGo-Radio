// src/components/Sidebar.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { FaCloud, FaSun, FaCloudRain } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import TopStations from "./TopStations";
import RadioFilters from "./RadioFilters";

export default function Sidebar({ onPlay, onFilterChange }) {
  const [weather, setWeather] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Obtener ubicación del usuario
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const apiKey = process.env.OPENWEATHER_API_KEY || "f09c0d582d57f99582dc7ec273da3c6e";
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

    // Cargar historial desde localStorage
    const savedHistory = JSON.parse(localStorage.getItem("radioHistory")) || [];
    setHistory(savedHistory);
  }, []);

  useEffect(() => {
    if (onPlay) {
      const addToHistory = (station) => {
        const newHistory = [
          { ...station, addedAt: Date.now() },
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
    <div
      className="w-full max-w-xs sm:w-80 bg-gradient-to-br from-[#1e1e1e]/90 via-[#334155]/90 to-[#1e1e1e]/80 p-4 sm:p-6 rounded-2xl shadow-lg shadow-[#F97316]/20 border-2 border-[#F97316]/40 backdrop-blur-sm sm:sticky top-4 max-h-screen overflow-y-auto focus:outline-none focus:ring-2 focus:ring-[#F97316]"
      style={{
        scrollbarWidth: 'thin',
        scrollbarColor: '#F97316 #1E1E1E',
      }}
    >
      <style jsx>{`
        div::-webkit-scrollbar {
          width: 8px;
        }
        div::-webkit-scrollbar-track {
          background: #1E1E1E;
          border-radius: 4px;
        }
        div::-webkit-scrollbar-thumb {
          background: #F97316;
          border-radius: 4px;
        }
        div::-webkit-scrollbar-thumb:hover {
          background: #e86514;
        }
      `}</style>
      <RadioFilters onFilterChange={onFilterChange} className="hover:cursor-pointer" />
      {weather && (
        <div className="mb-6">
          <h3 className="text-lg text-[#F97316] font-medium">
            Clima en {weather.name}
          </h3>
          <div className="bg-[#F97316] text-white py-1 px-2 rounded hover:bg-opacity-80 flex items-center gap-2 cursor-pointer">
            {getWeatherIcon(weather.weather[0].main.toLowerCase())}
            <p className="text-[#F1F5F9] cursor-pointer">{weather.main.temp}°C - {weather.weather[0].description}</p>
          </div>
        </div>
      )}
      <TopStations onPlay={onPlay} className="cursor-pointer" />
      <div>
        <h3 className="text-lg text-[#F97316] font-medium">Historial</h3>
        <ul className="text-[#F1F5F9]">
          <AnimatePresence>
            {history.map((station) => (
              <motion.li
                key={station.stationuuid}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="py-1 hover:text-[#F97316] cursor-pointer"
                onClick={() => onPlay(station)}
              >
                {station.name}
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
}