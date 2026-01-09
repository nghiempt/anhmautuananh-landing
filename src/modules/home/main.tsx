"use client";

import Contact from "@/components/ui/contact";
import Section1 from "./components/section-01/section-01";
import Section2 from "./components/section-02/section-02";
import Section3 from "./components/section-03/section-03";
import Section4 from "./components/section-04/section-04";
import Section5 from "./components/section-05/section-05";
import Section6 from "./components/section-06/section-06";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "@/hooks/use-toast";

export default function HomeContent() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const loginGG = searchParams.get("logGG");
    if (loginGG === "inactive") {
      toast({
        variant: "destructive",
        title: "Cảnh báo tài khoản",
        description: "Tài khoản đăng nhập Google đã bị vô hiệu hóa.",
      });
    }
  }, [searchParams]);
  return (
    <>
      <div className="hidden lg:flex fixed top-1/3 right-5 z-50">
        <Contact />
      </div>
      <div className="lg:hidden flex fixed bottom-10 right-0 left-0 z-50 justify-center">
        <Contact />
      </div>
      <main className="w-full flex flex-col justify-center items-center overflow-hidden">
        <div className="w-full flex flex-col justify-center items-center">
          <div className="w-full py-0">
            <Section1 />
            <Section2 />
            <Section3 />
            <Section4 />
            <Section5 />
            <Section6 />
            {/* <Section7 /> */}
          </div>
        </div>
      </main>
    </>
  );
}
