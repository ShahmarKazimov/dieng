'use client';

import { usePathname } from 'next/navigation';

const DynamicBackground = () => {
    const pathname = usePathname();

    const getBackgroundStyle = () => {
        if (pathname.includes('/contact')) {
            return {
                backgroundImage: "url('/images/background-2.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "brightness(0.6)", 
            };
        }
        if (pathname.includes('/about')) {
            return {
                backgroundImage: "url('/images/about-background.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "brightness(0.6)", 
            };
        }

        return {
            backgroundImage: "url('/images/background.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.9)", 
        };
    };

    const getBackgroundHeight = () => {
        if (pathname.includes('/contact')) {
            return "h-[552px]";
        }
        if (pathname.includes('/about')) {
            return "h-[552px]";
        }
        if (pathname.includes('/products')) {
            return "h-[750px]";
        }
        if (pathname.includes('/services')) {
            return "h-[650px]";
        }

        return "h-[695px]";
    };

    return (
        <div
            style={getBackgroundStyle()}
            className={`w-full ${getBackgroundHeight()}`}
        />
    );
};

export default DynamicBackground;
