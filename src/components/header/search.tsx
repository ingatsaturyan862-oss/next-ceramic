"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import { Input } from "../ui/input";
import { useClickAway, useDebounce } from "react-use";
import { SearchContent } from "./search-content";
import { getSearch } from "@/lib/search";

interface Props {
  className?: string;
  btnClassName?: string;
  isOverlay?: boolean;
}

export const Search: React.FC<Props> = (props) => {
  const { className, btnClassName, isOverlay = true } = props;
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [data, setData] = React.useState<any[]>([]);

  const ref = React.useRef(null);
  useClickAway(ref, () => {
    setOpen(false);
  });

  // React.useEffect(() => {
  //   // const fetchData = async () => {
  //   //   const prod = await fetch("/api/products");
  //   //   const dat = await prod.json();
  //   //   setData(dat);
  //   // };
  //   // fetchData();
  //   (async () =>
  //     setData(
  //       await (await fetch(`/api/products?limit=5&search=${value}`)).json(),
  //     ))();
  // }, [value]);

  useDebounce(async () => setData(await getSearch(value)), 300, [value]);

  return (
    <>
      {open && isOverlay && (
        <div className="fixed inset-0 bg-black/50 z-150"></div>
      )}
      <div ref={ref} className={cn("relative z-151", className)}>
        <button
          aria-label="open search input"
          onClick={() => setOpen(true)}
          className={cn("hidden md:block cursor-pointer", btnClassName)}
        >
          <SearchIcon size={20} />
        </button>

        <Input
          aria-label="Search products"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={cn(
            "absolute right-[calc(100%+10px)] top-1/2 -translate-y-1/2 transition-[scale] duration-300 w-50 bg-white origin-right scale-x-0",
            {
              "scale-x-100": open,
            },
          )}
        />
        <SearchContent data={data} open={open} />
      </div>
    </>
  );
};
