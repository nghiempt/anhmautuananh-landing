"use client";

import Header from "@/layout/header";
import Footer from "@/layout/footer";
import ProductContent from "./main";
import Sidebar from "./components/section-01/components/side-bar";
import { CircleX, SlidersVertical } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { ProductService } from "@/services/product";
import { ProductProvider } from "./components/product-context";
import { useDispatch } from "react-redux";
import { setSelectedProductId } from "@/store/productSlice";

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

export default function ProductClient() {
  const [viewFilter, setViewFilter] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [randomProducts, setRandomProducts] = useState<Product[]>([]);
  const [size, setSize] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const init = async () => {
    try {
      const res = await ProductService.getAll();

      if (res && res.data && res.data.length > 0) {
        setProducts(res.data);
        setFilteredProducts(res.data);
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
    <div
      className="relative w-full flex flex-col justify-center items-center"
      id="home"
    >
      <div className={`${viewFilter ? "z-0" : "z-50"} w-full`}>
        <Header />
      </div>
      {viewFilter && (
        <div
          className={`fixed top-0 left-0 right-0 bottom-0 bg-black opacity-25 z-10`}
        ></div>
      )}
      <div
        className={`lg:hidden fixed top-0 left-0 bottom-0 z-20 flex flex-row`}
      >
        {viewFilter && (
          <div
            className={`h-screen overflow-y-auto bg-white w-80 transition-transform duration-500 ease-in-out pl-5 ${
              viewFilter ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <Sidebar
              products={randomProducts}
              sizes={size}
              onFilterChange={handleFilterChange}
            />
          </div>
        )}

        <div className="relative w-9 h-screen z-80">
          <div
            onClick={() => setViewFilter(!viewFilter)}
            className={`absolute rounded-tr-lg rounded-br-lg flex justify-center items-center h-9 px-2 transition-transform duration-500 ease-in-out ${
              viewFilter
                ? "bg-white top-[50%] translate-x-[0px]"
                : "border border-gray-200 bg-gray-100 top-[50%] -translate-x-[s0px]"
            }`}
          >
            {!viewFilter ? (
              <SlidersVertical color="black" className="" size={20} />
            ) : (
              <CircleX size={18} />
            )}
          </div>
        </div>
      </div>
      <div className="w-full mb-0">
        <ProductProvider>
          <ProductContent
            filteredProduct={filteredProducts}
            viewFilter={viewFilter}
          />
        </ProductProvider>
      </div>
      <Footer />
    </div>
  );
}
