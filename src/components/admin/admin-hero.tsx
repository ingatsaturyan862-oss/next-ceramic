"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Container } from "../container";
import { FormInput } from "../form/form-input";
import { FormInputImage } from "../form/form-input-image";
import { Button } from "../ui/button";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  adminHeroSchema,
  AdminHeroSchemaType,
} from "@/constants/form-schema/admin-hero.schema";
import { toast } from "sonner";
import { HomeHero } from "@prisma/client";
import { adminHeroAction } from "@/actions/admin/admin-hero";
import { isAdmin } from "@/lib/is-admin";

interface Props {
  className?: string;
  data: HomeHero | null;
  type: "home" | "contact";
}
export const AdminHero: React.FC<Props> = (props) => {
  const { className, data, type } = props;

  const form = useForm({
    resolver: zodResolver(adminHeroSchema),
    defaultValues: {
      title: data?.title,
      color: data?.color,
      imgUrlDesktop: data?.imgUrlDesktop,
      imgUrlMobile: data?.imgUrlMobile,
    },
  });

  const onSubmit = async (data: AdminHeroSchemaType) => {
    try {
      await adminHeroAction(data, type);
      toast.success("success save");
    } catch (error) {
      console.error(error);
      toast.error("failed save");
    }
  };

  return (
    <Container className={cn("", className)}>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn("flex flex-col items-center gap-5")}
        >
          <FormInput name="title" placeholder="Title" type="text" />
          <FormInput name="color" placeholder="Color" type="color" />
          <FormInputImage
            imgUrl={data?.imgUrlDesktop}
            name="imgUrlDesktop"
            label="Desktop"
          />
          <FormInputImage
            imgUrl={data?.imgUrlMobile}
            name="imgUrlMobile"
            label="Mobile"
          />
          <Button disabled={!form.formState.isDirty} className="min-w-50">
            save
          </Button>
        </form>
      </FormProvider>
    </Container>
  );
};
