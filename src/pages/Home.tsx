import Layout from "../components/layout/Home/Layout/Layout.tsx";
import Hero from "../components/layout/Home/Hero/HeroSection.tsx";
import AboutSection from "../components/layout/Home/About/AboutSection.tsx";
import ArchitectureSection from "../components/layout/Home/Architecture/ArchitectureSection.tsx";
import ServicesSection from "../components/layout/Home/ServiceSection.tsx";
import ContactSection from "../components/layout/Home/Contact/ContactSection.tsx";
import ProjectSection from "../components/layout/Home/ProjectSection.tsx";
import TechSection from "@/components/layout/Home/TechStacks/TechSection.tsx";

function App() {

    return (
        <Layout>
            <Hero />
            <TechSection/>
            <ProjectSection />
            <AboutSection />
            <ServicesSection />
            <ArchitectureSection />
            <ContactSection />
        </Layout>
    );
}

export default App;
