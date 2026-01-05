import TechIcon from "../common/TechIcon";

const techs = [
    "Laravel",
    "React",
    "Tailwind",
    "TypeScript",
    "Docker",
    "MySQL",
    "Redis",
    "Git",
    "Framer",
    "PHP",
];

export default function TechMarquee() {
    return (
        <section className="py-10 border-y border-lara-border bg-lara-dark/50 overflow-hidden relative">
            {/* Overlay Fade Kiri & Kanan agar tidak putus kasar */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-lara-dark to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-lara-dark to-transparent z-10" />

            {/* --- KUNCI PERBAIKAN: Menggunakan inline-flex dan whitespace-nowrap --- */}
            <div className="flex whitespace-nowrap overflow-hidden group">
                {/* LIST 1 */}
                <div className="inline-flex animate-infinite-scroll gap-12 items-center pr-12">
                    {techs.map((tech, index) => (
                        <div
                            key={`list1-${index}`}
                            className="flex items-center gap-3 group/item shrink-0"
                        >
                            <TechIcon
                                name={tech}
                                className="w-8 h-8 text-slate-500 transition-all duration-300 grayscale group-hover/item:grayscale-0 group-hover/item:text-lara-blue"
                            />
                            <span className="text-lg font-heading font-bold text-slate-500 transition-colors group-hover/item:text-slate-200">
                                {tech}
                            </span>
                        </div>
                    ))}
                </div>

                {/* LIST 2 (Duplikat Persis) */}
                <div
                    className="inline-flex animate-infinite-scroll gap-12 items-center pr-12"
                    aria-hidden="true"
                >
                    {techs.map((tech, index) => (
                        <div
                            key={`list2-${index}`}
                            className="flex items-center gap-3 group/item shrink-0"
                        >
                            <TechIcon
                                name={tech}
                                className="w-8 h-8 text-slate-500 transition-all duration-300 grayscale group-hover/item:grayscale-0 group-hover/item:text-lara-blue"
                            />
                            <span className="text-lg font-heading font-bold text-slate-500 transition-colors group-hover/item:text-slate-200">
                                {tech}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
