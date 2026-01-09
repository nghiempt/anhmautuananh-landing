"use client";

import Cookies from "js-cookie";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ROUTES } from "@/utils/route";
import { ProductService } from "@/services/product";
import React from "react";
import { useSearchParams } from "next/navigation";
import { AccountService } from "@/services/account";
import { cn } from "@/lib/utils";
import ImageUpload from "./image-upload";
import { HELPER } from "@/utils/helper";
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
import { OrderService } from "@/services/order";
import { UploadService } from "@/services/upload";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Cropper from "react-easy-crop";
import { IMAGES } from "@/utils/image";
import {
  ChevronDown,
  CreditCard,
  Frame,
  Loader,
  MapPin,
  Star,
  StickyNote,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import ProductCard from "./card";

interface ColorOption {
  id: string;
  name: string;
  bgColor: string;
  borderColor: string;
}

interface SizeOption {
  id: string;
  label: string;
  dimensions: {
    width: number;
    height: number;
  };
}

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

const Section01 = () => {
  // ADDRESS
  const [openProvinces, setOpenProvinces] = useState(false);
  const [openDistrict, setOpenDistrict] = useState(false);
  const [openWard, setOpenWard] = useState(false);
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedPayment, setSelectedPayment] = React.useState<string>("cash");
  const [provinces, setProvinces] = React.useState<Province[]>([]);
  const [districts, setDistricts] = React.useState<District[]>([]);
  const [wards, setWards] = React.useState<Ward[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const param = useSearchParams();
  const frameImage = param.get("frameImage");
  const [isFrameImageLoaded, setIsFrameImageLoaded] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [currentImage, setCurrentImage] = React.useState("");
  const [products, setProducts] = useState([] as any);
  const [productsData, setProductsData] = useState({} as any);
  const [isLogin, setIsLogin] = useState(Cookies.get("isLogin"));
  const [selectedSize, setSelectedSize] = React.useState<string>("");
  const [customerAccount, setCustomerAccount] =
    useState<CustomerAccount | null>(null);
  const [selectedProduct, setSelectedProduct] = React.useState<any>(
    param.get("product") || "Chon san pham"
  );
  const [selectedColor, setSelectedColor] = React.useState<string>("");
  const [confirmColor, setConfirmColor] = React.useState<string>("");
  const [confirmSize, setConfirmSize] = React.useState<string>("");
  const [originalImage, setOriginalImage] = React.useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = React.useState<File | null>(null);
  const [provinceSearchTerm, setProvinceSearchTerm] = useState("");
  const [districtSearchTerm, setDistrictSearchTerm] = useState("");
  const [wardSearchTerm, setWardSearchTerm] = useState("");
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
  const [sizeOptions, setSizeOptions] = useState<SizeOption[]>([]);
  const [isTermsAccepted, setIsTermsAccepted] = useState(true);
  const [pendingFrameImage, setPendingFrameImage] = useState<{
    file: File;
    url: string;
  } | null>(null);
  const [hasCropped, setHasCropped] = useState(false);

  useEffect(() => {
    if (productsData?.product_option?.length > 0) {
      const dynamicSizeOptions = productsData.product_option.map(
        (option: { size: string; price: string }) => {
          const [width, height] = option.size
            .split("x")
            .map((dim) => Number(dim) * 10);
          return {
            id: option.size,
            label: option.size,
            dimensions: { width, height },
          };
        }
      );
      setSizeOptions(dynamicSizeOptions);

      if (dynamicSizeOptions.length > 0 && !selectedSize) {
        setSelectedSize(dynamicSizeOptions[0].id);
        setConfirmSize(dynamicSizeOptions[0].id);
      }
    } else {
      setSizeOptions([]);
    }

    if (productsData?.color?.length > 0 && !selectedColor) {
      const firstAvailableColor = colorOptions.find((color) =>
        productsData.color.includes(color.id)
      );
      if (firstAvailableColor) {
        setSelectedColor(firstAvailableColor.id);
        setConfirmColor(firstAvailableColor.id);
      }
    }
  }, [productsData]);

  // Reset size to the first size when product changes
  useEffect(() => {
    if (
      selectedProduct &&
      selectedProduct !== "Chon san pham" &&
      productsData?.product_option?.length > 0
    ) {
      const firstOption = productsData.product_option[0];
      if (firstOption?.size) {
        setSelectedSize(firstOption.size);
        setConfirmSize(firstOption.size);
      }
    }
  }, [selectedProduct, productsData]);

  const colorOptions: ColorOption[] = [
    {
      id: "white",
      name: "Trắng",
      bgColor: "bg-white",
      borderColor: "border-gray-300",
    },
    {
      id: "black",
      name: "Đen",
      bgColor: "bg-black",
      borderColor: "border-black",
    },
    {
      id: "gold",
      name: "Gold",
      bgColor: "bg-[#FFD700]",
      borderColor: "border-black",
    },
    {
      id: "silver",
      name: "Bạc",
      bgColor: "bg-[#C0C0C0]",
      borderColor: "border-black",
    },
    {
      id: "wood",
      name: "Gỗ",
      bgColor: "bg-[#8B5A2B]",
      borderColor: "border-black",
    },
  ];

  const selectedProductData = products.find(
    (pro: any) => pro._id.toString() === selectedProduct
  );
  const selectedOption = selectedProductData?.product_option?.find(
    (option: any) => option.size === selectedSize
  );
  const productPrice = selectedOption?.price || "0";
  const discountProductPrice =
    selectedProductData?.discount !== "0" && selectedOption?.price
      ? String(
          Number(selectedOption.price) -
            Number(selectedProductData.discount) *
              Number(selectedOption.price) *
              0.01
        )
      : "none";

  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [discountPercent, setDiscountPercent] = useState(0);
  const discountPrice =
    (Number(
      HELPER.calculateTotalNumber(
        discountProductPrice !== "none" ? discountProductPrice : productPrice,
        "0",
        0
      )
    ) *
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
    const fetchProductData = async () => {
      if (!selectedProduct || selectedProduct === "Chon san pham") return;
      try {
        const res = await ProductService.getProductById(selectedProduct);
        if (res && res.data) {
          setProductsData(res.data);
        }
      } catch (error) {
        console.error("Error fetching product by ID:", error);
      }
    };

    fetchProductData();
  }, [selectedProduct]);

  const getImageContainerStyle = () => {
    const selectedSizeOption = sizeOptions.find(
      (size) => size.id === selectedSize
    );
    if (!selectedSizeOption) return {};
    const aspectRatio =
      selectedSizeOption.dimensions.width /
      selectedSizeOption.dimensions.height;
    return {
      aspectRatio: aspectRatio,
      maxWidth: "100%",
      width: "100%",
      position: "relative" as const,
    };
  };

  const renderProduct = async () => {
    const res = await ProductService.getAll();
    if (res && res.data.length > 0) {
      setProducts(res.data);
    }
  };

  useEffect(() => {
    const loadFrameImage = async () => {
      const frameImageParam = param.get("frameImage");
      if (frameImageParam && !isFrameImageLoaded) {
        try {
          const response = await fetch(frameImageParam, { mode: "cors" });
          if (!response.ok) throw new Error("Failed to fetch image");
          const blob = await response.blob();
          const objectUrl = URL.createObjectURL(blob);
          const file = new File([blob], "frame-image.jpg", { type: blob.type });

          setUploadedFile(file);
          setOriginalImage(objectUrl);
          setCurrentImage(objectUrl);
          setIsFrameImageLoaded(true);
          setIsImageLoaded(true);
        } catch (error) {
          console.error("Error loading frame image:", error);
          toast({
            title: "Error",
            description: "Failed to load frame image from URL",
            variant: "destructive",
          });
        }
      }
    };

    loadFrameImage();
  }, [param, isFrameImageLoaded]);

  const validateForm = () => {
    if (selectedProduct === "Chon san pham") {
      toast({
        title: "",
        description: "Vui lòng chọn một sản phẩm!",
        variant: "destructive",
      });
      setIsLoading(false);
      return false;
    }
    if (!uploadedFile) {
      toast({
        title: "",
        description: "Vui lòng tải lên một hình ảnh!",
        variant: "destructive",
      });
      setIsLoading(false);
      return false;
    }

    if (productsData?.color.length > 0) {
      if (confirmColor === "") {
        toast({
          title: "",
          description: "Vui lòng chọn màu sắc!",
          variant: "destructive",
        });
        setIsLoading(false);
        return false;
      }
    }

    if (confirmSize === "") {
      toast({
        title: "",
        description: "Vui lòng chọn kích thước!",
        variant: "destructive",
      });
      setIsLoading(false);
      return false;
    }
    if (!formData?.address) {
      toast({
        title: "",
        description: "Vui lòng nhập địa chỉ giao hàng!",
        variant: "destructive",
      });
      setIsLoading(false);
      return false;
    }
    if (!formData?.ward || ward === "Vui lòng chọn phường/xã") {
      toast({
        title: "",
        description:
          "Vui lòng chọn đầy đủ Tỉnh/Thành phố, Quận/Huyện, Phường/Xã.",
        variant: "destructive",
      });
      setIsLoading(false);
      return false;
    }
    if (!formData?.phone) {
      toast({
        title: "",
        description: "Vui lòng nhập số điện thoại!",
        variant: "destructive",
      });
      setIsLoading(false);
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
      setIsLoading(false);
      return false;
    }
    if (!selectedPayment) {
      toast({
        title: "",
        description: "Vui lòng chọn phương thức thanh toán!",
        variant: "destructive",
      });
      setIsLoading(false);
      return false;
    }

    return true;
  };

  const handleImageUpload = (file: File | null) => {
    if (selectedProduct === "Chon san pham") {
      toast({
        title: "",
        description: "Vui lòng chọn một sản phẩm trước khi tải lên hình ảnh!",
        variant: "destructive",
      });
      return;
    } else {
      if (file) {
        setUploadedFile(file);
        const originalUrl = URL.createObjectURL(file);
        setOriginalImage(originalUrl);
        setCurrentImage(originalUrl);
        setCroppedImage(null);
        setIsImageLoaded(true);
        setHasCropped(false);
      }
    }
  };

  const autoCropImage = async (file: File, sizeId: string): Promise<File> => {
    try {
      const sizeOption = sizeOptions.find((option) => option.id === sizeId);
      if (!sizeOption) throw new Error("Invalid size option");

      const aspectRatio =
        sizeOption.dimensions.width / sizeOption.dimensions.height;

      const image = new window.Image();
      image.src = URL.createObjectURL(file);

      await new Promise((resolve, reject) => {
        image.onload = resolve;
        image.onerror = reject;
      });

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas context not available");

      const imageAspectRatio = image.width / image.height;
      let cropWidth, cropHeight, cropX, cropY;

      if (imageAspectRatio > aspectRatio) {
        // Image is wider than target aspect ratio
        cropHeight = image.height;
        cropWidth = image.height * aspectRatio;
        cropX = (image.width - cropWidth) / 2;
        cropY = 0;
      } else {
        // Image is taller than target aspect ratio
        cropWidth = image.width;
        cropHeight = image.width / aspectRatio;
        cropX = 0;
        cropY = (image.height - cropHeight) / 2;
      }

      // Set canvas size to maintain high quality
      canvas.width = cropWidth;
      canvas.height = cropHeight;

      ctx.drawImage(
        image,
        cropX,
        cropY,
        cropWidth,
        cropHeight,
        0,
        0,
        cropWidth,
        cropHeight
      );

      const blob = await new Promise<Blob>((resolve) =>
        canvas.toBlob((blob) => resolve(blob!), "image/jpeg", 0.95)
      );

      return new File([blob], file.name || "auto-cropped-image.jpg", {
        type: "image/jpeg",
      });
    } catch (error) {
      console.error("Error auto-cropping image:", error);
      toast({
        title: "Lỗi",
        description: "Không thể tự động cắt ảnh",
        variant: "destructive",
      });
      return file; // Return original file if auto-crop fails
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setLoading(true);
    let accountOrderLogin = false;

    try {
      setIsLoading(true);

      let finalFile = uploadedFile;
      if (uploadedFile && !hasCropped && confirmSize) {
        finalFile = await autoCropImage(uploadedFile, confirmSize);
        setUploadedFile(finalFile);
        const newImageUrl = URL.createObjectURL(finalFile);
        setCurrentImage(newImageUrl);
        setOriginalImage(newImageUrl);
      }

      if (!finalFile) {
        throw new Error("No image file available");
      }

      // Use finalFile instead of uploadedFile for the upload
      const upload: any = await UploadService.uploadToCloudinary([finalFile]);

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
        product_id: selectedProduct,
        image: upload[0]?.secure_url,
        order_type: "frame",
        color: confirmColor,
        size:
          sizeOptions.find((option) => option.id === selectedSize)?.label || "",
        address: formData?.address || "",
        payment_method: selectedPayment || "",
        discount_code: promoCode || "",
        discount_price: discountPercent || 0,
        total: HELPER.calculateTotalNumber(
          selectedOption?.price || "0",
          "0",
          discountPercent
        ),
      };

      let response;
      if (!isLogin) {
        response = await OrderService.createOrder_no_login({
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
        response = await OrderService.createOrder({
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
          setIsLoading(false);
          return;
        }
        if (selectedPayment !== "bank") {
          setIsLoading(false);
        }
      }

      if (selectedPayment === "bank" && response?.data) {
        if (!isLogin) {
          const paymentUrl = await OrderService.createPayment({
            amount: HELPER.calculateTotalNumber(
              selectedOption?.price || "0",
              "0",
              discountPercent
            ),
            description: response.data.user_id.slice(-5) || "unknown",
            returnUrl: `${
              response?.data?.isAccountExisted === true
                ? `${ROUTES.FULL_ROUTE_ACCOUNT}?orderID=${response?.data?.order_id}`
                : `${ROUTES.FULL_ROUTE_ACCOUNT}?orderNoLogin=true&orderID=${response?.data?.order_id}`
            }`,
            cancelUrl: `${
              response?.data?.isAccountExisted === true
                ? `${ROUTES.FULL_ROUTE_ACCOUNT}?orderID=${response?.data?.order_id}`
                : `${ROUTES.FULL_ROUTE_ACCOUNT}?orderNoLogin=true&orderID=${response?.data?.order_id}`
            }`,
          });
          // window.open(paymentUrl.data.checkoutUrl, "_blank");
          window.location.href = paymentUrl.data.checkoutUrl;
        } else {
          const paymentUrl = await OrderService.createPayment({
            amount: HELPER.calculateTotalNumber(
              selectedOption?.price || "0",
              "0",
              discountPercent
            ),
            description: isLogin.slice(-5),
            returnUrl: `${ROUTES.FULL_ROUTE_ACCOUNT}?orderID=${response?.data?.insertedId}`,
            cancelUrl: `${ROUTES.FULL_ROUTE_ACCOUNT}?orderID=${response?.data?.insertedId}`,
          });
          // window.open(paymentUrl.data.checkoutUrl, "_blank");
          window.location.href = paymentUrl.data.checkoutUrl;
        }
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
            name: data.name,
            email: data.email,
            avatar: data.avatar,
            phone: data.phone,
            address: data.address,
            ward: Number(data.ward),
            district: Number(data.district),
            province: Number(data.province),
          });

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
    renderProduct();
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

  const handleProvinceSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProvinceSearchTerm(e.target.value);
  };

  const handleDistrictSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDistrictSearchTerm(e.target.value);
  };

  const handleWardSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWardSearchTerm(e.target.value);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [initialAspectRatio, setInitialAspectRatio] = useState<number>(2 / 1);

  useEffect(() => {
    if (sizeOptions.length > 0) {
      const defaultSize = sizeOptions[0];
      const aspectRatio =
        defaultSize.dimensions.width / defaultSize.dimensions.height;
      setInitialAspectRatio(aspectRatio);
    }
  }, [sizeOptions]);

  const onCropComplete = useCallback(
    async (croppedArea: any, croppedAreaPixels: any) => {
      if (!originalImage && !uploadedFile) return;

      try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const image = new window.Image();

        image.src = originalImage || URL.createObjectURL(uploadedFile!);

        if (image.src.startsWith("http")) {
          image.crossOrigin = "anonymous";
        }

        await new Promise((resolve, reject) => {
          image.onload = resolve;
          image.onerror = () => reject(new Error("Failed to load image"));
        });

        canvas.width = croppedAreaPixels.width;
        canvas.height = croppedAreaPixels.height;

        if (!ctx) throw new Error("Canvas context not available");

        ctx.drawImage(
          image,
          croppedAreaPixels.x,
          croppedAreaPixels.y,
          croppedAreaPixels.width,
          croppedAreaPixels.height,
          0,
          0,
          croppedAreaPixels.width,
          croppedAreaPixels.height
        );

        const croppedImageUrl = canvas.toDataURL("image/jpeg");
        setCroppedImage(croppedImageUrl);
        setHasCropped(true);
      } catch (error) {
        console.error("Error cropping image:", error);
        toast({
          title: "Lỗi",
          description: "Không thể xử lý hình ảnh ",
          variant: "destructive",
        });
      }
    },
    [uploadedFile, originalImage]
  );

  const handleCropSave = () => {
    if (croppedImage) {
      setCurrentImage(croppedImage);
      const blob = dataURLtoBlob(croppedImage);
      const file = new File([blob], uploadedFile?.name || "cropped-image.jpg", {
        type: "image/jpeg",
      });
      setUploadedFile(file);
      setHasCropped(true);
    }
    setConfirmColor(selectedColor);
    setConfirmSize(selectedSize);
    setIsLoading(false);
  };

  const handleCheckChange = () => {
    if (confirmSize === "" && confirmColor === "") {
      setSelectedSize("");
      setSelectedColor("");
    }
    setIsLoading(false);
  };

  const dataURLtoBlob = (dataURL: string) => {
    const arr = dataURL.split(",");
    const mime = arr[0].match(/:(.*?);/)?.[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  const getAspectRatio = (sizeId: string) => {
    const sizeOption = sizeOptions.find((option) => option.id === sizeId);
    if (sizeOption) {
      return sizeOption.dimensions.width / sizeOption.dimensions.height;
    }
    return initialAspectRatio;
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="max-w-7xl w-full mx-auto py-5 lg:py-10 px-5 lg:px-0">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="hidden lg:grid w-full md:w-1/2">
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
                value={formData.name}
                placeholder="Nhập họ và tên"
                onChange={handleInputChange}
                className="w-full px-3 py-2 pr-16 border border-gray-200 rounded-md mt-1 focus:border-none focus:!ring-2 focus:!ring-[rgb(var(--fifteenth-rgb))] outline-none text-[16px] h-[40px]"
              />
            </div>
            <div className="mb-0">
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
                className="w-full px-3 py-2 pr-16 border border-gray-200 rounded-md mt-1 focus:border-none focus:!ring-2 focus:!ring-[rgb(var(--fifteenth-rgb))] outline-none text-[16px] h-[40px]"
              />
            </div>
            <div className="mt-6">
              <div className="flex flex-row items-center gap-2 relative mb-3.5 z-20">
                <MapPin className="w-5 h-5" />
                <h2 className="text-lg lg:text-xl font-medium z-20 relative">
                  Địa chỉ nhận hàng
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col gap-2">
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
                    <SelectTrigger className="text-[16px] focus:border-none focus:!ring-2 focus:!ring-[rgb(var(--fifteenth-rgb))] outline-none h-[40px]">
                      <SelectValue placeholder="Chọn Tỉnh/Thành phố" />
                    </SelectTrigger>
                    <SelectContent>
                      {provinces
                        .sort((a, b) => a.name.localeCompare(b.name, "vi-VN"))
                        .map((province) => (
                          <SelectItem
                            key={province.code}
                            value={String(province.code)}
                          >
                            {HELPER.formatProvinceName(province.name)}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
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
                    <SelectTrigger className="text-[16px] focus:border-none focus:!ring-2 focus:!ring-[rgb(var(--fifteenth-rgb))] outline-none h-[40px]">
                      <SelectValue placeholder="Chọn Quận/Huyện" />
                    </SelectTrigger>
                    <SelectContent>
                      {districts
                        .sort((a, b) =>
                          HELPER.getNameForSorting(a.name).localeCompare(
                            HELPER.getNameForSorting(b.name),
                            "vi-VN"
                          )
                        )
                        .map((district) => (
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
              <div className="flex flex-col gap-2 mb-3">
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
                  <SelectTrigger className="text-[16px] focus:border-none focus:!ring-2 focus:!ring-[rgb(var(--fifteenth-rgb))] outline-none h-[40px]">
                    <SelectValue placeholder="Chọn Phường/Xã" />
                  </SelectTrigger>
                  <SelectContent>
                    {wards
                      .sort((a, b) =>
                        HELPER.getNameForSorting(a.name).localeCompare(
                          HELPER.getNameForSorting(b.name),
                          "vi-VN"
                        )
                      )
                      .map((ward) => (
                        <SelectItem key={ward.code} value={String(ward.code)}>
                          {ward.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="mb-0">
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
                  className="mt-2 text-[16px] focus:border-none focus:!ring-2 focus:!ring-[rgb(var(--fifteenth-rgb))] outline-none h-[40px]"
                />
              </div>
            </div>
          </div>

          {selectedProduct !== "Chon san pham" && (
            <>
              <div className="mt-6">
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
                  className="w-full p-3 border border-gray-200 placeholder:text-[#64758B] rounded-md h-24 ml-0 mx-10 text-[16px] focus:border-none focus:!ring-2 focus:!ring-[rgb(var(--fifteenth-rgb))] outline-none"
                ></textarea>
              </div>
            </>
          )}
        </div>
        <div className="w-full lg:w-1/2 space-y-6">
          <div>
            <div className="flex flex-row gap-2 items-center mb-3.5 lg:mb-5 relative z-20">
              <Frame className="w-5 h-5" />
              <h2 className="text-lg lg:text-xl font-medium z-20 relative">
                Thông tin khung ảnh
              </h2>
            </div>
            <div className="bg-gray-50 border border-gray-200 text-black rounded-md block w-full mt-1 mb-2">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="cursor-pointer flex flex-row justify-between items-center gap-4 p-2 bg-white rounded-lg">
                    {selectedProduct && selectedProduct !== "Chon san pham" ? (
                      products?.find(
                        (item: any) => String(item?._id) === selectedProduct
                      ) ? (
                        <div className="w-full flex flex-row justify-between items-center">
                          <div className="cursor-pointer flex flex-row items-center gap-3">
                            <Image
                              src={
                                products?.find(
                                  (item: any) =>
                                    String(item?._id) === selectedProduct
                                )?.thumbnail
                              }
                              alt=""
                              width={1000}
                              height={1000}
                              className="object-cover w-10 h-10 shrink-0 border rounded border-gray-200"
                            />

                            <div className="flex flex-col justify-start items-start w-full gap-1">
                              <p className="text-sm line-clamp-2">
                                {
                                  products?.find(
                                    (item: any) =>
                                      String(item?._id) === selectedProduct
                                  )?.name
                                }
                              </p>
                              {/* <div className="flex text-xs font-light items-center mb-0 text-gray-600">
                                {renderStars(Math.floor(Math.random() * 2) + 4)}{" "}
                                  (
                                {Math.floor(Math.random() * 100) + 4} đã bán)
                              </div> */}
                            </div>
                          </div>
                          <div>
                            <ChevronDown />
                          </div>
                        </div>
                      ) : (
                        <div className="w-full flex flex-row justify-between items-center">
                          <p className="text-black">Chọn sản phẩm</p>
                          <div>
                            <ChevronDown />
                          </div>
                        </div>
                      )
                    ) : (
                      <div className="w-full flex flex-row justify-between items-center">
                        <p className="text-black">Chọn sản phẩm</p>
                        <div>
                          <ChevronDown />
                        </div>
                      </div>
                    )}
                  </div>
                </DialogTrigger>
                <DialogContent
                  className="z-[70]"
                  onOpenAutoFocus={(e) => e.preventDefault()}
                >
                  <DialogHeader>
                    <DialogTitle className="mb-3 text-[20px] px-2 font-medium">
                      Vui lòng chọn sản phẩm
                    </DialogTitle>
                    <DialogDescription className="max-h-96 overflow-y-auto scroll-bar-style">
                      <div className="grid grid-cols-2 gap-3">
                        {products?.length > 0 ? (
                          products.map((item: any) => (
                            <DialogClose asChild key={item._id}>
                              <div
                                className="mb-0 cursor-pointer p-2 rounded-md"
                                onClick={() => setSelectedProduct(item._id)}
                              >
                                {/* <div className="flex flex-row items-start gap-4">
                                  <Image
                                    src={item.thumbnail}
                                    alt={item.name}
                                    width={1000}
                                    height={1000}
                                    className="object-cover border border-gray-200 w-14 h-14 shrink-0"
                                  />
                                  <div className="flex flex-col justify-start items-start w-full gap-1">
                                    <p className="text-[14px] text-left w-full text-black font-medium">
                                      {item.name}
                                    </p>
                                    <div className="flex text-[14px] font-light items-center mb-0 text-gray-600">
                                      {renderStars(
                                        Math.floor(Math.random() * 2) + 4
                                      )}{" "}
                                        (
                                      {Math.floor(Math.random() * 100) + 4} đã
                                      bán)
                                    </div>
                                  </div>
                                </div> */}

                                <ProductCard key={item._id} product={item} />
                              </div>
                            </DialogClose>
                          ))
                        ) : (
                          <p className="text-gray-500">
                            Không có sản phẩm nào để chọn.
                          </p>
                        )}
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
            <div className="flex flex-col justify-evenly lg:justify-between h-full lg:h-full lg:mt-5">
              <div className="flex justify-center items-center mt-2 lg:mt-0">
                {!currentImage && !uploadedFile && !frameImage ? (
                  <div className="mt-1 lg:mt-0 w-full">
                    <ImageUpload
                      onImageChange={handleImageUpload}
                      selectedColor={selectedColor}
                      selectedSize={selectedSize}
                      selectedProduct={selectedProduct}
                    />
                  </div>
                ) : (
                  <>
                    <div
                      className={`mt-1 lg:mt-0 relative w-full h-64 flex items-center justify-center overflow-hidden rounded-md bg-gray-50`}
                      style={getImageContainerStyle()}
                    >
                      <Image
                        src={
                          croppedImage
                            ? croppedImage
                            : uploadedFile && !frameImage
                            ? URL.createObjectURL(uploadedFile)
                            : currentImage || IMAGES.LOGO
                        }
                        alt="Selected product image"
                        width={1000}
                        height={1000}
                        className={`object-contain w-full !h-64 ${
                          selectedProduct !== "Chon san pham" ? "border-8" : ""
                        } ${
                          selectedColor === "white"
                            ? "border-gray-100"
                            : selectedColor === "black"
                            ? "border-black"
                            : selectedColor === "gold"
                            ? "border-yellow-400"
                            : selectedColor === "silver"
                            ? "border-gray-200"
                            : selectedColor === "wood"
                            ? "border-yellow-950"
                            : "border-gray-200"
                        } rounded-md`}
                        onError={(e) => {
                          e.currentTarget.src = IMAGES.LOGO;
                        }}
                      />
                    </div>
                  </>
                )}
              </div>
              {currentImage && selectedProduct !== "Chon san pham" && (
                <Dialog>
                  <DialogTrigger asChild>
                    <div
                      className="flex justify-center items-center mt-5 lg:mt-5"
                      onClick={handleCheckChange}
                    >
                      <div className="flex flex-row justify-center items-center gap-4 w-full py-2 px-7 lg:py-0 text-[rgb(var(--fifteenth-rgb))] hover:underline text-center rounded-md font-medium transition cursor-pointer">
                        Tùy chọn kích thước, màu sắc
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent
                    className="sm:max-w-[1200px] max-h-[48rem] overflow-y-auto z-[70]"
                    onOpenAutoFocus={(e) => e.preventDefault()}
                  >
                    <DialogHeader>
                      <DialogTitle>
                        <span className="!text-[20px]">Tùy chọn hình ảnh</span>
                      </DialogTitle>
                      <DialogDescription>
                        <span className="!text-[16px]">
                          Chọn kích thước, màu sắc và nhấn{" "}
                          <strong className="text-[rgb(var(--fifteenth-rgb))]">
                            Lưu
                          </strong>{" "}
                          để tùy chọn hình ảnh.
                        </span>
                      </DialogDescription>
                    </DialogHeader>
                    {!currentImage.startsWith("http") && !uploadedFile ? (
                      <div className="flex flex-col justify-center items-center gap-3">
                        <div className="w-full h-full flex justify-center text-gray-500 font-semibold items-center">
                          Vui lòng chọn hình ảnh để tùy chỉnh!
                        </div>
                        <DialogClose>
                          <div className="text-black bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500">
                            Quay về
                          </div>
                        </DialogClose>
                      </div>
                    ) : (
                      <>
                        <div className="flex flex-col lg:flex-row justify-center items-start gap-4 min-h-[500px]">
                          <div className="relative w-full h-full">
                            <Cropper
                              image={
                                originalImage ||
                                (uploadedFile
                                  ? URL.createObjectURL(uploadedFile)
                                  : IMAGES.LOGO)
                              }
                              crop={crop}
                              zoom={zoom}
                              aspect={getAspectRatio(selectedSize)}
                              onCropChange={setCrop}
                              onCropComplete={onCropComplete}
                              onZoomChange={setZoom}
                            />
                          </div>
                          <div className="flex flex-col gap-0 w-full lg:w-1/2">
                            <div>
                              <h2 className="text-[18px] font-medium mb-2">
                                Kích thước khung ảnh:
                              </h2>
                              <div className="grid grid-cols-4 gap-4 mb-4">
                                {sizeOptions.map((size) => (
                                  <button
                                    key={size.id}
                                    className={`border w-20 px-0 py-2 rounded-md ${
                                      selectedSize === size.id
                                        ? "border-yellow-500 bg-yellow-50"
                                        : "border-gray-300"
                                    }`}
                                    onClick={() => setSelectedSize(size.id)}
                                  >
                                    {size.label}
                                  </button>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h2 className="text-[18px] font-medium mb-2">
                                Màu sắc khung viền:
                              </h2>
                              {productsData?.color?.length < 0 ? (
                                <div className="mb-6">Không có</div>
                              ) : (
                                <div className="flex gap-4 mb-6">
                                  {colorOptions
                                    .filter((color) =>
                                      productsData.color?.includes(color.id)
                                    )
                                    .map((color) => (
                                      <button
                                        key={color.id}
                                        type="button"
                                        className={cn(
                                          "w-8 h-8 rounded-full transition-all border-2",
                                          color.bgColor,
                                          color.borderColor,
                                          selectedColor === color.id
                                            ? "ring-2 ring-offset-2 ring-[rgb(var(--fifteenth-rgb))]"
                                            : ""
                                        )}
                                        onClick={() =>
                                          setSelectedColor(color.id)
                                        }
                                      />
                                    ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button
                              type="button"
                              variant="secondary"
                              className="!px-10 !text-[16px]"
                            >
                              Huỷ
                            </Button>
                          </DialogClose>
                          <DialogClose asChild>
                            <Button
                              type="button"
                              onClick={handleCropSave}
                              className="!px-10 !text-[16px] !mb-3 lg:!mb-0 !bg-[rgb(var(--fifteenth-rgb))] hover:!bg-[rgb(var(--fifteenth-rgb))] hover:opacity-80 !text-white"
                              disabled={isLoading}
                            >
                              Lưu
                              {isLoading && (
                                <svg
                                  className="animate-spin ml-2 h-5 w-5"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  />
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                  />
                                </svg>
                              )}
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </>
                    )}
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
          <div className=" lg:hidden w-full md:w-1/2 space-y-6">
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
                  className="w-full px-3 py-2 pr-16 border border-gray-200 rounded-md mt-1 focus:border-none focus:!ring-2 focus:!ring-[rgb(var(--fifteenth-rgb))] outline-none h-[40px]"
                  style={{ fontSize: "16px" }}
                />
              </div>
              <div className="mb-0">
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
                  className="w-full px-3 py-2 pr-16 border border-gray-200 rounded-md mt-1 focus:border-none focus:!ring-2 focus:!ring-[rgb(var(--fifteenth-rgb))] outline-none h-[40px]"
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
                  <Dialog open={openProvinces} onOpenChange={setOpenProvinces}>
                    <DialogTrigger asChild>
                      <Input
                        readOnly
                        value={province || "Vui lòng chọn Tỉnh/Thành phố"}
                        className="text-left w-full px-3 py-2 pr-16 border border-gray-200 rounded-md cursor-pointer mt-1 text-[16px] h-[40px]"
                        onClick={() => setOpenProvinces(true)}
                      />
                    </DialogTrigger>
                    <DialogContent className="z-[70]">
                      <DialogHeader>
                        <DialogTitle>Vui lòng chọn Tỉnh/Thành phố</DialogTitle>
                        <DialogDescription className="max-h-96 overflow-y-auto">
                          <div className="my-3">
                            {provinces
                              .sort((a, b) =>
                                a.name.localeCompare(b.name, "vi-VN")
                              )
                              .map((province) => (
                                <div
                                  key={province.code}
                                  className="p-2"
                                  onClick={() => {
                                    handleProvinceChange(String(province.code));
                                  }}
                                >
                                  {HELPER.formatProvinceName(province.name)}
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
                        className="text-left w-full px-3 py-2 pr-16 border border-gray-200 rounded-md cursor-pointer mt-1 text-[16px] h-[40px]"
                        onClick={() => setOpenDistrict(true)}
                        disabled={!formData.province}
                      />
                    </DialogTrigger>
                    <DialogContent className="z-[70]">
                      <DialogHeader>
                        <DialogTitle>Vui lòng chọn Quận/Huyện</DialogTitle>
                        <DialogDescription className="max-h-96 overflow-y-auto">
                          <div className="my-3">
                            {/* <div className="p-2">
                              <Input
                                placeholder="Tìm kiếm quận/huyện..."
                                value={districtSearchTerm}
                                onChange={handleDistrictSearchChange}
                                onKeyDown={handleSearchKeyDown}
                                className="h-8 text-base focus:border-none focus:!ring-2 focus:!ring-[rgb(var(--fifteenth-rgb))] outline-none"
                              />
                            </div> */}
                            {districts
                              .sort((a, b) =>
                                HELPER.getNameForSorting(a.name).localeCompare(
                                  HELPER.getNameForSorting(b.name),
                                  "vi-VN"
                                )
                              )
                              .map((district) => (
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
                      className="text-left w-full px-3 py-2 pr-16 border border-gray-200 rounded-md cursor-pointer mt-1 text-[16px] h-[40px]"
                      onClick={() => setOpenWard(true)}
                      disabled={!formData.district}
                    />
                  </DialogTrigger>
                  <DialogContent className="z-[70]">
                    <DialogHeader>
                      <DialogTitle>Vui lòng chọn Phường/Xã</DialogTitle>
                      <DialogDescription className="max-h-96 overflow-y-auto">
                        <div className="my-3">
                          {/* <div className="p-2">
                            <Input
                              placeholder="Tìm kiếm phường/xã..."
                              value={wardSearchTerm}
                              onChange={handleWardSearchChange}
                              onKeyDown={handleSearchKeyDown}
                              className="h-8 text-base focus:border-none focus:!ring-2 focus:!ring-[rgb(var(--fifteenth-rgb))] outline-none"
                            />
                          </div> */}
                          {wards
                            .sort((a, b) =>
                              HELPER.getNameForSorting(a.name).localeCompare(
                                HELPER.getNameForSorting(b.name),
                                "vi-VN"
                              )
                            )
                            .map((ward) => (
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
              <div className="mb-0">
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
                  className="w-full mt-1 focus:border-none focus:!ring-2 focus:!ring-[rgb(var(--fifteenth-rgb))] outline-none h-[40px]"
                  style={{ fontSize: "16px" }}
                />
              </div>
            </div>
            {selectedProduct !== "Chon san pham" && (
              <>
                <div>
                  <div className="flex flex-row items-center gap-2 mb-2 relative z-20">
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
                <div>
                  <div className="flex flex-row items-center gap-2 mb-2 relative z-20">
                    <StickyNote className="w-5 h-5" />
                    <h2 className="text-lg lg:text-xl font-medium z-20 relative">
                      Thêm ghi chú cho đơn hàng
                    </h2>
                  </div>
                  <textarea
                    placeholder="Ghi chú về đơn hàng (Nếu có)"
                    className="w-full p-3 border border-gray-200 placeholder:text-[#64758B] rounded-md h-24 focus:!ring-2 focus:!ring-[rgb(var(--fifteenth-rgb))] outline-none"
                  ></textarea>
                </div>
              </>
            )}
          </div>
          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between font-light">
              <span>Giá sản phẩm</span>
              {selectedProduct !== "Chon san pham" ? (
                <div className="flex flex-row gap-2 ">
                  <span>
                    {discountProductPrice !== "none" &&
                      HELPER.formatVND(String(discountProductPrice))}
                  </span>
                  <span
                    className={`${
                      discountProductPrice !== "none" ? "line-through" : ""
                    }`}
                  >
                    {selectedProduct && HELPER.formatVND(productPrice)}
                  </span>
                </div>
              ) : (
                <span>Chọn sản phẩm</span>
              )}
            </div>
            <div className="flex justify-between font-light">
              <span>Phí vận chuyển</span>
              <span className="text-black">{HELPER.formatVND("0")}</span>
            </div>
            <div className="flex justify-between items-center pt-0 font-light">
              <span>Khuyến mãi</span>
              {selectedProduct === "Chon san pham" ? (
                <>
                  <span className="text-black">Chọn sản phẩm</span>
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
                          <div className="cursor-pointer text-white flex flex-row justify-center items-center gap-4 mx-auto py-1 px-3 lg:py-1 bg-[rgb(var(--fifteenth-rgb))] hover:bg-[] hover:opacity-80 text-center rounded-md font-medium transition">
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
                            className={`w-full border border-gray-300 rounded p-2 text-sm focus:border-2 focus:border-[rgb(var(--fifteenth-rgb))] focus:outline-none h-[40px] ${
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
                          isChecking ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        onClick={!isChecking ? handleCheckDiscount : undefined}
                      >
                        {isChecking ? "Đang kiểm tra..." : "Dùng mã"}
                      </div>
                    </DialogClose>
                  </DialogContent>
                </Dialog>
              )}
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
              <span>Tổng tiền</span>
              <span>
                {selectedProduct !== "Chon san pham"
                  ? selectedProduct &&
                    HELPER.calculateTotal(
                      discountProductPrice !== "none"
                        ? discountProductPrice
                        : productPrice,
                      "0",
                      discountPercent
                    )
                  : "0đ"}
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
              Bằng cách tiến hành mua hàng, bạn đã đồng ý với các{" "}
              <Link
                href={`${ROUTES.POLICY}`}
                className="text-[rgb(var(--fifteenth-rgb))] font-medium"
              >
                điều khoản và chính sách
              </Link>{" "}
              của chúng tôi.
            </p>
          </div>
          <div className="flex flex-row justify-between items-center mt-6">
            <button
              onClick={() => handleSubmit()}
              className="text-white flex flex-row justify-center items-center gap-2 w-full mx-auto py-2 lg:py-4 bg-[rgb(var(--fifteenth-rgb))] hover:opacity-80 text-center rounded-md font-medium transition"
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
        </div>
      </div>
    </div>
  );
};

export default Section01;
