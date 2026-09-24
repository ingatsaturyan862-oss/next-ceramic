import React from "react";
import { cn } from "@/lib/utils";
import { prisma } from "@/prisma/prisma-client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminCategory } from "./admin-category";
import { AdminPrice } from "./admin-price";
import { AdminProduct } from "./product/product/admin-product";


interface Props {
  className?: string;
}

export const AdminShop: React.FC<Props> = async (props) => {
  const { className } = props;

  const [category, color, priceRange, product] = await Promise.all([
    prisma.category.findMany(),
    prisma.color.findMany(),
    prisma.priceRange.findMany(),
    prisma.product.findMany({
      include: { color: true }, 
    }),
  ]);

  return (
    <div className={cn("", className)}>
      <Tabs defaultValue="category">
        <TabsList>
          <TabsTrigger value="category">category</TabsTrigger>
          <TabsTrigger value="color">color</TabsTrigger>
          <TabsTrigger value="priceRange">priceRange</TabsTrigger>
          <TabsTrigger value="product">product</TabsTrigger>
        </TabsList>
        <hr />
        <TabsContent value="category">
          <AdminCategory property="category" data={category} />
        </TabsContent>
        <TabsContent value="color">
          <AdminCategory property="color" data={color} />
        </TabsContent>
        <TabsContent value="priceRange">
          <AdminPrice data={priceRange} />
        </TabsContent>
        <TabsContent value="product">
          <AdminProduct data={product} categories={category} colors={color} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
