"use client"

import { Header } from "@/layout/header"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { otherServices, products } from "@/utils/constant"
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Footer } from "@/layout/footer";
import React from "react";

interface Product {
  row: number;
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  images: string[];
}

interface Service {
  image: string;
  title: string;
}

const data = [
  {
    id: 1,
    name: "ALBUM BÌA GÓI - RUỘT SIÊU SẮC NÉT, TRÓNG XƯỚC",
    image: "https://www.inanhtructuyen.com/_next/image?url=http%3A%2F%2Fres.cloudinary.com%2Ffarmcode%2Fimage%2Fupload%2Fv1740140859%2Fiatt%2Fygfqwmh0yafhdweetzwj.png&w=3840&q=75",
  },
  {
    id: 1,
    name: "ALBUM BÌA HỢP - RUỘT TRÁNG GƯƠNG",
    image: "https://www.inanhtructuyen.com/_next/image?url=http%3A%2F%2Fres.cloudinary.com%2Ffarmcode%2Fimage%2Fupload%2Fv1740141934%2Fiatt%2Fwgjdch7woupupe7n34vg.png&w=3840&q=75",
  },
  {
    id: 1,
    name: "ẢNH 3D- 4K ĐÍNH ĐÁ",
    image: "https://www.inanhtructuyen.com/_next/image?url=http%3A%2F%2Fres.cloudinary.com%2Ffarmcode%2Fimage%2Fupload%2Fv1740142196%2Fiatt%2Fdujqhncspdeegtnaseir.jpg&w=3840&q=75",
  },
  {
    id: 1,
    name: "ALBUM RUỘT KIẾNG CÓ VÁCH NGĂN",
    image: "https://www.inanhtructuyen.com/_next/image?url=http%3A%2F%2Fres.cloudinary.com%2Ffarmcode%2Fimage%2Fupload%2Fv1740142121%2Fiatt%2Ffouctxi5ubjhlrhzopvc.png&w=3840&q=75",
  },
  {
    id: 1,
    name: "ALBUM CÁN MÀNG BÌA HƠP",
    image: "https://www.inanhtructuyen.com/_next/image?url=http%3A%2F%2Fres.cloudinary.com%2Ffarmcode%2Fimage%2Fupload%2Fv1740142056%2Fiatt%2Fhng00ydlj3ojz8khitoj.png&w=3840&q=75",
  },
  {
    id: 1,
    name: "ALBUM BÌA TRÁNG GƯƠNG - RUỘT SIÊU SẮC NÉT",
    image: "https://www.inanhtructuyen.com/_next/image?url=http%3A%2F%2Fres.cloudinary.com%2Ffarmcode%2Fimage%2Fupload%2Fv1740141994%2Fiatt%2Fuvvfovfpkafgqcdojv4a.png&w=3840&q=75",
  },
  {
    id: 1,
    name: "ẢNH 3D VÔ CỰC HÀNG QUỐC",
    image: "https://www.inanhtructuyen.com/_next/image?url=http%3A%2F%2Fres.cloudinary.com%2Ffarmcode%2Fimage%2Fupload%2Fv1740142258%2Fiatt%2Fmlbtedtsoffjw44fyuxf.jpg&w=3840&q=75",
  },
  {
    id: 1,
    name: "ẢNH 3D VÔ CỰC TITAN",
    image: "https://www.inanhtructuyen.com/_next/image?url=http%3A%2F%2Fres.cloudinary.com%2Ffarmcode%2Fimage%2Fupload%2Fv1740142324%2Fiatt%2Foim7diiq6kv8tvmgopqn.jpg&w=3840&q=75",
  },
  {
    id: 1,
    name: "IN ẢNH LỤA",
    image: "https://www.inanhtructuyen.com/_next/image?url=http%3A%2F%2Fres.cloudinary.com%2Ffarmcode%2Fimage%2Fupload%2Fv1740142554%2Fiatt%2Fa8eyd1m5dgibqs7qcpvb.jpg&w=3840&q=75",
  },
  {
    id: 1,
    name: "ALBUM BÌA GÓI CÁN MÀNG",
    image: "https://www.inanhtructuyen.com/_next/image?url=http%3A%2F%2Fres.cloudinary.com%2Ffarmcode%2Fimage%2Fupload%2Fv1740141876%2Fiatt%2Fotsrvknhbtk9aczsrefg.png&w=3840&q=75",
  },
]

