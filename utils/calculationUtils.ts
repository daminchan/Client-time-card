import { TimeCard } from "@/features/timeCard/types";

export const calculateWorkingHours = (timeCard: TimeCard): string => {
  if (!timeCard.startTime || !timeCard.endTime) return "0.00";
  const diff = timeCard.endTime.getTime() - timeCard.startTime.getTime();
  return (diff / 3600000).toFixed(2);
};

export function calculateTotalHours(timeCards: TimeCard[]): number {
  return timeCards.reduce((total, card) => {
    if (card.startTime && card.endTime) {
      const diff = card.endTime.getTime() - card.startTime.getTime();
      return total + diff / (1000 * 60 * 60); // ミリ秒を時間に変換
    }
    return total;
  }, 0);
}

export function calculateTotalEarnings(
  timeCards: TimeCard[],
  hourlyRate: number,
): number {
  const totalHours = calculateTotalHours(timeCards);
  return totalHours * hourlyRate;
}

// interface TimeCard {
//   startTime: Date | null;
//   endTime: Date | null;
// }

// export const calculateWorkingHours = (
//   startTime: Date | null,
//   endTime: Date | null,
// ): string => {
//   if (!startTime || !endTime) return "0.00";
//   return ((endTime.getTime() - startTime.getTime()) / 3600000).toFixed(2);
// };

// export const calculateTotalHours = (timeCards: TimeCard[]): number => {
//   return timeCards.reduce((total, card) => {
//     if (card.startTime && card.endTime) {
//       const hours =
//         (card.endTime.getTime() - card.startTime.getTime()) / 3600000;
//       return total + hours;
//     }
//     return total;
//   }, 0);
// };

// export const calculateTotalEarnings = (timeCards: TimeCard[], hourlyRate: number): number => {
//   const totalHours = calculateTotalHours(timeCards);
//   return totalHours * hourlyRate;
// };
