/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { cn } from "@/lib/utils";
import { Filter } from "../filter";
import { Catalog } from "../catalog";
import { Container } from "../container";
import { ShopSort } from "./shop-sort";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "../ui/breadcrumb";
import { Sidebar } from "lucide-react";
import { ShopFilterSidebar } from "./shop-filter-sidebar";
import { Product } from "@prisma/client";
import { ShopPagination } from "./shop-pagination";

interface Props {
  className?: string;
  products: Product[];
  filter: any;
  page: number;
  totalPages: number;
  count: number;
}

export const Shop: React.FC<Props> = (props) => {
  const { className, products, filter, page, totalPages, count } = props;
  return (
    <Container className={cn("", className)}>
      <Breadcrumb className="pt-5 pb-12.5">
        <BreadcrumbList className="flex">
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          /
          <BreadcrumbItem>
            <BreadcrumbPage>Shop</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex">
        <Filter itemsCount={count} filter={filter} className="hidden md:grid" />
        <div className="w-full">
          <div className="flex justify-between items-center mb-7">
            <ShopFilterSidebar itemsCount={count} filter={filter}>
              <Sidebar />
            </ShopFilterSidebar>
            <ShopSort className="ml-auto w-fit" />
          </div>
          <Catalog className="grow pt-0" items={products} />
          <ShopPagination currentPage={page} totalPages={totalPages} />
        </div>
      </div>
    </Container>
  );
};
