import ArchitectureDiagram from "../features/ArchitectureDiagram";
import LiveStats from "../features/LiveStats";

export default function ArchitectureSection() {
    return (
        // 1. Hapus bg-[#050914], ganti jadi relative saja (transparan/ikut body)
        // 2. Hapus border-y kalau mau benar-benar seamless (opsional)
        <section className="relative py-32 overflow-hidden">
            {/* --- REVISI BACKGROUND: SPOTLIGHT EFFECT --- */}

            {/* Layer 1: Grid Pattern dengan Masking Radial */}
            {/* Grid hanya muncul di tengah dan memudar ke transparan di pinggir */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div
                    className="absolute inset-0 opacity-[0.15]"
                    style={{
                        backgroundImage: `
                    linear-gradient(to right, #808080 1px, transparent 1px),
                    linear-gradient(to bottom, #808080 1px, transparent 1px)
                `,
                        backgroundSize: "40px 40px",
                        // KUNCI: Masking agar grid tidak kotak, tapi lonjong memudar
                        maskImage:
                            "radial-gradient(ellipse 80% 50% at 50% 50%, black 0%, transparent 100%)",
                        WebkitMaskImage:
                            "radial-gradient(ellipse 80% 50% at 50% 50%, black 0%, transparent 100%)",
                    }}
                />
            </div>

            {/* Layer 2: Glow Biru Samar di Tengah (Biar diagramnya "pop") */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-1/2 bg-lara-blue/5 blur-[120px] rounded-full -z-10" />

            <div className="container mx-auto px-4 relative z-10">
                {/* HEADER */}
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
                        Under the <span className="text-lara-blue">Hood</span>.
                    </h2>
                    <p className="text-slate-400 text-lg">
                        Transparency is key. Here is a live look at the{" "}
                        <span className="text-white font-medium">
                            architecture
                        </span>{" "}
                        powering this portfolio.
                    </p>
                </div>

                {/* DIAGRAM */}
                <ArchitectureDiagram />

                {/* STATS */}
                <LiveStats />

            
            </div>
        </section>
    );
}
