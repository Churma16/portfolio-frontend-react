import HeroContent from "./HeroContent.tsx";
import HeroAvatar from "./HeroAvatar.tsx";
import { useProfile } from "../../../../hooks/useProfile.ts";

export default function Hero() {
    const { data: profile } = useProfile();
    const cvFileUrl = profile?.cv_files
        ? `${import.meta.env.VITE_FILE_URL}${profile.cv_files}`
        : "";
    const avatarUrl = profile?.avatar
        ? `${import.meta.env.VITE_FILE_URL}${profile.avatar}`
        : "";

    return (
        <section className="relative overflow-hidden pt-10 pb-20 lg:pt-20 lg:pb-32">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-lara-blue/20 rounded-full blur-[120px] -z-10 opacity-50" />

            <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
                <HeroContent
                    name={profile?.name}
                    bioShort={profile?.bio_short}
                    isHireable={profile?.is_hireable}
                    cvFileUrl={cvFileUrl}
                />
                <HeroAvatar avatarUrl={avatarUrl} />
            </div>
        </section>
    );
}
