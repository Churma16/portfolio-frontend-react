import TechList from "@/features/tech-stacks/public/components/TechList.tsx";
import TechHeader from "@/features/tech-stacks/public/components/TechHeader.tsx";

export default function TechSection() {

    return (
        <section id="tech-stacks" className="py-24 mx-4">
            <TechHeader/>
            <TechList/>
        </section>
    )
}
