/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";

interface Props {
  className?: string;
  item: any;
  removeItem: (id: number) => void;
  incrementQuantity: () => void;
  decrementQuantity: () => void;
}

export const BasketCard: React.FC<Props> = (props) => {
  const { className, item, removeItem, incrementQuantity, decrementQuantity } =
    props;
  return (
    <tr
      key={item.id}
      className={cn(
        "border-b text-primary border-gray-200 align-middle",
        className,
      )}
    >
      <td className="p-4 text-center">
        <button
          onClick={() => removeItem(item.id)}
          className="text-red-400 hover:text-red-600 transition"
        >
          <X className="w-5 h-5 mx-auto" />
        </button>
      </td>

      <td className="p-4">
        <div className="rounded overflow-hidden flex items-center justify-center">
          <Image src={item.imgUrl} alt={item.name} width={120} height={141} />
        </div>
      </td>

      <td className="p-4 font-semibold text-[14px] tracking-[0.06em] leading-[143%] uppercase">
        {item.name}
      </td>

      <td className="p-4 font-semibold text-[14px] tracking-[0.06em] leading-[143%] uppercase">
        ${item.price}
      </td>
      <td className="p-4">
        <div className="flex items-center justify-center border border-primary mx-auto h-12 bg-white">
          <button
            onClick={decrementQuantity}
            className="px-2 text-primary hover:text-black"
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="flex-1 text-center font-semibold text-[14px] tracking-[0.06em] leading-[143%] uppercase">
            {item.quantity}
          </span>
          <button
            onClick={incrementQuantity}
            className="px-2 text-primary hover:text-black"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>
      </td>

      <td className="p-4 font-semibold text-[14px] tracking-[0.06em] leading-[143%] uppercase text-[#c69b7b]">
        ${item.price * item.quantity}
      </td>
    </tr>
  );
};
