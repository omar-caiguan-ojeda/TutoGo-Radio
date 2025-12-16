import { useState, useEffect } from "react";
import axios from "axios";
import { FaCloud, FaSun, FaCloudRain, FaHistory, FaMapMarkerAlt, FaChevronDown, FaChevronUp, FaFilter, FaStar } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import TopStations from "./TopStations";
import RadioFilters from "./RadioFilters";
import useRadioHistory from "@/hooks/useRadioHistory";
import { OPENWEATHER_API_KEY } from "@/config";

// Componente para secciones colapsables
function SidebarSection({ title, icon, children, defaultOpen = false, className = "" }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`border-b border-white/10 last:border-0 pb-4 last:pb-0 ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-2 text-left hover:text-tutonaranja transition-colors group"
      >
        <div className="flex items-center gap-2 text-slate-200 group-hover:text-tutonaranja font-semibold uppercase tracking-wider text-xs">
          {icon && <span className="text-tutonaranja">{icon}</span>}
          {title}
        </div>
        <span className="text-slate-500 text-xs">
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-2">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

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
        setWeatherError("Clima no disponible");
      }
    };

    const getWeather = async () => {
      if (typeof window !== "undefined" && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeather(latitude, longitude);
          },
          async () => {
             // Fallback to IP or Santiago
            fetchWeather(-33.4489, -70.6693, "Santiago");
          }
        );
      } else {
        fetchWeather(-33.4489, -70.6693, "Santiago");
      }
    };

    getWeather();
  }, []);

  const handlePlay = (station) => {
    onPlay(station);
    addToHistory(station);
  };

  const getWeatherIcon = (weatherCode) => {
    if (weatherCode.includes("cloud")) return <FaCloud className="text-gray-300" />;
    if (weatherCode.includes("clear")) return <FaSun className="text-yellow-400" />;
    if (weatherCode.includes("rain")) return <FaCloudRain className="text-blue-400" />;
    return <FaCloud className="text-gray-300" />;
  };

  return (
    <aside
      className="glass-panel w-full sm:w-72 md:w-80 p-4 rounded-2xl sticky top-4 h-[calc(100vh-2rem)] overflow-y-auto custom-scrollbar flex flex-col gap-2"
      role="navigation"
      aria-label="Sidebar Principal"
    >
        {/* Weather Widget - Always Visible (Compact) */}
        {weather ? (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="bg-slate-800/40 p-3 rounded-xl border border-white/5 flex items-center justify-between shadow-sm mb-2"
          >
            <div className="flex items-center gap-2 overflow-hidden">
              <FaMapMarkerAlt className="text-tutonaranja flex-shrink-0" />
              <span className="text-sm font-medium truncate">{weather.name}</span>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              {getWeatherIcon(weather.weather[0].main.toLowerCase())}
              <span className="font-bold">{Math.round(weather.main.temp)}°</span>
            </div>
          </motion.div>
        ) : (
          <div className="bg-slate-800/20 p-3 rounded-xl border border-white/5 flex items-center justify-center mb-2">
             <span className="text-xs text-slate-400">
               {weatherError ? "Clima no disponible" : "Cargando clima..."}
             </span>
          </div>
        )}

        {/* Sections */}
        <SidebarSection title="Explorar" icon={<FaFilter />} defaultOpen={true}>
           <RadioFilters onFilterChange={onFilterChange} />
        </SidebarSection>
        
        <SidebarSection title="Destacados" icon={<FaStar />} defaultOpen={true}>
           <TopStations onPlay={handlePlay} />
        </SidebarSection>
        
        {history.length > 0 && (
          <SidebarSection title="Recientes" icon={<FaHistory />} defaultOpen={false}>
            <ul className="space-y-1">
              <AnimatePresence>
                {history.slice(0, 5).map((station) => (
                  <motion.li
                    key={station.stationuuid}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="group flex items-center gap-2 p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
                    onClick={() => handlePlay(station)}
                  >
                    <div className="w-1 h-1 bg-tutonaranja rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="text-sm text-slate-300 group-hover:text-white truncate">
                      {station.name}
                    </span>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </SidebarSection>
        )}
    </aside>
  );
}