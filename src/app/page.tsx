"use client";

import HomeClient from "@/modules/home";
import { ProductProvider } from "@/modules/san-pham/components/product-context";
import React, { Suspense } from "react";

export default function Home() {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <ProductProvider>
        <Suspense fallback={<div></div>}>
          <HomeClient />
        </Suspense>
      </ProductProvider>
    </div>
  );
}
