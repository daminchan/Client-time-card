"use server";
import { prisma } from "@/globals/db";
import { TimeCard } from "../types";
import { revalidatePath } from "next/cache";

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

export async function getTimeCardsForMonth(
  userId: string,
  year: number,
  month: number,
): Promise<TimeCard[]> {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);

  const timeCards = await prisma.timeCard.findMany({
    where: {
      userId: userId,
      date: {
        gte: startDate,
        lte: endDate,
      },
    },
    orderBy: {
      date: "desc",
    },
  });

  return timeCards;
}

export async function deleteTimeCardsForMonth(
  userId: string,
  year: number,
  month: number,
) {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);

  try {
    await prisma.timeCard.deleteMany({
      where: {
        userId: userId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
    });
    // revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete time cards for month:", error);
    return {
      success: false,
      error: "Failed to delete time cards for the specified month.",
    };
  }
}

export async function deleteTimeCard(userId: string, timeCardId: string) {
  try {
    await prisma.timeCard.delete({
      where: {
        id: timeCardId,
        userId: userId,
      },
    });
    // revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete time card:", error);
    return {
      success: false,
      error: "Failed to delete the specified time card.",
    };
  }
}
