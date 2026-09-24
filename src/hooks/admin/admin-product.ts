import { AdminProductAction } from "@/actions/admin/admin-product-action";
import { uploadImage } from "@/actions/upload-image";
import { Color, Product } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";
import { useSet } from "react-use";
import { toast } from "sonner";

export interface AdminProductProps {
  newFields: NewFields;
  setNewFields: React.Dispatch<React.SetStateAction<NewFields>>;
  fields: FieldRecord;
  setFields: React.Dispatch<React.SetStateAction<FieldRecord>>;
  checked: Set<number>;
  toggle: (key: number) => void;
  allChecked: boolean;
  uploading: boolean;
  handleToggleAll: () => void;
  handleCreate: () => Promise<void>;
  handleUpdate: () => Promise<void>;
  handleDelete: () => Promise<void>;
}

type FieldRecord = Record<
  number,
  {
    name: string;
    price: string;
    text: string;
    categoryId: number;
    colorIds: number[];
    images: string[];
    imgFile?: File;
    newImageFiles?: File[];
  }
>;

type NewFields = {
  name: string;
  price: string;
  text: string;
  categoryId?: number;
  colorIds?: number[];
  imgFile?: File;
  imageFiles?: File[];
};

export const useAdminProduct = (
  data: (Product & { color: Color[] })[],
): AdminProductProps => {
  const router = useRouter();
  const [uploading, setUploading] = React.useState(false);
  const [newFields, setNewFields] = React.useState<NewFields>({
    name: "",
    price: "",
    text: "",
    colorIds: [],
  });
  const [fields, setFields] = React.useState<FieldRecord>(
    Object.fromEntries(
      data.map((el) => [
        el.id,
        {
          name: el.name,
          price: String(el.price),
          text: el.text,
          categoryId: el.categoryId,
          colorIds: el.color.map((c) => c.id),
          images: el.images,
        },
      ]),
    ),
  );
  const [checked, { toggle, clear, add }] = useSet(new Set<number>());

  const allChecked = checked.size === data.length && data.length > 0;

  const handleToggleAll = () => {
    if (allChecked) clear();
    else data.forEach((item) => add(item.id));
  };

  const handleCreate = async () => {
    if (
      !newFields.name.trim() ||
      !newFields.price ||
      !newFields.imgFile ||
      !newFields.categoryId
    )
      return;
    setUploading(true);
    try {
      const imgUrl = await uploadImage(newFields.imgFile);
      const images = await Promise.all(
        (newFields.imageFiles ?? []).map((f) => uploadImage(f)),
      );
      await AdminProductAction({
        type: "create",
        id: 0,
        name: newFields.name,
        price: Number(newFields.price),
        text: newFields.text,
        categoryId: newFields.categoryId,
        colorIds: newFields.colorIds ?? [],
        imgUrl,
        images,
      });
      toast.success("success create")
      clear();
      router.refresh();
      setNewFields({ name: "", price: "", text: "", colorIds: [] });
      router.refresh();
    } catch (error) {
      console.error(error)
      toast.error("Failed create ")

    } finally {
      setUploading(false);
    }
  };

  const handleUpdate = async () => {
    setUploading(true);
    try {
      await Promise.all(
        Array.from(checked).map(async (id) => {
          const field = fields[id];
          const imgUrl = field.imgFile
            ? await uploadImage(field.imgFile)
            : undefined;
          const newImages = await Promise.all(
            (field.newImageFiles ?? []).map((file) => uploadImage(file)),
          );
          await AdminProductAction({
            type: "update",
            id,
            name: field.name,
            price: Number(field.price),
            text: field.text,
            categoryId: field.categoryId,
            colorIds: field.colorIds,
            imgUrl,
            images: [...field.images, ...newImages],
          });
        }),
      );
      clear();
      router.refresh();
    } catch (error) {
      console.error(error)
      toast.error("Failed update ")
    }
    finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await Promise.all(
        Array.from(checked).map((id) =>
          AdminProductAction({
            type: "delete",
            id,
            name: "",
            price: 0,
            text: "",
            categoryId: 0,
            colorIds: [],
            images: [],
          }),
        ),
      );
      clear();
      router.refresh();
    }
    catch (error) {
      console.error(error)
      toast.error("Failed delete ")
    }
  };

  return {
    newFields,
    setNewFields,
    fields,
    setFields,
    checked,
    toggle,
    allChecked,
    uploading,
    handleToggleAll,
    handleCreate,
    handleUpdate,
    handleDelete,
  };
};
