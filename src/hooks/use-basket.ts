/* eslint-disable @typescript-eslint/no-explicit-any */
import { PostBasketValue } from "@/@types/basket";
import { ApiRoutes } from "@/constants/api-routes";
import { useSession } from "@/lib/auth-client";
import { fetcher } from "@/lib/fetcher";
import { axiosInstance } from "@/lib/instance";
import { useBasketStore } from "@/store/use-basket-store";
import { Product } from "@prisma/client";
import useSWR from "swr";

export const useBasket = () => {
  const { data } = useSession();
  const isAuthed = !!data?.session;
  const { addItem, basket, deleteAllItems, quantity, removeItem, updateItem } =
    useBasketStore();

  const anonIds = basket.map((el) => Number(el.id)).join(",");

  const {
    data: anonProducts,
    isLoading: localLoading,
    error: localError,
  } = useSWR<Product[]>(
    !isAuthed ? `${ApiRoutes.PRODUCTS}?ids=${anonIds}` : null,
    fetcher,
  );

  const dataAnonProducts = anonProducts ?? [];

  const dataAnon = dataAnonProducts?.map((el) => {
    const existing = basket.find((item) => item.id === el.id);
    if (!existing) {
      return [];
    }
    return {
      id: el.id,
      colorId: existing.colorId,
      quantity: existing.quantity,
      name: el.name,
      price: el.price,
      imgUrl: el.imgUrl,
      subtotal: el.price * existing.quantity,
    };
  });

  const totalAmountAnon = dataAnon?.reduce(
    (acc, el: any) => acc + el.price * el.quantity,
    0,
  );

  const {
    data: authProducts,
    isLoading: authBasketLoading,
    error: authError,
    mutate,
  } = useSWR(isAuthed ? ApiRoutes.BASKET : null, fetcher);

  const dataAuthBasket = authProducts ?? { items: [], totalAmount: 0 };

  const basketItems = isAuthed
    ? dataAuthBasket
    : { items: dataAnon, totalAmount: totalAmountAnon };

  const quantityBasket = isAuthed
    ? dataAuthBasket.items?.reduce(
        (acc: number, el: any) => acc + el.quantity,
        0,
      )
    : quantity;

  const addProduct = async (value: PostBasketValue) => {
    if (!isAuthed) {
      addItem(value.productId, value.quantity, value.colorId);
      return;
    }
    const updateData = await axiosInstance.post(ApiRoutes.BASKET, value);
    mutate(updateData);
  };

  const removeProduct = async (id: number) => {
    if (!isAuthed) {
      removeItem(id);
      return;
    }
    const updateData = await axiosInstance.delete(`${ApiRoutes.BASKET}/${id}`);
    mutate(updateData, { populateCache: false });
  };

  const updateProduct = async (id: number, type: "increment" | "decrement") => {
    if (!isAuthed) {
      updateItem(id, type);
      return;
    }
    const updateData = await axiosInstance.patch(`${ApiRoutes.BASKET}/${id}`, {
      quantityType: type,
    });
    mutate(updateData, { populateCache: false });
  };

  const clearBasket = async () => {
    if (!isAuthed) {
      deleteAllItems();
      return;
    }
    const updateData = await axiosInstance.delete(ApiRoutes.BASKET);
    mutate(updateData, { populateCache: false });
  };

  return {
    quantity: quantityBasket,
    basket: basketItems,
    addProduct,
    removeProduct,
    updateProduct,
    clearBasket,
    isLoading: isAuthed ? authBasketLoading : localLoading,
    error: isAuthed ? authError : localError,
  };
};
