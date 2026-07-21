import FooterCopyright from "./FooterCopyright.tsx";
import FooterSocials from "./FooterSocials.tsx";
import FooterStatus from "./FooterStatus.tsx";
import FooterBrand from "./FooterBrand.tsx";
import FooterNav from "./FooterNav.tsx";
import {useProfile} from "@/features/profile/hooks/useProfile.ts";
export default function Footer() {
    const {data: profile} = useProfile();

    return (
        <footer className="pt-12 pb-8 bg-card/40 backdrop-blur-md border-t border-border relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-24 bg-primary/5 blur-[100px] pointer-events-none"/>

            <div className="container mx-auto px-4 relative z-10">
                {/* Top Row: Branding & Navigation */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-4 mb-10">
                    <FooterBrand />
                    <div className="flex flex-col md:items-end gap-6">
                        <FooterNav />
                        <FooterSocials
                            github={profile?.socials?.github}
                            linkedin={profile?.socials?.linkedin}
                            instagram={profile?.socials?.instagram}
                        />
                    </div>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-border/40 mb-8" />

                {/* Bottom Row: Meta & Status */}
                <div className="flex flex-col md:flex-row md:justify-between items-center gap-6">
                    <FooterCopyright />
                    <FooterStatus />
                </div>
            </div>
        </footer>
    );
}
