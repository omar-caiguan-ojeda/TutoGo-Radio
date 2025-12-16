export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: 'https://tutogo-radio.vercel.app/sitemap.xml',
  };
}
