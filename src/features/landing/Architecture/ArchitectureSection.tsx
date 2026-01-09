import ArchitectureSectionHeader from "./components/ArchitectureSectionHeader.tsx";
import ArchitectureContent from "./components/ArchitectureContent.tsx";

export default function ArchitectureSection() {
    return (
        <section className="relative py-32 overflow-hidden" id="architecture">
            {/* --- REVISI BACKGROUND: SPOTLIGHT EFFECT --- */}

            {/* Layer 1: Grid Pattern dengan Masking Radial */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div
                    className="absolute inset-0 opacity-[0.15]"
                    style={{
                        backgroundImage: `
                    linear-gradient(to right, #808080 1px, transparent 1px),
                    linear-gradient(to bottom, #808080 1px, transparent 1px)
                `,
                        backgroundSize: "40px 40px",
                        maskImage:
                            "radial-gradient(ellipse 80% 50% at 50% 50%, black 0%, transparent 100%)",
                        WebkitMaskImage:
                            "radial-gradient(ellipse 80% 50% at 50% 50%, black 0%, transparent 100%)",
                    }}
                />
            </div>

            {/* Layer 2: Glow Biru Samar di Tengah */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-1/2 bg-lara-blue/5 blur-[120px] rounded-full -z-10" />

            <div className="container mx-auto px-4 relative z-10">
                <ArchitectureSectionHeader />
                <ArchitectureContent />
            </div>
        </section>
    );
}
