// lib/types/blog.types.ts

export interface BlogPost {
    id: string;
    title: string;
    shortContent: string;
    content: string;
    author: string;
    coverPhoto: string;
    iframeUrl: string;
    viewCount: number;
    languageCode: string;
    translationId: string;
    createdAt: string;
    seo: {
        id: string;
        blogId: string;
        metaTitle: string;
        metaDescription: string;
        keywords: string;
    };
}

export interface BlogResponse {
    success: boolean;
    message: string;
    data: BlogPost[] | BlogPost;
}

export interface PaginatedData<T> {
    Items: T[];
    CurrentPage: number;
    PageSize: number;
    TotalItems: number;
    TotalPages: number;
}

export interface ApiResponse<T> {
    Success: boolean;
    Message: string;
    Data: T;
}

export interface BlogPageProps {
    searchParams: Promise<{
        page?: string;
        size?: string;
        lang?: string;
    }>;
}

export interface BlogPaginationParams {
    page?: number;
    size?: number;
}

export interface BlogApiResponse {
    success: boolean;
    message: string;
    data: BlogPost[];
    totalCount?: number;
    totalPages?: number;
}

// API Response structure from your swagger documentation
export interface BlogApiData {
    items: BlogPost[];
    pageCount: number;
    totalItemCount: number;
    pageNumber: number;
    pageSize: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    isFirstPage: boolean;
    isLastPage: boolean;
}

export interface BlogApiFullResponse {
    success: boolean;
    message: string;
    data: BlogApiData;
}