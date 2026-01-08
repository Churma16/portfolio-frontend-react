// src/components/Auth/GlitchBackground.tsx
interface GlitchBackgroundProps {
    isGlitch: boolean;
}

export default function GlitchBackground({ isGlitch }: GlitchBackgroundProps) {
    return (
        <>
            {/* Background Dots */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div
                    className="absolute inset-0 opacity-[0.2]"
                    style={{
                        backgroundImage:
                            "radial-gradient(#94a3b8 1px, transparent 1px)",
                        backgroundSize: "32px 32px",
                        maskImage:
                            "radial-gradient(circle at center, black 40%, transparent 100%)",
                        WebkitMaskImage:
                            "radial-gradient(circle at center, black 40%, transparent 100%)",
                    }}
                />
            </div>

            {/* Glitch Layer */}
            <div
                className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-75 ${
                    isGlitch ? "opacity-100" : "opacity-0"
                }`}
                style={{
                    maskImage:
                        "radial-gradient(circle at center, black 0%, black 30%, transparent 70%)",
                    WebkitMaskImage:
                        "radial-gradient(circle at center, black 0%, black 30%, transparent 70%)",
                }}
            >
                <div className="absolute inset-0 bg-black" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40 brightness-100 contrast-150" />
                <div
                    className="absolute inset-0 bg-green-900/50 mix-blend-screen"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(0, 255, 0, 0.1) 50%, rgba(0, 0, 0, 0.25) 50%), 
                            linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))
                        `,
                        backgroundSize: "100% 3px, 3px 100%",
                    }}
                />
            </div>

            {/* Glow Effect */}
            <div
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-lara-blue/10 rounded-full blur-[100px] -z-10 transition-opacity duration-100 ${
                    isGlitch ? "opacity-0" : "opacity-100"
                }`}
            />
        </>
    );
}