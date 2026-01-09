"use client";

import { toast } from "@/hooks/use-toast";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { Loader, User } from "lucide-react";
import { IMAGES } from "@/utils/image";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { AccountService } from "@/services/account";

export interface Province {
  code: string;
  codename: string;
  districts: District[];
  division_type: string;
  name: string;
  phone_code: number;
}

export interface District {
  code: string;
  codename: string;
  division_type: string;
  name: string;
  short_codename: string;
  wards: Ward[];
}

export interface Ward {
  code: string;
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
  ward?: string;
  district?: string;
  province?: string;
}

export interface FormData {
  password: string;
  newPassword: string;
  confirmPassword: string;
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

interface ChangePasswordFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ChangePasswordForm = ({ open, setOpen }: ChangePasswordFormProps) => {
  const emailCookie = Cookies.get("isLogin");
  const isLogin = Cookies.get("isLogin");
  const [loading, setLoading] = React.useState(false);
  const [customerAccount, setCustomerAccount] =
    useState<CustomerAccount | null>(null);
  const router = useRouter();

  const [formData, setFormData] = React.useState<FormData>({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [oldformData, setOldFormData] = React.useState<FormData>({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchAccount = async () => {
      if (isLogin) {
        try {
          const data = await AccountService.getAccountById(isLogin);
          setCustomerAccount(data);
        } catch (error) {
          console.error("Error fetching account:", error);
        }
      }
    };

    fetchAccount();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const areEqual =
      formData.password === oldformData.password &&
      formData.newPassword === oldformData.newPassword &&
      formData.confirmPassword === oldformData.confirmPassword;
    if (areEqual) {
      toast({
        title: "",
        description: "Không có thay đổi nào được thực hiện!",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(.{8,})$/;

    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: "Lỗi",
        description: "Mật khẩu mới và xác nhận mật khẩu không khớp.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    if (!passwordRegex.test(formData.newPassword)) {
      toast({
        title: "Lỗi bảo mật",
        description:
          "Mật khẩu mới phải có ít nhất 8 ký tự, 1 số và 1 ký tự đặc biệt.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    const formattedData = {
      oldPassword: formData.password,
      newPassword: formData.newPassword,
    };
    try {
      const response = await AccountService.changePassword(
        customerAccount?._id,
        formattedData
      );

      if (!response) {
        toast({
          title: "Lỗi",
          description: "Mật khẩu cũ không chính xác.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Thành công",
          description: "Mật khẩu đã được thay đổi thành công.",
          variant: "default",
        });

        setFormData({
          password: "",
          newPassword: "",
          confirmPassword: "",
        });

        setOpen(false);
      }
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Đã xảy ra lỗi khi thay đổi mật khẩu.",
        variant: "destructive",
      });
      console.error("Error changing password:", error);
    }
    setLoading(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="border border-[rgb(var(--fifteenth-rgb))] hover:bg-[rgb(var(--fifteenth-rgb))] hover:text-white text-[rgb(var(--fifteenth-rgb))] px-4 py-2 rounded text-[16px] font-medium transition-colors">
          Đổi mật khẩu
        </button>
      </DialogTrigger>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="sm:max-w-[525px] z-[70]"
      >
        <div className="flex-1">
          <div className="max-w-2xl">
            <h1 className="text-xl font-semibold mb-3">Đổi mật khẩu</h1>
            <form
              // onSubmit={handleSubmit}
              className="space-y-3"
            >
              <div className="flex flex-col justify-between items-start lg:items-start gap-2">
                <Label
                  htmlFor="password"
                  className="text-black w-full lg:w-2/6 text-[16px]"
                >
                  Mật khẩu cũ:
                </Label>
                <div className="w-full">
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Nhập mật khẩu cũ"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 pr-16 rounded-md focus:border-none focus:!ring-2 focus:!ring-[rgb(var(--fifteenth-rgb))] outline-none h-[40px]"
                    style={{ fontSize: "16px" }}
                  />
                </div>
              </div>
              <div className="flex flex-col justify-between items-start lg:items-start gap-2">
                <Label
                  htmlFor="newPassword"
                  className="text-black w-full lg:w-2/6"
                >
                  Mật khẩu mới:
                </Label>
                <div className=" w-full">
                  <Input
                    type="newPassword"
                    name="newPassword"
                    placeholder="Nhập mật khẩu mới"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 pr-16 rounded-md focus:border-none focus:!ring-2 focus:!ring-[rgb(var(--fifteenth-rgb))] outline-none h-[40px]"
                    style={{ fontSize: "16px" }}
                  />
                </div>
              </div>
              <div className="flex flex-col justify-between items-start lg:items-start gap-2">
                <Label htmlFor="confirmPassword" className="text-black w-full">
                  Xác nhận mật khẩu mới:
                </Label>
                <div className="w-full">
                  <Input
                    id="confirmPassword"
                    type="confirmPassword"
                    name="confirmPassword"
                    placeholder="Nhập lại mật khẩu mới"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 pr-16 border border-gray-200 rounded-md focus:border-none focus:!ring-2 focus:!ring-[rgb(var(--fifteenth-rgb))] outline-none h-[40px]"
                    style={{ fontSize: "16px" }}
                  />
                </div>
              </div>
              <div className="mt-8 flex justify-center items-center">
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  className="text-[16px] w-full lg:w-full py-2 px-4 mt-2 bg-[rgb(var(--fifteenth-rgb))] hover:bg-[rgb(var(--fifteenth-rgb))] hover:opacity-80 text-white font-medium transition-colors rounded"
                >
                  Lưu thay đổi
                  {loading && <Loader className="animate-spin" size={48} />}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordForm;
