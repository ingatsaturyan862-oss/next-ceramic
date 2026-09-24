"use server";

import { ContactTemplate } from "@/components/email-templates";
import {
  contactFormSchema,
  ContactFormSchemaType,
} from "@/constants/form-schema/contact.schema";
import { sendEmail } from "@/lib/send-email";
import { prisma } from "@/prisma/prisma-client";

export const sendMessageContactAction = async (
  dataObj: ContactFormSchemaType,
) => {
  const parsedData = contactFormSchema.safeParse(dataObj);
  if (!parsedData.success) {
    throw new Error(parsedData.error.message);
  }
  const data = parsedData.data;
  await prisma.contact.create({
    data,
  });
  await sendEmail({
    to: "vaa.hovanisyan@gmail.com",
    subject: "Next Ceramic new Contact",
    react: ContactTemplate(data),
  });
};
