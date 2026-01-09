import React from "react";

const SkeletonOrder = () => {
  return (
    <div className="bg-white">
      <h2 className="text-xl font-semibold text-gray-900 mb-3.5">
        Lịch sử mua hàng
      </h2>
      <div className="relative">
        <div className="relative space-y-2 h-full">
          {/* Render 3 skeleton order items */}
          {[1, 2].map((index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 items-center">
                {/* <div>
                  <p className="text-gray-500 mb-1">ID Đơn hàng:</p>
                  <div className="h-6 bg-gray-300 rounded-md w-24 animate-pulse"></div>
                </div> */}

                <div>
                  <p className="text-gray-500 mb-1">Ngày đặt:</p>
                  <div className="h-6 bg-gray-300 rounded-md w-36 animate-pulse"></div>
                </div>

                <div>
                  <p className="text-gray-500 mb-1">Giá:</p>
                  <div className="h-6 bg-gray-300 rounded-md w-20 animate-pulse"></div>
                </div>

                <div>
                  <p className="text-gray-500 mb-1">Trạng thái:</p>
                  <div className="h-6 bg-gray-300 rounded-md w-36 animate-pulse"></div>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mt-4 pt-4 border-t border-gray-100">
                <div className="lg:hidden flex text-base mb-3">
                  <span className="text-gray-500">Loại đơn hàng:</span>
                  <div className="h-6 bg-gray-300 rounded-md w-16 ml-2 animate-pulse"></div>
                </div>
                <div className="flex gap-2">
                  <div className="h-[41px] bg-gray-300 rounded-md w-36 animate-pulse"></div>
                  <div className="h-[41px] bg-gray-300 rounded-md w-32 animate-pulse"></div>
                </div>
                <div className="hidden lg:flex text-base">
                  <span className="text-gray-500">Loại đơn hàng:</span>
                  <div className="h-6 bg-gray-300 rounded-md w-20 ml-2 animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkeletonOrder;
