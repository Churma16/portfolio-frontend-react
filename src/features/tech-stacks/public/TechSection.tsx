import TechMarquee from "@/features/tech-stacks/public/components/TechMarquee.tsx";

export default function TechSection() {
    return (<div className="m-24">
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
        <TechMarquee/>
    </div>)
}
