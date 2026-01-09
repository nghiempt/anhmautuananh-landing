import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ProductProvider } from "@/modules/san-pham/components/product-context";
import { ReduxProvider } from "@/providers/ReduxProvider";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.anhmautuananh.com"),
  title: "Ảnh Màu Tuấn Anh",
  description:
    "Cung cấp các sản phẩm chất lượng cao về Khung Ảnh, Album.",
  openGraph: {
    title: "Ảnh Màu Tuấn Anh",
    description:
      "Cung cấp các sản phẩm chất lượng cao về Khung Ảnh, Album.",
    url: "https://www.anhmautuananh.com/",
    siteName: "Ảnh Màu Tuấn Anh",
    images: [
      {
        url: "https://res.cloudinary.com/farmcode/image/upload/v1757376935/iatt/bg-full_hahqqi.png",
        width: 1200,
        height: 630,
        alt: "Ảnh Màu Tuấn Anh",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Schema.org JSON-LD giúp Google hiểu tên thương hiệu & domain
  const siteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://www.inanhhathu.com/",
    name: "Ảnh Màu Tuấn Anh",
    alternateName: ["In Anh Ha Thu", "Ảnh Màu Tuấn Anh - In ảnh & khung ảnh"],
    publisher: {
      "@type": "Organization",
      name: "Ảnh Màu Tuấn Anh",
      url: "https://www.inanhhathu.com/",
      logo: {
        "@type": "ImageObject",
        url: "https://res.cloudinary.com/farmcode/image/upload/v1757376935/iatt/bg-full_hahqqi.png",
      },
    },
  };

  return (
    <html lang="vi">
      <head>
        <title>Ảnh Màu Tuấn Anh</title>
        <meta
          name="description"
          content="Chỉnh sửa ảnh miễn phí và Ảnh Màu Tuấn Anh dễ dàng. Tải lên những tấm ảnh yêu thích và bắt đầu chỉnh sửa ngay!"
        />
        <meta property="og:site_name" content="Ảnh Màu Tuấn Anh" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="vi_VN" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Ảnh Màu Tuấn Anh" />
        <meta
          property="twitter:description"
          content="Ảnh Màu Tuấn Anh - In ảnh, chỉnh sửa ảnh và lưu giữ kỷ niệm dễ dàng!"
        />
        <meta
          property="twitter:image"
          content="https://res.cloudinary.com/farmcode/image/upload/v1757376935/iatt/bg-full_hahqqi.png"
        />
      </head>
      <body suppressHydrationWarning={true}>
        <GoogleAnalytics gaId="G-ZS4CC8H5VQ" />
        <ReduxProvider>
          <ProductProvider>
            {children}
            <Toaster />
          </ProductProvider>
        </ReduxProvider>
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
      </body>
    </html>
  );
}
