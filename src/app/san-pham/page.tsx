"use client";

import HomeClient from "@/modules/home";
import ProductClient from "@/modules/san-pham";
import { ProductProvider } from "@/modules/san-pham/components/product-context";
import React, { Suspense } from "react";

export default function ProductPage() {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <ProductProvider>
        <Suspense fallback={<div></div>}>
          <ProductClient />
        </Suspense>
      </ProductProvider>
    </div>
  );
}
