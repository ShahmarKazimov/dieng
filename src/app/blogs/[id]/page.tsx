// blogs/[id]/page.tsx

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ lang?: string }>;
};

import type { Metadata } from "next";
import { blogService } from "@/API/Services/blog.service";
import { cookies } from "next/headers";
import BlogDetailCard from "@/components/Blog/BlogDetailCard";

async function getLangFromCookies(): Promise<string> {
  const cookieStore = await cookies();
  const langCookie = cookieStore.get("lang");
  return langCookie?.value || "en";
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const searchParamsResolved = await searchParams;
  const lang = searchParamsResolved.lang || await getLangFromCookies();

  const post = await blogService.getBlogPost(id, lang);

  if (!post) {
    return {
      title: "Blog not found",
      description: "",
      keywords: "",
    };
  }

  return {
    title: post.seo?.metaTitle,
    description: post.seo?.metaDescription,
    keywords: post.seo?.keywords,
  };
}

export default async function BlogPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const searchParamsResolved = await searchParams;
  const lang = searchParamsResolved.lang || await getLangFromCookies();

  const post = await blogService.getBlogPost(id, lang);

  if (!post) {
    return <p>Blog post not found</p>;
  }

  return (
    <div>
      <BlogDetailCard post={post} lang={lang} />
    </div>
  );
}