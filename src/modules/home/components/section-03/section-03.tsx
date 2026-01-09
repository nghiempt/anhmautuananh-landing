// components/ReadingTestCollection.tsx
"use client";

import { IMAGES } from "@/utils/image";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface PromoBannerProps {
  topText: string;
  mainHeading: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage?: string;
  backgroundColor?: string;
  textColor?: string;
  isDark?: boolean;
}

const PromoBanner: React.FC<PromoBannerProps> = ({
  topText,
  mainHeading,
  description,
  buttonText,
  buttonLink,
  backgroundImage,
  backgroundColor = "bg-gray-100",
  textColor = "text-gray-900",
  isDark = false,
}) => {
  return (
    <div className={`relative h-96 overflow-hidden ${backgroundColor}`}>
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      <div className="relative h-full flex items-center">
        <div className="max-w-lg px-8 lg:px-12">
          <p
            className={`text-sm font-medium mb-2 ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Quick parcel delivery,{" "}
            <span className="text-amber-500">from $25</span>
          </p>
          <h2
            className={`text-4xl lg:text-5xl font-bold leading-tight mb-4 ${textColor}`}
          >
            {mainHeading}
          </h2>
          <p
            className={`text-base mb-8 ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {description}
          </p>

          <Link href={buttonLink}>
            <button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-none font-medium transition-colors duration-200 flex items-center space-x-2 group">
              <span>{buttonText}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

// Alternative version with background images
const Banner1WithImages: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-0 py-0">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
        {/* Left Banner - Interior Home Decor */}
        <div className="bg-white overflow-hidden">
          <div className="relative h-80">
            <Image
              src={IMAGES.BANNER_9}
              alt={``}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              width={397}
              height={465}
            />
            <div className="bg-black opacity-30 absolute top-0 left-0 right-0 bottom-0"></div>
            <div className="absolute top-[45%] left-0 right-0">
              <h3 className="text-2xl font-bold mb-2 text-white text-center uppercase">
                Album baby đáng yêu
              </h3>
            </div>
          </div>
        </div>

        {/* Right Banner - Pendant Lamp */}
        <div className="bg-white overflow-hidden">
          <div className="relative h-80">
            <Image
              src={IMAGES.BANNER_3}
              alt={``}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              width={397}
              height={465}
            />
            <div className="bg-black opacity-30 absolute top-0 left-0 right-0 bottom-0"></div>
            <div className="absolute top-[45%] left-0 right-0 ">
              <h3 className="text-2xl font-bold mb-2 text-white text-center uppercase">
                Gia đình là tất cả
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main component with responsive mobile version
const Section3: React.FC = () => {
  return (
    <>
      {/* Desktop version */}
      <div className="hidden lg:block max-w-7xl mx-auto px-5 lg:px-0 pb-20">
        <Banner1WithImages />
      </div>

      {/* Mobile version */}
      <div className="lg:hidden max-w-7xl mx-auto px-0 lg:px-0 pb-20">
        <Banner1WithImages />
      </div>
    </>
  );
};

export default Section3;
