// "use client";

// import { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import RadioCard from "@/components/RadioCard";
// import RadioPlayer from "@/components/RadioPlayer";
// import Sidebar from "@/components/Sidebar";
// import { FaBars } from "react-icons/fa";

// async function fetchStations({ search = "", offset = 0 }) {
//   const servers = [
//     "https://de1.api.radio-browser.info",
//     "https://nl1.api.radio-browser.info",
//     "https://us1.api.radio-browser.info",
//   ];
//   let lastError = null;

//   for (const server of servers) {
//     try {
//       let url = `${server}/json/stations`;
//       if (search) {
//         url = `${server}/json/stations/byname/${encodeURIComponent(search)}`;
//       }
//       const response = await axios.get(url, {
//         params: { offset, limit: 100, hidebroken: true, order: "clickcount", reverse: true },
//         headers: { "User-Agent": "TutoGoRadio/1.0" },
//       });
//       return response.data;
//     } catch (error) {
//       lastError = error;
//       console.error(`Error al obtener emisoras desde ${server}:`, error);
//       continue;
//     }
//   }

//   console.error("Error al obtener emisoras, usando datos locales:", lastError);
//   const localData = await import("@/data/emisoras.json");
//   return localData.default;
// }

// export default function Home() {
//   const [filters, setFilters] = useState({ search: "" });
//   const [offset, setOffset] = useState(0);
//   const [emisoraActual, setEmisoraActual] = useState(null);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
//     <div className="min-h-screen bg-[#1E1E1E] text-[#F1F5F9] font-sans p-4 sm:p-6">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="flex items-center text-2xl sm:text-4xl font-bold text-[#F97316]">
//           <img
//             src="/iconLogo.PNG"
//             alt="TutoGo Radio Logo"
//             className="w-16 h-16 mr-3"
//           />
//           TutoGo Radio
//         </h1>
//         <button
//           className="sm:hidden text-[#F97316] text-2xl"
//           onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//         >
//           <FaBars />
//         </button>
//       </div>
//       <p className="text-center mb-6">Explorá y escuchá tus emisoras favoritas</p>
//       <div className="flex flex-col sm:flex-row gap-4">
//         <div className={`${isSidebarOpen ? "block" : "hidden"} sm:block sm:w-80`}>
//           <Sidebar onPlay={handlePlay} onFilterChange={handleFilterChange} />
//         </div>
//         <div className="flex-1">
//           <div className="sticky top-4 z-10 bg-[#1E1E1E]/80 backdrop-blur-sm rounded-lg">
//             <RadioPlayer current={emisoraActual} />
//           </div>
//           <div className="mt-6">
//             {isLoading && (
//               <div className="text-center">Cargando...</div>
//             )}
//             {error && (
//               <div className="text-center text-red-500">
//                 Error: {error.message}
//               </div>
//             )}
//             {data && data.length === 0 && (
//               <div className="text-center">No se encontraron emisoras</div>
//             )}
//             <div className="flex flex-wrap gap-4 justify-center">
//               {data &&
//                 data.map((radio) => (
//                   <RadioCard key={radio.stationuuid} radio={radio} onPlay={handlePlay} />
//                 ))}
//             </div>
//             {data && data.length > 0 && (
//               <div className="flex justify-center gap-4 mt-6">
//                 <button
//                   onClick={() => setOffset((prev) => Math.max(prev - 20, 0))}
//                   disabled={offset === 0}
//                   className="bg-[#F97316] text-white py-2 px-4 rounded hover:bg-opacity-80 disabled:opacity-50"
//                 >
//                   Anterior
//                 </button>
//                 <button
//                   onClick={() => setOffset((prev) => prev + 20)}
//                   disabled={data.length < 20}
//                   className="bg-[#F97316] text-white py-2 px-4 rounded hover:bg-opacity-80 disabled:opacity-50"
//                 >
//                   Siguiente
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



// "use client";

// import { useState, useEffect } from "react";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import RadioCard from "@/components/RadioCard";
// import RadioPlayer from "@/components/RadioPlayer";
// import Sidebar from "@/components/Sidebar";
// import { FaBars } from "react-icons/fa";

// async function fetchStations({ search = "", offset = 0, countryCode = "" }) {
//   const servers = [
//     "https://de1.api.radio-browser.info",
//     "https://nl1.api.radio-browser.info",
//     "https://us1.api.radio-browser.info",
//   ];
//   let lastError = null;

//   for (const server of servers) {
//     try {
//       let url;
//       if (search) {
//         url = `${server}/json/stations/byname/${encodeURIComponent(search)}`;
//       } else if (countryCode) {
//         url = `${server}/json/stations/bycountrycodeexact/${countryCode}`;
//       } else {
//         url = `${server}/json/stations`;
//       }
//       const response = await axios.get(url, {
//         params: { offset, limit: 100, hidebroken: true, order: "clickcount", reverse: true },
//         headers: { "User-Agent": "TutoGoRadio/1.0" },
//       });
//       return response.data;
//     } catch (error) {
//       lastError = error;
//       console.error(`Error al obtener emisoras desde ${server}:`, error);
//       continue;
//     }
//   }

