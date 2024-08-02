"use client";

import { useEffect } from "react";

import { Box, Table, Tbody, Td, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";

import CustomButton from "@/components/button/CustomButton";
import FlexCol from "@/components/ui/FlexCol";
import { useTimeCard } from "@/features/timeCard/hooks/useTimeCard";
import { TimeCard } from "@/features/timeCard/types";
import * as utils from "@/utils";

interface TimeCardTableProps {
  userId: string;
}

export default function TimeCardTable({ userId }: TimeCardTableProps) {
  const {
    monthlyTimeCards,
    loading,
    selectedMonth,
    handleMonthChange,
    handleDeleteMonthlyTimeCards,
    handleDeleteTimeCard,
    fetchMonthlyTimeCards,
  } = useTimeCard(userId);

  const hourlyRate = 1000;

  useEffect(() => {
    fetchMonthlyTimeCards(selectedMonth);
  }, [selectedMonth, fetchMonthlyTimeCards]);

  // タイムカードを日付の昇順（古い順）にソート
  const sortedTimeCards = [...monthlyTimeCards].sort(
    (a, b) => a.date.getTime() - b.date.getTime()
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <FlexCol>
      <Box>
        <CustomButton onClick={() => handleMonthChange(-1)} mr={2}>
          前月
        </CustomButton>
        {selectedMonth.getFullYear()}年{selectedMonth.getMonth() + 1}月
        <CustomButton onClick={() => handleMonthChange(1)} ml={2}>
          次月
        </CustomButton>
      </Box>
      {monthlyTimeCards.length > 0 ? (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>日付</Th>
              <Th>出勤</Th>
              <Th>退勤</Th>
              <Th>合計</Th>
              <Th>操作</Th>
            </Tr>
          </Thead>
          <Tbody>
            {sortedTimeCards.map((card) => (
              <Tr key={card.id}>
                <Td>{utils.dateUtils.formatDate(card.date)}</Td>
                <Td>{utils.dateUtils.formatTime(card.startTime)}</Td>
                <Td>{utils.dateUtils.formatTime(card.endTime)}</Td>
                <Td>
                  {utils.calculationUtils.calculateWorkingHours(card)} 時間
                </Td>
                <Td>
                  <CustomButton onClick={() => handleDeleteTimeCard(card.id)}>
                    削除
                  </CustomButton>
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>合計時間</Th>
              <Td colSpan={4}>
                {utils.calculationUtils
                  .calculateTotalHours(monthlyTimeCards)
                  .toFixed(2)}{" "}
                時間
              </Td>
            </Tr>
            <Tr>
              <Th>合計収入</Th>
              <Td colSpan={4}>
                {utils.calculationUtils
                  .calculateTotalEarnings(monthlyTimeCards, hourlyRate)
                  .toLocaleString()}
                円
              </Td>
            </Tr>
          </Tfoot>
        </Table>
      ) : (
        <Box>この月のタイムカードデータはありません。</Box>
      )}
      <CustomButton onClick={handleDeleteMonthlyTimeCards}>
        月間データ削除
      </CustomButton>
    </FlexCol>
  );
}
