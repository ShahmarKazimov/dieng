import Facebook from "../../../../public/icons/Facebook.svg";
import Image from "next/image";
import Instagram from "../../../../public/icons/Instagram.svg";
import Link from "next/link";
import Linkedin from "../../../../public/icons/Linkedin.svg";
// components/layout/Footer/SocialLinks.tsx
import React from "react";
import { SocialLinksProps } from "@/lib/types/footer.types";
import Youtube from "../../../../public/icons/youtube.png";

export const SocialLinks: React.FC<SocialLinksProps> = ({ className = "" }) => {
  const socialLinks = [
    {
      name: "Youtube",
      href: "https://www.youtube.com/channel/UCMCS6THRdYim-biFOeIUOAQ",
      icon: <Image src={Youtube} alt="Youtube" width={20} height={20} />,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/wood-in-vision/",
      icon: <Image src={Linkedin} alt="LinkedIn" width={20} height={20} />,
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/wood.in.vision/",
      icon: <Image src={Instagram} alt="Instagram" width={20} height={20} />,
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/profile.php?id=100082970450717",
      icon: <Image src={Facebook} alt="Facebook" width={20} height={20} />,
    },
  ];

  return (
    <div className={`flex space-x-4 ${className}`}>
      {socialLinks.map((social) => (
        <Link
          key={social.name}
          href={social.href}
          target="_blank"
          className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          aria-label={social.name}
        >
          {social.icon}
        </Link>
      ))}
    </div>
  );
};
