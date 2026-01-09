// components/ReadingTestCollection.tsx
"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "./components/card";
import { ProductService } from "@/services/product";
import Title from "@/components/ui/title";
import SkeletonHomeSection2 from "@/components/ui/skeleton/home/skeleton-2";

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
  sold: number;
  created_at: string;
}

const Section2: React.FC = () => {
  const [products, setProducts] = useState([] as Product[]);
  const [isLoading, setIsLoading] = useState(true);

  const init = async () => {
    setIsLoading(true);
    const res = await ProductService.getAll();

    if (res && res.data.length > 0) {
      setProducts(res.data);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-5 lg:px-0">
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-0 py-0">
          <div className="text-center mb-12">
            <div className="relative z-20">
              <h1
                className={`text-3xl font-bold text-gray-900 mb-2 z-20 relative`}
              >
                <div
                  className={`absolute bottom-[8%] right-[7%] lg:right-[38%] h-2 w-36 bg-[rgb(var(--fifteenth-rgb))] opacity-45 !z-0`}
                ></div>
                <span className="!z-20 relative">Sản Phẩm Bán Chạy</span>
              </h1>
            </div>
            <p className="hidden lg:flex justify-center text-gray-600">
              Khám phá những sản phẩm được ưa chuộng nhất hiện nay, được nhiều
              khách hàng tin dùng và lựa chọn.
            </p>
            <p className="lg:hidden flex justify-center text-gray-600">
              Khám phá những sản phẩm được ưa chuộng và tin dùng nhất hiện nay.
            </p>
          </div>
          {isLoading ? (
            <div>
              <SkeletonHomeSection2 />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.slice(0, 8).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Section2;
