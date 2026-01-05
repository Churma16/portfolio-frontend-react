import { Project } from "../../types";

export default function ProjectCard({ project }: { project: Project }) {
    return (
        <div className="group flex flex-col overflow-hidden rounded-2xl bg-[#0a101f] border border-lara-border transition-all duration-300 hover:border-lara-blue/50 hover:shadow-2xl hover:shadow-lara-blue/5">
            {/* Thumbnail */}
            <div className="relative  aspect-video overflow-hidden bg-slate-800">
                <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-lara-dark/80 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-6">
                {/* Category/Tags dengan Font Kanit */}
                <div className="mb-3 flex flex-wrap gap-2">
                    {project.stacks?.map((stack) => (
                        <span
                            key={stack.id}
                            className="rounded-md bg-lara-blue/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-lara-blue border border-lara-blue/20"
                        >
                            {stack.name}
                        </span>
                    ))}
                </div>

                {/* Judul dengan Font Hanken Grotesk */}
                <h3 className="font-heading text-xl font-extrabold text-white group-hover:text-lara-blue transition-colors leading-tight">
                    {project.title}
                </h3>

                <p className="mt-3 font-body text-sm leading-relaxed text-lara-sky/60 line-clamp-2">
                    {project.content}
                </p>

                {/* Link Footer Card */}
                <div className="mt-6 flex items-center text-lara-blue font-bold text-sm">
                    View Project
                    <svg
                        className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
}
