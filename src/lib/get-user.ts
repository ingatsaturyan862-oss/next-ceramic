import { headers } from "next/headers";
import { auth } from "./auth";

export const getUser = async () => {
  try {
    const data = await auth.api.getSession({ headers: await headers() });
    if (!data?.user) {
      return null;
    }
    return data.user;
  } catch (error) {
    console.log(error);
    return null;
  }
};
