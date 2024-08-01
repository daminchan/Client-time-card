import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import TimeCardManager from "@/features/timeCard/components/TimeCardManager";
import FlexCol from "@/components/ui/FlexCol";
import { Box } from "@chakra-ui/react";

export default async function MyPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <FlexCol align="center" justify="center" py={6}>
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
    </FlexCol>
  );
}
