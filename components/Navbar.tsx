"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import { FaPlay, FaPause } from "react-icons/fa";
import { useTheme } from "next-themes";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => setMounted(true), []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "project", label: "Project" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav className="fixed w-full z-50 bg-white/80 dark:bg-[#050B16]/90 backdrop-blur text-black dark:text-white shadow-md transition-colors duration-300">
      {/* elemen audio (tidak terlihat tapi tetap aktif) */}
      <audio ref={audioRef} src="/music/bgm.mp3" loop />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <div className="flex-shrink-0">
            <Link href="#home" className="flex items-center space-x-2">
              <img
                src="/logo.png"
                alt="Logo"
                className="h-12 w-12 md:h-16 md:w-16 lg:h-20 lg:w-20"
              />
              <span className="text-xl font-bold">Portfolio</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={`#${link.id}`}
                className="hover:text-cyan-500 dark:hover:text-cyan-300 transition"
              >
                {link.label}
              </Link>
            ))}

            {/* Toggle Theme */}
            {mounted && (
              <>
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="px-3 py-1 rounded bg-cyan-400 text-black dark:bg-gray-800 dark:text-cyan-300 transition"
                >
                  {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
                </button>

                {/* Tombol Musik */}
                <button
                  onClick={toggleMusic}
                  className="p-2 rounded-full bg-gray-800 dark:bg-cyan-400 text-cyan-400 dark:text-black hover:scale-110 transition-transform"
                >
                  {isPlaying ? <FaPause /> : <FaPlay />}
                </button>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="focus:outline-none">
              {isOpen ? <FiX size={26} /> : <FiMenu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-[#050B16] px-4 pt-2 pb-4 space-y-1 transition-colors">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={`#${link.id}`}
              className="block px-3 py-2 rounded hover:bg-cyan-300 hover:text-black dark:hover:bg-cyan-400 dark:hover:text-black transition"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          {/* Toggle Theme (Mobile) */}
          {mounted && (
            <>
              <button
                onClick={() => {
                  setTheme(theme === "dark" ? "light" : "dark");
                  setIsOpen(false);
                }}
                className="mt-2 w-full px-3 py-2 rounded bg-cyan-400 text-black dark:bg-gray-800 dark:text-cyan-300 transition"
              >
                {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
              </button>

              {/* Tombol Musik (Mobile) */}
              <button
                onClick={toggleMusic}
                className="mt-2 w-full px-3 py-2 rounded bg-gray-800 dark:bg-cyan-400 text-cyan-400 dark:text-black transition"
              >
                {isPlaying ? "⏸ Pause Music" : "▶️ Play Music"}
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