//   console.error("Error al obtener emisoras, usando datos locales:", lastError);
//   const localData = await import("@/data/emisoras.json");
//   return localData.default;
// }

// async function fetchCountryCode() {
//   try {
//     const response = await axios.get("https://ipapi.co/json/");
//     return response.data.country_code || "CL"; // Predeterminado: Chile
//   } catch (error) {
//     console.error("Error al obtener el país:", error);
//     return "CL"; // Predeterminado: Chile
//   }
// }

// export default function Home() {
//   const [filters, setFilters] = useState({ search: "" });
//   const [offset, setOffset] = useState(0);
//   const [emisoraActual, setEmisoraActual] = useState(null);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [countryCode, setCountryCode] = useState("");

//   useEffect(() => {
//     fetchCountryCode().then((code) => {
//       setCountryCode(code);
//     });
//   }, []);

//   const { data, isLoading, error } = useQuery({
//     queryKey: ["stations", filters, offset, countryCode],
//     queryFn: () => fetchStations({ ...filters, offset, countryCode }),
//     keepPreviousData: true,
//     enabled: !!countryCode, // Espera a que countryCode esté disponible
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
//     <div className="min-h-screen bg-[#1E1E1E] text-[#F1F5F9] font-sans p-4 sm:p-6">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="flex items-center text-2xl sm:text-4xl font-bold text-[#F97316]">
//           <img
//             src="/iconLogo.PNG"
//             alt="TutoGo Radio Logo"
//             className="w-16 h-16 mr-3"
//           />
//           TutoGo Radio
//         </h1>
//         <button
//           className="sm:hidden text-[#F97316] text-2xl"
//           onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//         >
//           <FaBars />
//         </button>
//       </div>
//       <p className="text-center mb-6">Explorá y escuchá tus emisoras favoritas</p>
//       <div className="flex flex-col sm:flex-row gap-4">
//         <div className={`${isSidebarOpen ? "block" : "hidden"} sm:block sm:w-80`}>
//           <Sidebar onPlay={handlePlay} onFilterChange={handleFilterChange} />
//         </div>
//         <div className="flex-1">
//           <div className="sticky top-4 z-10 bg-[#1E1E1E]/80 backdrop-blur-sm rounded-lg">
//             <RadioPlayer current={emisoraActual} />
//           </div>
//           <div className="mt-6">
//             {isLoading && (
//               <div className="text-center">Cargando...</div>
//             )}
//             {error && (
//               <div className="text-center text-red-500">
//                 Error: {error.message}
//               </div>
//             )}
//             {data && data.length === 0 && (
//               <div className="text-center">No se encontraron emisoras</div>
//             )}
//             <div className="flex flex-wrap gap-4 justify-center">
//               {data &&
//                 data.map((radio) => (
//                   <RadioCard key={radio.stationuuid} radio={radio} onPlay={handlePlay} />
//                 ))}
//             </div>
//             {data && data.length > 0 && (
//               <div className="flex justify-center gap-4 mt-6">
//                 <button
//                   onClick={() => setOffset((prev) => Math.max(prev - 20, 0))}
//                   disabled={offset === 0}
//                   className="bg-[#F97316] text-white py-2 px-4 rounded hover:bg-opacity-80 disabled:opacity-50"
//                 >
//                   Anterior
//                 </button>
//                 <button
//                   onClick={() => setOffset((prev) => prev + 20)}
//                   disabled={data.length < 20}
//                   className="bg-[#F97316] text-white py-2 px-4 rounded hover:bg-opacity-80 disabled:opacity-50"
//                 >
//                   Siguiente
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



// "use client";

// import { useState, useEffect } from "react";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import RadioCard from "@/components/RadioCard";
// import RadioPlayer from "@/components/RadioPlayer";
// import Sidebar from "@/components/Sidebar";
// import { FaBars } from "react-icons/fa";
// import Footer from "@/components/Footer";

// async function fetchStations({ search = "", offset = 0, countryCode = "" }) {
//   const servers = [
//     "https://de1.api.radio-browser.info",
//     "https://nl1.api.radio-browser.info",
//     "https://us1.api.radio-browser.info",
//   ];
//   let lastError = null;

//   for (const server of servers) {
//     try {
//       let url;
//       if (search) {
//         url = `${server}/json/stations/byname/${encodeURIComponent(search)}`;
//       } else if (countryCode) {
//         url = `${server}/json/stations/bycountrycodeexact/${countryCode}`;
//       } else {
//         url = `${server}/json/stations`;
//       }
//       const response = await axios.get(url, {
//         params: { offset, limit: 100, hidebroken: true, order: "clickcount", reverse: true },
//       });
//       return response.data;
//     } catch (error) {
//       lastError = error;
//       console.error(`Error al obtener emisoras desde ${server}:`, error);
//       continue;
//     }
//   }

//   console.error("Error al obtener emisoras, usando datos locales:", lastError);
//   const localData = await import("@/data/emisoras.json");
//   return localData.default;
// }

// async function fetchCountryCode() {
//   try {
//     const response = await axios.get("https://ipapi.co/json/");
//     return response.data.country_code || "CL"; // Predeterminado: Chile
//   } catch (error) {
//     console.error("Error al obtener el país:", error);
//     return "CL"; // Predeterminado: Chile
//   }
// }

