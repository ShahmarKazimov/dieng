import { IncomingMessage } from 'http';
import { ProcessedBannerData } from '@/lib/types/banner.types';
// Services/bannerTranslation.service.ts
import { serverApiClient } from '@/API/serverApiClient';

class BannerTranslationService {
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

  // Get banner by type
  async getBannersByType(lang: string, type: string, req?: IncomingMessage): Promise<ProcessedBannerData[]> {
    try {
      const response = await this.makeRequest(`api/Banners/${type}`, lang, req);
      const result = response.data;

      if (result?.success && result.data && Array.isArray(result.data)) {
        return result.data;
      }
      return [];
    } catch (error) {
      console.error('Error fetching banner by type:', error);
      return [];
    }
  }

  // // Get FIRST banner by type (returns single object)
  // async getBannerByType(lang: string, type: string, req?: any): Promise<ProcessedBannerData | null> {
  //   try {
  //     const banners = await this.getBannersByType(lang, type, req);
  //     return banners.length > 0 ? banners[0] : null;
  //   } catch (error) {
  //     console.error('Error fetching banner by type:', error);
  //     return null;
  //   }
  // }
}

export const bannerTranslationService = new BannerTranslationService();
