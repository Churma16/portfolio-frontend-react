import NavLogo from "./NavLogo.tsx";
import NavLinks from "./NavLinks.tsx";
import {useNavbarState} from "@/components/layout/public/Navbar/useNavbarState.ts";
import {BackendToggle} from "@/components/common/BackendToggle.tsx";

export default function Navbar() {
    const {underlineStyle, navRef, isActive} = useNavbarState();

    return (
        <nav className="border-b border-border bg-background sticky top-0 z-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-[74px] items-center justify-between relative">
                    <NavLogo/>
                    <NavLinks
                        underlineStyle={underlineStyle}
                        navRef={navRef}
                        isActive={isActive}
                        activeHash=""

                    />
                    <div className="items-center gap-4 hidden md:block">

                        <BackendToggle/>
                    </div>
                </div>
            </div>
        </nav>
    );
}
