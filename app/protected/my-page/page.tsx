import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { redirect } from "next/navigation";
import TimeCardManager from "@/features/timeCard/components/TimeCardManager";
import FlexCol from "@/components/ui/FlexCol";
import { Box } from "@chakra-ui/react";
import NavButton from "@/components/button/NavButton";

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
    </FlexCol>
  );
}
