import { motion, AnimatePresence } from "framer-motion";
import PixelButton from "../../../../components/common/PixelButton.tsx";
import { PixelDownload } from "@/components/common/PixelIcon.tsx";
import AboutSectionHeader from "./AboutSectionHeader.tsx";

interface AboutContentProps {
    bioLong?: string;
}

export default function AboutContent({ bioLong }: AboutContentProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
        >
            <AboutSectionHeader />

            <AnimatePresence mode="wait">
                {bioLong ? (
                    <motion.div
                        key="bio-loaded"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.5 }}
                        dangerouslySetInnerHTML={{
                            __html: bioLong,
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
    );
}
