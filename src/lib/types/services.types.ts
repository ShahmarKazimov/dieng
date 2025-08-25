// Types for Services
export interface ServiceSeo {
    id: string;
    metaTitle: string;
    metaDescription: string;
    keywords: string;
    serviceId: string;
}

export interface Service {
    id: string;
    photo: string;
    seo?: ServiceSeo;
    languageCode: string;
    isDefault: boolean;
    title: string;
    content: string;
}

export interface ServiceResponse {
    success: boolean;
    message: string;
    data: Service[];
    statusCode: number;
    errors: string[];
}