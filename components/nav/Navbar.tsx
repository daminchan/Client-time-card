"use client";

import { Box, Flex, Button } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import LogoutButton from "../button/LogoutButton";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <Box bg="gray.100" px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Box>
          <Link href="/">
            <Button variant="ghost">ホーム</Button>
          </Link>
          {session && (
            <Link href="/protected">
              <Button variant="ghost">保護されたページ</Button>
            </Link>
          )}
        </Box>
        <Box>
          {session ? (
            <LogoutButton />
          ) : (
            <Link href="/login">
              <Button colorScheme="blue">ログイン</Button>
            </Link>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
