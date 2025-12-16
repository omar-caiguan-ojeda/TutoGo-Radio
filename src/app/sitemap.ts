export default function sitemap() {
  const baseUrl = 'https://tutogo-radio.vercel.app'; // Reemplazar con dominio real

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    // Si tuvieramos rutas dinámicas como /radio/[id], las generaríamos aquí.
  ];
}
