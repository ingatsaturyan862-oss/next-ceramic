import { Basket } from "@/components/basket/basket";
import { Metadata } from "next";
export const metadata: Metadata = { title: "Basket" }

export default function BasketPage() {
  return <Basket />;
}
