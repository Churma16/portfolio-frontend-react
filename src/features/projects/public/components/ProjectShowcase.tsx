import {useEffect, useState} from "react";
import {Project} from "@/types";
import ProjectCard from "./ProjectCard.tsx";
import ProjectModal from "@/features/projects/public/components/ProjectModal.tsx";
import {useStoragePath} from "@/hooks/useStoragePath.ts";

interface ProjectShowcaseProps {
    projects: Project[];
}

export default function ProjectShowcase({projects}: ProjectShowcaseProps) {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const selectedProject: Project | undefined = projects.find((p) => p.id === selectedId);
    
    const StoragePath = useStoragePath();

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

            {/* --- MODAL POP-UP --- */}
            <ProjectModal
                selectedId={selectedId}
                selectedProject={selectedProject}
                setSelectedId={setSelectedId}
                storagePath={StoragePath}
            />
        </div>
    );
}