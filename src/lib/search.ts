import { ApiRoutes } from "@/constants/api-routes";
import { axiosInstance } from "../shared/api/instance";

export const getSearch = async (search: string, limit: number = 5) =>
  (
    await axiosInstance.get(ApiRoutes.PRODUCTS, {
      params: { search, limit },
    })
  ).data;
