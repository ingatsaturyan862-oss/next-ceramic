import { Shop } from "@/components/shop";
import { getFilterProducts, GetSearchParams } from "@/lib/get-filter-products";
import { getFilterShop } from "@/lib/get-filter-shop";
import { Metadata } from "next";
interface SearchParamsProps {
  searchParams: Promise<GetSearchParams>;
}

export const metadata: Metadata = { title: "Shop" }

export default async function ShopPage({ searchParams }: SearchParamsProps) {
  const filter = await getFilterShop();
  const { products, count, page, totalPages } = await getFilterProducts(
    await searchParams,
    filter.priceRange,
  );
  return (
    <Shop
      count={count}
      page={page}
      totalPages={totalPages}
      products={products}
      filter={filter}
    />
  );
}
