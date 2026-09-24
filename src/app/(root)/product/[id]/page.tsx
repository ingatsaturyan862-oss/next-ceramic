import { Product } from "@/components/product/product";
import { prisma } from "@/prisma/prisma-client";
import { Metadata } from "next";

interface ParamsProps {
  params: Promise<{ id: string }>;
}

export const generateMetadata = async ({
  params,
}: ParamsProps): Promise<Metadata> => {
  const id = Number((await params).id);
  const product = await prisma.product.findUnique({
    where: { id },
    select: { name: true, text: true, imgUrl: true },
  });
  return {
    title: product?.name,
    description: product?.text,
    openGraph: {
      title: product?.name,
      description: product?.text,
      images: [
        {
          url: product?.imgUrl || "",
          width: 1200,
          height: 800,
          alt: product?.name,
        },
      ],
    },
    twitter: {
      title: product?.name,
      description: product?.text,
      images: [
        {
          url: product?.imgUrl || "",
          width: 1200,
          height: 800,
          alt: product?.name,
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
};

export default async function ProductPage({ params }: ParamsProps) {
  const id = Number((await params).id);
  const product = await prisma.product.findUnique({
    where: { id },
    include: { color: true },
  });
  if (!product) {
    return <h2>Product Not Found 404</h2>;
  }
  return <Product product={product} />;
}