// export default function Home() {
//   const [filters, setFilters] = useState({ search: "" });
//   const [offset, setOffset] = useState(0);
//   const [emisoraActual, setEmisoraActual] = useState(null);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [countryCode, setCountryCode] = useState("");

//   useEffect(() => {
//     fetchCountryCode().then((code) => {
//       setCountryCode(code);
//     });
//   }, []);

//   const { data, isLoading, error } = useQuery({
//     queryKey: ["stations", filters, offset, countryCode],
//     queryFn: () => fetchStations({ ...filters, offset, countryCode }),
//     keepPreviousData: true,
//     enabled: !!countryCode,
//     refetchOnWindowFocus: false, // Desactiva refetching al enfocar la ventana
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
//     <div className="min-h-screen bg-[#1E1E1E] text-[#F1F5F9] font-sans p-4 sm:p-6">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="flex items-center text-2xl sm:text-4xl font-bold text-[#F97316]">
//           <img
//             src="/iconLogo.PNG"
//             alt="TutoGo Radio Logo"
//             className="w-16 h-16 mr-3"
//           />
//           TutoGo Radio
//         </h1>
//         <button
//           className="sm:hidden text-[#F97316] text-2xl"
//           onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//         >
//           <FaBars />
//         </button>
//       </div>
//       <p className="text-center mb-6">Explorá y escuchá tus emisoras favoritas</p>
//       <div className="flex flex-col sm:flex-row gap-4">
//         <div className={`${isSidebarOpen ? "block" : "hidden"} sm:block sm:w-80`}>
//           <Sidebar onPlay={handlePlay} onFilterChange={handleFilterChange} />
//         </div>
//         <div className="flex-1">
//           <div className="sticky top-4 z-10 bg-[#1E1E1E]/80 backdrop-blur-sm rounded-lg">
//             <RadioPlayer current={emisoraActual} />
//           </div>
//           <div className="mt-6">
//             {isLoading && (
//               <div className="text-center">Cargando...</div>
//             )}
//             {error && (
//               <div className="text-center text-red-500">
//                 Error: {error.message}
//               </div>
//             )}
//             {data && data.length === 0 && (
//               <div className="text-center">No se encontraron emisoras en {countryCode}</div>
//             )}
//             <div className="flex flex-wrap gap-4 justify-center">
//               {data &&
//                 data.map((radio) => (
//                   <RadioCard key={radio.stationuuid} radio={radio} onPlay={handlePlay} />
//                 ))}
//             </div>
//             {data && data.length > 0 && (
//               <div className="flex justify-center gap-4 mt-6">
//                 <button
//                   onClick={() => setOffset((prev) => Math.max(prev - 20, 0))}
//                   disabled={offset === 0}
//                   className="bg-[#F97316] text-white py-2 px-4 rounded hover:bg-opacity-80 disabled:opacity-50"
//                 >
//                   Anterior
//                 </button>
//                 <button
//                   onClick={() => setOffset((prev) => prev + 20)}
//                   disabled={data.length < 20}
//                   className="bg-[#F97316] text-white py-2 px-4 rounded hover:bg-opacity-80 disabled:opacity-50"
//                 >
//                   Siguiente
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }




// "use client";

// import { useState, useEffect } from "react";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import RadioCard from "@/components/RadioCard";
// import RadioPlayer from "@/components/RadioPlayer";
// import Sidebar from "@/components/Sidebar";
// import Footer from "@/components/Footer";
// import { FaBars } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";

// async function fetchStations({ search = "", offset = 0, countryCode = "" }) {
//   const servers = [
//     "https://de1.api.radio-browser.info",
//     "https://nl1.api.radio-browser.info",
//     "https://us1.api.radio-browser.info",
//   ];
//   let lastError = null;

//   for (const server of servers) {
//     try {
//       let url;
//       if (search) {
//         url = `${server}/json/stations/byname/${encodeURIComponent(search)}`;
//       } else if (countryCode) {
//         url = `${server}/json/stations/bycountrycodeexact/${countryCode}`;
//       } else {
//         url = `${server}/json/stations`;
//       }
//       const response = await axios.get(url, {
//         params: { offset, limit: 100, hidebroken: true, order: "clickcount", reverse: true },
//       });
//       return response.data;
//     } catch (error) {
//       lastError = error;
//       console.error(`Error al obtener emisoras desde ${server}:`, error);
//       continue;
//     }
//   }

//   console.error("Error al obtener emisoras, usando datos locales:", lastError);
//   const localData = await import("@/data/emisoras.json");
//   return localData.default;
// }

// async function fetchCountryCode() {
//   try {
//     const response = await axios.get("https://ipapi.co/json/");
//     return response.data.country_code || "CL"; // Predeterminado: Chile
//   } catch (error) {
//     console.error("Error al obtener el país:", error);
//     return "CL"; // Predeterminado: Chile
//   }
// }

// export default function Home() {
//   const [filters, setFilters] = useState({ search: "" });
//   const [offset, setOffset] = useState(0);
//   const [emisoraActual, setEmisoraActual] = useState(null);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [countryCode, setCountryCode] = useState("");

//   useEffect(() => {
//     fetchCountryCode().then((code) => {
//       setCountryCode(code);
//     });
//   }, []);

