"use server";
import { toZonedTime } from "date-fns-tz";
import { prisma } from "@/globals/db";

export async function clockIn(userId: string) {
  const lastUnfinishedWork = await prisma.timeCard.findFirst({
    where: {
      userId: userId,
      endTime: null,
    },
    orderBy: {
      startTime: "desc",
    },
  });

  // 未終了の作業がある場合はエラーを返す
  if (lastUnfinishedWork) {
    return {
      success: false,
      error: "前回の作業が終了していません。まず退勤処理を行ってください。",
    };
  }

  const now = toZonedTime(new Date(), "Asia/Tokyo");

  // 新しい作業記録を作成
  const timeCard = await prisma.timeCard.create({
    data: {
      userId: userId,
      date: now, // 日付と時間を両方保存
      startTime: now,
    },
  });

  return { success: true, data: timeCard };
}

export async function clockOut(userId: string) {
  const now = toZonedTime(new Date(), "Asia/Tokyo");

  const lastUnfinishedWork = await prisma.timeCard.findFirst({
    where: {
      userId: userId,
      endTime: null,
    },
    orderBy: {
      startTime: "desc",
    },
  });

  // 未開始の作業がない場合はエラーを返す
  if (!lastUnfinishedWork) {
    return {
      success: false,
      error: "開始されていない作業があります。まず出勤処理を行ってください。",
    };
  }

  const updatedTimeCard = await prisma.timeCard.update({
    where: { id: lastUnfinishedWork.id },
    data: { endTime: now },
  });

  return { success: true, data: updatedTimeCard };
}

export async function getTimeCards(userId: string) {
  const timeCards = await prisma.timeCard.findMany({
    where: { userId },
    orderBy: { startTime: "desc" },
  });
  return timeCards;
}

export async function deleteTimeCard(id: string) {
  try {
    await prisma.timeCard.delete({ where: { id } });
    return { success: true };
  } catch (error) {
    return { success: false, error: "タイムカードの削除に失敗しました。" };
  }
}
