// Services/services.service.ts
import { Service, ServiceResponse } from '@/lib/types/services.types';
import { IncomingMessage } from 'http';
import { serverApiClient } from '@/API/serverApiClient';

class ServiceService {
    private async makeRequest(endpoint: string, lang: string, req?: IncomingMessage) {
        const client = req ? serverApiClient(req) : null;
        const headers = {
            Accept: 'application/json',
            'Accept-Language': lang,
        };

        if (client) {
            return await client.get(endpoint, { headers });
        } else {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`, { headers });
            if (!res.ok) throw new Error('Failed to fetch');
            return { data: await res.json() };
        }
    }

    // Get all services
    async getAllServices(lang: string, req?: IncomingMessage): Promise<Service[]> {
        try {
            const response = await this.makeRequest('api/Services', lang, req);
            const result: ServiceResponse = response.data;

            if (result?.success && result.data) {
                return result.data;
            }
            return [];
        } catch (error) {
            console.error('Error fetching services:', error);
            return [];
        }
    }
}

export const serviceService = new ServiceService();