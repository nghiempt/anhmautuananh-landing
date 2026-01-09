import React from "react";

const SkeletonHomeSection6 = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="flex flex-col items-center justify-center">
          <div className="mt-8 lg:mt-0 flex justify-end items-center ">
            <div className="w-[405px] h-[295px] bg-gray-300 rounded-lg"></div>
          </div>
          <div className="w-full mt-5">
            <div className="h-4 bg-gray-300 rounded-md w-[40%] mb-4"></div>
            <div className="h-6 bg-gray-300 rounded-md w-6/6 mb-4"></div>
            <div className="h-[60px] bg-gray-300 rounded-md w-6/6 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded-md w-2/6 mb-4"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonHomeSection6;
