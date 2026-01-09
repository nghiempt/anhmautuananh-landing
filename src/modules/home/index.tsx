"use client";

import Header from "@/layout/header";
import Footer from "@/layout/footer";
import HomeContent from "./main";
import TopBanner from "@/layout/top-header";

export default function HomeClient() {
  return (
    <div className="w-full flex flex-col justify-center items-center" id="home">
      <Header />
      <div className="w-full mb-0">
        <HomeContent />
      </div>
      <Footer />
    </div>
  );
}
