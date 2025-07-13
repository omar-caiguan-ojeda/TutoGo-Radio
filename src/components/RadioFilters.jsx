// // src/components/RadioFilters.jsx
// import { useState } from "react";
// import { FaSearch } from "react-icons/fa";

// export default function RadioFilters({ onFilterChange }) {
//   const [search, setSearch] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onFilterChange({ search });
//   };

//   return (
//     <div className="flex flex-col gap-2 mb-6 p-4 bg-[#334155] rounded-lg">
//       <form onSubmit={handleSubmit} className="flex flex-col gap-2">
//         <div className="relative w-full">
//           <input
//             type="text"
//             placeholder="Buscar emisoras..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="p-2 pl-10 rounded bg-[#1E1E1E] text-[#F1F5F9] border border-[#F97316] focus:outline-none focus:ring-2 focus:ring-[#F97316] w-full"
//           />
//           <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#F97316]" />
//         </div>
//         <button
//           type="submit"
//           className="bg-[#F97316] text-white py-2 px-4 rounded hover:bg-opacity-80 transition w-full hover:cursor-pointer"
//         >
//           Buscar
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
    <div className="flex flex-col gap-2 mb-4 sm:mb-6 p-3 sm:p-4 bg-[#334155] rounded-lg">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Buscar emisoras..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 pl-10 rounded bg-[#1E1E1E] text-[#F1F5F9] border border-[#F97316] focus:outline-none focus:ring-2 focus:ring-[#F97316] w-full text-sm sm:text-base"
            aria-label="Buscar emisoras"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#F97316] text-sm sm:text-base" />
        </div>
        <button
          type="submit"
          className="bg-[#F97316] text-white py-1 sm:py-2 px-3 sm:px-4 rounded hover:bg-opacity-80 transition w-full hover:cursor-pointer text-sm sm:text-base"
        >
          Buscar
        </button>
      </form>
    </div>
  );
}