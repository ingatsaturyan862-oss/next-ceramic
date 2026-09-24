"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { FormInput } from "./form-input";
import { Button } from "../ui/button";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  profileFormSchema,
  ProfileFormSchemaType,
} from "@/constants/form-schema/profile.schema";
import { FormInputImage } from "./form-input-image";
import { User } from "better-auth";
import { changeUser } from "@/lib/change-user";

interface Props {
  className?: string;
  user: User;
}

export const FormProfile: React.FC<Props> = (props) => {
  const { className, user } = props;

  const form = useForm({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      avatar: user.image,
    },
  });

  const onSubmit = async (data: ProfileFormSchemaType) => {
    try {
      console.log(data);
      await changeUser(data, form.formState.dirtyFields);
    } catch (error) {
      console.log(error);
      toast.error("Failed Update " + error);
    }
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          "flex flex-col gap-5 items-center text-center max-w-100 mx-auto",
          className,
        )}
      >
        <FormInputImage
          name="avatar"
          imgUrl={user.image as string}
          label="Avatar"
        />
        <FormInput name="name" label="Name" />

        <FormInput name="email" label="Email" />
        <Button disabled={!form.formState.isDirty} variant={"secondary"}>
          Save
        </Button>
      </form>
    </FormProvider>
  );
};
