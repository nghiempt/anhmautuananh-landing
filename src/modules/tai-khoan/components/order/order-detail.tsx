import React, { useEffect, useState } from "react";
import { HELPER } from "@/utils/helper";
import Image from "next/image";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ProductService } from "@/services/product";
import { IMAGES } from "@/utils/image";
import {
  CircleCheckBig,
  CircleDollarSign,
  ClipboardX,
  Clock8,
  HandCoins,
  Package2,
  Truck,
} from "lucide-react";

interface Product {
  _id: string;
  product_id: string;
  account_id: string;
  image: string;
  size: string;
  districtName: string;
  provinceName: string;
  wardName: string;
  address: string;
  payment_method: string;
  discount_code: string;
  discount_price: string;
  total: number;
  status: string;
  date_completed: string;
  product_name: string;
  product_price: string;
  order_type: string;
  name: string;
  description: string;
  introduction: string;
  price: string;
  thumbnail: string;
  category: string;
  sold: number;
  color: Array<string>;
  images: Array<string>;
  created_at: Date;
}

const OrderDetailModal = ({ order, customerAccount }: any) => {
  const [productPrice, setProductPrice] = useState<Number | 0>(0);
  const shippingFee = 30000;
  const totalFrame = Number(productPrice) + shippingFee;
  const [product, setProduct] = useState<Product | null>(null);
  const discountPrice = Number(
    (Number(productPrice) + shippingFee) * (order?.discount_price / 100)
  );

  const init = async () => {
    const fetchProduct = async () => {
      try {
        const data = await ProductService.getProductById(order?.product_id);
        setProduct(data.data);

        const matchedOption = data.data.product_option.find(
          (option: { size: string; price: string }) =>
            option.size === order?.size
        );
        const price = matchedOption ? parseInt(matchedOption.price) : 0;
        setProductPrice(price);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-[rgb(var(--fifteenth-rgb))] text-white text-base font-medium px-3 py-2 border border-[rgb(var(--fifteenth-rgb))] hover:opacity-80 hover:border-[rgb(var(--fifteenth-rgb))] rounded transition-colors">
          Xem chi tiết
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] z-[70]">
        <DialogHeader>
          <DialogTitle className="!text-[20px]">
            Chi tiết đơn hàng #
            <span className="uppercase">{order?._id.slice(-5)}</span>
          </DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-center">
          <div className="bg-white rounded-lg w-full max-h-[70vh] overflow-y-auto scroll-bar-style">
            <div className="border-b border-gray-200 flex flex-col lg:flex-row justify-between py-2">
              <div className="flex flex-col justify-between items-start">
                <div className="text-black mb-2">
                  Ngày đặt đơn:{" "}
                  <strong className="font-semibold">
                    {HELPER.formatDateTime(order?.created_at)}
                  </strong>
                </div>
                <div className="text-black mb-2">
                  Ngày hoàn thành:{" "}
                  {order?.date_completed ? (
                    <strong className="font-semibold">
                      {HELPER.formatDateTime(order?.date_completed)}
                    </strong>
                  ) : (
                    <strong className="font-semibold">
                      Đơn hàng đang xử lí
                    </strong>
                  )}
                </div>
              </div>
              <div className="flex justify-center">
                <div
                  className={`${
                    order?.status === "completed"
                      ? "text-green-600 font-medium text-[16px] lg:text-[16px] px-2"
                      : ""
                  }
                      ${
                        order?.status === "delivering"
                          ? "text-blue-600 font-medium text-[16px] lg:text-[16px] px-2"
                          : ""
                      }
                      ${
                        order?.status === "waiting"
                          ? "text-[rgb(var(--fifteenth-rgb))] font-medium text-[16px] lg:text-[16px] px-2"
                          : ""
                      }
                      ${
                        order?.status === "pending"
                          ? "text-[rgb(var(--fifteenth-rgb))] font-medium text-[16px] lg:text-[16px] px-2"
                          : ""
                      }
                      ${
                        order?.status === "paid pending"
                          ? "text-gray-600 font-medium text-[16px] lg:text-[16px] px-2"
                          : ""
                      }
                      ${
                        order?.status === "cancelled"
                          ? "text-red-600 font-medium text-sm lg:text-base px-2"
                          : ""
                      }
                      ${
                        order?.status === "paid"
                          ? "text-purple-600 font-medium"
                          : ""
                      } rounded-sm flex items-center justify-center text-center py-2 px-0 lg:px-4 w-full lg:w-full`}
                >
                  {order?.status === "completed" && (
                    <div className="flex flex-row items-center gap-1">
                      <CircleCheckBig size={18} /> Hoàn thành
                    </div>
                  )}
                  {order?.status === "paid pending" && (
                    <div className="flex flex-row items-center gap-1">
                      <HandCoins size={18} /> Chờ thanh toán
                    </div>
                  )}
                  {order?.status === "paid" && (
                    <div className="flex flex-row items-center gap-1">
                      <CircleDollarSign size={18} /> Đã thanh toán
                    </div>
                  )}
                  {order?.status === "delivering" && (
                    <div className="flex flex-row items-center gap-1">
                      <Truck size={18} /> Vận chuyển
                    </div>
                  )}
                  {order?.status === "pending" && (
                    <div className="flex flex-row items-center gap-1">
                      <Package2 size={18} /> Chuẩn bị đơn
                    </div>
                  )}
                  {order?.status === "waiting" && (
                    <div className="flex flex-row items-center gap-1">
                      <Clock8 size={18} /> Đợi phản hồi
                    </div>
                  )}
                  {order?.status === "cancelled" && (
                    <div className="flex flex-row items-center gap-1">
                      <ClipboardX size={18} /> Đã hủy đơn
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="px-0 py-4 border-b border-gray-200">
              <div className="flex flex-col lg:flex-row justify-start items-start gap-4">
                <div className="w-full lg:w-60 h-60 lg:h-32 border border-gray-200">
                  <Image
                    src={
                      order?.order_type === "album"
                        ? order?.album_data[0]
                        : order?.image
                    }
                    alt="detail product"
                    width={1000}
                    height={1000}
                    className={`${
                      order?.order_type === "album"
                        ? "object-cover"
                        : "object-contain"
                    } w-full h-full object-contain`}
                  />
                </div>
                <div className="flex flex-col justify-start items-start">
                  {order?.order_type === "frame" && (
                    <>
                      <div className="text-sm text-gray-500">
                        {order?.product_category}
                      </div>
                      <div className="text-xl font-medium mb-2">
                        {order?.product_name}
                      </div>
                    </>
                  )}
                  <div className="font-base">
                    Phân loại:{" "}
                    <span className="font-semibold">
                      {order?.order_type === "album" ? "Album" : "Khung ảnh"}
                    </span>
                  </div>
                  <div className="text-black">
                    Kích thước:{" "}
                    <span className="font-semibold">{order?.size}</span>
                  </div>
                  {order?.order_type === "frame" && (
                    <>
                      <div className="font-base flex flex-row items-center gap-2">
                        Màu:{" "}
                        <div
                          className={`font-semibold h-5 w-5 border border-gray-200 rounded-full ${HELPER.renderColor(
                            order?.color
                          )}`}
                        >
                          {}
                        </div>
                      </div>
                      <div className="font-base ">
                        Loại khung:{" "}
                        <span className="font-semibold">
                          {HELPER.renderCategory2(order?.product_price)}
                        </span>
                      </div>
                    </>
                  )}
                  {order?.order_type === "album" && (
                    <>
                      <div className="font-base ">
                        Số trang:{" "}
                        <span className="font-semibold">{order?.pages}</span>
                      </div>
                      <div className="font-base ">
                        Bìa Album:{" "}
                        <span className="font-semibold">
                          {HELPER.renderAlbumCover(order?.album_cover)}
                        </span>
                      </div>
                      {/* <div className="font-base ">
                        Ruột Album:{" "}
                        <span className="font-semibold">
                          {HELPER.renderAlbumCore(order?.album_core)}
                        </span>
                      </div> */}
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="px-0 py-4 border-b border-gray-200">
              <div className="mb-2 text-lg font-medium text-black">
                Thông tin người nhận
              </div>
              <div className="text-black mb-1">
                Tên:{" "}
                <span className="font-semibold">{customerAccount?.name}</span>
              </div>
              <div className="text-black mb-1">
                Số điện thoại:{" "}
                <span className="font-semibold">{customerAccount?.phone}</span>
              </div>
              <div className="text-black">
                {" "}
                Địa chỉ:{" "}
                <span className="font-semibold">
                  {order?.address}, {order?.wardName}, {order?.districtName},{" "}
                  {order?.provinceName}
                </span>
              </div>
            </div>
            <div className="border-b border-gray-200">
              <div className="flex justify-between py-2 border-b border-gray-200">
                <div className="text-black px-0">Giá sản phẩm</div>
                <div className="text-black">
                  {HELPER.formatVND(
                    String(
                      order?.order_type === "frame"
                        ? productPrice
                        : order?.album_price
                    )
                  )}
                </div>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <div className="text-black px-0">Phí vận chuyển</div>
                <div className="text-green-500"> + {HELPER.formatVND("0")}</div>
              </div>
              {/* <div className="flex justify-between py-2 border-b border-gray-200">
                <div className="text-black px-0">Tạm tính</div>
                <div className="text-black">
                  {HELPER.formatVND(
                    String(
                      order?.order_type === "frame"
                        ? totalFrame
                        : Number(order?.album_price) + shippingFee
                    )
                  )}
                </div>
              </div> */}
              <div className="flex justify-between py-2">
                <div className="text-black px-0">Khuyến mãi</div>
                <div className="text-red-500">
                  -{" "}
                  {HELPER.formatVND(
                    String(
                      order?.order_type === "frame"
                        ? discountPrice
                        : order?.discount_price
                    )
                  )}
                </div>
              </div>
            </div>
            <div className="py-0 flex flex-row justify-between items-center text-black">
              <div>Thanh toán: </div>
              <div
                className={`
                      ${
                        order?.payment_method === "cash"
                          ? "text-black text-sm lg:text-base"
                          : ""
                      }
                      ${
                        order?.payment_method === "bank"
                          ? "text-black text-sm lg:text-base"
                          : ""
                      }
                      ${
                        order?.payment_method === "momo"
                          ? "text-pink-500 text-sm lg:text-base"
                          : ""
                      }
                      ${
                        order?.payment_method === "vnpay"
                          ? "text-blue-600 text-sm lg:text-base"
                          : ""
                      }
                      lg:py-2 rounded-md py-2 text-center w-1/2 lg:w-[34.5%]`}
              >
                {order?.payment_method === "cash" && (
                  <div className="flex flex-row items-center justify-end gap-3">
                    <Image
                      src={IMAGES.COD}
                      alt="momo"
                      width={1000}
                      height={1000}
                      className="w-6 h-6 object-cover rounded-lg"
                    />
                    <div className="text-[16px]">Tiền mặt</div>
                  </div>
                )}
                {order?.payment_method === "bank" && (
                  <div className="flex flex-row items-center justify-end gap-3">
                    <Image
                      src="https://cdn-icons-png.flaticon.com/128/15953/15953021.png"
                      alt="momo"
                      width={1000}
                      height={1000}
                      className="w-6 h-6 object-cover rounded-lg"
                    />
                    <div className="text-[16px]">Chuyển khoản</div>
                  </div>
                )}
                {/*  {order?.payment_method === "momo" && (
                  <div className="flex flex-row items-center justify-center gap-3">
                    <Image
                      src={IMAGES.MOMO}
                      alt="momo"
                      width={1000}
                      height={1000}
                      className="w-6 h-6 object-cover rounded-lg"
                    />
                    <div>MOMO</div>
                  </div>
                )}
                {order?.payment_method === "vnpay" && (
                  <div className="flex flex-row items-center justify-center gap-3">
                    <Image
                      src={IMAGES.VNPAY}
                      alt="momo"
                      width={1000}
                      height={1000}
                      className="w-6 h-6 object-cover rounded-lg"
                    />
                    <div>VNPay</div>
                  </div>
                )} */}
              </div>
            </div>
            <div className="px-0 py-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <div className="text-lg font-semibold">Tổng tiền:</div>
                <div className="text-xl font-semibold">
                  {HELPER.formatVND(
                    String(
                      order?.order_type === "frame"
                        ? order?.total
                        : order?.total - order?.discount_price
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailModal;