export default function HomePage() {
  return (
    <div className="w-full flex flex-col justify-center">
      <div className="w-full">
        <Header />
        <div className="w-full flex justify-center items-center p-4">
          <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
            {
              data?.map((item, index) => {
                return (
                  <div key={index} className="relative group">
                    <Image
                      src={item.image}
                      alt="logo"
                      width={1000}
                      height={0}
                      className="w-full object-cover rounded-md"
                    />
                    <div className="w-full py-2 text-center text-xs md:text-md lg:text-lg opacity-50 absolute bottom-3 md:bottom-4 lg:bottom-5 bg-gray-800 text-white">
                      {item.name}
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
        {/* <div className="w-full flex justify-center">
          <div className="flex flex-col w-full md:w-5/6 lg:w-5/6 justify-center">
            <div className="bg-[#4158A6] grid grid-cols-3 lg:grid-cols-6 text-center gap-4 justify-between">
              <Link href="/in-anh-plastic" className="text-[#fff] font-semibold text-md py-5 hover:bg-[#FF8343]">IN ẢNH PLASTIC</Link>
              <Link href="/anh-de-ban" className="text-[#fff] font-semibold text-md py-5 hover:bg-[#FF8343]">ẢNH ĐỂ BÀN</Link>
              <Link href="/photo-book" className="text-[#fff] font-semibold text-md py-5 hover:bg-[#FF8343]">PHOTOBOOK</Link>
              <Link href="/anh-treo-tuong" className="text-[#fff] font-semibold text-md py-5 hover:bg-[#FF8343]">ẢNH TREO TƯỜNG</Link>
              <Link href="/bia-album" className="text-[#fff] font-semibold text-md py-5 hover:bg-[#FF8343]">BÌA ALBUM</Link>
              <Link href="/event" className="text-[#fff] font-semibold text-md py-5 hover:bg-[#FF8343]">EVENT</Link>
            </div>
            <div className="flex justify-center w-full relative">
              <Carousel className="w-full h-[400px]">
                <CarouselContent className="flex min-h-full">
                  <CarouselItem className="flex-shrink-0 w-full h-full">
                    <div
                      className="w-full min-h-[400px] h-full bg-cover bg-center"
                      style={{ backgroundImage: "url(/banner-01.jpg)" }}
                    ></div>
                  </CarouselItem>
                  <CarouselItem className="flex-shrink-0 w-full h-full">
                    <div
                      className="w-full min-h-[400px] h-full bg-cover bg-center"
                      style={{ backgroundImage: "url(/banner-02.jpg)" }}
                    ></div>
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious className="hidden" />
                <CarouselNext className="hidden" />
              </Carousel>
              <div className="absolute w-full flex gap-[2px] bottom-0 text-white">
                <div className="bg-black opacity-50 p-1 w-full text-center cursor-pointer">
                  IN KHUNG ẢNH
                </div>
                <div className="bg-black opacity-50 p-1 w-full text-center cursor-pointer">
                  IN PHOTOBOOK
                </div>
              </div>
            </div>
            <div className="mt-12 overflow-hidden">
              <div className="flex animate-marquee gap-2 whitespace-nowrap">
                {Array.from({ length: 10 }).map((_, index) => (
                  <div
                    key={`item-${index}`}
                    className="bg-[#4158A6] text-white text-center py-3 px-6 rounded-full inline-block"
                  >
                    In ảnh chất lượng cao
                  </div>
                ))}
                {Array.from({ length: 10 }).map((_, index) => (
                  <div
                    key={`item-duplicate-${index}`}
                    className="bg-[#4158A6] text-white text-center py-3 px-6 rounded-full inline-block"
                  >
                    In ảnh chất lượng cao
                  </div>
                ))}
              </div>
              <div className="flex animate-marquee2 gap-2 whitespace-nowrap mt-3">
                {Array.from({ length: 10 }).map((_, index) => (
                  <div
                    key={`item-reverse-${index}`}
                    className="bg-[#FF8343] text-white text-center py-3 px-6 rounded-full inline-block"
                  >
                    In ảnh chất lượng cao
                  </div>
                ))}
                {Array.from({ length: 10 }).map((_, index) => (
                  <div
                    key={`item-reverse-duplicate-${index}`}
                    className="bg-[#FF8343] text-white text-center py-3 px-6 rounded-full inline-block"
                  >
                    In ảnh chất lượng cao
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full justify-center mb-10 mt-6 px-4 md:px-0 lg:px-0">
              <div className="py-5 text-center text-2xl font-semibold text-[#000]">SẢN PHẨM YÊU THÍCH</div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-5">
                {products.slice(0, 8)?.map((product: Product, index: any) => (
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
                          className='rounded-t-lg hover:scale-100 transition-transform duration-500 ease-in-out'
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
              <div className="w-full flex justify-center mt-10">
                <Button className="bg-white p-5 border-[1px] border-black text-black text-md font-light rounded-full hover:bg-[#FF8343] hover:text-white hover:border-[#FF8343]">
                  XEM TẤT CẢ SẢN PHẨM
                </Button>
              </div>
            </div>
            <div className="w-full justify-center mb-10 px-4 md:px-0 lg:px-0">
              <div className="py-5 text-center text-2xl font-semibold text-[#000]">DANH MỤC NỔI BẬT</div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-5">
                {otherServices?.map((service: Service, index: any) => (
                  <Link href='#' key={index} className='relative group cursor-pointer rounded-lg'>
                    <Card className="rounded-sm flex flex-col border-none">
                      <div className='relative w-full h-[300px] rounded-lg'>
                        <Image
                          src={service?.image}
                          alt={service?.title + ' image'}
                          fill
                          style={{ objectFit: 'cover' }}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className='rounded-sm hover:scale-100 transition-transform duration-500 ease-in-out'
                        />
                      </div>
                      <div className='absolute top-2 left-2 flex flex-col justify-center text-center bg-black opacity-50 text-white px-2 py-1 rounded-lg'>
                        <div className="text-lg font-semibold max-h-[28px] truncate">
                          {service?.title}
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
            <div className="w-full justify-center mb-10">
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
        </div> */}
        {/* <Footer /> */}
      </div>
    </div>
  )
}
