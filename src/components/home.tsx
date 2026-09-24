import React from "react";
import { Catalog } from "./catalog";
import { cn } from "@/lib/utils";
import { Hero } from "./hero";
import { PlateServices } from "./plate-services";
import { Post } from "./post";
import { servicesHome } from "@/constants/services";
import { Title } from "./title";
import { HomeHero, Product } from "@prisma/client";

interface Props {
  className?: string;
  products: Product[];
  hero: HomeHero | null;
}

export const Home: React.FC<Props> = (props) => {
  const { className, products, hero } = props;
  return (
    <div className={cn("", className)}>
      <Hero
        color={hero?.color}
        desctopImgUrl={hero?.imgUrlDesktop}
        mobileImgUrl={hero?.imgUrlMobile}
      >
        <h2 className="my-5">{hero?.title}</h2>
      </Hero>
      <PlateServices items={servicesHome} />
      <Post
        imgUrl="/post/1.jpg"
        title="Up to 40% off our Christmas collection"
        text="Lorem ipsum dolor sit amet consectetur adipiscing eli mattis sit phasellus mollis sit aliquam sit nullam neque ultrices."
        linkText="Shop now"
      />
      <Catalog items={products} />
      <Post
        imgUrl="/post/2.jpg"
        text="Lorem ipsum dolor sit amet consectetur adipiscing eli mattis sit phasellus mollis sit aliquam sit nullam neque ultrices."
        title="Made in viet Nam since 1450"
        linkText="Lear more"
        imgClassName="object-top"
      />
      <Post
        dir="right"
        imgUrl="/post/3.jpg"
        text="Lorem ipsum dolor sit amet consectetur adipiscing eli mattis sit phasellus mollis sit aliquam sit nullam neque ultrices."
        title="Our History"
        linkText="Lear more"
        imgClassName="object-top"
      />
      <Catalog items={products.slice(0, 4)} />
      <Title className="text-center mb-12" size="l">
        OUR BLOG
      </Title>
      <Post
        dir="right"
        imgUrl="/post/4.jpg"
        text="Lorem ipsum dolor sit amet consectetur adipiscing eli mattis sit phasellus mollis sit aliquam sit nullam neque ultrices."
        title="Our HistoryThe secrets to a kitchen room"
        linkText="Lear more"
        imgClassName="object-top"
      />
    </div>
  );
};
