import React from "react";

const SkeletonProductDetail = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 ">
      <div className="flex flex-col gap-7 items-start justify-start animate-pulse">
        {/* <div className="hidden lg:flex flex-col h-full gap-2">
          <div className="w-[95px] h-[95px] bg-gray-300"></div>
          <div className="w-[95px] h-[95px] bg-gray-300"></div>
          <div className="w-[95px] h-[95px] bg-gray-300"></div>
        </div> */}
        <div className="mt-8 lg:mt-0 flex justify-start items-start">
          <div className="w-[350px] h-[350px] lg:w-[600px] lg:h-[560px] bg-gray-300"></div>
        </div>
        <div className="flex flex-row h-full lg:gap-7 gap-2">
          <div className="lg:w-[180px] lg:h-[170px] w-[95px] h-[95px] bg-gray-300"></div>
          <div className="lg:w-[180px] lg:h-[170px] w-[95px] h-[95px] bg-gray-300"></div>
          <div className="lg:w-[180px] lg:h-[170px] w-[95px] h-[95px] bg-gray-300"></div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row items-start justify-start">
        <div className="w-full">
          <div className="h-8 bg-gray-300 rounded-md w-full mb-4 animate-pulse"></div>
          <div className="h-4 bg-gray-300 rounded-md w-2/6 mb-4 animate-pulse"></div>
          <div className="h-10 bg-gray-300 rounded-md w-[24%] mb-4 animate-pulse"></div>
          <div className="mb-2 mt-5 font-medium">Giá sản phẩm:</div>
          <div className="h-8 bg-gray-300 rounded-md w-1/2 mb-4 animate-pulse"></div>
          <div className="mb-2 mt-5 font-medium">Màu sắc:</div>
          <div className="flex flex-row gap-3">
            {Array.from({ length: 3 }).map((item, index) => (
              <div
                key={index}
                className="h-8 w-8 bg-gray-300 rounded-full mb-4 animate-pulse"
              ></div>
            ))}
          </div>
          <div className="mb-2 mt-5 font-medium">Giới thiệu:</div>
          <div className="h-20 bg-gray-300 rounded-md w-full mb-10 animate-pulse"></div>
          <div className="h-[45px] bg-gray-300 rounded-md w-[136px] mb-4 animate-pulse"></div>
          <div className="h-[45px] bg-gray-300 rounded-md w-[205px] mb-4 animate-pulse"></div>
          <div className="h-[1px] bg-gray-300 w-full mb-[36px]"></div>
          <div className="grid grid-cols-12 gap-1 items-center justify-center">
            <div className="col-span-2 font-medium">Phân loại:</div>
            <div className="col-span-10 h-6 bg-gray-300 rounded-md w-1/4 animate-pulse"></div>
          </div>
          <div className="grid grid-cols-12 gap-1 items-center justify-center mt-2 mb-[70px]">
            <div className="col-span-2 font-medium">Chia sẻ:</div>
            <div className="col-span-10 flex flex-row w-full gap-2">
              {Array.from({ length: 2 }).map((item, index) => (
                <div
                  key={index}
                  className="h-8 w-8 bg-gray-300 rounded-full animate-pulse"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonProductDetail;
