import { useProjects } from "../../hooks/useProjects";
import ProjectShowcase from "../projects/ProjectShowcase";

export default function ProjectSection() {
    const { data: projects, isLoading, isError, error } = useProjects();

    return (
        <section id="projects" className="py-24 bg-lara-dark relative">
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
                        Featured{" "}
                        <span className="text-lara-blue">Projects</span>.
                    </h2>
                    <p className="text-slate-400 text-lg">
                        <span className="text-white font-medium">
                            Solving problems
                        </span>{" "}
                        through code. Here are some of the highlights from my
                        journey as a developer.
                    </p>
                </div>

                {/* Loading & Error State */}
                {isLoading && (
                    <div className="text-center py-20 animate-pulse text-slate-500">
                        Loading Projects...
                    </div>
                )}
                {isError && (
                    <div className="text-center py-20 text-red-400">
                        Error: {(error as Error).message}
                    </div>
                )}

                {/* 2. PANGGIL PROJECT SHOWCASE DISINI */}
                {/* Jangan di-map manual lagi! ProjectShowcase yang akan mengurus map, onClick, dan Modal-nya */}
                {projects && <ProjectShowcase projects={projects} />}
            </div>
        </section>
    );
}
