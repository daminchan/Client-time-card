import { Text } from "@chakra-ui/react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import LogoutButton from "@/components/button/LogoutButton";
import NavButton from "@/components/button/NavButton";
import FlexCol from "@/components/ui/FlexCol";

import { authOptions } from "../api/auth/[...nextauth]/auth";

export default async function ProtectedPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <FlexCol>
      <Text mb={4}>ようこそ、{session.user?.name}さん！</Text>
      <NavButton label="マイページ" href="/protected/my-page" />
      <NavButton label="ユーザー登録" href="/protected/register" />
      <LogoutButton />
    </FlexCol>
  );
}
