"use client";

import { useState } from "react";

import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import CustomButton from "@/components/button/CustomButton";
import FlexCol from "@/components/ui/FlexCol";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (password.length < 4) {
      toast({
        title: "エラー",
        description: "パスワードは4文字以上である必要があります。",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      toast({
        title: "ログイン失敗",
        description: "メールアドレスまたはパスワードが正しくありません。",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "ログイン成功",
        description: "ホームページにリダイレクトします。",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setTimeout(() => {
        router.push("/");
      }, 1500);
    }
    setIsLoading(false);
  }

  return (
    <Box maxWidth="400px" margin="auto" mt={8}>
      <Heading mb={6}>ログイン</Heading>
      <form onSubmit={handleSubmit}>
        <FlexCol>
          <FormControl isRequired>
            <FormLabel>メールアドレス</FormLabel>
            <Input type="email" name="email" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>パスワード</FormLabel>
            <Input type="password" name="password" minLength={4} />
          </FormControl>
          <CustomButton type="submit" width="full" isLoading={isLoading}>
            ログイン
          </CustomButton>
        </FlexCol>
      </form>
    </Box>
  );
}
