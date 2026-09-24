import { uploadImage } from "@/actions/upload-image";

export const createImage = async (image: string | File | null | undefined) => {
  let img = typeof image === "string" ? image : undefined;
  if (image instanceof File) {
    img = await uploadImage(image);
  }
  return img;
};
