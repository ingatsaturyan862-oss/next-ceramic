import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Props {
  className?: string;
  totalAmount: number;
}

export const BasketTotal: React.FC<Props> = (props) => {
  const { className, totalAmount } = props;
  return (
    <div className={cn("bg-primary px-12.5 py-10 max-w-135 w-full", className)}>
      <div className="flex justify-between items-center mb-10 text-base font-semibold leading-[138%] text-white">
        <span className="">Cart totals</span>
        <span className="">${totalAmount?.toFixed(2)}</span>
      </div>
      <Link
        href="/checkout"
        className="w-full block text-center border border-white text-white text-[14px] uppercase tracking-[0.06em] py-5 font-semibold leading-[143%] hover:bg-white hover:text-primary transition-colors"
      >
        Proceed to checkout
      </Link>
    </div>
  );
};
