/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
// import { Product } from "@prisma/client";
import Image from "next/image";

interface Props {
  className?: string;
  data: any[];
  open: boolean;
}

export const SearchContent: React.FC<Props> = (props) => {
  const { className, data, open } = props;
  return (
    <ul
      className={cn(
        "absolute top-[calc(100%+14px)] gird gap-1 transition-[scale] duration-300 origin-right scale-x-0 text-[14px] p-2 rounded-md right-[calc(100%+10px)] w-50 bg-white",
        {
          "scale-x-100": open,
        },
        className,
      )}
    >
      {data.map((el) => (
        <li key={el.id}>
          <Link
            href={"/shop/product/" + el.id}
            className="flex items-center gap-3 rounded-md p-1 transition-colors duration-300 hover:bg-primary/30"
          >
            <Image
              className="w-10 h-10 shrink-0 rounded-md"
              width={40}
              height={40}
              src={el.imgUrl}
              alt={el.name}
            />
            <span className="line-clamp-2 w-30">{el.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};
