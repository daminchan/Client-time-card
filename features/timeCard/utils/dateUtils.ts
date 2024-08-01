import { format, toZonedTime } from "date-fns-tz";
import { ja } from "date-fns/locale";

export const formatDate = (date: Date): string => {
  return format(toZonedTime(date, "Asia/Tokyo"), "yyyy/MM/dd", { locale: ja });
};

export const formatTime = (date: Date | null): string => {
  if (!date) return "未設定";
  return format(toZonedTime(date, "Asia/Tokyo"), "HH:mm", { locale: ja });
};

export const calculateWorkingHours = (
  startTime: Date | null,
  endTime: Date | null
): string => {
  if (!startTime || !endTime) return "0.00";
  return ((endTime.getTime() - startTime.getTime()) / 3600000).toFixed(2);
};

export const calculateTotalHours = (
  timeCards: { startTime: Date | null; endTime: Date | null }[]
): number => {
  return timeCards.reduce((total, card) => {
    if (card.startTime && card.endTime) {
      const hours =
        (card.endTime.getTime() - card.startTime.getTime()) / 3600000;
      return total + hours;
    }
    return total;
  }, 0);
};
