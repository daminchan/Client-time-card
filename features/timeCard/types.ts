import { TimeCard as PrismaTimeCard } from "@prisma/client";

export type TimeCard = PrismaTimeCard;

export interface ActionResult {
  success: boolean;
  error?: string;
}
