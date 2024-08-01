"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import LogoutButton from "@/components/button/LogoutButton";

export default function ProtectedPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <Box>Loading...</Box>;
  }

  if (!session) {
    return null;
  }

  return (
    <Box p={5}>
      <Heading mb={4}>保護されたページ</Heading>
      <Text mb={4}>ようこそ、{session.user?.name}さん！</Text>
      <LogoutButton />
    </Box>
  );
}
