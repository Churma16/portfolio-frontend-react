import FooterCopyright from "./FooterCopyright.tsx";
import FooterSocials from "./FooterSocials.tsx";
import FooterStatus from "./FooterStatus.tsx";
import {useProfile} from "@/features/profile/hooks/useProfile.ts";
import {SiDigitalocean} from "react-icons/si";

export default function Footer() {
    const {data: profile} = useProfile();

    return (
        <footer className="py-8 border-t border-white/5 bg-[#050914] relative overflow-hidden">
            <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-24 bg-lara-blue/5 blur-[100px] pointer-events-none"/>
            <div className="container mx-auto px-4"></div>
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <FooterCopyright/>
                    <div className="flex items-center gap-6 text-xs font-medium text-slate-500">
                        <div
                            className="flex items-center gap-2 hover:text-lara-accent-blue-light transition-colors cursor-default">
                            <SiDigitalocean className="text-lg"/>
                            <span>Powered by DigitalOcean</span>
                        </div>
                    </div>
                    <FooterSocials
                        github={profile?.socials?.github}
                        linkedin={profile?.socials?.linkedin}
                        instagram={profile?.socials?.instagram}
                    />
                    <FooterStatus/>
                </div>
            </div>
        </footer>
    );
}
