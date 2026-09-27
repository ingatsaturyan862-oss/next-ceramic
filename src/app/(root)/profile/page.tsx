import { Profile } from "@/components/profile";
import { getUser } from "@/lib/get-user";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic"
export const metadata: Metadata = { title: "Profile" }

export default async function ProfilePage() {
  const user = await getUser();
  if (!user) {
    return redirect("/");
  }
  return <Profile user={user} />;
}
