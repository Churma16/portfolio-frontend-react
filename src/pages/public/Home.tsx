import PublicLayout from "../../components/layout/public/PublicLayout.tsx";
import Hero from "@/features/landing/Hero/HeroSection.tsx";
import AboutSection from "@/features/landing/About/AboutSection.tsx";
import ArchitectureSection from "@/features/landing/Architecture/ArchitectureSection.tsx";
import ServicesSection from "../../features/landing/Service/public/ServiceSection.tsx";
import ContactSection from "@/features/landing/Contact/ContactSection.tsx";
import ProjectSection from "../../features/projects/public/ProjectSection.tsx";
import TechSection from "@/features/tech-stacks/public/TechSection.tsx";
import WorkExperienceLaracast from "@/features/work-experiences/public/WorkExperiencesLaracast.tsx";
import {useEffect, useState} from "react";
import {HiArrowUp} from "react-icons/hi2";
import {motion} from "framer-motion";
import {SiApacherocketmq} from "react-icons/si";

const ReturnToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isRocket, setIsRocket] = useState(false);

    const handleScroll = () => {
        const scrollTop = window.scrollY;
        setIsVisible(scrollTop > 300);
    };

    const scrollToTop = () => {
        setIsRocket(true);
        window.scrollTo({top: 0, behavior: "smooth"});
        setTimeout(() => setIsRocket(false), 1000); // Reset rocket state after animation
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return isVisible ? (
        <motion.button
            onClick={scrollToTop}
            initial={{opacity: 0, scale: 0}}
            animate={{opacity: 1, scale: 1}}
            exit={{opacity: 0, scale: 0}}
            transition={{duration: 0.3}}
            disabled={false}
            className="return-to-top fixed bottom-8 right-8 z-50 p-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-lg shadow-blue-500/50 border border-blue-400/20 backdrop-blur-sm transition-all duration-300 hover:shadow-blue-500/70 hover:-translate-y-1 disabled:cursor-not-allowed"
        >
            <motion.div
                animate={
                    isRocket
                        ? {x: [0, -3, 3, -3, 3, 0], y: [0, -3, 0, 3, 0, 0]}
                        : {x: 0, y: 0}
                }
                transition={{
                    duration: isRocket ? 0.4 : 0.3,
                    repeat: isRocket ? Infinity : 0,
                    ease: "easeInOut",
                }}
                className="flex items-center justify-center"
            >
                {isRocket ? <SiApacherocketmq/> : <HiArrowUp className="w-6 h-6"/>}
            </motion.div>
        </motion.button>
    ) : null;
};

function App() {
    return (
        <PublicLayout>
            <Hero/>
            <TechSection/>
            <ProjectSection/>
            <WorkExperienceLaracast/>
            <AboutSection/>
            <ServicesSection/>
            <ArchitectureSection/>
            <ContactSection/>
            <ReturnToTopButton/>
        </PublicLayout>
    );
}

export default App;
