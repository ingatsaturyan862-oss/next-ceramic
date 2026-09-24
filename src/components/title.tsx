import React from "react";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  size: "l" | "m" | "s";
  children: React.ReactNode;
}

export const Title: React.FC<Props> = (props) => {
  const { className, size, children } = props;

  const setTag = {
    l: "h2",
    m: "h2",
    s: "h3",
  };
  const setStyle = {
    l: "text-[36px] leading-[111%] font-bold font-garamond tracking-[0.04em] uppercase",
    m: "text-[28px] leading-[114%] font-bold font-garamond tracking-[0.04em] uppercase",
    s: "text-[14px] leading-[143%] font-semibold tracking-[0.06em] uppercase",
  };

  return React.createElement(
    setTag[size],
    {
      className: cn(setStyle[size], className),
    },
    children,
  );
};
