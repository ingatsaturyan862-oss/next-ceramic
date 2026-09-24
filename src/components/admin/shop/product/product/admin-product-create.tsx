import React from "react";
import { cn } from "@/lib/utils";
import { Button, } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AdminColorSelect } from "./admin-color-select";
import { AdminProductProps } from "@/hooks/admin/admin-product";
import { Category, Color } from "@prisma/client";
import { AdminCreateImages } from "./admin-create-images";
import { CategorySelect } from "./admin-category-select";

interface Props {
  className?: string;
  admin: AdminProductProps;
  categories: Category[];
  colors: Color[];
}

export const AdminProductCreate: React.FC<Props> = ({
  className,
  admin,
  categories,
  colors,
}) => {
  const { newFields, setNewFields, handleCreate, uploading } = admin;

  return (
    <div className={cn("flex flex-col gap-3 border rounded-lg p-4", className)}>
      <p className="font-medium">New product</p>
      <div className="flex gap-2 flex-wrap">
        <Input
          placeholder="Name"
          value={newFields.name}
          onChange={(e) =>
            setNewFields((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <Input
          placeholder="Price"
          type="number"
          value={newFields.price}
          onChange={(e) =>
            setNewFields((prev) => ({ ...prev, price: e.target.value }))
          }
        />
        <Input
          placeholder="Description"
          value={newFields.text}
          onChange={(e) =>
            setNewFields((prev) => ({ ...prev, text: e.target.value }))
          }
        />
        <CategorySelect
          categories={categories}
          value={newFields.categoryId}
          onChange={(id) =>
            setNewFields((prev) => ({
              ...prev,
              categoryId: Number(id),
            }))
          }
          placeholder="Select category"
        />
        <AdminColorSelect
          colors={colors}
          selected={newFields.colorIds ?? []}
          onChange={(ids) =>
            setNewFields((prev) => ({ ...prev, colorIds: ids }))
          }
        />
      </div>

      <AdminCreateImages admin={admin} />

      <Button
        onClick={handleCreate}
        disabled={uploading}
        className="self-start"
      >
        {uploading ? "Uploading..." : "Create"}
      </Button>
    </div>
  );
};
