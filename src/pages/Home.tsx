import { useProjects } from "../hooks/useProjects";
import ProjectCard from "../components/projects/ProjectCard";
import Layout from "../components/layout/Layout";
import Hero from "../components/layout/Hero";
import TechMarquee from "../components/layout/TechMarquee";
import { useTechStacks } from "../hooks/useTechStacks";
import AboutSection from "../components/layout/AboutSection";
import ArchitectureSection from "../components/layout/ArchitectureSection";
import ServicesSection from "../components/layout/ServiceSection";
import ContactSection from "../components/layout/ContactSection";
import ProjectSection from "../components/layout/ProjectSection";

function App() {
    // Panggil hook sakti kita

    return (
        <Layout>
            <Hero />
            <div className="mb-24">
                {/* <pre>{JSON.stringify(techStacks, null, 2)}</pre> */}
                <TechMarquee />
            </div>
            <ProjectSection />
            <AboutSection />
            <ServicesSection />
            <ArchitectureSection />
            <ContactSection />
        </Layout>
    );
}

export default App;
