"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Category, Color, Product } from "@prisma/client";
import { useAdminProduct } from "@/hooks/admin/admin-product";
import { AdminProductCreate } from "./admin-product-create";
import { AdminProductList } from "./admin-product-list";
import { AdminTopBar } from "./admin-top-bar";

interface Props {
  className?: string;
  data: (Product & { color: Color[] })[];
  categories: Category[];
  colors: Color[];
}
export const AdminProduct: React.FC<Props> = (props) => {
  const { className, data, categories, colors } = props;
  const admin = useAdminProduct(data);

  return (
    <div className={cn("flex flex-col gap-5", className)}>
      {/* Create */}
      <AdminProductCreate
        admin={admin}
        categories={categories}
        colors={colors}
      />
      {/* top bar */}
      <AdminTopBar admin={admin} />
      {/* List */}
      <AdminProductList
        admin={admin}
        categories={categories}
        colors={colors}
        data={data}
      />
    </div>
  );
};
