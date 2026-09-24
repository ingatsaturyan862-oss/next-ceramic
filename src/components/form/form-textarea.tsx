"use client";

import React, { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import { useFormContext } from "react-hook-form";
import { Textarea } from "../ui/textarea";
interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  label?: string;
  name: string;
}

export const FormTextarea: React.FC<Props> = (props) => {
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
      <Textarea {...register(name)} name={name} {...inputProps} />
      {isError && <span className="text-red-500">{isError as string}</span>}
    </Label>
  );
};
