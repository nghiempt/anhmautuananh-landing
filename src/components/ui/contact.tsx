import { IMAGES } from "@/utils/image";
import { SOCIAL_LINKS } from "@/utils/route";
import { ChevronUp, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Contact() {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="flex flex-row lg:flex-col gap-6 lg:gap-3.5">
      {/* <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 border border-gray-100 rounded-full animate-zoomFade z-10"></div>
        <div className="absolute inset-0 p-2 opacity-90 rounded-full animate-zoomIO z-0"></div>
        <Link
          href={SOCIAL_LINKS.PHONE}
          target="_blank"
          className="relative bg-gray-100 rounded-full p-2.5 z-10"
        >
          <Phone
            size={23}
            fill="black"
            strokeWidth={0}
            className="animate-bellRing"
          />
        </Link>
      </div> */}
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 border border-[#FC0B52] rounded-full animate-zoomInOut z-10"></div>
        {/* <div className="absolute inset-0 p-2 opacity-90 rounded-full animate-zoomIO z-0"></div> */}
        <Link
          href={SOCIAL_LINKS.TIKTOK}
          target="_blank"
          className="relative bg-white rounded-full p-0 z-10 animate-zoomInOutReverse overflow-hidden"
        >
          <div className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-[45%] text-[6px] bg-[linear-gradient(183.16deg,rgb(253,26,105)_8.16%,rgb(238,51,146)_104.17%)] w-[25px] h-[18px] text-white rounded-[8px] leading-[27px] text-center">
            LIVE
          </div>
          <Image
            src={IMAGES.LOGO}
            alt="Phone icon"
            width={1000}
            height={1000}
            className="w-[45px] h-[45px] object-cover"
          />
        </Link>
      </div>
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 border border-gray-100 rounded-full animate-zoomFade z-20"></div>
        <div className="absolute inset-0 p-2 opacity-90 rounded-full animate-zoomIO z-0"></div>
        <Link
          href={SOCIAL_LINKS.FACEBOOK}
          target="_blank"
          className="relative bg-gray-100 rounded-full p-2 z-20"
        >
          <Image
            src={IMAGES.FACEBOOK}
            alt="Facebook icon"
            width={1000}
            height={1000}
            className="w-7 h-7 rounded-full animate-bellRing"
          />
        </Link>
      </div>
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 border border-gray-100 rounded-full animate-zoomFade z-30"></div>
        <div className="absolute inset-0 p-2 opacity-90 rounded-full animate-zoomIO z-0"></div>
        <Link
          href={SOCIAL_LINKS.ZALO}
          target="_blank"
          className="relative bg-gray-100 rounded-full p-2 z-30"
        >
          <Image
            src={IMAGES.ZALO}
            alt="Facebook icon"
            width={1000}
            height={1000}
            className="w-7 h-7 rounded-full animate-bellRing"
          />
        </Link>
      </div>
      <div
        onClick={() => scrollToSection("home")}
        className="cursor-pointer relative flex items-center justify-center"
      >
        <div className="absolute inset-0 border border-gray-100 rounded-full animate-zoomFade z-40"></div>
        <div className="absolute inset-0 p-2 opacity-90 rounded-full animate-zoomIO z-0"></div>
        <div className="relative bg-gray-100 rounded-full p-2.5 z-40">
          <ChevronUp size={23} className="animate-bellRing" />
        </div>
      </div>
    </div>
  );
}
