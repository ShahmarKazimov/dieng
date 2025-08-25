import { BlogApiResponse, BlogPaginationParams, BlogPost } from '@/lib/types/blog.types';

// Services/blog.service.ts
import { IncomingMessage } from 'http';
import { serverApiClient } from '@/API/serverApiClient';

class BlogService {
    private async makeRequest(endpoint: string, lang: string, req?: IncomingMessage) {
        const client = req ? serverApiClient(req) : null;
        const headers = {
            Accept: 'application/json',
            'Accept-Language': lang,
        };

        if (client) {
            return await client.get(endpoint, { headers });
        } else {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`, { 
                headers,
                cache: 'no-store' // Ensures fresh data on each request
            });
            if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
            return { data: await res.json() };
        }
    }

    async getBlogPosts(
        lang: string, 
        params: BlogPaginationParams = { page: 1, size: 10 }, 
        req?: IncomingMessage
    ): Promise<BlogApiResponse> {
        try {
            const queryParams = new URLSearchParams({
                Page: params.page?.toString() || '1',
                Size: params.size?.toString() || '10'
            });

            const response = await this.makeRequest(
                `api/Blogs?${queryParams.toString()}`, 
                lang, 
                req
            );
            
            const result = response.data;
            
            if (result?.success && result.data) {
                return {
                    success: true,
                    message: result.message || '',
                    data: result.data.items || [],
                    totalCount: result.data.totalItemCount || 0,
                    totalPages: result.data.pageCount || 0
                };
            }
            
            return {
                success: false,
                message: result?.message || 'Failed to fetch blog posts',
                data: [],
                totalCount: 0,
                totalPages: 0
            };
        } catch (error) {
            console.error('Error fetching blog posts:', error);
            return {
                success: false,
                message: 'An error occurred while fetching blog posts',
                data: [],
                totalCount: 0,
                totalPages: 0
            };
        }
    }

    async getBlogPost(id: string, lang: string, req?: IncomingMessage): Promise<BlogPost | null> {
        try {
            const response = await this.makeRequest(`api/Blogs/${id}`, lang, req);
            const result = response.data;
            
            if (result?.success && result.data) {
                return result.data;
            }
            return null;
        } catch (error) {
            console.error('Error fetching blog post:', error);
            return null;
        }
    }
}

export const blogService = new BlogService();