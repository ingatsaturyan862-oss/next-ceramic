"use client";
import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Props {
  className?: string;
  imgUrl: string;
  alt: string;
  images: string[];
}

export const ProductImage: React.FC<Props> = (props) => {
  const { className, alt, images, imgUrl } = props;
  const [url, setUrl] = React.useState(imgUrl);
  return (
    <div className={cn("grid gap-8", className)}>
      <Image
        width={535}
        height={453}
        src={url}
        alt={alt}
        className="object-cover aspect-square rounded-md"
      />
      <ul className="flex gap-1">
        {images.map((el, i) => (
          <li key={i}>
            <Image
              onMouseEnter={() => setUrl(el)}
              onMouseLeave={() => setUrl(imgUrl)}
              src={el}
              width={100}
              height={100}
              alt=""
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
