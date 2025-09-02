import LangSelector from "@/components/LangSelector/LangSelector";
import Logo from "@/components/layout/Header/NavLogo";
import MobileMenuButton from "@/components/layout/Header/MobileMenuButton";
import NavButton from "./NavButton";
import NavLinks from "@/components/layout/Header/NavLinks";
import { Suspense } from "react";

export default function Header() {
    return (
        <header className="w-full rounded-[8px] overflow-hidden h-[72px] bg-[#FFFFFF57] backdrop-blur-[22px]">
            <nav className="relative z-10 h-full px-4 py-3 flex items-center justify-between">
                <Logo />
                <div className="hidden md:block">
                    <Suspense fallback={<div>Loading...</div>}>
                        <NavLinks />
                    </Suspense>
                </div>
                <div className="relative flex items-center">
                    <div className="md:flex hidden items-center ">
                        <Suspense fallback={<div>Loading...</div>}>
                            <NavButton />
                        </Suspense>
                    </div>
                    <div className="absolute right-10 sm:-left-14 w-max">
                        <Suspense fallback={<div>Loading...</div>}>
                            <LangSelector />
                        </Suspense>
                    </div>
                    <div>
                        <Suspense fallback={<div>Loading...</div>}>
                            <MobileMenuButton />
                        </Suspense>
                    </div>
                </div>
            </nav>
        </header>
    );
}
