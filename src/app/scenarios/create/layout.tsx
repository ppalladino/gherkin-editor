import { Flex } from "@chakra-ui/react";

export default function CreateScenarioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Flex flex="1">
      {children}
    </Flex>
  );
}