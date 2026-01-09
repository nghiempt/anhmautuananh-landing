"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ROUTES } from "@/utils/route";

const SectionHeader = ({ title }: { title: string }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className="w-[100%] mx-auto relative overflow-hidden bg-[#F5F5F5]">
      <div className="relative z-10 flex items-center h-full mx-auto py-4 text-black max-w-7xl">
        <div className="px-5 lg:px-0 text-[16px]">
          <Link
            href={ROUTES.HOME}
            className="hover:text-[rgb(var(--fifteenth-rgb))]"
          >
            Trang chủ{" "}
          </Link>{" "}
           / {" "}
          <Link
            href={ROUTES.PRODUCT}
            className="hover:text-[rgb(var(--fifteenth-rgb))]"
          >
            Sản phẩm
          </Link>{" "}
           / {" "}
          {isMobile
            ? title.length <= 13
              ? title
              : title.slice(0, 13) + "..."
            : title}
        </div>
      </div>
    </section>
  );
};

export default SectionHeader;
