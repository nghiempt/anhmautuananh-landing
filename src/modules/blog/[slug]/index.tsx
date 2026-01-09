import Footer from "@/layout/footer";
import Header from "@/layout/header";
import BlogsContentDetail from "./main";

export default function BlogsDetailPage() {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Header />
      <div className="w-full mb-20">
        <BlogsContentDetail />
      </div>
      <Footer />
    </div>
  );
}
