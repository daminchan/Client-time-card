"use client";
import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Text,
} from "@chakra-ui/react";
import { registerUser } from "@/features/register/action/registerAction";
import FlexCol from "@/components/ui/FlexCol";
export default function RegisterPage() {
  const [message, setMessage] = useState("");

  async function handleSubmit(formData: FormData) {
    const result = await registerUser(formData);
    if (result.error) {
      setMessage(result.error);
    } else if (result.success) {
      setMessage(result.success);
    }
  }

  return (
    <Box maxWidth="400px" margin="auto" mt={8}>
      <Heading mb={6}>ユーザー登録</Heading>
      <form action={handleSubmit}>
        <FlexCol>
          <FormControl isRequired>
            <FormLabel>メールアドレス</FormLabel>
            <Input type="email" name="email" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>パスワード</FormLabel>
            <Input type="password" name="password" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>名前</FormLabel>
            <Input type="text" name="name" />
          </FormControl>
          <Button type="submit" colorScheme="blue" width="full">
            登録
          </Button>
        </FlexCol>
      </form>
      {message && (
        <Text mt={4} color={message.includes("失敗") ? "red.500" : "green.500"}>
          {message}
        </Text>
      )}
    </Box>
  );
}
