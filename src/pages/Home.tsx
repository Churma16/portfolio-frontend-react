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
            <div className="m-24">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
                        The Tech <span className="text-lara-blue"> Stack</span>.
                    </h2>
                    <p className="text-slate-400 text-lg">
                        <span className="text-white font-medium">
                        </span>
                        The tools I use to build fast, scalable, and robust
                        applications.
                    </p>
                </div>
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
