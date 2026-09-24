import { Contact } from "@/components/contact";
import { prisma } from "@/prisma/prisma-client";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Profile" }
export default async function ContactPage() {
  const hero = await prisma.contactHero.findUnique({
    where: {
      id: 1,
    },
  });

  return <Contact hero={hero!} />;
}