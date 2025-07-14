import { Poppins } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});

export async function generateMetadata() {
  return {
    title: "TutoGo Radio",
    description: "Explorá y escuchá tus emisoras favoritas",
    icons: {
      icon: "/iconLogoBrowser.png",
    },
  };
}

export default async function RootLayout({ children }) {
  return (
    <html lang="es" className={poppins.variable}>
      <head>
        <link rel="icon" href="/iconLogoBrowser.png" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}