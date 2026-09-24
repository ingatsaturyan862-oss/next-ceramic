"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Container } from "./container";
import { Button } from "./ui/button";
import { deleteUser, signOut } from "@/lib/auth-client";
import { toast } from "sonner";
import { FormProfile } from "./form/form-profile";
import { User } from "better-auth";

interface Props {
  className?: string;
  user: User;
}

export const Profile: React.FC<Props> = (props) => {
  const { className, user } = props;
  return (
    <Container className={cn("py-5", className)}>
      <FormProfile user={user} />
      <div className="flex justify-between">
        <Button
          onClick={() => {
            signOut({
              fetchOptions: {
                onSuccess() {
                  window.location.href = "/";
                },
                onError(error) {
                  console.log(error);
                  toast.error("failed logout");
                },
              },
            });
          }}
        >
          Logout
        </Button>
        <Button
          variant={"destructive"}
          onClick={() => {
            deleteUser({
              fetchOptions: {
                onSuccess() {
                  toast.success("go gmail to check delete user");
                },
                onError(error) {
                  console.log(error);
                  toast.error("failed delete user");
                },
              },
            });
          }}
        >
          delete account
        </Button>
      </div>
    </Container>
  );
};
