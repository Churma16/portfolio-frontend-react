import {useEffect, useState} from "react";
import {Project} from "@/types";
import ProjectCard from "./ProjectCard.tsx";
import {useApi} from "@/contexts/useApi.ts";
import ProjectModal from "@/features/projects/public/components/ProjectModal.tsx";

interface ProjectShowcaseProps {
    projects: Project[];
}

export default function ProjectShowcase({projects}: ProjectShowcaseProps) {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const selectedProject = projects.find((p) => p.id === selectedId);
    const {activeBackend} = useApi();

    const isGo = activeBackend === 'go';

    const StoragePath = isGo
        ? import.meta.env.VITE_GO_FILE_URL || '/files/'
        : import.meta.env.VITE_LARAVEL_FILE_URL || '/files/';


    useEffect(() => {
        if (selectedId) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [selectedId]);

    return (
        <div className="container mx-auto lg:px-4">
            {/* GRID PROJECT */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                    <ProjectCard
                        key={project.id}
                        index={index}
                        project={project}
                        onClick={() => setSelectedId(project.id)}
                    />
                ))}
            </div>
            <ProjectModal
                selectedId={selectedId}
                selectedProject={selectedProject}
                setSelectedId={setSelectedId}
                storagePath={StoragePath}
            />
            {/* --- MODAL POP-UP --- */}
        </div>
    );
}