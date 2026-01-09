import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { OrderService } from "@/services/order";
import { toast } from "@/hooks/use-toast"; // Import toast for notifications
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";

interface CancelOrderModalProps {
  order: any;
  onCancelled: () => void;
}

const CancelOrderModal = ({ order, onCancelled }: CancelOrderModalProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      setIsLoading(true);
      const body = { status };
      await OrderService.updateOrder(id, body);
      toast({
        title: "Thành công",
        description: `Đơn hàng #${id} đã được hủy.`,
        className: "bg-green-500 text-white border-green-600",
      });
      router.refresh();
      onCancelled();
    } catch (error) {
      console.error("Error cancelling order:", error);
      toast({
        title: "Lỗi",
        description: "Không thể hủy đơn hàng. Vui lòng thử lại.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="text-red-600 hover:text-white hover:bg-red-600 text-base font-medium px-3 py-2 border border-red-600 hover:border-red-600 rounded transition-colors">
          Hủy đơn hàng
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] z-[70]">
        <DialogHeader>
          <DialogTitle className="!text-[20px]">
            Xác nhận hủy đơn hàng
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center lg:!text-center">
          <span className="!text-[16px] mb-3">
            Bạn có chắc chắn muốn hủy đơn hàng?
          </span>
          <br />
          <span className="!text-[16px]">
            Vui lòng bấm{" "}
            <strong className="!text-red-600 text-[16px]">Xác nhận</strong> để
            hủy.
          </span>
        </DialogDescription>
        <DialogFooter className="flex !flex-row !items-center !justify-center gap-3 w-full">
          <DialogClose>
            <Button
              type="button"
              variant="secondary"
              className="!px-10 !text-[16px] w-40 lg:w-44 !rounded"
            >
              Hủy
            </Button>
          </DialogClose>
          <Button
            type="button"
            variant="destructive"
            className="!px-10 !text-[16px] !bg-red-600 hover:opacity-80 w-40 lg:w-44 !rounded"
            onClick={() => handleUpdateStatus(order?._id, "cancelled")}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader className="animate-spin mr-2" size={18} />
                Đang xử lý
              </>
            ) : (
              "Xác nhận"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CancelOrderModal;
