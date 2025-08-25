// lib/types/pricing.types.ts

export interface PricingBenefit {
    id: string;
    checked: boolean;
    pricing_TranslationId: string;
    text: string;
}

export interface PricingSeo {
    id: string;
    metaTitle: string;
    metaDescription: string;
    keywords: string;
    pricingId: string;
}

export interface PricingItem {
    id: string;
    type:string;
    slogan: string;
    title: string;
    description: string;
    buttonText: string;
    languageCode: string;
    isDefault: boolean;
    benefits: PricingBenefit[];
    seo: PricingSeo;
}

export interface PricingApiResponse {
    success: boolean;
    message: string;
    data: PricingItem[];
    statusCode: number;
    errors: string[];
}