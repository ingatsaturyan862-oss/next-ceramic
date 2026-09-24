"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { ColorPicker } from "./color-picker";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";
import { useBasket } from "@/hooks/use-basket";
import { toast } from "sonner";

interface Props {
  className?: string;
  name: string;
  price: number;
  color: Array<{ name: string; id: number }>;
  id: number;
}

export const ProductContent: React.FC<Props> = (props) => {
  const { className, color, name, price, id } = props;
  const { addProduct } = useBasket();
  const [colorId, setColorId] = React.useState(color[0].id);
  const [quantity, setQuantity] = React.useState(1);
  const [loading, setLoading] = React.useState(false);

  const addToBasket = async () => {
    setLoading(true);
    try {
      await addProduct({ quantity, colorId, productId: id });
      toast.success("success add to basket");
    } catch (error) {
      console.error(error);
      toast.error("failed add to basket");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("grid", className)}>
      <h2 className="text-xl font-semibold leading-[140%] tracking-[0.06em] uppercase mb-12.5">
        {name}
      </h2>
      <span className="text-2xl leading-[133%] tracking-[0.06em] uppercase mb-12">
        $ {price}
      </span>
      <ColorPicker setColorId={setColorId} className="mb-12" color={color} />
      <div className="flex gap-2.5">
        <div className="flex gap-10 items-center border border-primary p-5 text-primary">
          <button
            disabled={quantity <= 1}
            onClick={() => setQuantity(quantity <= 1 ? 1 : quantity - 1)}
            className="cursor-pointer"
          >
            <Minus />
          </button>
          <span className="font-semibold text-[14px] leading-[143%] tracking-[0.06em] uppercase">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="cursor-pointer"
          >
            <Plus />
          </button>
        </div>
        <Button
          disabled={loading}
          onClick={addToBasket}
          className="flex-1"
          variant={"secondary"}
        >
          Add To Cart
        </Button>
      </div>
    </div>
  );
};
