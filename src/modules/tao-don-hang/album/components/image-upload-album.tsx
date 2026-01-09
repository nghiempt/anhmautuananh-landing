import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageUploadAlbumProps {
  onImageChange: (file: File | null) => void;
  className?: string;
}

const ImageUploadAlbum = ({
  onImageChange,
  className,
}: ImageUploadAlbumProps) => {
  const [preview, setPreview] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const containerStyle = {
    width: "100%",
    height: "400px",
    position: "relative" as const,
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("File quá lớn. Vui lòng chọn file nhỏ hơn 5MB");
      return;
    }
    if (!file.type.startsWith("image/")) {
      alert("Vui lòng chọn file hình ảnh");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    onImageChange(file);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Vui lòng chọn file hình ảnh");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    onImageChange(file);
  };

  return (
    <div className={cn("w-full", className)} style={containerStyle}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      {!preview ? (
        <div
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="mt-1 flex w-full h-full items-center justify-center rounded-md border-2 border-dashed border-gray-300 bg-white text-sm font-medium text-gray-900 hover:bg-gray-50 hover:text-primary-700 cursor-pointer"
        >
          <div className="flex flex-col items-center gap-2">
            <svg
              className="h-8 w-8"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span>Tải hình lên</span>
            <span className="text-xs text-gray-500">
              hoặc kéo thả file vào đây
            </span>
          </div>
        </div>
      ) : (
        <div className="relative h-full group rounded-md">
          <Image
            src={preview}
            alt="Preview"
            fill
            priority
            className="rounded-md object-cover border-8 border-gray-200"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploadAlbum;
