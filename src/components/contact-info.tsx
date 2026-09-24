import React from "react";
import { cn } from "@/lib/utils";
import { Title } from "./title";

interface Props {
  className?: string;
}

export const ContactInfo: React.FC<Props> = (props) => {
  const { className } = props;
  return (
    <>
      <div className="mx-auto text-center my-12.5">
        <p className="text-[16px] leading-[150%] text-[#595667] max-w-132.5 mb-3 mx-auto">
          Lorem ipsum dolor sit amet consectetur adipiscing eli mattis sit
          phasellus mollis sit aliquam sit nullam.
        </p>
        <Title className="mb-12.5" size="l">
          Get in touch with us
        </Title>
      </div>
      <dl className={cn("text-center", className)}>
        <dt className="text-[14px] font-semibold leading-[143%] text-[#595667]">
          Office Hours :
        </dt>
        <dd className="text-[14px] font-semibold leading-[143%] text-[#c69b7b] mb-7.5">
          Monday - Friday 8:00 am to 5:00 pm
        </dd>
        <dt className="text-[14px] font-semibold leading-[143%] text-[#595667]">
          Email:
        </dt>
        <dd className="text-[14px] font-semibold leading-[143%] text-[#c69b7b] mb-7.5">
          contact@company.com
        </dd>
        <dt className="text-[14px] font-semibold leading-[143%] text-[#595667]">
          Phone :
        </dt>
        <dd className="text-[14px] font-semibold leading-[143%] text-[#c69b7b] mb-7.5">
          (414) 687 - 5892
        </dd>
        <dt className="text-[14px] font-semibold leading-[143%] text-[#595667]">
          Location :
        </dt>
        <dd className="text-[14px] font-semibold leading-[143%] text-[#c69b7b]">
          59 Middle Point Rd <br />
          San Francisco, 80412
        </dd>
      </dl>
    </>
  );
};
