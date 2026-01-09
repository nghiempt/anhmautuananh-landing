"use client";

import React, { useEffect, useState } from "react";
import Header from "@/layout/header";
import Footer from "@/layout/footer";
import Link from "next/link";
import {
  ChevronRight,
  CreditCard,
  Frame,
  Loader,
  MapPin,
  StickyNote,
  UserRound,
} from "lucide-react";
import { ROUTES } from "@/utils/route";
import Image from "next/image";
import Cookies from "js-cookie";
import ImageUploadAlbum from "./image-upload-album";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { UploadService } from "@/services/upload";
import { OrderService } from "@/services/order";
import { AccountService } from "@/services/account";
import { useSearchParams } from "next/navigation";
import { HELPER } from "@/utils/helper";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export interface Province {
  code: number;
  codename: string;
  districts: District[];
  division_type: string;
  name: string;
  phone_code: number;
}

export interface District {
  code: number;
  codename: string;
  division_type: string;
  name: string;
  short_codename: string;
  wards: Ward[];
}

export interface Ward {
  code: number;
  codename: string;
  division_type: string;
  name: string;
  short_codename: string;
}
export interface UserData {
  name: string;
  avatar: string;
  email: string;
  phone: string;
  address: string;
}

export interface FormData extends UserData {
  ward: number;
  district: number;
  province: number;
}

