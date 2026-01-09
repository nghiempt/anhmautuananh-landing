"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IMAGES } from "@/utils/image";
import Link from "next/link";
import { ROUTES } from "@/utils/route";
import { BlogService } from "@/services/blog";
import { Calendar, Loader, PencilLine } from "lucide-react";
import { HELPER } from "@/utils/helper";
import { GlobalComponent } from "@/components/global";
import { Card } from "@/components/ui/card";
import SkeletonBlog from "@/components/ui/skeleton/blog/skeleton-blog";

interface Blog {
  _id: string;
  title: string;
  thumbnail: string;
  content: string;
  tag: string;
  author: string;
  excerpt: string;
  created_at: string;
}

const Section01 = () => {
  const [blogs, setBlogs] = useState([] as Blog[]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const renderBlog = async () => {
    const res = await BlogService.getAll();
    if (res && res.data.length > 0) {
      setBlogs(res.data);
      setIsLoading(false);
    }
  };

  const sortedPosts = [...blogs].sort((a, b) => {
    const dateA = new Date(a.created_at.split("/").reverse().join("-"));
    const dateB = new Date(b.created_at.split("/").reverse().join("-"));
    return dateB.getTime() - dateA.getTime();
  });

  const recentPosts = sortedPosts.slice(0, 4);

  const featuredPost = recentPosts[0];

  const regularPosts = recentPosts.slice(1, 4);

  const init = async () => {
    renderBlog();
  };

  useEffect(() => {
    init();
  }, []);
  return (
    <section className="w-[100%] h-full mx-auto pb-20 pt-7 relative overflow-hidden">
      <div className="relative z-10 flex flex-col justify-center items-center h-full mx-auto text-black max-w-7xl px-5 lg:px-0">
        <div className="relative z-20 mb-7 mt-10">
          <div
            className={`absolute bottom-[20%] left-[48%] lg:-right-[10%] h-2 w-36 bg-[rgb(var(--fifteenth-rgb))] opacity-45 z-10`}
          ></div>
          <h1 className={`text-3xl font-bold text-gray-900 mb-2 z-20 relative`}>
            Bài viết mới nhất
          </h1>
        </div>

        {isLoading ? (
          <div>
            <SkeletonBlog />
          </div>
        ) : (
          <>
            <Link
              href={`${ROUTES.BLOG}/${HELPER.convertSpacesToDash(
                featuredPost?.title
              )}?id=${featuredPost?._id}`}
            >
              <Card className="cursor-pointer overflow-hidden mb-8">
                <div className="grid lg:hidden">
                  <GlobalComponent.BlogCard
                    key={1}
                    id={featuredPost?._id}
                    image={featuredPost?.thumbnail}
                    title={featuredPost?.title}
                    excerpt={featuredPost?.excerpt}
                    date={HELPER.formatDate(featuredPost?.created_at)}
                    author={featuredPost?.author}
                    isMain={true}
                  />
                </div>
                <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 gap-6 bg-white rounded-lg overflow-hidden shadow-sm group">
                  <div className="relative h-auto overflow-hidden rounded-lg">
                    <Image
                      src={featuredPost?.thumbnail}
                      alt={featuredPost?.title}
                      width={1000}
                      height={200}
                      objectFit="cover"
                      priority
                      className="w-full h-full rounded-lg transform transition duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4 md:px-6 lg:p-0 flex flex-col">
                    <div>
                      <h2 className="text-xl font-semibold mb-2">
                        <a className="text-gray-800 hover:text-gray-600">
                          {featuredPost?.title}
                        </a>
                      </h2>
                      <p className="text-gray-600 mb-4 line-clamp-2 lg:line-clamp-none">
                        {featuredPost?.excerpt}
                      </p>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span className="mr-3 ml-1">
                        {HELPER.formatDate(featuredPost?.created_at)}
                      </span>
                      <PencilLine className="w-4 h-4" />
                      <span className="ml-1">{featuredPost?.author}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {regularPosts.map((blog: any, index: any) => (
                <Link
                  key={index}
                  href={`${ROUTES.BLOG}/${HELPER.convertSpacesToDash(
                    blog?.title
                  )}?id=${blog?._id}`}
                >
                  <GlobalComponent.BlogCard
                    id={blog?._id}
                    image={blog?.thumbnail}
                    title={blog?.title}
                    excerpt={blog?.excerpt}
                    date={HELPER.formatDate(blog?.created_at)}
                    author={blog?.author}
                    isMain={true}
                  />
                </Link>
              ))}
            </div>
            <div className="relative z-20 mb-7 mt-10">
              <div
                className={`absolute bottom-[20%] left-[47%] lg:-right-[20%] h-2 w-36 lg:w-[122px] bg-[rgb(var(--fifteenth-rgb))] opacity-45 z-10`}
              ></div>
              <h1
                className={`text-3xl font-bold text-gray-900 mb-2 z-20 relative`}
              >
                Tất cả bài viết
              </h1>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-2">
              {blogs?.map((blog: any, index: any) => (
                <Link
                  key={index}
                  // /${HELPER.getLastFourChars(
                  //   blog?._id)?b=${HELPER.convertSpacesToDash(
                  //   blog?.title
                  // )}
                  href={`${ROUTES.BLOG}/${HELPER.convertSpacesToDash(
                    blog?.title
                  )}?id=${blog?._id}`}
                >
                  <div className="mb-6">
                    <GlobalComponent.BlogCard
                      key={index}
                      id={blog?._id}
                      image={blog?.thumbnail}
                      title={blog?.title}
                      excerpt={blog?.excerpt}
                      date={HELPER.formatDate(blog?.created_at)}
                      author={blog?.author}
                      isMain={true}
                    />
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Section01;
