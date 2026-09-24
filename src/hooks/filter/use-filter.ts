import { useSearchParams } from "next/navigation";
import { useSet } from "react-use";

export interface Filter {
  category: Set<string>;
  price: Set<string>;
  color: Set<string>;
  categoryToggle: (key: string) => void;
  priceToggle: (key: string) => void;
  colorToggle: (key: string) => void;
}

export const useFilter = () => {
  const searchParams = useSearchParams();

  const getParams = (name: string) => {
    return searchParams.get(name)?.split(",") || [];
  };

  const [category, { toggle: categoryToggle }] = useSet<string>(
    new Set(getParams("category")),
  );
  const [price, { toggle: priceToggle }] = useSet<string>(
    new Set(getParams("price")),
  );
  const [color, { toggle: colorToggle }] = useSet<string>(
    new Set(getParams("color")),
  );

  return {
    category,
    price,
    color,
    categoryToggle,
    priceToggle,
    colorToggle,
  };
};
