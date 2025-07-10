
// app/layout.js
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "TutoGo Radio",
  description: "Explorá y escuchá tus emisoras favoritas",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={poppins.variable}>
      <body>{children}</body>
    </html>
  );
}