import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Head from "next/head";

const inter = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ảnh Màu Tuấn Anh",
  description:
    "Cung cấp các sản phẩm chất lượng cao giá rẻ về In Ấn, Khung Ảnh và Album. Giao hàng tận nơi.",
  openGraph: {
    title: "Ảnh Màu Tuấn Anh",
    description:
      "Cung cấp các sản phẩm chất lượng cao giá rẻ về In Ấn, Khung Ảnh và Album. Giao hàng tận nơi.",
    url: "https://anhmautuananh.com",
    images: [
      {
        url: "https://res.cloudinary.com/farmcode/image/upload/v1742393585/iatt/nayu23nsyno2btobqmj2.png",
        width: 1200,
        height: 630,
        alt: "Ảnh Màu Tuấn Anh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ảnh Màu Tuấn Anh",
    description:
      "Cung cấp các sản phẩm chất lượng cao giá rẻ về In Ấn, Khung Ảnh và Album. Giao hàng tận nơi.",
    images: [
      "https://res.cloudinary.com/farmcode/image/upload/v1742393585/iatt/nayu23nsyno2btobqmj2.png",
    ],
  },
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
