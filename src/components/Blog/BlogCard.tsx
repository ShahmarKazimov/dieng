import { BlogPost } from "@/lib/types/blog.types";
import { ProcessedBannerData } from '@/lib/types/banner.types';
import { bannerTranslationService } from '@/API/Services/banner.service';
import BannerContent from '@/components/ui/BannerContent';
import Button from '@/components/ui/Button';
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface BlogCardProps {
    post: BlogPost;
}

interface BlogSectionProps {
    searchParams?: { lang?: string };
    posts: BlogPost[];
}

// Individual Blog Card Component  
const BlogCardItem: React.FC<BlogCardProps> = ({ post }) => {
    return (
        <article className="bg-[#242832] p-3 border border-[#464646] rounded-lg overflow-hidden h-[450px] shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between">
            <div>
                <div className="relative h-[196px] overflow-hidden">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}/${post.coverPhoto}`}
                        alt={post.title}
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover rounded-md border border-[#464646]"
                    />
                </div>
                <div>
                    <h3 className="text-[18px] mt-3 text-[#FFFFFF] cursor-pointer">
                        <Link href={`blogs/${post.id}`}>{post.title}</Link>
                    </h3>
                </div>
            </div>
            <p className="text-[#FFFFFF] opacity-[70%] text-sm">
                {post.shortContent}
            </p>
            <div className="flex justify-between items-center text-sm">
                <div className="flex items-center">
                    <Button href={`blogs/${post.id}`} className="bg-[#131825] text-[#FFFFFF]">
                        <div className="flex items-center space-x-2">
                            <span>{post.author}</span>
                        </div>
                    </Button>
                </div>
                <div>
                    <span className="text-[#FFFFFF] opacity-[70%]">
                        {new Date(post.createdAt).toLocaleDateString(
                            post.languageCode === "de" ? "de-DE" : "en-US",
                            {
                                year: "numeric",
                                month: "long",
                                day: "numeric"
                            }
                        )}
                    </span>
                </div>
            </div>
        </article>
    );
};

// Main Blog Component with Banner
const BlogCard = async ({ searchParams, posts }: BlogSectionProps) => {
    const currentLanguage = searchParams?.lang || 'en';

    let banners: ProcessedBannerData[] = [];
    let error: string | null = null;

    try {
        const data = await bannerTranslationService.getBannersByType(currentLanguage, "blog");
        if (data.length > 0) {
            banners = data;
        } else {
            error = 'No banner data available';
        }
    } catch (err) {
        error = err instanceof Error ? err.message : 'An error occurred';
        console.error('Error fetching banner data:', err);
    }

    if (error && banners.length === 0) {
        return (
            <div className="flex mt-[99px] mb-[149px] w-full items-center justify-center">
                <div className="text-center">
                    <p className="text-red-500 text-sm">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            {/* Banner Section */}
            {banners.length > 0 && (
                <div className="banner-section mb-12">
                    {banners.map((banner, index) => (
                        <div key={banner.id || index} className="pb-25 pt-[76px] mx-auto">
                            <BannerContent
                                bannerData={banner}
                                currentLanguage={currentLanguage}
                                index={index}
                                imageClassName="hidden"
                                titleClassName="text-center text-white text-[32px] sm:text-[42px] font-[euclid-Bold] mb-4"
                                descriptionClassName="text-center text-[#B0B0B0] text-sm max-w-2xl mx-auto"
                                sloganClassName="text-center text-[#B0B0B0] text-[14px]"
                                className="sm:w-max mx-auto"
                            />
                        </div>
                    ))}
                </div>
            )}

            {/* Blog Posts Grid */}
            {posts && posts.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <BlogCardItem key={post.id} post={post} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default BlogCard;
