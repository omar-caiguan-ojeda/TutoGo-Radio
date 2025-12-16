"use client";

import FireflyBackground from '@/components/FireflyBackground';
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import RadioCard from "@/components/RadioCard";
import RadioPlayer from "@/components/RadioPlayer";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import PaginationControls from "@/components/PaginationControls";
import { RADIO_API_SERVERS, DEFAULT_COUNTRY_CODE } from "@/config";

// Improved fetch with explicit fallback
async function fetchStations({ search = "", offset = 0, countryCode = "" }) {
  // If no params, use default logic
  const limit = 20;

  // Try API servers first
  for (const server of RADIO_API_SERVERS) {
    try {
      let url;
      if (search) {
        url = `${server}/json/stations/byname/${encodeURIComponent(search)}`;
      } else if (countryCode) {
        url = `${server}/json/stations/bycountrycodeexact/${countryCode}`;
      } else {
        url = `${server}/json/stations/topclick`; // Default to top clicked
      }
      
      const response = await axios.get(url, {
        params: { offset, limit, hidebroken: true, order: "clickcount", reverse: true },
        timeout: 2500 // Short timeout to fail fast
      });
      
      if (response.data && Array.isArray(response.data)) {
         return response.data;
      }
    } catch (error) {
      console.warn(`Server ${server} failed:`, error.message);
      continue;
    }
  }

  // If all APIs fail, use local fallback data if available
  console.error("All API servers failed. Using local fallback.");
  try {
     const localData = await import("@/data/emisoras.json");
     return localData.default || [];
  } catch (err) {
      console.error("Local data fallback failed", err);
      return [];
  }
}

async function fetchCountryCode() {
  try {
    const response = await axios.get("/api/ipinfo", { timeout: 2000 });
    return response.data.country_code || DEFAULT_COUNTRY_CODE;
  } catch (error) {
    return DEFAULT_COUNTRY_CODE;
  }
}

export default function Home() {
  const [filters, setFilters] = useState({ search: "" });
  const [offset, setOffset] = useState(0);
  const [emisoraActual, setEmisoraActual] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [countryCode, setCountryCode] = useState("");

  useEffect(() => {
    fetchCountryCode().then((code) => {
      setCountryCode(code);
    });
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [offset]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["stations", filters, offset, countryCode],
    queryFn: () => fetchStations({ ...filters, offset, countryCode }),
    keepPreviousData: true,
    enabled: true, // Always enabled, initial fetch handled inside
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setOffset(0);
  };

  const handlePlay = (station) => {
    setEmisoraActual(station);
  };

  return (
    <div className="min-h-screen text-slate-100 font-sans relative overflow-hidden flex flex-col">
      
      {/* Background Ambience */}
      <FireflyBackground />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 flex-1 w-full flex flex-col">
        
        <HeroSection toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} isSidebarOpen={isSidebarOpen} />

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start flex-1 mb-16">
          
          {/* Mobile Sidebar Overlay */}
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                onClick={() => setIsSidebarOpen(false)}
              />
            )}
          </AnimatePresence>

          {/* Sidebar */}
          <div className={`
             fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:block
             ${isSidebarOpen ? "translate-x-0 bg-[#0f172a] p-4 lg:bg-transparent lg:p-0" : "-translate-x-full"}
          `}>
             <Sidebar onPlay={handlePlay} onFilterChange={handleFilterChange} />
          </div>

          {/* Main Content */}
          <main className="flex-1 w-full min-w-0 flex flex-col">
            
            {/* Reproductor - Sticky Top */}
             <div className="sticky top-0 z-30 pt-4 pb-4">
                <div className="max-w-4xl mx-auto">
                   {emisoraActual ? (
                     <RadioPlayer current={emisoraActual} />
                   ) : (
                     <div className="h-0" />
                   )}
                </div>
             </div>

            <div className="min-h-[50vh] flex-1 relative z-20">
              {isLoading && (
                 <div className="flex justify-center items-center py-20">
                    <div className="w-12 h-12 border-4 border-tutonaranja border-t-transparent rounded-full animate-spin"></div>
                 </div>
              )}
              
              {error && (
                <div className="glass-panel p-6 rounded-xl text-center border-red-500/30">
                  <p className="text-red-400 font-semibold mb-2">Error al cargar emisoras</p>
                  <p className="text-sm text-slate-400">Intenta recargar la página</p>
                </div>
              )}

              {!isLoading && data && data.length === 0 && (
                <div className="text-center py-20 text-slate-400">
                  <p className="text-xl">No se encontraron emisoras.</p>
                  <p className="text-sm mt-2">Intenta cambiar los filtros o el país ({countryCode}).</p>
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
                <AnimatePresence mode="popLayout">
                  {data?.map((radio) => (
                    <RadioCard key={radio.stationuuid} radio={radio} onPlay={handlePlay} />
                  ))}
                </AnimatePresence>
              </div>

              {data && data.length > 0 && (
                <div className="mt-12 flex justify-center mb-8">
                  <PaginationControls
                    offset={offset}
                    dataLength={data.length}
                    onPrevious={() => setOffset((prev) => Math.max(prev - 20, 0))}
                    onNext={() => setOffset((prev) => prev + 20)}
                  />
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      <Footer />
      
    </div>
  );
}