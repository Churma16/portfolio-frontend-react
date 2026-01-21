import ProjectHeader from "@/features/projects/public/components/ProjectHeader.tsx";
import ProjectBody from "@/features/projects/public/components/ProjectBody.tsx";

export default function ProjectSection() {

    return (
        <section id="projects" className="py-24 bg-background relative">
            <div className="container mx-auto px-4 relative z-10">
                <ProjectHeader/>
                <ProjectBody/>
            </div>
        </section>
    );
}
