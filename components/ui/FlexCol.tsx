import { Flex, FlexProps } from "@chakra-ui/react";

const FlexCol = (props: FlexProps) => (
  <Flex direction="column" gap={4} {...props} />
);

export default FlexCol;
