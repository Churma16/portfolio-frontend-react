import { useProjects } from "../hooks/useProjects";
import ProjectCard from "../components/projects/ProjectCard";
import Layout from "../components/layout/Layout";
import Hero from "../components/layout/Hero";
import TechMarquee from "../components/layout/TechMarquee";
import { useTechStacks } from "../hooks/useTechStacks";
import AboutSection from "../components/layout/AboutSection";
import ArchitectureSection from "../components/layout/ArchitectureSection";

function App() {
    // Panggil hook sakti kita
    const { data: projects, isLoading, isError, error } = useProjects();

    return (
        <Layout>
            <Hero />
            <div className="mb-24">
                {/* <pre>{JSON.stringify(techStacks, null, 2)}</pre> */}
                <TechMarquee />
            </div>
            <div className="min-h-dvh bg-linear-to-b from-cyan-200 to-white to-[60vh]">
                <div className="mx-auto max-w-6xl">
                    <header className="mb-12 text-center">
                        <h1 className="text-4xl font-bold mb-4">
                            My <span className="text-brand">Portfolio</span>
                        </h1>
                        <p className="text-slate-400">
                            Built with React, Laravel & Tailwind
                        </p>
                    </header>

                    {/* --- STATE HANDLING --- */}

                    {/* 1. Loading State */}
                    {isLoading && (
                        <div className="text-center py-20 animate-pulse text-slate-500">
                            Loading Projects from Laravel...
                        </div>
                    )}

                    {/* 2. Error State */}
                    {isError && (
                        <div className="text-center py-20 text-red-400 bg-red-900/10 rounded-lg border border-red-900">
                            Failed to fetch data. <br />
                            <span className="text-sm opacity-70">
                                {(error as Error).message} (Check your Laravel
                                Server!)
                            </span>
                        </div>
                    )}
                    {/* <pre>{JSON.stringify(projects, null, 2)}</pre> */}
                    {/* 3. Success State (Grid) */}
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-lg mx-auto md:max-w-none">
                        {projects?.map(
                            (
                                project,
                                index // <--- Ambil parameter index
                            ) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    index={index} // <--- Kirim ke component
                                />
                            )
                        )}
                    </div>
                </div>
            </div>
            <AboutSection />
            <ArchitectureSection />
        </Layout>
    );
}

export default App;
