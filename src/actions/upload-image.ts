"use server";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (image: File) => {
  if (!image.type.includes("image/")) {
    throw new Error("File is not image");
  }
  if (image.size > 5 * 1024 * 1024) {
    throw new Error("File is to Large");
  }

  const buffer = Buffer.from(await image.arrayBuffer());
  const base64 = `data:${image.type};base64,${buffer.toString("base64")}`;

  const res = await cloudinary.uploader.upload(base64, {
    folder: "next ceramic",
  });

  return res.secure_url;
};
