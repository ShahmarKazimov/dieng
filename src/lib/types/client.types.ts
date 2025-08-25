export interface Client {
    id: string;
    photo: string;
    name: string;
    url: string;
}

export interface ClientApiResponse {
    success: boolean;
    message: string;
    data: Client[];
    statusCode?: number;
    errors?: string[];
}