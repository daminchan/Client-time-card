"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/globals/db";

export async function getUsers() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
    },
  });
  return users;
}

export async function deleteUser(userId: string) {
  try {
    await prisma.user.delete({
      where: { id: userId },
    });

    // ユーザー一覧ページのキャッシュを更新
    revalidatePath("/protected/my-page/dashboard/users");

    return { success: true, message: "ユーザーが正常に削除されました。" };
  } catch (error) {
    console.error("Failed to delete user:", error);
    return { success: false, message: "ユーザーの削除に失敗しました。" };
  }
}
