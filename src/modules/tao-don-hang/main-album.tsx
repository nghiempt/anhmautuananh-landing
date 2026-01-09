"use client";

import Contact from "@/components/ui/contact";
import SectionHeader from "./album/components/section-header";
import Section01 from "./album/components/section-01";

export default function OrderAlbumContent() {
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
