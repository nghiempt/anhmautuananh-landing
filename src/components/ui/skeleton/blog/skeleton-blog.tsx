import React from "react";

const SkeletonBlog = () => {
  return (
    <div className="w-full h-full flex flex-col animate-pulse">
      <div className="hidden lg:grid grid-cols-2 gap-6 items-center justify-center">
        <div className="mt-8 lg:mt-0 flex justify-center items-center">
          <div className="w-[627px] h-[417px] bg-gray-300 rounded-lg"></div>
        </div>
        <div className="flex flex-col h-full">
          <div className="h-8 bg-gray-300 rounded-md w-full mb-4"></div>
          <div className="h-[131px] bg-gray-300 rounded-md w-6/6 mb-4"></div>
          <div className="h-6 bg-gray-300 rounded-md w-2/6 mb-4"></div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:mt-10">
        {Array.from({ length: 3 }).map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-1 gap-5 items-center justify-center h-full"
          >
            <div className="flex justify-center items-center">
              <div className="w-[408px] h-44 lg:h-[318px] bg-gray-300 rounded-lg"></div>
            </div>
            <div className="flex flex-col">
              <div className="h-8 bg-gray-300 rounded-md w-4/4 mb-4"></div>
              <div className="h-10 bg-gray-300 rounded-md w-6/6 mb-4"></div>
              <div className="h-6 bg-gray-300 rounded-md w-2/6 mb-4"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonBlog;
