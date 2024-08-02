"use server";
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

  if (lastUnfinishedWork) {
    return {
      success: false,
      error: "前回の作業が終了していません。まず退勤処理を行ってください。",
    };
  }

  const now = new Date();

  const timeCard = await prisma.timeCard.create({
    data: {
      userId: userId,
      date: now,
      startTime: now,
    },
  });

  return { success: true, data: timeCard };
}

export async function clockOut(userId: string) {
  const lastUnfinishedWork = await prisma.timeCard.findFirst({
    where: {
      userId: userId,
      endTime: null,
    },
    orderBy: {
      startTime: "desc",
    },
  });

  if (!lastUnfinishedWork) {
    return {
      success: false,
      error: "開始されていない作業があります。まず出勤処理を行ってください。",
    };
  }

  const now = new Date();

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

export async function getLatestTimeCard(userId: string) {
  const latestTimeCard = await prisma.timeCard.findFirst({
    where: {
      userId: userId,
    },
    orderBy: {
      startTime: "desc",
    },
  });

  return latestTimeCard;
}
