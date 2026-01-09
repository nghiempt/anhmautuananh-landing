"use client";

import Contact from "@/components/ui/contact";
import { ProductProvider } from "../components/product-context";
import Section1 from "./components/section-01/section-01";

export default function ProductDetailContent() {
  return (
    <>
      <div className="hidden lg:flex fixed top-1/3 right-5 z-50">
        <Contact />
      </div>
      <main className="w-full flex flex-col justify-center items-center overflow-hidden">
        <div className="w-full flex flex-col justify-center items-center">
          <div className="w-full">
            <ProductProvider>
              <Section1 />
            </ProductProvider>
          </div>
        </div>
      </main>
    </>
  );
}
