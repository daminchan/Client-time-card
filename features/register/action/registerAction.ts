"use server";

import { prisma } from "@/globals/db";
import { hash } from "bcryptjs";

export async function registerUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  if (!email || !password || !name) {
    return { error: "全てのフィールドを入力してください。" };
  }

  try {
    const hashedPassword = await hash(password, 12);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        // roleはデフォルト値を使用
      },
    });
    return { success: "登録が完了しました。", user };
  } catch (error) {
    console.error("Registration error:", error);
    return { error: "登録に失敗しました。" };
  }
}
