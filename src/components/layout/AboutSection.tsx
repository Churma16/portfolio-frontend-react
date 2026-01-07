import { motion, AnimatePresence } from "framer-motion";
import CodeWindow from "../common/CodeWindow";
import PixelButton from "../common/PixelButton"; // Reuse tombol pixel kita
import { PixelDownload } from "../common/PixelIcon";
import { useProfile } from "../../hooks/useProfile";

export default function AboutSection() {
    const { data: profile, isLoading, isError } = useProfile();

    return (
        <section id="about" className="py-20 lg:py-32 relative overflow-hidden">
            {/* Background Decoration (Glow samar di belakang Code Window) */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-lara-blue/10 rounded-full blur-[120px] -z-10" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* --- KOLOM KIRI: TEKS --- */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                    >
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
                            Beyond the{" "}
                            <span className="text-lara-blue">Code</span>.
                        </h2>

                        <AnimatePresence mode="wait">
                            {profile?.bio_long ? (
                                <motion.div
                                    key="bio-loaded"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.5 }}
                                    dangerouslySetInnerHTML={{
                                        __html: profile.bio_long,
                                    }}
                                    className="space-y-4 text-slate-400 font-body text-lg leading-relaxed"
                                />
                            ) : (
                                <motion.div
                                    key="bio-skeleton"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-3"
                                >
                                    <div className="h-4 bg-slate-700 rounded animate-pulse w-full"></div>
                                    <div className="h-4 bg-slate-700 rounded animate-pulse w-5/6"></div>
                                    <div className="h-4 bg-slate-700 rounded animate-pulse w-full"></div>
                                    <div className="h-4 bg-slate-700 rounded animate-pulse w-4/6"></div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Tombol Download CV */}
                        <div className="pt-4">
                            <PixelButton variant="primary" href="/my-cv.pdf">
                                <PixelDownload className="w-5 h-5" />
                                Download Resume
                            </PixelButton>
                        </div>
                    </motion.div>

                    {/* --- KOLOM KANAN: VISUAL CODE --- */}
                    <div className="relative">
                        {/* Hiasan kotak di belakang biar ada dimensi */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-lara-blue to-purple-600 rounded-xl opacity-20 blur-lg rotate-2" />

                        <CodeWindow profile={profile} />
                    </div>
                </div>
            </div>
        </section>
    );
}
