import { ClientApiResponse } from "@/lib/types/client.types";
// services/client.service.ts
import { serverApiClient } from "@/API/serverApiClient";
import { IncomingMessage } from "http";

class ClientService {
  private async makeRequest(endpoint: string, req?: IncomingMessage) {
    const client = req ? serverApiClient(req) : null;
    const headers = {
      Accept: "application/json",
    };

    if (client) {
      return await client.get(endpoint, { headers });
    } else {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`, {
        headers,
        cache: "no-store", // fresh data
      });
      if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
      return { data: await res.json() };
    }
  }

  async getClients(req?: IncomingMessage): Promise<ClientApiResponse> {
    try {
      const response = await this.makeRequest("api/Clients", req);
      const result = response.data;

      if (result?.success && Array.isArray(result.data)) {
        return {
          success: true,
          message: result.message || "",
          data: result.data,
          statusCode: 200,
        };
      }

      return {
        success: false,
        message: result?.message || "Failed to fetch clients",
        data: [],
        statusCode: result?.statusCode || 500,
        errors: result?.errors || [],
      };
    } catch (error) {
      console.error("Error fetching clients:", error);
      return {
        success: false,
        message: "An error occurred while fetching clients",
        data: [],
        statusCode: 500,
        errors: [String(error)],
      };
    }
  }
}

export const clientService = new ClientService();
