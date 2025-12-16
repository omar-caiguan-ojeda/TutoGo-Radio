"use client";

import { motion } from "framer-motion";
import { FaLinkedin, FaEnvelope, FaWhatsapp, FaGlobe, FaFileAlt, FaBars } from "react-icons/fa";
import PawAnimation from "./PawAnimation";

export default function HeroSection({ toggleSidebar, isSidebarOpen }) {
  const socialLinks = [
    { href: "https://www.linkedin.com/in/omar-leonardo-caiguan-ojeda/", icon: <FaLinkedin />, delay: 0.1 },
    { href: "https://omar-caiguan.vercel.app/", icon: <FaGlobe />, delay: 0.2 },
    { href: "mailto:omar.caiguan@gmail.com", icon: <FaEnvelope />, delay: 0.3 },
    { href: "https://wa.me/+56930579869", icon: <FaWhatsapp />, delay: 0.4 },
    { href: "https://drive.google.com/file/d/1JU3sMX3lCxJvKdDRsAvTvntZaYxaS0ET/view?usp=drive_link", icon: <FaFileAlt />, delay: 0.5 },
  ];

  return (
    <div className="w-full flex flex-col items-center mb-8 relative z-10">
      
      {/* Top Bar with Logo & Socials */}
      <div className="w-full flex justify-between items-center py-4 px-2 sm:px-0">
        
        {/* Logo Area */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center gap-4"
        >
          <motion.img
            src="/iconLogo.PNG"
            alt="TutoGo Radio Logo"
            className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]"
            animate={{ rotate: [0, 5, 0, -5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="flex flex-col relative">
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-tutonaranja tracking-wide drop-shadow-md">
              TutoGo Radio
            </h1>
            <PawAnimation />
          </div>
        </motion.div>

        {/* Social Links (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          {socialLinks.map((link, idx) => (
            <motion.a
              key={idx}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 + link.delay, type: "spring" }}
              whileHover={{ scale: 1.2, rotate: 10, color: "#fff" }}
              className="text-2xl text-tutonaranja hover:text-white transition-colors p-2 glass-panel rounded-full"
            >
              {link.icon}
            </motion.a>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleSidebar}
          className="md:hidden text-tutonaranja text-2xl p-2 glass-panel rounded-lg active:scale-95"
          aria-label="Toggle Sidebar"
        >
          <FaBars />
        </button>
      </div>

      {/* Hero Text / Credits */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center mt-2 max-w-2xl px-4"
      >
        <div className="flex items-center justify-center gap-2 text-slate-400 text-sm mb-2 opacity-80">
          <span>Desarrollado por Omar Caiguan para</span>
          <img src="/Geminis.svg" alt="GEM IT" className="w-5 h-5 invert opacity-70" />
          <span className="font-bold text-slate-200">GEM <span className="font-light text-tutonaranja">IT</span></span>
        </div>
        <p className="text-slate-400 text-sm italic">
          Descubre y escucha tus emisoras favoritas con una experiencia visual única.
        </p>
      </motion.div>
    </div>
  );
}
