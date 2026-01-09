"use client";

import BlogsDetailPage from "@/modules/blog/[slug]";
import { Loader } from "lucide-react";
import { Suspense } from "react";

export default function BlogsDetail() {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Suspense
        fallback={
          <div className="w-full h-[500px] flex flex-col justify-center items-center">
            <Loader className="animate-spin" size={24} />
          </div>
        }
      >
        <BlogsDetailPage />
      </Suspense>
    </div>
  );
}
