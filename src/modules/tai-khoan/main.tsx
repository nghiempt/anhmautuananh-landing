"use client";

import Contact from "@/components/ui/contact";
import SectionHeader from "./components/section-header";
import Section01 from "./components/section-01";

export default function AccountContent() {
  return (
    <>
      <div className="hidden lg:flex fixed top-1/3 right-5 z-50">
        <Contact />
      </div>
      <main className="w-full flex flex-col justify-center items-center overflow-hidden">
        <div className="w-full flex flex-col justify-center items-center">
          <SectionHeader />
          <Section01 />
        </div>
      </main>
    </>
  );
}
