import { HELPER } from "@/utils/helper";
import { BarChart3, Eye, Heart, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Product } from "@/types/product";
import { toast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
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
  return (
    <div className="cursor-pointer group relative bg-white overflow-hidden transition-all duration-300">
      {product.discount !== "0" && (
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-amber-600 text-white text-xs font-semibold px-3 py-1 rounded">
            Khuyến mãi {product.rating}%
          </span>
        </div>
      )}

      {/* Product Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <div>
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <Image
              src={"https://res.cloudinary.com/farmcode/image/upload/v1767944095/other/tykq6el6f4ixk1mgg8jr.png"}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              className={`transition-opacity duration-300 border border-gray-200  ${
                product.images[1]
                  ? "group-hover:opacity-0"
                  : "group-hover:opacity-100"
              }`}
            />
            {product.images[1] && (
              <Image
                src={"https://res.cloudinary.com/farmcode/image/upload/v1767944095/other/tykq6el6f4ixk1mgg8jr.png"}
                alt={`${product.name} hover`}
                layout="fill"
                objectFit="cover"
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-gray-200"
              />
            )}
          </div>
        </div>
        <>
          {/* <div onClick={() => {
            toast({
              variant: "default",
              title: "Thông báo",
              description: "Chức năng đang được phát triển.",
            });
          }} className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
            <button className="w-full bg-[rgb(var(--primary-rgb))] text-white py-3 px-4 rounded font-medium hover:bg-[rgb(var(--fifteenth-rgb))] hover:text-white transition-colors flex items-center justify-center space-x-2">
              <ShoppingCart className="w-4 h-4" />
              <span>Thêm vào giỏ</span>
            </button>
          </div>
        </>
      </div>

      {/* Product Info */}
      <div className="py-4 flex flex-col justify-between items-start w-full">
        <div className="flex flex-col justify-between">
          <h3 className="font-light text-gray-900 mb-1 text-[14px] lg:text-[16px] h-full line-clamp-1">
            {product.name}
          </h3>
          <div className="flex text-xs lg:text-[14px] font-light items-center mb-2">
            {renderStars(Number(product.rating))} &nbsp;&nbsp;(
            {product.sold} đã bán)
          </div>
        </div>
        <div className="flex flex-col w-full lg:flex-row justify-between items-start lg:items-end">
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
              <span className="text-[14px] lg:text-[14px] text-gray-500 line-through">
                {HELPER.formatVND(product.product_option[0].price)}
              </span>
            )}
          </div>
          <div className="flex items-start w-full lg:justify-end space-x-2 mt-3">
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
    </div>
  );
};

export default ProductCard;
