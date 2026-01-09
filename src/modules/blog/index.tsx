"use client";

import Header from "@/layout/header";
import Footer from "@/layout/footer";
import AboutContent from "./main";
import BlogContent from "./main";

export default function BlogClient() {
  return (
    <div
      className="relative w-full flex flex-col justify-center items-center"
      id="home"
    >
      <div className={`w-full`}>
        <Header />
      </div>

      <div className="w-full mb-0">
        <BlogContent />
      </div>
      <Footer />
    </div>
  );
}
