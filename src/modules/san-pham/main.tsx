"use client";

import Contact from "@/components/ui/contact";
import { ProductProvider } from "./components/product-context";
import Section01 from "./components/section-01/section-01";
import SectionHeader from "./components/section-header";

interface Product {
  _id: string;
  name: string;
  description: string;
  introduction: string;
  product_option: [
    {
      size: string;
      price: string;
    }
  ];
  category: string;
  color: string[];
  thumbnail: string;
  discount: string;
  rating: string;
  images: string[];
  video: string;
  sold: number;
  created_at: string;
  active: boolean;
}

export default function ProductContent({
  filteredProduct,
  viewFilter,
}: {
  filteredProduct: Product[];
  viewFilter: boolean;
}) {
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
          <SectionHeader />
          <div className="w-full pb-10">
            <ProductProvider>
              <Section01
                filteredProductMobile={filteredProduct}
                viewFilter={viewFilter}
              />
            </ProductProvider>
          </div>
        </div>
      </main>
    </>
  );
}
