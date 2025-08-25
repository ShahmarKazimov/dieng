export interface FooterLink {
    href: string;
    text: string;
}

export interface FooterSectionProps {
    title: string;
    links: FooterLink[];
}

export interface SocialLinksProps {
  className?: string;
}