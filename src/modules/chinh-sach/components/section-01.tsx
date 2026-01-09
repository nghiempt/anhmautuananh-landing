"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IMAGES } from "@/utils/image";
import Link from "next/link";
import { ROUTES } from "@/utils/route";
import { useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";
interface PolicySection {
  id: number;
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

  const paymentContent = (
    <div className="space-y-4 text-black">
      <p className="mb-4 text-left">
        Khách hàng có thể đặt hàng qua website hoặc liên hệ{" "}
        <span className="font-semibold">đường dây nóng: 0939.752.966</span>.
      </p>
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-black">
          Phương thức thanh toán:
        </h3>
        <ul className="list-disc pl-6 text-left">
          <li>
            Thanh toán khi nhận hàng: Quý khách thanh toán đầy đủ giá trị đơn
            hàng ngay sau khi kiểm tra hàng hóa.
          </li>
          <li>
            <p className="mb-2">Thanh toán chuyển khoản:</p>
            <ul className="list-none pl-6">
              <li>- Tên tài khoản: [Tên tài khoản]</li>
              <li>- Số tài khoản: [Số tài khoản]</li>
              <li>- Ngân hàng: [Tên ngân hàng]</li>
              <li>- Chi nhánh: [Chi nhánh]</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );

  const privacyContent = (
    <div className="space-y-4 text-black">
      <p className="mb-4 text-justify">
        Khi truy cập website INANHHATHU.COM, quý khách đồng ý và chấp nhận thực
        hiện những mô tả trong Chính sách bảo mật thông tin. Nếu quý khách không
        đồng ý với các điều khoản của Chính sách này, vui lòng không sử dụng
        website của chúng tôi. Chính sách này được đưa ra nhằm bảo vệ quyền lợi
        của quý khách khi sử dụng dịch vụ và mua hàng.
      </p>
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-black">
          1. Mục đích và phạm vi thu thập thông tin
        </h3>
        <p>Việc thu thập dữ liệu trên website INANHHATHU.COM bao gồm:</p>
        <ul className="list-disc pl-6">
          <li>Email</li>
          <li>Số điện thoại</li>
          <li>Địa chỉ khách hàng</li>
          <li>Hình ảnh khách hàng</li>
          <li>Thông tin thanh toán</li>
        </ul>
        <p>
          Đây là các thông tin bắt buộc quý khách cần cung cấp khi sử dụng dịch
          vụ để chúng tôi thiết kế, in ấn và liên hệ xác nhận, đảm bảo quyền lợi
          và hoàn thiện đơn hàng.
        </p>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-black">
          2. Phạm vi sử dụng thông tin
        </h3>
        <p>Chúng tôi sử dụng thông tin quý khách cung cấp để:</p>
        <ul className="list-disc pl-6">
          <li>Cung cấp hình ảnh cho công cụ AI để thực hiện chỉnh sửa</li>
          <li>Giao hàng tới địa chỉ do quý khách cung cấp</li>
          <li>Liên lạc và giải quyết trong những trường hợp đặc biệt</li>
          <li>
            Cung cấp thông tin cho các đơn vị vận chuyển nhằm giao nhận hàng hóa
          </li>
          <li>
            Chỉ có quan tụ pháp có yêu cầu thì mới cung cấp thông tin gồm: Viện
            kiểm sát, tòa án, công an điều tra
          </li>
        </ul>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-black">
          3. Cam kết bảo mật thông tin cá nhân khách hàng
        </h3>
        <ul className="list-disc pl-6">
          <li>
            Thông tin cá nhân của quý khách được chúng tôi cam kết bảo mật tuyệt
            đối, không sử dụng hoặc cung cấp cho bên thứ 3 nếu không có sự đồng
            ý từ quý khách.
          </li>
          <li>
            Thông tin có thể được cung cấp cho bên vận chuyển nhằm giao nhận
            hàng hóa gồm: tên, địa chỉ, số điện thoại.
          </li>
        </ul>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-black">
          4. Thời gian lưu trữ thông tin
        </h3>
        <p>
          Chúng tôi sẽ lưu trữ thông tin cá nhân của quý khách trong suốt quá
          trình cung cấp dịch vụ hoặc cho đến khi quý khách yêu cầu hủy bỏ.
        </p>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-black">
          5. Địa chỉ đơn vị thu thập và quản lý thông tin cá nhân
        </h3>
        <p>Cở sở kinh doanh IN ẢNH HẠ THU</p>
        <ul className="list-disc pl-6">
          <li>Địa chỉ: QL91 Tân Thành, Cà Mau</li>
          <li>Điện thoại: 0939.752.966</li>
        </ul>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-black">
          6. Phương tiện và công cụ để người dùng tiếp cận và chỉnh sửa dữ liệu
          cá nhân
        </h3>
        <p>
          Quý khách có thể thực hiện quyền kiểm tra, cập nhật, chỉnh sửa hoặc
          hủy bỏ thông tin cá nhân bằng cách:
        </p>
        <ul className="list-disc pl-6">
          <li>Truy cập website INANHHATHU.COM</li>
          <li>Liên hệ qua email hoặc địa chỉ liên lạc công bố trên website.</li>
        </ul>
      </div>
    </div>
  );

  const shippingContent = (
    <div className="space-y-4 text-black">
      <p className="mb-4">
        Sau khi khách hàng đặt hàng trên trang web INANHHATHU.COM, hệ thống sẽ
        tự động gửi thông báo xác nhận đã đặt hàng. Đội ngũ hỗ trợ của chúng tôi
        sẽ liên hệ với Quý khách qua số điện thoại mà Quý khách đã cung cấp để
        xác minh thông tin đơn hàng, thông báo chi phí vận chuyển, thời gian
        giao hàng dự kiến và các thông tin cần thiết khác. Chúng tôi hỗ trợ giao
        hàng tận nơi trên toàn quốc
      </p>
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-black">Thời gian giao hàng:</h3>
        <ul className="list-disc pl-6">
          <li>Nội thành TP.HCM: 1-2 ngày (không tính thứ 7, chủ nhật).</li>
          <li>
            Các khu vực khác: 3-7 ngày (không tính thứ 7, chủ nhật và các ngày
            lễ)
          </li>
        </ul>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-black">Chi phí giao hàng:</h3>
        <ul className="list-disc pl-6">
          <li>Miễn phí vận chuyển cho đơn hàng từ ... VNĐ.</li>
          <li>Phí ... VNĐ cho các đơn hàng dưới ... VNĐ.</li>
        </ul>
      </div>
    </div>
  );

  const returnContent = (
    <div className="w-full space-y-4 text-black">
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-black">
          Lý do chấp nhận đổi trả:
        </h3>
        <ul className="list-disc pl-6 text-left">
          <li>Sản phẩm giao sai về số lượng, thông tin hoặc mẫu mã.</li>
          <li>
            Sản phẩm bị hỏng do lỗi sản xuất hoặc trong quá trình vận chuyển.
          </li>
        </ul>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-black">Yêu cầu trả hàng:</h3>
        <ul className="list-disc pl-6">
          <li>Sản phẩm còn đóng gói nguyên vẹn.</li>
          <li>Đầy đủ phụ kiện và quà tặng (nếu có).</li>
          <li>Không có dấu hiệu đã qua sử dụng.</li>
        </ul>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-black">Thời gian đổi trả:</h3>
        <p className="pl-6">
          <span className="text-yellow-500 font-bold">
            Trong vòng 24h kể từ khi nhận hàng.
          </span>
        </p>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-black">Chi phí đổi trả:</h3>
        <ul className="list-disc pl-6 text-left">
          <li>Đổi lỗi của chúng tôi: Miễn phí vận chuyển hai chiều.</li>
          <li>
            Do nhu cầu của khách: Khách hàng thanh toán chi phí vận chuyển.
          </li>
        </ul>
      </div>
    </div>
  );

  const policies: PolicySection[] = [
    {
      id: 1,
      title: "Chính sách bảo mật",
      content: privacyContent,
      scrollId: "bm",
    },
    {
      id: 2,
      title: "Chính sách giao hàng",
      content: shippingContent,
      scrollId: "gh",
    },
    {
      id: 3,
      title: "Chính sách thanh toán",
      content: paymentContent,
      scrollId: "tt",
    },
    {
      id: 4,
      title: "Chính sách đổi trả",
      content: returnContent,
      scrollId: "dt",
    },
  ];

  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>(
    policies.reduce((acc, policy) => {
      acc[policy.title] = true;
      return acc;
    }, {} as { [key: string]: boolean })
  );

  const toggleSection = (title: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <section className="w-[100%] h-full mx-auto pt-10 pb-20 relative overflow-hidden px-5 lg:px-0">
      <div className="w-full relative z-10 flex flex-col justify-center items-center h-full mx-auto text-black max-w-7xl">
        {policies.map((policy) => (
          <div key={policy.title} className="w-full ">
            <button
              id={policy.scrollId}
              className="w-full pt-4 pb-2 flex justify-start items-center text-left"
            >
              {/* <span className="text-xl lg:text-2xl font-semibold text-black pr-2"></span> */}
              <div className="relative z-20">
                <div
                  className={`absolute bottom-[28%] h-2 
                    ${
                      policy.id === 1
                        ? "w-36 lg:w-28 left-[50%] lg:left-[58%]"
                        : ""
                    }
                    ${
                      policy.id === 2
                        ? "w-36 lg:w-32 left-[50%] lg:left-[55%]"
                        : ""
                    }
                    ${
                      policy.id === 3
                        ? "w-36 lg:w-[140px] left-[50%] lg:left-[52%]"
                        : ""
                    }
                    ${
                      policy.id === 4
                        ? "w-36 lg:w-[93px] left-[50%] lg:left-[64%]"
                        : ""
                    }
                    ${policy.id === 5 ? "w-36 left-[50%] lg:left-[55%]" : ""}
                       bg-[rgb(var(--fifteenth-rgb))] opacity-45 z-10`}
                ></div>
                <h1
                  className={`text-2xl font-bold text-gray-900 mb-2 z-20 relative`}
                >
                  {policy.title}
                </h1>
              </div>
            </button>
            {expandedSections[policy.title] && (
              <div className="text-justify pt-0 lg:pb-4 text-black">
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
