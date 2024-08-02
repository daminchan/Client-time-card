"use client";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";

import CustomButton from "@/components/button/CustomButton";
import FlexCol from "@/components/ui/FlexCol";

import { useTimeCard } from "../hooks/useTimeCard";
import TimeCardInfo from "./TimeCardInfo";

export default function TimeCardManager({ userId }: { userId: string }) {
  const { latestTimeCard, loading, handleClockIn, handleClockOut } =
    useTimeCard(userId);

  if (loading) return <Text>Loading...</Text>;

  return (
    <FlexCol>
      <Box>
        <Heading as="h2" size="lg">
          タイムカード
        </Heading>
        {latestTimeCard ? (
          <TimeCardInfo timeCard={latestTimeCard} />
        ) : (
          <Text>タイムカード記録がありません。</Text>
        )}
        <Flex justify="space-between" mt={4}>
          <CustomButton onClick={handleClockIn} colorScheme="blue" width="80px">
            出勤
          </CustomButton>
          <CustomButton onClick={handleClockOut} colorScheme="red" width="80px">
            退勤
          </CustomButton>
        </Flex>
      </Box>
    </FlexCol>
  );
}
