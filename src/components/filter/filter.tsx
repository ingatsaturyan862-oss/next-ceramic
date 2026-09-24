/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Title } from "../title";
import { FilterCheckboxGroup } from "./filter-checkbox-group";
import { useFilter } from "@/hooks/filter/use-filter";
import { useFilterQuery } from "@/hooks/filter/use-filter-query";

interface Props {
  className?: string;
  filter: any;
  itemsCount: number;
}

export const Filter: React.FC<Props> = (props) => {
  const { className, filter: filterArr, itemsCount } = props;

  const filter = useFilter();
  useFilterQuery(filter);

  return (
    <div className={cn("grid gap-7.5 min-w-60 self-start", className)}>
      <Title size="s">Showing {itemsCount} items </Title>
      <hr />
      <FilterCheckboxGroup
        checked={filter.category}
        setChecked={filter.categoryToggle}
        items={filterArr.category}
        title="Category"
      />
      <hr />
      <FilterCheckboxGroup
        checked={filter.price}
        setChecked={filter.priceToggle}
        items={filterArr.priceRange.map((el: any) => ({
          name: el.to ? `$${el.from} - $${el.to}` : `$${el.from}`,
          id: el.id,
        }))}
        title="Price Range"
      />
      <hr />
      <FilterCheckboxGroup
        checked={filter.color}
        setChecked={filter.colorToggle}
        isColor
        items={filterArr.color}
        title="Color"
      />
      <hr />
    </div>
  );
};
