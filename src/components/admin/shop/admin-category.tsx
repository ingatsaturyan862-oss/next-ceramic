"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Category } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useAdminCategory } from "@/hooks/admin/use-admin-category";

interface Props {
  className?: string;
  data: Category[];
  property: "category" | "color";
}

export const AdminCategory: React.FC<Props> = (props) => {
  const { className, data, property } = props;

  const admin = useAdminCategory(data, property);

  return (
    <div className={cn("", className)}>
      <div className="flex gap-5 mb-5">
        <Input
          type={property === "category" ? "text" : "color"}
          className="flex-1" value={admin.createInputValue} onChange={(e) => admin.setCreateInputValue(e.target.value)} />
        <Button disabled={admin.loading} onClick={admin.handleCreate}>create</Button>
      </div>
      <div className="flex items-center justify-between mb-5">
        <Label>
          <Checkbox checked={admin.isAllChecked} onCheckedChange={admin.handleAllChecked} /> All
        </Label>
        <div className="flex gap-5">
          <Button onClick={admin.handleUpdate}
            disabled={admin.checked.size === 0 || admin.loading}
            variant={"secondary"}>update</Button>
          <Button onClick={admin.handleDelete}
            disabled={admin.checked.size === 0 || admin.loading}
            variant={"destructive"}>delete</Button>
        </div>
      </div>
      <ul className="grid gap-3">
        {data.map((el) => (
          <li className="flex w-fit gap-5 items-center " key={el.id}>
            <Checkbox onCheckedChange={() => admin.toggle(el.id)} checked={admin.checked.has(el.id)} />
            <Input
              className="min-w-[100px] "
              type={property === "category" ? "text " : "color"}
              readOnly={!admin.checked.has(el.id)}
              onChange={(e) => {
                admin.setCategories((prev) => ({ ...prev, [el.id]: e.target.value, }))
              }} value={admin.categories[el.id] ?? el.name} />
          </li>
        ))}
      </ul>
    </div>
  );
};
