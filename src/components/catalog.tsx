/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./container";
import { SkeletonCard } from "./skeleton-card";
import { Card } from "./card";

interface Props {
  className?: string;
  items: any[];
  title?: string;
}

export const Catalog: React.FC<Props> = (props) => {
  const { className, items, title } = props;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={cn("py-10 text-center", className)}>
      <Container className="w-full">
        {title && (
          <h2 className="text-2xl md:text-[30px] leading-[120%] uppercase text-[#3a3845] font-garamond font-semibold mb-8 md:my-10">
            {title}
          </h2>
        )}

        <ul className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-2 lg:gap-6 justify-items-center">
          {loading && (
            <>
              {[...Array(8)].map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </>
          )}

          {!loading &&
            items.map((product) => (
              <li
                key={product.id}
                className="w-full max-w-70 min-h-120 overflow-hidden flex flex-col justify-between"
              >
                <Card product={product} />
              </li>
            ))}
        </ul>
      </Container>
    </div>
  );
};
