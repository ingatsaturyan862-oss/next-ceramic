import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";
import { useBasketStore } from "@/store/use-basket-store";
import { toast } from "sonner";
import { Product } from "@prisma/client";
import { useBasket } from "@/hooks/use-basket";

interface Props {
  className?: string;
  product: Product;
}

export const Card: React.FC<Props> = (props) => {
  const { className, product } = props;

  const { addProduct } = useBasket();

  const addToBasket = async () => {
    await addProduct({ productId: product.id, quantity: 1, colorId: 1 });
    toast.success("success add to basket");
  };

  return (
    <div className={cn("flex flex-col gap-1 h-full text-left", className)}>
      <Link href={"/product/" + product.id} className="w-full overflow-hidden">
        <Image
          src={product.imgUrl}
          alt={product.name}
          className="w-63.75 h-81.25 object-cover hover:scale-105 transition-transform duration-300"
          width={255}
          height={325}
        />
      </Link>
      <h3 className="mt-4 flex flex-col gap-1 text-base font-medium text-[#3a3845]">
        {product.name}
        <span className="text-lg font-semibold mt-1">{product.price}</span>
      </h3>
      <p className="mt-2 text-sm text-gray-500 line-clamp-3 mb-3">
        {product.text}
      </p>
      <Button onClick={addToBasket} className="w-full mt-auto">
        Add to cart
      </Button>
    </div>
  );
};
