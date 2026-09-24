/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { cn } from "@/lib/utils";
import { Container } from "./container";
import { Title } from "./title";
import Image from "next/image";

interface Props {
  className?: string;
  title?: string;
  items: any[];
}

export const PlateServices: React.FC<Props> = (props) => {
  const { className, title, items } = props;
  return (
    <Container className={cn("py-20", className)}>
      {title && (
        <Title className="text-center mb-12" size="l">
          {title}
        </Title>
      )}
      <ul className="flex items-center gap-5 md:gap-7.5 overflow-auto scrollbar-none">
        {items.map((el) => (
          <li className="w-63.75 shrink-0 text-center" key={el.id}>
            <Image
              className="mb-4"
              src={el.imgUrl}
              alt={el.name}
              width={255}
              height={255}
            />
            <h3 className="uppercase mb-3 text-[18px] leading-[133%] tracking-[0.06em] text-primary font-semibold">
              {el.name}
            </h3>
            {el.text && (
              <span className="text-base text-[#807f86] leading-[150%]">
                {el.text}
              </span>
            )}
          </li>
        ))}
      </ul>
    </Container>
  );
};
