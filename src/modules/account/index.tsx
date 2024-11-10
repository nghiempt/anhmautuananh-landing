"use client"

import { Header } from "@/layout/header"
import Link from "next/link";
import { Footer } from "@/layout/footer";
import React, { useState } from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Slash } from "lucide-react";
import AccountTab from "./account";
import ProcessTab from "./process";
import OrderTab from "./order";

export default function AccountPage() {

    const [tab, setTab] = useState(0)

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
                                        <BreadcrumbLink href="#">Tài khoản</BreadcrumbLink>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                            <div className="w-full mt-4 flex gap-4">
                                <div className="w-1/5 flex flex-col gap-4">
                                    <button onClick={() => setTab(0)} className={`${tab === 0 ? 'bg-[#FF8343] text-white' : 'bg-gray-100 text-gray-700'} w-full text-left p-2 rounded-lg`}>Hồ sơ cá nhân</button>
                                    <button onClick={() => setTab(1)} className={`${tab === 1 ? 'bg-[#FF8343] text-white' : 'bg-gray-100 text-gray-700'} w-full text-left p-2 rounded-lg`}>Tạo đơn hàng</button>
                                    <button onClick={() => setTab(2)} className={`${tab === 2 ? 'bg-[#FF8343] text-white' : 'bg-gray-100 text-gray-700'} w-full text-left p-2 rounded-lg`}>Lịch sử mua hàng</button>
                                </div>
                                <div className="w-4/5 min-h-[500px] border border-gray-200 rounded-lg">
                                    {
                                        tab === 0
                                            ?
                                            <AccountTab />
                                            :
                                            tab === 1
                                                ?
                                                <ProcessTab />
                                                :
                                                <OrderTab />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}
