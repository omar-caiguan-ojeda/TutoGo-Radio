import { Poppins, Luckiest_Guy } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});

const luckiestGuy = Luckiest_Guy({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-luckiest",
});

export async function generateMetadata() {
  const title = "TutoGo Radio | Escucha Emisoras Online de Chile y el Mundo";
  const description = "Explorá y escucha tus emisoras favoritas con una experiencia visual única. TutoGo Radio te ofrece radio online con efectos inmersivos y la mejor calidad de audio.";
  
  return {
    title: {
      default: title,
      template: `%s | TutoGo Radio`
    },
    description: description,
    keywords: ["radio online", "emisoras chile", "radio fm", "musica online", "tutogo", "streaming radio", "radio en vivo"],
    authors: [{ name: "Omar Caiguan", url: "https://omar-caiguan.vercel.app/" }],
    creator: "GEM IT",
    metadataBase: new URL("https://tutogo-radio.vercel.app"), // Reemplazar con URL real de producción si existe
    openGraph: {
      type: "website",
      locale: "es_CL",
      url: "https://tutogo-radio.vercel.app",
      title: title,
      description: description,
      siteName: "TutoGo Radio",
      images: [{
        url: "/iconLogoBrowser.png", // Idealmente una imagen OG más grande 1200x630
        width: 800,
        height: 600,
        alt: "TutoGo Radio Logo",
      }],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: ["/iconLogoBrowser.png"],
      creator: "@OmarCaiguan", 
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: "/iconLogoBrowser.png",
      shortcut: "/iconLogoBrowser.png",
      apple: "/iconLogoBrowser.png",
    },
  };
}

export default async function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MusicGroup", // Or RadioStation if strict
    "name": "TutoGo Radio",
    "url": "https://tutogo-radio.vercel.app",
    "logo": "https://tutogo-radio.vercel.app/iconLogoBrowser.png",
    "description": "Plataforma de radio online inmersiva con efectos visuales y emisoras de todo el mundo.",
    "sameAs": [
      "https://www.linkedin.com/in/omar-leonardo-caiguan-ojeda/",
      "https://github.com/omar-caiguan"
    ]
  };

  return (
    <html lang="es" className={`${poppins.variable} ${luckiestGuy.variable}`}>
      <head>
        <link rel="icon" href="/iconLogoBrowser.png" />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}