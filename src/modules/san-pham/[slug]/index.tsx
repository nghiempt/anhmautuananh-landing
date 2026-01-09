"use client";

import Header from "@/layout/header";
import Footer from "@/layout/footer";
import ProductDetailContent from "./main";
import { ProductProvider } from "../components/product-context";

export default function ProductDetailClient() {
  return (
    <div className="w-full flex flex-col justify-center items-center" id="home">
      <Header />
      <div className="w-full mb-0">
        <ProductProvider>
          <ProductDetailContent />
        </ProductProvider>
      </div>
      <Footer />
    </div>
  );
}
