import HeroContent from "./components/HeroContent.tsx";
import HeroAvatar from "./components/HeroAvatar.tsx";
import {useProfile} from "../../profile/hooks/useProfile.ts";
import {useApi} from "@/contexts/useApi.ts";
import {useStoragePath} from "@/hooks/useStoragePath.ts";
import TechMarquee from "@/features/tech-stacks/public/components/TechMarquee.tsx";
import {useTechStacks} from "@/features/tech-stacks/hooks/useTechStacks.ts";
import { TechStack } from "@/types";

const DUMMY_TECH_STACKS: TechStack[] = [
    { id: 1, name: "React", icon: "SiReact", created_at: "", updated_at: "" },
    { id: 2, name: "Laravel", icon: "SiLaravel", created_at: "", updated_at: "" },
    { id: 3, name: "Go", icon: "SiGo", created_at: "", updated_at: "" },
    { id: 4, name: "TypeScript", icon: "SiTypescript", created_at: "", updated_at: "" },
    { id: 5, name: "Tailwind CSS", icon: "SiTailwindcss", created_at: "", updated_at: "" },
    { id: 6, name: "Node.js", icon: "SiNode.js", created_at: "", updated_at: "" },
    { id: 7, name: "Express", icon: "SiExpress", created_at: "", updated_at: "" },
    { id: 8, name: "MySQL", icon: "SiMysql", created_at: "", updated_at: "" },
];

export default function Hero() {
    const {data: profile, isLoading: isProfileLoading} = useProfile();
    const {data: techStacks = [], isError, isLoading: isTechLoading} = useTechStacks();
    const isDevFallback = isError && import.meta.env.VITE_PROD === "false";
    const displayStacks = isDevFallback ? DUMMY_TECH_STACKS : techStacks;

    const {activeBackend} = useApi();
    const storagePath = useStoragePath();

    return (
        <section className="relative overflow-hidden pt-10 pb-20 lg:pt-8 lg:pb-32 flex flex-col">
            {/* Dot Pattern Background (Commented out for now)
            <div 
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                    maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)'
                }}
            />
            */}
            
            {/* Glow Background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10 opacity-50"/>

            <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 z-10">
                <HeroContent
                    name={profile?.name}
                    bioShort={profile?.bio_short}
                    isHireable={profile?.is_hireable}
                    cvFileUrl={profile?.cv_files ? `${storagePath}${profile.cv_files}` : undefined}
                    isLoading={isProfileLoading}
                />
                <HeroAvatar 
                    avatarUrl={profile?.avatar ? `${storagePath}${profile.avatar}` : undefined}
                    isLoading={isProfileLoading}
                />
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 z-0">
                {isTechLoading ? (
                    <div className="hidden md:flex overflow-hidden relative items-center w-full min-h-[80px] opacity-30 gap-16 px-16">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(i => (
                            <div key={i} className="w-8 h-8 bg-muted/40 rounded-full shrink-0 animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <TechMarquee techStacks={displayStacks} variant="decorative" />
                )}
            </div>
        </section>
    );
}
