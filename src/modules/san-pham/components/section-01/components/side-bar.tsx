import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import SliderRange from "@/components/ui/comp-251";
import Image from "next/image";
import { HELPER } from "@/utils/helper";
import "@/styles/hide-scroll.css";
import { useProduct } from "../../product-context";
import { useRouter, useSearchParams } from "next/navigation";
import { slugifyURL } from "@/utils/slugify";

interface Product {
  _id: string;
  name: string;
  description: string;
  introduction: string;
  product_option: [
    {
      size: string;
      price: string;
    }
  ];
  category: string;
  color: string[];
  thumbnail: string;
  discount: string;
  rating: string;
  images: string[];
  sold: number;
  created_at: string;
}

interface SidebarProps {
  onFilterChange: (filters: any) => void;
  products: Product[];
  sizes: string[];
}

const Sidebar: React.FC<SidebarProps> = ({
  onFilterChange,
  products,
  sizes,
}) => {
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({
    fashion: false,
    furniture: true,
    jewelry: false,
    organic: false,
    plant: false,
  });

  const [priceRange, setPriceRange] = useState([0, 820000]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const router = useRouter();
  const searchParams = useSearchParams();

  const filterProducts = useCallback(() => {
    let filtered = [...products];

    // Category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Price range filter
    filtered = filtered.filter((product) => {
      const price = parseFloat(product.product_option[0].price);
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Color filter
    if (selectedColors.length > 0) {
      filtered = filtered.filter((product) =>
        product.color.some((color) => selectedColors.includes(color))
      );
    }

    // Size filter
    if (selectedSizes.length > 0) {
      filtered = filtered.filter((product) =>
        product.product_option.some((option) =>
          selectedSizes.includes(option.size)
        )
      );
    }

    return filtered;
  }, [products, selectedCategory, priceRange, selectedColors, selectedSizes]);

  // Update filters whenever any filter criteria changes
  useEffect(() => {
    const filteredProducts = filterProducts();
    onFilterChange({
      category: selectedCategory === "All" ? null : selectedCategory,
      priceRange: priceRange,
      colors: selectedColors.length > 0 ? selectedColors : null,
      sizes: selectedSizes.length > 0 ? selectedSizes : null,
      filteredProducts: filteredProducts,
    });
  }, [
    filterProducts,
    onFilterChange,
    selectedCategory,
    priceRange,
    selectedColors,
    selectedSizes,
  ]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const categories = [
    { id: "All", name: "Tất cả", hasSubcategories: false },
    { id: "Plastic", name: "In ảnh rời", hasSubcategories: false },
    {
      id: "Plastic-Frame",
      name: "In ảnh có khung viền",
      hasSubcategories: false,
    },
    { id: "Frame", name: "Khung lẻ", hasSubcategories: false },
    { id: "Album", name: "Album/Photobook", hasSubcategories: false },
  ];

  const colors = ["black", "white", "gold", "silver", "wood"];

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showTopGradient, setShowTopGradient] = useState(false);
  const [showBottomGradient, setShowBottomGradient] = useState(true);

  // Handle scroll for size filter
  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } =
          scrollContainerRef.current;
        setShowTopGradient(scrollTop > 0);
        setShowBottomGradient(scrollTop + clientHeight < scrollHeight);
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      handleScroll();
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className="w-full lg:w-64 bg-white h-full overflow-y-auto py-10 lg:py-8 pr-5">
      {/* Product Categories */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-black mb-4">
          Phân loại sản phẩm
        </h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id}>
              <div
                className="flex items-center justify-between cursor-pointer py-1 hover:text-gray-600"
                onClick={() => {
                  setSelectedCategory(category.id);
                  if (category.hasSubcategories) {
                    toggleSection(category.id);
                  }
                }}
              >
                <div className="flex items-center">
                  <div
                    className={`w-3.5 h-3.5 rounded-full mr-3 ${
                      selectedCategory === category.id
                        ? "bg-[rgb(var(--fifteenth-rgb))]"
                        : "border border-gray-300"
                    }`}
                  />
                  <span className="text-gray-700 hover:text-[rgb(var(--fifteenth-rgb))]">
                    {category.name}
                  </span>
                </div>
                {category.hasSubcategories &&
                  (expandedSections[category.id] ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-black mb-4">Giá</h3>
        <div className="space-y-4">
          <SliderRange
            value={priceRange}
            onValueChange={setPriceRange}
            min={0}
            max={2000000}
            step={1}
          />
        </div>
      </div>

      {/* Color Filter */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-black mb-4">Màu sắc</h3>
        <div className="flex flex-wrap gap-2">
          {colors.map((color, index) => (
            <button
              key={index}
              className={`w-6 h-6 rounded-full border-2 ${
                selectedColors.includes(color)
                  ? "border-gray-800"
                  : "border-gray-300"
              } ${HELPER.renderColor(color)}`}
              onClick={() => {
                setSelectedColors((prev) =>
                  prev.includes(color)
                    ? prev.filter((c) => c !== color)
                    : [...prev, color]
                );
              }}
            />
          ))}
        </div>
      </div>

      {/* Size Filter */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-black mb-4">Kích thước</h3>
        <div className="relative">
          <div
            className={`absolute top-0 inset-x-0 bg-gradient-to-b from-white z-20 to-transparent pointer-events-none transition-opacity duration-300 ${
              showTopGradient ? "opacity-100" : "opacity-0"
            }`}
            style={{ height: "60px" }}
          />
          <div
            className="relative space-y-2 h-80 overflow-y-auto scroll-bar-style"
            ref={scrollContainerRef}
          >
            {sizes?.map((size) => (
              <label key={size} className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2 rounded"
                  checked={selectedSizes.includes(size)}
                  onChange={(e) => {
                    setSelectedSizes((prev) =>
                      e.target.checked
                        ? [...prev, size]
                        : prev.filter((s) => s !== size)
                    );
                  }}
                />
                <span className="text-gray-700">{size}</span>
              </label>
            ))}
          </div>
          <div
            className={`absolute bottom-0 inset-x-0 bg-gradient-to-t from-white to-transparent pointer-events-none transition-opacity duration-300 ${
              showBottomGradient ? "opacity-100" : "opacity-0"
            }`}
            style={{ height: "60px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
