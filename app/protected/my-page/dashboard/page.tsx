import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import NavButton from "@/components/button/NavButton";
import FlexCol from "@/components/ui/FlexCol";
import DashboardDisplay from "@/features/dashboard/components/DashboardDisplay";
import { getTimeCardsForMonth } from "@/features/timeCard/action/timeCardAction";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <FlexCol>
      <h1 className="text-2xl font-bold mb-4">ダッシュボード</h1>
      <DashboardDisplay userId={session.user.id} />
      <NavButton href="/protected/my-page" label="マイページ" />
    </FlexCol>
  );
}
