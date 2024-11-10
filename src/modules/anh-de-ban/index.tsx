"use client"

import { Header } from "@/layout/header"
import { products } from "@/utils/constant"
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/layout/footer";
import React from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Slash } from "lucide-react";


interface Product {
    row: number;
    id: number;
    name: string;
    category: string;
    price: number;
    description: string;
    images: string[];
}

export default function SecondPage() {

    const getProductByCategory = () => {
        return products.filter((product: Product) => product.category === "Frame");
    }

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
                                        <BreadcrumbLink href="#">Ảnh để bàn</BreadcrumbLink>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                            <div className="text-xl font-semibold my-5">Danh Sách Sản Phẩm</div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-5">
                                {getProductByCategory().slice(0, 8)?.map((product: Product, index: any) => (
                                    <Link href={`/san-pham/${product.id}`} key={index} className='relative group cursor-pointer rounded-lg'>
                                        <Card className="rounded-lg flex flex-col !border-none !outline-none shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
                                            <div className='absolute top-2 left-2 bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full'>
                                                Up to 35% off
                                            </div>
                                            <div className='relative w-full h-[280px] rounded-t-lg bg-gray-100 flex items-center justify-center'>
                                                <Image
                                                    src={product?.images[0]}
                                                    alt={product?.name + ' image'}
                                                    fill
                                                    style={{ objectFit: 'cover' }}
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                    className='rounded-t-lg hover:scale-105 transition-transform duration-500 ease-in-out hover:shadow-lg'
                                                />
                                            </div>
                                            <div className='flex flex-col justify-center py-4 px-3 text-start'>
                                                <div className="text-md font-medium mb-1 max-h-[28px] truncate">
                                                    {product?.name}
                                                </div>
                                                <div className='flex items-center mb-2'>
                                                    <div className='flex items-center space-x-1 text-yellow-500'>
                                                        <span>⭐️ ⭐️ ⭐️ ⭐️ ⭐️</span>
                                                    </div>
                                                    <p className='text-sm text-gray-500 ml-2'>
                                                        20 đánh giá
                                                    </p>
                                                </div>
                                                <div className='flex justify-between items-center'>
                                                    <div className='flex items-center space-x-2 text-sm text-gray-500'>
                                                        <span className='flex items-center space-x-1'>
                                                            <span>🚚</span>
                                                            <span>Giao hàng nhanh</span>
                                                        </span>
                                                    </div>
                                                    <p className="text-lg font-semibold text-black">
                                                        {Intl.NumberFormat('de-DE').format(product?.price)} VNĐ
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='flex justify-center items-center px-3 pb-3'>
                                                <button className='w-full bg-[#fff] text-[#FF8343] border border-[#FF8343] text-sm py-2 rounded-md transition-colors'>
                                                    Đặt hàng ngay
                                                </button>
                                            </div>
                                        </Card>
                                    </Link>
                                ))}
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
