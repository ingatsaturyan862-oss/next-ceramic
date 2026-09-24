/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Input } from "../ui/input";
import { useFormContext } from "react-hook-form";
import { User } from "lucide-react";

interface Props {
  className?: string;
  label?: string;
  name: string;
  imgUrl?: string;
}

export const FormInputImage: React.FC<Props> = (props) => {
  const { className, name, label, imgUrl } = props;
  const [preview, setPrevew] = React.useState(imgUrl || "");
  const {
    setValue,
    formState: { errors },
  } = useFormContext();

  const isError = errors[name]?.message;

  const handleImageChange = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    setPrevew(URL.createObjectURL(file));
    setValue(name, file, { shouldDirty: true });
  };

  return (
    <div className={cn("relative w-25", className)}>
      {label && <span>{label}</span>}
      {preview ? (
        <Image
          className="w-full h-25 object-cover"
          src={preview}
          alt=""
          width={100}
          height={100}
        />
      ) : (

        <User />

      )}
      <Input
        className="absolute opacity-0 w-full h-full inset-0 cursor-pointer"
        name={name}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      {isError && <span className="text-red-500">{isError as string}</span>}
    </div>
  );
};
