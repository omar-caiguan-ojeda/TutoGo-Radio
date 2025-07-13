import { useState, useEffect } from "react";
import axios from "axios";
import { FaCloud, FaSun, FaCloudRain } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import TopStations from "./TopStations";
import RadioFilters from "./RadioFilters";
import useRadioHistory from "@/hooks/useRadioHistory";
import { OPENWEATHER_API_KEY } from "@/config";

export default function Sidebar({ onPlay, onFilterChange }) {
  const [weather, setWeather] = useState(null);
  const [weatherError, setWeatherError] = useState(null);
  const { history, addToHistory } = useRadioHistory();

  useEffect(() => {
    const fetchWeather = async (lat, lon, cityName) => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`
        );
        setWeather({ ...response.data, name: cityName || response.data.name });
        setWeatherError(null);
      } catch (error) {
        console.error("Error al obtener el clima:", error);
        setWeatherError("No se pudo obtener el clima");
      }
    };

    const getWeather = async () => {
  if (typeof window !== "undefined" && navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeather(latitude, longitude);
      },
      async (error) => {
        setWeatherError("No pudimos acceder a tu ubicación precisa. El clima mostrado es aproximado. Si quieres mejorar la precisión, revisa los permisos de ubicación en tu navegador.");
        console.warn("No se pudo obtener la ubicación precisa, usando IP como respaldo:", error);
        // Fallback: obtener ubicación por IP
        try {
          const res = await axios.get("/api/ipinfo");
          if (res.data && res.data.loc) {
            const [lat, lon] = res.data.loc.split(",");
            fetchWeather(lat, lon, res.data.city);
          } else {
            // Fallback final: Santiago
            fetchWeather(-33.4489, -70.6693, "Santiago");
          }
        } catch (e) {
          fetchWeather(-33.4489, -70.6693, "Santiago");
        }
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  } else {
    // Si no hay soporte de geolocalización, usa IP
    try {
      const res = await axios.get("/api/ipinfo");
      if (res.data && res.data.loc) {
        const [lat, lon] = res.data.loc.split(",");
        fetchWeather(lat, lon, res.data.city);
      } else {
        fetchWeather(-33.4489, -70.6693, "Santiago");
      }
    } catch (e) {
      fetchWeather(-33.4489, -70.6693, "Santiago");
    }
  }
};

    getWeather();
  }, []);

  const handlePlay = (station) => {
    onPlay(station);
    addToHistory(station);
  };

  const getWeatherIcon = (weatherCode) => {
    if (weatherCode.includes("cloud")) return <FaCloud />;
    if (weatherCode.includes("clear")) return <FaSun />;
    if (weatherCode.includes("rain")) return <FaCloudRain />;
    return <FaCloud />;
  };

  return (
    <div
      className="w-full max-w-xs sm:w-64 md:w-80 bg-gradient-to-br from-[#1e1e1e]/90 via-[#334155]/90 to-[#1e1e1e]/80 p-3 sm:p-4 md:p-6 rounded-2xl shadow-lg shadow-[#F97316]/20 border-2 border-[#F97316]/40 backdrop-blur-sm sm:sticky top-4 max-h-screen overflow-y-auto"
      style={{
        scrollbarWidth: 'thin',
        scrollbarColor: '#F97316 #1E1E1E',
      }}
      role="navigation"
      aria-label="Menú lateral"
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
      <RadioFilters onFilterChange={onFilterChange} />
      {weather && (
        <div className="mb-4 sm:mb-6">
          <h3 className="text-base sm:text-lg text-[#F97316] font-medium">
            Clima en {weather.name}
          </h3>
          <div className="bg-[#F97316] text-white py-1 px-2 rounded hover:bg-opacity-80 flex items-center gap-2 cursor-pointer">
            {getWeatherIcon(weather.weather[0].main.toLowerCase())}
            <p className="text-[#F1F5F9] text-xs sm:text-sm">{weather.main.temp}°C - {weather.weather[0].description}</p>
          </div>
        </div>
      )}
      {weatherError && (
        <div className="mb-4 sm:mb-6 text-red-500 text-xs sm:text-sm">
          {weatherError}. Mostrando clima de Santiago, Chile.
        </div>
      )}
      <TopStations onPlay={handlePlay} />
      <div>
        <h3 className="text-base sm:text-lg text-[#F97316] font-medium">Historial</h3>
        <ul className="text-[#F1F5F9]">
          <AnimatePresence>
            {history.map((station) => (
              <motion.li
                key={station.stationuuid}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="py-1 hover:text-[#F97316] cursor-pointer text-sm sm:text-base"
                onClick={() => handlePlay(station)}
                role="button"
                aria-label={`Reproducir ${station.name} del historial`}
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