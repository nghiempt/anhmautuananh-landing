import React, { useEffect, useMemo, useState } from "react";
import { AlignJustify, Grip } from "lucide-react";
import ProductCard from "./product-card";
import Selection from "@/components/ui/comp-190";
import { ProductProvider } from "../../product-context";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { slugifyURL } from "@/utils/slugify";
import { ROUTES } from "@/utils/route";
import { toast } from "@/hooks/use-toast";
import { log } from "console";
import SkeletonProductList from "@/components/ui/skeleton/product/skeleton-product-list";

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
interface ProductGridProps {
  viewFilter?: boolean;
  products: Product[];
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
  loadingData: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  viewFilter,
  products: initialProducts,
  viewMode,
  onViewModeChange,
  loadingData,
}) => {
  const COUNT = 9;
  const [currenPage, setCurrenPage] = useState<number>(1);
  const [sortedProducts, setSortedProducts] =
    useState<Product[]>(initialProducts); // State for sorted products
  const router = useRouter();
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  // Update sortedProducts when initialProducts change
  useEffect(() => {
    setSortedProducts(initialProducts);
  }, [initialProducts]);

  // Calculate total pages and current data using useMemo to avoid recomputation
  const totalPage = useMemo(
    () => Math.ceil(sortedProducts.length / COUNT),
    [sortedProducts]
  );

  const currenData = useMemo(() => {
    const start = (currenPage - 1) * COUNT;
    const end = currenPage * COUNT;
    return sortedProducts.slice(start, end);
  }, [sortedProducts, currenPage]);

  // Adjust current page if it exceeds total pages
  useEffect(() => {
    if (currenPage > totalPage && totalPage > 0) {
      setCurrenPage(totalPage);
    } else if (sortedProducts.length === 0) {
      setCurrenPage(1);
    }
  }, [totalPage, currenPage, sortedProducts.length]);

  const selectPage = (pageSelected: number) => {
    setCurrenPage(pageSelected);
  };

  const prevPage = () => {
    if (currenPage > 1) {
      selectPage(currenPage - 1);
    }
  };

  const nextPage = () => {
    if (currenPage < totalPage) {
      selectPage(currenPage + 1);
    }
  };

  const handleProductClick = (productId: string, title: string) => {
    router.push(`${ROUTES.PRODUCT}/${slugifyURL(title)}?spid=${productId}`);
  };

  // Handler for sorting products
  const handleSortChange = (sortedProducts: Product[]) => {
    setSortedProducts(sortedProducts);
    setCurrenPage(1); // Reset to first page after sorting
  };

  return (
    <div className="flex-1 px-5 lg:px-0 pt-0 lg:ml-5" id="product-home">
      {/* Header */}
      <div className="flex justify-center lg:justify-between items-center my-6">
        <div className="hidden lg:flex text-gray-600">
          {sortedProducts.length > 0 ? (
            <>
              {/* Hiển thị {(currenPage - 1) * COUNT + 1}-
              {Math.min(currenPage * COUNT, sortedProducts.length)} trên{" "} */}
              Sản phẩm: {sortedProducts.length}
            </>
          ) : (
            "Sản phẩm: Đang tải"
          )}
        </div>
        <div className="hidden lg:flex items-center gap-2">
          {/* <span className="text-gray-600">Xem dạng:</span>
          <button
            onClick={() => onViewModeChange("grid")}
            className={`p-1 ${
              viewMode === "grid" ? "text-black" : "text-gray-400"
            }`}
          >
            <Grip size={20} />
          </button>
          <button
            // onClick={() => onViewModeChange("list")}
            onClick={() => {
              toast({
                variant: "default",
                title: "Thông báo",
                description: "Chức năng đang được phát triển.",
              });
            }}
            className={`p-1 ${
              viewMode === "list" ? "text-black" : "text-gray-400"
            }`}
          >
            <AlignJustify size={20} />
          </button> */}
        </div>
        <div className={`flex items-center gap-4 ${viewFilter ? "" : "z-30"}`}>
          <Selection
            products={sortedProducts}
            onSortChange={handleSortChange}
          />
        </div>
      </div>
      {loadingData ? (
        <div>
          <SkeletonProductList />
        </div>
      ) : (
        <div
          className={
            viewMode === "grid"
              ? `grid grid-cols-2 lg:grid-cols-3 gap-6 ${
                  viewFilter ? "z-0" : "z-30"
                }`
              : "space-y-4"
          }
        >
          {currenData.length > 0 ? (
            currenData
              .slice()
              .reverse()
              .map((product) => (
                <div
                  key={product._id}
                  onClick={() => handleProductClick(product._id, product.name)}
                >
                  <ProductProvider>
                    <ProductCard product={product} />
                  </ProductProvider>
                </div>
              ))
          ) : (
            <div className="col-span-full text-center py-10 text-gray-500">
              Không tìm thấy sản phẩm.
            </div>
          )}
        </div>
      )}

      {/* Pagination */}
      {sortedProducts.length > 0 && (
        <nav
          className="flex flex-col items-center justify-center mt-4 p-4 space-y-3 md:flex-row md:items-center md:space-y-0"
          aria-label="Table navigation"
        >
          <ul className="inline-flex items-stretch -space-x-px">
            <li>
              <button
                onClick={prevPage}
                disabled={currenPage === 1}
                className="cursor-pointer flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-[rgb(var(--primary-rgb))] hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Previous</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </li>
            {Array.from({ length: totalPage }, (_, i) => i + 1)?.map(
              (item: any, index: any) => {
                return (
                  <li
                    key={index}
                    onClick={() => {
                      selectPage(item);
                      scrollToSection(`product-home`);
                    }}
                  >
                    <div
                      className={`${
                        item === currenPage
                          ? "bg-[rgb(var(--fifteenth-rgb))] text-gray-700"
                          : "bg-white hover:bg-[rgb(var(--primary-rgb))]"
                      } cursor-pointer flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 border border-gray-300 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700`}
                    >
                      {item}
                    </div>
                  </li>
                );
              }
            )}
            <li>
              <button
                onClick={nextPage}
                disabled={currenPage === totalPage}
                className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-[rgb(var(--primary-rgb))] hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Next</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default ProductGrid;
