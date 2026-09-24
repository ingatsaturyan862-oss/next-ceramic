import React from "react";
import { ImagePlus, X } from "lucide-react";
import Image from "next/image";

export const ImageThumb: React.FC<{
  src: string;
  onRemove?: () => void;
  faded?: boolean;
}> = ({ src, onRemove, faded }) => (
  <div className="relative w-16 h-16 shrink-0">
    <Image
      width={64}
      height={64}
      alt=""
      src={src}
      className={`w-16 h-16 object-cover rounded border${faded ? " opacity-70" : ""}`}
    />
    {onRemove && (
      <button
        onClick={onRemove}
        className="absolute -top-1 -right-1 bg-destructive text-white rounded-full w-4 h-4 flex items-center justify-center"
      >
        <X size={10} />
      </button>
    )}
  </div>
);

export const FilePicker: React.FC<{
  label: string;
  multiple?: boolean;
  onPick: (files: File[]) => void;
}> = ({ label, multiple, onPick }) => (
  <label className="flex items-center gap-2 cursor-pointer text-sm border rounded px-3 py-2 hover:bg-muted transition-colors">
    <ImagePlus size={16} />
    {label}
    <input
      type="file"
      accept="image/*"
      multiple={multiple}
      className="hidden"
      onChange={(e) => {
        const files = Array.from(e.target.files ?? []);
        if (files.length) onPick(files);
      }}
    />
  </label>
);
