export type ContactFormState = {
    message?: string;
    errors?: {
        name?: string[];
        surname?: string[];
        email?: string[];
        phone?: string[];
        company?: string[];
        message?: string[];
    };
    success?: boolean;
};

export interface ContactFormData {
    name: string;
    surname: string;
    email: string;
    phone?: string;
    company?: string;
    message: string;
}

export interface ApiResponse {
    status: number;
    data?: {
        success?: boolean;
        [key: string]: unknown;
    } | null;
}