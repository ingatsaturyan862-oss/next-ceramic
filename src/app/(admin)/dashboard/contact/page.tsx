import { AdminHero } from "@/components/admin/admin-hero";
import { prisma } from "@/prisma/prisma-client";

export default async function AdminContactPage() {
  const data = await prisma.contactHero.findFirst();

  return <AdminHero data={data} type="contact" />;
}
