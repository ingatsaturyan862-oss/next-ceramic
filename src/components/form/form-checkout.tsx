"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { FormInput } from "./form-input";
import { FormTextarea } from "./form-textarea";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface Props {
  className?: string;
}

export const FormCheckout: React.FC<Props> = (props) => {
  const { className } = props;

  return (
    <div className={cn("max-w-160 w-full", className)}>
      <h2 className="text-[20px] font-semibold leading-[140%] text-primary mb-10">
        Billing Details
      </h2>
      <div className="mb-10 grid gap-7.5">
        <div className="flex items-start gap-5">
          <FormInput label="First Name *" name="firstName" type="text" />
          <FormInput label="Last Name *" name="lastName" type="text" />
        </div>
        <div className="flex items-start gap-5">
          <FormInput label="Email *" name="email" type="email" />
          <FormInput label="Phone" name="phone" type="tel" />
        </div>

        <FormInput label="Street address *" name="address" type="text" />
        <FormTextarea label="Order notes" name="message" />
      </div>
      <Link
        href={"/basket"}
        className="uppercase flex items-center gap-2 font-semibold text-[12px] leading-[150%] tracking-[0.08em] text-primary"
      >
        <ChevronLeft size={20} /> Return To Cart
      </Link>
    </div>
  );
};
