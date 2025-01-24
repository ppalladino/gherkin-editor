import { Flex } from "@chakra-ui/react";

export default function ScenariosLayout({
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