"use client";

import Header from "@/layout/header";
import Footer from "@/layout/footer";
import PolicyContent from "./main";

export default function PolicyClient() {
  return (
    <div
      className="relative w-full flex flex-col justify-center items-center"
      id="home"
    >
      <div className={`w-full`}>
        <Header />
      </div>

      <div className="w-full mb-0">
        <PolicyContent />
      </div>
      <Footer />
    </div>
  );
}
