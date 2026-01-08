import FooterCopyright from "./FooterCopyright.tsx";
import FooterSocials from "./FooterSocials.tsx";
import FooterStatus from "./FooterStatus.tsx";
import { useProfile } from "@/hooks/useProfile.ts";

export default function Footer() {
    const { data: profile } = useProfile();

    return (
        <footer className="py-8 border-t border-white/5 bg-[#050914] relative overflow-hidden">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-24 bg-lara-blue/5 blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <FooterCopyright />
                    <FooterSocials
                        github={profile?.socials?.github}
                        linkedin={profile?.socials?.linkedin}
                        instagram={profile?.socials?.instagram}
                    />
                    <FooterStatus />
                </div>
            </div>
        </footer>
    );
}
