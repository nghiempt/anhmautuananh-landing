// components/ReadingTestCollection.tsx
"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import BlogCard from "./components/card";
import { Swiper as SwiperCore } from "swiper/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import "@/styles/contact.css";
import { BlogService } from "@/services/blog";
import Title from "@/components/ui/title";
import SkeletonHomeSection6 from "@/components/ui/skeleton/home/skeleton-6";

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  tag: string;
  author: string;
  thumbnail: string;
  created_at: string;
  excerpt: string;
}

interface BlogCarouselProps {
  posts?: BlogPost[];
  title?: string;
  subtitle?: string;
}

const Section6: React.FC<BlogCarouselProps> = (props) => {
  const [blogs, setBlogs] = useState([] as BlogPost[]);
  const [isLoading, setIsLoading] = useState(true);

  const renderBlog = async () => {
    setIsLoading(true);
    const res = await BlogService.getAll();
    if (res && res.data.length > 0) {
      setBlogs(res.data);
      setIsLoading(false);
    }
  };

  const init = async () => {
    renderBlog();
  };

  useEffect(() => {
    init();
  }, []);

  const swiperRef = useRef<SwiperCore | null>(null);

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev(500);
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext(500);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-5 lg:px-0 mb-20">
      <section>
        {/* Header */}
        <div className="text-center mb-12">
          <div className="relative z-20">
            <div
              className={`absolute bottom-[8%] right-[11%] lg:right-[39%] h-2 w-36 bg-[rgb(var(--fifteenth-rgb))] opacity-45 z-10`}
            ></div>
            <h1
              className={`text-3xl font-bold text-gray-900 mb-2 z-20 relative`}
            >
              Bản Tin Mới Nhất
            </h1>
          </div>
          <p className="text-gray-600">
            Cập nhật những tin tức mới nhất từ chúng tôi. Đừng bỏ lỡ bất kỳ
            thông tin quan trọng nào!
          </p>
        </div>
        {isLoading ? (
          <div>
            <SkeletonHomeSection6 />
          </div>
        ) : (
          <div className="relative">
            <Swiper
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                300: {
                  slidesPerView: 1,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              loop={true}
              spaceBetween={10}
              pagination={{
                clickable: true,
                bulletClass: "swiper-pagination-bullet",
                bulletActiveClass: "swiper-pagination-bullet-active bg-white",
              }}
              modules={[Pagination, Navigation, Autoplay]}
              className="w-full sm:w-96 lg:w-full h-[530px] lg:h-[570px]"
            >
              {blogs?.map((post, index: number) => (
                <SwiperSlide key={index} className="">
                  <BlogCard key={post._id} post={post} />
                </SwiperSlide>
              ))}
            </Swiper>
            <button
              onClick={handlePrev}
              className="hidden lg:flex absolute left-0 top-[28%] -translate-y-1/2 -translate-x-1/2 bg-white shadow-lg rounded-full w-12 h-12 items-center justify-center z-10 disabled:opacity-50"
              aria-label="Previous"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="hidden lg:flex absolute right-0 top-[28%] -translate-y-1/2 translate-x-1/2 bg-white shadow-lg rounded-full w-12 h-12 items-center justify-center z-10 disabled:opacity-50"
              aria-label="Next"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Section6;
