// lib/types/banner.types.ts

export interface BannerSEO {
  id: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  bannerId: string;
}

export interface BannerTranslation {
  id: string;
  title: string;
  description: string;
  slogan: string;
  languageCode: string;
  isDefault: boolean;
  bannerId: string;
}

export interface BannerButtonTranslation {
  id: string;
  languageCode: string;
  isDefault: boolean;
  text: string;
  bannerButtonId: string;
}

export interface BannerButton {
  id: string;
  url: string;
  bannerId: string;
  icon: string;
  translations: BannerButtonTranslation[];
}

export interface Banner {
  id: string;
  photo: string;
  type: string;
  seo?: BannerSEO;
  translations: BannerTranslation[];
  buttons: BannerButton[];
}

export interface BannerResponse {
  success: boolean;
  message: string;
  data: Banner[];
  statusCode?: number;
  errors?: string[];
}

export interface SingleBannerResponse {
  success: boolean;
  message: string;
  data: Banner;
  statusCode?: number;
  errors?: string[];
}

export interface ProcessedBannerData {
  id: string;
  type: string;
  slogan: string;
  title: string;
  description: string;
  photo: string;
  photo2: string;
  iframeUrl: string;
  languageCode: string;
  translationId: string;
  seo?: BannerSEO;
  index: number;
  buttons: Array<{
    id: string;
    url: string;
    bannerId: string;
    languageCode: string;
    text: string;
    icon: string;
  }>;
}

export interface BannerContentExtendedProps extends BannerContentProps {
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  sloganClassName?: string;
  imageClassName?: string;
  buttonClassName?: string;
  buttonGroupClassName?: string;
  buttonHref?: string; // Override button URL
}

export type BannerData = ProcessedBannerData;

export interface BannerContentProps {
  bannerData: BannerData;
  currentLanguage: string;
  index: number;
}