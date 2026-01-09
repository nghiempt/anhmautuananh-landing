import { IMAGES } from "@/utils/image";
import Image from "next/image";
import React from "react";

const SkeletonAccountInfo = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="bg-white">
        <h2 className="text-xl font-semibold text-gray-900 mb-3.5">
          Thông tin tài khoản
        </h2>
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row items-start gap-6">
            <div className="w-full lg:w-1/6 flex justify-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                <Image
                  src={IMAGES.LOGO}
                  alt="Avatar"
                  className="w-full h-full rounded-full"
                  width={1000}
                  height={1000}
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 w-full">
              <div className="space-y-2 mb-2.5">
                <div className="text-gray-900 flex flex-row gap-3">
                  <span className="font-medium">Họ và tên:</span>{" "}
                  <div className="h-6 bg-gray-300 rounded-md w-1/2 animate-pulse"></div>
                </div>
                <div className="text-gray-900 flex flex-row gap-3">
                  <span className="font-medium">Email:</span>{" "}
                  <div className="h-6 bg-gray-300 rounded-md w-1/2 animate-pulse"></div>
                </div>
                <div className="text-gray-900 flex flex-row gap-3">
                  <span className="font-medium">Số điện thoại:</span>{" "}
                  <div className="h-6 bg-gray-300 rounded-md w-1/2 animate-pulse"></div>
                </div>
              </div>
              <div className="w-[80%] flex flex-col lg:flex-row gap-3">
                <div className="h-[41px] bg-gray-300 rounded-md w-[80%] animate-pulse"></div>
                <div className="h-[41px] bg-gray-300 rounded-md w-[60%] animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-3.5">
          Địa chỉ giao hàng
        </h2>
        <div className="relative">
          <div className="relative space-y-2 h-full">
            <div className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg">
              <div className="w-6 h-6 mt-0">
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>

              <div className="flex-1">
                <div className="h-8 bg-gray-300 rounded-md w-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonAccountInfo;
