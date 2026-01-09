"use client";

import React from "react";
import Image from "next/image";
import { IMAGES } from "@/utils/image";
import Link from "next/link";
import { ROUTES } from "@/utils/route";

const SectionHeader = () => {
  return (
    <section className="w-[100%] h-[180px] lg:h-[280px] mx-auto lg:py-20 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="relative w-full h-full">
          <Image
            src={IMAGES.BANNER_11}
            alt="Wooden furniture and kitchenware"
            fill
            className="object-cover object-[10%_30%]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/60 to-transparent" />
        </div>
      </div>
      <div className="relative z-10 flex items-center h-full mx-auto text-black max-w-7xl">
        <div className="px-5 lg:px-0">
          <div className="text-3xl font-bold mb-3">Bảng giá</div>
          <div className="text-sm">
            <Link href={ROUTES.HOME}>Trang chủ </Link> &ensp;/&ensp;{" "}
            <Link href={ROUTES.PRICING}>Bảng giá sản phẩm</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionHeader;
