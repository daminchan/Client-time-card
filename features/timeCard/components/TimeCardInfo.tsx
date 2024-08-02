import { Box, Text } from "@chakra-ui/react";
import { TimeCard as TimeCardType } from "@prisma/client";

import {
  formatDate,
  formatTime,
  calculateWorkingHours,
} from "../utils/dateUtils";

interface TimeCardInfoProps {
  timeCard: TimeCardType;
}

export default function TimeCardInfo({ timeCard }: TimeCardInfoProps) {
  return (
    <Box borderWidth="1px" borderRadius="lg" p={4}>
      <Text>日付: {formatDate(timeCard.date)}</Text>
      <Text>出勤: {formatTime(timeCard.startTime)}</Text>
      <Text>退勤: {formatTime(timeCard.endTime)}</Text>
      <Text>
        {calculateWorkingHours(timeCard.startTime, timeCard.endTime)}
        時間
      </Text>
    </Box>
  );
}
