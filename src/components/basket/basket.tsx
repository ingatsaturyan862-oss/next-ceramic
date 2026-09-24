"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import { BasketCard } from "./basket-card";
import { BasketTotal } from "./basket-total";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
} from "../ui/breadcrumb";
import { toast } from "sonner";
import { useBasket } from "@/hooks/use-basket";
import { BasketItemDTO } from "@/@types/basket";

interface Props {
  className?: string;
}

export const Basket: React.FC<Props> = (props) => {
  const { className } = props;
  const {
    basket,
    removeProduct,
    updateProduct,
    quantity,
    clearBasket,
    isLoading,
    error,
  } = useBasket();

  const deleteAll = () => {
    clearBasket();
    toast.success("clear basket");
  };

  return (
    <div
      className={cn(
        "max-w-6xl mx-auto px-4 py-8 bg-white text-[#3a3845]",
        className,
      )}
    >
      <Breadcrumb className="pt-5 pb-12.5">
        <BreadcrumbList className="flex">
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          /
          <BreadcrumbItem>
            <BreadcrumbPage>Shopping Cart</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-2xl font-medium mb-6">Cart ({quantity} item)</h1>

      {basket.items?.length === 0 ? (
        <div className="text-center py-12 text-gray-500">Basket is empty:</div>
      ) : (
        <div className="flex flex-col gap-8 items-end">
          <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse text-left min-w-150">
              <thead>
                <tr className="bg-primary text-white text-xs tracking-wider uppercase">
                  <th className="p-3 text-center w-12">
                    <button onClick={deleteAll}>
                      <Trash2 className="w-4 h-4 mx-auto cursor-pointer" />
                    </button>
                  </th>
                  <th className="p-3 uppercase text-xs font-semibold">Photo</th>
                  <th className="p-3 uppercase text-xs font-semibold">
                    Product
                  </th>
                  <th className="p-3 uppercase text-xs font-semibold">Price</th>
                  <th className="p-3 uppercase text-xs font-semibold text-center">
                    Quantity
                  </th>
                  <th className="p-3 uppercase text-xs font-semibold">
                    Subtotal
                  </th>
                </tr>
              </thead>
              <tbody>
                {basket.items?.map((item: BasketItemDTO) => (
                  <BasketCard
                    key={item.id}
                    item={item}
                    removeItem={() => removeProduct(item.id)}
                    incrementQuantity={() =>
                      updateProduct(item.id, "increment")
                    }
                    decrementQuantity={() =>
                      updateProduct(item.id, "decrement")
                    }
                  />
                ))}
              </tbody>
            </table>
          </div>
          <BasketTotal totalAmount={basket.totalAmount} />
        </div>
      )}
    </div>
  );
};
