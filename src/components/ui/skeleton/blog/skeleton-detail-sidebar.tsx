import React from "react";

const SkeletonBlogDetailSidebar = () => {
  return (
    <div className="w-[320px] h-full flex flex-col">
      <div className="hidden lg:grid grid-cols-1 gap-6 items-center justify-center animate-pulse">
        <div className="mt-8 lg:mt-0 flex justify-center items-center">
          <div className="w-full h-[417px] bg-gray-300 rounded-lg"></div>
        </div>
      </div>
      <h3 className="font-bold text-lg mb-3 lg:mt-7">Bài viết liên quan</h3>
      <div className="grid grid-cols-1 gap-5 mt-0 animate-pulse w-[320]">
        {Array.from({ length: 3 }).map((item, index) => (
          <div
            key={index}
            className="flex flex-row items-start gap-3 justify-center w-full h-full"
          >
            <div className="flex justify-center items-center">
              <div className="w-20 h-20 bg-gray-300 rounded-lg"></div>
            </div>
            <div className="flex flex-col">
              <div className="h-10 bg-gray-300 rounded-md w-[230px] lg:w-[225px] mb-2"></div>
              <div className="h-5 bg-gray-300 rounded-md w-6/6 mb-0"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonBlogDetailSidebar;
