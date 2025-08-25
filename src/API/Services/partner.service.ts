import { Partner, PartnerResponse } from '@/lib/types/partner.types';
import { IncomingMessage } from 'http';
import { serverApiClient } from '@/API/serverApiClient';

class PartnerService {
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

    // Get all partners
    async getAllPartners(lang: string, req?: IncomingMessage): Promise<Partner[]> {
        try {
            const response = await this.makeRequest('api/Partners', lang, req);
            const result: PartnerResponse = response.data;

            if (result?.success && result.data) {
                return result.data;
            }
            return [];
        } catch (error) {
            console.error('Error fetching partners:', error);
            return [];
        }
    }

}

export const partnerService = new PartnerService(); 