//   const { data, isLoading, error } = useQuery({
//     queryKey: ["stations", filters, offset, countryCode],
//     queryFn: () => fetchStations({ ...filters, offset, countryCode }),
//     keepPreviousData: true,
//     enabled: !!countryCode,
//     refetchOnWindowFocus: false,
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

//   // Configuración de las patitas animadas
//   const pawVariants = {
//     hidden: { opacity: 0, scale: 0 },
//     visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
//     exit: { opacity: 0, scale: 0, transition: { duration: 0.5 } },
//   };

//   const pawPositions = [
//     { top: "-10px", left: "-10px" },
//     { top: "-10px", right: "-10px" },
//     { bottom: "-10px", left: "-10px" },
//     { bottom: "-10px", right: "-10px" },
//   ];

//   return (
//     <div className="min-h-screen bg-[#1E1E1E] text-[#F1F5F9] font-sans p-4 sm:p-6">
//       <div className="flex justify-between items-center mb-4 relative">
//         <div className="relative">
//           <h1 className="flex items-center text-2xl sm:text-4xl font-bold text-[#F97316]">
//             <img
//               src="/iconLogo.PNG"
//               alt="TutoGo Radio Logo"
//               className="w-16 h-16 mr-3"
//             />
//             TutoGo Radio
//           </h1>
//           <AnimatePresence>
//             {pawPositions.map((pos, index) => (
//               <motion.img
//                 key={index}
//                 src="/catPaw.png"
//                 alt="Cat Paw"
//                 className="absolute w-6 h-6 object-contain"
//                 style={{ ...pos, zIndex: 10 }}
//                 variants={pawVariants}
//                 initial="hidden"
//                 animate="visible"
//                 exit="exit"
//                 transition={{
//                   repeat: Infinity,
//                   repeatType: "loop",
//                   delay: index * 0.5,
//                   duration: 0.5,
//                   repeatDelay: 2,
//                 }}
//               />
//             ))}
//           </AnimatePresence>
//         </div>
//         <button
//           className="sm:hidden text-[#F97316] text-2xl"
//           onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//         >
//           <FaBars />
//         </button>
//       </div>
//       <p className="text-center mb-6">Explorá y escuchá tus emisoras favoritas</p>
//       <div className="flex flex-col sm:flex-row gap-4">
//         <div className={`${isSidebarOpen ? "block" : "hidden"} sm:block sm:w-80`}>
//           <Sidebar onPlay={handlePlay} onFilterChange={handleFilterChange} />
//         </div>
//         <div className="flex-1">
//           <div className="sticky top-4 z-10 bg-[#1E1E1E]/80 backdrop-blur-sm rounded-lg">
//             <RadioPlayer current={emisoraActual} />
//           </div>
//           <div className="mt-6">
//             {isLoading && (
//               <div className="text-center">Cargando...</div>
//             )}
//             {error && (
//               <div className="text-center text-red-500">
//                 Error: {error.message}
//               </div>
//             )}
//             {data && data.length === 0 && (
//               <div className="text-center">No se encontraron emisoras en {countryCode}</div>
//             )}
//             <div className="flex flex-wrap gap-4 justify-center">
//               {data &&
//                 data.map((radio) => (
//                   <RadioCard key={radio.stationuuid} radio={radio} onPlay={handlePlay} />
//                 ))}
//             </div>
//             {data && data.length > 0 && (
//               <div className="flex justify-center gap-4 mt-6">
//                 <button
//                   onClick={() => setOffset((prev) => Math.max(prev - 20, 0))}
//                   disabled={offset === 0}
//                   className="bg-[#F97316] text-white py-2 px-4 rounded hover:bg-opacity-80 disabled:opacity-50"
//                 >
//                   Anterior
//                 </button>
//                 <button
//                   onClick={() => setOffset((prev) => prev + 20)}
//                   disabled={data.length < 20}
//                   className="bg-[#F97316] text-white py-2 px-4 rounded hover:bg-opacity-80 disabled:opacity-50"
//                 >
//                   Siguiente
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }



// "use client";

// import { useState, useEffect } from "react";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import RadioCard from "@/components/RadioCard";
// import RadioPlayer from "@/components/RadioPlayer";
// import Sidebar from "@/components/Sidebar";
// import Footer from "@/components/Footer";
// import { FaBars } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";

// async function fetchStations({ search = "", offset = 0, countryCode = "" }) {
//   const servers = [
//     "https://de1.api.radio-browser.info",
//     "https://nl1.api.radio-browser.info",
//     "https://us1.api.radio-browser.info",
//   ];
//   let lastError = null;

//   for (const server of servers) {
//     try {
//       let url;
//       if (search) {
//         url = `${server}/json/stations/byname/${encodeURIComponent(search)}`;
//       } else if (countryCode) {
//         url = `${server}/json/stations/bycountrycodeexact/${countryCode}`;
//       } else {
//         url = `${server}/json/stations`;
//       }
//       const response = await axios.get(url, {
//         params: { offset, limit: 100, hidebroken: true, order: "clickcount", reverse: true },
//       });
//       return response.data;
//     } catch (error) {
//       lastError = error;
//       console.error(`Error al obtener emisoras desde ${server}:`, error);
//       continue;
//     }
//   }

