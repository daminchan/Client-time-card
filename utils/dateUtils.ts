import { ja } from "date-fns/locale";
import { format, toZonedTime } from "date-fns-tz";

export const formatDate = (date: Date): string => {
  return format(toZonedTime(date, "Asia/Tokyo"), "yyyy/MM/dd", { locale: ja });
};

export const formatTime = (date: Date | null): string => {
  if (!date) return "未設定";
  return format(toZonedTime(date, "Asia/Tokyo"), "HH:mm", { locale: ja });
};
