import { Box } from "@chakra-ui/react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";

import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import NavButton from "@/components/button/NavButton";
import FlexCol from "@/components/ui/FlexCol";
import TimeCardManager from "@/features/timeCard/components/TimeCardManager";

export default async function MyPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <FlexCol>
      <h1 className="text-2xl font-bold mb-4">マイページ</h1>
      <Box
        width="100%"
        maxW="400px"
        minW="400px"
        bg="gray.100"
        borderRadius="md"
        p={4}
      >
        <TimeCardManager userId={session.user.id} />
      </Box>
      <NavButton href="/protected/my-page/dashboard" label="ダッシュボード" />
      <NavButton
        href="/protected/my-page/dashboard/users"
        label="ユーザー管理"
      />
    </FlexCol>
  );
}
