"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { FormCheckout } from "../form/form-checkout";
import { CheckoutTotal } from "./checkout-total";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
} from "../ui/breadcrumb";
import { Container } from "../container";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  formCheckoutSchema,
  FormCheckoutSchemaType,
} from "@/constants/form-schema/checkout.schema";
import { toast } from "sonner";

interface Props {
  className?: string;
}

export const Checkout: React.FC<Props> = (props) => {
  const { className } = props;

  const form = useForm({
    resolver: zodResolver(formCheckoutSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormCheckoutSchemaType) => {
    try {
      console.log(data);
      toast.success("success order");
    } catch (error) {
      console.error(error);
      toast.error("failed order");
    } finally {
      form.reset();
    }
  };

  return (
    <Container className={cn("mb-20", className)}>
      <Breadcrumb className="pt-5 pb-12.5">
        <BreadcrumbList className="flex">
          <BreadcrumbItem>
            <BreadcrumbLink href="/basket">Cart</BreadcrumbLink>
          </BreadcrumbItem>
          /
          <BreadcrumbItem>
            <BreadcrumbLink>Shipping</BreadcrumbLink>
          </BreadcrumbItem>
          /
          <BreadcrumbItem>
            <BreadcrumbPage>Payment</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn("grid md:flex justify-items-center gap-14")}
        >
          <FormCheckout />
          <CheckoutTotal />
        </form>
      </FormProvider>
    </Container>
  );
};
