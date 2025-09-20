import { redirect } from "next/navigation";
import { getValidatedUserData } from "@/lib/auth/jwt";
import DashboardView from "./view";

export default async function AppPage() {
  const user = await getValidatedUserData();

  if (!user) {
    redirect("/login");
  }

  return <DashboardView user={user} />;
}
