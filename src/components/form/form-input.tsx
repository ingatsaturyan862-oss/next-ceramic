"use client";
import React, { InputHTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";
import { Label } from "../../shared/ui/label";
import { Input } from "../../shared/ui/input";
import { useFormContext } from "react-hook-form";
interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  name: string;
}

export const FormInput: React.FC<Props> = (props) => {
  const { className, label, name, ...inputProps } = props;
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const isError = errors[name]?.message;

  return (
    <Label className={cn("grid gap-3 w-full", className)}>
      {label && (
        <span className="font-semibold text-[14px] leading-[143%] text-primary">
          {label}
        </span>
      )}
      <Input {...register(name)} name={name} {...inputProps} />
      {isError && <span className="text-red-500">{isError as string}</span>}
    </Label>
  );
};
