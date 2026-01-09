import Image from "next/image";
import { useEffect, useState } from "react";
import { BlogService } from "@/services/blog";
import { HELPER } from "@/utils/helper";
import { Facebook } from "lucide-react";
import SkeletonBlogDetail from "@/components/ui/skeleton/blog/skeleton-detail";

interface BlogPostProps {
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

export const BlogPost = () => {
  const [post, setPost] = useState<BlogPostProps | null>(null);
  const pathParams = new URLSearchParams(location.search);
  const blogId = pathParams.get("id");
  const [isLoading, setIsLoading] = useState(true);

  const handleFacebookShare = (link: string) => {
    window.open(`https://www.facebook.com/share.php?u=${link}`, "_blank");
  };

  const init = async () => {
    setIsLoading(true);
    try {
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
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    init();
  }, []);

  if (isLoading) {
    return (
      <div>
        <SkeletonBlogDetail />
      </div>
    );
  }

  return (
    <article className="w-full bg-white">
      <div className="space-y-4">
        <div className="w-full aspect-video relative">
          <Image
            src={post?.thumbnail || "/"}
            alt="blog cover"
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div className="flex flex-wrap items-center text-xs md:text-sm text-gray-500 space-x-2 md:space-x-4">
          <span>By {post?.author}</span>
          <span>•</span>
          <span>{HELPER.formatDate(post?.created_at || "")}</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          {post?.title}
        </h1>
        <div>
          <div
            dangerouslySetInnerHTML={{
              __html: post?.content || "",
            }}
          />
        </div>
        <div className="border-t border-b py-4 mt-8">
          <div className="flex flex-wrap items-center gap-2 md:gap-4">
            <div className="flex flex-row justify-center items-center gap-2 md:gap-4">
              <div
                onClick={() =>
                  handleFacebookShare(
                    `https://www.inanhhathu.com/blog/${HELPER.convertSpacesToDash(
                      post?.title || ""
                    )}?id=${post?._id}`
                  )
                }
                className="flex flex-row justify-center gap-2 items-center text-white hover:opacity-90 cursor-pointer bg-[#1878F2] py-2 px-4 rounded-lg"
              >
                Chia sẻ ngay
                <Facebook color="#ffffff" strokeWidth={0.5} fill="white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
