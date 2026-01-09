import { BlogService } from "@/services/blog";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HELPER } from "@/utils/helper";
import { useRouter } from "next/navigation";
import { IMAGES } from "@/utils/image";
import { SOCIAL_LINKS } from "@/utils/route";
import SkeletonBlogDetailSidebar from "@/components/ui/skeleton/blog/skeleton-detail-sidebar";

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

interface AuthorProps {
  _id: string;
  name: string;
  avt: string;
  introduction: string;
  facebook: string;
  twitter: string;
  linkedin: string;
  instagram: string;
}

export const Sidebar = ({ data }: { data: any }) => {
  // const [post, setPost] = useState<BlogPostProps | null>(null);
  const [author, setAuthor] = useState<BlogPostProps | null>(null);
  const [iPo, setIPo] = useState<string | null>(null);
  const pathParams = new URLSearchParams(location.search);
  const blogId = pathParams.get("id");
  const [isLoading, setIsLoading] = useState(true);

  const init = async () => {
    setIsLoading(true);
    if (blogId) {
      setIPo(blogId);
      const res = await BlogService.getBlogById(blogId || "");
      if (res) {
        setAuthor(res.data);
      }
    } else {
      const storeId = localStorage.getItem("selectedBlogId");
      setIPo(storeId);
      const res = await BlogService.getBlogById(storeId || "");
      if (res) {
        setAuthor(res.data);
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

  // const { setSelectedBlogId } = useBlog();
  const router = useRouter();

  const handleClick = (id: string, title: string) => {
    // setSelectedBlogId(id);
    localStorage.setItem("selectedBlogId", id);
    router.push(`/blog/${HELPER.convertSpacesToDash(title)}?id=${id}`);
  };

  if (isLoading) {
    return (
      <aside className="space-y-4 lg:space-y-8">
        <SkeletonBlogDetailSidebar />
      </aside>
    );
  }

  return (
    <aside className="space-y-4 lg:space-y-8">
      <div className="hidden lg:flex flex-col bg-gray-100 p-6 rounded-lg text-center">
        <Image
          src={IMAGES.LOGO}
          alt="Jenny Alexandra"
          width={120}
          height={120}
          className="rounded-full h-32 w-32 object-cover mx-auto mb-4"
        />
        <h3 className="font-bold mb-1">{author?.author}</h3>
        <p className="text-gray-600 text-sm">{author?.title}</p>
        <div className="flex flex-row items-center justify-center gap-5 mt-5">
          <Link
            href={SOCIAL_LINKS.FACEBOOK}
            target="_blank"
            className="text-blue-600 hover:text-blue-700"
          >
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/768px-Facebook_Logo_%282019%29.png"
              alt="alt"
              width={1000}
              height={1000}
              className="w-5 h-5 lg:w-7 lg:h-7"
            />
          </Link>
          <Link
            href={SOCIAL_LINKS.ZALO}
            target="_blank"
            className="text-gray-900 hover:text-gray-700"
          >
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Icon_of_Zalo.svg/2048px-Icon_of_Zalo.svg.png"
              alt="alt"
              width={1000}
              height={1000}
              className="w-5 h-5 lg:w-7 lg:h-7"
            />
          </Link>
          <Link href={SOCIAL_LINKS.TIKTOK} target="_blank">
            <Image
              src="https://banner2.cleanpng.com/20231123/xjc/transparent-tiktok-logo-black-and-white-logo-tiktok-app-minima-minimalist-black-and-white-tiktok-app-1711004158896.webp"
              alt="alt"
              width={1000}
              height={1000}
              className="w-5 h-5 lg:w-7 lg:h-7 rounded-full"
            />
          </Link>
          <Link href={SOCIAL_LINKS.SHOPPE} target="_blank">
            <Image
              src="https://tiemquatiko.com/wp-content/uploads/2022/08/shopee-circle-logo-design-shopping-bag-13.png"
              alt="alt"
              width={1000}
              height={1000}
              className="w-5 h-5 lg:w-7 lg:h-7"
            />
          </Link>
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="font-bold text-lg mb-4">Bài viết liên quan</h3>
        <div className="grid gap-4">
          {data.data
            ?.filter((po: any) => {
              if (Array.isArray(iPo)) return false;
              return po?._id !== iPo;
            })
            ?.slice(0, 4)
            ?.map((post: any, index: number) => (
              <Link
                key={index}
                href={`/blog/${HELPER.convertSpacesToDash(post.title)}?id=${
                  post?._id
                }`}
              >
                <div
                  onClick={() => {
                    handleClick(post._id, post.title);
                  }}
                  className="cursor-pointer flex items-start space-x-4 group"
                >
                  <div className="flex-shrink-0 w-20 h-20 relative">
                    <Image
                      src={post?.thumbnail || "/"}
                      alt={post?.title}
                      fill
                      className="rounded-lg object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-gray-900 font-medium group-hover:text-blue-600 transition-colors text-sm md:text-base line-clamp-2">
                      {post?.title}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-500 mt-1">
                      {HELPER.formatDate(post?.created_at)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </aside>
  );
};
