import { adminAllAction } from "@/actions/admin/admin-category.actions";
import { adminPriceRangeAction } from "@/actions/admin/admin-price-range-actions";
import { Category, PriceRange } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";
import { useSet } from "react-use";
import { toast } from "sonner";

export const useAdminPriceRange = (data: PriceRange[]) => {
  const [loading, setLoading] = React.useState(false);
  const [ranges, setRanges] = React.useState(
    Object.fromEntries
      (data.map((el) => [
        el.id,
        { from: String(el?.from), to: String(el?.to) }])),
  );
  const [newFrom, setNewFrom] = React.useState("");
  const [newTo, setNewTo] = React.useState("");
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
      if (!newFrom.trim()) {
        toast.warning("name is required");
        return;
      }
      await adminPriceRangeAction({
        state: "create", from: Number(newFrom),
        to: newTo ? Number(newTo) : null,
      });
      setNewFrom("");
      setNewTo("");
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
          adminPriceRangeAction({
            state: "update",
            from: Number(ranges[id]?.from),
            to: ranges[id]?.to ? Number(ranges[id].to) : null,
            id: Number(id),
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
          adminPriceRangeAction({
            state: "delete",
            from: Number(ranges[id]?.from),
            to: ranges[id]?.to ? Number(ranges[id].to) : null,
            id: Number(id),
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
    ranges,
    newFrom,
    setRanges,
    setNewFrom,
    newTo,
    setNewTo,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleAllChecked,
    toggle,
    isAllChecked,
    checked,
  };
};
