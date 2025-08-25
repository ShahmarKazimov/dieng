
export interface ApiButtonTranslation {
    id: string;
    languageCode: string;
    isDefault: boolean;
    text: string;
    bannerButtonId: string;
}

export interface ApiButtonData {
    id: string;
    url: string;
    bannerId: string;
    icon: string;
    translations: ApiButtonTranslation[];
}

export interface ButtonProps {
    buttonData?: ApiButtonData;
    href?: string;
    className?: string;
    children?: React.ReactNode;
    currentLanguage?: string; 
    external?: boolean;
}