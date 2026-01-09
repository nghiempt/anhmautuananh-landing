import { useProduct } from "@/modules/san-pham/components/product-context";
import { HELPER } from "@/utils/helper";
import { ROUTES } from "@/utils/route";
import { slugifyURL } from "@/utils/slugify";
import { Heart, Eye, BarChart3, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

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

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };
  const router = useRouter();

  const handleProductClick = (productId: string, title: string) => {
    router.push(`${ROUTES.PRODUCT}/${slugifyURL(title)}?spid=${productId}`);
  };
  return (
    <div
      onClick={() => handleProductClick(product._id, product.name)}
      className="cursor-pointer group relative bg-white overflow-hidden transition-all duration-300"
    >
      {product.discount !== "0" && (
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-amber-600 text-white text-xs font-semibold px-3 py-1 rounded">
            Khuyến mãi {product.rating}%
          </span>
        </div>
      )}

      {/* Product Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
          <Image
            src={product.thumbnail}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className={`transition-opacity duration-300 border border-gray-200  ${
              product?.images[1]
                ? "group-hover:opacity-0"
                : "group-hover:opacity-100"
            }`}
          />
          {product?.images[1] && (
            <Image
              src={product.images[1]}
              alt={`${product.name} hover`}
              layout="fill"
              objectFit="cover"
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          )}
        </div>
        <>
          {/* <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow">
              <Heart className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow">
              <BarChart3 className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow">
              <Eye className="w-4 h-4 text-gray-600" />
            </button>
          </div> */}
          <div className="absolute -bottom-16 group-hover:bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-500 ease-in-out">
            <button className="w-full bg-[rgb(var(--primary-rgb))] text-gray-800 py-3 px-4 rounded font-medium hover:bg-[rgb(var(--fifteenth-rgb))] hover:text-[rgb(var(--primary-rgb))] transition-colors flex items-center justify-center space-x-2">
              <ShoppingCart className="w-4 h-4" />
              <span>Thêm vào giỏ</span>
            </button>
          </div>
        </>
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-row justify-between items-end">
        <div>
          <h3 className="font-medium text-gray-900 mb-1 text-sm h-full line-clamp-1">
            {product.name}
          </h3>
          <div className="flex text-[14px] font-light items-center mb-2">
            {renderStars(Number(product.rating))} &nbsp;&nbsp;(
            {product.sold} đã bán)
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-[16px] lg:text-[18px] font-semibold text-gray-900">
              {HELPER.formatVND(
                String(
                  Number(product.product_option[0].price) -
                    Number(product.discount) *
                      Number(Number(product.product_option[0].price) * 0.01)
                )
              )}
            </span>
            {product.discount !== "0" && (
              <span className="text-[14px] lg:text-[16px] text-gray-500 line-through">
                {HELPER.formatVND(product.product_option[0].price)}
              </span>
            )}
          </div>
        </div>

        {/* Color Options for Arctander Chair */}
        <div className="flex space-x-2 mt-3">
          {product.color.slice(0, 3).map((color, index) => (
            <div
              key={index}
              className={`w-4 h-4 ${HELPER.renderColor(
                color
              )} rounded-full border border-gray-200`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
