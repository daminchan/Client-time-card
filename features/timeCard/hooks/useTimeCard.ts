import { useState, useEffect, useCallback } from "react";
import { useToast } from "@chakra-ui/react";

import {
  clockIn,
  clockOut,
  getLatestTimeCard,
  getTimeCardsForMonth,
  deleteTimeCard,
  deleteTimeCardsForMonth,
} from "../action/timeCardAction";
import { TimeCard } from "../types";

export function useTimeCard(userId: string) {
  const [latestTimeCard, setLatestTimeCard] = useState<TimeCard | null>(null);
  const [monthlyTimeCards, setMonthlyTimeCards] = useState<TimeCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(() => new Date());
  const [cache, setCache] = useState<Record<string, TimeCard[]>>({});
  const toast = useToast();

  const fetchLatestTimeCard = useCallback(async () => {
    try {
      setLoading(true);
      const card = await getLatestTimeCard(userId);
      setLatestTimeCard(card);
    } catch (error) {
      console.error("Failed to fetch latest time card:", error);
      toast({
        title: "エラー",
        description: "最新のタイムカード情報の取得に失敗しました。",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  }, [userId, toast]);

  useEffect(() => {
    fetchLatestTimeCard();
  }, [fetchLatestTimeCard]);

  const handleActionResult = useCallback(
    async (result: { success: boolean; error?: string }, action: string) => {
      if (result.success) {
        await fetchLatestTimeCard();
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
    },
    [fetchLatestTimeCard, toast],
  );

  const handleClockIn = useCallback(async () => {
    const result = await clockIn(userId);
    handleActionResult(result, "出勤");
  }, [userId, handleActionResult]);

  const handleClockOut = useCallback(async () => {
    const result = await clockOut(userId);
    handleActionResult(result, "退勤");
  }, [userId, handleActionResult]);

  const fetchMonthlyTimeCards = useCallback(
    async (date: Date) => {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const cacheKey = `${year}-${month}`;

      if (cache[cacheKey]) {
        setMonthlyTimeCards(cache[cacheKey]);
        return;
      }

      try {
        setLoading(true);
        const cards = await getTimeCardsForMonth(userId, year, month);
        setMonthlyTimeCards(cards);
        setCache((prevCache) => ({
          ...prevCache,
          [cacheKey]: cards,
        }));
      } catch (error) {
        console.error("Failed to fetch monthly time cards:", error);
        toast({
          title: "エラー",
          description: "月間のタイムカード情報の取得に失敗しました。",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    },
    [userId, toast, cache],
  );

  const handleDeleteMonthlyTimeCards = useCallback(async () => {
    if (
      window.confirm(
        `${selectedMonth.getFullYear()}年${
          selectedMonth.getMonth() + 1
        }月のすべてのタイムカードを削除しますか？`,
      )
    ) {
      const result = await deleteTimeCardsForMonth(
        userId,
        selectedMonth.getFullYear(),
        selectedMonth.getMonth() + 1,
      );
      if (result.success) {
        setMonthlyTimeCards([]);
        setCache((prevCache) => ({
          ...prevCache,
          [`${selectedMonth.getFullYear()}-${selectedMonth.getMonth() + 1}`]:
            [],
        }));
        toast({
          title: "削除成功",
          description: `${selectedMonth.getFullYear()}年${
            selectedMonth.getMonth() + 1
          }月のタイムカードをすべて削除しました。`,
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
  }, [userId, selectedMonth, toast]);

  const handleDeleteTimeCard = useCallback(
    async (timeCardId: string) => {
      if (window.confirm("このタイムカードを削除しますか？")) {
        const result = await deleteTimeCard(userId, timeCardId);
        if (result.success) {
          setMonthlyTimeCards((prevCards) =>
            prevCards.filter((card) => card.id !== timeCardId),
          );
          setCache((prevCache) => ({
            ...prevCache,
            [`${selectedMonth.getFullYear()}-${selectedMonth.getMonth() + 1}`]:
              prevCache[
                `${selectedMonth.getFullYear()}-${selectedMonth.getMonth() + 1}`
              ].filter((card) => card.id !== timeCardId),
          }));
          toast({
            title: "削除成功",
            description: "指定されたタイムカードを削除しました。",
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
    },
    [userId, selectedMonth, toast],
  );

  const handleMonthChange = useCallback((increment: number) => {
    setSelectedMonth((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + increment);
      return newDate;
    });
  }, []);

  return {
    latestTimeCard,
    monthlyTimeCards,
    loading,
    selectedMonth,
    handleClockIn,
    handleClockOut,
    fetchMonthlyTimeCards,
    handleDeleteMonthlyTimeCards,
    handleDeleteTimeCard,
    handleMonthChange,
  };
}
// import { useState, useEffect, useCallback } from "react";
// import { useToast } from "@chakra-ui/react";

// import {
//   clockIn,
//   clockOut,
//   getLatestTimeCard,
//   getTimeCardsForMonth,
//   deleteTimeCard,
//   deleteTimeCardsForMonth,
// } from "../action/timeCardAction";
// import { TimeCard } from "../types";

// export function useTimeCard(userId: string) {
//   const [latestTimeCard, setLatestTimeCard] = useState<TimeCard | null>(null);
//   const [monthlyTimeCards, setMonthlyTimeCards] = useState<TimeCard[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedMonth, setSelectedMonth] = useState(() => new Date());
//   const [cache, setCache] = useState<Record<string, TimeCard[]>>({});
//   const toast = useToast();

//   const fetchLatestTimeCard = useCallback(async () => {
//     try {
//       setLoading(true);
//       const card = await getLatestTimeCard(userId);
//       setLatestTimeCard(card);
//     } catch (error) {
//       console.error("Failed to fetch latest time card:", error);
//       toast({
//         title: "エラー",
//         description: "最新のタイムカード情報の取得に失敗しました。",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//       });
//     } finally {
//       setLoading(false);
//     }
//   }, [userId, toast]);

//   useEffect(() => {
//     fetchLatestTimeCard();
//   }, [fetchLatestTimeCard]);

//   async function handleClockIn() {
//     const result = await clockIn(userId);
//     handleActionResult(result, "出勤");
//   }

//   async function handleClockOut() {
//     const result = await clockOut(userId);
//     handleActionResult(result, "退勤");
//   }

//   async function handleActionResult(
//     result: { success: boolean; error?: string },
//     action: string
//   ) {
//     if (result.success) {
//       await fetchLatestTimeCard();
//       toast({
//         title: action,
//         description: `${action}処理が完了しました。`,
//         status: "success",
//         duration: 3000,
//         isClosable: true,
//       });
//     } else {
//       toast({
//         title: "エラー",
//         description: result.error,
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//       });
//     }
//   }

//   const fetchMonthlyTimeCards = useCallback(
//     async (date: Date) => {
//       const year = date.getFullYear();
//       const month = date.getMonth() + 1;
//       const cacheKey = `${year}-${month}`;

//       if (cache[cacheKey]) {
//         setMonthlyTimeCards(cache[cacheKey]);
//         return;
//       }

//       try {
//         setLoading(true);
//         const cards = await getTimeCardsForMonth(userId, year, month);
//         setMonthlyTimeCards(cards);
//         setCache((prevCache) => ({
//           ...prevCache,
//           [cacheKey]: cards,
//         }));
//       } catch (error) {
//         console.error("Failed to fetch monthly time cards:", error);
//         toast({
//           title: "エラー",
//           description: "月間のタイムカード情報の取得に失敗しました。",
//           status: "error",
//           duration: 5000,
//           isClosable: true,
//         });
//       } finally {
//         setLoading(false);
//       }
//     },
//     [userId, toast, cache]
//   );

//   const handleDeleteMonthlyTimeCards = useCallback(async () => {
//     if (
//       window.confirm(
//         `${selectedMonth.getFullYear()}年${selectedMonth.getMonth() + 1}月のすべてのタイムカードを削除しますか？`
//       )
//     ) {
//       const result = await deleteTimeCardsForMonth(
//         userId,
//         selectedMonth.getFullYear(),
//         selectedMonth.getMonth() + 1
//       );
//       if (result.success) {
//         // await fetchMonthlyTimeCards(selectedMonth);
//         setMonthlyTimeCards([]);
//         toast({
//           title: "削除成功",
//           description: `${selectedMonth.getFullYear()}年${selectedMonth.getMonth() + 1}月のタイムカードをすべて削除しました。`,
//           status: "success",
//           duration: 3000,
//           isClosable: true,
//         });
//       } else {
//         toast({
//           title: "エラー",
//           description: result.error,
//           status: "error",
//           duration: 5000,
//           isClosable: true,
//         });
//       }
//     }
//   }, [userId, selectedMonth, fetchMonthlyTimeCards, toast]);

//   const handleDeleteTimeCard = useCallback(
//     async (timeCardId: string) => {
//       if (window.confirm("このタイムカードを削除しますか？")) {
//         const result = await deleteTimeCard(userId, timeCardId);
//         if (result.success) {
//           // await fetchMonthlyTimeCards(selectedMonth);
//           setMonthlyTimeCards((prevCards) =>
//             prevCards.filter((card) => card.id !== timeCardId)
//           ); // UIを即座に更新
//           toast({
//             title: "削除成功",
//             description: "指定されたタイムカードを削除しました。",
//             status: "success",
//             duration: 3000,
//             isClosable: true,
//           });
//         } else {
//           toast({
//             title: "エラー",
//             description: result.error,
//             status: "error",
//             duration: 5000,
//             isClosable: true,
//           });
//         }
//       }
//     },
//     [userId, selectedMonth, fetchMonthlyTimeCards, toast]
//   );

//   const handleMonthChange = useCallback((increment: number) => {
//     setSelectedMonth((prevDate) => {
//       const newDate = new Date(prevDate);
//       newDate.setMonth(newDate.getMonth() + increment);
//       return newDate;
//     });
//   }, []);
//   return {
//     latestTimeCard,
//     monthlyTimeCards,
//     loading,
//     selectedMonth,
//     handleClockIn,
//     handleClockOut,
//     fetchMonthlyTimeCards,
//     handleDeleteMonthlyTimeCards,
//     handleDeleteTimeCard,
//     handleMonthChange,
//   };
// }
