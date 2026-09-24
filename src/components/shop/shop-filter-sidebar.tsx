/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Filter } from "../filter";

interface Props {
  className?: string;
  children: React.ReactNode;
  filter: any;
  itemsCount: number;
}

export const ShopFilterSidebar: React.FC<Props> = (props) => {
  const { className, children, filter, itemsCount } = props;
  return (
    <Sheet>
      <SheetTrigger className="md:hidden">{children}</SheetTrigger>
      <SheetContent
        side="left"
        className={cn("pl-10 pt-24 overflow-auto", className)}
      >
        <SheetHeader className="sr-only">
          <SheetTitle>Filter</SheetTitle>
        </SheetHeader>
        <Filter itemsCount={itemsCount} filter={filter} />
      </SheetContent>
    </Sheet>
  );
};
