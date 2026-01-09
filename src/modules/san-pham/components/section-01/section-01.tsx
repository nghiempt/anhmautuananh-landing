// components/ReadingTestCollection.tsx
"use client";

import { IMAGES } from "@/utils/image";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import Sidebar from "./components/side-bar";
import ProductGrid from "./components/product-layout";
import { SlidersVertical } from "lucide-react";
import { ProductService } from "@/services/product";

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
  active: boolean;
}

interface Section01Props {
  viewFilter?: boolean;
  filteredProductMobile?: Product[];
}

const Section01: React.FC<Section01Props> = ({
  viewFilter,
  filteredProductMobile,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [randomProducts, setRandomProducts] = useState<Product[]>([]);
  const [size, setSize] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isDesktop, setIsDesktop] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(true);

  const init = async () => {
    try {
      setIsLoading(true);
      const res = await ProductService.getAll();
      if (res && res.data && res.data.length > 0) {
        const filteredProducts = res.data.filter(
          (product: Product) => product?.active === true
        );
        setProducts(filteredProducts);
        setFilteredProducts(filteredProducts);
        const shuffled = [...res.data].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3);
        setRandomProducts(selected);

        const uniqueSizes = Array.from(
          new Set(
            res.data.flatMap((product: Product) =>
              product.product_option.map((option) => option.size)
            )
          )
        ) as string[];
        setSize(uniqueSizes);
        setIsLoading(false);
      } else {
        console.log("No products found in response");
        setProducts([]);
        setFilteredProducts([]);
        setRandomProducts([]);
      }
    } catch (error) {
      console.error("Error initializing products:", error);
      setProducts([]);
      setFilteredProducts([]);
      setRandomProducts([]);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024); // Matches Tailwind's 'lg' breakpoint
    };

    // Initial check
    handleResize();

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    init();
  }, []);

  const handleFilterChange = useCallback(
    (filters: any) => {
      let filtered = [...products];

      // Category filter
      if (filters.category) {
        filtered = filtered.filter(
          (product) => product.category === filters.category
        );
      }

      // Price filter
      if (filters.priceRange) {
        filtered = filtered.filter((product) => {
          const price = parseFloat(product.product_option[0].price);
          return (
            price >= filters.priceRange[0] && price <= filters.priceRange[1]
          );
        });
      }

      // Color filter
      if (filters.colors && filters.colors.length > 0) {
        filtered = filtered.filter((product) =>
          product.color.some((color) => filters.colors.includes(color))
        );
      }

      // Size filter
      if (filters.sizes && filters.sizes.length > 0) {
        filtered = filtered.filter((product) =>
          product.product_option.some((option) =>
            filters.sizes.includes(option.size)
          )
        );
      }

      setFilteredProducts(filtered);
    },
    [products]
  );

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex">
        <div className="hidden lg:flex">
          <Sidebar
            products={randomProducts}
            sizes={size}
            onFilterChange={handleFilterChange}
          />
        </div>
        <ProductGrid
          viewFilter={viewFilter}
          products={isDesktop ? filteredProducts : filteredProductMobile || []}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          loadingData={isLoading}
        />
      </div>
    </div>
  );
};

export default Section01;
