import React from "react";

const SkeletonProductList = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
      {Array.from({ length: 9 }).map((_, index) => (
        <div key={index} className="flex flex-col items-center justify-center">
          <div className="mt-8 lg:mt-0 flex justify-end items-center">
            <div className="w-[163px] lg:w-[320px] h-[163px] lg:h-[302px] bg-gray-300"></div>
          </div>
          <div className="w-full mt-5">
            <div className="h-6 bg-gray-300 rounded-md w-full mb-4"></div>
            <div className="h-6 bg-gray-300 rounded-md w-4/6 mb-4"></div>
            <div className="h-6 bg-gray-300 rounded-md w-3/6 mb-4"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonProductList;