export interface CustomerAccount {
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

export interface FormDataOrder {
  pages: string;
  size: string;
  album_data: any[];
}

const Section01 = () => {
  const [openProvinces, setOpenProvinces] = useState(false);
  const [openDistrict, setOpenDistrict] = useState(false);
  const [openWard, setOpenWard] = useState(false);
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [provinces, setProvinces] = React.useState<Province[]>([]);
  const [districts, setDistricts] = React.useState<District[]>([]);
  const [wards, setWards] = React.useState<Ward[]>([]);
  const [isTermsAccepted, setIsTermsAccepted] = useState(true);

  const pages = [
    {
      id: 1,
      name: "can-mang",
      price: 200000,
    },
    {
      id: 2,
      name: "khong-can-mang",
      price: 100000,
    },
    {
      id: 3,
      name: "trang-guong",
      price: 250000,
    },
  ];

  const covers = [
    {
      id: 1,
      name: "bia-goi",
      price: 100000,
    },
    {
      id: 2,
      name: "bia-da",
      price: 150000,
    },
    // {
    //   id: 3,
    //   name: "bia-cung",
    //   price: 120000,
    // },
  ];

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [uploadedFile, setUploadedFile] = React.useState<File | null>(null);
  const [isLogin, setIsLogin] = useState(Cookies.get("isLogin"));
  const [customerAccount, setCustomerAccount] =
    useState<CustomerAccount | null>(null);
  const [selectedPayment, setSelectedPayment] = React.useState<string>("cash");
  const [promoCode, setPromoCode] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  // const [selectedCore, setSelectedCore] = React.useState<any>("chon-loai-ruot");
  const [selectedCover, setSelectedCover] =
    React.useState<any>("chon-loai-bia");
  const [selectedCoreId, setSelectedCoreId] =
    React.useState<any>("chon-loai-ruot");
  const [selectedCoverId, setSelectedCoverId] =
    React.useState<any>("chon-loai-bia");
  const [formData, setFormData] = React.useState<FormData>({
    name: "",
    email: "",
    avatar: "",
    phone: "",
    address: "",
    ward: 0,
    district: 0,
    province: 0,
  });

  const [formDataOrder, setFormDataOrder] = React.useState<FormDataOrder>({
    pages: "",
    size: "",
    album_data: [],
  });
  const param = useSearchParams();
  const orderID = param.get("orderAlbumID");
  const [albumPriceCover, setAlbumPriceCover] = React.useState(0);
  const [albumPriceCore, setAlbumPriceCore] = React.useState(0);
  const [totalPrice, setTotalPrice] = React.useState(0);

  // const handleCoreChange = (coreId: string) => {
  //   const selectedCoreItem = pages.find((item) => String(item.id) === coreId);
  //   setSelectedCoreId(coreId);
  //   setSelectedCore(selectedCoreItem ? selectedCoreItem.name : "");

  //   const corePrice = selectedCoreItem ? selectedCoreItem.price : 0;
  //   setAlbumPriceCore(corePrice);
  // };

  const handleCoverChange = (coverId: string) => {
    const selectedCoverItem = covers.find(
      (item) => String(item.id) === coverId
    );
    setSelectedCoverId(coverId);
    setSelectedCover(selectedCoverItem ? selectedCoverItem.name : "");

    const coverPrice = selectedCoverItem ? selectedCoverItem.price : 0;
    setAlbumPriceCover(coverPrice);
  };

  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [discountPercent, setDiscountPercent] = useState(0);
  const discountPrice =
    (Number(HELPER.calculateTotalNumber(String(totalPrice), "0", 0)) *
      discountPercent) /
    100;

  const handleCheckDiscount = async () => {
    if (promoCode === "") {
      toast({
        title: "",
        description: "Vui lòng nhập mã giảm giá!",
        variant: "destructive",
      });
      setIsValid(false);
      setDiscountPercent(0);
      return false;
    }

    try {
      setIsChecking(true);
      const valid = await OrderService.checkDiscount(promoCode);

      if (valid?.data === "Discount code not found") {
        setIsChecking(false);
        setIsValid(false);
        setDiscountPercent(0);
        toast({
          title: "",
          description: "Mã giảm giá không tồn tại!",
          variant: "destructive",
        });
        return false;
      } else {
        setIsValid(true);
        setIsChecking(false);
        setDiscountPercent(valid?.data?.percent);
        toast({
          title: "",
          description: "Sử dụng mã giảm giá thành công!",
          style: {
            backgroundColor: "#22c55e",
            color: "white",
          },
        });
        return false;
      }
    } catch (error) {
      console.error("Error checking discount:", error);
    }
  };

  useEffect(() => {
    const shippingFee = 0;
    setTotalPrice(albumPriceCover + albumPriceCore + shippingFee);
  }, [albumPriceCover, albumPriceCore, promoCode]);

  const validateForm = () => {
    if (!uploadedFile && selectedCoverId === "2") {
      toast({
        title: "",
        description: "Vui lòng tải lên một hình ảnh!",
        variant: "destructive",
      });
      return false;
    }
    if (!formData?.address) {
      toast({
        title: "",
        description: "Vui lòng nhập địa chỉ giao hàng!",
        variant: "destructive",
      });
      return false;
    }
    if (!formData?.ward || ward === "Vui lòng chọn phường/xã") {
      toast({
        title: "",
        description:
          "Vui lòng chọn đầy đủ Tỉnh/Thành phố, Quận/Huyện, Phường/Xã.",
        variant: "destructive",
      });
      return false;
    }
    if (!formData?.phone) {
      toast({
        title: "",
        description: "Vui lòng nhập số điện thoại!",
        variant: "destructive",
      });
      return false;
    }
    const phoneRegex = /^\d{10,11}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast({
        title: "",
        description:
          "Số điện thoại phải là một dãy số hợp lệ (10 đến 11 chữ số)! ",
        variant: "destructive",
      });
      return false;
    }
    if (!selectedPayment) {
      toast({
        title: "",
        description: "Vui lòng chọn phương thức thanh toán!",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setLoading(true);
    let accountOrderLogin = false;
    try {
      setIsLoading(true);
      const upload: any = await UploadService.uploadToCloudinary([
        uploadedFile,
      ]);

      const selectedProvince = provinces.find(
        (p) => p.code === formData.province
      );
      const selectedDistrict = districts.find(
        (d) => d.code === formData.district
      );
      const selectedWard = wards.find((w) => w.code === formData.ward);

      const commonAccountData = {
        name: formData?.name || "",
        phone: formData?.phone || "",
        address: formData?.address || "",
        role: "personal",
        ward: selectedWard?.code,
        district: selectedDistrict?.code,
        province: selectedProvince?.code,
        status: true,
        districtName: selectedDistrict?.name,
        provinceName: selectedProvince?.name,
        wardName: selectedWard?.name,
      };

      const orderData = {
        order_id: orderID,
        order_type: "album",
        cover_image: upload[0]?.secure_url || "",
        album_cover: selectedCover || "",
        album_core: "",
        album_price: albumPriceCore + albumPriceCover,
        address: formData?.address || "",
        payment_method: selectedPayment || "",
        discount_code: promoCode || "",
        discount_price: discountPrice,
        total: totalPrice,
      };

      let response;
      if (!isLogin) {
        response = await OrderService.createOrderAlbum_no_login({
          account: commonAccountData,
          order: orderData,
        });

        accountOrderLogin = false;
        try {
          let data;
          if (/^\d+$/.test(response?.data?.phone)) {
            data = await AccountService.loginAccountPhone(
              response?.data?.phone,
              response?.data?.password
            );
          } else {
            data = await AccountService.loginAccountEmail(
              response?.data?.phone,
              response?.data?.password
            );
          }
          if (data?.message === "SUCCESS") {
            Cookies.set("isLogin", data?.data, { expires: 7 });
            Cookies.set("userLogin", data?.data, { expires: 7 });
            setIsLogin(Cookies.set("isLogin", data?.data, { expires: 7 }));
          } else {
            throw new Error("Email hoặc mật khẩu chưa chính xác");
          }
          if (selectedPayment !== "bank") {
            setIsLoading(false);
          }
        } catch (error) {
          console.error("========= Error Login:", error);
          toast({
            variant: "destructive",
            title: "Email hoặc mật khẩu chưa chính xác",
          });
        } finally {
          if (selectedPayment !== "bank") {
            setIsLoading(false);
          }
        }
      } else {
        response = await OrderService.createOrderAlbum({
          account: { _id: isLogin, ...commonAccountData },
          order: orderData,
        });

        accountOrderLogin = true;
        if (response === false) {
          toast({
            title: "",
            description: "Số điện thoại đã được sử dụng!",
            variant: "destructive",
          });
          if (selectedPayment !== "bank") {
            setIsLoading(false);
          }
          return;
        }
        if (selectedPayment !== "bank") {
          setIsLoading(false);
        }
      }

      if (selectedPayment === "bank" && response?.data) {
        if (!isLogin) {
          const paymentUrl = await OrderService.createPayment({
            amount: totalPrice - discountPrice,
            description: response.data.user_id.slice(-5) || "unknown",
            returnUrl: `${
              response?.data?.isAccountExisted === true
                ? `${ROUTES.FULL_ROUTE_ACCOUNT}?orderID=${orderID}`
                : `${ROUTES.FULL_ROUTE_ACCOUNT}?orderNoLogin=true&orderID=${orderID}`
            }`,
            cancelUrl: `${
              response?.data?.isAccountExisted === true
                ? `${ROUTES.FULL_ROUTE_ACCOUNT}?orderID=${orderID}`
                : `${ROUTES.FULL_ROUTE_ACCOUNT}?orderNoLogin=true&orderID=${orderID}`
            }`,
          });
          // window.open(paymentUrl.data.checkoutUrl, "_blank");
          window.location.href = paymentUrl.data.checkoutUrl;
        } else {
          const paymentUrl = await OrderService.createPayment({
            amount: totalPrice - discountPrice,
            description: isLogin.slice(-5),
            returnUrl: `${ROUTES.FULL_ROUTE_ACCOUNT}?orderID=${orderID}`,
            cancelUrl: `${ROUTES.FULL_ROUTE_ACCOUNT}?orderID=${orderID}`,
          });
          // window.open(paymentUrl.data.checkoutUrl, "_blank");
          window.location.href = paymentUrl.data.checkoutUrl;
        }
        // window.open(response.data, "_blank");
        // window.location.href = accountOrderLogin
        //   ? `${ROUTES.ACCOUNT}?tab=history`
        //   : response?.data?.isAccountExisted === true
        //   ? `${ROUTES.ACCOUNT}?tab=history`
        //   : `${ROUTES.ACCOUNT}?tab=history&orderNoLogin=true`;
      } else {
        window.location.href = accountOrderLogin
          ? `${ROUTES.ACCOUNT}`
          : response?.data?.isAccountExisted === true
          ? `${ROUTES.ACCOUNT}`
          : `${ROUTES.ACCOUNT}?orderNoLogin=true`;
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      toast({
        title: "",
        description: "Đã xảy ra lỗi khi đặt hàng, vui lòng thử lại!",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (formData.province) {
      const selectedProvince = provinces.find(
        (p) => p.code === formData.province
      );

      if (selectedProvince) {
        setDistricts(selectedProvince.districts);
        const selectedDistrict = selectedProvince.districts.find(
          (d) => d.code === formData.district
        );
        setProvince(selectedProvince.name);
        if (selectedDistrict) {
          setDistrict(selectedDistrict.name);
          setWards(selectedDistrict.wards);
          const selectedWard = selectedDistrict.wards.find(
            (w) => w.code === Number(formData.ward)
          );
          if (selectedWard) {
            setWard(selectedWard.name);
          }
        }
      }
    }
  }, [formData.province, formData.district, provinces, formData.ward]);

  React.useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetch(
          "https://provinces.open-api.vn/api/?depth=3"
        );
        const data = await response.json();
        setProvinces(data);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };
    fetchProvinces();
  }, []);

  useEffect(() => {
    const fetchAccount = async () => {
      if (isLogin) {
        try {
          const data = await AccountService.getAccountById(isLogin);
          setCustomerAccount(data);
          setFormData({
            name: data?.name,
            email: data?.email,
            avatar: data?.avatar,
            phone: data?.phone,
            address: data?.address,
            ward: data?.ward,
            district: data?.district,
            province: data?.province,
          });
        } catch (error) {
          console.error("Error fetching account:", error);
        }
      }
    };

    const fetchOrder = async () => {
      if (orderID) {
        try {
          const data = await OrderService.getOrderById(orderID);
          setFormDataOrder({
            pages: data?.pages,
            size: data?.size,
            album_data: data?.album_data,
          });
        } catch (error) {
          console.error("Error fetching order:", error);
        }
      }
    };

    fetchAccount();
    fetchOrder();
  }, []);

  useEffect(() => {
    const fetchAccount = async () => {
      if (isLogin) {
        try {
          const data = await AccountService.getAccountById(isLogin);
          setCustomerAccount(data);

          // Update formData with account data
          setFormData({
            name: data.name,
            email: data.email,
            avatar: data.avatar,
            phone: data.phone,
            address: data.address,
            ward: Number(data.ward),
            district: Number(data.district),
            province: Number(data.province),
          });

          // Find and set province, district, and ward names
          const selectedProvince = provinces.find(
            (p) => p.code === Number(data.province)
          );
          if (selectedProvince) {
            setProvince(selectedProvince.name);
            setDistricts(selectedProvince.districts);

            const selectedDistrict = selectedProvince.districts.find(
              (d) => d.code === Number(data.district)
            );
            if (selectedDistrict) {
              setDistrict(selectedDistrict.name);
              setWards(selectedDistrict.wards);

              const selectedWard = selectedDistrict.wards.find(
                (w) => w.code === Number(data.ward)
              );
              if (selectedWard) {
                setWard(selectedWard.name);
              }
            }
          }
        } catch (error) {
          console.error("Error fetching account:", error);
        }
      }
    };

    if (provinces.length > 0) {
      fetchAccount();
    }
  }, [isLogin, provinces]);

  React.useEffect(() => {
    if (formData.province && provinces.length > 0) {
      const selectedProvince = provinces.find(
        (p) => p.code === formData.province
      );
      if (selectedProvince) {
        setProvince(selectedProvince.name);
        setDistricts(selectedProvince.districts);

        if (formData.district) {
          const selectedDistrict = selectedProvince.districts.find(
            (d) => d.code === formData.district
          );
          if (selectedDistrict) {
            setDistrict(selectedDistrict.name);
            setWards(selectedDistrict.wards);

            if (formData.ward) {
              const selectedWard = selectedDistrict.wards.find(
                (w) => w.code === formData.ward
              );
              if (selectedWard) {
                setWard(selectedWard.name);
              } else {
                setWard("Vui lòng chọn Phường/Xã");
                setFormData((prev) => ({ ...prev, ward: 0 }));
              }
            } else {
              setWard("Vui lòng chọn Phường/Xã");
              setFormData((prev) => ({ ...prev, ward: 0 }));
            }
          } else {
            setDistrict("Vui lòng chọn Quận/Huyện");
            setWards([]);
            setFormData((prev) => ({ ...prev, district: 0, ward: 0 }));
          }
        } else {
          setDistrict("Vui lòng chọn Quận/Huyện");
          setWards([]);
          setFormData((prev) => ({ ...prev, district: 0, ward: 0 }));
        }
      } else {
        setProvince("Vui lòng chọn Tỉnh/Thành phố");
        setDistricts([]);
        setWards([]);
        setFormData((prev) => ({ ...prev, province: 0, district: 0, ward: 0 }));
      }
    }
  }, [formData.province, formData.district, formData.ward, provinces]);

  // React.useEffect(() => {
  //   const fetchProvinces = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://provinces.open-api.vn/api/?depth=3"
  //       );
  //       const data = await response.json();
  //       setProvinces(data);
  //     } catch (error) {
  //       console.error("Error fetching provinces:", error);
  //     }
  //   };
  //   fetchProvinces();
  // }, []);

  // const handleProvinceChange = (provinceCode: string) => {
  //   const selectedProvince = provinces.find(
  //     (p) => p.code === Number(provinceCode)
  //   );
  //   if (selectedProvince) {
  //     setDistricts(selectedProvince.districts);
  //     setWards([]);
  //     setFormData((prev) => ({
  //       ...prev,
  //       province: Number(provinceCode),
  //       district: 0,
  //       ward: 0,
  //     }));
  //     setProvince(selectedProvince.name);
  //     setDistrict("Vui lòng chọn Quận/Huyện");
  //     setWard("Vui lòng chọn Phường/Xã");
  //     setOpenProvinces(false);
  //   } else {
  //     setDistricts([]);
  //     setWards([]);
  //   }
  // };

  const handleProvinceChange = (provinceCode: string) => {
    const selectedProvince = provinces.find(
      (p) => p.code === Number(provinceCode)
    );
    if (selectedProvince) {
      setDistricts(selectedProvince.districts);
      setWards([]);
      setFormData((prev) => ({
        ...prev,
        province: Number(provinceCode),
        district: 0,
        ward: 0,
      }));
      setProvince(selectedProvince.name);
      setDistrict("Vui lòng chọn Quận/Huyện");
      setWard("Vui lòng chọn Phường/Xã");
      setOpenProvinces(false);
    } else {
      setDistricts([]);
      setWards([]);
      setFormData((prev) => ({ ...prev, province: 0, district: 0, ward: 0 }));
      setProvince("Vui lòng chọn Tỉnh/Thành phố");
      setDistrict("Vui lòng chọn Quận/Huyện");
      setWard("Vui lòng chọn Phường/Xã");
    }
  };

  // const handleDistrictChange = (districtCode: string) => {
  //   const selectedDistrict = districts.find(
  //     (d) => d.code === Number(districtCode)
  //   );
  //   if (selectedDistrict) {
  //     setWards(selectedDistrict.wards || []);
  //     setFormData((prev) => ({
  //       ...prev,
  //       district: Number(districtCode),
  //       ward: 0,
  //     }));
  //     setDistrict(selectedDistrict.name);
  //     setWard("Vui lòng chọn Phường/Xã");
  //     setOpenDistrict(false);
  //   } else {
  //     setWards([]);
  //   }
  // };
  const handleDistrictChange = (districtCode: string) => {
    const selectedDistrict = districts.find(
      (d) => d.code === Number(districtCode)
    );
    if (selectedDistrict) {
      setWards(selectedDistrict.wards || []);
      setFormData((prev) => ({
        ...prev,
        district: Number(districtCode),
        ward: 0,
      }));
      setDistrict(selectedDistrict.name);
      setWard("Vui lòng chọn Phường/Xã");
      setOpenDistrict(false);
    } else {
      setWards([]);
      setFormData((prev) => ({ ...prev, district: 0, ward: 0 }));
      setDistrict("Vui lòng chọn Quận/Huyện");
      setWard("Vui lòng chọn Phường/Xã");
    }
  };

  // const handleWardChange = (wardCode: String) => {
  //   const selectedWard = wards.find((w) => w.code === Number(wardCode));

  //   if (selectedWard) {
  //     setFormData((prev) => ({
  //       ...prev,
  //       ward: Number(wardCode),
  //     }));

  //     setWard(selectedWard.name);
  //     setOpenWard(false);
  //   }
  // };
  const handleWardChange = (wardCode: String) => {
    const selectedWard = wards.find((w) => w.code === Number(wardCode));
    if (selectedWard) {
      setFormData((prev) => ({
        ...prev,
        ward: Number(wardCode),
      }));
      setWard(selectedWard.name);
      setOpenWard(false);
    } else {
      setFormData((prev) => ({ ...prev, ward: 0 }));
      setWard("Vui lòng chọn Phường/Xã");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="w-full">
      <div className="max-w-7xl w-full mx-auto py-5 lg:py-10 px-5 lg:px-0">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="hidden lg:grid w-full h-full md:w-1/2">
            <div>
              <div className="flex flex-row items-center gap-2 mb-3.5 relative z-20">
                <UserRound className="w-5 h-5" />
                <h2 className="text-lg lg:text-xl font-medium z-20 relative">
                  Thông tin khách hàng
                </h2>
              </div>
              <div className="mb-4">
                <Label
                  htmlFor="name"
                  className="text-black text-[16px] font-light"
                >
                  Họ và tên:
                </Label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Nhập họ và tên"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="text-[16px] w-full px-3 py-2 pr-16 border placeholder:text-[#81838B] border-gray-200 rounded-md mt-1 focus:border-none focus:!ring-2 focus:!ring-[rgb(var(--fifteenth-rgb))] outline-none"
                />
              </div>
              <div className="mb-6">
                <Label
                  htmlFor="phone"
                  className="text-black text-[16px] font-light"
                >
                  Số điện thoại:
                </Label>
                <Input
                  type="phone"
                  name="phone"
                  placeholder="Nhập số điện thoại"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="text-[16px] w-full px-3 py-2 pr-16 border placeholder:text-[#81838B] border-gray-200 rounded-md mt-1 focus:border-none focus:!ring-2 focus:!ring-[rgb(var(--fifteenth-rgb))] outline-none"
                />
              </div>
            </div>
            <div>
              <div className="flex flex-row items-center gap-2 relative mb-3.5 z-20">
                <MapPin className="w-5 h-5" />
                <h2 className="text-lg lg:text-xl font-medium z-20 relative">
                  Địa chỉ nhận hàng
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <Label
                    htmlFor="province"
                    className="text-black text-[16px] font-light"
                  >
                    Tỉnh/Thành phố:
                  </Label>
                  <Select
                    value={formData.province ? String(formData.province) : ""}
                    onValueChange={handleProvinceChange}
                    disabled={loading}
                  >
                    <SelectTrigger className="text-[16px] mt-2 focus:border-none focus:!ring-2 focus:!ring-[rgb(var(--fifteenth-rgb))] outline-none">
                      <SelectValue placeholder="Chọn Tỉnh/Thành phố" />
                    </SelectTrigger>
                    <SelectContent>
                      {provinces.map((province) => (
                        <SelectItem
                          key={province.code}
                          value={String(province.code)}
                        >
                          {province.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label
                    htmlFor="district"
                    className="text-black text-[16px] font-light"
                  >
                    Quận/Huyện:
                  </Label>
                  <Select
                    value={formData.district ? String(formData.district) : ""}
                    onValueChange={handleDistrictChange}
                    disabled={!formData.province || loading}
                  >
                    <SelectTrigger className="text-[16px] mt-2 focus:border-none focus:!ring-2 focus:!ring-[rgb(var(--fifteenth-rgb))] outline-none">
                      <SelectValue placeholder="Chọn Quận/Huyện" />
                    </SelectTrigger>
                    <SelectContent>
                      {districts.map((district) => (
                        <SelectItem
                          key={district.code}
                          value={String(district.code)}
                        >
                          {district.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="mb-3">
                <Label
                  htmlFor="ward"
                  className="text-black text-[16px] font-light"
                >
                  Phường/Xã:
                </Label>
                <Select
                  value={formData.ward ? String(formData.ward) : ""}
                  onValueChange={handleWardChange}
                  disabled={!formData.district || loading}
                >
                  <SelectTrigger className="text-[16px] mt-2 focus:border-none focus:!ring-2 focus:!ring-[rgb(var(--fifteenth-rgb))] outline-none">
                    <SelectValue placeholder="Chọn Phường/Xã" />
                  </SelectTrigger>
                  <SelectContent>
                    {wards.map((ward) => (
                      <SelectItem key={ward.code} value={String(ward.code)}>
                        {ward.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="mb-6 !pt-1">
                <Label
                  htmlFor="address"
                  className="text-black text-[16px] font-light"
                >
                  Số nhà, tên đường:
                </Label>
                <Input
                  className="text-[16px] mt-2 placeholder:text-[#81838B] focus:border-none focus:!ring-2 focus:!ring-[rgb(var(--fifteenth-rgb))] outline-none"
                  id="address"
                  name="address"
                  placeholder="Ví dụ: 123 Đường ABC"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            {
              // selectedCore !== "chon-loai-ruot" &&
              selectedCover !== "chon-loai-bia" && (
                <>
                  <div>
                    <div className="flex flex-row items-center gap-2 mb-3.5 relative z-20">
                      <CreditCard className="w-5 h-5" />
                      <h2 className="text-lg lg:text-xl font-medium z-20 relative">
                        Tùy chọn thanh toán
                      </h2>
                    </div>
                    <div className="rounded-md">
                      <div
                        onClick={() => setSelectedPayment("cash")}
                        className={`cursor-pointer p-4 flex justify-between items-center rounded-md
                                           ${
                                             selectedPayment === "cash"
                                               ? "border border-[rgb(var(--fifteenth-rgb))]"
                                               : "border border-gray-200"
                                           }
                                           `}
                      >
                        <div className="flex flex-row items-center">
                          <Image
                            src="https://cdn-icons-png.flaticon.com/128/7630/7630510.png"
                            alt="Tiền mặt"
                            width={24}
                            height={24}
                          />
                          <label htmlFor="cash" className="cursor-pointer ml-2">
                            Thanh toán khi nhận hàng
                          </label>
                        </div>
                        <div
                          className={`cursor-pointer w-4 h-4 rounded-full mr-2 ${
                            selectedPayment === "cash"
                              ? "bg-[rgb(var(--fifteenth-rgb))]"
                              : ""
                          }`}
                        ></div>
                      </div>
                      <div
                        onClick={() => setSelectedPayment("bank")}
                        className={`cursor-pointer p-4 flex justify-between items-center rounded-md mt-3
                          ${
                            selectedPayment === "bank"
                              ? "border border-[rgb(var(--fifteenth-rgb))]"
                              : "border border-gray-200"
                          }`}
                      >
                        <div className="flex flex-row items-center">
                          <Image
                            src="https://cdn-icons-png.flaticon.com/128/15953/15953021.png"
                            alt="Chuyen khoan"
                            width={24}
                            height={24}
                          />
                          <label htmlFor="bank" className="cursor-pointer ml-2">
                            Chuyển khoản
                          </label>
                        </div>
                        <div
                          className={`cursor-pointer w-4 h-4 rounded-full mr-2 ${
                            selectedPayment === "bank"
                              ? "bg-[rgb(var(--fifteenth-rgb))]"
                              : ""
                          }`}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className="flex flex-row items-center gap-2 mb-3.5 relative z-20">
                      <StickyNote className="w-5 h-5" />
                      <h2 className="text-lg lg:text-xl font-medium z-20 relative">
                        Thêm ghi chú cho đơn hàng
                      </h2>
                    </div>
                    <textarea
                      placeholder="Ghi chú về đơn hàng (Nếu có)"
                      className="w-full p-3 border border-gray-200 placeholder:text-[#81838B] rounded-md h-24 ml-0 focus:border-none focus:!ring-2 focus:!ring-[rgb(var(--fifteenth-rgb))] outline-none"
                    ></textarea>
                  </div>
                </>
              )
            }
          </div>
          <div className="w-full lg:w-1/2 space-y-6">
            <div>
              <div className="flex flex-row gap-2 items-center mb-3.5 relative z-20">
                <Frame className="w-5 h-5" />
                <h2 className="text-lg lg:text-xl font-medium z-20 relative">
                  Thông tin Album
                </h2>
              </div>
              <div className="space-y-4">
                <div className="flex flex-col justify-center items-start">
                  <span className="font-light">
                    Mã đơn hàng:{" "}
                    <strong className="uppercase font-semibold">
                      {orderID}
                    </strong>
                  </span>
                  <span className="font-light">
                    Kích thước:{" "}
                    <strong className="font-semibold">
                      {formDataOrder?.size}
                    </strong>
                  </span>
                  <span className="font-light">
                    Tổng số trang:{" "}
                    <strong className="font-semibold">
                      {formDataOrder?.pages}
                    </strong>
                  </span>
                </div>
                <div className="w-full flex flex-col justify-center items-center ">
                  <div className="bg-gray-50 border border-gray-200 text-gray-900 rounded-lg block w-full mb-3">
                    <Select
                      value={selectedCoverId}
                      onValueChange={handleCoverChange}
                    >
                      <SelectTrigger className="text-[16px] focus:border-none focus:!ring-2 focus:!ring-[rgb(var(--fifteenth-rgb))] outline-none">
                        {selectedCoverId === "chon-loai-bia"
                          ? "Chọn loại bìa"
                          : ""}
                        <SelectValue placeholder="Chọn loại bìa" />
                      </SelectTrigger>
                      <SelectContent className="">
                        {covers?.map((item: any, index: any) => (
                          <SelectItem
                            className="text-xs"
                            key={index}
                            value={String(item?.id)}
                          >
                            {HELPER.renderAlbumCover(item?.name)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {/* <div className="bg-gray-50 border border-gray-200 text-gray-900 rounded-lg block w-full my-4">
                    <Select
                      value={selectedCoreId}
                      onValueChange={handleCoreChange}
                    >
                      <SelectTrigger className="text-[16px] focus:border-none focus:!ring-2 focus:!ring-[rgb(var(--fifteenth-rgb))] outline-none">
                        {selectedCoreId === "chon-loai-ruot"
                          ? "Chọn loại ruột"
                          : ""}
                        <SelectValue placeholder="Chọn loại ruột" />
                      </SelectTrigger>

                      <SelectContent className="">
                        {pages?.map((item: any, index: any) => (
                          <SelectItem
                            className="text-xs"
                            key={index}
                            value={String(item?.id)}
                          >
                            {HELPER.renderAlbumCore(item?.name)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div> */}
                  {
                    // selectedCore !== "chon-loai-ruot" &&
                    selectedCoverId === "2" && (
                      <div className="w-full mb-2">
                        <ImageUploadAlbum onImageChange={setUploadedFile} />
                      </div>
                    )
                  }
                </div>
              </div>
            </div>
            {/* MOBILE  */}
            <div className="lg:hidden w-full md:w-1/2 space-y-6 !mt-3">
              <div>
                <div className="flex flex-row items-center gap-2 mb-3.5 relative z-20">
                  <UserRound className="w-5 h-5" />
                  <h2 className="text-lg lg:text-xl font-medium z-20 relative">
                    Thông tin khách hàng
                  </h2>
                </div>
                <div className="mb-4">
                  <Label
                    htmlFor="name"
                    className="text-black text-[16px] font-light"
                  >
                    Họ và tên:
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Nhập họ và tên"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 pr-16 border border-gray-200 placeholder:text-[#81838B] rounded-md mt-1 focus:border-none focus:!ring-2 focus:!ring-[rgb(var(--fifteenth-rgb))] outline-none"
                    style={{ fontSize: "16px" }}
                  />
                </div>
                <div className="mb-3">
                  <Label
                    htmlFor="phone"
                    className="text-black text-[16px] font-light"
                  >
                    Số điện thoại:
                  </Label>
                  <Input
                    type="phone"
                    name="phone"
                    placeholder="Nhập số điện thoại"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 pr-16 border border-gray-200 placeholder:text-[#81838B] rounded-md mt-1 focus:border-none focus:!ring-2 focus:!ring-[rgb(var(--fifteenth-rgb))] outline-none"
                    style={{ fontSize: "16px" }}
                  />
                </div>
              </div>
              <div>
                <div className="flex flex-row items-center gap-2 relative mb-3.5 z-20">
                  <MapPin className="w-5 h-5" />
                  <h2 className="text-lg lg:text-xl font-medium z-20 relative">
                    Địa chỉ nhận hàng
                  </h2>
                </div>
                <div className="grid grid-cols-1 gap-2 mb-3">
                  <div className="mb-1">
                    <Label
                      htmlFor="province"
                      className="text-black text-[16px] font-light"
                    >
                      Tỉnh/Thành phố:
                    </Label>
                    <Dialog
                      open={openProvinces}
                      onOpenChange={setOpenProvinces}
                    >
                      <DialogTrigger asChild>
                        <Input
                          readOnly
                          value={province || "Vui lòng chọn Tỉnh/Thành phố"}
                          className="text-left w-full px-3 py-2 pr-16 border border-gray-200 rounded-md cursor-pointer mt-1 text-[16px]"
                          onClick={() => setOpenProvinces(true)}
                        />
                      </DialogTrigger>
                      <DialogContent className="z-[70]">
                        <DialogHeader>
                          <DialogTitle>
                            Vui lòng chọn Tỉnh/Thành phố
                          </DialogTitle>
                          <DialogDescription className="max-h-96 overflow-y-auto">
                            <div className="my-3">
                              {provinces.map((province) => (
                                <div
                                  key={province.code}
                                  className="p-2"
                                  onClick={() => {
                                    handleProvinceChange(String(province.code));
                                  }}
                                >
                                  {province.name}
                                </div>
                              ))}
                            </div>
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div>
                    <Label
                      htmlFor="district"
                      className="text-black text-[16px] font-light"
                    >
                      Quận/Huyện:
                    </Label>
                    <Dialog open={openDistrict} onOpenChange={setOpenDistrict}>
                      <DialogTrigger asChild>
                        <Input
                          readOnly
                          value={district || "Vui lòng chọn Quận/Huyện"}
                          className="text-left w-full px-3 py-2 pr-16 border border-gray-200 rounded-md cursor-pointer mt-1 text-[16px]"
                          onClick={() => setOpenDistrict(true)}
                          disabled={!formData.province}
                        />
                      </DialogTrigger>
                      <DialogContent className="z-[70]">
                        <DialogHeader>
                          <DialogTitle>Vui lòng chọn Quận/Huyện</DialogTitle>
                          <DialogDescription className="max-h-96 overflow-y-auto">
                            <div className="my-3">
                              {districts.map((district) => (
                                <div
                                  key={district.code}
                                  className="p-2"
                                  onClick={() => {
                                    handleDistrictChange(String(district.code));
                                  }}
                                >
                                  {district.name}
                                </div>
                              ))}
                            </div>
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
                <div className="mb-3">
                  <Label
                    htmlFor="ward"
                    className="text-black text-[16px] font-light"
                  >
                    Phường/Xã:
                  </Label>
                  <Dialog open={openWard} onOpenChange={setOpenWard}>
                    <DialogTrigger asChild>
                      <Input
                        readOnly
                        value={ward || "Vui lòng chọn Phường/Xã"}
                        className="text-left w-full px-3 py-2 pr-16 border border-gray-200 rounded-md cursor-pointer mt-1 text-[16px]"
                        onClick={() => setOpenWard(true)}
                        disabled={!formData.district}
                      />
                    </DialogTrigger>
                    <DialogContent className="z-[70]">
                      <DialogHeader>
                        <DialogTitle>Vui lòng chọn Phường/Xã</DialogTitle>
                        <DialogDescription className="max-h-96 overflow-y-auto">
                          <div className="my-3">
                            {wards.map((ward) => (
                              <div
                                key={ward.code}
                                className="p-2"
                                onClick={() => {
                                  handleWardChange(String(ward.code));
                                }}
                              >
                                {ward.name}
                              </div>
                            ))}
                          </div>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="mb-4">
                  <Label
                    htmlFor="address"
                    className="text-black text-[16px] font-light"
                  >
                    Số nhà, tên đường:
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    placeholder="Ví dụ: 123 Đường ABC"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full mt-1 placeholder:text-[#81838B] focus:border-none focus:!ring-2 focus:!ring-[rgb(var(--fifteenth-rgb))] outline-none"
                    style={{ fontSize: "16px" }}
                  />
                </div>
              </div>
              {/* MOBILE  */}
              {
                // selectedCore !== "chon-loai-ruot" &&
                selectedCover !== "chon-loai-bia" && (
                  <>
                    <div>
                      <div className="flex flex-row items-center gap-2 mb-2 relative z-20">
                        <CreditCard className="w-5 h-5" />
                        <h2 className="text-lg lg:text-xl font-medium z-20 relative">
                          Tùy chọn thanh toán
                        </h2>
                      </div>
                      <div className="">
                        <div
                          onClick={() => setSelectedPayment("cash")}
                          className={`cursor-pointer p-4 flex justify-between items-center rounded-md
                                             ${
                                               selectedPayment === "cash"
                                                 ? "border border-[rgb(var(--fifteenth-rgb))]"
                                                 : "border border-gray-200"
                                             }
                                             `}
                        >
                          <div className="flex flex-row items-center">
                            <Image
                              src="https://cdn-icons-png.flaticon.com/128/7630/7630510.png"
                              alt="Tiền mặt"
                              width={24}
                              height={24}
                            />
                            <label
                              htmlFor="cash"
                              className="cursor-pointer ml-2"
                            >
                              Thanh toán khi nhận hàng
                            </label>
                          </div>
                          <div
                            className={`cursor-pointer w-4 h-4 rounded-full mr-2 ${
                              selectedPayment === "cash"
                                ? "bg-[rgb(var(--fifteenth-rgb))]"
                                : ""
                            }`}
                          ></div>
                        </div>
                        <div
                          onClick={() => setSelectedPayment("bank")}
                          className={`cursor-pointer p-4 flex justify-between items-center rounded-md mt-3
                          ${
                            selectedPayment === "bank"
                              ? "border border-[rgb(var(--fifteenth-rgb))]"
                              : "border border-gray-200"
                          }`}
                        >
                          <div className="flex flex-row items-center">
                            <Image
                              src="https://cdn-icons-png.flaticon.com/128/15953/15953021.png"
                              alt="Chuyen khoan"
                              width={24}
                              height={24}
                            />
                            <label
                              htmlFor="bank"
                              className="cursor-pointer ml-2"
                            >
                              Chuyển khoản
                            </label>
                          </div>
                          <div
                            className={`cursor-pointer w-4 h-4 rounded-full mr-2 ${
                              selectedPayment === "bank"
                                ? "bg-[rgb(var(--fifteenth-rgb))]"
                                : ""
                            }`}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex flex-row items-center gap-2 mb-2 relative z-20">
                        <StickyNote className="w-5 h-5" />
                        <h2 className="text-lg lg:text-xl font-medium z-20 relative">
                          Thêm ghi chú cho đơn hàng
                        </h2>
                      </div>
                      <textarea
                        placeholder="Ghi chú về đơn hàng (Nếu có)"
                        className="w-full p-3 border border-gray-200 placeholder:text-[#81838B] rounded-md h-24 ml-0"
                      ></textarea>
                    </div>
                  </>
                )
              }

              {/* ORDER BUTTON  */}
            </div>
            {/* {selectedCore !== "chon-loai-ruot" &&
              selectedCover !== "chon-loai-bia" && ( */}
            <>
              <div className="border-t pt-4 space-y-2 !mt-2">
                <div className="flex justify-between">
                  <span className="font-light">Giá bìa Album</span>
                  {selectedCover === "chon-loai-bia" ? (
                    <span className="font-light">Chọn bìa Album</span>
                  ) : (
                    <span className="font-light">
                      {HELPER.formatVND(String(albumPriceCover))}
                    </span>
                  )}
                </div>
                {/* <div className="flex justify-between">
                  <span className="font-light">Giá ruột Album</span>
                  {selectedCore === "chon-loai-ruot" ? (
                    <span className="font-light">Chọn ruột Album</span>
                  ) : (
                    <span className="font-light">
                      {HELPER.formatVND(String(albumPriceCore))}
                    </span>
                  )}
                </div> */}
                <div className="flex justify-between font-light">
                  <span className="">Phí vận chuyển</span>
                  <span className="">{HELPER.formatVND("0")}</span>
                </div>
                {/* <div className="flex justify-between">
                  <span className="font-light">Tạm tính</span>
                  <span className="font-light">
                    {HELPER.formatVND(
                      String(albumPriceCover + albumPriceCore + 0)
                    )}
                  </span>
                </div> */}
                <div className="flex justify-between items-center pt-0 font-light">
                  <span>Khuyến mãi</span>
                  {
                    // selectedCore === "chon-loai-ruot" ||
                    selectedCover === "chon-loai-bia" ? (
                      <>
                        <span className="text-black">Chọn đầy đủ sản phẩm</span>
                      </>
                    ) : (
                      <Dialog>
                        <DialogTrigger asChild>
                          <div className="">
                            {!isValid ? (
                              <div className="cursor-pointer text-[16px] flex flex-row justify-center items-center gap-4 w-full mx-auto text-[rgb(var(--fifteenth-rgb))] text-center rounded-md font-medium transition">
                                Nhập mã
                              </div>
                            ) : (
                              <div className="flex flex-row gap-2 text-[16px]">
                                <div className="cursor-pointer text-white flex flex-row justify-center items-center gap-4 mx-auto py-1 px-3 bg-[rgb(var(--fifteenth-rgb))] hover:bg-[] hover:opacity-80 text-center rounded-md font-medium transition">
                                  Đổi mã
                                </div>
                              </div>
                            )}
                          </div>
                        </DialogTrigger>
                        <DialogContent
                          className="-translate-y-52 z-[70]"
                          onOpenAutoFocus={(e) => e.preventDefault()}
                        >
                          <DialogHeader>
                            <DialogTitle className="text-[20px]">
                              Vui lòng nhập mã giảm giá
                            </DialogTitle>
                            <DialogDescription className="max-h-96 overflow-y-auto">
                              <div className="flex flex-col justify-center items-center gap-2 mt-1">
                                <input
                                  type="text"
                                  placeholder="Nhập mã khuyến mãi"
                                  className={`w-full h-10 border border-gray-300 rounded p-2 text-sm focus:border-2 focus:border-[rgb(var(--fifteenth-rgb))] focus:outline-none ${
                                    isValid === false
                                      ? ""
                                      : isValid === true
                                      ? ""
                                      : ""
                                  }`}
                                  value={promoCode}
                                  onChange={(e) => {
                                    setPromoCode(e.target.value);
                                  }}
                                  style={{ fontSize: "16px" }}
                                />
                              </div>
                            </DialogDescription>
                          </DialogHeader>
                          <DialogClose>
                            <div
                              className={`w-full px-5 py-2 mx-auto text-white bg-[rgb(var(--fifteenth-rgb))] hover:bg-[rgb(var(--fifteenth-rgb))] hover:opacity-80 text-center rounded-md font-medium cursor-pointer ${
                                isChecking
                                  ? "opacity-50 cursor-not-allowed"
                                  : ""
                              }`}
                              onClick={
                                !isChecking ? handleCheckDiscount : undefined
                              }
                            >
                              {isChecking ? "Đang kiểm tra..." : "Dùng mã"}
                            </div>
                          </DialogClose>
                        </DialogContent>
                      </Dialog>
                    )
                  }
                </div>

                {isValid && (
                  <div className="flex justify-between items-center pt-0">
                    <span>Giảm giá</span>
                    <div className="flex gap-2">
                      <div className={`text-red-500`}>
                        - {HELPER.formatVND(String(discountPrice))}
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between font-bold text-xl pt-4">
                  <span>Tổng</span>
                  <span>
                    {HELPER.formatVND(String(totalPrice - discountPrice))}
                  </span>
                </div>
              </div>

              <div className="flex flex-row items-start">
                <input
                  type="checkbox"
                  id="terms"
                  checked={isTermsAccepted}
                  onChange={(e) => setIsTermsAccepted(e.target.checked)}
                  className="mr-2 mt-1"
                />
                <p className="text-sm text-black font-light">
                  Bằng cách tiến hành mua hàng, bạn đã đồng ý với các điều khoản
                  và chính sách của chúng tôi.
                </p>
              </div>
              <div className="flex flex-row justify-between items-center mt-6 w-full">
                <button
                  onClick={() => handleSubmit()}
                  className="flex flex-row justify-center items-center gap-2 w-full py-2 lg:py-4 bg-[rgb(var(--fifteenth-rgb))] hover:bg-[rgb(var(--fifteenth-rgb))] hover:opacity-80 text-center text-white rounded-md font-medium transition"
                >
                  {isLoading ? (
                    <>
                      Đang xử lí đơn hàng{" "}
                      <Loader className="animate-spin" size={18} />
                    </>
                  ) : (
                    "Đặt hàng"
                  )}
                </button>
              </div>
            </>
            {/* )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section01;
