export interface ModuleFeature {
    title: string;
    description: string;
    moduleFeatureId: string;
}

export interface ModuleSEO {
    id: string;
    moduleId: string;
    metaTitle: string;
    metaDescription: string;
    keywords: string;
}

export interface ModuleData {
    id: string;
    photo: string;
    title: string;
    description: string;
    htmlDescription: string;
    detailsTitle: string;
    languageCode: string;
    isDefault: boolean;
    features: ModuleFeature[];
    seo: ModuleSEO;
}

export interface ModuleResponse {
    success: boolean;
    message: string;
    data: ModuleData[];
    statusCode: number;
    errors: string[];
}
