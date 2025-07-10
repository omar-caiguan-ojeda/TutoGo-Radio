// "use client";

// import { useState } from "react";
// import emisoras from "@/data/emisoras.json";
// // import RadioCard from "@/components/RadioCard";
// // import RadioPlayer from "@/components/RadioPlayer";
// import RadioCard from "../components/RadioCard";
// import RadioPlayer from "../components/RadioPlayer";

// export default function Home() {
//   const [emisoraActual, setEmisoraActual] = useState(null);

//   return (
//     <div className="min-h-screen bg-oscuro text-claro font-sans p-6">
//       <h1 className="text-4xl font-bold text-tutonaranja mb-4 text-center">
//         🐱 TutoGo Radio
//       </h1>
//       <p className="text-center mb-6">Explorá y escuchá tus emisoras favoritas</p>

//       <div className="flex flex-wrap gap-4 justify-center">
//         {emisoras.map((radio) => (
//           <RadioCard key={radio.id} radio={radio} onPlay={setEmisoraActual} />
//         ))}
//       </div>

//       <RadioPlayer current={emisoraActual} />
//     </div>
//   );
// }

// app/page.jsx
"use client";

import { useState } from "react";
import emisoras from "@/data/emisoras.json";
import RadioCard from "../components/RadioCard";
import RadioPlayer from "../components/RadioPlayer";

export default function Home() {
  const [emisoraActual, setEmisoraActual] = useState(null);

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-[#F1F5F9] font-sans p-6">
      <h1 className="text-4xl font-bold text-[#F97316] mb-4 text-center">
        🐱 TutoGo Radio
      </h1>
      <p className="text-center mb-6">Explorá y escuchá tus emisoras favoritas</p>

      <div className="flex flex-wrap gap-4 justify-center">
        {emisoras.map((radio) => (
          <RadioCard key={radio.id} radio={radio} onPlay={setEmisoraActual} />
        ))}
      </div>

      <RadioPlayer current={emisoraActual} />
    </div>
  );
}