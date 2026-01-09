"use client";

import { toast } from "@/hooks/use-toast";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import Cookies from "js-cookie";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Loader, User, Eye, EyeOff } from "lucide-react";
import { IMAGES } from "@/utils/image";
import { API } from "@/utils/api";
import { AccountService } from "@/services/account";
import { ROUTES } from "@/utils/route";
interface LoginFormProps {
  onLogin: (username: string, password: string) => Promise<void>;
}

const LoginFormMobile = ({ onLogin }: LoginFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Kiểm tra query parameter để mở login form tự động
  useEffect(() => {
    const openLogin = searchParams.get('openLogin');
    if (openLogin === 'true') {
      setIsOpen(true);
    }
  }, [searchParams]);

  const handleSubmitWithGoogle = async (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = API.AUTH.LOGIN_WITH_GOOGLE;
  };

  const validateForm = () => {
    if (!username || !password) {
      toast({
        variant: "destructive",
        title: "Vui lòng điền đầy đủ thông tin",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await onLogin(username, password);
      setIsOpen(false); // Đóng dialog sau khi đăng nhập thành công
      
      // Redirect về route gốc nếu có
      const redirectPath = searchParams.get('redirect');
      if (redirectPath) {
        // Xóa query parameters và redirect
        const url = new URL(window.location.href);
        url.searchParams.delete('openLogin');
        url.searchParams.delete('redirect');
        router.replace(redirectPath);
      } else {
        // Xóa query parameters
        const url = new URL(window.location.href);
        url.searchParams.delete('openLogin');
        router.replace(url.pathname + url.search, { scroll: false });
      }
    } catch (error) {
      console.error("========= Error Login:", error);
      toast({
        variant: "destructive",
        title: "Email hoặc mật khẩu chưa chính xác",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="w-full flex items-center justify-center space-x-1 text-black hover:text-gray-900 transition-colors">
          <span className="text-[16px] font-medium">Đăng nhập</span>
          {/* <User className="w-5 h-5" /> */}
        </div>
      </DialogTrigger>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="max-w-[350px] lg:max-w-[425px] rounded-lg z-[70]"
      >
        <div className="w-full h-full flex flex-col justify-center items-center">
          <div className="flex w-full">
            <div className="w-full flex flex-col">
              <div className="mb-1">
                <div className="flex justify-start items-center gap-4">
                  <h1 className="text-2xl font-bold">Đăng nhập</h1>
                </div>
              </div>
              <div className="mt-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label
                      // htmlFor="email"
                      className="text-[16px] font-medium flex items-center"
                    >
                      Email <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      id="username"
                      type="text"
                      placeholder="Nhập username hoặc số điện thoại"
                      className="w-full p-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-[rgb(var(--fifteenth-rgb))] focus:border-transparent h-[40px]"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="password"
                      className="text-[16px] font-medium flex items-center"
                    >
                      Mật khẩu <span className="text-red-500 ml-1">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Nhập mật khẩu"
                        className="w-full p-3 rounded-md border pr-10 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--fifteenth-rgb))] focus:border-transparent h-[40px]"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="w-full flex justify-center items-center gap-2">
                    <Button
                      onClick={() => handleSubmit()}
                      className="w-full text-[16px] py-6 bg-[rgb(var(--fifteenth-rgb))] hover:bg-[rgb(var(--fifteenth-rgb))] hover:opacity-85 text-white rounded-md"
                    >
                      {isLoading ? "Vui lòng đợi" : "Đăng nhập"}{" "}
                      {isLoading && (
                        <Loader className="animate-spin" size={48} />
                      )}
                    </Button>
                    <Button
                      onClick={(e: any) => handleSubmitWithGoogle(e)}
                      className="w-16 text-[14px] py-6 bg-gray-100 hover:bg-gray-200 text-white rounded-md"
                    >
                      <Image
                        src={IMAGES.GG_LOGO}
                        alt="loading"
                        className="w-full h-auto rounded-full"
                        width={1000}
                        height={0}
                      />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginFormMobile;
