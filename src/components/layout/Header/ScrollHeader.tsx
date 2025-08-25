"use client";
import { useEffect, useState } from "react";
import Header from "./Header";

export default function ScrollHeader() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            className={`fixed left-4 top-0 right-4 md:right-0 md:left-0 my-4 md:max-w-[76.5rem] mx-auto z-[9999] ${isScrolled ? "bg-[#0b0d12]/40 border-[rgb(64,64,64)] backdrop-blur-[12px] rounded-[50px]" : ""}`}
        >
            <Header />
        </div>
    );
}
