// components/skeleton-card.tsx
import React from "react";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export const SkeletonCard: React.FC<Props> = ({ className }) => {
  return (
    <li
      className={cn(
        "w-full max-w-70 min-h-120 bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between animate-pulse",
        className,
      )}
    >
      <div>
        <div className="w-full h-64 bg-gray-200 rounded-xl mb-4"></div>

        <div className="flex flex-col items-center gap-2 mb-4">
          <div className="w-3/4 h-5 bg-gray-200 rounded-md"></div>
          <div className="w-1/2 h-5 bg-gray-200 rounded-md"></div>
        </div>

        <div className="w-1/3 h-6 bg-gray-200 rounded-md mx-auto mb-5"></div>

        <div className="flex flex-col gap-2">
          <div className="w-full h-4 bg-gray-100 rounded-md"></div>
          <div className="w-full h-4 bg-gray-100 rounded-md"></div>
          <div className="w-2/3 h-4 bg-gray-100 rounded-md mx-auto"></div>
        </div>
      </div>

      <div className="w-full h-10 bg-gray-200 rounded-lg mt-5"></div>
    </li>
  );
};
