export interface Partner {
    id: string;
    photo: string;
    name: string;
    url: string;
}

export interface PartnerResponse {
    success: boolean;
    message: string;
    data: Partner[];
    statusCode?: number;
    errors?: string[];
}