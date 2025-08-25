import LangSelector from "@/components/LangSelector/LangSelector";
import Logo from "@/components/layout/Header/NavLogo";
import MobileMenuButton from "@/components/layout/Header/MobileMenuButton";
import NavButton from "./NavButton";
import NavLinks from "@/components/layout/Header/NavLinks";
import { Suspense } from "react";

export default function Header() {
    return (
        <header className="w-full rounded-[50px] overflow-hidden h-[72px] bg-white/4% border border-[rgb(64,64,64)] backdrop-blur-[12px] z-50 ">
            <div className="absolute opacity-15 bg-gradient-to-r from-[#DCD7D7]/21% to-[#404040]"></div>
            <nav className="relative z-10 h-full px-10 sm:px-[100px] py-3 flex items-center justify-between">
                <Logo />
                <div className="hidden md:block">
                    <Suspense fallback={<div>Loading...</div>}>
                        <NavLinks />
                    </Suspense>
                </div>
                <div className="md:flex hidden items-center relative space-x-4">
                    <Suspense fallback={<div>Loading...</div>}>
                        <NavButton />
                    </Suspense>
                </div>
                <div className="absolute right-20 sm:right-34 md:right-24">
                    <Suspense fallback={<div>Loading...</div>}>
                        <LangSelector />
                    </Suspense>
                </div>
                <div>
                    <Suspense fallback={<div>Loading...</div>}>
                        <MobileMenuButton />
                    </Suspense>
                </div>
            </nav>
        </header>
    );
}
