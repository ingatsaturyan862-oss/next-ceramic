import React from "react";

import { AdminColorSelect } from "./admin-color-select";
import { AdminProductProps } from "@/hooks/admin/admin-product";
import { Category, Color, Product } from "@prisma/client";
import { FilePicker, ImageThumb } from "./admin-image-controls";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Item = Product & { color: Color[] };

const Section: React.FC<{ label: string; children: React.ReactNode }> = ({
  label,
  children,
}) => (
  <div className="flex gap-3 items-center flex-wrap">
    <span className="text-sm text-muted-foreground w-24 shrink-0">{label}</span>
    {children}
  </div>
);

export const AdminProductItem: React.FC<{
  el: Item;
  admin: AdminProductProps;
  categories: Category[];
  colors: Color[];
}> = ({ el, admin, categories, colors }) => {
  const isChecked = admin.checked.has(el.id);
  const field = admin.fields[el.id];
  const images = field?.images ?? el.images;

  return (
    <li className="border rounded-lg p-4 flex flex-col gap-3">
      <Label className="flex gap-3 items-center cursor-pointer flex-wrap">
        <Checkbox
          checked={isChecked}
          onCheckedChange={() => admin.toggle(el.id)}
        />
        <Input
          readOnly={!isChecked}
          placeholder="Name"
          value={field?.name ?? el.name}
          onChange={(e) =>
            admin.setFields((prev) => ({
              ...prev,
              [el.id]: { ...prev[el.id], name: e.target.value },
            }))
          }
        />
        <Input
          readOnly={!isChecked}
          placeholder="Price"
          type="number"
          value={field?.price ?? el.price}
          onChange={(e) =>
            admin.setFields((prev) => ({
              ...prev,
              [el.id]: { ...prev[el.id], price: e.target.value },
            }))
          }
        />
        <Input
          readOnly={!isChecked}
          placeholder="Description"
          value={field?.text ?? el.text}
          onChange={(e) =>
            admin.setFields((prev) => ({
              ...prev,
              [el.id]: { ...prev[el.id], text: e.target.value },
            }))
          }
        />
        <Select
          disabled={!isChecked}
          value={String(field?.categoryId ?? el.categoryId)}
          onValueChange={(id) =>
            admin.setFields((prev) => ({
              ...prev,
              [el.id]: { ...prev[el.id], categoryId: Number(id) },
            }))
          }
        >
          <SelectTrigger className="w-48 shrink-0">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={String(cat.id)}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <AdminColorSelect
          colors={colors}
          disabled={!isChecked}
          selected={field?.colorIds ?? el.color.map((c) => c.id)}
          onChange={(ids) =>
            admin.setFields((prev) => ({
              ...prev,
              [el.id]: { ...prev[el.id], colorIds: ids },
            }))
          }
        />
      </Label>

      {isChecked && (
        <div className="flex flex-col gap-3 pl-7">
          <Section label="Main image:">
            <ImageThumb
              src={
                field?.imgFile ? URL.createObjectURL(field.imgFile) : el.imgUrl
              }
            />
            <FilePicker
              label="Replace"
              onPick={(files) =>
                admin.setFields((prev) => ({
                  ...prev,
                  [el.id]: { ...prev[el.id], imgFile: files[0] },
                }))
              }
            />
          </Section>
          <Section label="Images:">
            {images.map((url, i) => (
              <ImageThumb
                key={i}
                src={url}
                onRemove={() =>
                  admin.setFields((prev) => ({
                    ...prev,
                    [el.id]: {
                      ...prev[el.id],
                      images: images.filter((_, idx) => idx !== i),
                    },
                  }))
                }
              />
            ))}
            {field?.newImageFiles?.map((file, i) => (
              <ImageThumb
                key={`new-${i}`}
                src={URL.createObjectURL(file)}
                faded
                onRemove={() =>
                  admin.setFields((prev) => ({
                    ...prev,
                    [el.id]: {
                      ...prev[el.id],
                      newImageFiles: field.newImageFiles?.filter(
                        (_, idx) => idx !== i,
                      ),
                    },
                  }))
                }
              />
            ))}
            <FilePicker
              label="Add"
              multiple
              onPick={(files) =>
                admin.setFields((prev) => ({
                  ...prev,
                  [el.id]: {
                    ...prev[el.id],
                    newImageFiles: [...(field?.newImageFiles ?? []), ...files],
                  },
                }))
              }
            />
          </Section>
        </div>
      )}
    </li>
  );
};