//   console.error("Error al obtener emisoras, usando datos locales:", lastError);
//   const localData = await import("@/data/emisoras.json");
//   return localData.default;
// }

// async function fetchCountryCode() {
//   try {
//     const response = await axios.get("https://ipapi.co/json/");
//     return response.data.country_code || "CL"; // Predeterminado: Chile
//   } catch (error) {
//     console.error("Error al obtener el país:", error);
//     return "CL"; // Predeterminado: Chile
//   }
// }

// export default function Home() {
//   const [filters, setFilters] = useState({ search: "" });
//   const [offset, setOffset] = useState(0);
//   const [emisoraActual, setEmisoraActual] = useState(null);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [countryCode, setCountryCode] = useState("");

//   useEffect(() => {
//     fetchCountryCode().then((code) => {
//       setCountryCode(code);
//     });
//   }, []);

//   const { data, isLoading, error } = useQuery({
//     queryKey: ["stations", filters, offset, countryCode],
//     queryFn: () => fetchStations({ ...filters, offset, countryCode }),
//     keepPreviousData: true,
//     enabled: !!countryCode,
//     refetchOnWindowFocus: false,
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

//   // Configuración de las patitas animadas
//   const pawVariants = {
//     hidden: { opacity: 0, x: -100 },
//     visible: (index) => ({
//       opacity: 1,
//       x: 0,
//       y: index % 2 === 0 ? -10 : 10, // Zigzag
//       transition: { duration: 0.5, delay: index * 0.5 },
//     }),
//     exit: { opacity: 0, x: 50, transition: { duration: 0.5 } },
//   };

//   const pawPositions = Array.from({ length: 6 }, (_, index) => ({
//     left: `${index * 30}px`, // Espaciado horizontal
//   }));

//   return (
//     <div className="min-h-screen bg-[#1E1E1E] text-[#F1F5F9] font-sans p-4 sm:p-6">
//       <div className="flex justify-between items-center mb-4">
//         <div className="flex items-center relative">
//           <h1 className="flex items-center text-2xl sm:text-4xl font-bold text-[#F97316]">
//             <img
//               src="/iconLogo.PNG"
//               alt="TutoGo Radio Logo"
//               className="w-16 h-16 mr-3"
//             />
//             TutoGo Radio
//           </h1>
//           <div className="relative ml-6 h-16 sm:ml-8 sm:h-20">
//             <AnimatePresence>
//               {pawPositions.map((pos, index) => (
//                 <motion.img
//                   key={index}
//                   src="/catPaw.png"
//                   alt="Cat Paw"
//                   className="absolute w-8 h-8 object-contain sm:w-10 sm:h-10"
//                   style={{ ...pos, rotate: "90deg", zIndex: 10, border: "1px solid red" }} // Borde para depuración
//                   variants={pawVariants}
//                   custom={index}
//                   initial="hidden"
//                   animate="visible"
//                   exit="exit"
//                   transition={{
//                     repeat: Infinity,
//                     repeatType: "loop",
//                     duration: 0.5,
//                     delay: index * 0.5,
//                     repeatDelay: 3,
//                   }}
//                   onError={() => console.error("Error cargando /catPaw.png")} // Log de error
//                 />
//               ))}
//             </AnimatePresence>
//           </div>
//         </div>
//         <button
//           className="sm:hidden text-[#F97316] text-2xl"
//           onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//         >
//           <FaBars />
//         </button>
//       </div>
//       <p className="text-center mb-6">Explorá y escuchá tus emisoras favoritas</p>
//       <div className="flex flex-col sm:flex-row gap-4">
//         <div className={`${isSidebarOpen ? "block" : "hidden"} sm:block sm:w-80`}>
//           <Sidebar onPlay={handlePlay} onFilterChange={handleFilterChange} />
//         </div>
//         <div className="flex-1">
//           <div className="sticky top-4 z-10 bg-[#1E1E1E]/80 backdrop-blur-sm rounded-lg">
//             <RadioPlayer current={emisoraActual} />
//           </div>
//           <div className="mt-6">
//             {isLoading && (
//               <div className="text-center">Cargando...</div>
//             )}
//             {error && (
//               <div className="text-center text-red-500">
//                 Error: {error.message}
//               </div>
//             )}
//             {data && data.length === 0 && (
//               <div className="text-center">No se encontraron emisoras en {countryCode}</div>
//             )}
//             <div className="flex flex-wrap gap-4 justify-center">
//               {data &&
//                 data.map((radio) => (
//                   <RadioCard key={radio.stationuuid} radio={radio} onPlay={handlePlay} />
//                 ))}
//             </div>
//             {data && data.length > 0 && (
//               <div className="flex justify-center gap-4 mt-6">
//                 <button
//                   onClick={() => setOffset((prev) => Math.max(prev - 20, 0))}
//                   disabled={offset === 0}
//                   className="bg-[#F97316] text-white py-2 px-4 rounded hover:bg-opacity-80 disabled:opacity-50"
//                 >
//                   Anterior
//                 </button>
//                 <button
//                   onClick={() => setOffset((prev) => prev + 20)}
//                   disabled={data.length < 20}
//                   className="bg-[#F97316] text-white py-2 px-4 rounded hover:bg-opacity-80 disabled:opacity-50"
//                 >
//                   Siguiente
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }



