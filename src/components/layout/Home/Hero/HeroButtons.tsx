import { motion } from "framer-motion";
import PixelButton from "../../../common/PixelButton.tsx";
import { PixelChat, PixelDownload, PixelPlay } from "../../../common/PixelIcon.tsx";

interface HeroButtonsProps {
    cvFileUrl?: string;
}

export default function HeroButtons({ cvFileUrl }: HeroButtonsProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 pt-6 justify-center lg:justify-start"
        >
            <PixelButton variant="dark" href="#projects">
                <PixelPlay className="w-5 h-5" />
                Discover
            </PixelButton>

            <a
                href={cvFileUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
            >
                <PixelButton variant="primary">
                    <PixelDownload className="w-5 h-5" />
                    Resume
                </PixelButton>
            </a>

            <PixelButton variant="dark" href="#contact">
                <PixelChat className="w-5 h-5" />
                Contact
            </PixelButton>
        </motion.div>
    );
}
