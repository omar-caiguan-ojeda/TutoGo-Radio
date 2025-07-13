// // src/app/providers.jsx
// "use client";

// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// const queryClient = new QueryClient();

// export default function Providers({ children }) {
//   return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
// }


"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Crear una instancia de QueryClient para manejar las consultas de la API
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutos de caché por defecto
      refetchOnWindowFocus: false, // Evitar recargas automáticas
    },
  },
});

export default function Providers({ children }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}