// // src/app/page.jsx
// "use client";

// import { useState, useEffect } from "react";
// import { useTranslation } from "next-i18next";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import RadioCard from "@/components/RadioCard";
// import RadioPlayer from "@/components/RadioPlayer";
// import RadioFilters from "@/components/RadioFilters";
// import Sidebar from "@/components/Sidebar";
// import { FaBars } from "react-icons/fa";

// async function fetchStations({ country = "", language = "", search = "", offset = 0 }) {
//   try {
//     let url = "https://de1.api.radio-browser.info/json/stations";
//     if (search) {
//       url = `https://de1.api.radio-browser.info/json/stations/byname/${encodeURIComponent(search)}`;
//     } else if (country) {
//       url = `https://de1.api.radio-browser.info/json/stations/bycountryexact/${encodeURIComponent(country)}`;
//     } else if (language) {
//       url = `https://de1.api.radio-browser.info/json/stations/bylanguage/${encodeURIComponent(language)}`;
//     }
//     const response = await axios.get(url, {
//       params: { offset, limit: 20, hidebroken: true, order: "clickcount", reverse: true },
//     });
//     return response.data.filter(
//       (station) => station.codec.toLowerCase() === "mp3" || station.codec.toLowerCase() === "aac"
//     );
//   } catch (error) {
//     console.error("Error fetching stations, falling back to local data:", error);
//     const localData = await import("@/data/emisoras.json");
//     return localData.default;
//   }
// }

// export default function Home() {
//   const { t } = useTranslation("common");
//   const [filters, setFilters] = useState({ country: "", language: "", search: "" });
//   const [offset, setOffset] = useState(0);
//   const [emisoraActual, setEmisoraActual] = useState(null);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   useEffect(() => {
//     axios.get("https://ipapi.co/json/")
//       .then((response) => {
//         setFilters((prev) => ({ ...prev, country: response.data.country_name }));
//       })
//       .catch((error) => console.error("Error fetching user country:", error));
//   }, []);

//   const { data, isLoading, error } = useQuery({
//     queryKey: ["stations", filters, offset],
//     queryFn: () => fetchStations({ ...filters, offset }),
//     keepPreviousData: true,
//   });

//   const handleFilterChange = (newFilters) => {
//     setFilters(newFilters);
//     setOffset(0);
//   };

//   const handlePlay = (station) => {
//     setEmisoraActual(station);
//     if (handlePlay.addToHistory) {
//       handlePlay.addToHistory(station);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#1E1E1E] text-[#F1F5F9] font-sans p-4 sm:p-6 pb-24">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-3xl sm:text-4xl font-bold text-[#F97316] text-center">
//           {t("title")}
//         </h1>
//         <button
//           className="sm:hidden text-[#F97316] text-2xl"
//           onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//         >
//           <FaBars />
//         </button>
//       </div>
//       <p className="text-center mb-6">{t("subtitle")}</p>

//       <div className="flex flex-col sm:flex-row gap-4">
//         <div className="flex-1">
//           <RadioFilters onFilterChange={handleFilterChange} />
//           {isLoading && (
//             <div className="text-center">{t("loading")}</div>
//           )}
//           {error && (
//             <div className="text-center text-red-500">
//               {t("error", { message: error.message })}
//             </div>
//           )}
//           {data && data.length === 0 && (
//             <div className="text-center">{t("noStations")}</div>
//           )}
//           <div className="flex flex-wrap gap-4 justify-center">
//             {data &&
//               data.map((radio) => (
//                 <RadioCard key={radio.stationuuid} radio={radio} onPlay={handlePlay} />
//               ))}
//           </div>
//           {data && data.length > 0 && (
//             <div className="flex justify-center gap-4 mt-6">
//               <button
//                 onClick={() => setOffset((prev) => Math.max(prev - 20, 0))}
//                 disabled={offset === 0}
//                 className="bg-[#F97316] text-white py-2 px-4 rounded hover:bg-opacity-80 disabled:opacity-50"
//               >
//                 {t("previous")}
//               </button>
//               <button
//                 onClick={() => setOffset((prev) => prev + 20)}
//                 disabled={data.length < 20}
//                 className="bg-[#F97316] text-white py-2 px-4 rounded hover:bg-opacity-80 disabled:opacity-50"
//               >
//                 {t("next")}
//               </button>
//             </div>
//           )}
//         </div>
//         <div className={`${isSidebarOpen ? "block" : "hidden"} sm:block sm:w-80`}>
//           <Sidebar onPlay={handlePlay} />
//         </div>
//       </div>
//       <RadioPlayer current={emisoraActual} />
//     </div>
//   );
// }



