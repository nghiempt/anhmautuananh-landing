import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { IMAGES } from "@/utils/image";
import Link from "next/link";
import { ROUTES } from "@/utils/route";

interface SlideData {
  id: number;
  title: string;
  subtitle: string;
  price: string;
  delivery: string;
  image: string;
  alt: string;
}

const FurnitureSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [progress, setProgress] = useState(0);

  const slides: SlideData[] = [
    {
      id: 1,
      title: "Khoảnh khắc yêu thương",
      subtitle: "Lưu giữ tình thân trong từng nụ cười",
      price: "chỉ từ 30.000đ",
      delivery: "Giao hàng tiết kiệm,",
      image: IMAGES.BANNER_02,
      alt: "Craft salt and pepper grinder",
    },
    {
      id: 2,
      title: "Kỷ yếu học trò",
      subtitle: "Ghi lại thanh xuân đầy kỷ niệm",
      price: "chỉ từ 30.000đ",
      delivery: "Giao hàng tiết kiệm,",
      image: IMAGES.BANNER_4,
      alt: "Dustpan & Brush Sets Cleaning",
    },
    {
      id: 3,
      title: "Sinh nhật đầu đời",
      subtitle: "Khoảnh khắc ngọt ngào của bé yêu",
      price: "chỉ từ 30.000đ",
      delivery: "Giao hàng tiết kiệm,",
      image: IMAGES.BANNER_5,
      alt: "Vase - Nera Wooden Bowls",
    },
  ];

  useEffect(() => {
    const slideDuration = 5000; // 5 seconds per slide
    setProgress(0); // Reset progress when slide changes

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setIsAnimating(true);
          setCurrentSlide((prevSlide) =>
            prevSlide + 1 >= slides.length ? 0 : prevSlide + 1
          );
          setTimeout(() => setIsAnimating(false), 1000); // Match transition duration
          return 0;
        }
        return prev + 100 / (slideDuration / 100); // Increment progress every 100ms
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, [currentSlide, slides.length]);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1 >= slides.length ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  return (
    <div className="relative w-full h-[390px] lg:h-[816px] bg-gray-50 overflow-hidden">
      {/* Slider Container */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide
                ? "opacity-100 translate-x-0"
                : index < currentSlide
                ? "opacity-0 -translate-x-full"
                : "opacity-0 translate-x-full"
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 transition-all duration-1000 ease-in-out bg-black z-10 opacity-30"></div>
              <Image
                src={slide.image}
                alt={slide.alt}
                width={1000}
                height={1000}
                className="w-full h-full object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-opacity-5"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex items-start pl-3 lg:pl-5 pt-6 lg:pt-20 h-full">
              <div className="container mx-auto px-4">
                <div className="max-w-2xl">
                  {/* Delivery Text */}
                  <div className="mb-4">
                    <span
                      className={`inline-block text-white text-sm lg:text-lg font-bold transition-all duration-1000 delay-0 ${
                        index === currentSlide
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 -translate-y-20"
                      }`}
                    >
                      {slide.delivery}
                    </span>
                    <span
                      className={`inline-block text-[rgb(var(--fifteenth-rgb))] text-sm lg:text-lg font-bold lg:ml-2 transition-all duration-1000 delay-100 ${
                        index === currentSlide
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 -translate-x-20"
                      }`}
                    >
                      {slide.price}
                    </span>
                  </div>

                  {/* Main Title */}
                  <h1
                    className={`text-2xl md:text-5xl lg:text-5xl font-bold text-white mb-2 leading-tight transition-all duration-1000 delay-300 ${
                      index === currentSlide
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-90"
                    }`}
                  >
                    {slide.title}
                  </h1>

                  {/* Subtitle */}
                  <h2
                    className={`text-2xl md:text-5xl lg:text-5xl font-bold text-white mb-8 leading-tight transition-all duration-1000 delay-500 ${
                      index === currentSlide
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-20"
                    }`}
                  >
                    {slide.subtitle}
                  </h2>

                  {/* CTA Button */}
                  <Link
                    href={`${ROUTES.PRODUCT}`}
                    className={`bg-[rgb(var(--fifteenth-rgb))] text-white px-8 py-3 rounded-md font-medium text-sm uppercase tracking-wide z-50 transition-all duration-1000 delay-700 hover:duration-100 hover:delay-100 hover:opacity-90 hover:scale-105 ${
                      index === currentSlide
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-20"
                    }`}
                  >
                    Đặt hàng ngay
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Dot Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            disabled={isAnimating}
            className={`relative w-2 h-2 rounded-full transition-all duration-300 disabled:cursor-not-allowed ${
              index === currentSlide
                ? "bg-[rgb(var(--primary-rgb))] scale-125"
                : "bg-white bg-opacity-60 hover:bg-opacity-80"
            }`}
          >
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
              {slides[index].subtitle}
            </span>
          </button>
        ))}
      </div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-200 z-20">
        <div
          className="h-full bg-[rgb(var(--fifteenth-rgb))] transition-all duration-100 ease-linear"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
    </div>
  );
};

export default FurnitureSlider;
