"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { GetColorName } from "hex-color-to-color-name";

interface Props {
  className?: string;
  color: Array<{ name: string; id: number }>;
  setColorId: (id: number) => void;
}

export const ColorPicker: React.FC<Props> = (props) => {
  const { className, color, setColorId } = props;
  const [selectedColor, setSelectedColor] = useState(color[0].name);

  return (
    <div className={cn("", className)}>
      <h3 className="font-semibold text-base leading-[138%] mb-4">
        Color:{" "}
        <span
          className="text-shadow-[1px_1px_2px_black]"
          style={{ color: selectedColor }}
        >
          {GetColorName(selectedColor)}
        </span>
      </h3>
      <ul className={cn("flex gap-3")}>
        {color.map((c) => (
          <li key={c.id}>
            <button
              onClick={() => {
                setSelectedColor(c.name);
                setColorId(c.id);
              }}
              style={{ backgroundColor: c.name }}
              className={`
                w-9 h-9
                border border-gray-400
                transition-all duration-200
                hover:scale-110
                ${selectedColor === c.name ? "ring-2 ring-black ring-offset-2" : ""}
              `}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
