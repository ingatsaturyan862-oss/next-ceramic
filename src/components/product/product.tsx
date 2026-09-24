import React from "react";
import { cn } from "@/lib/utils";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
} from "../ui/breadcrumb";
import { ProductImage } from "./product-image";
import { Container } from "../container";
import { ProductContent } from "./product-content";
import { Catalog } from "../catalog";
import { productIdes } from "@/constants/products";

interface Props {
  className?: string;
  product: {
    id: number;
    name: string;
    price: number;
    imgUrl: string;
    images: string[];
    color: Array<{ name: string; id: number }>;
  };
}

export const Product: React.FC<Props> = (props) => {
  const { className, product } = props;

  return (
    <>
      <Container
        className={cn("p-4 rounded-lg flex flex-col gap-4 ", className)}
      >
        <Breadcrumb className="pt-5 pb-12.5">
          <BreadcrumbList className="flex">
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            /
            <BreadcrumbItem>
              <BreadcrumbLink href="/shop">Shop</BreadcrumbLink>
            </BreadcrumbItem>
            /
            <BreadcrumbItem>
              <BreadcrumbPage>{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex md:items-start items-center gap-15 flex-col md:flex-row">
          <ProductImage
            className="basis-1/2"
            alt={product.name}
            imgUrl={product.imgUrl}
            images={product.images}
          />
          <ProductContent
            className="basis-1/2"
            id={product.id}
            color={product.color}
            name={product.name}
            price={product.price}
          />
        </div>
      </Container>
      <Catalog
        className="text-start"
        items={productIdes.slice(0, 4)}
        title="Similar Items"
      />
    </>
  );
};
