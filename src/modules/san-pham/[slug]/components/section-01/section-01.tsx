// components/ReadingTestCollection.tsx
"use client";

import { IMAGES } from "@/utils/image";
import {
  BarChart3,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Heart,
  Minus,
  Play,
  Plus,
  Search,
  Star,
} from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Swiper as SwiperCore } from "swiper/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import "@/styles/contact.css";
import ProductCard from "./components/card";
import { ProductService } from "@/services/product";
import { useRouter, useSearchParams } from "next/navigation";
import { HELPER } from "@/utils/helper";
import SectionHeader from "../section-header";
import Link from "next/link";
import { SOCIAL_LINKS } from "@/utils/route";
import SkeletonProductRelevant from "@/components/ui/skeleton/product/skeleton-product-relevant";
import SkeletonProductDetail from "@/components/ui/skeleton/product/skeleton-product-detail";
import HtmlContent from "@/components/ui/html-content";

interface Product {
  _id: string;
  name: string;
  description: string;
  introduction: string;
  product_option: [
    {
      size: string;
      price: string;
    }
  ];
  category: string;
  color: string[];
  thumbnail: string;
  discount: string;
  rating: string;
  images: string[];
  sold: number;
  created_at: string;
}

const Section1: React.FC = () => {
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [relatedProduct, setRelatedProduct] = useState<Product[]>([]);
  const [expanded, setExpanded] = useState(false);
  const searchParams = useSearchParams();
  const productID = searchParams.get("spid");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const router = useRouter();
  const [isLoadingDetail, setIsLoadingDetail] = useState(true);
  const [isLoadingRelevant, setIsLoadingRelevant] = useState(true);
  const [video, setVideo] = useState<string>("");
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoThumbnail, setVideoThumbnail] = useState<string>("");

  const getPartialContent = (content: string) => {
    const words = content.split(" ");
    return words.slice(0, Math.ceil(words.length / 6)).join(" ") + "...";
  };

  // Generate video thumbnail
  const generateVideoThumbnail = (videoUrl: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      video.crossOrigin = "anonymous";
      video.preload = "metadata";

      video.onloadedmetadata = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Seek to 1 second or 10% of video duration
        video.currentTime = Math.min(1, video.duration * 0.1);
      };

      video.onseeked = () => {
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const thumbnailUrl = canvas.toDataURL("image/jpeg", 0.8);
          resolve(thumbnailUrl);
        } else {
          reject(new Error("Canvas context not available"));
        }
      };

      video.onerror = () => {
        reject(new Error("Failed to load video"));
      };

      video.src = videoUrl;
    });
  };

  const getVideoThumbnail = async (videoUrl: string) => {
    try {
      const thumbnail = await generateVideoThumbnail(videoUrl);
      setVideoThumbnail(thumbnail);
    } catch (error) {
      console.error("Error generating video thumbnail:", error);
      setVideoThumbnail(product?.thumbnail || "");
    }
  };

  const init = async () => {
    try {
      setIsLoadingDetail(true);
      setIsLoadingRelevant(true);
      let productCate = "";
      if (productID) {
        const fetchProduct = async () => {
          try {
            const res = await ProductService.getProductById(productID);
            if (res && res.data) {
              setProduct(res.data);
              setVideo(res.data.video);

              // Generate video thumbnail if video exists
              if (res.data.video) {
                await getVideoThumbnail(res.data.video);
              }

              productCate = res.data.category;
              if (res.data?.product_option?.length > 0) {
                setSelectedSize(res.data.product_option[0].size);
              }
              if (res.data?.color.length > 0) {
                setSelectedColor(res.data.color[0]);
              }
              setIsLoadingDetail(false);
            }
          } catch (error) {
            console.error("Error fetching product:", error);
          }
        };
        fetchProduct();
      }

      const res = await ProductService.getAll();

      if (res && res.data && res.data.length > 0) {
        setRelatedProduct(res.data);
        setIsLoadingRelevant(false);
      } else {
        console.log("No products found in response");
        setRelatedProduct([]);
      }
    } catch (error) {
      console.error("Error initializing products:", error);
      setRelatedProduct([]);
    }
  };

  useEffect(() => {
    init();
  }, []);

  const imageList = product
    ? [videoThumbnail || video, product.thumbnail, ...product.images].filter(
        Boolean
      )
    : [];

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };

  const getCurrentPrice = (): string => {
    const options = product?.product_option || [];
    const selectedOption = options.find(
      (option: any) => option.size === selectedSize
    );
    const basePrice = selectedOption?.price ?? options[0]?.price ?? "0";

    if (product?.discount && product.discount !== "0") {
      const priceNum = Number(basePrice);
      const discountNum = Number(product.discount);
      const discounted = priceNum - discountNum * Number(priceNum * 0.01);
      return String(discounted);
    }

    return basePrice;
  };

  const getOriginPrice = (): string => {
    const options = product?.product_option || [];
    const selectedOption = options.find(
      (option: any) => option.size === selectedSize
    );
    return selectedOption?.price ?? options[0]?.price ?? "0";
  };

  const swiperRef = useRef<SwiperCore | null>(null);

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev(500);
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext(500);
    }
  };

  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [thumbnailSwiperInstance, setThumbnailSwiperInstance] =
    useState<any>(null);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);

  const handleSwiper = (swiper: any) => {
    setSwiperInstance(swiper);
  };

  const handleSlideChange = (swiper: any) => {
    setActiveSlide(swiper.activeIndex);
    thumbnailSwiperInstance?.slideTo(swiper.activeIndex);
    // Dừng video khi chuyển slide
    if (isVideoPlaying) {
      setIsVideoPlaying(false);
    }
  };

  const handleThumbnailClick = (index: number) => {
    setActiveSlide(index);
    swiperInstance?.slideTo(index);
    // Dừng video khi chuyển slide
    if (isVideoPlaying) {
      setIsVideoPlaying(false);
    }
  };

  const handleThumbnailSlideChange = (swiper: any) => {
    const firstVisibleIndex = swiper.realIndex;
    setActiveSlide(firstVisibleIndex);
    swiperInstance?.slideTo(firstVisibleIndex);
  };

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
  };

  const handleVideoPause = () => {
    setIsVideoPlaying(false);
  };

  const social = [
    { image: IMAGES.FACEBOOK, link: SOCIAL_LINKS.FACEBOOK },
    { image: IMAGES.ZALO, link: SOCIAL_LINKS.ZALO },
  ];

  return (
    <>
      <SectionHeader title={product?.name ?? ""} />
      <div className="max-w-7xl mx-auto px-5 lg:px-0 py-5">
        {/* Main Product Section */}
        {isLoadingDetail ? (
          <div>
            <SkeletonProductDetail />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Product Images */}
            <div className="relative flex flex-col">
              {/* <div className="hidden w-full lg:w-96 h-[270px] lg:h-[300px] mb-5 lg:mb-0 lg:mr-5">
                <Swiper
                  onSwiper={setThumbnailSwiperInstance}
                  slidesPerView={3}
                  spaceBetween={16}
                  direction={"vertical"}
                  navigation={false}
                  centeredSlides={false}
                  onSlideChange={handleThumbnailSlideChange}
                  className="h-full w-full"
                  modules={[Navigation]}
                >
                  {imageList?.map((proImg: any, index: any) => (
                    <SwiperSlide key={index}>
                      <div
                        className={`w-full h-full overflow-hidden cursor-pointer relative transition-all duration-300 ${
                          activeSlide === index
                            ? "border-[rgb(var(--fifteenth-rgb))] border-2"
                            : "border-transparent"
                        }`}
                        onClick={() => handleThumbnailClick(index)}
                      >
                        <Image
                          src={proImg}
                          alt={`variant ${index + 1}`}
                          className="object-cover w-full h-full border border-gray-200"
                          width={1000}
                          height={1000}
                        />
                        {index === 0 && video && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                              <Play
                                className="w-4 h-4 text-gray-800 ml-0.5"
                                fill="currentColor"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div> */}

              <div className="lg:w-full h-[570px]">
                <Swiper
                  onSwiper={handleSwiper}
                  onSlideChange={handleSlideChange}
                  slidesPerView={1}
                  spaceBetween={10}
                  navigation={false}
                >
                  {imageList?.map((proImg: any, index: any) => (
                    <SwiperSlide key={index}>
                      <div className="aspect-square w-full h-[568px] relative bg-gray-50 flex items-center justify-center">
                        {/* Hiển thị video nếu là item đầu tiên và có video */}
                        {index === 0 && video ? (
                          <div className="w-full h-full relative">
                            {isVideoPlaying ? (
                              <video
                                className="w-full h-full object-cover"
                                controls
                                autoPlay
                                onPlay={handleVideoPlay}
                                onPause={handleVideoPause}
                                onEnded={handleVideoPause}
                              >
                                <source src={video} type="video/mp4" />
                                Trình duyệt của bạn không hỗ trợ video.
                              </video>
                            ) : (
                              <div className="relative w-full h-full">
                                <Image
                                  src={
                                    videoThumbnail ||
                                    product?.thumbnail ||
                                    proImg
                                  }
                                  alt="Video thumbnail"
                                  className="w-full h-full object-cover"
                                  width={1000}
                                  height={1000}
                                />
                                <button
                                  onClick={handleVideoPlay}
                                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-40 transition-all duration-300"
                                >
                                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
                                    <Play
                                      className="w-8 h-8 text-gray-800 ml-1"
                                      fill="currentColor"
                                    />
                                  </div>
                                </button>
                              </div>
                            )}
                          </div>
                        ) : (
                          <Image
                            src={proImg}
                            alt="Product Image"
                            className="max-w-full max-h-full object-cover object-center"
                            width={1000}
                            height={1000}
                          />
                        )}
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              <div className=" w-full lg:h-[170px] h-[100px] mt-5">
                <Swiper
                  onSwiper={setThumbnailSwiperInstance}
                  slidesPerView={3}
                  spaceBetween={16}
                  direction={"horizontal"}
                  navigation={false}
                  centeredSlides={false}
                  onSlideChange={handleThumbnailSlideChange}
                  className="h-full w-full"
                  modules={[Navigation]}
                >
                  {imageList?.map((proImg: any, index: any) => (
                    <SwiperSlide key={index}>
                      <div
                        className={`w-full lg:h-[170px] h-[100px] overflow-hidden cursor-pointer relative transition-all duration-300 ${
                          activeSlide === index
                            ? "border-[rgb(var(--fifteenth-rgb))] border-2"
                            : "border-transparent"
                        }`}
                        onClick={() => handleThumbnailClick(index)}
                      >
                        <Image
                          src={proImg}
                          alt={`variant ${index + 1}`}
                          className="object-cover h-full border border-gray-200"
                          width={1000}
                          height={1000}
                        />
                        {/* Hiển thị play icon cho video thumbnail trên mobile */}
                        {index === 0 && video && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                              <Play
                                className="w-3 h-3 text-gray-800 ml-0.5"
                                fill="currentColor"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-5">
              <div>
                <h1 className="text-3xl font-light text-gray-900 mb-2">
                  {product?.name}
                </h1>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(Number(product?.rating || 5))].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    ({Number(product?.sold)} đánh giá)
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-4 w-full lg:w-3/4">
                  {product?.product_option?.map(
                    (option: any, index: number) => (
                      <button
                        key={index}
                        className={`h-10 text-sm lg:text-base font-base border rounded-md flex items-center justify-center py-2 cursor-pointer transition-all duration-300 ${
                          selectedSize === option.size
                            ? "border-[rgb(var(--fifteenth-rgb))] border-2 bg-orange-50"
                            : "border-gray-300"
                        }`}
                        onClick={() => handleSizeSelect(option.size)}
                      >
                        <div className="flex">{option.size}</div>
                      </button>
                    )
                  )}
                </div>

                <div className="mb-2 mt-5 font-medium">Giá sản phẩm:</div>
                <div className="flex justify-start items-center gap-4 mb-5">
                  <div className="text-2xl lg:text-3xl font-medium text-brown-700">
                    {HELPER.formatVND(getCurrentPrice())}
                  </div>
                  {product?.discount !== "0" && (
                    <div className="text-md lg:text-xl font-normal line-through text-brown-700">
                      {HELPER.formatVND(getOriginPrice())}
                    </div>
                  )}
                </div>

                {/* Color Selection */}
                <div className="mb-3 font-medium">Màu sắc:</div>
                {product?.color.length === 0 ? (
                  <div className="text-black">Không có</div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex space-x-3">
                      {product?.color.map((color, index) => (
                        <div
                          key={index}
                          onClick={() => setSelectedColor(color)}
                          className={`w-8 h-8 ${HELPER.renderColor(
                            color
                          )} rounded-full border border-gray-200 cursor-pointer ${
                            selectedColor === color
                              ? "ring-2 ring-[rgb(var(--fifteenth-rgb))]"
                              : ""
                          }`}
                        ></div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-1">
                <div className="mb-2 font-medium">Giới thiệu:</div>
                <div className="space-y-5">
                  <div className="text-gray-500 leading-relaxed overflow-hidden">
                    {expanded ? (
                      <HtmlContent html={product?.introduction || ""} />
                    ) : (
                      <HtmlContent
                        html={getPartialContent(product?.introduction || "")}
                      />
                    )}
                  </div>
                  <div className="flex justify-center relative">
                    {!expanded && (
                      <div className="absolute bottom-[135%] left-[0%] right-0 h-20 bg-gradient-to-t from-gray-100 to-transparent blur-md pointer-events-none" />
                    )}
                    <button
                      className="text-black cursor-pointer font-semibold px-4 py-2 lg:py-4 lg:px-0 flex items-center gap-4 rounded-md"
                      onClick={() => setExpanded(!expanded)}
                    >
                      {expanded ? (
                        <>
                          <p className="text-[12px] lg:text-base">Thu gọn</p>{" "}
                          <ChevronUp size={16} />
                        </>
                      ) : (
                        <>
                          <p className="text-[12px] lg:text-base">Xem thêm</p>{" "}
                          <ChevronDown size={16} />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="flex flex-col items-start">
                <div className="flex flex-row gap-3">
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="py-2 px-3.5 hover:bg-gray-50"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-5 py-2 border-x">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="py-2 px-3.5 hover:bg-gray-50"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  {/* <button
                onClick={() => {
                  toast({
                    variant: "default",
                    title: "Thông báo",
                    description: "Chức năng đang được phát triển.",
                  });
                }}
                className="p-3 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <Heart className="w-5 h-5" />
              </button>
              <button
                onClick={() => {
                  toast({
                    variant: "default",
                    title: "Thông báo",
                    description: "Chức năng đang được phát triển.",
                  });
                }}
                className="p-3 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <BarChart3 className="w-5 h-5" />
              </button> */}
                </div>
                <div className="flex flex-col lg:flex-row gap-0 lg:gap-3 w-full lg:w-[70%]">
                  <button
                    // onClick={() => {
                    //   router.push(
                    //     `/tao-don-hang?type=frame&product=${product?._id}`
                    //   );
                    // }}
                    onClick={() => {
                      router.push(`${SOCIAL_LINKS.ZALO}`);
                    }}
                    className="mt-3 w-full lg:w-1/3 flex-1 bg-[rgb(var(--fifteenth-rgb))] text-[rgb(var(--primary-rgb))] hover:opacity-90 py-3 px-6 rounded-md transition-colors"
                  >
                    Mua hàng
                  </button>
                  <button
                    onClick={() => {
                      router.push(`${SOCIAL_LINKS.ZALO}`);
                    }}
                    className="mt-3 w-full lg:w-1/3 flex-1 border border-[rgb(var(--fifteenth-rgb))] text-[rgb(var(--fifteenth-rgb))] hover:bg-[rgb(var(--fifteenth-rgb))] hover:text-[rgb(var(--primary-rgb))] py-3 px-6 rounded-md transition-colors"
                  >
                    Liên hệ ngay
                  </button>
                </div>
              </div>

              {/* Product Meta */}
              <div className="space-y-2 text-black pt-6 border-t">
                <div>
                  {/* <span className="font-medium">SKU:</span> {product?.sku} */}
                </div>
                <div>
                  <span className="mb-3 font-medium">Phân loại:</span>
                  {"  "}
                  {HELPER.renderCategory(product?.category || "")}
                </div>
                <div className="flex flex-row items-center space-x-2">
                  <span className="font-medium">Chia sẻ:</span>
                  <div className="flex space-x-3">
                    {social.map((icon, index) => (
                      <Link href={icon.link} target="_blank" key={index}>
                        <Image
                          src={icon.image}
                          alt={`Share on ${icon}`}
                          width={24}
                          height={24}
                          className="w-7 h-7 rounded-full cursor-pointer hover:opacity-80"
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Product Details Tabs */}
        <div className="mb-16">
          <div className="flex flex-row justify-center items-center space-x-4">
            <div className="h-[1px] w-full bg-gray-200"></div>
            <div className="flex mt-2">
              <button
                className={`pb-2 mx-0 w-40 text-lg font-semibold text-gray-900 border-b-2 border-yellow-600`}
              >
                Mô tả sản phẩm
              </button>
            </div>
            <div className="h-[1px] w-full bg-gray-200"></div>
          </div>
          <div className="pt-8">
            <HtmlContent
              className="prose max-w-none text-gray-700 whitespace-pre-line"
              html={product?.description || ""}
            />
          </div>
        </div>

        {/* Related Products */}
        <div className="pb-12">
          <div className="text-center mb-12">
            <div className="relative z-20">
              <div
                className={`absolute bottom-[8%] right-[5%] lg:right-[37.5%] h-2 w-36 bg-[rgb(var(--fifteenth-rgb))] opacity-45 z-10`}
              ></div>
              <h1
                className={`text-3xl font-bold text-gray-900 mb-2 z-20 relative`}
              >
                Sản Phẩm Liên Quan
              </h1>
            </div>
            <p className="hidden lg:flex text-center justify-center text-gray-600">
              Khám phá những sản phẩm được ưa chuộng nhất hiện nay, được nhiều
              khách hàng tin dùng và lựa chọn.
            </p>

            <p className="lg:hidden flex text-center justify-center text-gray-600">
              Khám phá những sản phẩm được ưa chuộng và tin dùng hiện nay.
            </p>
          </div>
          {isLoadingRelevant ? (
            <div>
              <SkeletonProductRelevant />
            </div>
          ) : (
            <div className="relative">
              <Swiper
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                // effect={"coverflow"}
                grabCursor={true}
                // centeredSlides={true}
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: false,
                }}
                breakpoints={{
                  300: {
                    slidesPerView: 1,
                  },
                  1024: {
                    slidesPerView: 4,
                  },
                }}
                loop={true}
                spaceBetween={10}
                // pagination={{
                //   clickable: true,
                //   bulletClass: "swiper-pagination-bullet",
                //   bulletActiveClass: "swiper-pagination-bullet-active bg-white",
                // }}
                modules={[Pagination, Navigation, Autoplay]}
                className="w-full h-[500px] lg:h-[450px]"
              >
                {relatedProduct?.map((item, index: number) => (
                  <SwiperSlide key={index} className="">
                    <ProductCard key={item._id} product={item} />
                  </SwiperSlide>
                ))}
              </Swiper>
              <button
                onClick={handlePrev}
                className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white shadow-lg rounded-full w-12 h-12 items-center justify-center z-10 disabled:opacity-50"
                aria-label="Previous"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={handleNext}
                className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white shadow-lg rounded-full w-12 h-12 items-center justify-center z-10 disabled:opacity-50"
                aria-label="Next"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Section1;
