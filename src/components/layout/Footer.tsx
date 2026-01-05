import { SiGithub, SiLinkedin, SiInstagram } from "react-icons/si";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-8 border-t border-white/5 bg-[#050914] relative overflow-hidden">
            {/* Background Glow halus di bawah */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-24 bg-lara-blue/5 blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    {/* KIRI: Copyright */}
                    <div className="text-slate-500 text-sm font-mono">
                        &copy; {currentYear}{" "}
                        <span className="text-white font-bold">Churma.dev</span>
                        . All rights reserved.
                    </div>

                    {/* TENGAH: Social Links */}
                    <div className="flex items-center gap-6">
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noreferrer"
                            className="text-slate-400 hover:text-white transition-colors"
                        >
                            <SiGithub className="w-5 h-5" />
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noreferrer"
                            className="text-slate-400 hover:text-blue-400 transition-colors"
                        >
                            <SiLinkedin className="w-5 h-5" />
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noreferrer"
                            className="text-slate-400 hover:text-pink-500 transition-colors"
                        >
                            <SiInstagram className="w-5 h-5" />
                        </a>
                    </div>

                    {/* KANAN: API Status Indicator */}
                    <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-xs font-mono text-slate-300">
                            API System:{" "}
                            <span className="text-green-400 font-bold">
                                Online
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
