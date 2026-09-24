import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@prisma/client";

export const CategorySelect: React.FC<{
  categories: Category[];
  value?: number;
  onChange: (id: number) => void;
  disabled?: boolean;
  placeholder?: string;
}> = ({ categories, value, onChange, disabled, placeholder = "Category" }) => (
  <Select
    disabled={disabled}
    value={value != null ? String(value) : ""}
    onValueChange={(v) => onChange(Number(v))}
  >
    <SelectTrigger className="w-48 shrink-0">
      <SelectValue placeholder={placeholder} />
    </SelectTrigger>
    <SelectContent>
      {categories.map((c) => (
        <SelectItem key={c.id} value={String(c.id)}>
          {c.name}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);
