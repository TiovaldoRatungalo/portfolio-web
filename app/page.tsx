"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Navbar from "../components/Navbar";
import ShinyText from "../components/ShinyText";
import RotatingText from "../components/RotatingText";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandInstagram,
  IconBrandGithub,
  IconBrandX,
  IconBrandLinkedin,
} from "@tabler/icons-react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
} from "react-icons/si";
import emailjs from "@emailjs/browser";
import LoadingScreen from "../components/LoadingScreen";

// 🧠 Lazy load components berat
const ElectricBorder = dynamic(() => import("../components/ElectricBorder"), {
  ssr: false,
});
const ScrollVelocity = dynamic(() => import("../components/ScrollVelocity"), {
  ssr: false,
});
const LogoLoop = dynamic(() => import("../components/LogoLoop"), {
  ssr: false,
});
const Landyard = dynamic(() => import("../components/Landyard/Landyard"), {
  ssr: false,
});

export default function Home() {
  const [lang, setLang] = useState<"en" | "id">("en");
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const skillsRef = useRef<HTMLDivElement | null>(null);
  const contactRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [isClient, setIsClient] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setIsClient(true);

    // 💤 Pause animasi saat tab tidak aktif
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.body.classList.add("paused");
      } else {
        document.body.classList.remove("paused");
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  const isSkillsInView = useInView(skillsRef, { once: true, amount: 0.4 });
  // 👉 LogoLoop data
  const techLogos = [
    {
      node: <SiReact className="w-12 h-12" style={{ color: "#61DAFB" }} />,
      title: "React",
      href: "https://react.dev",
    },
    {
      node: <SiNextdotjs className="w-12 h-12 text-black dark:text-white" />,
      title: "Next.js",
      href: "https://nextjs.org",
    },
    {
      node: <SiTypescript className="w-12 h-12" style={{ color: "#3178C6" }} />,
      title: "TypeScript",
      href: "https://www.typescriptlang.org",
    },
    {
      node: (
        <SiTailwindcss className="w-12 h-12" style={{ color: "#06B6D4" }} />
      ),
      title: "Tailwind CSS",
      href: "https://tailwindcss.com",
    },
  ];

  const [selected, setSelected] = useState<number | null>(null);
  const isPaused = selected !== null;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const projects = [
    {
      image: "/images/1.png",
      title: "Mobile App Development",
      description:
        "AI Virtual Assistant the chatbot provides information about doctor schedules, room locations, and hospital services using voice input and output.",
      tools:
        "Android Studio, React Native, Java, Speech Recognition, Speech Synthesis",
    },
    {
      image: "/images/2.png",
      title: "3D Modeling",
      description:
        "Creation of a 3D car model in Blender as an asset for games or animation projects.",
      tools: "Blender",
    },

    {
      image: "/images/3.png",
      title: "Game Development",
      description:
        "A 3D Energy Ball game with shader effects and dynamic lighting. Designed to learn object physics control in a 3D environment.",
      tools: "Unity, C#",
    },
    {
      image: "/images/4.png",
      title: "Game Development",
      description: "Development of a simple 3D game using Unity.",
      tools: "Unity, C#",
    },
    {
      image: "/images/5.png",
      title: "Game Development",
      description:
        "Development of a 2D platformer game with light and particle effects using Unity. Focused on jumping mechanics and item collection.",
      tools: "Unity,C#",
    },
    {
      image: "/images/6.png",
      title: "Game Development",
      description: "3D Airplane Controller game developed in Unity.",
      tools: "Unity, C#",
    },
    {
      image: "/images/7.png",
      title: "Game Development",
      description:
        "A 3D Ball Collector game where players control a ball to collect objects in an arena.",
      tools: "Unity, C#",
    },
    {
      image: "/images/8.png",
      title: "Robotics",
      description:
        "Robotics project using Webots Simulator. The E-puck robot is programmed in C to read distance sensors and move autonomously within the simulation arena.",
      tools: "C, Webots Simulator",
    },
    {
      image: "/images/9.png",
      title: "Game Interface",
      description:
        "Design of a simple game main menu interface with three main buttons: Start, Settings, and Exit.",
      tools: "Unity UI Toolkit",
    },
  ];

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_6j85ogl",
        "template_fdxb0jx",
        formRef.current!,
        "4ri5HHBGbOfcnjLKe"
      )
      .then(
        () => {
          alert("Message sent! Thank you.");
          formRef.current!.reset();
        },
        (error: any) => {
          alert("Failed to send message. Try again later.");
          console.error(error);
        }
      );
  };
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <>
      {/* ===== LOADING SCREEN ===== */}
      <LoadingScreen />

      <div className="font-sans snap-y snap-mandatory scroll-smooth bg-white text-black dark:bg-[#050B16] dark:text-gray-200 transition-colors duration-300">
        {/* ====== NAVBAR ====== */}
        <Navbar />

        {/* ===== HERO SECTION ===== */}
        <section
          id="home"
          className="snap-start min-h-screen grid grid-cols-1 lg:grid-cols-2 items-center justify-center p-6 lg:p-12 gap-y-6 lg:gap-x-12"
        >
          {/* LEFT */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-2">
            <div className="w-full text-base sm:text-lg lg:text-3xl font-bold flex flex-wrap items-center justify-center lg:justify-start gap-y-1 sm:gap-x-2 leading-snug">
              <span>I am ready for job</span>
              <RotatingText
                texts={[
                  "Front-End Developer",
                  "IT Support",
                  "Cyber Security Analyst",
                ]}
                mainClassName="px-2 bg-cyan-300 text-black rounded-md inline-flex items-center text-base sm:text-lg lg:text-3xl font-bold"
                staggerFrom="last"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={4000}
              />
            </div>

            <ShinyText
              text="Tiovaldo Ratungalo"
              speed={5}
              className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-cyan-300"
            />

            <p className="max-w-md md:max-w-xl text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed text-center lg:text-left">
              Computer Science Graduate | Welcome to my portfolio
            </p>

            <div className="flex gap-3 mt-2 flex-wrap justify-center lg:justify-start">
              <a
                href="#contact"
                className="px-4 py-2 bg-cyan-400 text-black font-semibold rounded-md hover:bg-cyan-500 transition text-sm sm:text-base"
              >
                Contact Me
              </a>
              <a
                href="/CV_Tiovaldo Ratungalo.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 border border-cyan-400 text-cyan-300 rounded-md hover:bg-cyan-500/10 transition text-sm sm:text-base"
              >
                Download CV
              </a>
            </div>
          </div>

          {/* RIGHT IMAGE (Lazy Animated Border) */}
          <div className="flex items-center justify-center">
            {isClient && (
              <ElectricBorder
                color="#67E8F9"
                speed={isMobile ? 0.6 : 1.2}
                chaos={isMobile ? 0.3 : 0.6}
                thickness={2}
                style={{ borderRadius: "50%", padding: "6px" }}
              >
                <img
                  src="/profil.png"
                  alt="Tiovaldo"
                  className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[28rem] lg:h-[28rem] rounded-full object-cover object-top"
                  loading="lazy"
                />
              </ElectricBorder>
            )}
          </div>
        </section>

        {/* ====== SCROLL TEXT (About Me) ====== */}
        <section className="snap-start py-6 bg-transparent flex flex-col gap-2">
          <ScrollVelocity
            texts={["About Me", "About Me"]}
            velocity={30}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-cyan-300 uppercase tracking-wide"
          />
        </section>

        {/* ====== ABOUT ====== */}
        <section
          id="about"
          ref={aboutRef}
          className="snap-start min-h-screen bg-gray-50 text-black dark:bg-[#0A0F1E] dark:text-white p-6 lg:p-12 flex flex-col lg:flex-row items-stretch gap-8 transition-colors duration-300"
        >
          {/* About text */}
          <motion.div
            className="lg:w-1/2 flex flex-col justify-center"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <motion.div className="bg-white/90 dark:bg-[#0C1424] dark:bg-opacity-70 p-5 rounded-xl shadow-md border border-gray-200 dark:border-cyan-400 dark:border-opacity-20 transition-colors">
              <div className="text-gray-700 dark:text-gray-300 text-justify space-y-4">
                <p>
                  Hello, My name is Tiovaldo Sindovan Ratungalo.I graduated with
                  a Bachelor’s degree in Computer Science from Universitas
                  Klabat in 2024. I have a strong interest in technology,
                  programming, and cybersecurity. My passion for AI development
                  and front-end web design continues to grow.
                </p>
                <p>
                  Currently, I am focusing on exploring the world of trading,
                  especially in market analysis and digital risk management. I
                  see this field as an exciting combination of logic, strategy,
                  and technology, which aligns with my analytical skills in
                  computer science.
                </p>
              </div>

              {/* ===== Skill Title ===== */}
              <h2 className="text-2xl font-bold text-cyan-300 mt-6 mb-4">
                My Skills
              </h2>

              {/* ===== Skill Bars ===== */}
              <div className="space-y-4">
                {[
                  { skill: "Game Development", level: 65 },
                  { skill: "Web Development", level: 70 },
                  { skill: "Mobile Development", level: 65 },
                  { skill: "MS Office", level: 90 },
                  { skill: "Trader", level: "?" },
                  { skill: "Cybersecurity", level: "?" },
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                      <span>{item.skill}</span>
                      <span>{item.level}%</span>
                    </div>
                    <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-3">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: index * 0.3 }}
                        className="h-3 bg-cyan-400 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Profile Image */}
          <motion.div
            className="lg:w-1/2 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "loop",
              type: "tween",
            }}
          >
            <div className="w-full max-w-sm">
              <img
                src="/about.png"
                alt="Tiovaldo"
                className="w-full h-auto object-cover shadow-lg border-2 border-cyan-300 rounded-xl"
              />
            </div>
          </motion.div>
        </section>

        <section
          id="project"
          ref={skillsRef}
          className="relative snap-start min-h-screen bg-gray-100 text-black dark:bg-[#0C1424] dark:text-white 
  p-6 lg:p-12 flex flex-col lg:flex-row items-stretch gap-8 overflow-visible transition-colors duration-300"
        >
          {/* ====== LANDYARD (kiri) ====== */}
          <div className="lg:w-1/2 flex items-start justify-center relative z-0 pointer-events-none">
            <div className="w-full h-full">
              {isClient && isSkillsInView && (
                <Landyard position={[0, 0, 12]} gravity={[0, -35, 0]} />
              )}
            </div>
          </div>
          {/* ====== PROJECTS (kanan) ====== */}
          <div className="lg:w-1/2 flex flex-col items-center justify-start relative z-10 w-full mb-16 lg:mb-24 pt-12 sm:pt-16">
            {/* Title */}
            <motion.h2
              className="mt-8 text-3xl sm:text-5xl lg:text-6xl text-center font-extrabold text-cyan-300 dark:text-[#67E8F9] uppercase mb-6 relative neon"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Projects
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              className="text-cyan-200 mb-8 text-center sm:text-lg"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            ></motion.p>

            {/* Grid Projects */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full px-4 sm:px-0 transition-all duration-500 justify-items-center">
              {projects.slice(currentIndex, currentIndex + 2).map((proj, i) => {
                const globalIndex = currentIndex + i;
                const isActive = globalIndex === activeIndex;

                const handleClick = () => {
                  setActiveIndex((prev) =>
                    prev === globalIndex ? null : globalIndex
                  );
                };

                return (
                  <div key={i} className="flex flex-col items-center">
                    {/* Card */}
                    <motion.div
                      onClick={handleClick}
                      className={`relative cursor-pointer rounded-2xl overflow-hidden border border-cyan-300 shadow-md transition-all duration-500
              ${isActive ? "z-20" : "z-10 opacity-90"} project-card
              w-[88vw] sm:w-[300px] md:w-[340px] lg:w-[380px] aspect-[4/3]`}
                      animate={{
                        scale: isActive ? 1.05 : 0.95,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 150,
                        damping: 18,
                      }}
                      whileHover={!isActive ? { scale: 1 } : {}}
                    >
                      {/* Gambar Project */}
                      <motion.img
                        src={proj.image}
                        alt={`Project ${globalIndex + 1}`}
                        className="w-full h-full object-cover transition-transform duration-700"
                        animate={{
                          scale: isActive ? 1.15 : 1,
                        }}
                        transition={{ duration: 0.5 }}
                      />

                      {/* Overlay info toggle */}
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4 }}
                          className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-center p-4"
                        >
                          <h3 className="text-cyan-300 font-semibold text-lg mb-1">
                            {proj.title}
                          </h3>
                          <p className="text-cyan-100 text-sm mb-2">
                            {proj.description}
                          </p>
                          <span className="text-xs text-cyan-400 italic">
                            Tools: {proj.tools}
                          </span>
                          <p className="text-[10px] mt-2 opacity-80">
                            (Click again to close)
                          </p>
                        </motion.div>
                      )}
                    </motion.div>
                  </div>
                );
              })}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-6 mt-10">
              <button
                onClick={() => {
                  setCurrentIndex((prev) => Math.max(prev - 1, 0));
                  setActiveIndex(null);
                }}
                disabled={currentIndex === 0}
                className={`px-4 py-2 rounded-lg border border-cyan-300 text-cyan-300 
        hover:bg-cyan-300 hover:text-black transition-all duration-300
        ${currentIndex === 0 ? "opacity-40 cursor-not-allowed" : ""}`}
              >
                ← Previous
              </button>

              <button
                onClick={() => {
                  setCurrentIndex((prev) =>
                    prev + 1 < projects.length ? prev + 1 : prev
                  );
                  setActiveIndex(null);
                }}
                disabled={currentIndex + 2 >= projects.length}
                className={`px-4 py-2 rounded-lg border border-cyan-300 text-cyan-300 
        hover:bg-cyan-300 hover:text-black transition-all duration-300
        ${
          currentIndex + 2 >= projects.length
            ? "opacity-40 cursor-not-allowed"
            : ""
        }`}
              >
                Next →
              </button>
            </div>
          </div>
        </section>

        {/* LOGO LOOP tetap */}
        <section className="snap-start bg-white dark:bg-[#050B16] py-8 sm:py-12 flex justify-center transition-colors duration-300">
          <LogoLoop
            logos={techLogos}
            speed={120}
            direction="left"
            logoHeight={60} // sebelumnya 60
            gap={60}
            pauseOnHover
            scaleOnHover
            fadeOut
            ariaLabel="Technology partners"
          />
        </section>

        <section
          id="contact"
          ref={contactRef}
          className="snap-start min-h-screen relative overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100 dark:from-[#0A0F1E] dark:to-[#050B16] text-black dark:text-white p-6 lg:p-12 transition-colors duration-300 flex justify-center items-center"
        >
          {/* ===== Floating Dots ===== */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-cyan-400 rounded-full opacity-30"
              initial={{
                x: Math.random() * 800 - 400,
                y: Math.random() * 800 - 400,
              }}
              animate={{
                y: [0, -20, 0],
                x: [0, 20, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                repeat: Infinity,
                duration: 6 + Math.random() * 4,
                delay: i * 0.5,
              }}
            />
          ))}

          <motion.div
            className="w-full max-w-xl bg-white/90 dark:bg-[#0C1424] dark:bg-opacity-70 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-cyan-400 dark:border-opacity-20 relative z-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            whileHover={{ scale: 1.02 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-cyan-300 text-center">
              Contact Me
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6 text-center">
              Send me a message and I will get back to you as soon as possible.
            </p>

            <form
              ref={formRef}
              onSubmit={sendEmail}
              className="grid grid-cols-1 gap-4"
            >
              <input
                name="user_name"
                placeholder="Your name"
                className="p-3 rounded-lg bg-white border border-gray-300 dark:bg-[#050B16] dark:border-cyan-400/20 dark:text-white focus:ring-2 focus:ring-cyan-400 transition-transform duration-300 focus:scale-105"
                required
              />
              <input
                name="user_email"
                placeholder="Your email"
                type="email"
                className="p-3 rounded-lg bg-white border border-gray-300 dark:bg-[#050B16] dark:border-cyan-400/20 dark:text-white focus:ring-2 focus:ring-cyan-400 transition-transform duration-300 focus:scale-105"
                required
              />
              <textarea
                name="message"
                placeholder="Your message"
                className="p-3 rounded-lg bg-white border border-gray-300 dark:bg-[#050B16] dark:border-cyan-400/20 dark:text-white h-32 focus:ring-2 focus:ring-cyan-400 transition-transform duration-300 focus:scale-105 resize-none"
                required
              />
              <div className="flex justify-center">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-cyan-400 text-black font-semibold rounded-lg hover:bg-cyan-500 transition-all"
                >
                  Send Message
                </motion.button>
              </div>
            </form>
          </motion.div>
        </section>

        {/* ====== FOOTER ====== */}
        <footer className="bg-gray-200 dark:bg-[#0A0F1C] py-10 border-t border-cyan-500/20 transition-colors duration-300">
          <div className="max-w-6xl mx-auto flex flex-col items-center">
            <FloatingDock
              mobileClassName="hidden"
              desktopClassName="
        backdrop-blur-md rounded-2xl p-2 flex gap-4 shadow-lg
        bg-white/80 border border-gray-300/50
        dark:bg-[#0F172A]/80 dark:border-cyan-500/30
      "
              items={[
                {
                  title: "Instagram",
                  icon: (
                    <IconBrandInstagram className="h-full w-full text-gray-400 hover:text-cyan-400 transition-colors" />
                  ),
                  href: "https://www.instagram.com/tiovaldoo?igsh=MWcxbHdyejNtdm4xdg==",
                },
                {
                  title: "Github",
                  icon: (
                    <IconBrandGithub className="h-full w-full text-gray-400 hover:text-cyan-400 transition-colors" />
                  ),
                  href: "https://github.com/TiovaldoRatungalo",
                },
                {
                  title: "X",
                  icon: (
                    <IconBrandX className="h-full w-full text-gray-400 hover:text-cyan-400 transition-colors" />
                  ),
                  href: "https://discord.gg/yourinvite",
                },
                {
                  title: "LinkedIn",
                  icon: (
                    <IconBrandLinkedin className="h-full w-full text-gray-400 hover:text-cyan-400 transition-colors" />
                  ),
                  href: "https://linkedin.com/in/yourusername",
                },
              ]}
            />

            <p className="mt-6 text-sm text-gray-600 dark:text-gray-400 text-center">
              {new Date().getFullYear()} • Tiovaldo Ratungalo • Crafted with
              TypeScript, Tailwind CSS, Next.js, React
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
