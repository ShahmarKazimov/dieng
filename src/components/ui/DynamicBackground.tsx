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
                className: "opacity-20",
            };
        }

        return {
            backgroundImage: "url('/images/background.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
        };
    };

    const getBackgroundHeight = () => {
        if (pathname.includes('/contact')) {
            return "h-[552px]";
        }
        if (pathname.includes('/about')) {
            return "h-[600px]";
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
