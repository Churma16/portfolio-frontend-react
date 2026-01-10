import {motion, AnimatePresence} from "framer-motion";
import {useWorkExperiences} from "../useWorkExperiences.ts";

import ExperienceHeader from "@/features/work-experiences/public/components/ExperiencesHeader.tsx";
import WorkExperiencesBody from "@/features/work-experiences/public/components/WorkExperiencesBody.tsx";
import WorkExperiencesSkeleton from "@/features/work-experiences/public/components/WorkExperiencesSkeleton.tsx";

export default function WorkExperienceLaracast() {
    const {data: workExperiences = [], isLoading} = useWorkExperiences();

    return (
        <section className="py-24 min-h-screen bg-slate-950 text-slate-200 relative overflow-hidden">
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