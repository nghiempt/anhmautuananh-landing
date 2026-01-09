import { useId } from "react";
import { Label } from "@/components/ui/label";
import { SelectNative } from "@/components/ui/select-native";
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
interface SelectionProps {
  products: Product[];
  onSortChange: (sortedProducts: Product[]) => void; // Callback to update sorted products
}

export default function Selection({ products, onSortChange }: SelectionProps) {
  const id = useId();

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sortOption = event.target.value;
    let sortedProducts = [...products]; // Create a copy of products array

    switch (sortOption) {
      case "1": // Sort by latest created_at
        sortedProducts.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        break;
      case "2": // Sort by price: Low to High
        sortedProducts.sort((a, b) => {
          const priceA = parseFloat(a.product_option[0].price);
          const priceB = parseFloat(b.product_option[0].price);
          return priceA - priceB;
        });
        break;
      case "3": // Sort by price: High to Low
        sortedProducts.sort((a, b) => {
          const priceA = parseFloat(a.product_option[0].price);
          const priceB = parseFloat(b.product_option[0].price);
          return priceB - priceA;
        });
        break;
      default:
        sortedProducts = products; // No sorting if default is selected
        break;
    }

    onSortChange(sortedProducts); // Pass sorted products to parent
  };

  return (
    <div className="*:not-first:mt-2">
      <SelectNative id={id} defaultValue="" onChange={handleSortChange}>
        <option value="" disabled>
          Sắp xếp theo
        </option>
        <option value="1">Mới nhất</option>
        <option value="2">Giá thấp đến cao</option>
        <option value="3">Giá cao đến thấp</option>
      </SelectNative>
    </div>
  );
}
