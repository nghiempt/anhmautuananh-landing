import React, { useEffect } from "react";
import { Star } from "lucide-react";
import Image from "next/image";
import { HELPER } from "@/utils/helper";
import { useProduct } from "@/modules/san-pham/components/product-context";
import { useRouter, useSearchParams } from "next/navigation";
import { slugifyURL } from "@/utils/slugify";
import { ROUTES } from "@/utils/route";

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

interface ProductCardProps {
  product: Product;
  showRating?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  showRating = false,
}) => {
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
      className="flex items-start space-x-4 py-4 cursor-pointer"
    >
      <div className="w-20 h-20 bg-gray-100 flex items-center justify-center overflow-hidden">
        <Image
          src={"https://res.cloudinary.com/farmcode/image/upload/v1767944095/other/tykq6el6f4ixk1mgg8jr.png"}
          alt={product.name}
          width={1000}
          height={1000}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex-1 items-start">
        <h3 className="font-base text-gray-900 mb-1 line-clamp-1">
          {product.name}
        </h3>
        <div className="flex flex-row items-center space-x-2">
          <span className="text-lg font-base text-orange-600">
            {HELPER.formatVND(
              String(
                Number(product.product_option[0].price) -
                  Number(product.discount) *
                    Number(Number(product.product_option[0].price) * 0.01)
              )
            )}
          </span>
          {product.discount !== "0" && (
            <span className="text-sm text-gray-500 line-through">
              {HELPER.formatVND(product.product_option[0].price)}
            </span>
          )}
        </div>
        {showRating && (
          <div className="flex items-center mt-1">
            {renderStars(Number(product.rating))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
