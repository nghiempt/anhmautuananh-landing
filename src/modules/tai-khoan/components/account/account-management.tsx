"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AccountService } from "@/services/account";
import { Loader } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import "@/styles/hide-scroll.css";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/utils/route";
import Image from "next/image";
import { HELPER } from "@/utils/helper";

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
  _id?: string;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  address: string;
  ward?: string | number;
  district?: string | number;
  province?: string | number;
  provinceName?: string;
  districtName?: string;
  wardName?: string;
}

export interface FormData extends UserData {
  ward: number;
  district: number;
  province: number;
}

interface ProfileModalProps {
  customerAccount: UserData | null;
  onUpdate: (updatedData: UserData) => void;
}

const ProfileModal = ({ customerAccount, onUpdate }: ProfileModalProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const [openProvinces, setOpenProvinces] = useState(false);
  const [openDistrict, setOpenDistrict] = useState(false);
  const [openWard, setOpenWard] = useState(false);
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [loading, setLoading] = useState(false);
  const [provinceSearchTerm, setProvinceSearchTerm] = useState("");
  const [districtSearchTerm, setDistrictSearchTerm] = useState("");
  const [wardSearchTerm, setWardSearchTerm] = useState("");
  const [formData, setFormData] = useState<FormData>({
    name: customerAccount?.name || "",
    email: customerAccount?.email || "",
    avatar: customerAccount?.avatar || "",
    phone: customerAccount?.phone || "",
    address: customerAccount?.address || "",
    ward: Number(customerAccount?.ward) || 0,
    district: Number(customerAccount?.district) || 0,
    province: Number(customerAccount?.province) || 0,
  });

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

  React.useEffect(() => {
    if (formData.province) {
      const selectedProvince = provinces.find(
        (p) => Number(p.code) === formData.province
      );
      if (selectedProvince) {
        setDistricts(selectedProvince.districts);
        const selectedDistrict = selectedProvince.districts.find(
          (d) => Number(d.code) === formData.district
        );
        setProvince(selectedProvince.name);
        if (selectedDistrict) {
          setDistrict(selectedDistrict.name);
          setWards(selectedDistrict.wards);
          const selectedWard = selectedDistrict.wards.find(
            (w) => Number(w.code) === formData.ward
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
        setLoading(true);
        const response = await fetch(
          "https://provinces.open-api.vn/api/?depth=3"
        );
        const data = await response.json();
        const formattedData = data.map((province: any) => ({
          ...province,
          code: province.code.toString(),
          districts: province.districts.map((district: any) => ({
            ...district,
            code: district.code.toString(),
            wards: district.wards.map((ward: any) => ({
              ...ward,
              code: ward.code.toString(),
            })),
          })),
        }));
        setProvinces(formattedData);
      } catch (error) {
        console.error("Error fetching provinces:", error);
        toast({
          title: "Lỗi",
          description: "Không thể tải dữ liệu tỉnh/thành phố",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchProvinces();
  }, [toast]);

  // React.useEffect(() => {
  //   if (formData.province) {
  //     const selectedProvince = provinces.find(
  //       (p) => p.code === formData.province
  //     );
  //     if (selectedProvince) {
  //       setDistricts(selectedProvince.districts);
  //       setWards([]);
  //       if (formData.district) {
  //         const selectedDistrict = selectedProvince.districts.find(
  //           (d) => d.code === formData.district
  //         );
  //         if (selectedDistrict) {
  //           setWards(selectedDistrict.wards);
  //         }
  //       }
  //     } else {
  //       setDistricts([]);
  //       setWards([]);
  //     }
  //   }
  // }, [formData.province, formData.district, provinces]);

  // useEffect(() => {
  //   const fetchAccount = async () => {
  //       try {

  //         const selectedProvince = provinces.find(
  //           (p) => p.code === Number(data.province)
  //         );
  //         if (selectedProvince) {
  //           setProvince(selectedProvince.name);
  //           setDistricts(selectedProvince.districts);

  //           const selectedDistrict = selectedProvince.districts.find(
  //             (d) => d.code === Number(data.district)
  //           );
  //           if (selectedDistrict) {
  //             setDistrict(selectedDistrict.name);
  //             setWards(selectedDistrict.wards);

  //             const selectedWard = selectedDistrict.wards.find(
  //               (w) => w.code === Number(data.ward)
  //             );
  //             if (selectedWard) {
  //               setWard(selectedWard.name);
  //             }
  //           }
  //         }
  //       } catch (error) {
  //         console.error("Error fetching account:", error);
  //       }
  //     }
  //   };

  //   if (provinces.length > 0) {
  //     fetchAccount();
  //   }
  //   renderProduct();
  // }, [isLogin, provinces]);

  React.useEffect(() => {
    if (formData.province && provinces.length > 0) {
      const selectedProvince = provinces.find(
        (p) => Number(p.code) === formData.province
      );
      if (selectedProvince) {
        setProvince(selectedProvince.name);
        setDistricts(selectedProvince.districts);

        if (formData.district) {
          const selectedDistrict = selectedProvince.districts.find(
            (d) => Number(d.code) === formData.district
          );
          if (selectedDistrict) {
            setDistrict(selectedDistrict.name);
            setWards(selectedDistrict.wards);

            if (formData.ward) {
              const selectedWard = selectedDistrict.wards.find(
                (w) => Number(w.code) === formData.ward
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
    // setFormData((prev) => ({
    //   ...prev,
    //   province: provinceCode,
    //   district: "",
    //   ward: "",
    // }));

    const selectedProvince = provinces.find(
      (p) => Number(p.code) === Number(provinceCode)
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
    // setFormData((prev) => ({
    //   ...prev,
    //   district: districtCode,
    //   ward: "",
    // }));

    const selectedDistrict = districts.find(
      (d) => Number(d.code) === Number(districtCode)
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

  const handleWardChange = (wardCode: string) => {
    // setFormData((prev) => ({
    //   ...prev,
    //   ward: wardCode,
    // }));

    const selectedWard = wards.find((w) => Number(w.code) === Number(wardCode));
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

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập tên!",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.address.trim()) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập địa chỉ giao hàng!",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.province || !formData.district || !formData.ward) {
      toast({
        title: "Lỗi",
        description:
          "Vui lòng chọn đầy đủ Tỉnh/Thành phố, Quận/Huyện, Phường/Xã.",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.phone.trim()) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập số điện thoại!",
        variant: "destructive",
      });
      return false;
    }

    const phoneRegex = /^\d{10,11}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast({
        title: "Lỗi",
        description:
          "Số điện thoại phải là một dãy số hợp lệ (10 đến 11 chữ số)!",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const selectedProvince = provinces.find(
        (p) => Number(p.code) === formData.province
      );
      const selectedDistrict = districts.find(
        (d) => Number(d.code) === formData.district
      );
      const selectedWard = wards.find((w) => Number(w.code) === formData.ward);

      const formattedData = {
        ...formData,
        provinceName: selectedProvince?.name || "",
        districtName: selectedDistrict?.name || "",
        wardName: selectedWard?.name || "",
      };

      if (customerAccount?._id) {
        const response = await AccountService.updateAccount(
          customerAccount._id,
          formattedData
        );
        if (response === false) {
          toast({
            title: "Lỗi",
            description: "Số điện thoại đã được sử dụng!",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Thành công",
            description: "Cập nhật thông tin thành công!",
            className: "bg-green-500 text-white",
          });
          onUpdate(formattedData);
          setOpen(false);
          router.push(ROUTES.ACCOUNT);
        }
      }
    } catch (error) {
      console.error("Error updating account:", error);
      toast({
        title: "Lỗi",
        description: "Đã có lỗi xảy ra khi cập nhật thông tin!",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateDOM = () => {
    if (customerAccount) {
      setFormData({
        name: customerAccount.name || "",
        email: customerAccount.email || "",
        avatar: customerAccount.avatar || "",
        phone: customerAccount.phone || "",
        address: customerAccount.address || "",
        ward: Number(customerAccount.ward) || 0,
        district: Number(customerAccount.district) || 0,
        province: Number(customerAccount.province) || 0,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          onClick={updateDOM}
          className="bg-[rgb(var(--fifteenth-rgb))] text-white hover:bg-[rgb(var(--fifteenth-rgb))] hover:opacity-80 px-4 py-2 rounded text-[16px] font-medium transition-colors"
        >
          Cập nhật thông tin
        </button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px] max-h-[90vh] z-[70]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader className="px-1">
          <DialogTitle className="!text-[20px]">
            Chỉnh sửa thông tin
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 max-h-[80vh] overflow-y-auto z-[70] scroll-bar-style px-1">
          <div className="grid gap-2.5">
            <div className="w-full flex justify-center mt-3">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                {formData.avatar ? (
                  <Image
                    src={formData.avatar}
                    alt="Avatar"
                    className="w-full h-full rounded-full object-cover"
                    width={96}
                    height={96}
                  />
                ) : (
                  <svg
                    className="w-10 h-10 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-[16px]">
                Họ và tên
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="focus:border-none focus:!ring-2 focus:!ring-[rgb(var(--fifteenth-rgb))] outline-none h-[40px]"
                style={{ fontSize: "16px" }}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-[16px]">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email || "Không có email"}
                disabled={true}
                style={{ fontSize: "16px" }}
                className=" h-[40px]"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone" className="text-[16px]">
                Số điện thoại
              </Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="focus:border-none focus:!ring-2 focus:!ring-[rgb(var(--fifteenth-rgb))] outline-none h-[40px]"
                style={{ fontSize: "16px" }}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="province" className="text-[16px]">
                Tỉnh/Thành phố
              </Label>
              <Select
                value={formData.province ? String(formData.province) : ""}
                onValueChange={handleProvinceChange}
                disabled={loading}
              >
                <SelectTrigger className="text-[16px] focus:border-none focus:!ring-2 focus:!ring-[rgb(var(--fifteenth-rgb))] outline-none h-[40px]">
                  <SelectValue placeholder="Chọn Tỉnh/Thành phố" />
                </SelectTrigger>
                <SelectContent className="z-[80]">
                  {/* <div className="p-2">
                    <Input
                      placeholder="Tìm kiếm tỉnh/thành phố..."
                      value={provinceSearchTerm}
                      onChange={handleProvinceSearchChange}
                      onKeyDown={handleSearchKeyDown}
                      className="h-8 text-base focus:border-none focus:!ring-2 focus:!ring-[rgb(var(--fifteenth-rgb))] outline-none"
                    />
                  </div> */}
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
            <div className="grid gap-2">
              <Label htmlFor="district" className="text-[16px]">
                Quận/Huyện
              </Label>
              <Select
                value={formData.district ? String(formData.district) : ""}
                onValueChange={handleDistrictChange}
                disabled={!formData.province || loading}
              >
                <SelectTrigger className="text-[16px] focus:border-none focus:!ring-2 focus:!ring-[rgb(var(--fifteenth-rgb))] outline-none h-[40px]">
                  <SelectValue placeholder="Chọn Quận/Huyện" />
                </SelectTrigger>
                <SelectContent className="z-[80]">
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
            <div className="grid gap-2">
              <Label htmlFor="ward" className="text-[16px]">
                Phường/Xã
              </Label>
              <Select
                value={formData.ward ? String(formData.ward) : ""}
                onValueChange={handleWardChange}
                disabled={!formData.district || loading}
              >
                <SelectTrigger className="text-[16px] focus:border-none focus:!ring-2 focus:!ring-[rgb(var(--fifteenth-rgb))] outline-none h-[40px]">
                  <SelectValue placeholder="Chọn Phường/Xã" />
                </SelectTrigger>
                <SelectContent className="z-[80]">
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
                      <SelectItem key={ward.code} value={String(ward.code)}>
                        {ward.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address" className="text-[16px]">
                Số nhà, tên đường
              </Label>
              <Input
                id="address"
                name="address"
                placeholder="Ví dụ: 123 Đường ABC"
                value={formData.address}
                onChange={handleInputChange}
                className="focus:border-none focus:!ring-2 focus:!ring-[rgb(var(--fifteenth-rgb))] outline-none h-[40px]"
                style={{ fontSize: "16px" }}
              />
            </div>
          </div>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="text-[16px] w-full bg-[rgb(var(--fifteenth-rgb))] hover:bg-[rgb(var(--fifteenth-rgb))] hover:opacity-80 text-white flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed rounded"
          >
            Lưu thay đổi
            {loading && <Loader className="animate-spin" size={20} />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;
