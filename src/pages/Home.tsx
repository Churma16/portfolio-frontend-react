import { useProjects } from "../hooks/useProjects";
import ProjectCard from "../components/projects/ProjectCard";

function App() {
    // Panggil hook sakti kita
    const { data: projects, isLoading, isError, error } = useProjects();

    return (
        <div className="min-h-screen bg-dark-bg p-10 font-sans text-slate-100">
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

                {/* 3. Success State (Grid) */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {projects?.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
