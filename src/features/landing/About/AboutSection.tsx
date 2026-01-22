import AboutContent from "./components/AboutContent.tsx";
import AboutCodeWindow from "./components/AboutCodeWindow.tsx";
import {useProfile} from "@/features/profile/hooks/useProfile.ts";

export default function AboutSection() {
    const {data: profile} = useProfile();

    return (
        <section id="about" className="py-20 lg:py-32 relative overflow-hidden">
            <div
                className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10"/>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <AboutContent bioLong={profile?.bio_long}/>
                    <AboutCodeWindow profile={profile}/>
                </div>
            </div>
        </section>
    );
}