"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import RadioCard from "@/components/RadioCard";
import RadioPlayer from "@/components/RadioPlayer";
import RadioFilters from "@/components/RadioFilters";
import Sidebar from "@/components/Sidebar";
import { FaBars } from "react-icons/fa";

async function fetchStations({ country = "", language = "", search = "", offset = 0 }) {
  try {
    let url = "https://de1.api.radio-browser.info/json/stations";
    if (search) {
      url = `https://de1.api.radio-browser.info/json/stations/byname/${encodeURIComponent(search)}`;
    } else if (country) {
      url = `https://de1.api.radio-browser.info/json/stations/bycountryexact/${encodeURIComponent(country)}`;
    } else if (language) {
      url = `https://de1.api.radio-browser.info/json/stations/bylanguage/${encodeURIComponent(language)}`;
    }
    const response = await axios.get(url, {
      params: { offset, limit: 20, hidebroken: true, order: "clickcount", reverse: true },
    });
    return response.data.filter(
      (station) => station.codec.toLowerCase() === "mp3" || station.codec.toLowerCase() === "aac"
    );
  } catch (error) {
    console.error("Error al obtener emisoras, usando datos locales:", error);
    const localData = await import("@/data/emisoras.json");
    return localData.default;
  }
}

export default function Home() {
  const [filters, setFilters] = useState({ country: "", language: "", search: "" });
  const [offset, setOffset] = useState(0);
  const [emisoraActual, setEmisoraActual] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    axios.get("https://ipapi.co/json/")
      .then((response) => {
        setFilters((prev) => ({ ...prev, country: response.data.country_name }));
      })
      .catch((error) => console.error("Error al obtener el país del usuario:", error));
  }, []);

  const { data, isLoading, error } = useQuery({
    queryKey: ["stations", filters, offset],
    queryFn: () => fetchStations({ ...filters, offset }),
    keepPreviousData: true,
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setOffset(0);
  };

  const handlePlay = (station) => {
    setEmisoraActual(station);
    if (handlePlay.addToHistory) {
      handlePlay.addToHistory(station);
    }
  };

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-[#F1F5F9] font-sans p-4 sm:p-6 pb-24">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#F97316] text-center">
          TutoGo Radio
        </h1>
        <button
          className="sm:hidden text-[#F97316] text-2xl"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <FaBars />
        </button>
      </div>
      <p className="text-center mb-6">Explorá y escuchá tus emisoras favoritas</p>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <RadioFilters onFilterChange={handleFilterChange} />
          {isLoading && (
            <div className="text-center">Cargando...</div>
          )}
          {error && (
            <div className="text-center text-red-500">
              Error: {error.message}
            </div>
          )}
          {data && data.length === 0 && (
            <div className="text-center">No se encontraron emisoras</div>
          )}
          <div className="flex flex-wrap gap-4 justify-center">
            {data &&
              data.map((radio) => (
                <RadioCard key={radio.stationuuid} radio={radio} onPlay={handlePlay} />
              ))}
          </div>
          {data && data.length > 0 && (
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => setOffset((prev) => Math.max(prev - 20, 0))}
                disabled={offset === 0}
                className="bg-[#F97316] text-white py-2 px-4 rounded hover:bg-opacity-80 disabled:opacity-50"
              >
                Anterior
              </button>
              <button
                onClick={() => setOffset((prev) => prev + 20)}
                disabled={data.length < 20}
                className="bg-[#F97316] text-white py-2 px-4 rounded hover:bg-opacity-80 disabled:opacity-50"
              >
                Siguiente
              </button>
            </div>
          )}
        </div>
        <div className={`${isSidebarOpen ? "block" : "hidden"} sm:block sm:w-80`}>
          <Sidebar onPlay={handlePlay} />
        </div>
      </div>
      <RadioPlayer current={emisoraActual} />
    </div>
  );
}