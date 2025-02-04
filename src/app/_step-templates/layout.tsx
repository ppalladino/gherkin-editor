import { Flex } from "@chakra-ui/react";

export default function StepTemplateLayout({
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