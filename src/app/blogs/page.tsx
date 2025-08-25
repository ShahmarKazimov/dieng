// app/blog/page.tsx

import { BlogPageProps, BlogPost, PaginatedData } from "@/lib/types/blog.types";
import BlogCard from "@/components/Blog/BlogCard";
import Pagination from "@/components/Pagination/Pagination";
import { Suspense } from "react";
import { blogService } from "@/API/Services/blog.service";

const getData = async (lang: string, page: number = 1, size: number = 10): Promise<PaginatedData<BlogPost>> => {
  try {
    const result = await blogService.getBlogPosts(lang, { page, size });

    if (result.success) {
      return {
        Items: result.data,
        CurrentPage: page,
        PageSize: size,
        TotalItems: result.totalCount || 0,
        TotalPages: result.totalPages || 0,
      };
    }

    // If API call fails, return empty data
    return {
      Items: [],
      CurrentPage: page,
      PageSize: size,
      TotalItems: 0,
      TotalPages: 0,
    };
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return {
      Items: [],
      CurrentPage: page,
      PageSize: size,
      TotalItems: 0,
      TotalPages: 0,
    };
  }
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;

  const currentPage = Number(params.page) || 1;
  const pageSize = Number(params.size) || 6;
  const lang = params.lang || "en";

  const paginatedData = await getData(lang, currentPage, pageSize);
  const { Items: posts, CurrentPage, PageSize, TotalItems, TotalPages } = paginatedData;

  return (
    <div className="max-w-screen-xl mx-auto py-5 sm:py-25">
      {posts.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg">No blog posts found.</p>
        </div>
      ) : (
        <div className="relative">
          <div className="pt-[76px]">
            <BlogCard searchParams={params} posts={posts} />
          </div>

          {TotalPages > 1 && (
            <Suspense fallback={<div>Loading...</div>}>
              <Pagination
                currentPage={CurrentPage}
                totalPages={TotalPages}
                pageSize={PageSize}
                totalItems={TotalItems}
              />
            </Suspense>
          )}
        </div>
      )}
    </div>
  );
}
