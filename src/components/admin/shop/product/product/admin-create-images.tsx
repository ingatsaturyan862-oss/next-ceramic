import React from "react";
import { cn } from "@/lib/utils";
import { AdminProductProps } from "@/hooks/admin/admin-product";
import { FilePicker, ImageThumb } from "./admin-image-controls";

interface Props {
  className?: string;
  admin: AdminProductProps;
}

export const AdminCreateImages: React.FC<Props> = ({ className, admin }) => {
  const { newFields, setNewFields } = admin;
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex gap-3 items-center">
        <FilePicker
          label="Main image"
          onPick={(files) => setNewFields((p) => ({ ...p, imgFile: files[0] }))}
        />
        {newFields.imgFile && (
          <ImageThumb
            src={URL.createObjectURL(newFields.imgFile)}
            onRemove={() => setNewFields((p) => ({ ...p, imgFile: undefined }))}
          />
        )}
      </div>
      <div className="flex gap-3 items-center flex-wrap">
        <FilePicker
          label="Add images"
          multiple
          onPick={(files) =>
            setNewFields((p) => ({
              ...p,
              imageFiles: [...(p.imageFiles ?? []), ...files],
            }))
          }
        />
        {newFields.imageFiles?.map((file, i) => (
          <ImageThumb
            key={i}
            src={URL.createObjectURL(file)}
            onRemove={() =>
              setNewFields((p) => ({
                ...p,
                imageFiles: p.imageFiles?.filter((_, idx) => idx !== i),
              }))
            }
          />
        ))}
      </div>
    </div>
  );
};
