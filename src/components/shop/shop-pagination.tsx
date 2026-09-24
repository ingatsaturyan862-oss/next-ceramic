"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePagination } from "@/hooks/use-pagination";

interface Props {
  className?: string;
  currentPage: number;
  totalPages: number;
}

export const ShopPagination: React.FC<Props> = (props) => {
  const { className, currentPage, totalPages } = props;

  const { goPage, isFirst, isLast, next, pages, prev } = usePagination(
    currentPage,
    totalPages,
  );

  return (
    <div className={cn("flex items-center gap-2 justify-end", className)}>
      <Button onClick={prev} disabled={isFirst} variant={"secondary"}>
        <ChevronLeft />
      </Button>
      {pages.map((el) => (
        <Button
          disabled={currentPage === el}
          variant={currentPage === el ? "ghost" : "default"}
          onClick={() => goPage(el)}
          key={el}
        >
          {el}
        </Button>
      ))}
      <Button onClick={next} disabled={isLast} variant={"secondary"}>
        <ChevronRight />
      </Button>
    </div>
  );
};
