"use client";

import React, { use, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { IMAGES } from "@/utils/image";
import Link from "next/link";
import { ROUTES } from "@/utils/route";
import "@/styles/hide-scroll.css";
import ChangePasswordForm from "./account/change-password";
import ProfileModal from "./account/account-management";
import CancelOrderModal from "./order/cancel-order";
import OrderDetailModal from "./order/order-detail";
import {
  CircleCheckBig,
  CircleDollarSign,
  ClipboardX,
  Clock8,
  Copy,
  HandCoins,
  Package2,
  Truck,
} from "lucide-react";
import { AccountService } from "@/services/account";
import Cookies from "js-cookie";
import { toast } from "@/hooks/use-toast";
import { useCopyToClipboard } from "usehooks-ts";
import { OrderService } from "@/services/order";
import { HELPER } from "@/utils/helper";
import { useRouter, useSearchParams } from "next/navigation";
import SkeletonAccountInfo from "@/components/ui/skeleton/account/account-info";

export type OrderStatus =
  | "pending"
  | "cancelled"
  | "waiting"
  | "delivering"
  | "completed"
  | "paid"
  | "paid pending";

interface Address {
  type: string;
  address: string;
  isDefault?: boolean;
}

interface CustomerAccount {
  _id: string;
  email: string;
  password: string;
  name: string;
  phone: string;
  avatar: string;
  address: string;
  ward: string;
  district: string;
  province: string;
  role: string;
  status: boolean;
  created_at: string;
  districtName: string;
  provinceName: string;
  wardName: string;
}

interface UserData {
  name?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  address?: string;
  ward?: string | number;
  district?: string | number;
  province?: string | number;
  provinceName?: string;
  districtName?: string;
  wardName?: string;
}

export interface OrderItem {
  id: string;
  date: string;
  image: string;
  title: string;
  category: string;
  specs: string;
  total: number;
  status: OrderStatus;
}

export interface Order {
  _id: string;
  created_at: string;
  total: string;
  status: string;
  order_type: string;
  cover_image: string;
  pages: number;
  album_data: string[];
  album_cover: string;
  album_core: string;
  payment_method: string;
  discount_code: string;
  discount_price: number;
  product_id: string;
  product_price: string;
  image: string;
  size: string;
  color: string;
  product_name: string;
  product_category: string;
}

interface Product {
  _id: string;
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

const Section01 = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-[rgb(var(--fifteenth-rgb))]";
      case "waiting":
        return "text-[rgb(var(--fifteenth-rgb))]";
      case "delivering":
        return "text-blue-600";
      case "completed":
        return "text-green-600";
      case "paid":
        return "text-purple-600";
      case "paid pending":
        return "text-gray-600";
      case "cancelled":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showTopGradient, setShowTopGradient] = useState(false);
  const [showBottomGradient, setShowBottomGradient] = useState(true);
  const [loading, setLoading] = useState(false);
  const [customerAccount, setCustomerAccount] =
    useState<CustomerAccount | null>(null);

  const [orders, setOrders] = useState<Order[]>([]);

  const [, copy] = useCopyToClipboard();
  const pathParams = useSearchParams();
  const tab = pathParams.get("orderNoLogin");
  const [openDialog, setOpenDialog] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);

  const orderIDBank = pathParams.get("orderID");
  const statusBank = pathParams.get("status");

  const [isLoading, setIsLoading] = useState(true);

  const updateOrderStatus = async () => {
    if (orderIDBank && statusBank) {
      const body = {
        status:
          statusBank === "PAID"
            ? "paid"
            : statusBank === "CANCELLED"
            ? "waiting"
            : "waiting",
        isPayed: statusBank === "PAID" ? true : false,
      };
      const order = await OrderService.updateOrder(orderIDBank, body);

      if (order) {
        // order.status = statusBank;
        // setOrders((prevOrders) =>
        //   prevOrders.map((o) =>
        //     o._id === orderIDBank ? { ...o, status: statusBank } : o
        //   )
        // );
        // toast({
        //   title: "Cập nhật trạng thái đơn hàng",
        //   description: `Trạng thái đơn hàng ${orderIDBank} đã được cập nhật thành ${statusBank}.`,
        //   className: "bg-green-500 text-white border-green-600",
        // });
      } else {
        console.error("Order not found:", orderIDBank);
      }
    }
  };

  useEffect(() => {
    if (orderIDBank || statusBank) {
      updateOrderStatus();
      init();
      if (statusBank === "PAID") {
        toast({
          title: "Thanh toán thành công",
          description: `Đơn hàng #${orderIDBank?.slice(
            0,
            6
          )} đã được thanh toán thành công.`,
          className: "bg-green-500 text-white border-green-600",
        });
      } else if (statusBank === "CANCELLED") {
        toast({
          title: "Thanh toán bị hủy",
          description: `Đơn hàng #${orderIDBank?.slice(
            0,
            6
          )} đã bị hủy thanh toán.`,
          className: "bg-red-500 text-white border-red-600",
        });
      } else {
        toast({
          title: "Thanh toán thất bại",
          description: `Đơn hàng #${orderIDBank?.slice(
            0,
            6
          )} thanh toán thất bại.`,
          className: "bg-yellow-500 text-white border-yellow-600",
        });
      }
    }
  }, [orderIDBank, statusBank]);

  useEffect(() => {
    if (tab === "true") {
      setOpenDialog(true);
    }
  }, [tab]);

  const init = async () => {
    try {
      setIsLoading(true);
      const res = await OrderService.getAllOrderById(
        Cookies.get("userLogin") || ""
      );
      if (res && res.length > 0) {
        setOrders(res);
        setIsLoading(false);
      } else {
        console.log("No products found in response");
        setOrders([]);
      }
    } catch (error) {
      console.error("Error initializing products:", error);
      setOrders([]);
    }
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } =
          scrollContainerRef.current;
        setShowTopGradient(scrollTop > 0);
        setShowBottomGradient(scrollTop + clientHeight < scrollHeight);
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      handleScroll();
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    const fetchAccount = async () => {
      const userId = Cookies.get("isLogin");
      if (userId) {
        try {
          setIsLoading(true);
          setLoading(true);
          const data = await AccountService.getAccountById(userId);
          setCustomerAccount(data);
        } catch (error) {
          console.error("Error fetching account:", error);
          toast({
            title: "Lỗi",
            description: "Không thể tải thông tin tài khoản",
            variant: "destructive",
          });
        } finally {
          setLoading(false);
          setIsLoading(false);
        }
      }
    };

    fetchAccount();
  }, [toast]);

  const handleProfileUpdate = (updatedData: UserData) => {
    setCustomerAccount((prev) =>
      prev
        ? {
            ...prev,
            ...updatedData,
            ward:
              updatedData.ward !== undefined
                ? String(updatedData.ward)
                : prev.ward,
            district:
              updatedData.district !== undefined
                ? String(updatedData.district)
                : prev.district,
            province:
              updatedData.province !== undefined
                ? String(updatedData.province)
                : prev.province,
            provinceName: updatedData.provinceName || prev.provinceName || "",
            districtName: updatedData.districtName || prev.districtName || "",
            wardName: updatedData.wardName || prev.wardName || "",
          }
        : null
    );
  };

  const handleCancelOrder = async () => {
    try {
      setLoading(true);
      await init();
      toast({
        title: "Hủy đơn thành công",
        description: "Đơn hàng đã được hủy.",
        className: "bg-green-500 text-white border-green-600",
      });
    } catch (error) {
      console.error("Error refreshing orders:", error);
      toast({
        title: "Lỗi",
        description: "Không thể làm mới danh sách đơn hàng.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-[100%] h-full mx-auto py-5 lg:py-7 relative">
      <div className="max-w-7xl h-full mx-auto px-5 lg:px-0">
        {openDialog && (
          <div
            id="alert-additional-content-4"
            className="p-4 mb-4 text-yellow-800 border border-[#A98F57] rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 dark:border-yellow-800"
            role="alert"
          >
            <div className="flex items-center">
              <svg
                className="shrink-0 w-5 h-5 me-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="sr-only">Info</span>
              <h3 className="text-lg font-medium">Thông báo tài khoản mới</h3>
            </div>
            <div className="mt-2 mb-3 text-[16px] text-justify">
              Đây là tài khoản mới được tạo để quản lí đơn hàng của bạn. Vui
              lòng cập nhật mật khẩu mới để tiếp tục sử dụng tài khoản.
            </div>
            <div className="mt-2 mb-3 text-[16px]">
              Hãy sử dụng mật khẩu dưới đây để cập nhật mật khẩu mới.
            </div>
            <div className="mt-2 mb-4 text-[16px] flex flex-row justify-start items-center gap-2">
              <div className="flex justify-center items-center gap-2">
                <div className="text-[16px]">{customerAccount?.password}</div>

                <div
                  onClick={() => {
                    if (customerAccount?.password) {
                      copy(customerAccount.password);
                      toast({
                        title: "Thành công",
                        description: "Đã sao chép mật khẩu!",
                        className: "bg-green-500 text-white border-green-600",
                      });
                    } else {
                      toast({
                        title: "Lỗi",
                        description: "Không có mật khẩu để sao chép!",
                        variant: "destructive",
                      });
                    }
                  }}
                  className="cursor-pointer "
                >
                  <Copy size={22} />
                </div>
              </div>
            </div>
            <div className="flex w-full justify-end gap-2">
              <button
                type="button"
                className="text-yellow-800 bg-transparent border border-yellow-800 hover:bg-yellow-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-yellow-300 font-base rounded text-[16px] px-3 h-8 text-center dark:hover:bg-yellow-300 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-gray-800 dark:focus:ring-yellow-800"
                data-dismiss-target="#alert-additional-content-4"
                aria-label="Close"
                onClick={() => setOpenDialog(false)}
              >
                Bỏ qua
              </button>
              <button
                onClick={() => setOpenChangePassword(true)}
                type="button"
                className="text-white bg-yellow-800 hover:bg-yellow-900 font-base rounded text-[16px] px-3 h-8 text-center inline-flex items-center"
              >
                Cập nhật mật khẩu
              </button>
            </div>
          </div>
        )}
        <div className="grid lg:grid-cols-2 gap-6">
          {isLoading ? (
            <div>
              <SkeletonAccountInfo />
            </div>
          ) : (
            <div className="bg-white">
              <h2 className="text-xl font-semibold text-gray-900 mb-3.5">
                Thông tin tài khoản
              </h2>
              <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                <div className="flex flex-col lg:flex-row items-start gap-6">
                  <div className="w-full lg:w-1/6 flex justify-center">
                    <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                      <Image
                        src={customerAccount?.avatar || IMAGES.LOGO}
                        alt="Avatar"
                        className="w-full h-full rounded-full"
                        width={1000}
                        height={1000}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 w-full">
                    <div className="space-y-2 mb-2.5">
                      <p className="text-gray-900">
                        <span className="font-medium">Họ và tên:</span>{" "}
                        {customerAccount?.name || ""}
                      </p>
                      <p className="text-gray-900">
                        <span className="font-medium">Email:</span>{" "}
                        {customerAccount?.email || "Không có email"}
                      </p>
                      <p className="text-gray-900">
                        <span className="font-medium">Số điện thoại:</span>{" "}
                        {customerAccount?.phone === ""
                          ? "Chưa cập nhật số điện thoại"
                          : customerAccount?.phone}
                      </p>
                    </div>
                    <div className="w-full flex flex-col lg:flex-row gap-3">
                      <ProfileModal
                        customerAccount={customerAccount}
                        onUpdate={handleProfileUpdate}
                      />
                      <ChangePasswordForm
                        open={openChangePassword}
                        setOpen={setOpenChangePassword}
                      />
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
                      {customerAccount?.address === "" ? (
                        <p className="text-gray-600 text-base">
                          Khách hàng chưa cập nhật địa chỉ giao hàng
                        </p>
                      ) : (
                        <p className="text-gray-600 text-base">
                          {customerAccount?.address || ""},{" "}
                          {customerAccount?.wardName || ""},{" "}
                          {customerAccount?.districtName || ""},{" "}
                          {customerAccount?.provinceName || ""}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Order History Section */}
          <div className="bg-white">
            <h2 className="text-xl font-semibold text-gray-900 mb-3.5">
              Lịch sử mua hàng
            </h2>
            {orders.length === 0 ? (
              <div className="flex flex-col items-center justify-start h-full p-6">
                <p className="text-gray-500 text-lg mt-4">
                  Bạn chưa có đơn hàng nào.
                </p>
              </div>
            ) : (
              <div className="relative">
                {/* <div
                  className={`absolute top-0 inset-x-0 bg-gradient-to-b from-white z-20 to-transparent pointer-events-none transition-opacity duration-300 ${
                    showTopGradient ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ height: "40px" }}
                /> */}
                <div
                  className="relative space-y-2 h-full scroll-bar-style"
                  ref={scrollContainerRef}
                >
                  {[...orders]
                    .sort(
                      (a, b) =>
                        new Date(b.created_at).getTime() -
                        new Date(a.created_at).getTime()
                    )
                    .map((order, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 items-center">
                          <div>
                            <p className="text-gray-500 mb-1">ID Đơn hàng:</p>
                            <p className="font-medium text-gray-900">
                              {order._id.slice(0, 10)}...
                            </p>
                          </div>

                          <div>
                            <p className="text-gray-500 mb-1">Ngày đặt:</p>
                            <p className="text-gray-900 font-medium">
                              {HELPER.formatDate(order.created_at)}
                            </p>
                          </div>

                          <div>
                            <p className="text-gray-500 mb-1">Giá:</p>
                            <p className="font-medium text-gray-900">
                              {HELPER.formatVND(order.total)}
                            </p>
                          </div>

                          <div>
                            <p className="text-gray-500 mb-1">Trạng thái:</p>
                            <div
                              className={`font-medium ${getStatusColor(
                                order.status
                              )}`}
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

                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mt-4 pt-4 border-t border-gray-100">
                          <div className="lg:hidden flex text-base mb-3">
                            <span className="text-gray-500">
                              Loại đơn hàng:
                            </span>{" "}
                            <span className="font-medium text-gray-900">
                              &nbsp;
                              {order?.order_type === "album"
                                ? "Album"
                                : order?.order_type === "frame"
                                ? "Khung Ảnh"
                                : ""}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            {order?.status === "waiting" && (
                              <CancelOrderModal
                                order={order}
                                onCancelled={handleCancelOrder}
                              />
                            )}
                            <OrderDetailModal
                              order={order}
                              customerAccount={customerAccount}
                            />
                          </div>
                          <div className="hidden lg:flex text-base">
                            <span className="text-gray-500">
                              Loại đơn hàng:
                            </span>{" "}
                            <span className="font-medium text-gray-900">
                              &nbsp;
                              {order?.order_type === "album"
                                ? "Album"
                                : order?.order_type === "frame"
                                ? "Khung Ảnh"
                                : ""}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                {/* <div
                  className={`absolute bottom-0 inset-x-0 bg-gradient-to-t from-white to-transparent pointer-events-none transition-opacity duration-300 ${
                    showBottomGradient ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ height: "40px" }}
                /> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section01;
