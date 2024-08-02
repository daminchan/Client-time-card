import { Box } from "@chakra-ui/react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";

import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import NavButton from "@/components/button/NavButton";
import FlexCol from "@/components/ui/FlexCol";
import UserTable from "@/features/user/components/UserTable";

export default async function UsersPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <FlexCol>
      <h1 className="text-2xl font-bold mb-4">ユーザー管理ページ</h1>
      <Box p={4}>
        <UserTable />
      </Box>
      <NavButton href="/protected/my-page" label="マイページ" />
    </FlexCol>
  );
}
