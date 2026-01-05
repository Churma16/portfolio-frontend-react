import { Project } from "../../types";

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    return (
        <div className="group relative flex flex-col overflow-hidden rounded-xl bg-dark-card border border-white/5 transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-lg hover:shadow-brand/10 cursor-pointer">
            {/* 1. Thumbnail Image */}
            <div className="relative aspect-video w-full overflow-hidden bg-slate-800">
                <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Overlay saat hover */}
                <div className="absolute inset-0 bg-brand/0 transition-colors group-hover:bg-brand/10" />
            </div>

            {/* 2. Content */}
            <div className="flex flex-1 flex-col p-5">
                <div className="mb-3 flex flex-wrap gap-2">
                    {/* Tech Stack Pills */}
                    {project.stacks?.map((stack) => (
                        <span
                            key={stack.id}
                            className="inline-flex items-center rounded-full bg-slate-700/50 px-2.5 py-0.5 text-xs font-medium text-brand border border-brand/20"
                        >
                            {stack.name}
                        </span>
                    ))}
                </div>

                <h3 className="mb-2 text-xl font-bold text-white group-hover:text-brand transition-colors">
                    {project.title}
                </h3>

                {/* Potong deskripsi biar tidak kepanjangan (truncate) */}
                <p className="text-sm text-slate-400 line-clamp-2">
                    {project.content}
                </p>
            </div>
        </div>
    );
}
