"use client";
import { useEffect } from "react";
import { mutate } from "swr";
import { useSession } from "@/lib/auth-client";
import { useBasketStore } from "@/store/use-basket-store";
import { axiosInstance } from "@/lib/instance";
import { ApiRoutes } from "@/constants/api-routes";

export const BasketSyncer = () => {
  const { data: session, isPending } = useSession();
  const basket = useBasketStore((s) => s.basket);
  const clearLocal = useBasketStore((s) => s.deleteAllItems);

  useEffect(() => {
    if (isPending) return;
    if (!session?.user) {
      return;
    }

    if (basket.length === 0) {
      mutate(ApiRoutes.BASKET);
      return;
    }

    (async () => {
      try {
        await axiosInstance.post(ApiRoutes.BASKET_MERGE, {
          localItems: basket.map((el) => ({
            productId: el.id,
            quantity: el.quantity,
            colorId: el.colorId,
          })),
        });
        clearLocal();
        mutate(ApiRoutes.BASKET);
      } catch (e) {
        console.error("basket merge failed", e);
      }
    })();
  }, [session]);

  return null;
};
