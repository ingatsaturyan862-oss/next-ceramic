import React from "react";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";

interface Props {
  className?: string;
  label: string;
  checked: boolean;
  setChecked: () => void;
  isColor?: boolean;
}

export const FilterCheckbox: React.FC<Props> = (props) => {
  const { className, label, checked, setChecked, isColor } = props;
  return (
    <Label
      className={cn(
        "flex cursor-pointer relative items-center gap-3",
        className,
      )}
    >
      <Checkbox
        className={cn("cursor-pointer", {
          "absolute inset-0 w-full h-full opacity-0": isColor,
        })}
        checked={checked}
        onCheckedChange={setChecked}
      />
      {isColor && (
        <span
          style={{ backgroundColor: label }}
          className={cn("w-4.5 h-4.5 border", {
            "border-2 border-black": checked,
          })}
        ></span>
      )}
      {!isColor && label}
    </Label>
  );
};
