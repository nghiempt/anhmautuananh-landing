import React from "react";
import FastMarquee from "react-fast-marquee";
import Link from "next/link";
import { Phone } from "lucide-react";

const TopBannerMobile: React.FC = () => {
  return (
    <div className="lg:hidden flex w-full bg-[rgb(var(--primary-rgb))] text-white py-3 px-0">
      <div className="w-full flex items-center">
        <FastMarquee loop={0} speed={70} gradient={false}>
          <div className="flex items-center space-x-5 mr-5">
            <span>Khung Ảnh - Album Chất lượng</span>
            <Link
              href="tel:0939468252"
              className="hover:text-black transition-colors flex items-center gap-2"
            >
              <Phone size={14} className="text-black" /> 0913.686.046
            </Link>
          </div>
        </FastMarquee>
      </div>
    </div>
  );
};

export default TopBannerMobile;
