"use client";

import Link from "next/link";
import { BlogPost } from "./components/tips-post";
import { Sidebar } from "./components/sidebar";
import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { BlogService } from "@/services/blog";
import SkeletonBlog from "@/components/ui/skeleton/blog/skeleton-blog";
import SkeletonBlogDetail from "@/components/ui/skeleton/blog/skeleton-detail";
import SkeletonBlogDetailSidebar from "@/components/ui/skeleton/blog/skeleton-detail-sidebar";

interface BlogPost {
  _id: string;
  title: string;
  thumbnail: string;
  content: string;
  facebook: string;
  twitter: string;
  instagram: string;
  author_id: string;
  author: string;
  created_at: string;
}

interface BlogPostProps {
  _id: string;
  title: string;
  thumbnail: string;
  content: string;
  facebook: string;
  twitter: string;
  instagram: string;
  author_id: string;
  author_name: string;
  created_at: string;
}

export default function BlogsContentDetail() {
  const [data, setData] = React.useState<BlogPost[]>([]);
  const pathParams = new URLSearchParams(location.search);
  const blogId = pathParams.get("blog");
  const [isLoading, setIsLoading] = useState(true);

  const getAllBlog = useCallback(async () => {
    try {
      const res = await BlogService.getAll();

      if (res.data.length > 0) {
        setData(res);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching blog data:", error);
      setData([]);
    }
  }, []);

  const [post, setPost] = useState<BlogPostProps | null>(null);

  const getDetailBlog = useCallback(async () => {
    if (blogId) {
      if (typeof blogId === "string") {
        const res = await BlogService.getBlogById(blogId);
        if (res) {
          setPost(res.data);
        }
      }
    } else {
      const storeId = localStorage.getItem("selectedBlogId");
      const res = await BlogService.getBlogById(storeId || "");
      if (res) {
        setPost(res.data);
      }
    }
  }, [blogId]);

  const init = useCallback(async () => {
    setIsLoading(true);
    try {
      await Promise.all([getAllBlog(), getDetailBlog()]);
    } finally {
      setIsLoading(false);
    }
  }, [getAllBlog, getDetailBlog]);

  useEffect(() => {
    init();
  }, []);

  return (
    <main className="w-full flex flex-col justify-center items-center overflow-hidden">
      <div className="w-full relative bg-[#FDF8F5] min-h-[200px] md:min-h-[240px] flex items-center overflow-hidden px-4">
        <div className="absolute left-4 md:left-12 bottom-8 md:bottom-12">
          <div className="grid grid-cols-4 gap-1 md:gap-2">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-[rgb(var(--secondary-rgb))] opacity-60"
              />
            ))}
          </div>
        </div>
        <div className="max-w-7xl mx-auto w-full text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Chi Tiết Bài Viết
          </h1>
          <nav className="flex justify-center items-center space-x-2 text-sm md:text-base text-gray-600">
            <Link href="/" className="hover:text-gray-900 transition-colors">
              Trang Chủ
            </Link>
            <span className="text-gray-400">•</span>
            <span className="text-gray-900">Bài Viết</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-900">
              {(post?.title || "").length > 20
                ? `${post?.title.slice(0, 20)}...`
                : post?.title}
            </span>
          </nav>
        </div>
        <div className="absolute -right-8 md:-right-16 top-1/2 -translate-y-1/2">
          <div className="w-24 md:w-32 h-24 md:h-32 border-4 border-[rgb(var(--secondary-rgb))] rounded-full opacity-20" />
        </div>
      </div>
      <div className="w-[95%] lg:w-full flex flex-col justify-center items-center mt-6 md:mt-10 px-4 md:px-0">
        <div className="w-full md:w-[90%] lg:w-3/4 flex flex-col lg:flex-row gap-8 lg:gap-12">
          {isLoading ? (
            <div className="flex flex-col lg:flex-row gap-[50px]">
              <div>
                <SkeletonBlogDetail />
              </div>
              <div>
                <SkeletonBlogDetailSidebar />
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1">
                <BlogPost />
              </div>
              <div className="w-full lg:w-80">
                <Sidebar data={data} />
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
