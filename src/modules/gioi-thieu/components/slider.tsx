"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface Banner {
  id: number;
  imageUrl: string;
  title: string;
  description?: string;
}

const bannerData: Banner[] = [
  {
    id: 1,
    imageUrl:
      "https://res.cloudinary.com/farmcode/image/upload/v1737610165/iatt/tpncp39xket7idqaob6l.png",
    title: "Banner 1",
    description: "Description for banner 1",
  },
  {
    id: 2,
    imageUrl:
      "https://res.cloudinary.com/farmcode/image/upload/v1737610175/iatt/u05vnm3fa9fdoyfgjgtb.png",
    title: "Banner 2",
    description: "Description for banner 2",
  },
  {
    id: 3,
    imageUrl:
      "https://res.cloudinary.com/farmcode/image/upload/v1737610179/iatt/vru8xah5zjhwhjcgp1ry.png",
    title: "Banner 3",
    description: "Description for banner 3",
  },
  {
    id: 3,
    imageUrl:
      "https://res.cloudinary.com/farmcode/image/upload/v1737610190/iatt/f8ei0emwgqf6ykguk20f.png",
    title: "Banner 3",
    description: "Description for banner 3",
  },
];

const BannerSlider: React.FC = () => {
  const [currentBanner, setCurrentBanner] = useState(0);

  const autoPlayInterval = 3000;
  const banners = bannerData;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [banners.length]);

  const handleNext = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  const handlePrev = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <div className="relative w-full h-[180px] lg:h-[300px] mb-8 lg:mb-4">
      <div className="relative w-full">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute w-full transition-opacity duration-700 ease-in-out ${
              index === currentBanner ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={banner.imageUrl}
              alt={banner.title}
              className="w-full h-[180px] lg:h-[300px] object-cover"
              width={1350}
              height={250}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerSlider;
