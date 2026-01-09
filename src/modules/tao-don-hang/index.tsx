"use client";

import Header from "@/layout/header";
import Footer from "@/layout/footer";
import AboutContent from "./main-frame";
import { useSearchParams } from "next/navigation";
import OrderAlbumContent from "./main-album";
import OrderFrameContent from "./main-frame";

export default function OrderClient() {
  const params = useSearchParams();
  const orderType = params.get("type");

  return (
    <div
      className="relative w-full flex flex-col justify-center items-center"
      id="home"
    >
      <div className={`w-full`}>
        <Header />
      </div>
      <div className="w-full mb-0">
        {orderType === "album" ? <OrderAlbumContent /> : <OrderFrameContent />}
      </div>
      <Footer />
    </div>
  );
}
