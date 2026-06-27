import HeroContent from "./components/HeroContent.tsx";
import HeroAvatar from "./components/HeroAvatar.tsx";
import {useProfile} from "../../profile/hooks/useProfile.ts";
import {useApi} from "@/contexts/useApi.ts";
import {useStoragePath} from "@/hooks/useStoragePath.ts";

export default function Hero() {
    const {data: profile} = useProfile();
    // const cvFileUrl = profile?.cv_files
    //     ? `${import.meta.env.VITE_FILE_URL}${profile.cv_files}`
    //     : "";
    // const avatarUrl = profile?.avatar
    //     ? `${import.meta.env.VITE_FILE_URL}${profile.avatar}`
    //     : "";

    const {activeBackend} = useApi();
    const storagePath = useStoragePath();

    return (
        <section className="relative overflow-hidden pt-10 pb-20 lg:pt-8 lg:pb-32">
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10 opacity-50"/>

            <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
                <HeroContent
                    name={profile?.name}
                    bioShort={profile?.bio_short}
                    isHireable={profile?.is_hireable}
                    cvFileUrl={profile?.cv_files ? `${storagePath}${profile.cv_files}` : undefined}
                />
                <HeroAvatar avatarUrl={profile?.avatar ? `${storagePath}${profile.avatar}` : undefined}/>
            </div>
        </section>
    );
}
