import React from "react";

const SkeletonHomeSection4 = () => {
  return (
    <div className="flex flex-col gap-6 animate-pulse mt-10">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="flex flex-row gap-4 items-center justify-center"
        >
          <div className="mt-8 lg:mt-0 flex justify-end items-center">
            <div className="w-[80px] h-[80px] bg-gray-300"></div>
          </div>
          <div className="w-full h-full justify-center items-center">
            <div className="h-4 bg-gray-300 rounded-md w-full mb-3 mt-0.5"></div>
            <div className="h-4 bg-gray-300 rounded-md w-4/6 mb-3"></div>
            <div className="h-4 bg-gray-300 rounded-md w-3/6"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonHomeSection4;
