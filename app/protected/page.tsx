import { redirect } from "next/navigation";

import { Heading, Text } from "@chakra-ui/react";
import LogoutButton from "@/components/button/LogoutButton";

import FlexCol from "@/components/ui/FlexCol";
import NavButton from "@/components/button/NavButton";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/auth";

export default async function ProtectedPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <FlexCol>
      <Heading mb={4}>保護されたページ</Heading>
      <Text mb={4}>ようこそ、{session.user?.name}さん！</Text>
      <NavButton label="マイページ" href="/protected/my-page" />
      <LogoutButton />
    </FlexCol>
  );
}
