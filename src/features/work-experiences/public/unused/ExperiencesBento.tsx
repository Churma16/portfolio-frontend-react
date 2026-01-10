import { motion } from "framer-motion";

// --- DATA DUMMY ---
const EXPERIENCE_DATA = [
    {
        id: 1,
        role: "Senior Fullstack Engineer",
        company: "Tech Startups Inc.",
        period: "2024 - Present",
        desc: "Architecting Microservices ecosystem. Mengoptimalkan React Core vitals hingga 98%.",
        tech: ["Laravel", "React", "AWS", "Docker"],
        status: "ACTIVE", // Hiasan status
        colSpan: "md:col-span-2", // Kartu ini lebar (Spesial)
    },
    {
        id: 2,
        role: "Backend Developer",
        company: "Digital Solution Agency",
        period: "2022 - 2024",
        desc: "Merancang API High-concurrency untuk klien korporat banking.",
        tech: ["PHP", "Redis", "Go"],
        status: "COMPLETED",
        colSpan: "md:col-span-1",
    },
    {
        id: 3,
        role: "Web Developer",
        company: "Freelance",
        period: "2021 - 2022",
        desc: "Development 15+ website UMKM dengan SEO Technical optimization.",
        tech: ["WordPress", "JS", "CSS"],
        status: "ARCHIVED",
        colSpan: "md:col-span-1",
    },
    {
        id: 4,
        role: "Internship AI",
        company: "Univ Lab",
        period: "2020 - 2021",
        desc: "Research Assistant untuk Computer Vision Project.",
        tech: ["Python", "Tensorflow"],
        status: "ARCHIVED",
        colSpan: "md:col-span-2",
    }
];

// Variabel animasi muncul berurutan
const containerVars = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2 // Jeda 0.2 detik antar kartu
        }
    }
};

const itemVars = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
};

export default function ExperienceBento() {
    return (
        <section className="py-20 bg-[#050914] min-h-screen flex flex-col justify-center relative overflow-hidden">

            {/* Background Grid Hiasan */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10 max-w-6xl">

                {/* Header */}
                <div className="mb-12 flex items-end gap-4 border-b border-white/10 pb-4">
                    <h2 className="text-4xl font-bold text-white">
                        <span className="text-lara-blue">SYSTEM</span> LOGS
                    </h2>
                    <div className="text-slate-500 font-mono text-sm mb-1 hidden md:block">
                        // CAREER_HISTORY_DB_LOADED_SUCCESSFULLY
                    </div>
                    <div className="ml-auto flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                </div>

                {/* BENTO GRID LAYOUT */}
                <motion.div
                    variants={containerVars}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    {EXPERIENCE_DATA.map((exp) => (
                        <motion.div
                            key={exp.id}
                            variants={itemVars}
                            className={`
                        ${exp.colSpan} 
                        group relative bg-[#0a101f]/60 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 
                        hover:border-lara-blue/50 hover:bg-[#0a101f]/80 transition-all duration-300
                        hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]
                    `}
                        >
                            {/* Hiasan Sudut (Corner Brackets) - Biar kesan Techy */}
                            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/20 rounded-tl-lg group-hover:border-lara-blue transition-colors"></div>
                            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/20 rounded-tr-lg group-hover:border-lara-blue transition-colors"></div>
                            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/20 rounded-bl-lg group-hover:border-lara-blue transition-colors"></div>
                            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/20 rounded-br-lg group-hover:border-lara-blue transition-colors"></div>

                            {/* Top Row: Status & Period */}
                            <div className="flex justify-between items-start mb-6">
                                <div className={`
                            px-2 py-1 rounded text-[10px] font-bold font-mono border tracking-wider
                            ${exp.status === 'ACTIVE'
                                    ? 'bg-green-500/10 text-green-400 border-green-500/20'
                                    : 'bg-slate-700/30 text-slate-400 border-slate-600/30'}
                        `}>
                                    [{exp.status}]
                                </div>
                                <div className="text-slate-400 font-mono text-xs bg-white/5 px-3 py-1 rounded-full">
                                    {exp.period}
                                </div>
                            </div>

                            {/* Main Content */}
                            <div className="mb-6">
                                <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-lara-blue transition-colors">
                                    {exp.role}
                                </h3>
                                <div className="text-slate-400 font-medium flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-lara-blue"></span>
                                    {exp.company}
                                </div>
                            </div>

                            <p className="text-gray-300 text-sm leading-relaxed mb-6 border-l-2 border-white/5 pl-4 group-hover:border-lara-blue/30 transition-colors">
                                {exp.desc}
                            </p>

                            {/* Tech Badges */}
                            <div className="flex flex-wrap gap-2 mt-auto">
                                {exp.tech.map((t, i) => (
                                    <span
                                        key={i}
                                        className="text-xs font-mono px-2.5 py-1 rounded bg-blue-500/5 text-blue-300 border border-blue-500/10 group-hover:border-blue-500/30 transition-colors"
                                    >
                                {t}
                            </span>
                                ))}
                            </div>

                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}