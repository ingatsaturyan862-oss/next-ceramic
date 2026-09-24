/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { cn } from "@/lib/utils";
import { Title } from "../title";
import { FilterCheckbox } from "./filter-checkbox";

interface Props {
  className?: string;
  title: string;
  items: any[];
  isColor?: boolean;
  checked: Set<string>;
  setChecked: (id: string) => void;
}

export const FilterCheckboxGroup: React.FC<Props> = (props) => {
  const { className, title, items, isColor, checked, setChecked } = props;

  return (
    <div className={cn("", className)}>
      <Title className="mb-5.5" size="s">
        {title}
      </Title>
      <ul
        className={cn("grid gap-4", {
          "flex items-center": isColor,
        })}
      >
        {items.map((el, i) => (
          <li key={i}>
            <FilterCheckbox
              isColor={isColor}
              checked={checked.has(el.id.toString())}
              label={el.name}
              setChecked={() => setChecked(el.id.toString())}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
