"use client";

import { Box, Flex, Button } from "@chakra-ui/react";
import { useSession } from "next-auth/react";

import LogoutButton from "../button/LogoutButton";
import NavButton from "../button/NavButton";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <Box bg="gray.100" px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Flex gap={2}>
          <NavButton href="/" label="ホーム" />
          {session && <NavButton href="/protected" label="マイページ" />}
        </Flex>
        <Box>
          {session ? (
            <LogoutButton />
          ) : (
            <NavButton href="/login" label="ログイン" />
          )}
        </Box>
      </Flex>
    </Box>
  );
}
