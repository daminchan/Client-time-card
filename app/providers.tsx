// app/providers.tsx
"use client";

import customTheme from "@/theme/theme";
import { ChakraProvider } from "@chakra-ui/react";

import { SessionProvider } from "next-auth/react";
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={customTheme}>
      <SessionProvider>{children}</SessionProvider>
    </ChakraProvider>
  );
}