// "use client";

// import { useState, useEffect } from "react";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import RadioCard from "@/components/RadioCard";
// import RadioPlayer from "@/components/RadioPlayer";
// import Sidebar from "@/components/Sidebar";
// import Footer from "@/components/Footer";
// import { FaBars } from "react-icons/fa";

// async function fetchStations({ search = "", offset = 0, countryCode = "" }) {
//   const servers = [
//     "https://de1.api.radio-browser.info",
//     "https://nl1.api.radio-browser.info",
//     "https://us1.api.radio-browser.info",
//   ];
//   let lastError = null;

//   for (const server of servers) {
//     try {
//       let url;
//       if (search) {
//         url = `${server}/json/stations/byname/${encodeURIComponent(search)}`;
//       } else if (countryCode) {
//         url = `${server}/json/stations/bycountrycodeexact/${countryCode}`;
//       } else {
//         url = `${server}/json/stations`;
//       }
//       const response = await axios.get(url, {
//         params: { offset, limit: 100, hidebroken: true, order: "clickcount", reverse: true },
//       });
//       return response.data;
//     } catch (error) {
//       lastError = error;
//       console.error(`Error al obtener emisoras desde ${server}:`, error);
//       continue;
//     }
//   }

//   console.error("Error al obtener emisoras, usando datos locales:", lastError);
//   const localData = await import("@/data/emisoras.json");
//   return localData.default;
// }

// async function fetchCountryCode() {
//   try {
//     const response = await axios.get("https://ipapi.co/json/");
//     return response.data.country_code || "CL"; // Predeterminado: Chile
//   } catch (error) {
//     console.error("Error al obtener el país:", error);
//     return "CL"; // Predeterminado: Chile
//   }
// }

// export default function Home() {
//   const [filters, setFilters] = useState({ search: "" });
//   const [offset, setOffset] = useState(0);
//   const [emisoraActual, setEmisoraActual] = useState(null);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [countryCode, setCountryCode] = useState("");

//   useEffect(() => {
//     fetchCountryCode().then((code) => {
//       setCountryCode(code);
//     });
//   }, []);

//   const { data, isLoading, error } = useQuery({
//     queryKey: ["stations", filters, offset, countryCode],
//     queryFn: () => fetchStations({ ...filters, offset, countryCode }),
//     keepPreviousData: true,
//     enabled: !!countryCode,
//     refetchOnWindowFocus: false,
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

//   const pawPositions = Array.from({ length: 5 }, (_, index) => ({
//     left: `${index * 60}px`, // Más espaciado
//     top: index % 2 === 0 ? "-15px" : "15px", // Zigzag estático
//   }));

//   return (
//     <div className="min-h-screen bg-[#1E1E1E] text-[#F1F5F9] font-sans p-4 sm:p-6">
//       <div className="flex justify-between items-center mb-4">
//         <div className="flex items-center relative mr-16 sm:mr-0">
//           <h1 className="flex items-center text-2xl sm:text-4xl font-bold text-[#F97316]">
//             <img
//               src="/iconLogo.PNG"
//               alt="TutoGo Radio Logo"
//               className="w-16 h-16 mr-3"
//             />
//             TutoGo Radio
//           </h1>
//           <div className="relative ml-8 h-28 sm:ml-10 sm:h-32">
//             {pawPositions.map((pos, index) => (
//               <img
//                 key={index}
//                 src="/catPaw.png"
//                 alt="Cat Paw"
//                 className="absolute w-8 h-8 object-contain sm:w-10 sm:h-10"
//                 style={{ ...pos, zIndex: 20, filter: "hue-rotate(15deg) brightness(1.2)", border: "1px solid red" }}
//                 onError={() => console.error("Error cargando /catPaw.png")}
//               />
//             ))}
//           </div>
//         </div>
//         <button
//           className="sm:hidden text-[#F97316] text-2xl"
//           onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//         >
//           <FaBars />
//         </button>
//       </div>
//       <p className="text-center mb-6">Explorá y escuchá tus emisoras favoritas</p>
//       <div className="flex flex-col sm:flex-row gap-4">
//         <div className={`${isSidebarOpen ? "block" : "hidden"} sm:block sm:w-80`}>
//           <Sidebar onPlay={handlePlay} onFilterChange={handleFilterChange} />
//         </div>
//         <div className="flex-1">
//           <div className="sticky top-4 z-10 bg-[#1E1E1E]/80 backdrop-blur-sm rounded-lg">
//             <RadioPlayer current={emisoraActual} />
//           </div>
//           <div className="mt-6">
//             {isLoading && (
//               <div className="text-center">Cargando...</div>
//             )}
//             {error && (
//               <div className="text-center text-red-500">
//                 Error: {error.message}
//               </div>
//             )}
//             {data && data.length === 0 && (
//               <div className="text-center">No se encontraron emisoras en {countryCode}</div>
//             )}
//             <div className="flex flex-wrap gap-4 justify-center">
//               {data &&
//                 data.map((radio) => (
//                   <RadioCard key={radio.stationuuid} radio={radio} onPlay={handlePlay} />
//                 ))}
//             </div>
//             {data && data.length > 0 && (
//               <div className="flex justify-center gap-4 mt-6">
//                 <button
//                   onClick={() => setOffset((prev) => Math.max(prev - 20, 0))}
//                   disabled={offset === 0}
//                   className="bg-[#F97316] text-white py-2 px-4 rounded hover:bg-opacity-80 disabled:opacity-50"
//                 >
//                   Anterior
//                 </button>
//                 <button
//                   onClick={() => setOffset((prev) => prev + 20)}
//                   disabled={data.length < 20}
//                   className="bg-[#F97316] text-white py-2 px-4 rounded hover:bg-opacity-80 disabled:opacity-50"
//                 >
//                   Siguiente
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import RadioCard from "@/components/RadioCard";
import RadioPlayer from "@/components/RadioPlayer";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { FaBars, FaLinkedin, FaEnvelope, FaWhatsapp, FaGlobe, FaFileAlt } from "react-icons/fa";

