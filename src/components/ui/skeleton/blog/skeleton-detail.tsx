import React from "react";

const SkeletonBlogDetail = () => {
  return (
    <div className="w-full max-w-[765px] lg:min-w-[765px] h-full flex flex-col animate-pulse">
      <div className="grid grid-cols-1 gap-6 items-center justify-center">
        <div className="mt-8 lg:mt-0 flex justify-center items-center w-full">
          <div className="flex lg:block w-full h-[190px] lg:h-[431px] bg-gray-300 rounded-lg"></div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 mt-5 w-full">
        <div className="gap-5 items-center justify-center h-full w-full">
          <div className="flex flex-col">
            <div className="h-5 bg-gray-300 rounded-md w-2/5 mb-4"></div>
            <div className="h-[70px] bg-gray-300 rounded-md w-full mb-4"></div>
            <div className="h-52 bg-gray-300 rounded-md w-full mb-4"></div>
            <div className="h-12 bg-gray-300 rounded-md w-2/6 mb-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonBlogDetail;
