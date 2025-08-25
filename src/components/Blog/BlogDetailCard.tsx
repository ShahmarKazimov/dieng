import { BlogPost } from "@/lib/types/blog.types";
import React from "react";

interface BlogDetailCardProps {
    post: BlogPost;
    lang: string;
}

const BlogDetailCard: React.FC<BlogDetailCardProps> = ({ post, lang }) => {
    return (
        <article className="relative text-center shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between">
            <div className="pt-32 pb-20">
                <h1 className="text-white text-[22px] sm:text-[42px] font-[euclid-Bold] my-3">{post.title}</h1>
                <span className="text-[#FFFFFF] opacity-[70%]">
                    {lang && lang.toLowerCase() === "de" ? "Digital vernetzt:" : "Published on:"}{" "}
                    {new Date(post.createdAt).toLocaleDateString(
                        lang && lang.toLowerCase() === "de" ? "de-DE" : "en-US",
                        {
                            year: "numeric",
                            month: "long",
                            day: "numeric"
                        }
                    )}
                </span>
            </div>
            <div
                className="blog-content mb-13 text-left text-sm"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />
        </article>
    );
};

export default BlogDetailCard;