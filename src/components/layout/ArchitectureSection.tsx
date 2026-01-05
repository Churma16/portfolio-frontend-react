import ArchitectureDiagram from "../features/ArchitectureDiagram";
import LiveStats from "../features/LiveStats";

export default function ArchitectureSection() {
    return (
        <section className="relative py-24 border-y border-lara-border overflow-hidden bg-[#050914]">
            {/* --- BACKGROUND GRID PATTERN (CSS TRICK) --- */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: `
                   linear-gradient(to right, #808080 1px, transparent 1px),
                   linear-gradient(to bottom, #808080 1px, transparent 1px)
               `,
                    backgroundSize: "40px 40px",
                }}
            />
            {/* Vignette biar grid-nya nge-fade di pinggir */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050914] via-transparent to-[#050914]" />

            <div className="container mx-auto px-4 relative z-10">
                {/* HEADER */}
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
                        Under the <span className="text-lara-blue">Hood</span>.
                    </h2>
                    <p className="text-slate-400 text-lg">
                        This portfolio isn't just a static template. It's a
                        full-featured{" "}
                        <span className="text-white font-medium">
                            Single Page Application (SPA)
                        </span>{" "}
                        built with a modified TALL stack architecture.
                    </p>
                </div>

                {/* DIAGRAM */}
                <ArchitectureDiagram />

                {/* STATS */}
                <LiveStats />

                {/* FOOTNOTE */}
                <p className="text-center text-[10px] text-slate-600 font-mono mt-12 uppercase tracking-widest">
                    System Status: 🟢 All Systems Operational
                </p>
            </div>
        </section>
    );
}
