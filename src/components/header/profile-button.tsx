/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { UserCircle, UserIcon } from "lucide-react";
import { AuthModal } from "../auth-modal";

interface Props {
  className?: string;
}

export const ProfileButton: React.FC<Props> = (props) => {
  const { className } = props;
  const { data } = useSession();
  if (data?.user.email) {
    return (
      <Link className={cn("flex gap-2", className)} href={"/profile"}>
        {data.user.image ? (
          <img
            width={30}
            height={30}
            className="rounded-full"
            src={data.user.image}
            alt=""
          />
        ) : (
          <UserCircle />
        )}
        <span>{data.user.name}</span>
      </Link>
    );
  }
  return (
    <AuthModal>
      <UserIcon size={18} />
    </AuthModal>
  );
};
