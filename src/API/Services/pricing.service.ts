// Services/pricing.service.ts
import { IncomingMessage } from "http";
import { PricingApiResponse } from "@/lib/types/pricing.types";
import { serverApiClient } from "@/API/serverApiClient";

class PricingService {
  private readonly baseHeaders = {
    Accept: "application/json",
  };

  private buildEndpoint(baseEndpoint: string, params?: Record<string, string>): string {
    if (!params || Object.keys(params).length === 0) return baseEndpoint;

    const queryString = Object.entries(params)
      .filter(([, value]) => value) // Changed '_' to nothing, using comma instead
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');

    return queryString ? `${baseEndpoint}?${queryString}` : baseEndpoint;
  }

  private createHeaders(lang: string): Record<string, string> {
    return {
      ...this.baseHeaders,
      "Accept-Language": lang,
    };
  }

  private async makeRequest(endpoint: string, lang: string, req?: IncomingMessage) {
    const client = req ? serverApiClient(req) : null;
    const headers = this.createHeaders(lang);

    if (client) {
      return await client.get(endpoint, { headers });
    }

    const url = `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`;
    const res = await fetch(url, {
      headers,
      cache: "no-store",
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`API Error: ${res.status} - ${errorText}`);
      throw new Error(`Failed to fetch: ${res.status} - ${errorText}`);
    }

    return { data: await res.json() };
  }

  private createSuccessResponse(data: PricingApiResponse): PricingApiResponse {
    return {
      success: true,
      message: data.message || "",
      data: data.data || [],
      statusCode: data.statusCode || 0,
      errors: data.errors || [],
    };
  }

  private createErrorResponse(data: Partial<PricingApiResponse> | null, defaultMessage: string): PricingApiResponse {
    return {
      success: false,
      message: data?.message || defaultMessage,
      data: [],
      statusCode: data?.statusCode || 0,
      errors: data?.errors || [],
    };
  }

  private createExceptionResponse(error: unknown): PricingApiResponse {
    console.error("Error fetching pricings:", error);
    return {
      success: false,
      message: "An error occurred while fetching pricings",
      data: [],
      statusCode: 0,
      errors: [error instanceof Error ? error.message : "Unknown error"],
    };
  }

  async getPricings(lang: string, req?: IncomingMessage, type?: string): Promise<PricingApiResponse> {
    try {
      const endpoint = this.buildEndpoint("api/Pricings", type ? { type } : undefined);
      const response = await this.makeRequest(endpoint, lang, req);
      const result = response.data;

      return result?.success && result.data
        ? this.createSuccessResponse(result)
        : this.createErrorResponse(result, "Failed to fetch pricings");

    } catch (error) {
      return this.createExceptionResponse(error);
    }
  }
}

export const pricingService = new PricingService();