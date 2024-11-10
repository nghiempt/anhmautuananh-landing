import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Head from "next/head";

const inter = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ảnh Màu Tuấn Anh",
  description:
    "In Ảnh Trực Tuyến chỉnh sửa hoàn toàn Miễn phí. In Ảnh Trực Tuyến quá dễ dàng. Chọn những tấm ảnh yêu thích & tải lên trình chỉnh sửa trực tuyến của chúng tôi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta
          name="dmca-site-verification"
          content="T3FSSjRuQzlkZWVvallqaG1iTWVXcjRrL1FpUE9LV3F6bzNWZnNRSnlzYz01"
        />
      </Head>
      <body className={inter.className} suppressHydrationWarning={true}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
