import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- DATA DUMMY ---
const EXPERIENCE_DATA = [
  {
    id: 1,
    role: "Senior Fullstack",
    company: "Tech Corp",
    period: "2024 - Now",
    desc: "Memimpin arsitektur Microservices.",
    tech: ["Laravel", "React", "AWS"],
    color: "from-blue-500 to-cyan-400"
  },
  {
    id: 2,
    role: "Backend Dev",
    company: "Digital Agency",
    period: "2022 - 2024",
    desc: "Optimasi Database & API High-Traffic.",
    tech: ["PHP", "Redis", "Go"],
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 3,
    role: "Web Developer",
    company: "Freelance",
    period: "2021 - 2022",
    desc: "Membangun 15+ Website UMKM.",
    tech: ["WordPress", "SEO", "JS"],
    color: "from-emerald-400 to-green-600"
  },
  {
    id: 4,
    role: "Internship",
    company: "Univ Lab",
    period: "2020 - 2021",
    desc: "1. I worked at a coffee shop during the summer to gain experience.\n" +
        "2. My responsibilities included taking orders, making drinks, and ensuring customer satisfaction every day.\n" +
        "3. I learned to work quickly and efficiently in a fast-paced environment.\n" +
        "4. Teamwork was crucial, as we often helped each other during busy rush hours.\n" +
        "5. This experience taught me valuable skills that I will use in my career.",
    tech: ["Python", "TensorFlow"],
    color: "from-orange-400 to-red-500"
  },
  {
    id: 4,
    role: "Internship",
    company: "Univ Lab",
    period: "2020 - 2021",
    desc: "Research Assistant AI & Python.",
    tech: ["Python", "TensorFlow"],
    color: "from-orange-400 to-red-500"
  },
  {
    id: 4,
    role: "Internship",
    company: "Univ Lab",
    period: "2020 - 2021",
    desc: "Research Assistant AI & Python.",
    tech: ["Python", "TensorFlow"],
    color: "from-orange-400 to-red-500"
  },
  {
    id: 4,
    role: "Internship",
    company: "Univ Lab",
    period: "2020 - 2021",
    desc: "Research Assistant AI & Python.",
    tech: ["Python", "TensorFlow"],
    color: "from-orange-400 to-red-500"
  },
];

export default function ExperienceReactor() {
  const [rotation, setRotation] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const cardCount = EXPERIENCE_DATA.length;
  const theta = 360 / cardCount; // Sudut antar kartu
  const radius = 350; // Jarak kartu dari titik tengah (Makin besar makin lebar carouselnya)

  const rotate = (direction: "left" | "right") => {
    const newRotation = direction === "left" ? rotation + theta : rotation - theta;
    setRotation(newRotation);

    // Hitung active index berdasarkan rotasi
    const rawIndex = Math.round((newRotation / theta) * -1) % cardCount;
    const normalizedIndex = rawIndex < 0 ? rawIndex + cardCount : rawIndex;
    setActiveIndex(normalizedIndex);
  };

  return (
    <section className="relative h-screen bg-[#050914] overflow-hidden flex flex-col items-center justify-center">

      {/* Background Grid Hiasan */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>

      {/* Judul */}
      <div className="absolute top-10 text-center z-10">
        <h2 className="text-4xl font-bold text-white mb-2 tracking-tighter">
          REACTOR <span className="text-lara-blue">CORE</span>
        </h2>
        <p className="text-slate-400 text-sm font-mono">
          &lt; DRAG OR CLICK TO ROTATE DATA /&gt;
        </p>
      </div>

      {/* === THE 3D CAROUSEL SCENE === */}
      <div className="relative w-full max-w-4xl h-[500px] flex items-center justify-center [perspective:1000px]">

        <motion.div
          className="relative w-64 h-80 [transform-style:preserve-3d]"
          animate={{ rotateY: rotation }}
          transition={{ type: "spring", stiffness: 50, damping: 15 }}
        >
          {EXPERIENCE_DATA.map((exp, index) => {
             // Hitung sudut tiap kartu
             const angle = theta * index;

             return (
              <div
                key={exp.id}
                className="absolute inset-0 w-full h-full"
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                }}
              >
                {/* KARTU VISUAL */}
                <div
                    className={`
                        w-full h-full bg-[#0a101f]/90 backdrop-blur-md border-2 rounded-xl p-6 flex flex-col justify-between select-none
                        transition-all duration-500
                        ${activeIndex === index 
                            ? `border-white shadow-[0_0_50px_rgba(59,130,246,0.4)] scale-110 z-20` 
                            : "border-white/10 opacity-40 grayscale scale-90"}
                    `}
                >
                  {/* Header */}
                  <div>
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${exp.color} mb-4 shadow-lg flex items-center justify-center text-white font-bold`}>
                        {exp.id}
                    </div>
                    <h3 className="text-xl font-bold text-white leading-tight mb-1">{exp.role}</h3>
                    <div className="text-xs font-mono text-lara-blue mb-2">@{exp.company}</div>
                  </div>

                  {/* Content (Hanya muncul jelas kalau aktif) */}
                  <div className={`transition-opacity duration-300 ${activeIndex === index ? "opacity-100" : "opacity-0"}`}>
                    <p className="text-slate-300 text-xs leading-relaxed mb-4">
                        {exp.desc}
                    </p>
                    <div className="flex flex-wrap gap-1">
                        {exp.tech.map((t, i) => (
                             <span key={i} className="text-[10px] px-2 py-1 bg-white/10 rounded text-white/70">{t}</span>
                        ))}
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* --- CORE GLOW (Titik Tengah) --- */}
        <div className="absolute w-[400px] h-[50px] bg-lara-blue/20 blur-[60px] rounded-full bottom-[-40px] pointer-events-none"></div>

      </div>

      {/* CONTROLS (Buttons) */}
      <div className="absolute bottom-20 flex gap-8 z-20">
        <button
            onClick={() => rotate("left")}
            className="w-14 h-14 rounded-full border border-white/20 bg-white/5 text-white hover:bg-lara-blue hover:border-lara-blue transition-all flex items-center justify-center text-2xl"
        >
            ←
        </button>
        <button
            onClick={() => rotate("right")}
            className="w-14 h-14 rounded-full border border-white/20 bg-white/5 text-white hover:bg-lara-blue hover:border-lara-blue transition-all flex items-center justify-center text-2xl"
        >
            →
        </button>
      </div>

    </section>
  );
}