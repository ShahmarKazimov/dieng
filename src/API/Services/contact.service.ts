    // services/contactService.ts
    import { IncomingMessage } from 'http';
    import { serverApiClient } from '@/API/serverApiClient';
    import { ContactFormData, ApiResponse } from '@/lib/types/contact.types';

    class ContactService {
        private async makeRequest(
            endpoint: string,
            data: ContactFormData,
            lang: string,
            req?: IncomingMessage
        ): Promise<ApiResponse> {
            const client = req ? serverApiClient(req) : null;
            const headers = {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Accept-Language': lang,
            };

            if (client) {
                return await client.post(endpoint, data, { headers });
            } else {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`, {
                    method: 'POST',
                    headers,
                    body: JSON.stringify(data),
                });

                if (!res.ok) throw new Error(`Failed to send contact form: ${res.status}`);

                return {
                    status: res.status,
                    data: res.status === 204 ? null : await res.json()
                };
            }
        }

        async submitContactForm(
            data: ContactFormData,
            lang: string = 'en',
            req?: IncomingMessage
        ): Promise<boolean> {
            try {
                const response = await this.makeRequest('api/Requests/ContactUs', data, lang, req);
                if (response?.status === 204 || response?.status === 200) {
                    console.log('SUCCESS: Status code indicates success');
                    return true;
                }

                if (response?.data?.success === true) {
                    console.log('SUCCESS: Response data success is true');
                    return true;
                }

                return false;
            } catch {
                return false;
            }
        }
    }

    export const contactService = new ContactService();