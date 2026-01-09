"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IMAGES } from "@/utils/image";
import Link from "next/link";
import { ROUTES } from "@/utils/route";
import { Youtube } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const SectionHeader = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  const title = "Hướng dẫn tạo đơn hàng Album";
  return (
    <section className="w-[100%] mx-auto relative overflow-hidden bg-[#F5F5F5]">
      <div className="relative z-10 flex items-center h-full mx-auto py-4 text-black max-w-7xl">
        <div className="flex flex-row items-center px-5 lg:px-0 text-[16px]">
          <Link
            href={ROUTES.HOME}
            className="hover:text-[rgb(var(--fifteenth-rgb))]"
          >
            Trang chủ{" "}
          </Link>{" "}
          &ensp;/&ensp;{" "}
          <div
            onClick={() => {
              toast({
                variant: "default",
                title: "Thông báo",
                description: "Chức năng đang được phát triển.",
              });
            }}
            className="hover:text-[rgb(var(--fifteenth-rgb))]"
          >
            {isMobile
              ? title.length <= 17
                ? title
                : title.slice(0, 17) + "..."
              : title}
          </div>{" "}
          &ensp;
          <Image
            src={IMAGES.YOUTUBE}
            alt="Youtube"
            width={24}
            height={24}
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default SectionHeader;
