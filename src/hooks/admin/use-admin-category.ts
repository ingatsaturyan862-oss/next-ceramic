import { adminAllAction } from "@/actions/admin/admin-category.actions";
import { Category } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";
import { useSet } from "react-use";
import { toast } from "sonner";

export const useAdminCategory = (data: Category[], property: "category" | "color") => {
  const [loading, setLoading] = React.useState(false);
  const [categories, setCategories] = React.useState(
    Object.fromEntries(data.map((el) => [el.id, el.name])),
  );
  const [createInputValue, setCreateInputValue] = React.useState("");
  const [checked, { toggle, clear, add }] = useSet(new Set<number>());
  const isAllChecked = checked.size === data.length && data.length > 0;
  const router = useRouter();

  const handleAllChecked = () => {
    if (isAllChecked) {
      clear();
    } else {
      data.forEach((el) => add(el.id));
    }
  };

  const handleCreate = async () => {
    setLoading(true);
    try {
      if (!createInputValue.trim()) {
        toast.warning("name is required");
        return;
      }
      await adminAllAction({ state: "create", name: createInputValue, property });
      setCreateInputValue("");
      router.refresh();
      toast.success("success create");
    } catch (error) {
      console.error(error);
      toast.error("failed create");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await Promise.all(
        Array.from(checked).map((id) =>
          adminAllAction({
            state: "update",
            name: categories[id],
            id: Number(id),
            property,
          }),
        ),
      );
      clear();
      router.refresh();
      toast.success("success update");
    } catch (error) {
      console.error(error);
      toast.error("failed update");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await Promise.all(
        Array.from(checked).map((id) =>
          adminAllAction({
            state: "delete",
            name: categories[id],
            id: Number(id),
            property,
          }),
        ),
      );
      clear();
      router.refresh();
      toast.success("success delete");
    } catch (error) {
      console.error(error);
      toast.error("failed delete" + error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    categories,
    createInputValue,
    setCreateInputValue,
    setCategories,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleAllChecked,
    toggle,
    isAllChecked,
    checked,
  };
};
