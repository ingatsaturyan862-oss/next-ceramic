import { ApiRoutes } from "@/constants/api-routes";
import { axiosInstance } from "./instance";

export const getSearch = async (search: string, limit: number = 5) =>
  (
    await axiosInstance.get(ApiRoutes.PRODUCTS, {
      params: { search, limit },
    })
  ).data;
