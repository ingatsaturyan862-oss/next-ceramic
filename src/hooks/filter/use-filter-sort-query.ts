import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import qs from "qs";

interface SortProps {
  name: string;
  value: string;
}

export const useFilterSortQuery = (sort: SortProps[]) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = sort.find((el) => {
    return el.value === searchParams.get("sort");
  })?.name;
  const [sortBy, setSortBy] = React.useState(currentSort || sort[0].name);

  const handleSelect = (el: SortProps) => {
    setSortBy(el.name);
    const currentParams = qs.parse(searchParams.toString());
    const newParams = qs.stringify(
      {
        ...currentParams,
        sort: el.value,
      },
      {
        arrayFormat: "comma",
        encode: false,
      },
    );
    router.push(`?${newParams}`, { scroll: false });
  };

  return { handleSelect, sortBy };
};
