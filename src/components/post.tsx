import React from "react";
import { cn } from "@/lib/utils";
import { Container } from "./container";
import { Title } from "./title";
import Link from "next/link";
import Image from "next/image";

interface Props {
  className?: string;
  imgUrl: string;
  title?: string;
  text?: string;
  subtitle?: string;
  linkUrl?: string;
  linkText?: string;
  dir?: "right" | "left";
  imgClassName?: string;
  children?: React.ReactNode;
}

export const Post: React.FC<Props> = (props) => {
  const {
    className,
    imgUrl,
    title,
    text,
    subtitle,
    linkUrl = "/",
    linkText,
    dir = "left",
    imgClassName,
    children,
  } = props;
  return (
    <Container
      className={cn("flex px-0 flex-col md:flex-row", {
        "md:flex-row-reverse": dir === "right",
      })}
    >
      <div
        className={cn(
          "basis-1/2 flex items-center py-[clamp(2rem,1.4286rem+2.8571vw,4rem)] px-4 bg-[#f7f6f5] text-center",
          className,
        )}
      >
        <div className="max-w-109 mx-auto">
          {subtitle && (
            <span className="text-[#807f86] text-[18px] font-semibold leading-[133%] tracking-[0.06em] block uppercase mb-6">
              {subtitle}
            </span>
          )}
          <Title className="mb-6 text-primary" size="m">
            {title}
          </Title>
          <p className="mb-8 text-[#595667] text-base leading-[150%]">{text}</p>
          {linkText && linkUrl && (
            <Link
              className="underline text-primary font-bold text-[14px] leading-[143%] tracking-[0.06em] uppercase [text-decoration-skip-ink: none]"
              href={linkUrl}
            >
              {linkText}
            </Link>
          )}
          {children}
        </div>
      </div>
      <div className="basis-1/2 relative">
        <Image
          className={cn(
            "md:absolute md:inset-0 object-cover w-full h-full",
            imgClassName,
          )}
          width={575}
          height={385}
          src={imgUrl}
          alt={title || ""}
        />
      </div>
    </Container>
  );
};
