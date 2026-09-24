import React from "react";
import { cn } from "@/lib/utils";
import { Container } from "./container";
import { Logo } from "./logo";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import {
  footerAboutUs,
  footerPortfolio,
  footerServices,
} from "@/constants/footer";
import Link from "next/link";

interface Props {
  className?: string;
}

export const Footer: React.FC<Props> = (props) => {
  const { className } = props;
  return (
    <footer className={cn("bg-primary", className)}>
      <Container className="flex flex-col min-[992px]:flex-row text-[#e5e5e5]">
        <div className="max-w-75 w-full sm:mx-[clamp(1.5rem,0.5rem+5vw,5rem)] pt-12 pb-7.5">
          <Logo className="mb-6 block text-white" />
          <p className="text-[14px] leading-[157%] mb-8">
            Lorem ipsum dolor sit amet consectetur adipiscing elit aliquam
            mauris sed ma
          </p>
          <Button className="" size={"sm"} variant={"secondary"}>
            Get started <ArrowRight />
          </Button>
        </div>
        <div className="flex flex-wrap gap-5 gap-y-12 justify-between grow sm:px-[clamp(1.5rem,0.5rem+5vw,5rem)] pt-12 border-t min-[992px]:border-t-0  min-[992px]:border-l border-[#cac9cf] pb-17.5 text-[14px] text-[#e5e5e5] leading-[157%]">
          <div>
            <h3 className="mb-8 uppercase text-base font-semibold tracking-[0.06em] leading-[138%] text-white">
              About us
            </h3>
            <ul className="grid gap-4">
              {footerAboutUs.map((el, i) => (
                <li key={i}>
                  <Link href={el.link}>{el.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-8 uppercase text-base font-semibold tracking-[0.06em] leading-[138%] text-white">
              Services
            </h3>
            <ul className="grid gap-4">
              {footerServices.map((el, i) => (
                <li key={i}>
                  <Link href={el.link}>{el.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-8 uppercase text-base font-semibold tracking-[0.06em] leading-[138%] text-white">
              Portfolio
            </h3>
            <ul className="grid gap-4">
              {footerPortfolio.map((el, i) => (
                <li key={i}>
                  <Link href={el.link}>{el.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
      <p className="text-center py-8 text-[#a6a6a8] mx-4 border-t border-[#cac9cf]">
        Copyright © 2023 Moon| All Rights Reserved | Terms and Conditions |
        Privacy Policy
      </p>
    </footer>
  );
};
