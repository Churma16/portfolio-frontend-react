import TechList from "@/features/tech-stacks/public/components/TechList.tsx";
import TechHeader from "@/features/tech-stacks/public/components/TechHeader.tsx";

export default function TechSection() {


    return (
        <div className="mt-10 mb-20 mx-4" id="tech-stacks">
            <TechHeader/>
            <TechList/>
        </div>
    )
}
