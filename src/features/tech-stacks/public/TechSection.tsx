import TechBody from "@/features/tech-stacks/public/components/TechBody.tsx";
import TechHeader from "@/features/tech-stacks/public/components/TechHeader.tsx";

export default function TechSection() {

    return (
        <section id="tech-stacks" className="py-24 mx-4">
            <TechHeader/>
            <TechBody/>
        </section>
    )
}
