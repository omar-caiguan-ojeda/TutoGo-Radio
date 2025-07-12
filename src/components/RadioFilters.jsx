// import { useState, useEffect } from "react";
// import { FaSearch } from "react-icons/fa";
// import axios from "axios";

// export default function RadioFilters({ onFilterChange }) {
//   const [country, setCountry] = useState("");
//   const [language, setLanguage] = useState("");
//   const [search, setSearch] = useState("");
//   const [countries, setCountries] = useState([]);
//   const [languages, setLanguages] = useState([]);

//   useEffect(() => {
//     // Cargar países
//     axios.get("https://de1.api.radio-browser.info/json/countries")
//       .then((response) => setCountries(response.data))
//       .catch((error) => console.error("Error al obtener países:", error));

//     // Cargar lenguajes
//     axios.get("https://de1.api.radio-browser.info/json/languages")
//       .then((response) => setLanguages(response.data))
//       .catch((error) => console.error("Error al obtener lenguajes:", error));
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onFilterChange({ country, language, search });
//   };

//   return (
//     <div className="flex flex-col sm:flex-row gap-4 mb-6 p-4 bg-[#334155] rounded-lg">
//       <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 flex-1">
//         <div className="relative flex-1">
//           <input
//             type="text"
//             placeholder="Buscar emisoras..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="p-2 pl-10 rounded bg-[#1E1E1E] text-[#F1F5F9] border border-[#F97316] focus:outline-none focus:ring-2 focus:ring-[#F97316] w-full"
//           />
//           <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#F97316]" />
//         </div>
//         <select
//           value={country}
//           onChange={(e) => setCountry(e.target.value)}
//           className="p-2 rounded bg-[#1E1E1E] text-[#F1F5F9] border border-[#F97316] focus:outline-none focus:ring-2 focus:ring-[#F97316]"
//         >
//           <option value="">Seleccionar país</option>
//           {countries.map((c) => (
//             <option key={c.iso_3166_1} value={c.name}>
//               {c.name}
//             </option>
//           ))}
//         </select>
//         <select
//           value={language}
//           onChange={(e) => setLanguage(e.target.value)}
//           className="p-2 rounded bg-[#1E1E1E] text-[#F1F5F9] border border-[#F97316] focus:outline-none focus:ring-2 focus:ring-[#F97316]"
//         >
//           <option value="">Seleccionar idioma</option>
//           {languages.map((l) => (
//             <option key={l.name} value={l.name}>
//               {l.name}
//             </option>
//           ))}
//         </select>
//         <button
//           type="submit"
//           className="bg-[#F97316] text-white py-2 px-4 rounded hover:bg-opacity-80 transition"
//         >
//           Filtrar
//         </button>
//       </form>
//     </div>
//   );
// }


import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function RadioFilters({ onFilterChange }) {
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange({ search });
  };

  return (
    <div className="flex flex-col gap-4 mb-6 p-4 bg-[#334155] rounded-lg">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Buscar emisoras..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 pl-10 rounded bg-[#1E1E1E] text-[#F1F5F9] border border-[#F97316] focus:outline-none focus:ring-2 focus:ring-[#F97316] w-full"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#F97316]" />
        </div>
        <button
          type="submit"
          className="bg-[#F97316] text-white py-2 px-4 rounded hover:bg-opacity-80 transition"
        >
          Buscar
        </button>
      </form>
    </div>
  );
}