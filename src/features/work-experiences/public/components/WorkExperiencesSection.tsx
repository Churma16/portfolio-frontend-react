import { motion } from "framer-motion";

// --- DATA PLACEHOLDER ---
const EXPERIENCE_DATA = [
    {
        id: 1,
        company: "Tech Startups Inc.",
        role: "Senior Fullstack Engineer",
        period: "2024 - Present",
        type: "Full-time",
        description: "Memimpin pengembangan arsitektur backend microservices dan mengoptimalkan performa frontend menggunakan React & Vite. Berhasil meningkatkan load speed sebesar 40%.",
        technologies: ["Laravel", "React", "Docker", "Redis", "AWS"]
    },
    {
        id: 2,
        company: "Digital Solution Agency",
        role: "Backend Developer",
        period: "2022 - 2024",
        type: "Contract",
        description: "Bertanggung jawab atas desain database dan pengembangan REST API untuk klien korporat. Mengimplementasikan sistem keamanan OAuth2 dan payment gateway.",
        technologies: ["PHP", "MySQL", "CodeIgniter", "Postman"]
    },
    {
        id: 3,
        company: "Freelance",
        role: "Web Developer",
        period: "2021 - 2022",
        type: "Freelance",
        description: "Mengerjakan berbagai proyek website UMKM dan landing page. Fokus pada SEO technical dan responsive design.",
        technologies: ["WordPress", "HTML/CSS", "Javascript", "Bootstrap"]
    }
];

export default function ExperienceSection() {
    return (
        // BACKGROUND: Menggunakan Slate-950 (Biru Gelap Elegan) khas Laracasts, bukan Hitam Pekat
        <section className="py-24 min-h-screen bg-slate-950 text-slate-200 relative overflow-hidden">

            {/* Background Glow Halus (Bukan Grid Cyberpunk) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none opacity-50"></div>

            <div className="container mx-auto px-6 relative z-10 max-w-4xl">

                {/* HEADER: Bersih, Sans-Serif, Professional */}
                <div className="mb-20 text-center md:text-left">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                        Professional <span className="text-blue-500">Journey</span>
                    </h2>
                    <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
                        Rekam jejak pengalaman dalam membangun solusi perangkat lunak yang skalabel.
                    </p>
                </div>

                {/* TIMELINE CONTAINER */}
                <div className="relative space-y-12">

                    {/* Garis Vertikal (Lebih halus, warna Slate) */}
                    <div className="absolute left-[19px] top-2 bottom-0 w-[2px] bg-slate-800 rounded-full md:left-[27px]"></div>

                    {EXPERIENCE_DATA.map((exp, index) => (
                        <div key={exp.id} className="relative pl-12 md:pl-20 group">

                            {/* DOT PENANDA (Clean Circle dengan Ring) */}
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="absolute left-0 top-1 w-10 h-10 md:w-14 md:h-14 bg-slate-950 border-4 border-slate-800 rounded-full flex items-center justify-center z-10 group-hover:border-blue-500 transition-colors duration-300"
                            >
                                <div className="w-3 h-3 md:w-4 md:h-4 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.6)]"></div>
                            </motion.div>

                            {/* KARTU EXPERIENCE (Clean Slate Style) */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                className="
                                    relative bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-3xl
                                    hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1
                                    transition-all duration-300 ease-out
                                "
                            >
                                {/* Header Kartu */}
                                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-3">
                                    <div>
                                        <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                                            {exp.role}
                                        </h3>
                                        <div className="text-slate-400 font-medium mt-1 flex items-center gap-2 text-sm md:text-base">
                                            <span>{exp.company}</span>
                                            <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                                            <span>{exp.type}</span>
                                        </div>
                                    </div>

                                    {/* Badge Waktu (Simple Pill) */}
                                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700">
                                        {exp.period}
                                    </span>
                                </div>

                                {/* Deskripsi (Font Sans, mudah dibaca) */}
                                <p className="text-slate-400 mb-6 leading-relaxed text-sm md:text-base">
                                    {exp.description}
                                </p>

                                {/* Tech Stack Tags (Gaya Laracasts Pills) */}
                                <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800/50">
                                    {exp.technologies.map((tech, i) => (
                                        <span
                                            key={i}
                                            className="
                                                px-3 py-1 text-xs font-semibold rounded-full
                                                bg-slate-800 text-blue-300/80 border border-slate-700/50
                                                group-hover:bg-blue-500/10 group-hover:text-blue-400 group-hover:border-blue-500/20
                                                transition-all cursor-default
                                            "
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}