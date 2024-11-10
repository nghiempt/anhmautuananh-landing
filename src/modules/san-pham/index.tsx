"use client"

import { Header } from "@/layout/header"
import Link from "next/link";
import { Footer } from "@/layout/footer";
import React, { useEffect, useState } from "react";
import { otherServices, products } from "@/utils/constant";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Slash } from "lucide-react";

interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  status: string;
  reviews: number;
  colors: string[];
  material: string[];

  images: string[];
}

interface Service {
  image: string;
  title: string;
}

export default function SanPhamPage() {

  const pathname = usePathname()

  const [product, setProduct] = useState<Product>(
    {
      id: 1,
      name: "",
      description: "",
      price: 100000,
      category: "...",
      rating: 5.0,
      status: "Đang bán",
      reviews: 345,
      colors: ["Đen", "Trắng", "Silver", "Gold"],
      material: ["Bìa Gói", "Bìa Kính", "Bìa Da"],
      images: [],
    }
  );
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const id = pathname.split('/').pop();
    const product = products.find((product: Product) => product.id === parseInt(id || ''));
    if (product) {
      setProduct(product);
    }
  }, [pathname]);

  return (
    <div className="w-full flex flex-col justify-center">
      <div className="w-full">
        <Header />
        <div className="w-full flex justify-center">
          <div className="flex flex-col w-full md:w-5/6 lg:w-5/6 justify-center">
            <div className="bg-[#4158A6] grid grid-cols-3 lg:grid-cols-6 text-center gap-4 justify-between">
              <Link href="/in-anh-plastic" className="text-[#fff] font-semibold text-md py-5 hover:bg-[#FF8343]">IN ẢNH PLASTIC</Link>
              <Link href="/anh-de-ban" className="text-[#fff] font-semibold text-md py-5 hover:bg-[#FF8343]">ẢNH ĐỂ BÀN</Link>
              <Link href="/photo-book" className="text-[#fff] font-semibold text-md py-5 hover:bg-[#FF8343]">PHOTOBOOK</Link>
              <Link href="/anh-treo-tuong" className="text-[#fff] font-semibold text-md py-5 hover:bg-[#FF8343]">ẢNH TREO TƯỜNG</Link>
              <Link href="/bia-album" className="text-[#fff] font-semibold text-md py-5 hover:bg-[#FF8343]">BÌA ALBUM</Link>
              <Link href="/event" className="text-[#fff] font-semibold text-md py-5 hover:bg-[#FF8343]">EVENT</Link>
            </div>
            <div className="w-full justify-center mb-10 mt-4 px-4 md:px-0 lg:px-0">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                    <Slash />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">Sản phẩm</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                    <Slash />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">{product.name}</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <div className="w-full flex flex-col justify-center items-center">
                <section className="w-full py-6 bg-white dark:bg-gray-900 antialiased">
                  <div className="w-full">
                    <div className="w-full lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
                      <div className="shrink-0">
                        <Image
                          className="w-full h-[400px] dark:hidden rounded"
                          src={product.images[selectedImage]}
                          alt=""
                          width={400}
                          height={400}
                        />
                        <Image
                          className="w-full h-[400px] hidden dark:block rounded"
                          src={product.images[selectedImage]}
                          alt=""
                          width={400}
                          height={400}
                        />
                        <div className="flex gap-2 mt-4 justify-center">
                          {
                            product.images.map((image, index) => (
                              image !== "" && (
                                <div key={index} className={`border-2 ${selectedImage === index ? "border-blue-500" : "border-gray-200"} rounded p-1 cursor-pointer`} onClick={() => setSelectedImage(index)}>
                                  <Image width={100} height={50} className="rounded" src={image} alt="img" />
                                </div>
                              )
                            ))
                          }
                        </div>
                      </div>
                      <div className="mt-6 sm:mt-8 lg:mt-0">
                        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                          {product.name}
                        </h1>
                        <div className="mt-2">
                          <span className="text-sm font-medium text-[#FF8225]">
                            Đang bán
                          </span>
                        </div>
                        <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                          <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                            {Intl.NumberFormat('de-DE').format(product?.price)} VNĐ
                          </p>
                          <div className="flex items-center gap-2 mt-2 sm:mt-0">
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, index) => (
                                <svg
                                  key={index}
                                  className="w-4 h-4 text-yellow-300"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                                </svg>
                              ))}
                            </div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">(5.0)</p>
                            <a
                              href="#"
                              className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white"
                            >
                              {product.reviews} đánh giá
                            </a>
                          </div>
                        </div>
                        <div className="mt-6">
                          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Màu sắc</h3>
                          <div className="flex gap-2 mt-2">
                            {product.colors.map((color) => (
                              <button
                                key={color}
                                onClick={() => setSelectedColor(color)}
                                className={`px-3 py-1.5 rounded-lg border ${selectedColor === color
                                  ? "border-blue-500"
                                  : "border-gray-200"
                                  }`}
                              >
                                {color}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="mt-6">
                          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Chất liệu</h3>
                          <div className="flex gap-2 mt-2">
                            {product.material.map((material) => (
                              <button
                                key={material}
                                onClick={() => setSelectedMaterial(material)}
                                className={`px-3 py-1.5 rounded-lg border ${selectedMaterial === material
                                  ? "border-blue-500"
                                  : "border-gray-200"
                                  }`}
                              >
                                {material}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                          <a
                            href="#"
                            className="flex items-center justify-center py-2.5 px-5 text-sm font-medium bg-[#FF8225] text-[#fff] focus:outline-none rounded-lg focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                          >
                            <svg
                              className="w-5 h-5 -ms-2 me-2"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                              />
                            </svg>
                            Yêu thích
                          </a>
                          <div className="flex md:hidden lg:hidden w-full h-[12px]"></div>
                          <a
                            href="#"
                            className="flex items-center justify-center py-2.5 px-5 text-sm font-medium bg-[#173B45] text-[#fff] focus:outline-none rounded-lg focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                          >
                            <svg
                              className="w-5 h-5 -ms-2 me-2"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                              />
                            </svg>
                            Đặt hàng ngay
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="w-full mt-8">
                      <section className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Mô tả sản phẩm</h2>
                        <p className="text-gray-700 dark:text-gray-300">
                          {product.description}
                        </p>
                      </section>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col justify-center items-center mb-10">
          <div className="w-5/6">
            <div className="pt-5 text-center text-2xl font-semibold text-[#000] mb-6 md:mb-0 lg:mb-0">TRANG TRÍ NHÀ CỬA</div>
            <div className="w-full md:hidden lg:hidden">
              <Image
                src="/banner-bottom.png"
                alt="logo"
                width={0}
                height={0}
                style={{ width: '100%', height: '260px' }}
                sizes="100vw"
              />
            </div>
            <div className="w-full hidden md:flex lg:flex">
              <Image
                src="/banner-bottom.png"
                alt="logo"
                width={0}
                height={0}
                style={{ width: '100%', height: '720px' }}
                sizes="100vw"
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}
