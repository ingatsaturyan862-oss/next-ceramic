import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Title } from "./title";
import { PlateServices } from "./plate-services";
import { servicesTeam } from "@/constants/services";

interface Props {
  className?: string;
}

export const About: React.FC<Props> = ({ className }) => {
  return (
    <>
      <div className={cn("max-w-6xl mx-auto px-4 py-16", className)}>
        <div className="text-center mb-20">
          <Title size="l">ABOUT MOON</Title>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto">
            Moon&apos;s handmade ceramic products have been around since 1650,
            let&apos;s explore our journey
          </p>
        </div>

        <div className="grid md:grid-cols-2">
          <div className="bg-gray-100 p-10 flex items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-4">1650</h3>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipiscing eli mattis sit
                phasellus mollis sit aliquam sit nullam neque ultrices.
              </p>
            </div>
          </div>

          <div className="relative h-87.5">
            <Image src="/post/5.jpg" alt="" fill className="object-cover" />
          </div>

          <div className="relative h-87.5">
            <Image src="/post/6.jpg" alt="" fill className="object-cover" />
          </div>

          <div className="bg-gray-100 p-10 flex items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-4">1990</h3>
              <p className="text-gray-600">
                Maecenas sem eros, rutrum vitae risus eget, vulputate aliquam
                nisi. dolor sit amet consectetur adipiscing eli mattis sit
                phasellus mollis sit aliquam sit
              </p>
            </div>
          </div>

          <div className="bg-gray-100 p-10 flex items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-4">2010</h3>
              <p className="text-gray-600">
                Rutrum vitae risus eget, vulputate aliquam nisi ex gravida neque
                tempus. sit aliquam sit nullam neque ultrices.
              </p>
            </div>
          </div>

          <div className="relative h-87.5">
            <Image src="/post/7.jpg" alt="" fill className="object-cover" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center py-24">
          <div className="relative h-125">
            <Image src="/post/8.jpg" alt="" fill className="object-cover" />
          </div>

          <div>
            <Title size="m" className="mb-8">
              HOW WE WORK
            </Title>

            <div className="space-y-8">
              <div>
                <h3 className="font-semibold">Product Design</h3>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet consectetur adipiscing eli mattis
                  sit phasellus mollis.
                </p>
              </div>

              <div>
                <h3 className="font-semibold">Crafted</h3>
                <p className="text-gray-600">
                  Rutrum vitae risus eget, vulputate aliquam nisi ex gravida
                  neque tempus.
                </p>
              </div>

              <div>
                <h3 className="font-semibold">Sell product</h3>
                <p className="text-gray-600">
                  Maecenas sem eros, rutrum vitae risus eget, vulputate aliquam
                  nisi.
                </p>
              </div>
            </div>
          </div>
        </div>
        <PlateServices items={servicesTeam} title="MEET OUR TEAM" />
      </div>
    </>
  );
};