async function fetchStations({ search = "", offset = 0, countryCode = "" }) {
  const servers = [
    "https://de1.api.radio-browser.info",
    "https://nl1.api.radio-browser.info",
    "https://us1.api.radio-browser.info",
  ];
  let lastError = null;

  for (const server of servers) {
    try {
      let url;
      if (search) {
        url = `${server}/json/stations/byname/${encodeURIComponent(search)}`;
      } else if (countryCode) {
        url = `${server}/json/stations/bycountrycodeexact/${countryCode}`;
      } else {
        url = `${server}/json/stations`;
      }
      const response = await axios.get(url, {
        params: { offset, limit: 20, hidebroken: true, order: "clickcount", reverse: true },
      });
      return response.data;
    } catch (error) {
      lastError = error;
      console.error(`Error al obtener emisoras desde ${server}:`, error);
      continue;
    }
  }

  console.error("Error al obtener emisoras, usando datos locales:", lastError);
  const localData = await import("@/data/emisoras.json");
  return localData.default;
}

async function fetchCountryCode() {
  try {
    const response = await axios.get("https://ipapi.co/json/");
    return response.data.country_code || "CL"; // Predeterminado: Chile
  } catch (error) {
    console.error("Error al obtener el país:", error);
    return "CL"; // Predeterminado: Chile
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

  const { data, isLoading, error } = useQuery({
    queryKey: ["stations", filters, offset, countryCode],
    queryFn: () => fetchStations({ ...filters, offset, countryCode }),
    keepPreviousData: true,
    enabled: !!countryCode,
    refetchOnWindowFocus: false,
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

  // Las patitas de gato ahora se renderizan directamente en el JSX, no se necesita pawPositions
  return (
    <div className="min-h-screen bg-[#1E1E1E] text-[#F1F5F9] font-sans p-4 sm:p-6">
      <div className="flex flex-row items-center justify-between mb-4 w-full gap-4">
        {/* Logo, título y huellas */}
        <div className="flex flex-row items-center flex-shrink-0 min-w-0">
          {/* Animación de logo */}
          <span style={{ display: 'inline-flex', alignItems: 'center', animation: 'pawStep 0.6s 0s both cubic-bezier(.4,2,.5,1)' }}>
            <img
              src="/iconLogo.PNG"
              alt="TutoGo Radio Logo"
              className="w-24 h-24 mr-3"
              style={{ verticalAlign: 'middle' }}
            />
          </span>
          {/* Animación de texto */}
          {/* Google Fonts Luckiest Guy para el título */}
<link href="https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap" rel="stylesheet" />
<span 
  style={{ 
    display: 'inline-block', 
    animation: 'pawStep 0.6s 0.18s both cubic-bezier(.4,2,.5,1)',
    color: '#F97316',
    fontFamily: 'Luckiest Guy, cursive',
    letterSpacing: '4px',
    fontWeight: 700,
    fontSize: '3rem'
  }}
  className="truncate"
>
  TutoGo Radio
</span>
          {/* Animación de huellas */}
          <span className="relative ml-6" style={{ minWidth: '18em', height: '2.8em', display: 'inline-block', overflow: 'visible', verticalAlign: 'middle' }}>
            {/* Animación global para las huellas */}
            <style>{`
              @keyframes pawStep {
                0% {
                  opacity: 0;
                  transform: translateY(20px) scale(0.7);
                }
                60% {
                  opacity: 1;
                  transform: translateY(-4px) scale(1.08);
                }
                80% {
                  opacity: 1;
                  transform: translateY(0px) scale(0.95);
                }
                100% {
                  opacity: 1;
                  transform: translateY(0px) scale(1);
                }
              }
            `}</style>
            {[
              { top: 0, rotate: -12, delay: 0.36 },
              { top: 12, rotate: 8, delay: 0.51 },
              { top: -10, rotate: 10, delay: 0.66 },
              { top: 14, rotate: -8, delay: 0.81 },
              { top: -8, rotate: 6, delay: 0.96 },
            ].map((cfg, idx) => (
              <img
                key={idx}
                src="/catPaw.png"
                alt="Cat Paw"
                className="w-8 h-8 sm:w-12 sm:h-12 object-contain absolute"
                style={{
                  left: `${idx * 3.5}em`,
                  top: `${cfg.top}px`,
                  transform: `rotate(${cfg.rotate}deg)` ,
                  animation: `pawStep 0.6s ${cfg.delay}s both cubic-bezier(.4,2,.5,1)`
                }}
                onError={() => console.error("Error cargando /catPaw.png")}
              />
            ))}
          </span>
        </div>
        {/* Redes sociales alineadas y animadas */}
        <div className="hidden sm:flex flex-row items-center gap-3" style={{ minWidth: '18em', justifyContent: 'flex-end' }}>
          {[
            { href: "https://www.linkedin.com/in/omar-leonardo-caiguan-ojeda/", icon: <FaLinkedin className="text-4xl" />, delay: 1.15 },
            { href: "https://omar-caiguan.vercel.app/", icon: <FaGlobe className="text-4xl" />, delay: 1.27 },
            { href: "mailto:omar.caiguan@gmail.com", icon: <FaEnvelope className="text-4xl" />, delay: 1.39 },
            { href: "https://wa.me/+56930579869", icon: <FaWhatsapp className="text-4xl" />, delay: 1.51 },
            { href: "https://drive.google.com/file/d/1JU3sMX3lCxJvKdDRsAvTvntZaYxaS0ET/view?usp=drive_link", icon: <FaFileAlt className="text-4xl" />, delay: 1.63 },
          ].map((cfg, idx) => (
            <a
              key={idx}
              href={cfg.href}
              target="_blank"
              rel="noopener noreferrer"
              title="Red social"
              className="hover:scale-110 transition-transform text-[#F97316]"
              style={{
                opacity: 0,
                animation: `pawStep 0.6s ${cfg.delay}s both cubic-bezier(.4,2,.5,1)`
              }}
            >
              {cfg.icon}
            </a>
          ))}
        </div>
        <button
          className="sm:hidden text-[#F97316] text-2xl ml-4"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <FaBars />
        </button>
      </div>

      {/* <p className="text-center mb-6">Explorá y escuchá tus emisoras favoritas</p> */}

      <div className="text-center mb-6 flex flex-col items-center space-y-2">
        <div className="flex items-center justify-center space-x-2">
          {/* <img
            src="/Geminis.svg"
            alt="Geminis Icon"
            className="w-6 h-6 object-contain filter brightness-1 invert opacity-50"
          />
          <h2 className="text-lg sm:text-xl font-semibold text-[#F97316]">
            Un desarrollo de GEM <span className="font-light">IT</span>
          </h2> */}

          <p className="text-sm sm:text-base text-gray-300 flex flex-wrap justify-center items-center gap-1">
            <span>Un desarrollo de</span>
            <img
              src="/Geminis.svg"
              alt="Geminis Icon"
              className="w-5 h-5 sm:w-6 sm:h-6 object-contain filter brightness-1 invert opacity-50"
            />
            <span className="text-[#F97316] font-bold tracking-tight">
              GEM <span className="font-light">IT</span>
            </span>
            <span>– Innovación y tecnología, el equilibrio perfecto.</span>
          </p>



        </div>
        <p className="text-sm italic text-gray-300 max-w-xl">
          TutoGo Radio es un proyecto creado por Omar Caiguan, pensado para que descubras y escuches tus emisoras favoritas con la mejor experiencia.  
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className={`${isSidebarOpen ? "block" : "hidden"} sm:block sm:w-80`}>
          <Sidebar onPlay={handlePlay} onFilterChange={handleFilterChange} />
        </div>
        <div className="flex-1">
          <div className="sticky top-4 z-10 bg-[#1E1E1E]/80 backdrop-blur-sm rounded-lg">
            <RadioPlayer current={emisoraActual} />
          </div>
          <div className="mt-6">
            {isLoading && (
              <div className="text-center">Cargando...</div>
            )}
            {error && (
              <div className="text-center text-red-500">
                Error: {error.message}
              </div>
            )}
            {data && data.length === 0 && (
              <div className="text-center">No se encontraron emisoras en {countryCode}</div>
            )}
            <div className="flex flex-wrap gap-4 justify-center">
              {data &&
                data.map((radio) => (
                  <RadioCard key={radio.stationuuid} radio={radio} onPlay={handlePlay} />
                ))}
            </div>
            {data && data.length > 0 && (
              <div className="flex justify-center gap-4 mt-6">
                <span className="text-[#F97316] font-medium self-center mr-4">
                  Página {Math.floor(offset / 20) + 1}
                </span>
                <button
                  onClick={() => setOffset((prev) => Math.max(prev - 20, 0))}
                  disabled={offset === 0}
                  className="bg-[#F97316] text-white py-2 px-4 rounded hover:bg-opacity-80 disabled:opacity-50 hover:cursor-pointer"
                >
                  Anterior
                </button>
                <button
                  onClick={() => {
                     setOffset((prev) => prev + 20);
                     window.scrollTo({ top: 0, behavior: 'smooth' });
                   }}
                   disabled={!data || data.length < 20}
                  className="bg-[#F97316] text-white py-2 px-4 rounded hover:bg-opacity-80 disabled:opacity-50 hover:cursor-pointer"
                >
                  Siguiente
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}