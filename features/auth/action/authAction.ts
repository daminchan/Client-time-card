"use server";

import { prisma } from "@/globals/db";
import { compare } from "bcryptjs";

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "メールアドレスとパスワードを入力してください。" };
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return { error: "ユーザーが見つかりません。" };
    }

    const isValid = await compare(password, user.password);
    if (!isValid) {
      return { error: "パスワードが正しくありません。" };
    }

    // ここでセッションを作成したり、JWTトークンを生成したりします
    // 簡単のため、ユーザー情報を返すだけにしています
    return {
      success: "ログインに成功しました。",
      user: { id: user.id, email: user.email, name: user.name },
    };
  } catch (error) {
    console.error("Login error:", error);
    return { error: "ログインに失敗しました。" };
  }
}
