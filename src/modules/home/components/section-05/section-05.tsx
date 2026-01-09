// components/ReadingTestCollection.tsx
"use client";

import { CreditCard, Plane, RotateCcw } from "lucide-react";
import React, { useState } from "react";
import FeatureCard from "./components/card";
import Image from "next/image";
import { toast } from "@/hooks/use-toast";
import { IMAGES } from "@/utils/image";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/utils/route";

const features = [
  {
    icon: <Plane className="w-12 h-12" strokeWidth={1.5} />,
    title: "Giao Hàng Toàn Quốc",
    description: "Trên tất cả các đơn hàng trên 100.000đ",
    linkText: "Tìm Hiểu Thêm",
  },
  {
    icon: <CreditCard className="w-12 h-12" strokeWidth={1.5} />,
    title: "100% Thanh Toán An Toàn",
    description: "Chúng tôi đảm bảo thanh toán an toàn với PEV",
    linkText: "Tìm Hiểu Thêm",
  },
  {
    icon: <RotateCcw className="w-12 h-12" strokeWidth={1.5} />,
    title: "30 Ngày Đổi Trả",
    description: "Trả hàng trong vòng 30 ngày để được đổi",
    linkText: "Tìm Hiểu Thêm",
  },
];

const Section5: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  // const handleSubmit = () => {
  //   if (email) {
  //     setIsSubscribed(true);
  //     setTimeout(() => setIsSubscribed(false), 3000);
  //     setEmail("");
  //   }
  // };

  return (
    <div className="w-full mx-auto px-5 lg:px-0">
      <section className="pb-20">
        <div className="bg-gray-50">
          {/* Newsletter Section */}
          <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
            <div className="w-full h-full bg-black/20 absolute inset-0 z-20"></div>
            <div className="absolute inset-0">
              <Image
                src={IMAGES.BANNER_2}
                alt=""
                fill
                priority
                className="object-cover object-[20%_70%] lg:object-right"
              />
            </div>
            <div className="relative w-5/6 lg:max-w-4xl mx-auto px-6 py-10 my-20 text-center backdrop-blur-none bg-white/90 rounded-lg z-30">
              <div className="text-xl md:text-3xl font-semibold text-gray-900 mb-3">
                Liên hệ với chúng tôi
              </div>
              <p className="hidden lg:flex text-base text-gray-600 mb-10 max-w-2xl mx-auto">
                Chúng tôi cung cấp sản phẩm chất lượng cao với giá cả hợp lý.
                Đăng ký nhận bản tin của chúng tôi để cập nhật thông tin mới
                nhất và ưu đãi đặc biệt.
              </p>
              <p className="flex lg:hidden text-sm text-gray-600 mb-10 max-w-2xl mx-auto">
                Chúng tôi cung cấp sản phẩm chất lượng, giá hợp lý. Đăng ký bản
                tin để nhận ưu đãi.
              </p>
              <div className="max-w-2xl mx-auto mb-8">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Nhập địa chỉ email của bạn"
                    className="!text-[14px] lg:!text-[16px] placeholder-gray-500 flex-1 px-6 py-2 text-lg border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--fifteenth-rgb))] focus:border-transparent bg-transparent"
                  />
                  <button
                    onClick={() => {
                      router.push(`${ROUTES.PRODUCT}`);
                    }}
                    className="text-sm lg:text-base px-8 py-3 bg-[rgb(var(--fifteenth-rgb))] text-white font-semibold rounded-md hover:opacity-80 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                  >
                    {isSubscribed ? "Đã Đăng Ký!" : "Đăng Ký"}
                  </button>
                </div>
              </div>
              <p className="text-gray-600 text-sm lg:text-base">
                Chúng tôi đảm bảo rằng thông tin của bạn sẽ được bảo mật.
              </p>
            </div>
          </div>

          {/* Features Section */}
          <div className="bg-[#F8F8F8] py-10">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                {features.map((feature, index) => (
                  <FeatureCard
                    key={index}
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                    linkText={feature.linkText}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Section5;
