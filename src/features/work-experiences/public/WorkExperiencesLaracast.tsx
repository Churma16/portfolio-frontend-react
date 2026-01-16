import {AnimatePresence} from "framer-motion";
import {useWorkExperiences} from "../hooks/useWorkExperiences.ts";

import ExperienceHeader from "@/features/work-experiences/public/components/ExperiencesHeader.tsx";
import WorkExperiencesBody from "@/features/work-experiences/public/components/WorkExperiencesBody.tsx";
import WorkExperiencesSkeleton from "@/features/work-experiences/public/components/WorkExperiencesSkeleton.tsx";

export default function WorkExperiencesLaracast() {
    const {data: workExperiences = [], isLoading} = useWorkExperiences();

    return (
        <section className="py-24 min-h-screen bg-slate-950 text-lara-text-secondary relative overflow-hidden"
                 id="experiences">
            <ExperienceHeader/>
            <AnimatePresence mode="wait">
                {isLoading ? (

                    <WorkExperiencesSkeleton/>
                ) : (

                    <WorkExperiencesBody workExperiences={workExperiences}/>

                )}
            </AnimatePresence>
        </section>
    );
}