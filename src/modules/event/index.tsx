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

export default function EventPage() {
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
                                        <BreadcrumbLink href="#">Event</BreadcrumbLink>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                            <div className="text-center text-xl font-semibold my-5 text-[#FF8343]">Đang phát triển chức năng</div>
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
