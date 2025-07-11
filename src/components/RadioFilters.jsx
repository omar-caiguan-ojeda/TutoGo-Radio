// // src/components/RadioFilters.jsx
// import { useState, useEffect } from "react";
// import { useTranslation } from "next-i18next";
// import { FaSearch } from "react-icons/fa";
// import axios from "axios";

// export default function RadioFilters({ onFilterChange }) {
//   const { t, i18n } = useTranslation("common");
//   const [country, setCountry] = useState("");
//   const [language, setLanguage] = useState("");
//   const [search, setSearch] = useState("");
//   const [countries, setCountries] = useState([]);
//   const [languages, setLanguages] = useState([]);

//   useEffect(() => {
//     // Cargar países
//     axios.get("https://de1.api.radio-browser.info/json/countries")
//       .then((response) => setCountries(response.data))
//       .catch((error) => console.error("Error fetching countries:", error));

//     // Cargar lenguajes
//     axios.get("https://de1.api.radio-browser.info/json/languages")
//       .then((response) => setLanguages(response.data))
//       .catch((error) => console.error("Error fetching languages:", error));
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onFilterChange({ country, language, search });
//   };

//   const handleLanguageChange = (e) => {
//     i18n.changeLanguage(e.target.value);
//   };

//   return (
//     <div className="flex flex-col sm:flex-row gap-4 mb-6 p-4 bg-[#334155] rounded-lg relative">
//       <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 flex-1">
//         <div className="relative flex-1">
//           <input
//             type="text"
//             placeholder={t("searchPlaceholder")}
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
//           <option value="">{t("countryPlaceholder")}</option>
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
//           <option value="">{t("languagePlaceholder")}</option>
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
//           {t("filterButton")}
//         </button>
//       </form>
//       <select
//         onChange={handleLanguageChange}
//         value={i18n.language}
//         className="absolute right-4 top-4 p-2 rounded bg-[#1E1E1E] text-[#F1F5F9] border border-[#F97316] focus:outline-none"
//       >
//         <option value="es">Español</option>
//         <option value="en">English</option>
//         <option value="pt">Português</option>
//       </select>
//     </div>
//   );
// }



import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

export default function RadioFilters({ onFilterChange }) {
  const [country, setCountry] = useState("");
  const [language, setLanguage] = useState("");
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    // Cargar países
    axios.get("https://de1.api.radio-browser.info/json/countries")
      .then((response) => setCountries(response.data))
      .catch((error) => console.error("Error al obtener países:", error));

    // Cargar lenguajes
    axios.get("https://de1.api.radio-browser.info/json/languages")
      .then((response) => setLanguages(response.data))
      .catch((error) => console.error("Error al obtener lenguajes:", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange({ country, language, search });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6 p-4 bg-[#334155] rounded-lg">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 flex-1">
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
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="p-2 rounded bg-[#1E1E1E] text-[#F1F5F9] border border-[#F97316] focus:outline-none focus:ring-2 focus:ring-[#F97316]"
        >
          <option value="">Seleccionar país</option>
          {countries.map((c) => (
            <option key={c.iso_3166_1} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="p-2 rounded bg-[#1E1E1E] text-[#F1F5F9] border border-[#F97316] focus:outline-none focus:ring-2 focus:ring-[#F97316]"
        >
          <option value="">Seleccionar idioma</option>
          {languages.map((l) => (
            <option key={l.name} value={l.name}>
              {l.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-[#F97316] text-white py-2 px-4 rounded hover:bg-opacity-80 transition"
        >
          Filtrar
        </button>
      </form>
    </div>
  );
}