import PublicLayout from "@/components/layout/public/PublicLayout.tsx";
import Hero from "@/features/landing/Hero/HeroSection.tsx";
import AboutSection from "@/features/landing/About/AboutSection.tsx";
import ArchitectureSection from "@/features/landing/Architecture/ArchitectureSection.tsx";
import ServicesSection from "@/features/landing/Service/public/ServiceSection.tsx";
import ContactSection from "@/features/landing/Contact/ContactSection.tsx";
import ProjectSection from "@/features/projects/public/ProjectSection.tsx";
import TechSection from "@/features/tech-stacks/public/TechSection.tsx";
import WorkExperienceLaracast from "@/features/work-experiences/public/WorkExperiencesLaracast.tsx";
import ReturnToTopButton from "@/components/common/ReturnToTopButton.tsx";
import { useScrollToHash } from "@/hooks/useScrollToHash";
import { ApiProvider } from "@/contexts/ApiContext";

function Home() {
    useScrollToHash();

    return (
        <ApiProvider>
            <PublicLayout>
                <Hero />
                <TechSection />
                <ProjectSection />
                <WorkExperienceLaracast />
                <AboutSection />
                <ServicesSection />
                <ArchitectureSection />
                <ContactSection />
                <ReturnToTopButton />
            </PublicLayout>
        </ApiProvider>
    );
}

export default Home;
