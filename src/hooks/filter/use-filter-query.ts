import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import qs from "qs";
import { Filter } from "./use-filter";

export const useFilterQuery = (data: Filter) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentParams = qs.parse(searchParams.toString());
  React.useEffect(() => {
    const query = qs.stringify(
      {
        ...currentParams,
        category: Array.from(data.category),
        price: Array.from(data.price),
        color: Array.from(data.color),
      },
      {
        arrayFormat: "comma",
        encode: false,
      },
    );

    router.push(`?${query}`, { scroll: false });
  }, [data.category, data.color, data.price]);
};
