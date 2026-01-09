import { ChevronRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import React from "react";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  linkText: string;
}

const FeatureCard: React.FC<FeatureProps> = ({
  icon,
  title,
  description,
  linkText,
}) => {
  return (
    <div className="text-center p-8 group cursor-pointer h-full flex flex-col justify-between">
      <div>
        <div className="flex justify-center mb-6">
          <div className="text-gray-800 group-hover:text-gray-600 transition-colors">
            {icon}
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
      </div>
      <button
        onClick={() => {
          toast({
            variant: "default",
            title: "Thông báo",
            description: "Chức năng đang được phát triển.",
          });
        }}
        className="text-sm flex items-center justify-center mx-auto text-gray-700 hover:text-[rgb(var(--fifteenth-rgb))] font-bold transition-colors group"
      >
        {linkText}
        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
};

export default FeatureCard;
