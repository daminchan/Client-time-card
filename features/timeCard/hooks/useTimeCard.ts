import { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";

import { clockIn, clockOut, getTimeCards } from "../action/timeCardAction";
import { TimeCard } from "../types";

export function useTimeCard(userId: string) {
  const [latestTimeCard, setLatestTimeCard] = useState<TimeCard | null>(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    fetchTimeCards();
  }, []);

  async function fetchTimeCards() {
    const cards = await getTimeCards(userId);
    setLatestTimeCard(cards[0] || null);
    setLoading(false);
  }

  async function handleClockIn() {
    const result = await clockIn(userId);
    handleActionResult(result, "出勤");
  }

  async function handleClockOut() {
    const result = await clockOut(userId);
    handleActionResult(result, "退勤");
  }

  function handleActionResult(
    result: { success: boolean; error?: string },
    action: string,
  ) {
    if (result.success) {
      fetchTimeCards();
      toast({
        title: action,
        description: `${action}処理が完了しました。`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "エラー",
        description: result.error,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }

  return {
    latestTimeCard,
    loading,
    handleClockIn,
    handleClockOut,
  };
}
