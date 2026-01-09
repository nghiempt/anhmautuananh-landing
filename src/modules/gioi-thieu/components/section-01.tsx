"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IMAGES } from "@/utils/image";
import Link from "next/link";
import { ROUTES } from "@/utils/route";
import { useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";

interface PolicySection {
  title: string;
  content: React.ReactNode;
  scrollId: string;
}

interface ServiceCard {
  title: string;
  description: string;
  imageSrc: string;
}

const Section01 = () => {
  const searchParams = useSearchParams();
  const tab = searchParams.get("scrollTo");

  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({ "Giới thiệu": true });

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (tab) {
      const sectionMap: { [key: string]: string } = {
        gt: "Giới thiệu",
        bm: "Chính sách bảo mật",
        gh: "Chính sách giao hàng",
        tt: "Chính sách thanh toán",
        dt: "Chính sách đổi trả",
      };

      const sectionTitle = sectionMap[tab];
      if (sectionTitle) {
        setExpandedSections((prev) => ({
          ...prev,
          [sectionTitle]: true,
        }));
        setTimeout(() => {
          scrollToSection(tab);
        }, 100);
      }
    }
  }, [tab]);

  const services: ServiceCard[] = [
    {
      title: "ALBUM GIA ĐÌNH",
      description:
        "Biến từng tấm ảnh cưới thành một câu chuyện đầy riêng tư và ý nghĩa. Với đa dạng mẫu mã được tối ưu theo phong cách riêng của bạn – từ hiện đại, vintage, phong cách Hàn Quốc đến sự hòa quyện với thiên nhiên, chúng tôi mang đến những thiết kế album độc đáo, tinh tế. Đặc biệt, chất lượng hình ảnh luôn sắc nét, chống trầy xước, giúp bạn lưu giữ kỷ niệm một cách hoàn hảo.",
      imageSrc:
        "https://res.cloudinary.com/farmcode/image/upload/v1761639337/iatt/image_ef4qpd.jpg",
    },
    {
      title: "ẢNH ÉP GỖ KHUNG VIỀN",
      description:
        "Mang đến sự lựa chọn hoàn hảo cho ảnh cưới và tiệc với thiết kế hiện đại, phù hợp mọi không gian trang trí. Bộ sưu tập đa dạng, mẫu mã mới bắt khung viền Titan sang trọng, Khung gỗ cổ điển, khung viền Hàn Quốc... hiện đại tinh tế. Từng sản phẩm đều được thiết kế để tôn lên vẻ đẹp của khoảnh khắc và hòa quyện với mọi bối cảnh trang trí.",
      imageSrc:
        "https://res.cloudinary.com/farmcode/image/upload/v1761639311/iatt/image_oos7mo.jpg",
    },
    {
      title: "ẢNH ÉP PLASTIC, LỤA",
      description:
        "Lưu giữ trọn vẹn vẻ đẹp thời gian với dịch vụ in ảnh ép Plastic và Lụa. Ảnh được in bằng máy in chất lượng, đảm bảo độ sắc nét tuyệt đối và màu sắc bền đẹp trên 10 năm. Từng sản phẩm đều được in ấn tỉ mỉ, mang đến sự hài lòng tối đa và trở thành món quà ý nghĩa để lưu giữ những kỷ niệm của bạn.",
      imageSrc:
        "https://res.cloudinary.com/farmcode/image/upload/v1761639179/iatt/image_kymemd.jpg",
    },
  ];

  const introductionContent = (
    <div className="space-y-8">
      <div className="text-black">
        <p className="mb-4 font-semibold text-left text-2xl">
          Chào mừng bạn đến với Ảnh Màu Tuấn Anh (<strong>anhmautuananh.com</strong>)
        </p>
        <p className="mb-4">
          Tại ANHMÀUTUÂNANH.COM, chúng tôi thấu hiểu rằng những khoảnh khắc quan
          trọng trong cuộc đời không chỉ là dấu ấn của thời gian, mà còn là
          những cột mốc ý nghĩa trong hành trình sống của mỗi người. Được đồng
          hành cùng những giây phút đặc biệt, từ niềm hạnh phúc tròn vẹn trong
          ngày cưới, niềm vui tuổi già gặp ngày tân xuân, sự ấm áp của bữa tiệc
          thôi nôi bên gia đình, về đẹp rực rỡ của thanh xuân thời thiếu nữ, đến
          những bức ảnh gia đình tràn đầy yêu thương, gắn kết qua từng thế hệ.
        </p>
        <p>
          Với niềm đam mê và chuyên môn trong thiết kế và gia công, chúng tôi tự
          hào mang đến những sản phẩm độc đáo, tinh tế, giúp bạn lưu giữ trọn
          vẹn những kỷ niệm quý giá. Đó là niềm vui, nơi nhớ, hay tình cảm gia
          đình sâu sắc, chúng tôi tin rằng mỗi khoảnh khắc đều xứng đáng được
          trân trọng và được hiện diện theo cách đặc biệt nhất.
        </p>
      </div>
      <div>
        <h2 className="text-2xl font-semibold text-left mb-6 text-black">
          Dịch vụ nổi bật của chúng tôi
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-md bg-white border border-gray-200 overflow-hidden p-4 cursor-pointer group hover:shadow-md transition-shadow duration-300 z-20"
            >
              <div className="relative h-48 bg-white overflow-hidden rounded-md">
                <Image
                  src={"https://res.cloudinary.com/farmcode/image/upload/v1767944095/other/tykq6el6f4ixk1mgg8jr.png"}
                  alt={service.title}
                  className="rounded-md w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  width={397}
                  height={465}
                />
                <div className="absolute inset-0 bg-black opacity-30"></div>
                <div className="absolute top-[45%] left-0 right-0">
                  <h3 className="text-xl font-bold mb-2 text-white text-center">
                    {service.title}
                  </h3>
                </div>
              </div>
              <div className="pt-4">
                <p className="text-black text-base">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const policies: PolicySection[] = [
    {
      title: "Giới thiệu",
      content: introductionContent,
      scrollId: "gt",
    },
  ];

  const toggleSection = (title: string) => {
    setExpandedSections((prev: any) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <section className="w-[100%] h-full mx-auto pb-20 relative overflow-hidden">
      <div className="relative z-10 flex flex-col justify-center items-center h-full mx-auto text-black max-w-7xl px-5 lg:px-0">
        {policies.map((policy) => (
          <div key={policy.title} className="w-full">
            {/* <button
              id={policy.scrollId}
              onClick={() => toggleSection(policy.title)}
              className="w-full pt-4 pb-2 flex justify-start items-center text-left "
            >
              <span className="text-2xl font-semibold text-black pr-2">
                {policy.title}
              </span>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  expandedSections[policy.title] ? "rotate-180" : ""
                }`}
              />
            </button> */}
            {expandedSections[policy.title] && (
              <div className="text-justify pt-4 lg:py-4 text-black">
                {policy.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Section01;
